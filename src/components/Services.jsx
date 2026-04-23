import { useState } from 'react';
import S from '../styles';
import { Reveal, useMobile } from '../hooks';

export default function Services({ t }) {
  const [active, setActive] = useState(null);
  const isMobile = useMobile();
  return (
    <section id="s1" style={{ padding: isMobile ? '80px 20px' : '140px 48px', background: S.bg, borderBottom: `1px solid ${S.line}` }}>
      <Reveal>
        <h2 style={{
          fontFamily: S.display,
          fontSize: 'clamp(48px, 6vw, 100px)',
          lineHeight: 0.92, letterSpacing: '-0.02em',
          margin: isMobile ? '0 0 40px' : '0 0 80px', color: S.ink, maxWidth: '14ch',
        }}>{t.services.title}</h2>
      </Reveal>

      <div style={{ borderTop: `1px solid ${S.ink}` }}>
        {t.services.items.map((item, i) => {
          const isActive = active === i;
          return (
            <div key={i}
              onMouseEnter={() => !isMobile && setActive(i)}
              onMouseLeave={() => !isMobile && setActive(null)}
              style={{
                borderBottom: `1px solid ${S.ink}`,
                padding: isMobile ? '24px 0' : '32px 0',
                display: 'grid',
                gridTemplateColumns: isMobile ? '40px 1fr' : '80px 1fr 1fr 60px',
                gap: isMobile ? 16 : 40, alignItems: 'center',
                background: isActive ? S.accent : 'transparent',
                transition: 'background .3s cubic-bezier(.2,.7,.1,1), padding .3s cubic-bezier(.2,.7,.1,1)',
                cursor: 'pointer',
                paddingLeft: isActive ? 32 : 0,
                paddingRight: isActive ? 32 : 0,
                position: 'relative', overflow: 'hidden',
              }}>
              <span style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: 4, background: S.forest,
                transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'center',
                transition: 'transform .3s cubic-bezier(.2,.7,.1,1)',
              }} />
              <div style={{
                fontFamily: S.mono, fontSize: isMobile ? 11 : 14, color: S.ink,
                letterSpacing: '0.1em',
                transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                transition: 'transform .3s',
              }}>{item.n}</div>
              <div style={{
                fontFamily: S.display,
                fontSize: isMobile ? 'clamp(22px, 5vw, 28px)' : 'clamp(24px, 2.4vw, 36px)',
                color: S.ink, letterSpacing: '-0.01em', lineHeight: 1.05,
                transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                transition: 'transform .35s cubic-bezier(.2,.7,.1,1)',
              }}>{item.t}</div>
              {!isMobile && (
                <div style={{
                  fontFamily: S.sans, fontSize: 16, lineHeight: 1.45,
                  color: isActive ? S.ink : S.inkSoft,
                  maxWidth: '40ch',
                  transition: 'color .3s',
                }}>{item.d}</div>
              )}
              {!isMobile && (
                <div style={{
                  fontFamily: S.display, fontSize: 42, color: S.ink,
                  transform: isActive ? 'translateX(0) rotate(-45deg)' : 'translateX(-12px) rotate(0)',
                  opacity: isActive ? 1 : 0.25,
                  transition: 'transform .35s cubic-bezier(.2,.7,.1,1), opacity .3s',
                  textAlign: 'right', fontWeight: 900,
                }}>→</div>
              )}
            </div>
          );
        })}
      </div>

      
    </section>
  );
}
