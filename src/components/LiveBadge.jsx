import { useState, useEffect } from 'react';
import S from '../styles';

export default function LiveBadge({ lang }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = time.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '6px 12px 6px 10px', borderRadius: 999,
      background: S.bg, border: `1px solid ${S.ink}`,
      fontFamily: S.mono, fontSize: 11, color: S.ink,
      letterSpacing: '0.08em', textTransform: 'uppercase',
    }}>
      <span style={{ position: 'relative', width: 8, height: 8 }}>
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: '#16a34a',
          animation: 'v1-ping 1.6s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <span style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: '#22c55e',
        }} />
      </span>
      <span>{lang === 'es' ? 'Aceptando proyectos' : 'Accepting projects'}</span>
      <span style={{ color: S.inkSoft }}>· {hh} ART</span>
      <style>{`
        @keyframes v1-ping {
          0% { transform: scale(1); opacity: 0.9 }
          75%,100% { transform: scale(2.4); opacity: 0 }
        }
      `}</style>
    </div>
  );
}
