import PhotoPlaceholder from '../common/PhotoPlaceholder';
import './LocationTimeline.css';

export default function LocationTimeline({
  locations,
  activeId,
  onSelect,
  onPrev,
  onNext,
  playing,
  onTogglePlay,
}) {
  return (
    <div className="location-timeline">
      <button className="location-timeline__arrow" onClick={onPrev} aria-label="Lokasi sebelumnya">
        ←
      </button>

      <div className="location-timeline__track" role="list">
        {locations.map((loc) => (
          <button
            key={loc.id}
            role="listitem"
            className={`location-timeline__item ${loc.id === activeId ? 'location-timeline__item--active' : ''}`}
            onClick={() => onSelect(loc.id)}
          >
            <span className="location-timeline__thumb">
              {loc.foto ? (
                <img 
                  src={loc.foto} 
                  alt={loc.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <div style={{ display: loc.foto ? 'none' : 'block' }}>
                <PhotoPlaceholder variant={loc.photoVariant} showBadge={false} />
              </div>
            </span>
            <span className="location-timeline__meta">
              <span className="location-timeline__number">{loc.number}</span>
              <span className="location-timeline__name">{loc.name}</span>
              <span className="location-timeline__area">{loc.area}</span>
            </span>
          </button>
        ))}
      </div>

      <button className="location-timeline__arrow" onClick={onNext} aria-label="Lokasi berikutnya">
        →
      </button>

      <button
        className={`location-timeline__play ${playing ? 'location-timeline__play--active' : ''}`}
        onClick={onTogglePlay}
        aria-label={playing ? 'Jeda putar otomatis' : 'Putar otomatis'}
      >
        {playing ? '❚❚' : '▶'} {playing ? 'Jeda' : 'Auto Play'}
      </button>
    </div>
  );
}
