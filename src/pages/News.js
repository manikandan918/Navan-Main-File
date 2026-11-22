import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, TrendingUp, FileText } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';

// Starter editorial topics; review and approve before publishing as Navan content.
const articles = [
  {
    category: 'Cost planning',
    title: 'Why early cost planning creates better options',
    icon: TrendingUp,
    text: 'Early cost planning helps project teams test assumptions, understand trade-offs and make informed decisions before choices become expensive to change.',
  },
  {
    category: 'Procurement',
    title: 'Building a clearer tender comparison',
    icon: FileText,
    text: 'A useful tender review looks beyond the headline figure to scope alignment, qualifications, exclusions and commercial risk.',
  },
  {
    category: 'Project controls',
    title: 'Turning cost reports into decisions',
    icon: BookOpen,
    text: 'A good cost report should explain movement, highlight the decisions required and help stakeholders see what happens next.',
  },
];

export default function News() {
  return (
    <>
      {/* Insights page — hero */}
      <PageHero
        eyebrow="Insights"
        title={
          <>
            A clearer view of
            <br />
            <em>cost and construction.</em>
          </>
        }
        description="Ideas and practical notes on cost planning, procurement and commercial management across the built environment."
        image="/images/photo-1454165804606-c3d57bc86b40.jpg"
      />

      {/* Insights page — article cards */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle
            eyebrow="From the Navan desk"
            title="Useful thinking for better decisions."
            description="Starter editorial content. Review and approve these articles as Navan's own before publication."
          />
          <div className="insights-grid">
            {articles.map(({ category, title, icon: Icon, text }) => (
              <article className="insight-card" key={title}>
                <div className="insight-art">
                  <Icon size={34} />
                  <span>NAVAN / NOTES</span>
                </div>
                <div className="insight-copy">
                  <span className="insight-category">{category}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Link className="text-link" to="/contact">
                    Discuss this topic <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Insights page — contact call to action */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Keep the conversation going</span>
            <h2>
              Have a question
              <br />
              about your project?
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
