import React from 'react';
import { Link } from 'react-router-dom';

// Editable text-and-symbol logo concept for the Navan starter website.
export default function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label="Navan Quantity Surveyors home"
    >
      <span className="brand-symbol">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path
            d="M7 40V8h8l18 21V8h8v32h-8L15 19v21z"
            fill="currentColor"
          />
          <path d="M7 4h34" stroke="#c6a66d" strokeWidth="3" />
        </svg>
      </span>
      <span className="brand-words">
        <strong>NAVAN</strong>
        <small>QUANTITY SURVEYORS</small>
      </span>
    </Link>
  );
}
