import { useState, useEffect } from 'react';
import S from '../styles';
import { CountUp, useMobile } from '../hooks';

function modalBtn() {
  return {
    fontFamily: S.mono, fontSize: 11, letterSpacing: '0.1em',
    textTransform: 'uppercase', padding: '8px 14px', borderRadius: 999,
    border: `1px solid ${S.line}`, background: S.bg, color: S.ink,
    cursor: 'pointer',
  };
}

function carBtn(side) {
  return {
    position: 'absolute', top: '50%', [side]: 20, transform: 'translateY(-50%)',
    width: 48, height: 48, borderRadius: '50%',
    background: 'rgba(255,255,255,0.9)', color: S.ink,
    border: 'none', cursor: 'pointer',
    fontFamily: S.display, fontSize: 22, fontWeight: 900,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  };
}

function MetaKV({ label, value }) {
  return (
    <div>
      <div style={{
        fontFamily: S.mono, fontSize: 10, color: S.inkSoft,
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4,
      }}>{label}</div>
      <div style={{
        fontFamily: S.display, fontSize: 24, fontWeight: 900,
        letterSpacing: '-0.01em', color: S.ink,
      }}>{value}</div>
    </div>
  );
}

function LongBlock({ label, body, n, highlight }) {
  return (
    <div style={{
      padding: 32, borderRadius: 6,
      background: highlight ? S.forest : S.bgSoft,
      color: highlight ? S.inkOnDark : S.ink,
      border: highlight ? 'none' : `1px solid ${S.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
        <span style={{ fontFamily: S.mono, fontSize: 11, letterSpacing: '0.14em', opacity: 0.7, textTransform: 'uppercase' }}>{n}</span>
        <span style={{ fontFamily: S.display, fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em' }}>{label}</span>
      </div>
      <div style={{ fontFamily: S.sans, fontSize: 15, lineHeight: 1.6 }}>{body}</div>
    </div>
  );
}

function SlideArt({ index, sector }) {
  const hues = [
    { bg1: S.forest, accent: S.accent },
    { bg1: S.ink, accent: S.accent },
    { bg1: S.forest, accent: '#fff' },
    { bg1: S.ink, accent: S.accent },
  ];
  const h = hues[index % hues.length];
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        <pattern id={`sp-grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={h.accent} strokeOpacity="0.12" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="450" fill={`url(#sp-grid-${index})`} />
      <g transform="translate(220 60)">
        <rect width="360" height="340" rx="16" fill="#fff" opacity="0.98" />
        <rect width="360" height="48" rx="16" fill={h.bg1} />
        <rect y="32" width="360" height="16" fill={h.bg1} />
        <circle cx="24" cy="24" r="6" fill={h.accent} />
        <rect x="44" y="20" width="80" height="8" rx="4" fill="#fff" opacity="0.7" />
        <rect x="24" y="72" width="220" height="18" rx="4" fill="#222" />
        <rect x="24" y="100" width="312" height="10" rx="4" fill="#ddd" />
        <rect x="24" y="116" width="280" height="10" rx="4" fill="#ddd" />
        <rect x="24" y="148" width="312" height="120" rx="8" fill={h.bg1} opacity="0.08" />
        {[30, 52, 75, 64, 88, 70, 102].map((v, i) => (
          <rect key={i} x={40 + i * 42} y={268 - v} width="24" height={v}
            fill={i === 6 ? h.accent : h.bg1} opacity={i === 6 ? 1 : 0.75} />
        ))}
        <rect x="24" y="288" width="120" height="36" rx="18" fill={h.bg1} />
        <rect x="44" y="302" width="80" height="8" rx="4" fill="#fff" />
        <rect x="156" y="288" width="100" height="36" rx="18" fill="none" stroke={h.bg1} strokeWidth="1.5" />
      </g>
      <g opacity="0.9">
        <rect x="24" y="120" width="160" height="40" rx="20" fill={h.accent} />
        <circle cx="48" cy="140" r="6" fill={h.bg1} />
      </g>
      <g opacity="0.9">
        <rect x="620" y="260" width="160" height="60" rx="8" fill="#fff" opacity="0.95" />
        <rect x="636" y="276" width="50" height="8" rx="4" fill="#888" />
        <rect x="636" y="292" width="120" height="14" rx="4" fill="#222" />
      </g>
    </svg>
  );
}

export default function CaseModal({ t, lang, idx, items, onClose, onNav }) {
  const c = items[idx];
  const [slide, setSlide] = useState(0);
  const L = t.cases.labels;
  const isMobile = useMobile();

  useEffect(() => { setSlide(0); }, [idx]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setSlide(s => (s + 1) % c.images.length);
      if (e.key === 'ArrowLeft') setSlide(s => (s - 1 + c.images.length) % c.images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [idx, c.images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'center', padding: isMobile ? 0 : 40,
        overflowY: 'auto',
        animation: 'cm-fade .3s ease',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: S.bg, maxWidth: 1240, width: '100%',
          borderRadius: isMobile ? 0 : 8, overflow: 'hidden',
          border: isMobile ? 'none' : `1px solid ${S.ink}`,
          display: 'flex', flexDirection: 'column',
          animation: 'cm-slide .35s cubic-bezier(.2,.7,.1,1)',
          alignSelf: 'flex-start',
          minHeight: 'min-content',
        }}>

        <div style={{
          padding: isMobile ? '14px 16px' : '20px 32px', borderBottom: `1px solid ${S.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: S.bg, zIndex: 5,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontFamily: S.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.inkSoft }}>
              CASE 0{idx + 1} / 0{items.length}
            </div>
            <div style={{ width: 1, height: 16, background: S.line }} />
            <div style={{ fontFamily: S.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: S.ink }}>
              {c.sector}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onNav(-1)} style={modalBtn()}>←</button>
            <button onClick={() => onNav(1)} style={modalBtn()}>→</button>
            <button onClick={onClose} style={{ ...modalBtn(), background: S.ink, color: S.bg }}>{L.close} ×</button>
          </div>
        </div>

        <div style={{ padding: isMobile ? '32px 20px 24px' : '56px 48px 40px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: isMobile ? 20 : 48, alignItems: 'end' }}>
          <div>
            <div style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{L.client}</div>
            <div style={{ fontFamily: S.display, fontSize: isMobile ? 'clamp(40px, 12vw, 72px)' : 'clamp(56px, 8vw, 112px)', lineHeight: 0.9, letterSpacing: '-0.03em', fontWeight: 900, color: S.ink, textTransform: 'uppercase' }}>{c.client}</div>
            <div style={{ fontFamily: S.sans, fontSize: isMobile ? 16 : 22, marginTop: 16, maxWidth: '44ch', lineHeight: 1.4, color: S.ink }}>{c.brief}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 12 : 18, textAlign: isMobile ? 'left' : 'right', flexWrap: 'wrap' }}>
            <MetaKV label={L.year} value={c.year} />
            <MetaKV label={L.duration} value={c.duration} />
            <div style={{ padding: '14px 18px', background: S.accent, color: S.accentInk, borderRadius: 6, marginTop: isMobile ? 0 : 8 }}>
              <div style={{ fontFamily: S.mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 4 }}>Outcome</div>
              <div style={{ fontFamily: S.display, fontSize: 28, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.01em' }}>{c.result}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: isMobile ? '0 20px 24px' : '0 48px 40px' }}>
          <div style={{
            fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase',
            borderTop: `1px solid ${S.ink}`, paddingTop: 14, marginBottom: 20,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>{L.gallery}</span>
            <span>{String(slide + 1).padStart(2, '0')} / {String(c.images.length).padStart(2, '0')}</span>
          </div>
          <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: `1px solid ${S.line}`, aspectRatio: '16 / 9', background: S.bgSoft }}>
            <div style={{ display: 'flex', height: '100%', transform: `translateX(-${slide * 100}%)`, transition: 'transform .4s cubic-bezier(.2,.7,.1,1)' }}>
              {c.images.map((label, i) => (
                <div key={i} style={{
                  flex: '0 0 100%', height: '100%', position: 'relative',
                  background: i % 2 === 0 ? S.forest : S.ink, color: S.inkOnDark,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <SlideArt index={i} sector={c.sector} />
                  <div style={{ position: 'absolute', left: 24, top: 24, fontFamily: S.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7 }}>Shot {String(i + 1).padStart(2, '0')}</div>
                  <div style={{ position: 'absolute', left: 24, bottom: 24, fontFamily: S.display, fontSize: 36, letterSpacing: '-0.01em', fontWeight: 900 }}>{label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setSlide(s => (s - 1 + c.images.length) % c.images.length)} style={carBtn('left')}>←</button>
            <button onClick={() => setSlide(s => (s + 1) % c.images.length)} style={carBtn('right')}>→</button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 16, justifyContent: 'center' }}>
            {c.images.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 32 : 8, height: 8, borderRadius: 999,
                background: i === slide ? S.ink : S.line,
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width .25s, background .25s',
              }} />
            ))}
          </div>
        </div>

        <div style={{ margin: isMobile ? '0 20px 24px' : '0 48px 40px', padding: isMobile ? '24px 20px' : '32px 40px', background: S.ink, color: S.bg, borderRadius: 6, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 16 : 24 }}>
          {c.metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: S.display, fontSize: 48, lineHeight: 1, color: S.accent, letterSpacing: '-0.02em', fontWeight: 900 }}>
                <CountUp to={m.n} />{m.s}
              </div>
              <div style={{ fontFamily: S.mono, fontSize: 10, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a4a096' }}>{m.l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: isMobile ? '16px 20px 40px' : '20px 48px 60px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 40 }}>
          <LongBlock label={L.challenge} body={c.challenge} n="01" />
          <LongBlock label={L.approach} body={c.approach} n="02" highlight />
          <LongBlock label={L.outcome} body={c.outcome} n="03" />
        </div>

        <div style={{ padding: isMobile ? '24px 20px' : '40px 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, borderTop: `1px solid ${S.line}` }}>
          <div>
            <div style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{L.stack}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {c.stack.map((s, i) => (
                <span key={i} style={{ fontFamily: S.mono, fontSize: 12, letterSpacing: '0.05em', padding: '8px 14px', borderRadius: 6, background: S.bgSoft, border: `1px solid ${S.line}`, color: S.ink }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{L.services}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {c.services.map((s, i) => (
                <span key={i} style={{ fontFamily: S.sans, fontSize: 13, fontWeight: 500, padding: '8px 14px', borderRadius: 999, background: S.accent, color: S.accentInk }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ margin: isMobile ? '0 20px 32px' : '0 48px 48px', padding: isMobile ? '32px 24px' : '48px 56px', background: S.forest, color: S.inkOnDark, borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, left: 24, fontFamily: S.display, fontSize: 240, lineHeight: 1, color: S.accent, opacity: 0.3, fontWeight: 900 }}>"</div>
          <div style={{ fontFamily: S.mono, fontSize: 11, color: S.accent, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20, position: 'relative' }}>— {L.testimonial}</div>
          <div style={{ fontFamily: S.display, fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.2, letterSpacing: '-0.01em', maxWidth: '30ch', marginBottom: 32, position: 'relative', fontStyle: 'italic' }}>"{c.testimonial.quote}"</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: S.accent, color: S.accentInk, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: S.display, fontSize: 22, fontWeight: 900 }}>
              {c.testimonial.author.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div style={{ fontFamily: S.sans, fontSize: 16, fontWeight: 600 }}>{c.testimonial.author}</div>
              <div style={{ fontFamily: S.sans, fontSize: 14, opacity: 0.7, marginTop: 2 }}>{c.testimonial.role}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: isMobile ? '20px 20px 28px' : '28px 48px 32px', borderTop: `1px solid ${S.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <button onClick={() => onNav(-1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: S.sans, fontSize: 14, color: S.inkSoft, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: S.display, fontSize: 24 }}>←</span>
            {L.prev}
          </button>
          <a href="#s5" onClick={onClose} style={{ background: S.ink, color: S.bg, padding: '16px 28px', fontFamily: S.sans, fontSize: 15, fontWeight: 600, textDecoration: 'none', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {lang === 'es' ? 'Quiero algo así' : 'I want something like this'} →
          </a>
          <button onClick={() => onNav(1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: S.sans, fontSize: 14, color: S.inkSoft, display: 'flex', alignItems: 'center', gap: 10 }}>
            {L.next}
            <span style={{ fontFamily: S.display, fontSize: 24 }}>→</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes cm-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes cm-slide {
          from { opacity: 0; transform: translateY(30px) }
          to   { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  );
}
