import S from '../styles';
import { useMobile } from '../hooks';
import SovilLogoImg from './SovilLogoImg';

export default function Nav({ t, lang, toggleLang }) {
  const isMobile = useMobile();
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 72, padding: isMobile ? '0 20px' : '0 48px', overflow: 'visible',
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${S.line}`,
      fontFamily: S.sans,
    }}>
      <SovilLogoImg height={85} />

      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {t.nav.map((n, i) => (
            <a key={i} href={`#s${i + 1}`} style={{
              fontSize: 13, color: S.inkSoft, textDecoration: 'none',
              fontFamily: S.mono, textTransform: 'uppercase', letterSpacing: '0.08em',
              transition: 'color .2s',
            }} onMouseEnter={e => e.target.style.color = S.ink} onMouseLeave={e => e.target.style.color = S.inkSoft}>
              {n}
            </a>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={toggleLang} style={{
          background: 'transparent', border: `1px solid ${S.line}`,
          padding: '6px 10px', borderRadius: 999,
          fontFamily: S.mono, fontSize: 11, letterSpacing: '0.1em',
          color: S.ink, cursor: 'pointer', textTransform: 'uppercase',
        }}>
          {lang === 'es' ? 'ES' : 'EN'}
        </button>
        <a href="#contact" style={{
          background: S.ink, color: S.bg,
          padding: isMobile ? '8px 14px' : '10px 20px',
          borderRadius: 999, fontSize: 13, textDecoration: 'none',
          fontFamily: S.sans, fontWeight: 600, letterSpacing: '0.01em',
        }}>{isMobile ? '→' : `${t.hero.cta} →`}</a>
      </div>
    </nav>
  );
}
