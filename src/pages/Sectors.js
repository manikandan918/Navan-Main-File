import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Building2,
  Plane,
  Server,
  TrainFront,
} from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';

// Keep this shortlist consistent with the homepage sector band.
const sectors = [
  {
    title: 'Data Centres',
    Icon: Server,
    description:
      'Cost planning and commercial visibility for technically complex facilities, specialist systems and demanding delivery programmes.',
  },
  {
    title: 'Railways & Metros',
    Icon: TrainFront,
    description:
      'Structured cost information for rail and metro projects involving multiple interfaces, stakeholders and delivery stages.',
  },
  {
    title: 'Airports',
    Icon: Plane,
    description:
      'Commercial support for airport buildings, terminal upgrades and associated infrastructure projects.',
  },
  {
    title: 'Commercial & Residential',
    Icon: Building2,
    description:
      'Cost management for workplaces, commercial developments and residential schemes from early design to completion.',
  },
];

export default function Sectors() {
  return (
    <>
      {/* Sectors page — hero */}
      <PageHero
        eyebrow="Sectors"
        title={
          <>
            Insight shaped by the
            <br />
            <em>built environment.</em>
          </>
        }
        description="We focus on four sector groups, adapting our cost and commercial approach to the needs of each asset and project team."
        image="/images/photo-1487958449943-2429e8be8625.jpg"
      />

      {/* Sectors page — four selected sectors */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle
            eyebrow="Areas of focus"
            title="Focused on the sectors that matter."
            description="Our approach is shaped by each project's scope, technical requirements, programme and commercial priorities."
          />
          <div className="sectors-page-grid">
            {sectors.map(({ title, Icon, description }, index) => (
              <article className="sectors-page-card" key={title}>
                <div className="sectors-page-card-top">
                  <Icon size={25} strokeWidth={1.6} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors page — contact call to action */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Your project is unique</span>
            <h2>
              Let's understand
              <br />
              what it needs.
            </h2>
          </div>
          <Link className="button gold-button" to="/contact">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
