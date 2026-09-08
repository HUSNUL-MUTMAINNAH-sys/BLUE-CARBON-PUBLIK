import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Active-location state for the map page. Selecting a location just updates
// `activeId` — InteractiveMap watches it and flies the Leaflet map itself,
// so this hook doesn't need to hold a map instance/ref.
export default function useMapLocation(locationsData = []) {
  const [searchParams, setSearchParams] = useSearchParams();
  const locations = locationsData.length > 0 ? locationsData : [];
  const initialId = locations.length > 0 ? (Number(searchParams.get('location')) || locations[0].id) : null;
  const [activeId, setActiveId] = useState(initialId);

  const activeIndex = locations.findIndex((l) => l.id === activeId);
  const active = locations[activeIndex] || (locations.length > 0 ? locations[0] : null);

  const goTo = useCallback(
    (id, { updateUrl = true } = {}) => {
      const loc = locations.find((l) => l.id === id);
      if (!loc) return;
      setActiveId(id);
      if (updateUrl) setSearchParams({ location: String(id) }, { replace: true });
    },
    [locations, setSearchParams]
  );

  const next = useCallback(() => {
    const idx = locations.findIndex((l) => l.id === activeId);
    const nextIdx = (idx + 1) % locations.length;
    goTo(locations[nextIdx].id);
  }, [activeId, goTo, locations]);

  const previous = useCallback(() => {
    const idx = locations.findIndex((l) => l.id === activeId);
    const prevIdx = (idx - 1 + locations.length) % locations.length;
    goTo(locations[prevIdx].id);
  }, [activeId, goTo, locations]);

  useEffect(() => {
    const paramId = Number(searchParams.get('location'));
    if (paramId && paramId !== activeId) {
      goTo(paramId, { updateUrl: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return { locations, active, activeId, activeIndex, goTo, next, previous };
}
