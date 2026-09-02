import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Listings verified", value: "1,140+" },
  { label: "Twin-city areas", value: "24" },
  { label: "Avg. reply time", value: "4 hrs" },
];

const values = [
  {
    title: "Transparency first",
    body: "Every listing shows the full price history and fee breakdown before you ever have to ask.",
  },
  {
    title: "Direct connections",
    body: "Buyers message sellers and agents directly on the platform. No third party sits between you.",
  },
  {
    title: "Local knowledge",
    body: "Our team reviews listings city by city, so pricing and details reflect the actual local market.",
  },
];

export default function About() {
  return (
    <div>
      <section className="bg-brand-navy py-20">
        <div className="container-page max-w-2xl">
          <p className="text-sm font-medium text-brand-sky">About EstateHub</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
            We built the property search we wished existed
          </h1>
          <p className="mt-5 text-brand-mist/80">
            EstateHub started in Islamabad after our founders spent a
            frustrating year searching through outdated listings and unclear
            pricing. We set out to build something more honest: verified homes,
            clear rent and sale details, and a direct line between buyers,
            sellers, and agents.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-brand-navy/10 p-6 text-center">
              <p className="text-3xl font-semibold text-brand-blue">{stat.value}</p>
              <p className="mt-1 text-sm text-brand-navy/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-mist py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://havenholidayhome.com/public/propertys/2026/Mar/1773221512-69b1368883bb7.webp"
              alt="Modern Islamabad home listed on EstateHub"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-brand-navy">What we care about</h2>
            <div className="mt-8 space-y-6">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="font-semibold text-brand-navy">{value.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-brand-navy/60">{value.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="text-2xl font-semibold text-brand-navy sm:text-3xl">
          Want to work with us instead?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-navy/60">
          Whether you're looking for a place or ready to list one, it takes
          about two minutes to get set up.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/register/buyer" className="btn-primary">
            Join as a buyer
          </Link>
          <Link to="/register/seller" className="btn-secondary">
            Join as a seller
          </Link>
        </div>
      </section>
    </div>
  );
}
