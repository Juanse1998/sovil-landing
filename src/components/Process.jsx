import { useState } from 'react';
import S from '../styles';
import { Reveal, useMobile } from '../hooks';

export default function Process({ t }) {
  const [open, setOpen] = useState(0);
  const isMobile = useMobile();
  return (
    <section id="s2" style={{ padding: isMobile ? '80px 20px' : '140px 48px', background: S.bgInk, color: S.inkOnDark }}>
      <Reveal>
        <h2 style={{
          fontFamily: S.display,
          fontSize: 'clamp(48px, 6vw, 100px)',
          lineHeight: 0.92, letterSpacing: '-0.02em',
          margin: '0 0 60px', color: S.inkOnDark, maxWidth: '12ch',
        }}>{t.process.title}</h2>
      </Reveal>

      <div style={{ borderTop: `1px solid ${S.lineOnDark}` }}>
        {t.process.steps.map((step, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: `1px solid ${S.lineOnDark}` }}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%', padding: isMobile ? '20px 0' : '28px 0',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '40px 1fr auto' : '80px 1fr auto',
                  gap: isMobile ? 16 : 32,
                  alignItems: 'center', textAlign: 'left',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', color: S.inkOnDark,
                }}>
                <span style={{
                  fontFamily: S.mono, fontSize: 12, color: S.inkOnDark, letterSpacing: '0.1em', opacity: 0.6,
                }}>{step.n}</span>
                <span style={{
                  fontFamily: S.display,
                  fontSize: isMobile ? 'clamp(22px, 5vw, 32px)' : 'clamp(28px, 3.2vw, 48px)',
                  color: S.inkOnDark, letterSpacing: '-0.01em', lineHeight: 1.05,
                }}>{step.t}</span>
                <span style={{
                  width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: '50%',
                  border: `1.5px solid ${S.inkOnDark}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: S.sans, fontSize: 20, color: isOpen ? S.ink : S.inkOnDark,
                  background: isOpen ? S.accent : 'transparent',
                  borderColor: isOpen ? S.accent : S.inkOnDark,
                  transition: 'background .2s, transform .25s, border-color .2s, color .2s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                }}>+</span>
              </button>
              <div style={{
                maxHeight: isOpen ? 500 : 0,
                overflow: 'hidden',
                transition: 'max-height .4s cubic-bezier(.2,.7,.3,1)',
              }}>
                <div style={{
                  padding: isOpen ? `0 0 32px ${isMobile ? '0' : '80px'}` : `0 0 0 ${isMobile ? '0' : '80px'}`,
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
                  gap: isMobile ? 20 : 48,
                }}>
                  <p style={{
                    fontFamily: S.sans, fontSize: isMobile ? 16 : 19, lineHeight: 1.5,
                    color: S.inkOnDark, margin: 0, maxWidth: '44ch', opacity: 0.9,
                  }}>{step.d}</p>
                  {!isMobile && (
                    <div style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: `1px solid ${S.lineOnDark}`,
                      borderRadius: 4, padding: '16px 20px',
                      fontFamily: S.mono, fontSize: 12, color: 'rgba(245,243,238,0.65)',
                      letterSpacing: '0.04em', lineHeight: 1.8,
                    }}>
                      <div style={{ color: S.accent, marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Entregables</div>
                      {i === 0 && ['◆ Audit interno', '◆ Mapa de stakeholders', '◆ Hipótesis priorizadas'].map((x, j) => <div key={j}>{x}</div>)}
                      {i === 1 && ['◆ Business model canvas', '◆ Roadmap trimestral', '◆ KPIs definidos'].map((x, j) => <div key={j}>{x}</div>)}
                      {i === 2 && ['◆ Sprints semanales', '◆ Releases medibles', '◆ Documentación viva'].map((x, j) => <div key={j}>{x}</div>)}
                      {i === 3 && ['◆ Ops playbooks', '◆ Dashboards', '◆ Plan de iteración'].map((x, j) => <div key={j}>{x}</div>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
