import { useState } from 'react';
import S from '../styles';

export default function SovilLogoImg({ height = 40, onDark = false, className }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        src="sovilLogo.png"
        alt="SOVIL"
        height={60}
        className={className}
        onError={() => setFailed(true)}
        style={{ height, width: 85, display: 'block' }}
      />
    );
  }
  const fg = onDark ? '#f5f3ee' : '#0e0e0c';
  const faint = onDark ? 'rgba(245,243,238,0.5)' : 'rgba(14,14,12,0.4)';
  return (
    <div
      className={className}
      style={{
        height, minWidth: height * 2.4, padding: '0 14px',
        border: `1.5px dashed ${faint}`, borderRadius: 6,
        display: 'inline-flex', alignItems: 'center', gap: 10,
        fontFamily: S.mono,
        fontSize: Math.max(10, height * 0.22),
        color: faint, letterSpacing: '0.1em', textTransform: 'uppercase',
        background: onDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        cursor: 'default', userSelect: 'none',
      }}
    >
      <span style={{ fontSize: Math.max(8, height * 0.32), opacity: 0.5 }}>⊕</span>
      sovil-logo.png
    </div>
  );
}
