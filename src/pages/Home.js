import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, Check } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';

// Homepage service cards. Keep these aligned with the Services page.
const services = [
  {
    title: 'Contractual / Commercial Services',
    description:
      'Professional contractual and commercial support to manage risks, meet project objectives, and ensure successful construction project delivery.',
    link: 'https://qgs.global/services/contractual-commercial-services/',
    icon: 'contract',
  },

    {
    title: 'Construction Claims',
    description:
      'A proactive, hands-on approach to managing project changes and reaching amicable resolutions without formal dispute proceedings.',
    link: 'https://qgs.global/services/construction-claims/',
    icon: 'claims',
  },
  {
    title: 'Forensic Planning',
    description:
      'Accurate and detailed planning to establish workable programmes that recognise contractor, client, and engineer obligations.',
    link: 'https://qgs.global/services/forensic-planning/',
    icon: 'planning',
  },
  {
    title: 'Dispute Resolution',
    description:
      'Combining construction expertise and market understanding to resolve engineering and construction disputes through alternative resolution forums.',
    link: 'https://qgs.global/services/dispute-resolution/',
    icon: 'dispute',
  },

  {
    title: 'Litigation Support',
    description:
      'Experienced experts review evidence and prepare clear, concise, independent reports to support litigation proceedings.',
    link: 'https://qgs.global/services/litigation-support/',
    icon: 'litigation',
  },
  {
    title: 'Litigation Funding',
    description:
      'Expert support and independent reporting to help assess construction-related disputes and litigation requirements.',
    link: 'https://qgs.global/services/litigation-funding/',
    icon: 'funding',
  },
  {
    title: 'Experts',
    description:
      'Specialist dispute solutions backed by knowledge and experience, promoting a collaborative, non-adversarial approach to construction projects.',
    link: 'https://qgs.global/dispute-solutions/',
    icon: 'experts',
  },
  {
    title: 'Quantum Digital',
    description:
      'Fully animated movie presentations that creatively explain and visually portray complex construction issues in a 3D environment.',
    link: 'https://qgs.global/services/quantum-digital/',
    icon: 'digital',
  },
  {
    title: 'Quantum Training',
    description:
      'Construction-focused knowledge sharing and training that promotes collaboration and a non-adversarial approach to project delivery.',
    link: 'https://qgs.global/services/quantum-training/',
    icon: 'training',
  },
];

// Illustrative portfolio cards only; replace with approved Navan project examples.
const projects = [
  {
    title: 'Commercial workplace',
    category: 'Commercial',
    description:
      'Cost planning and commercial support for contemporary workplace environments.',
    image:
      '/images/photo-1486406146926-c627a92ad1ab.jpg',
  },
  {
    title: 'Residential development',
    category: 'Residential',
    description:
      'A measured approach to residential cost planning and project controls.',
    image:
      '/images/photo-1600607687939-ce8a6c25118c.jpg',
  },
  {
    title: 'Transport infrastructure',
    category: 'Railway & metro',
    description:
      'Commercial oversight to support clear decisions across complex infrastructure projects.',
    image:
      '/images/photo-1474487548417-781cb71495f3.jpg',
  },
];

