import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  UserCheck,
  Hash,
  Layers,
  GraduationCap,
  Building2,
  BookOpen,
  FlaskConical,
  Wrench,
  Sparkles,
  Database,
  BarChart3,
  TableProperties,
  LineChart,
  Terminal,
  Cpu,
  Cloud,
  Code2,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Download,
  Github,
  Linkedin,
  Menu,
  X,
  User,
} from 'lucide-react';
import {
  ASSETS,
  STUDENT_PROFILE,
  STUDENT_DETAILS_LIST,
  HOME_EXPLORE_CARDS,
  LAB_MODULES,
  LAB_EXPERIMENTS,
  LAB_TOOLS,
} from './data/labData.js';
import DocumentViewer from './components/DocumentViewer.jsx';

const ICON_MAP = {
  UserCheck,
  Hash,
  Layers,
  GraduationCap,
  Building2,
  BookOpen,
  FlaskConical,
  Wrench,
  Sparkles,
  Database,
  BarChart3,
  TableProperties,
  LineChart,
  Terminal,
  Cpu,
  Cloud,
  Code2,
  User,
};

function DynamicIcon({ name, size = 20, strokeWidth = 1.8 }) {
  const IconComponent = ICON_MAP[name] || Sparkles;
  return <IconComponent size={size} strokeWidth={strokeWidth} />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const NAV_ITEMS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Modules', to: '/modules', end: false },
  { label: 'Experiments', to: '/experiments', end: false },
  { label: 'Tools', to: '/tools', end: false },
  { label: 'About', to: '/about', end: false },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isNavActive = (to, end) => {
    if (end) return location.pathname === '/';
    if (to === '/experiments') return location.pathname.startsWith('/experiments');
    return location.pathname === to;
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Left: MBU Logo filling its block completely */}
        <NavLink
          to="/"
          className="brand-logo-block"
          aria-label="MBU Data Science Laboratory Home"
          onClick={() => setMenuOpen(false)}
        >
          <img src={ASSETS.mbuLogo} alt="Mohan Babu University Logo" />
        </NavLink>

        {/* Center: Course Title */}
        <div className="header-title">
          <span>{STUDENT_PROFILE.subjectTitle}</span>
          <small>Subject Code: {STUDENT_PROFILE.subjectCode}</small>
        </div>

        {/* Right: Navigation + Small MBU Symbol on Right Top */}
        <div className="header-right">
          <nav
            id="primary-navigation"
            className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={`nav-link ${isNavActive(item.to, item.end) ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Small MBU Symbol on Right Top */}
          <div className="mbu-top-symbol" title="Mohan Babu University">
            <img src={ASSETS.mbuSymbol} alt="MBU Symbol" />
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-container">
        <p>
          <strong>{STUDENT_PROFILE.subjectTitle}</strong> <span>·</span> {STUDENT_PROFILE.name} (
          {STUDENT_PROFILE.rollNo})
        </p>

        <div className="social-links">
          <Link to="/about" className="social-link">
            <User size={15} />
            <span>About</span>
          </Link>
          <a
            href={STUDENT_PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="GitHub profile"
          >
            <Github size={15} />
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>
          <a
            href={STUDENT_PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={15} />
            <span>LinkedIn</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow-pill">{eyebrow}</span>}
      <h1>{title}</h1>
      <span className="heading-divider" aria-hidden="true" />
      {description && <p>{description}</p>}
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section: Vivid Campus Background + Clear Attractive Intro Card + Clear Attractive Profile Card */}
      <section className="hero-section">
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url("${ASSETS.campusBackground}")` }}
          role="img"
          aria-label="Mohan Babu University campus"
        />

        <div className="hero-container page-container">
          {/* Left: Clear, Attractive Glassmorphic Introduction Card */}
          <div className="intro-card">
            <span className="eyebrow-pill">Student Portfolio</span>
            <h1 className="intro-card__title">{STUDENT_PROFILE.name}</h1>
            <p className="intro-card__motto">
              Data <span>•</span> Analysis <span>•</span> Insights <span>•</span> Impact
            </p>

            <dl className="intro-details">
              {STUDENT_DETAILS_LIST.map((item) => (
                <div className="intro-detail-row" key={item.label}>
                  <span className="intro-detail-row__icon">
                    <DynamicIcon name={item.iconName} size={16} />
                  </span>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Clear, Attractive Profile Picture Card (No Signature) */}
          <aside className="profile-card" aria-label="Student profile photo">
            <div className="profile-card__image-box">
              <img
                src={ASSETS.profile}
                alt={`Portrait of ${STUDENT_PROFILE.name}`}
                className="profile-card__img"
              />
            </div>
            <div className="profile-card__caption">
              <strong>{STUDENT_PROFILE.name}</strong>
              <span>{STUDENT_PROFILE.rollNo} · {STUDENT_PROFILE.section}</span>
            </div>
          </aside>
        </div>
      </section>

      {/* Simple, Clean Home Blogs / Cards Section */}
      <section className="home-blogs-section page-container" aria-labelledby="explore-title">
        <div className="home-blogs-header">
          <div>
            <span className="eyebrow-pill">
              <Sparkles size={13} /> Lab Directory
            </span>
            <h2 id="explore-title">Explore My Lab Workspace</h2>
          </div>

          <Link className="simple-link" to="/experiments">
            Browse experiments <ArrowRight size={16} />
          </Link>
        </div>

        <div className="simple-blogs-grid">
          {HOME_EXPLORE_CARDS.map((card) => (
            <Link className="simple-blog-card" to={card.route} key={card.title}>
              <span className="simple-blog-card__icon">
                <DynamicIcon name={card.iconName} size={24} />
              </span>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <span className="simple-blog-card__arrow" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <section className="content-page page-container">
      <SectionHeading
        eyebrow="Student Profile"
        title="About Me & This Lab Portfolio"
        description="My academic details at Mohan Babu University and an overview of our Data Science Laboratory coursework."
      />

      <div className="about-panel">
        <div className="about-panel__left">
          <div className="about-panel__photo-wrap">
            <img src={ASSETS.profile} alt={STUDENT_PROFILE.name} />
          </div>
          <h3>{STUDENT_PROFILE.name}</h3>
          <span className="about-panel__badge">
            {STUDENT_PROFILE.rollNo} · Section {STUDENT_PROFILE.section}
          </span>
        </div>

        <div className="about-panel__right">
          <p className="about-panel__bio">{STUDENT_PROFILE.shortBio}</p>

          <dl className="about-info-grid">
            {STUDENT_DETAILS_LIST.map((item) => (
              <div className="about-info-item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
            <div className="about-info-item">
              <dt>Subject &amp; Code</dt>
              <dd>
                {STUDENT_PROFILE.subjectTitle} ({STUDENT_PROFILE.subjectCode})
              </dd>
            </div>
          </dl>

          <div className="about-panel__actions">
            <a
              href={STUDENT_PROFILE.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-clean btn-clean--primary"
            >
              <Linkedin size={16} />
              <span>LinkedIn Profile</span>
              <ArrowUpRight size={14} />
            </a>
            <a
              href={STUDENT_PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-clean btn-clean--outline"
            >
              <Github size={16} />
              <span>GitHub Profile</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModulesPage() {
  return (
    <section className="content-page page-container">
      <SectionHeading
        eyebrow="Coursework"
        title="What We Learn in the Lab"
        description="The topics below follow our Data Wrangling and Data Visualization laboratory modules."
      />

      <div className="two-col-grid">
        {LAB_MODULES.map((mod) => (
          <article className="clean-page-card" key={mod.number}>
            <div className="clean-page-card__top">
              <span className="eyebrow-pill">Module {mod.number}</span>
              <span className="clean-page-card__icon">
                <DynamicIcon name={mod.iconName} size={22} />
              </span>
            </div>
            <h2>{mod.title}</h2>
            <p>{mod.description}</p>
            <ul className="clean-topic-list">
              {mod.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <Link className="clean-card-link" to={mod.experimentRoute}>
              Read related experiment <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperimentsPage() {
  return (
    <section className="content-page page-container">
      <SectionHeading
        eyebrow="Practical Work"
        title="Hands-On Lab Experiments"
        description="Open each experiment below to read the complete lab document and Python code directly on this site."
      />

      <div className="two-col-grid">
        {LAB_EXPERIMENTS.map((exp) => (
          <article className="clean-page-card clean-page-card--experiment" key={exp.id}>
            <div className="clean-page-card__top">
              <span className="eyebrow-pill">
                Experiment {exp.id.toString().padStart(2, '0')}
              </span>
              <span className="clean-page-card__icon">
                <DynamicIcon name={exp.iconName} size={22} />
              </span>
            </div>
            <h2>{exp.title}</h2>
            <p>{exp.description}</p>
            <div className="clean-page-card__actions">
              <Link className="btn-clean btn-clean--primary" to={exp.route}>
                <span>Open Experiment</span>
                <ArrowRight size={16} />
              </Link>
              <a
                className="btn-clean btn-clean--outline"
                href={exp.downloadUrl}
                download={exp.sourceFile}
              >
                <Download size={15} />
                <span>Download .docx</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperimentDetailPage({ experimentId }) {
  const experiment = LAB_EXPERIMENTS.find((item) => item.id === experimentId);
  if (!experiment) return null;

  return (
    <section className="content-page experiment-page page-container">
      <Link className="back-link" to="/experiments">
        <ArrowLeft size={16} /> All experiments
      </Link>

      <header className="experiment-header-bar">
        <div>
          <span className="eyebrow-pill">Experiment 0{experiment.id}</span>
          <h1>{experiment.title}</h1>
        </div>
        <a
          className="btn-clean btn-clean--primary"
          href={experiment.downloadUrl}
          download={experiment.sourceFile}
        >
          <Download size={16} />
          <span>Download Experiment {experiment.id}</span>
        </a>
      </header>

      <article className="document-panel">
        <DocumentViewer source={experiment.htmlSource} />
      </article>
    </section>
  );
}

function ToolsPage() {
  return (
    <section className="content-page page-container">
      <SectionHeading
        eyebrow="Lab Toolkit"
        title="Tools & Technologies Powering Our Work"
        description="Software, Python libraries, and dataset references used across our laboratory experiments."
      />

      <div className="three-col-grid">
        {LAB_TOOLS.map((tool) => {
          const content = (
            <>
              <span className="tool-clean-card__icon">
                <DynamicIcon name={tool.iconName} size={22} />
              </span>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
              {tool.website && <ArrowUpRight className="tool-clean-card__arrow" size={17} />}
            </>
          );

          return tool.website ? (
            <a
              className="tool-clean-card"
              href={tool.website}
              target="_blank"
              rel="noreferrer"
              key={tool.name}
            >
              {content}
            </a>
          ) : (
            <article className="tool-clean-card" key={tool.name}>
              {content}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found page-container">
      <span className="eyebrow-pill">Page not found</span>
      <h1>This page isn&apos;t in the lab notebook.</h1>
      <Link className="btn-clean btn-clean--primary" to="/">
        Return home
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/experiments/4" element={<ExperimentDetailPage experimentId={4} />} />
          <Route path="/experiments/5" element={<ExperimentDetailPage experimentId={5} />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
