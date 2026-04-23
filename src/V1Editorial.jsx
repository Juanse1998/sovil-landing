import S from './styles';
import { useSovilState } from './hooks';
import ScrollProgress from './components/ScrollProgress';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Story from './components/Story';
import Manifesto from './components/Manifesto';
import Services from './components/Services';
import Process from './components/Process';
import Cases from './components/Cases';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function V1Editorial() {
  const { lang, t, toggleLang } = useSovilState('sovil.v1');
  return (
    <div style={{ background: S.bg, color: S.ink, fontFamily: S.sans }}>
      <ScrollProgress />
      <Nav t={t} lang={lang} toggleLang={toggleLang} />
      <Hero t={t} lang={lang} />
      <Marquee lang={lang} />
      <Story t={t} lang={lang} />
      <Manifesto t={t} />
      <Services t={t} />
      <Process t={t} />
      <Cases t={t} lang={lang} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
