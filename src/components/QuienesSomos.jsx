import { useState } from 'react';
import S from '../styles';
import { useMobile, Reveal, Highlight } from '../hooks';

const DEFAULT_MEMBERS = [
  {
    name: 'Federico Villegas',
    role: 'Cofounder · Business Lead',
    bio: 'Define estrategia, estructura y dirección comercial. Convierte ideas en sistemas claros y negocios preparados para crecer, alineando visión, oportunidades y toma de decisiones para impulsar cada proyecto.',
    initials: 'FV',
    photo: '/fedeprofile.webp',
  },

  {
    name: 'Juan Segundo Sosa',
    role: 'Cofounder · Tech & Product Lead',
    bio: 'Lidera el desarrollo técnico y la construcción de productos digitales, transformando ideas en soluciones escalables, funcionales y centradas en resolver problemas reales.',
    initials: 'JS',
    photo: '/juanprofile.webp',
  },
];

export default function QuienesSomos({
  label = '02 · Quiénes somos',
  title = 'Quiénes somos.',
  body = 'Detrás de SOVIL hay dos personas que entran al detalle. Estrategia y ejecución, sentadas en la misma mesa.',
  members = DEFAULT_MEMBERS,
  style,
}) {
  const isMobile = useMobile();

  return (
    <section
      id="team"
      style={{
        background: S.bgSoft,
        borderTop: `1px solid ${S.line}`,
        borderBottom: `1px solid ${S.line}`,
        padding: isMobile ? '80px 24px' : '144px 48px',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'end',
          marginBottom: isMobile ? '64px' : '96px',
        }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: S.mono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: S.inkSoft,
              borderTop: `1px solid ${S.ink}`,
              paddingTop: '12px',
            }}
          >
            {label}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div>
            <h2
              style={{
                fontFamily: S.display,
                fontWeight: 800,
                textTransform: 'uppercase',
                color: S.ink,
                margin: 0,
                maxWidth: '14ch',
                letterSpacing: '0.005em',
                lineHeight: 1.05,
                fontSize: 'clamp(48px, 6vw, 100px)',
              }}
            >
              Quiénes{' '}
              <Highlight delay={300}>somos.</Highlight>
            </h2>
            {body && (
              <p
                style={{
                  fontFamily: S.sans,
                  fontSize: '19px',
                  lineHeight: 1.5,
                  color: S.ink,
                  marginTop: '24px',
                  marginBottom: 0,
                  maxWidth: '52ch',
                }}
              >
                {body}
              </p>
            )}
          </div>
        </Reveal>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '32px',
        }}
      >
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 100}>
            <TeamCard member={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }) {
  const [hover, setHover] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: S.bg,
        borderRadius: '8px',
        boxShadow: '0 1px 0 0 rgba(255,255,255,0.04)',
        padding: '48px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        justifyContent: 'space-between',
        border: hover ? `1px solid ${S.accent}` : `1px solid ${S.line}`,
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(.2,.7,.1,1)',
      }}
    >
      {/* Top-right corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '3px',
          background: S.accent,
          width: hover ? '80px' : '0',
          transition: 'width 0.3s cubic-bezier(.2,.7,.1,1)',
        }}
      />

      {/* Photo / placeholder */}
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '200px',
          marginBottom: '32px',
          overflow: 'hidden',
          flexShrink: 0,
          borderRadius: '50%',
        }}
      >
        {/* Photo */}
        {member.photo && !imgFailed && (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '50%',
              zIndex: 2,
              transform: 'scale(1.25) translateY(10px)',
            }}
          />
        )}

        {/* Initials fallback */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: S.bgSoft,
            border: `1.5px dashed ${S.inkSoft}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: S.display,
            fontWeight: 800,
            fontSize: '56px',
            letterSpacing: '0.02em',
            color: S.inkMuted,
            zIndex: member.photo && !imgFailed ? 1 : 2,
          }}
        >
          {member.initials}
        </div>

        {/* Accent ring on hover */}
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            bottom: '-8px',
            left: '-8px',
            borderRadius: '50%',
            border: `2px solid ${S.accent}`,
            pointerEvents: 'none',
            zIndex: 3,
            opacity: hover ? 0.9 : 0,
            transform: hover ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 0.3s, transform 0.3s',
          }}
        />
      </div>

      {/* Name */}
      <div
        style={{
          fontFamily: S.display,
          fontWeight: 800,
          textTransform: 'uppercase',
          fontSize: '28px',
          letterSpacing: '0.005em',
          lineHeight: 1.1,
          color: S.ink,
          marginBottom: '8px',
        }}
      >
        {member.name}
      </div>

      {/* Role */}
      <div
        style={{
          fontFamily: S.mono,
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: S.accent,
          marginBottom: '24px',
        }}
      >
        {member.role}
      </div>

      {/* Bio */}
      <p
        style={{
          fontFamily: S.sans,
          fontSize: '15px',
          lineHeight: 1.6,
          color: S.bio,
          margin: 0,
          maxWidth: '38ch',
        }}
      >
        {member.bio}
      </p>
    </article>
  );
}
