import { Fragment } from 'react';
import S from '../styles';

export default function Marquee({ lang }) {
  const items = lang === 'es'
    ? ['Estrategia', 'Producto', 'Ingeniería', 'Data', 'Operaciones', 'Growth', 'Diseño', 'Product-Led']
    : ['Strategy', 'Product', 'Engineering', 'Data', 'Operations', 'Growth', 'Design', 'Product-Led'];
  const run = [...items, ...items, ...items];
  return (
    <div style={{
      background: S.ink, color: S.bg, padding: '18px 0',
      borderTop: `1px solid ${S.ink}`, borderBottom: `1px solid ${S.ink}`,
      overflow: 'hidden', position: 'relative',
    }}>
      <div style={{
        display: 'flex', gap: 48, whiteSpace: 'nowrap',
        animation: 'v1-marquee 9s linear infinite',
        fontFamily: S.display, fontSize: 32, letterSpacing: '-0.01em',
        alignItems: 'center',
      }}>
        {run.map((w, i) => (
          <Fragment key={i}>
            <span style={{
              color: (i % 3 === 1) ? S.accent : S.bg,
              fontWeight: 900,
            }}>{w}</span>
            <span style={{
              width: 14, height: 14, borderRadius: '50%',
              background: S.accent, flexShrink: 0,
            }} />
          </Fragment>
        ))}
      </div>
      <style>{`@keyframes v1-marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
    </div>
  );
}
