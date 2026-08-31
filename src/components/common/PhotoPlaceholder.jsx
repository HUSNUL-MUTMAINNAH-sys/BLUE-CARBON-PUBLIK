import './PhotoPlaceholder.css';

// Deterministic, locally-rendered coastal illustration used wherever a real
// field photo has not yet been supplied. Clearly labelled so it is never
// mistaken for verified documentation.
const VARIANTS = {
  north: { from: '#0D3D47', to: '#082A34', boats: 3, sun: true },
  central: { from: '#0F4550', to: '#061A22', boats: 2, sun: false },
  south: { from: '#0D3D47', to: '#05202A', boats: 4, sun: false },
  bay: { from: '#0A3038', to: '#061A22', boats: 1, sun: true },
  mapping: { from: '#0D3D47', to: '#082A34', boats: 0, sun: false, grid: true },
  survey: { from: '#0F4550', to: '#061A22', boats: 1, sun: false, grid: true },
  farmer: { from: '#0D3D47', to: '#05202A', boats: 2, sun: true },
  monitoring: { from: '#0A3038', to: '#061A22', boats: 1, sun: false, grid: true },
  seaweed: { from: '#0F4550', to: '#082A34', boats: 0, sun: false },
  hero: { from: '#0D3D47', to: '#04141A', boats: 5, sun: true },
};

function boatPath(x, y, scale = 1) {
  return `M${x - 14 * scale},${y} q14,${-10 * scale} 28,0 z M${x},${y} l0,${-18 * scale}`;
}

export default function PhotoPlaceholder({
  variant = 'central',
  label,
  className = '',
  showBadge = true,
  id,
}) {
  const cfg = VARIANTS[variant] || VARIANTS.central;
  const gradId = `pp-grad-${variant}-${id || Math.random().toString(36).slice(2, 7)}`;

  return (
    <div className={`photo-placeholder ${className}`} role="img" aria-label={label || 'Foto lokasi (placeholder)'}>
      <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cfg.from} />
            <stop offset="100%" stopColor={cfg.to} />
          </linearGradient>
        </defs>
        <rect width="400" height="260" fill={`url(#${gradId})`} />

        {/* horizon */}
        <line x1="0" y1="95" x2="400" y2="95" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />

        {cfg.sun && <circle cx="330" cy="55" r="26" fill="rgba(101,225,219,0.18)" />}

        {/* water lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={120 + i * 24}
            x2="400"
            y2={118 + i * 24}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* seaweed grid rope lines (aquaculture cue) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={60 + i * 65}
            y1="130"
            x2={60 + i * 65}
            y2="240"
            stroke="rgba(32,199,194,0.22)"
            strokeWidth="1.5"
          />
        ))}

        {cfg.grid &&
          Array.from({ length: 4 }).map((_, i) => (
            <rect
              key={`g${i}`}
              x={40 + i * 90}
              y="140"
              width="60"
              height="40"
              fill="none"
              stroke="rgba(101,225,219,0.35)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          ))}

        {Array.from({ length: cfg.boats }).map((_, i) => (
          <path
            key={i}
            d={boatPath(50 + i * 70, 105 + (i % 2) * 6, 0.9)}
            fill="none"
            stroke="rgba(245,247,244,0.4)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      {showBadge && <span className="photo-placeholder__badge">Placeholder Foto</span>}
      {label && <span className="photo-placeholder__label">{label}</span>}
    </div>
  );
}
