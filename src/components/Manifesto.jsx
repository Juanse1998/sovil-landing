import S from '../styles';
import { Reveal, useMobile } from '../hooks';

export default function Manifesto({ t }) {
  const isMobile = useMobile();
  return (
    <section style={{
      padding: isMobile ? '80px 20px' : '140px 48px',
      background: S.bgSoft,
      borderTop: `1px solid ${S.line}`,
      borderBottom: `1px solid ${S.line}`,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
        gap: isMobile ? 32 : 80,
        alignItems: 'start',
      }}>
        <Reveal>
          <h2 style={{
            fontFamily: S.display,
            fontSize: 'clamp(48px, 6vw, 100px)',
            lineHeight: 0.92, letterSpacing: '-0.02em',
            margin: 0, color: S.ink, maxWidth: '12ch',
          }}>
            Un socio, <span style={{
              background: S.accent, padding: '0 8px',
              boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone',
            }}>no</span> un proveedor.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{
            fontFamily: S.sans, fontSize: isMobile ? 18 : 22,
            lineHeight: 1.45, margin: 0, color: S.ink, maxWidth: '42ch',
          }}>{t.manifesto.body}</p>
        </Reveal>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 1, marginTop: isMobile ? 48 : 100,
        background: S.line, border: `1px solid ${S.line}`,
      }}>
        {t.manifesto.pillars.map((p, i) => (
          <Reveal key={i} delay={i * 100} style={{ background: S.bg, padding: isMobile ? '32px 24px' : '44px 36px' }}>
            <div style={{
              fontFamily: S.display, fontSize: isMobile ? 48 : 64, lineHeight: 0.9,
              letterSpacing: '-0.02em', marginBottom: 16,
              WebkitTextStroke: `1.5px ${S.ink}`, color: 'transparent',
            }}>0{i + 1}</div>
            <div style={{
              fontFamily: S.display, fontSize: isMobile ? 26 : 32, color: S.ink,
              marginBottom: 10, letterSpacing: '-0.01em',
            }}>{p.k}</div>
            <div style={{
              fontFamily: S.sans, fontSize: 15, lineHeight: 1.5, color: S.inkSoft,
            }}>{p.v}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
