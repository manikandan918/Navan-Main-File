import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users, Lightbulb, GraduationCap } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';

const careersValues = [
  {
    icon: Users,
    title: 'Work collaboratively',
    text: 'Good outcomes are built through clear communication and respect for the wider project team.',
  },
  {
    icon: Lightbulb,
    title: 'Think commercially',
    text: 'Bring curiosity, attention to detail and a practical mindset to complex challenges.',
  },
  {
    icon: GraduationCap,
    title: 'Keep learning',
    text: 'Develop your skills through thoughtful work, feedback and continued professional growth.',
  },
];

export default function Careers() {
  return (
    <>
      {/* Careers page — hero */}
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build your career
            <br />
            with <em>purpose.</em>
          </>
        }
        description="We value thoughtful people who care about the detail and understand the bigger picture."
        image="/images/photo-1521737711867-e3b97375f902.jpg"
      />

      {/* Careers page — values */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle
            eyebrow="Life at Navan"
            title="A place for curious, careful thinkers."
            description="This page introduces a proposed employer brand. Add real team information and current vacancies before launch."
          />
          <div className="values-grid">
            {careersValues.map(({ icon: Icon, title, text }, index) => (
              <article className="value-card" key={title}>
                <span className="value-no">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon size={27} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Careers page — opportunities */}
      <section className="section-pad soft-bg">
        <div className="container careers-callout">
          <div>
            <span className="eyebrow">Current opportunities</span>
            <h2>No listings yet.</h2>
            <p>
              When roles are available, they will appear here. You can also
              contact us to introduce yourself and share your area of interest.
            </p>
          </div>
          <Link className="button dark-button" to="/contact">
            Get in touch <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
