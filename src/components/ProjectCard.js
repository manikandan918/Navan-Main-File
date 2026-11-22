import React from 'react';

// Portfolio imagery and project types are illustrative until replaced with approved examples.
export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-photo">
        <img src={project.image} alt={project.title} loading="lazy" />
        <span>{project.category}</span>
      </div>
      <div className="project-description">
        <small>{project.label || ''}</small>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  );
}
