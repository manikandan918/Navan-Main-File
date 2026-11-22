import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';

// Project categories representing sectors of expertise
const projects = [
  {
    title: 'Commercial workplace',
    category: 'Commercial',
    description: 'Cost planning and commercial support for contemporary workplace environments.',
    image: '/images/photo-1486406146926-c627a92ad1ab.jpg',
  },
  {
    title: 'Residential development',
    category: 'Residential',
    description: 'A measured approach to residential cost planning and project controls.',
    image: '/images/photo-1600607687939-ce8a6c25118c.jpg',
  },
  {
    title: 'Civic & public spaces',
    category: 'Public realm',
    description: 'Commercial oversight to support clear decisions across complex project stages.',
    image: '/images/photo-1487958449943-2429e8be8625.jpg',
  },
  {
    title: 'Industrial facility',
    category: 'Industrial',
    description: 'Structured cost information for operationally focused building projects.',
    image: '/images/photo-1581092160607-ee22621dd758.jpg',
  },
  {
    title: 'Hospitality environment',
    category: 'Hospitality',
    description: 'Commercial thinking for detail-led environments and fit-out requirements.',
    image: '/images/photo-1600210492486-724fe5c67fb0.jpg',
  },
  {
    title: 'Urban development',
    category: 'Mixed-use',
    description: 'A joined-up view of cost, scope and project interfaces.',
    image: '/images/photo-1449158743715-0a90ebb6d2d8.jpg',
  },
];

export default function Projects() {
  return (
    <>
      {/* Projects page — hero */}
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Every project has a story.
            <br />
            <em>Start with the numbers.</em>
          </>
        }
        description="A portfolio should show the thinking, collaboration and commercial discipline behind successful delivery."
        image="/images/photo-1503387762-592deb58ef4e.jpg"
      />

      {/* Projects page — project categories */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle
            eyebrow="Portfolio"
            title="Project categories, not claimed credentials."
            description="We bring commercial discipline and strategic oversight to a diverse range of environments, driving successful outcomes for projects of this scale and nature."
          />
          <div className="projects-grid portfolio-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <p className="placeholder-note">
            Our team is fully equipped to drive successful outcomes for projects of this scale and nature.
          </p>
        </div>
      </section>

      {/* Projects page — contact call to action */}
      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow light">Have a project in mind?</span>
            <h2>
              Let's make the next
              <br />
              decision a clear one.
            </h2>
          </div>
          <Link className="button gold-button" to="/contact">
            Talk to our team <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}