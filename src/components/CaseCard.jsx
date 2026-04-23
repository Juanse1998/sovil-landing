import { useState } from 'react';
import S from '../styles';
import { Reveal } from '../hooks';
import SectorGraphic from './SectorGraphic';

export default function CaseCard({ t, c, idx, size, onOpen }) {
  const [hover, setHover] = useState(false);
  const isLg = size === 'lg';
  return (
    <Reveal delay={idx * 80}>
      <div
        onClick={onOpen}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: S.bg, border: `1px solid ${S.line}`,
          borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
          display: 'flex', flexDirection: 'column',
          height: isLg ? 640 : '100%',
          minHeight: isLg ? 640 : 312,
          transition: 'transform .35s cubic-bezier(.2,.7,.1,1), box-shadow .35s',
          transform: hover ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hover ? '0 32px 64px -28px rgba(0,0,0,0.25)' : 'none',
          position: 'relative',
        }}>
        <div style={{
          flex: isLg ? '1 1 60%' : '1 1 55%',
          position: 'relative', overflow: 'hidden',
          background: c.sector === 'Fintech' ? S.forest
            : c.sector === 'Retail' ? S.bgInk
              : S.accent,
          color: c.sector === 'SaaS B2B' || c.sector === 'B2B SaaS' ? S.ink : S.inkOnDark,
        }}>
          <SectorGraphic sector={c.sector} size={isLg ? 'lg' : 'sm'} />

          <div style={{
            position: 'absolute', top: 20, left: 24,
            fontFamily: S.display, fontSize: isLg ? 28 : 22,
            fontWeight: 900, letterSpacing: '-0.01em', opacity: 0.95,
          }}>{(c.client || '').toUpperCase()}</div>

          <div style={{ position: 'absolute', top: 20, right: 24, display: 'flex', gap: 6 }}>
            {[c.year, c.duration].map((label, i) => (
              <span key={i} style={{
                fontFamily: S.mono, fontSize: 10,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 999,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}>{label}</span>
            ))}
          </div>

          <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24 }}>
            <div style={{
              fontFamily: S.mono, fontSize: 10,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              opacity: 0.75, marginBottom: 8,
            }}>{c.sector}</div>
            <div style={{
              fontFamily: S.display, fontSize: isLg ? 72 : 40,
              lineHeight: 0.95, letterSpacing: '-0.02em',
              fontWeight: 900, maxWidth: '14ch',
            }}>{c.result}</div>
          </div>
        </div>

        <div style={{
          flex: '0 0 auto',
          padding: isLg ? '28px 32px' : '20px 24px',
          borderTop: `1px solid ${S.line}`,
          background: S.bg,
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <div style={{ fontFamily: S.sans, fontSize: isLg ? 16 : 14, lineHeight: 1.5, color: S.ink }}>{c.brief}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(c.services || []).slice(0, isLg ? 4 : 2).map((srv, i) => (
                <span key={i} style={{
                  fontFamily: S.mono, fontSize: 10,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 999,
                  background: S.bgSoft, border: `1px solid ${S.line}`,
                  color: S.inkSoft,
                }}>{srv}</span>
              ))}
            </div>
            <div style={{
              fontFamily: S.sans, fontSize: 13, fontWeight: 600,
              color: S.ink, display: 'flex', alignItems: 'center', gap: 8,
              whiteSpace: 'nowrap',
              transform: hover ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform .25s',
            }}>
              {t.cases.labels.view}
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 24, height: 24, borderRadius: '50%',
                background: S.accent, color: S.accentInk,
                fontFamily: S.display, fontSize: 16, fontWeight: 900,
              }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
