import './PetaBackgroundDecor.css';

/**
 * Decorative-only background layer for the Peta (map) page.
 * Renders dark ocean gradients, seaweed ornaments, wave lines and a
 * subtle dotted map path. It is aria-hidden, non-interactive
 * (pointer-events: none) and sits behind all existing page content.
 * It does not add any real UI, data, or functionality.
 */

function SeaweedOrnament({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M40 420 C 34 360, 54 340, 44 300 C 34 260, 56 240, 46 200 C 36 160, 58 140, 48 100 C 40 66, 56 40, 50 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M40 420 C 34 360, 54 340, 44 300 C 34 260, 56 240, 46 200 C 36 160, 58 140, 48 100 C 40 66, 56 40, 50 4"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.5"
        transform="translate(16,10)"
      />
      <path
        d="M90 420 C 84 350, 106 322, 92 270 C 80 224, 104 196, 90 150 C 78 110, 100 84, 88 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M132 420 C 140 366, 118 344, 130 300 C 140 262, 120 236, 130 196 C 140 162, 122 138, 132 100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* soft frond leaves */}
      <path d="M44 300 C 60 292, 70 278, 66 262" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M46 200 C 30 192, 20 178, 24 162" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M92 270 C 108 262, 118 248, 112 232" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M90 150 C 74 142, 64 128, 68 112" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <path d="M130 196 C 146 190, 154 176, 148 160" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function WaveLines() {
  return (
    <svg
      className="peta-decor__waves"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 140 C 180 100, 300 180, 480 140 C 660 100, 780 180, 960 140 C 1140 100, 1260 180, 1440 140"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.28"
      />
      <path
        d="M0 172 C 200 132, 320 210, 520 172 C 700 138, 820 210, 1020 172 C 1200 138, 1320 210, 1440 176"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.2"
      />
      <path
        d="M0 200 C 220 168, 360 232, 560 200 C 760 168, 880 232, 1080 200 C 1260 172, 1360 226, 1440 202"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.14"
      />
    </svg>
  );
}

function MapPathOrnament() {
  return (
    <svg
      className="peta-decor__mappath"
      viewBox="0 0 260 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M60 20 C 90 46, 70 74, 100 100 C 130 126, 150 150, 190 176"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="1 8"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="60" cy="20" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="190" cy="176" r="3" fill="currentColor" opacity="0.5" />
      {/* simple location pins */}
      <g opacity="0.7">
        <path d="M60 6 c8 0 14 6 14 14 c0 10-14 22-14 22 s-14-12-14-22 c0-8 6-14 14-14z" fill="currentColor" />
        <circle cx="60" cy="20" r="4.5" fill="var(--deep-navy)" />
      </g>
      <g opacity="0.55">
        <path d="M190 162 c8 0 14 6 14 14 c0 10-14 22-14 22 s-14-12-14-22 c0-8 6-14 14-14z" fill="currentColor" />
        <circle cx="190" cy="176" r="4.5" fill="var(--deep-navy)" />
      </g>
    </svg>
  );
}

export default function PetaBackgroundDecor() {
  return (
    <div className="peta-decor" aria-hidden="true">
      <div className="peta-decor__glow peta-decor__glow--1" />
      <div className="peta-decor__glow peta-decor__glow--2" />
      <div className="peta-decor__glow peta-decor__glow--3" />

      <MapPathOrnament />

      <SeaweedOrnament className="peta-decor__seaweed peta-decor__seaweed--tr" />
      <SeaweedOrnament className="peta-decor__seaweed peta-decor__seaweed--br" />
      <SeaweedOrnament className="peta-decor__seaweed peta-decor__seaweed--bl" />

      <div className="peta-decor__dots peta-decor__dots--1" />
      <div className="peta-decor__dots peta-decor__dots--2" />

      <WaveLines />
    </div>
  );
}
