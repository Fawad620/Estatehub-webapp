import React, { useState } from "react";

const offices = [
  "Blue Area, Islamabad",
  "Bahria Town Phase 7, Rawalpindi",
  "DHA Phase 2, Islamabad",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-brand-mist py-16">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-brand-blue">Contact EstateHub</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-brand-navy sm:text-5xl">
            Talk to a local property advisor
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-navy/70">
            Ask about homes in Islamabad or Rawalpindi, request a visit, or get
            help listing your property. Our team will reply with the next clear
            step.
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-lg bg-white p-5 shadow-sm shadow-brand-navy/5">
              <p className="text-sm font-semibold text-brand-navy">Phone</p>
              <p className="mt-1 text-brand-blue">+92 300 555 0148</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm shadow-brand-navy/5">
              <p className="text-sm font-semibold text-brand-navy">Email</p>
              <p className="mt-1 text-brand-blue">hello@estatehub.com</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm shadow-brand-navy/5">
              <p className="text-sm font-semibold text-brand-navy">Service areas</p>
              <ul className="mt-2 space-y-1 text-sm text-brand-navy/65">
                {offices.map((office) => (
                  <li key={office}>{office}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-xl shadow-brand-navy/10 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="field-label">Full name</label>
              <input
                className="field-input"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="field-label">Email address</label>
              <input
                type="email"
                className="field-input"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="field-label">Message</label>
            <textarea
              className="min-h-36 w-full rounded-md border border-brand-navy/15 bg-white px-3 py-3 text-sm text-brand-navy outline-none transition placeholder:text-brand-navy/35 focus:border-brand-blue focus:ring-2 focus:ring-brand-sky/40"
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Tell us what you are looking for"
            />
          </div>

          <button type="submit" className="btn-primary mt-5 w-full">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
