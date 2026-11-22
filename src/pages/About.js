import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Compass, Handshake, ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';

// Principles used to explain Navan's proposed service approach.
const values = [
  {
    icon: Eye,
    title: 'Transparency',
    text: 'Clear assumptions, traceable information and advice that makes the reasoning visible.',
  },
  {
    icon: Compass,
    title: 'Independent judgement',
    text: 'A considered commercial perspective, grounded in evidence and focused on the project.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    text: 'Working collaboratively with clients, consultants and contractors to move decisions forward.',
  },
];

export default function About() {
  return (
    <>
      {/* About page — hero */}
      <PageHero
        eyebrow="About Navan"
        title={
          <>
            A considered approach
            <br />
            to every <em>cost decision.</em>
          </>
        }
        description="We help project teams understand the numbers, see the options and make better-informed decisions."
        image="/images/photo-1497366754035-f200968a6e72.jpg"
      />

      {/* About page — company introduction */}
      <section className="section-pad">
        <div className="container split-grid">
          <SectionTitle
            eyebrow="Who we are"
            title="Commercial thinking, built around your project."
          />
          <div className="rich-copy">
            <p className="lead">
              Navan Quantity Surveyors is positioned to provide practical,
              independent cost and commercial advice for the built environment.
            </p>
            <p>
              Our role is to make complex project information easier to
              understand. By combining disciplined measurement with clear
              communication, we aim to help clients manage risk, evaluate
              options and protect value throughout a project.
            </p>
            {/* <p>
              <strong>Before launch:</strong> Add Navan's approved company
              history, registration details, office locations and team
              credentials.
            </p> */}
          </div>
        </div>
      </section>

      {/* About page — company values */}
      <section className="section-pad soft-bg">
        <div className="container">
          <SectionTitle
            eyebrow="What guides us"
            title="Principles that make a difference."
            description="The strongest advice is rigorous, straightforward and connected to the decisions that matter."
          />
          <div className="values-grid">
            {values.map(({ icon: Icon, title, text }, index) => (
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

      {/* About page — closing statement */}
      <section className="section-pad">
        <div className="container split-grid about-end">
          <div>
            <span className="eyebrow">Our commitment</span>
            <h2 className="large-heading">
              Make the complex
              <br />
              <em>clear and actionable.</em>
            </h2>
          </div>
          <div>
            <p>
              We believe cost advice should do more than report where a project
              stands. It should help people understand why, what comes next and
              where attention is needed.
            </p>
            <Link className="text-link" to="/services">
              See how we can help <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
