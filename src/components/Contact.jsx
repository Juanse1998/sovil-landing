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
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* <a href="mailto:hola@sovil.co" style={{ fontFamily: S.mono, fontSize: 13, color: S.ink, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={S.inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              hola@sovil.co
            </a>
            <a href="https://linkedin.com/company/sovil" target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.mono, fontSize: 13, color: S.ink, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={S.inkSoft}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              linkedin.com/company/sovil
            </a> */}
            <a href="https://wa.me/5493584019801" target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.mono, fontSize: 13, color: S.ink, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={S.inkSoft}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              +5493584019801
            </a>
            <a href="https://www.instagram.com/sovil.ok/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: S.mono, fontSize: 13, color: S.ink, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={S.inkSoft}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              @sovil.ok
            </a>
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

            {status === 'error' && (
              <div style={{ fontFamily: S.mono, fontSize: 13, color: '#dc2626', padding: '10px 14px', background: '#fef2f2', borderRadius: 6, border: '1px solid #fecaca' }}>
                Hubo un error al enviar. Intentá de nuevo o escribinos a hola@sovil.co
              </div>
            )}
            <button type="submit" disabled={status === 'sending'} style={{
              background: 'transparent',
              color: 'white', border: `1px solid ${S.accent}`,
              padding: '20px 32px', borderRadius: 999,
              fontFamily: S.sans, fontSize: 16, fontWeight: 600, cursor: 'pointer',
              alignSelf: 'flex-start', opacity: status === 'sending' ? 0.7 : 1,
            }}
              onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.transform = 'translate(-2px,-2px)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; }}
            >{status === 'sending' ? t.contact.form.sending : `${t.contact.form.submit} →`}</button>
          </form>
        )}
      </div>
    </section>
  );
}
