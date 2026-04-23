import S from '../styles';
import { useContactForm, useMobile } from '../hooks';

function Field({ label, value, onChange, type = 'text', multiline, placeholder, required }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}{required && ' *'}
      </span>
      {multiline ? (
        <textarea
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={4}
          style={{ border: `1.5px solid ${S.line}`, background: S.bg, borderRadius: 6, padding: 14, fontFamily: S.sans, fontSize: 16, color: S.ink, resize: 'vertical', outline: 'none', transition: 'border-color .2s' }}
          onFocus={e => e.target.style.borderColor = S.ink}
          onBlur={e => e.target.style.borderColor = S.line}
        />
      ) : (
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          required={required} placeholder={placeholder}
          style={{ border: 'none', borderBottom: `1.5px solid ${S.line}`, background: 'transparent', padding: '10px 0', fontFamily: S.sans, fontSize: 18, color: S.ink, outline: 'none', transition: 'border-color .2s' }}
          onFocus={e => e.target.style.borderColor = S.ink}
          onBlur={e => e.target.style.borderColor = S.line}
        />
      )}
    </label>
  );
}

export default function Contact({ t }) {
  const { data, update, status, submit, reset } = useContactForm();
  const isMobile = useMobile();
  return (
    <section id="contact" style={{ padding: isMobile ? '80px 20px' : '140px 48px', background: S.bg, borderBottom: `1px solid ${S.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 40 : 80, alignItems: 'start' }}>
        <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
          <h2 style={{ fontFamily: S.display, fontSize: 'clamp(44px, 5.5vw, 88px)', lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 28px', color: S.ink, maxWidth: '14ch' }}>{t.contact.title}</h2>
          <p style={{ fontFamily: S.sans, fontSize: 18, lineHeight: 1.5, margin: 0, color: S.inkSoft, maxWidth: '36ch' }}>{t.contact.sub}</p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: S.mono, fontSize: 13, color: S.ink }}>
              <span style={{ color: S.inkSoft, marginRight: 8 }}>→</span>hola@sovil.co
            </div>
            <div style={{ fontFamily: S.mono, fontSize: 13, color: S.ink }}>
              <span style={{ color: S.inkSoft, marginRight: 8 }}>→</span>linkedin.com/company/sovil
            </div>
          </div>
        </div>

        {status === 'sent' ? (
          <div style={{ padding: '60px 48px', background: S.accent, border: `2px solid ${S.ink}`, borderRadius: 8, boxShadow: `6px 6px 0 ${S.ink}` }}>
            <div style={{ fontFamily: S.display, fontSize: 48, color: S.ink, lineHeight: 1, marginBottom: 16 }}>✓</div>
            <div style={{ fontFamily: S.display, fontSize: 36, color: S.ink, letterSpacing: '-0.01em', marginBottom: 16 }}>{t.contact.form.sent}</div>
            <button onClick={reset} style={{ marginTop: 24, background: 'transparent', border: `1.5px solid ${S.ink}`, padding: '12px 20px', borderRadius: 999, fontFamily: S.sans, fontSize: 14, cursor: 'pointer', color: S.ink }}>↻ Enviar otro</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: S.bgSoft, border: `1px solid ${S.line}`, borderRadius: 8, padding: isMobile ? 24 : 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
              <Field label={t.contact.form.name} value={data.name} onChange={v => update('name', v)} required />
              <Field label={t.contact.form.email} type="email" value={data.email} onChange={v => update('email', v)} required />
            </div>
            <Field label={t.contact.form.company} value={data.company} onChange={v => update('company', v)} />

            <div>
              <label style={{ fontFamily: S.mono, fontSize: 11, color: S.inkSoft, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>{t.contact.form.stage}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {t.contact.form.stages.map((s, i) => (
                  <button type="button" key={i} onClick={() => update('stage', i)} style={{
                    padding: '10px 16px', borderRadius: 999,
                    border: `1.5px solid ${data.stage === i ? S.ink : S.line}`,
                    background: data.stage === i ? S.ink : 'transparent',
                    color: data.stage === i ? S.bg : S.ink,
                    fontFamily: S.sans, fontSize: 14, cursor: 'pointer', transition: 'all .2s',
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <Field label={t.contact.form.message} multiline placeholder={t.contact.form.messagePlaceholder} value={data.message} onChange={v => update('message', v)} />

            <button type="submit" disabled={status === 'sending'} style={{
              background: S.accent, color: S.accentInk, border: `2px solid ${S.ink}`,
              padding: '20px 32px', borderRadius: 999,
              fontFamily: S.sans, fontSize: 16, fontWeight: 600, cursor: 'pointer',
              boxShadow: `4px 4px 0 ${S.ink}`,
              transition: 'transform .2s, box-shadow .2s',
              alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `6px 6px 0 ${S.ink}`; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${S.ink}`; }}
            >{status === 'sending' ? t.contact.form.sending : `${t.contact.form.submit} →`}</button>
          </form>
        )}
      </div>
    </section>
  );
}
