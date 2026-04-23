import S from '../styles';
import SovilLogoImg from './SovilLogoImg';
import { useMobile } from '../hooks';

export default function Footer({ t }) {
  const isMobile = useMobile();
  return (
    <footer style={{ padding: isMobile ? '60px 20px 32px' : '100px 48px 40px', background: S.ink, color: S.bg }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 40, alignItems: 'end', marginBottom: isMobile ? 48 : 80 }}>
        <div style={{ fontFamily: S.display, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: S.bg, maxWidth: '16ch' }}>
          {t.footer.tagline}
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: S.accent, color: S.accentInk,
            padding: isMobile ? '16px 24px' : '22px 36px', borderRadius: 999,
            fontFamily: S.sans, fontSize: isMobile ? 15 : 16, fontWeight: 600, textDecoration: 'none',
          }}>{t.hero.cta} →</a>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #2a2925', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <SovilLogoImg height={28} onDark />
        <div style={{ fontFamily: S.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a4a096' }}>{t.footer.rights}</div>
        <div style={{ display: 'flex', gap: 20 }}>
          {t.footer.links.map((l, i) => (
            <a key={i} href="#" style={{ fontFamily: S.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a4a096', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
