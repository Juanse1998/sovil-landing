import { useState, useEffect } from 'react';
import S from '../styles';

export default function Typewriter({ text, delay = 0, style }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, 22);
    }, delay);
    return () => clearTimeout(start);
  }, [text, delay]);
  return (
    <span style={style}>
      {text.slice(0, n)}
      {n < text.length && (
        <span style={{
          display: 'inline-block', width: '0.08em', height: '0.85em',
          background: S.accent, marginLeft: 4, verticalAlign: 'middle',
          animation: 'v1-cursor 0.7s step-end infinite',
        }} />
      )}
      <style>{`@keyframes v1-cursor{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </span>
  );
}
