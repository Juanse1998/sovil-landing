import { useState } from 'react';
import S from '../styles';
import { Reveal, CountUp, useMobile } from '../hooks';
import CaseCard from './CaseCard';
import CaseModal from './CaseModal';

export default function Cases({ t, lang }) {
  const [filter, setFilter] = useState(0);
  const [openIdx, setOpenIdx] = useState(null);
  const isMobile = useMobile();

  const filters = t.cases.filters || ['Todos'];
  const items = t.cases.items;
  const filtered = filter === 0 ? items : items.filter(c => c.sector === filters[filter]);

  return (
    <section id="s3" style={{ padding: isMobile ? '80px 20px' : '140px 48px', background: S.bgSoft, borderBottom: `1px solid ${S.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '140px 1fr auto', gap: isMobile ? 12 : 40, alignItems: 'end', marginBottom: isMobile ? 32 : 60 }}>
        {!isMobile && <div style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase', borderTop: `1px solid ${S.ink}`, paddingTop: 12 }}>{t.cases.label}</div>}
        <Reveal>
          <h2 style={{ fontFamily: S.display, fontSize: 'clamp(48px, 6vw, 100px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: 0, color: S.ink, maxWidth: '14ch' }}>{t.cases.title}</h2>
        </Reveal>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
        {filters.map((f, i) => (
          <button key={i} onClick={() => setFilter(i)} style={{
            fontFamily: S.mono, fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', padding: '10px 16px',
            borderRadius: 999, cursor: 'pointer',
            border: `1px solid ${filter === i ? S.ink : S.line}`,
            background: filter === i ? S.ink : 'transparent',
            color: filter === i ? S.bg : S.ink,
            transition: 'all .2s',
          }}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.12em', textTransform: 'uppercase', alignSelf: 'center' }}>
          {String(filtered.length).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
          {filtered.map((c) => (
            <CaseCard key={c.client} t={t} c={c} idx={items.indexOf(c)} size="sm" onOpen={() => setOpenIdx(items.indexOf(c))} />
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: filtered.length >= 3 ? '1.5fr 1fr' : '1fr', gap: 16, marginBottom: 16 }}>
            {filtered[0] && (
              <CaseCard t={t} c={filtered[0]} idx={items.indexOf(filtered[0])} size="lg" onOpen={() => setOpenIdx(items.indexOf(filtered[0]))} />
            )}
            {filtered.length >= 3 && (
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 16 }}>
                {filtered.slice(1, 3).map((c) => (
                  <CaseCard key={c.client} t={t} c={c} idx={items.indexOf(c)} size="sm" onOpen={() => setOpenIdx(items.indexOf(c))} />
                ))}
              </div>
            )}
          </div>
          {filtered.length === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {filtered.slice(1).map((c) => (
                <CaseCard key={c.client} t={t} c={c} idx={items.indexOf(c)} size="sm" onOpen={() => setOpenIdx(items.indexOf(c))} />
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: isMobile ? 32 : 60, padding: isMobile ? '28px 20px' : '40px 32px', background: S.ink, color: S.bg, borderRadius: 6, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 20 : 24 }}>
        {[
          { n: 12, s: '+', l: lang === 'es' ? 'negocios en marcha' : 'businesses live' },
          { n: 9, s: '', l: lang === 'es' ? 'años de promedio por proyecto' : 'yrs avg per project' },
          { n: 24, s: 'h', l: lang === 'es' ? 'tiempo de respuesta' : 'response time' },
          { n: 100, s: '%', l: lang === 'es' ? 'criterio. siempre.' : 'judgment. always.' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontFamily: S.display, fontSize: 56, lineHeight: 1, color: S.accent, letterSpacing: '-0.02em' }}>
              <CountUp to={s.n} />{s.s}
            </div>
            <div style={{ fontFamily: S.mono, fontSize: 11, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a4a096' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {openIdx !== null && (
        <CaseModal
          t={t} lang={lang}
          idx={openIdx}
          items={items}
          onClose={() => setOpenIdx(null)}
          onNav={(dir) => setOpenIdx((openIdx + dir + items.length) % items.length)}
        />
      )}
    </section>
  );
}
