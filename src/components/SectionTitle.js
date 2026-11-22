import React from 'react';

// Reusable heading block for consistent section hierarchy across pages.
export default function SectionTitle({
  eyebrow,
  title,
  description,
  light = false,
}) {
  return (
    <div className={`section-title ${light ? 'on-dark' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
