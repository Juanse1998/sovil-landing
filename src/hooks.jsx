import { useState, useEffect, useRef } from 'react';
import SOVIL_CONTENT from './content';

export function useSovilState(storageKey = 'sovil') {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem(storageKey + '.lang') || 'es'; } catch { return 'es'; }
  });
  useEffect(() => {
    try { localStorage.setItem(storageKey + '.lang', lang); } catch {}
  }, [lang, storageKey]);

  const t = SOVIL_CONTENT[lang];
  return { lang, setLang, t, toggleLang: () => setLang(l => l === 'es' ? 'en' : 'es') };
}

export function useContactForm() {
  const [data, setData] = useState({ name: '', email: '', company: '', stage: 0, message: '' });
  const [status, setStatus] = useState('idle');
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const submit = async (e) => {
    e?.preventDefault();
    setStatus('sending');
    await new Promise(r => setTimeout(r, 900));
    setStatus('sent');
  };
  const reset = () => { setData({ name: '', email: '', company: '', stage: 0, message: '' }); setStatus('idle'); };
  return { data, update, status, submit, reset };
}

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

export function useInView(ref, options = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setInView(true); });
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

export function Reveal({ children, delay = 0, as: Tag = 'div', style, ...rest }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <Tag
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .7s cubic-bezier(.2,.7,.1,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.1,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CountUp({ to, prefix = '', suffix = '', duration = 1200 }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [vis, to, duration]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}
