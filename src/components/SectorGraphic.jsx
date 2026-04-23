import S from '../styles';

export default function SectorGraphic({ sector, size }) {
  if (sector === 'Fintech') {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }}>
        <defs>
          <pattern id="sg-dots-f" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill={S.accent} opacity="0.22" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#sg-dots-f)" />
        {[40, 60, 95, 110, 140, 180, 220].map((h, i) => (
          <rect key={i} x={30 + i * 50} y={260 - h} width="28" height={h}
            fill={i > 4 ? S.accent : 'rgba(255,255,255,0.75)'}
            style={{
              animation: 'sg-bar 2.4s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
              transformOrigin: `${30 + i * 50 + 14}px 260px`,
            }} />
        ))}
        <line x1="20" y1="260" x2="380" y2="260" stroke={S.accent} strokeWidth="1.5" strokeOpacity="0.6" />
        <polyline
          points="40,210 90,180 140,150 190,120 240,95 290,70 340,40"
          fill="none" stroke={S.accent} strokeWidth="2.5"
          strokeDasharray="400" strokeDashoffset="0"
          style={{ animation: 'sg-draw 3.5s ease-in-out infinite' }}
        />
        <style>{`
          @keyframes sg-bar { 0%,100% { transform: scaleY(1) } 50% { transform: scaleY(1.12) } }
          @keyframes sg-draw { 0% { stroke-dashoffset: 400 } 50%,100% { stroke-dashoffset: 0 } }
        `}</style>
      </svg>
    );
  }
  if (sector === 'Retail') {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.95 }}>
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const x = 40 + c * 55;
            const y = 50 + r * 50;
            const hl = (r === 2 && c === 3);
            return (
              <g key={`${r}-${c}`}>
                {c < 6 && (
                  <line x1={x} y1={y} x2={x + 55} y2={y}
                    stroke={S.accent} strokeWidth="0.5" strokeOpacity="0.25" />
                )}
                {r < 4 && (
                  <line x1={x} y1={y} x2={x} y2={y + 50}
                    stroke={S.accent} strokeWidth="0.5" strokeOpacity="0.25" />
                )}
                <circle cx={x} cy={y} r={hl ? 8 : 3}
                  fill={hl ? S.accent : 'rgba(255,255,255,0.5)'}
                  style={hl ? {
                    animation: 'sg-pulse 2s ease-in-out infinite',
                    transformOrigin: `${x}px ${y}px`,
                  } : {}} />
                {hl && (
                  <circle cx={x} cy={y} r="18" fill="none"
                    stroke={S.accent} strokeWidth="1" strokeOpacity="0.6"
                    style={{ animation: 'sg-ring 2s ease-in-out infinite', transformOrigin: `${x}px ${y}px` }} />
                )}
              </g>
            );
          })
        )}
        <style>{`
          @keyframes sg-pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.3) } }
          @keyframes sg-ring { 0% { transform: scale(0.6); opacity: 0.8 } 100% { transform: scale(1.8); opacity: 0 } }
        `}</style>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.95 }}>
      {[80, 140, 200].map((h, i) => (
        <g key={i}>
          <rect x={60 + i * 110} y={260 - h} width="90" height={h}
            fill="none" stroke={S.ink} strokeWidth="1.5" />
          <rect x={60 + i * 110} y={260 - h} width="90" height={h * 0.15}
            fill={S.ink} opacity="0.9" />
          <text x={60 + i * 110 + 45} y={260 - h + 24}
            fontFamily="monospace" fontSize="11" fill={S.ink} textAnchor="middle"
            letterSpacing="1">T{i + 1}</text>
          <text x={60 + i * 110 + 45} y={260 - h + 60}
            fontFamily="serif" fontSize="22" fontWeight="700" fill={S.ink} textAnchor="middle">
            ${['49', '149', '399'][i]}
          </text>
          {i === 1 && (
            <circle cx={60 + i * 110 + 45} cy={260 - h - 16} r="6"
              fill={S.ink}
              style={{ animation: 'sg-blink 1.4s ease-in-out infinite', transformOrigin: `${60 + i * 110 + 45}px ${260 - h - 16}px` }} />
          )}
        </g>
      ))}
      <style>{`
        @keyframes sg-blink { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.4); opacity: 0.5 } }
      `}</style>
    </svg>
  );
}
