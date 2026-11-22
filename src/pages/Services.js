
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpenCheck,
  ChartNoAxesCombined,
  ClipboardList,
  FileCheck2,
  Gavel,
  Landmark,
  MessagesSquare,
  MonitorPlay,
  Scale,
} from 'lucide-react';

import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';

const serviceDetails = [
  {
    icon: ChartNoAxesCombined,
    title: 'Contractual / Commercial Services',
    description:
      'Commercial and contractual support helps project teams understand obligations, manage change and maintain visibility of risk throughout a construction project.',
    points: [
      'Contract and commercial review',
      'Change and cost-impact assessment',
      'Commercial reporting and project support',
    ],
  },
    {
    icon: FileCheck2,
    title: 'Construction Claims',
    description:
      'Structured claim support helps explain the events, records, contractual context and time or cost effects associated with construction change.',
    points: [
      'Claim preparation and review',
      'Assessment of time and cost impacts',
      'Supporting records and claim substantiation',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Forensic Planning',
    description:
      'Detailed programme analysis helps establish what happened on a project, how progress was affected and which events may have influenced completion.',
    points: [
      'Programme and schedule review',
      'Delay and progress analysis',
      'Assessment of project records and timelines',
    ],
  },
  {
    icon: MessagesSquare,
    title: 'Dispute Resolution',
    description:
      'Clear analysis of construction, engineering and commercial issues can help parties understand areas of disagreement and consider appropriate routes to resolution.',
    points: [
      'Review of technical and commercial issues',
      'Evidence organisation and issue analysis',
      'Support for dispute resolution processes',
    ],
  },

  {
    icon: Scale,
    title: 'Litigation Support',
    description:
      'Independent construction and commercial analysis can help legal teams understand complex project information and present key issues clearly.',
    points: [
      'Document and evidence review',
      'Technical and commercial analysis',
      'Clear reporting to support legal proceedings',
    ],
  },
  {
    icon: Landmark,
    title: 'Litigation Funding',
    description:
      'Structured review of available project information can support a clearer understanding of construction-related disputes and the matters under consideration.',
    points: [
      'Review of project and dispute materials',
      'Summary of relevant commercial issues',
      'Organised information to support assessment',
    ],
  },
  {
    icon: Gavel,
    title: 'Expert Services',
    description:
      'Specialist construction knowledge and independent analysis can help explain complex matters in a clear, balanced and accessible way.',
    points: [
      'Independent technical analysis',
      'Review of relevant project evidence',
      'Clear explanations of complex construction issues',
    ],
  },
  {
    icon: MonitorPlay,
    title: 'Quantum Digital',
    description:
      'Digital and visual presentations can help communicate complex construction events, sequences and technical issues to different audiences.',
    points: [
      'Visual explanation of project events',
      'Digital presentation development',
      'Clear communication of complex information',
    ],
  },
  {
    icon: BookOpenCheck,
    title: 'Quantum Training',
    description:
      'Practical learning and knowledge-sharing can help project teams strengthen their understanding of construction processes and commercial issues.',
    points: [
      'Construction and commercial knowledge-sharing',
      'Practical learning sessions',
      'Training shaped around project needs',
    ],
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            Construction insight
            <br />
            for <em>complex challenges.</em>
          </>
        }
        description="Commercial, planning, claims and dispute-related support designed to help clients understand project issues and make informed decisions."
        image="/images/photo-1541888946425-d81bb19240f5.jpg"
      />

      <section className="section-pad" id="services-detail">
        <div className="container">
          <div className="services-intro">
            <SectionTitle
              eyebrow="How we support projects"
              title="Specialist support, shaped around each brief."
              description="Explore our service areas covering commercial and contractual matters, forensic planning, construction claims, dispute resolution, litigation support, digital presentations and training."
            />

            <Link className="button dark-button" to="/contact">
              Discuss your project <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="service-list">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;

              return (
                <article className="service-detail" key={service.title}>
                  <span className="service-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="service-detail-icon">
                    <Icon size={25} strokeWidth={1.6} />
                  </span>

                  <div className="service-detail-copy">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>

                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Need a tailored scope?</span>

            <h2>
              Let's discuss
              <br />
              your project brief.
            </h2>
          </div>

          <Link className="button gold-button" to="/contact">
            Contact Navan <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
