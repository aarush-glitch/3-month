interface BabysBreathProps {
  className?: string;
}

/**
 * Larger, more colorful Baby's Breath cluster.
 * Flowers come in 4 colors: white, amber, lavender, sage-green.
 */
export default function BabysBreath({ className = '' }: BabysBreathProps) {
  // [cx, cy, rotate, petalFill, centerFill]
  const flowers: [number, number, number, string, string][] = [
    // white flowers
    [24, 40,   0, '#FDFCFA', '#F0CFA0'],
    [52, 22, -15, '#FDFCFA', '#F0CFA0'],
    [88, 26,   5, '#FDFCFA', '#F0CFA0'],
    [32, 62,  18, '#FDFCFA', '#F0CFA0'],
    [68, 50,  -5, '#FDFCFA', '#F0CFA0'],
    [96, 50,  10, '#FDFCFA', '#F0CFA0'],
    [14, 58, -22, '#FDFCFA', '#F0CFA0'],
    // amber / blush flowers
    [38, 30,  28, '#F7E0C8', '#D4A070'],
    [72, 22,  -8, '#F7E0C8', '#D4A070'],
    [100,38,  14, '#F7E0C8', '#D4A070'],
    [44, 52,  -3, '#F7E0C8', '#D4A070'],
    [82, 42, -16, '#F7E0C8', '#D4A070'],
    // lavender flowers
    [60, 32,  10, '#EDE0F4', '#C4A0BC'],
    [78, 34, -20, '#EDE0F4', '#C4A0BC'],
    [28, 52,  22, '#EDE0F4', '#C4A0BC'],
    [92, 44,   6, '#EDE0F4', '#C4A0BC'],
    [50, 42,  -10,'#EDE0F4', '#C4A0BC'],
    // sage-green flowers
    [46, 26,  -5, '#DEEEDD', '#9ABA88'],
    [64, 44,  15, '#DEEEDD', '#9ABA88'],
    [84, 54, -12, '#DEEEDD', '#9ABA88'],
    [18, 48,  -8, '#DEEEDD', '#9ABA88'],
    [106,56,   2, '#DEEEDD', '#9ABA88'],
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Main trunk stems ── */}
      <path d="M65 128 L65 72"       stroke="#7AAF6A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M65 72  L40 40"       stroke="#7AAF6A" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M65 72  L90 38"       stroke="#7AAF6A" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M65 88  L28 58"       stroke="#7AAF6A" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M65 88  L102 54"      stroke="#7AAF6A" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M65 100 L12 56"       stroke="#7AAF6A" strokeWidth="0.9" strokeLinecap="round" />

      {/* ── Branch stems ── */}
      <path d="M40 40  L24 28"       stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M40 40  L38 20"       stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M40 40  L28 50"       stroke="#8CAF7A" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M40 40  L50 26"       stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M90 38  L74 22"       stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M90 38  L90 22"       stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M90 38  L102 30"      stroke="#8CAF7A" strokeWidth="1.0" strokeLinecap="round" />
      <path d="M90 38  L100 44"      stroke="#8CAF7A" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M28 58  L14 48"       stroke="#8CAF7A" strokeWidth="0.85" strokeLinecap="round" />
      <path d="M28 58  L18 62"       stroke="#8CAF7A" strokeWidth="0.85" strokeLinecap="round" />
      <path d="M102 54 L96 44"       stroke="#8CAF7A" strokeWidth="0.85" strokeLinecap="round" />
      <path d="M102 54 L108 60"      stroke="#8CAF7A" strokeWidth="0.85" strokeLinecap="round" />
      <path d="M50 26  L44 16"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M74 22  L64 14"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M74 22  L80 14"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M60 32  L56 20"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M78 34  L82 22"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M44 52  L44 42"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M68 50  L72 38"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />
      <path d="M84 54  L88 44"       stroke="#8CAF7A" strokeWidth="0.8"  strokeLinecap="round" />

      {/* ── Leaves ── */}
      <ellipse cx="55" cy="82" rx="5" ry="2.2" fill="#A0C48A" opacity="0.7" transform="rotate(-35,55,82)" />
      <ellipse cx="75" cy="80" rx="5" ry="2.2" fill="#A0C48A" opacity="0.7" transform="rotate(35,75,80)"  />
      <ellipse cx="42" cy="58" rx="4" ry="1.8" fill="#A0C48A" opacity="0.6" transform="rotate(-20,42,58)" />
      <ellipse cx="88" cy="58" rx="4" ry="1.8" fill="#A0C48A" opacity="0.6" transform="rotate(22,88,58)"  />
      <ellipse cx="65" cy="92" rx="6" ry="2.0" fill="#90BC80" opacity="0.5" transform="rotate(0,65,92)"   />

      {/* ── Flowers ── */}
      {flowers.map(([cx, cy, rot, petal, center], idx) => (
        <g key={idx} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          {[0, 72, 144, 216, 288].map(angle => (
            <ellipse
              key={angle}
              rx="4.0"
              ry="2.2"
              fill={petal}
              stroke="rgba(200,180,160,0.20)"
              strokeWidth="0.3"
              opacity="0.97"
              transform={`rotate(${angle}) translate(0,-3.8)`}
            />
          ))}
          <circle r="2.2" fill={center} />
          <circle r="1.0" fill={center} opacity="0.6" transform="translate(0.4,-0.3)" />
        </g>
      ))}
    </svg>
  );
}