// Homepage sections are named with a home-specific prefix to make styling easier to trace.
export default function Home() {
  return (
    <>
      {/* Home — first section: hero */}
      <section className="home-first-section">
        <div className="container home-first-inner">
          <div className="home-first-description">
            <span className="eyebrow light">
              <i /> Quantity surveying · Cost consultancy
            </span>
            <h1>
              Clarity in cost.
              <br />
              <em>Confidence</em> in every build.
            </h1>
            <p>
              Independent quantity surveying and commercial advice for projects
              with ambition — from first estimate to final account.
            </p>
            <div className="home-first-actions">
              <Link className="button gold-button" to="/services">
                Explore our services <ArrowUpRight size={17} />
              </Link>
              <Link className="button outline-button" to="/about">
                Get to know Navan
              </Link>
            </div>
          </div>
          <div className="home-first-caption">
            <span />
            <span>
              Better information.
              <br />
              Better decisions.
            </span>
          </div>
          <a className="home-first-scroll" href="#home-intro">
            <ArrowDownRight size={16} /> Scroll to explore
          </a>
        </div>
      </section>

      {/* Home — second section: introduction */}
      <section className="section-pad" id="home-intro">
        <div className="container home-second-grid">
          <div>
            <span className="eyebrow">A clear view of the bigger picture</span>
            <h2 className="large-heading">
              Good cost advice is more than a number.
            </h2>
          </div>
          <div className="home-second-description">
            <p className="lead">
              It is the insight behind the number — the context, judgement and
              commercial discipline that help a project move forward with
              confidence.
            </p>
            <p>
              Navan Quantity Surveyors supports clients and project teams with
              practical cost management, robust measurement and independent
              commercial thinking throughout the built environment lifecycle.
            </p>
            <Link className="text-link" to="/about">
              Discover our approach <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Home — services section */}
      <section className="section-pad soft-bg">
        <div className="container">
          <div className="section-row">
            <SectionTitle
              eyebrow="What we do"
              title="Commercial insight at every stage."
              description="From the earliest feasibility conversation to project close-out, we help teams make informed commercial decisions."
            />
            <Link className="text-link desktop-only" to="/services">
              All services <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="home-services-grid">
            {services.map((item, index) => (
              <ServiceCard key={item.title} item={item} index={index} />
            ))}
          </div>
          <Link className="text-link mobile-only" to="/services">
            Explore all services <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Home — approach section */}
      <section className="section-pad">
        <div className="container home-approach-grid">
          <div className="home-approach-photo">
            <img
              src="/images/photo-1503387762-592deb58ef4e.jpg"
              alt="Architectural plans and building model"
              loading="lazy"
            />
            <div>
              <span>01 / 03</span>
              <span>Measure with purpose</span>
            </div>
          </div>
          <div>
            <span className="eyebrow">The Navan approach</span>
            <h2 className="large-heading">
              Rigour in the detail.
              <br />
              <em>Perspective</em> in the decisions.
            </h2>
            <p>
              Every project has its own pressures, priorities and opportunities.
              We bring structure to complexity, translating cost information
              into practical insight that teams can act on.
            </p>
            <ul className="home-approach-check-list">
              <li>
                <Check size={17} /> Clear, traceable cost information
              </li>
              <li>
                <Check size={17} /> Independent commercial perspective
              </li>
              <li>
                <Check size={17} /> Collaborative, project-led thinking
              </li>
            </ul>
            <Link className="button dark-button" to="/about">
              Our approach <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Home — selected project examples */}
      <section className="section-pad dark-bg">
        <div className="container">
          <div className="section-row">
            <SectionTitle
              eyebrow="Selected project types"
              title="Built around real-world complexity."
              description="Explore the kinds of built-environment projects where clear cost information supports better decisions."
              light
            />
            <Link className="text-link light-link desktop-only" to="/projects">
              Explore projects <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="projects-grid home-featured-projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <p className="placeholder-note">
            Images and project categories are illustrative. Replace with
            Navan's verified portfolio before launch.
          </p>
          <Link className="text-link light-link mobile-only" to="/projects">
            View project types <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Home — sector list: keep aligned with the Sectors page */}
      <section className="section-pad sector-band">
        <div className="container home-sector-band-grid">
          <div>
            <span className="eyebrow">Where we add value</span>
            <h2 className="large-heading">
              One clear view across
              <br />
              <em>key sectors.</em>
            </h2>
          </div>
          <div className="home-sector-tags">
            {[
              'Data centres',
              'Railway & metros',
              'Airports',
              'Commercial & residential',
            ].map((sector) => (
              <span key={sector}>{sector}</span>
            ))}
            <Link to="/sectors">
              View all sectors <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Home — contact call to action */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Start a conversation</span>
            <h2>
              Let's bring clarity
              <br />
              to your next project.
            </h2>
          </div>
          <Link className="button gold-button" to="/contact">
            Talk to Navan <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
