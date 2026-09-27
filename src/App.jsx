import { useCallback, useEffect, useState } from 'react';
import BookScene from './components/BookScene.jsx';

const projects = [
  { number: '01', name: 'Lumen Journal', category: 'BRAND · DIGITAL', note: 'A quieter kind of reading experience.', theme: 'lumen', mark: 'LUMEN' },
  { number: '02', name: 'Forma Studio', category: 'PRODUCT · UI', note: 'Making space for better habits.', theme: 'forma', mark: 'forma.' },
  { number: '03', name: 'Fable & Field', category: 'IDENTITY · E-COMMERCE', note: 'A new story for everyday rituals.', theme: 'fable', mark: 'Fable & Field' },
];

function Header() {
  return (
    <header className="topbar">
      <a className="wordmark" href="#home" aria-label="Akarshana home">A<span>.</span></a>
      <span className="topbar-note"><i /> AN OPEN BOOK <b>·</b> 2025—26</span>
      <a className="topbar-link" href="mailto:hello@akarshana.design">LET’S TALK <span>↗</span></a>
    </header>
  );
}

function ProjectCard({ project }) {
  return (
    <a className="project" href={`mailto:hello@akarshana.design?subject=${encodeURIComponent(`Tell me about ${project.name}`)}`}>
      <span className="project-number">{project.number}</span>
      <span className={`project-art art-${project.theme}`} aria-hidden="true">
        {project.theme === 'lumen' && <><span className="lumen-orb" /><span className="project-mark">{project.mark}</span></>}
        {project.theme === 'forma' && <><span className="forma-shape forma-a" /><span className="forma-shape forma-b" /><span className="project-mark">{project.mark}</span></>}
        {project.theme === 'fable' && <><span className="fable-sun" /><span className="project-mark">Fable<br /><i>&amp; Field</i></span></>}
        <span className="art-tag">{project.category}</span>
      </span>
      <span className="project-info"><span><strong>{project.name}</strong><small>{project.note}</small></span><span className="project-arrow">↗</span></span>
    </a>
  );
}

function BookSpread() {
  return (
    <>
      <div className="book-spread">
        <aside className="page page-left">
          <div className="page-meta"><span>CHAPTER I</span><span>ABOUT THE AUTHOR</span></div>
          <div className="portrait-wrap">
            <div className="portrait-art" role="img" aria-label="Abstract portrait illustration in warm, classical tones"><span className="portrait-orbit" /><span className="portrait-sun" /><span className="portrait-shape shape-one" /><span className="portrait-shape shape-two" /><span className="portrait-shape shape-three" /><span className="portrait-caption">FIG. 01 — A STUDY IN BECOMING</span></div>
            <span className="portrait-side">A.K. / IN PROGRESS</span>
          </div>
          <h2>Curious by<br />nature. <em>Intentional</em><br />by design.</h2>
          <p className="bio">I’m Akarshana—a designer and developer drawn to the space between a good idea and the feeling it leaves behind. I like thoughtful details, clear stories, and making the digital feel a little more human.</p>
          <div className="signature">Akarshana <span>✳</span></div>
          <div className="page-foot"><span>THE MAKING OF THINGS</span><span>02</span></div>
        </aside>
        <div className="spread-gutter" aria-hidden="true" />
        <article className="page page-right">
          <div className="page-meta"><span>CHAPTER II</span><span>SELECTED WORK · 2023—26</span></div>
          <div className="work-heading"><span className="section-number">01—03</span><h2>Things made<br /><em>with meaning.</em></h2><p>A few experiments in making the useful feel unforgettable.</p></div>
          <div className="project-list">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
          <div className="page-foot"><span>SELECTED WORKS · MORE ON REQUEST</span><span>03</span></div>
        </article>
      </div>
      <div className="next-chapters">
        <article className="chapter-card future-card">
          <div className="page-meta"><span>CHAPTER III</span><span>WHAT COMES NEXT</span></div>
          <span className="chapter-icon">✳</span>
          <h2>Still becoming.<br /><em>Always curious.</em></h2>
          <p>Next, I want to make things that bring a little more wonder into the everyday—small tools, considered spaces, and experiences worth staying for.</p>
          <div className="interest-tags"><span>CREATIVE TECHNOLOGY</span><span>INTERACTIVE WORLDS</span><span>THOUGHTFUL OBJECTS</span></div>
          <span className="chapter-folio">04</span>
        </article>
        <article className="chapter-card resume-card">
          <div className="page-meta"><span>CHAPTER IV</span><span>THE SHORT VERSION</span></div>
          <h2>A few lines<br />on <em>the journey.</em></h2>
          <div className="resume-row"><span>NOW</span><div><strong>Independent designer &amp; developer</strong><small>Building thoughtful digital experiences</small></div><span>2024—</span></div>
          <div className="resume-row"><span>BEFORE</span><div><strong>Design &amp; technology</strong><small>Learning by making, iterating, and collaborating</small></div><span>2021—24</span></div>
          <div className="resume-row"><span>ALWAYS</span><div><strong>Curious student of the world</strong><small>Asking better questions; collecting references</small></div><span>ONGOING</span></div>
          <a className="resume-link" href="mailto:hello@akarshana.design?subject=Resume%20request">ASK FOR MY FULL RÉSUMÉ <span>↗</span></a>
          <span className="chapter-folio">05</span>
        </article>
      </div>
    </>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const openBook = useCallback(() => setIsOpen(true), []);
  const closeBook = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = window.setTimeout(() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 550);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeBook();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeBook]);

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <section className={`opening ${isOpen ? 'opening-book-open' : ''}`} id="home" aria-labelledby="opening-title">
          <div className="opening-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> A PORTFOLIO, IN CHAPTERS</p>
            <h1 id="opening-title">A life in<br />the <em>making.</em></h1>
            <p className="intro">A collection of things I’ve made,<br className="desktop-break" /> things I believe, and what comes next.</p>
            <button className="open-prompt" onClick={openBook} type="button"><span className="prompt-icon">↓</span> OPEN THE BOOK <span className="prompt-rule" /></button>
          </div>
          <div className="book-stage">
            <div className="scene-glow" />
            <BookScene onOpen={openBook} isOpen={isOpen} />
            <span className="book-caption">A portfolio by Akarshana <i>—</i> touch to begin</span>
          </div>
          <span className="vertical-note">DESIGN · DEVELOPMENT · CURIOSITY</span>
          <span className="opening-index">01 / 05</span>
        </section>

        <section className={`portfolio ${isOpen ? 'portfolio-open' : ''}`} id="portfolio" aria-label="Portfolio book" aria-hidden={!isOpen}>
          <div className="portfolio-inner">
            <div className="portfolio-head"><span>THE COLLECTED WORKS</span><button className="close-book" onClick={closeBook} type="button">CLOSE BOOK <span>×</span></button></div>
            <BookSpread />
            <footer className="book-footer"><span>END OF VOLUME I — THE STORY CONTINUES</span><a href="mailto:hello@akarshana.design">WRITE ME A NOTE ↗</a><span>© AKARSHANA 2025</span></footer>
          </div>
        </section>
      </main>
    </div>
  );
}
