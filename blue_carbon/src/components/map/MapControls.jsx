import './MapControls.css';

export default function MapControls({ layer, onLayerChange, onReset, onFullscreen, fullscreen }) {
  return (
    <div className="map-controls">
      <button
        className="map-controls__btn"
        onClick={() => onLayerChange(layer === 'satellite' ? 'street' : 'satellite')}
        aria-label="Ganti jenis tampilan peta"
        title={layer === 'satellite' ? 'Tampilan Peta Jalan' : 'Tampilan Satelit'}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 8l9-5 9 5-9 5-9-5Z" />
          <path d="M3 16l9 5 9-5M3 12l9 5 9-5" />
        </svg>
      </button>
      <button className="map-controls__btn" onClick={onReset} aria-label="Reset tampilan peta" title="Reset">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 3v6h-6" />
        </svg>
      </button>
      <button
        className="map-controls__btn"
        onClick={onFullscreen}
        aria-label={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'}
        title={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'}
      >
        {fullscreen ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 3v4a2 2 0 0 1-2 2H3M21 9h-4a2 2 0 0 1-2-2V3M3 15h4a2 2 0 0 1 2 2v4M15 21v-4a2 2 0 0 1 2-2h4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 9V5a2 2 0 0 1 2-2h4M21 9V5a2 2 0 0 0-2-2h-4M3 15v4a2 2 0 0 0 2 2h4M21 15v4a2 2 0 0 1-2 2h-4" />
          </svg>
        )}
      </button>
    </div>
  );
}
