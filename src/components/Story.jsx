import { useState, useEffect, useRef } from 'react';
import S from '../styles';
import { useMobile } from '../hooks';

export default function Story({ t, lang }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useMobile();

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -r.top / total));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, true);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll, true);
  }, []);

  const frames = lang === 'es' ? [
    { q: '¿Tenés una idea?', a: 'La bajamos a un modelo de negocio concreto.', tag: '01 · Idea' },
    { q: '¿Proyecto trabado?', a: 'Lo ordenamos y lo destrabamos.', tag: '02 · Diagnóstico' },
    { q: '¿Necesitás construir?', a: 'Diseñamos y desarrollamos la solución.', tag: '03 · Build' },
    { q: '¿Querés escalar?', a: 'Operación, métricas y tech listas para crecer.', tag: '04 · Escala' },
    { q: '¿Lo ejecutamos?', a: 'Te acompañamos en cada decisión. De verdad.', tag: '05 · Partner' },
  ] : [
    { q: 'Have an idea?', a: 'We turn it into a concrete business model.', tag: '01 · Idea' },
    { q: 'Project stuck?', a: 'We order it and unblock it.', tag: '02 · Diagnosis' },
    { q: 'Need to build?', a: 'We design and develop the solution.', tag: '03 · Build' },
    { q: 'Want to scale?', a: 'Ops, metrics and tech ready to grow.', tag: '04 · Scale' },
    { q: 'Shall we execute?', a: 'We stand by every decision. Really.', tag: '05 · Partner' },
  ];

  const step = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const localP = (progress * frames.length) - step;

  const bgs = [S.bg, S.forest, S.bgInk, S.forest, S.bg];
  const inks = [S.ink, S.inkOnDark, S.inkOnDark, S.inkOnDark, S.ink];
  const bg = bgs[step];
  const ink = inks[step];

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        height: `${frames.length * 100}vh`,
        position: 'relative',
        background: bg,
        transition: 'background .5s ease',
        color: ink,
      }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: ink === S.inkOnDark ? 0.07 : 0.045,
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          transition: 'opacity .5s',
        }} />

        {/* Accent glow for dark steps */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: ink === S.inkOnDark
            ? `radial-gradient(700px circle at 15% 65%, rgba(163,230,53,0.13), transparent 55%)`
            : 'none',
          transition: 'background .5s',
        }} />

        {/* Large ghost step number */}
        <div
          key={`bg-num-${step}`}
          style={{
            position: 'absolute',
            right: isMobile ? '-8vw' : '3vw',
            bottom: isMobile ? '-8vw' : '-3vw',
            fontFamily: S.display,
            fontSize: isMobile ? '48vw' : 'clamp(260px, 32vw, 500px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            WebkitTextStroke: `1.5px ${ink === S.inkOnDark ? 'rgba(255,255,255,0.13)' : 'rgba(10,10,10,0.07)'}`,
            color: 'transparent',
            userSelect: 'none',
            pointerEvents: 'none',
            animation: 'v1-story-num .8s cubic-bezier(.2,.7,.1,1) both',
          }}
        >0{step + 1}</div>

        <div style={{
          position: 'absolute', left: isMobile ? 16 : 48, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {frames.map((f, i) => (
            <div key={i} style={{
              width: i === step ? 10 : 6, height: i === step ? 10 : 6,
              borderRadius: '50%',
              background: i <= step ? (i === step && inks[i] === S.inkOnDark ? S.accent : (inks[i] === S.inkOnDark ? S.inkOnDark : S.ink)) : 'transparent',
              border: `1.5px solid ${inks[step] === S.inkOnDark ? S.inkOnDark : S.ink}`,
              transition: 'all .3s',
            }} />
          ))}
        </div>

        <div style={{
          position: 'absolute', top: isMobile ? 20 : 48, right: isMobile ? 20 : 48,
          fontFamily: S.mono, fontSize: isMobile ? 10 : 12, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: ink === S.inkOnDark ? S.accent : ink,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ opacity: 0.5 }}>{String(step + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}</span>
          {!isMobile && <span style={{ width: 40, height: 1, background: 'currentColor', opacity: 0.3 }} />}
          {!isMobile && <span>{frames[step].tag.split('·')[1]?.trim()}</span>}
        </div>

        <div style={{
          maxWidth: 1100,
          padding: isMobile ? '0 16px 0 36px' : '0 48px',
          width: '100%',
          display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 40,
          transform: `translateY(${(localP - 0.5) * -30}px)`,
          transition: 'transform .2s linear',
        }}>
          <div
            key={`q-${step}`}
            style={{
              fontFamily: S.mono, fontSize: isMobile ? 11 : 14,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: ink === S.inkOnDark ? S.accent : S.inkSoft,
              animation: 'v1-story-in .6s cubic-bezier(.2,.7,.1,1) both',
            }}
          >→ {frames[step].tag}</div>

          <h2
            key={`a-${step}`}
            style={{
              fontFamily: S.display,
              fontSize: isMobile ? 'clamp(36px, 9vw, 52px)' : 'clamp(72px, 9vw, 160px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: isMobile ? '100%' : '14ch',
              animation: 'v1-story-in .7s .1s cubic-bezier(.2,.7,.1,1) both',
            }}>
            <span style={{ display: 'block', color: ink === S.inkOnDark ? S.inkOnDark : S.ink, opacity: 0.95 }}>
              {frames[step].q}
            </span>
          </h2>

          <div
            key={`ans-${step}`}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: isMobile ? 12 : 32,
              animation: 'v1-story-in .8s .2s cubic-bezier(.2,.7,.1,1) both',
            }}
          >
            <div style={{
              fontFamily: S.display, fontSize: isMobile ? 32 : 72, lineHeight: 0.85,
              color: S.accent, opacity: 0.85, letterSpacing: '-0.02em', flexShrink: 0,
            }}>→</div>
            <p style={{
              fontFamily: S.sans,
              fontSize: isMobile ? 16 : 'clamp(20px, 2.4vw, 32px)',
              lineHeight: 1.45, margin: 0,
              color: ink === S.inkOnDark ? S.inkOnDark : S.ink,
              maxWidth: '26ch',
              fontWeight: 500,
            }}>{frames[step].a}</p>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: S.accent, transition: 'width .2s linear',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes v1-story-in {
          from { opacity: 0; transform: translateY(24px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes v1-story-num {
          from { opacity: 0; transform: translateX(48px) }
          to   { opacity: 1; transform: translateX(0) }
        }
      `}</style>
    </section>
  );
}
