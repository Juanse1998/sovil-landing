import { useState, useEffect } from 'react';
import S from '../styles';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      height: 3, background: 'transparent', pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: S.accent,
        transition: 'width .08s linear',
      }} />
    </div>
  );
}
