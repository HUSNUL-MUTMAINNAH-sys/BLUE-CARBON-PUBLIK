import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export function buildMarkerIcon(number, active) {
  const size = active ? 40 : 30;
  const html = `
    <div class="map-marker ${active ? 'map-marker--active' : ''}">
      ${active ? '<span class="map-marker__pulse"></span>' : ''}
      <span class="map-marker__label">${number}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'map-marker-wrapper',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapMarker({ location, active, onSelect }) {
  return (
    <Marker
      position={location.coordinates}
      icon={buildMarkerIcon(location.number, active)}
      eventHandlers={{ click: () => onSelect(location.id) }}
    >
      <Popup>
        <strong>
          {location.number} - {location.name}
        </strong>
        <br />
        {location.area} &middot; {location.status}
      </Popup>
    </Marker>
  );
}
