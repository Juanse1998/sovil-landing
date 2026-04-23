import { useState, useRef } from 'react';
import S from '../styles';
import { Reveal, useMobile } from '../hooks';
import HeroNetwork from './HeroNetwork';

export default function Hero({ t, lang }) {
  const ref = useRef(null);
  const isMobile = useMobile();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });
  return (
    <section
      ref={ref}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect();
        setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
      }}
      style={{
        position: 'relative',
        padding: isMobile ? '80px 20px 80px' : '140px 48px 120px',
        borderBottom: `1px solid ${S.line}`,
        overflow: 'hidden',
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(163,230,53,0.22), transparent 60%)`,
        transition: 'background .3s',
      }} />

      {!isMobile && <HeroNetwork mouse={mouse} />}

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: isMobile ? 0.28 : 0.35,
        backgroundImage: `linear-gradient(${S.line} 1px, transparent 1px), linear-gradient(90deg, ${S.line} 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: isMobile
          ? 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 80%)'
          : 'radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)',
        WebkitMaskImage: isMobile
          ? 'radial-gradient(ellipse at 50% 40%, black 0%, transparent 80%)'
          : 'radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)',
      }} />

      {isMobile && (
        <svg
          style={{ position: 'absolute', top: 0, right: 0, width: '70vw', height: '70vw', pointerEvents: 'none', opacity: 0.55 }}
          viewBox="0 0 300 300" fill="none"
        >
          <circle cx="240" cy="60" r="120" stroke={S.accent} strokeWidth="1" />
          <circle cx="240" cy="60" r="80" stroke={S.ink} strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="240" cy="60" r="40" stroke={S.accent} strokeWidth="1.5" />
          <circle cx="240" cy="60" r="4" fill={S.accent} />
          <circle cx="150" cy="130" r="3" fill={S.ink} opacity="0.3" />
          <circle cx="200" cy="170" r="2" fill={S.accent} opacity="0.5" />
          <circle cx="120" cy="80" r="2" fill={S.ink} opacity="0.25" />
          <line x1="240" y1="60" x2="150" y2="130" stroke={S.ink} strokeWidth="0.5" opacity="0.2" />
          <line x1="240" y1="60" x2="200" y2="170" stroke={S.accent} strokeWidth="0.5" opacity="0.3" />
          <line x1="240" y1="60" x2="120" y2="80" stroke={S.ink} strokeWidth="0.5" opacity="0.15" />
        </svg>
      )}

      <Reveal>
        <h1 style={{
          fontFamily: S.display,
          fontSize: isMobile ? 'clamp(38px, 11.5vw, 54px)' : 'clamp(64px, 9vw, 172px)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
          margin: 0,
          color: S.ink,
          maxWidth: '16ch',
          textTransform: 'none',
          fontWeight: 900,
          position: 'relative',
        }}>
          {t.hero.headline.split(' ').map((w, i) => {
            const emphasize = /funcionan|work|digitales|digital/i.test(w);
            return (
              <span key={i} style={{
                display: 'inline-block', marginRight: '0.22em',
                position: 'relative',
                animation: `v1-heroIn .9s cubic-bezier(.2,.7,.1,1) both`,
                animationDelay: `${i * 60}ms`,
              }}>
                {w}
                {emphasize && (
                  <span style={{
                    position: 'absolute', left: 0, right: 0, bottom: '0.08em',
                    height: '0.16em', background: S.accent, zIndex: -1,
                    display: 'inline-block',
                    transformOrigin: 'left center',
                    animation: `v1-highlight .9s cubic-bezier(.7,0,.3,1) both`,
                    animationDelay: `${600 + i * 60}ms`,
                  }} />
                )}
              </span>
            );
          })}
          <style>{`
            @keyframes v1-heroIn {
              from { opacity: 0; transform: translateY(30px) rotate(-2deg); }
              to   { opacity: 1; transform: translateY(0) rotate(0); }
            }
            @keyframes v1-highlight {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>
        </h1>
      </Reveal>

      <div style={{
        display: 'flex', flexDirection: 'column', gap: 32,
        marginTop: isMobile ? 40 : 80,
        position: 'relative',
      }}>
        <Reveal delay={200}>
          <p style={{
            fontFamily: S.display,
            fontSize: isMobile ? 20 : 'clamp(18px, 1.6vw, 26px)',
            lineHeight: 1.4,
            margin: 0,
            color: S.inkSoft,
            maxWidth: '28ch',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
          }}>{t.hero.sub}</p>
        </Reveal>

        <Reveal delay={400}>
          <div style={{
            display: 'flex', gap: 16, alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'flex-start',
          }}>
            <a href="#contact" style={{
              background: S.accent, color: S.accentInk,
              padding: isMobile ? '16px 24px' : '22px 36px', borderRadius: 999,
              fontFamily: S.sans, fontSize: isMobile ? 15 : 16, fontWeight: 600,
              textDecoration: 'none',
              border: `2px solid ${S.ink}`,
              boxShadow: `4px 4px 0 ${S.ink}`,
              transition: 'transform .2s, box-shadow .2s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `6px 6px 0 ${S.ink}`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${S.ink}`; }}
            >{t.hero.cta} →</a>
            <a href="#story" style={{
              color: S.ink, fontFamily: S.sans, fontSize: 15,
              textDecoration: 'underline', textUnderlineOffset: 6,
              padding: '16px 0',
            }}>{t.hero.ctaSecondary}</a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes v1-scroll-line { 0%,100%{transform:scaleX(1);opacity:0.4} 50%{transform:scaleX(1.8);opacity:1} }
      `}</style>
    </section>
  );
}
