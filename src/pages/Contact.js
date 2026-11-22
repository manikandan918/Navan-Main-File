
import React, { useState } from 'react';
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from 'lucide-react';
import PageHero from '../components/PageHero';

const CONTACT_EMAIL =
  process.env.REACT_APP_CONTACT_EMAIL || 'Saravana.s.sudhan@gmail.com';

const initialForm = {
  name: '',
  email: '',
  company: '',
  service: 'Quantity surveying & cost management',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setFeedback('Please fill in all required fields.');
      return;
    }

    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Submission failed (HTTP ${response.status})`);
      }

      setStatus('success');
      setFeedback('Your enquiry has been submitted successfully.');
      setForm(initialForm);
    } catch (error) {
      console.error('Contact form submission error:', error);

      setStatus('error');

      if (
        error instanceof TypeError &&
        error.message.toLowerCase().includes('fetch')
      ) {
        setFeedback('Unable to connect. Check your internet connection or try again later.');
      } else {
        setFeedback(
          error.message ||
            'We could not send your enquiry. Please try again or email us directly.'
        );
      }
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's talk about
            <br />
            <em>what you're building.</em>
          </>
        }
        description="Tell us a little about your project and the decisions you are working through. We'll help you identify a sensible next step."
        image="/images/photo-1497366811353-6870744d04b2.jpg"
      />

      <section className="section-pad">
        <div className="container contact-layout">
          <aside className="contact-aside">
            <span className="eyebrow">
              Start a conversation
            </span>

            <h2 className="large-heading">
              Clear answers
              <br />
              start here.
            </h2>

            <p>
              Use the form to outline your project, ask about our
              services or request an introductory conversation.
            </p>

            <div className="contact-detail">
              <span>
                <Mail size={19} />
              </span>

              <div>
                <small>Email</small>

                {CONTACT_EMAIL ? (
                <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`}
                target="_blank"
                 rel="noopener noreferrer"
                 className="contact-email-link"
                 >
                {CONTACT_EMAIL}
                 </a>

                ) : (
                  <strong>Email address to be configured</strong>
                )}
              </div>
            </div>

            <div className="contact-detail">
              <span>
                <MapPin size={19} />
              </span>

              <div>
                <small>Location</small>
                <strong>NAVAN QUANTITY SURVEYORS</strong>
                <em>
                 15 Clonmagadden Park, Navan, Meath C15XRW2                </em>
              </div>
            </div>

            <div className="contact-detail">
              <span>
                <MessageSquare size={19} />
              </span>

              <div>
                <small>Typical enquiries</small>
                <strong>
                  Contract Administration · Commercial Management · Dispute Resolution
                </strong>
              </div>
            </div>
          </aside>

          <form
            className="contact-form"
            onSubmit={submitEnquiry}
          >
            <div className="form-heading">
              <span>01 — Your details</span>
              <h3>Tell us about your project.</h3>
            </div>

            {feedback && (
              <p
                className={`form-feedback form-feedback-${status}`}
                role="status"
                aria-live="polite"
              >
                {status === 'success' ? (
                  <CheckCircle2 size={17} />
                ) : status === 'sending' ? (
                  <LoaderCircle size={17} />
                ) : (
                  <AlertCircle size={17} />
                )}

                <span>{feedback}</span>
              </p>
            )}

            <div className="form-row">
              <label>
                Full name

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>

              <label>
                Work email

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
            </div>

            <label>
              Company / organisation

              <input
                name="company"
                value={form.company}
                onChange={updateField}
                placeholder="Company name (optional)"
                autoComplete="organization"
              />
            </label>

            <label>
              What can we help with?

              <select
                name="service"
                value={form.service}
                onChange={updateField}
              >
                <option>
                  Quantity surveying & cost management
                </option>
                <option>
                  Measurement & bills of quantities
                </option>
                <option>
                  Tender & procurement support
                </option>
                <option>
                  Contract administration & final accounts
                </option>
                <option>Claims and Dispute Resolution</option>
                <option>
                  Cost control & commercial reporting
                </option>
                <option>Other enquiry</option>
              </select>
            </label>

            <label>
              Project details

              <textarea
                required
                name="message"
                value={form.message}
                onChange={updateField}
                rows="5"
                placeholder="Project stage, location, scope or challenge..."
              />
            </label>

            <button
              type="submit"
              className="button dark-button"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? 'Sending enquiry…'
                : 'Send enquiry'}

              {status === 'sending' ? (
                <LoaderCircle size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </button>

            {/* <p className="form-footnote">
              Your enquiry is sent through FormSubmit, a third-party
              form delivery service. Do not include sensitive personal
              or payment information.
            </p> */}
          </form>
        </div>
      </section>
    </>
  );
}
