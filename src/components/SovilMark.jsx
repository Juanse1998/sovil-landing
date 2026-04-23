export function SovilMark({ size = 48, color = 'currentColor', className = '', strokeWidth }) {
  const sw = strokeWidth ?? Math.max(2, size * 0.18);
  return (
    <div className={className} style={{ display: 'inline-block', lineHeight: 0 }}>
      <svg viewBox="0 0 100 80" width={size} height={size * 0.8} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
        <path
          d={`M 6 14
             L 6 14
             Q 6 6 14 6
             L 86 6
             Q 94 6 94 14
             L 94 26
             L 50 74
             L 6 26
             Z`}
          fill={color}
        />
        <path
          d={`M 22 18
             Q 18 18 18 22
             L 18 28
             L 50 60
             L 82 28
             L 82 22
             Q 82 18 78 18
             L 40 18
             Q 34 18 34 24
             Q 34 30 40 30
             L 60 30
             L 50 42
             L 40 30
             Z`}
          fill="#f5f3ee"
        />
      </svg>
    </div>
  );
}

export function SovilLockup({ size = 48, color = 'currentColor', stacked = false, wordmarkColor, className = '' }) {
  const wc = wordmarkColor ?? color;
  return (
    <div className={className} style={{
      display: 'inline-flex',
      flexDirection: stacked ? 'column' : 'row',
      alignItems: 'center',
      gap: stacked ? `${size * 0.2}px` : `${size * 0.3}px`,
      lineHeight: 0,
    }}>
      <SovilMark size={size} color={color} />
      <span style={{
        fontFamily: '"Archivo Black", "Anton", system-ui, sans-serif',
        fontSize: `${size * 0.7}px`,
        letterSpacing: '0.04em',
        color: wc,
        lineHeight: 1,
        textTransform: 'uppercase',
        fontWeight: 900,
      }}>SOVIL</span>
    </div>
  );
}
