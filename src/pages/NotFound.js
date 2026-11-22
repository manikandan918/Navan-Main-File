import React from 'react';
import { Link } from 'react-router-dom';

// Fallback page for routes that do not exist.
export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 / Page not found</span>
      <h1>This page isn't on the plan.</h1>
      <p>The page may have moved or the address may be incorrect.</p>
      <Link className="button dark-button" to="/">
        Back to home
      </Link>
    </section>
  );
}
