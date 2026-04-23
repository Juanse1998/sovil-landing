import { useMemo } from 'react';
import S from '../styles';

export default function HeroNetwork({ mouse }) {
  const nodes = useMemo(() => [
    { x: 0.20, y: 0.18, r: 5 },
    { x: 0.55, y: 0.10, r: 4 },
    { x: 0.82, y: 0.22, r: 6 },
    { x: 0.38, y: 0.35, r: 3 },
    { x: 0.72, y: 0.42, r: 7 },
    { x: 0.15, y: 0.55, r: 4 },
    { x: 0.92, y: 0.58, r: 3 },
    { x: 0.45, y: 0.68, r: 5 },
    { x: 0.28, y: 0.82, r: 4 },
    { x: 0.66, y: 0.90, r: 5 },
    { x: 0.88, y: 0.78, r: 4 },
  ], []);

  const edges = useMemo(() => [
    [0,1],[1,2],[0,3],[3,4],[1,4],[2,4],[4,5],
    [4,6],[3,7],[4,7],[5,7],[7,8],[7,9],[6,9],
    [9,10],[2,6],[5,8],
  ], []);

  const px = (mouse?.x ?? 0.5) * 20 - 10;
  const py = (mouse?.y ?? 0.5) * 20 - 10;

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMaxYMid slice"
        style={{
          position: 'absolute', right: -40, top: 0, height: '100%',
          width: '65%', minWidth: 820,
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform .5s cubic-bezier(.2,.7,.1,1)',
        }}
      >
        <defs>
          <radialGradient id="hn-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={S.accent} stopOpacity="0.9" />
            <stop offset="50%" stopColor={S.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={S.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hn-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={S.ink} stopOpacity="0.6" />
            <stop offset="100%" stopColor={S.forest} stopOpacity="0.9" />
          </linearGradient>
          <filter id="hn-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <circle cx={nodes[4].x * 1000} cy={nodes[4].y * 800} r="220" fill="url(#hn-halo)" opacity="0.55" />

        <g stroke="url(#hn-line)" strokeWidth="1.1" fill="none" opacity="0.35">
          {edges.map(([a, b], i) => (
            <line key={`e-${i}`}
              x1={nodes[a].x * 1000} y1={nodes[a].y * 800}
              x2={nodes[b].x * 1000} y2={nodes[b].y * 800} />
          ))}
        </g>
        <g stroke={S.forest} strokeWidth="1.4" fill="none" opacity="0.9">
          {edges.map(([a, b], i) => (
            <line key={`ea-${i}`}
              x1={nodes[a].x * 1000} y1={nodes[a].y * 800}
              x2={nodes[b].x * 1000} y2={nodes[b].y * 800}
              strokeDasharray="6 14"
              style={{
                animation: `hn-flow ${3 + (i % 4) * 0.6}s linear infinite`,
                animationDelay: `${i * 0.18}s`,
                opacity: 0.5,
              }}
            />
          ))}
        </g>

        {nodes.map((n, i) => {
          const isHub = i === 4;
          return (
            <g key={`n-${i}`}
              style={{
                transformOrigin: `${n.x * 1000}px ${n.y * 800}px`,
                animation: `hn-pulse ${2.6 + (i % 3) * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {isHub && (
                <circle cx={n.x * 1000} cy={n.y * 800} r={n.r * 4}
                  fill="none" stroke={S.accent} strokeWidth="1" opacity="0.7" />
              )}
              <circle cx={n.x * 1000} cy={n.y * 800} r={n.r * 2.2}
                fill="none" stroke={S.ink} strokeWidth="1" opacity="0.35" />
              <circle cx={n.x * 1000} cy={n.y * 800} r={n.r}
                fill={isHub ? S.accent : S.ink} />
            </g>
          );
        })}

        <circle r="3" fill={S.forest}>
          <animateMotion dur="5s" repeatCount="indefinite"
            path={`M${nodes[0].x * 1000},${nodes[0].y * 800} L${nodes[4].x * 1000},${nodes[4].y * 800} L${nodes[9].x * 1000},${nodes[9].y * 800}`} />
        </circle>
        <circle r="3" fill={S.accent}>
          <animateMotion dur="6.5s" repeatCount="indefinite" begin="1s"
            path={`M${nodes[2].x * 1000},${nodes[2].y * 800} L${nodes[4].x * 1000},${nodes[4].y * 800} L${nodes[7].x * 1000},${nodes[7].y * 800}`} />
        </circle>
      </svg>

      <style>{`
        @keyframes hn-pulse {
          0%, 100% { transform: scale(1); opacity: 1 }
          50% { transform: scale(1.4); opacity: 0.7 }
        }
        @keyframes hn-flow {
          from { stroke-dashoffset: 0 }
          to   { stroke-dashoffset: -40 }
        }
        @keyframes hn-blink {
          0%, 100% { opacity: 1 }
          50% { opacity: 0.3 }
        }
      `}</style>
    </div>
  );
}
