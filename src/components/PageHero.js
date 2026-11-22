import React from 'react';

// Shared page banner used by the inner pages.
export default function PageHero({ eyebrow, title, description, image }) {
  const heroStyle = {
    backgroundImage: `linear-gradient(90deg, rgba(12, 35, 40, 0.92), rgba(12, 35, 40, 0.56)), url('${image}')`,
  };

  return (
    <section className="page-hero" style={heroStyle}>
      <div className="container page-hero-inner">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
