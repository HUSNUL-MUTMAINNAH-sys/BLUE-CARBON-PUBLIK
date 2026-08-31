import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import MapMarker from './MapMarker';
import MapControls from './MapControls';
import './InteractiveMap.css';

const TILE_LAYERS = {
  street: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri - Source: Esri, Maxar, Earthstar Geographics',
  },
};

function FlyToController({ target, zoom = 15 }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, zoom, { duration: 1.8 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return null;
}

function ResetController({ resetSignal, center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (resetSignal) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetSignal]);
  return null;
}

export default function InteractiveMap({
  locations,
  activeId,
  onSelect,
  fullscreen,
  onToggleFullscreen,
}) {
  const [layer, setLayer] = useState('satellite');
  const [resetTick, setResetTick] = useState(0);

  const center = locations.length
    ? [
        locations.reduce((s, l) => s + l.coordinates[0], 0) / locations.length,
        locations.reduce((s, l) => s + l.coordinates[1], 0) / locations.length,
      ]
    : [-5.538, 119.962];

  const active = locations.find((l) => l.id === activeId);
  const routeLine = locations.map((l) => l.coordinates);

  return (
    <div className={`interactive-map ${fullscreen ? 'interactive-map--fullscreen' : ''}`}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={TILE_LAYERS[layer].url} attribution={TILE_LAYERS[layer].attribution} />
        <Polyline
          positions={routeLine}
          pathOptions={{ color: '#2FD1C7', weight: 1.5, opacity: 0.5, dashArray: '4 6' }}
        />
        {locations.map((loc) => (
          <MapMarker key={loc.id} location={loc} active={loc.id === activeId} onSelect={onSelect} />
        ))}
        <FlyToController target={active?.coordinates} />
        <ResetController resetSignal={resetTick} center={center} zoom={13} />
      </MapContainer>

      <MapControls
        layer={layer}
        onLayerChange={setLayer}
        onReset={() => setResetTick((t) => t + 1)}
        onFullscreen={onToggleFullscreen}
        fullscreen={fullscreen}
      />
    </div>
  );
}
