import React from "react";

export default function PropertyCard({ property }) {
  const { image, title, address, price, oldPrice, beds, baths, sqft } = property;

  return (
    <div className="group overflow-hidden rounded-xl border border-brand-navy/10 bg-white transition hover:shadow-lg hover:shadow-brand-navy/5">
      <div className="aspect-[4/3] w-full overflow-hidden bg-brand-mist">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5">
        <div className="flex items-baseline gap-2">
          {oldPrice && (
            <span className="text-sm text-brand-navy/35 line-through">{oldPrice}</span>
          )}
          <span className="text-lg font-semibold text-brand-blue">{price}</span>
          <span className="text-sm text-brand-navy/50">/month</span>
        </div>

        <h3 className="mt-2 text-base font-semibold text-brand-navy">{title}</h3>
        <p className="mt-1 text-sm text-brand-navy/60">{address}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-brand-navy/10 pt-4 text-sm text-brand-navy/60">
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10v10h18V10M1 12l11-9 11 9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {beds} bed
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12h16M6 12V7a2 2 0 012-2h2M6 20h12M8 20v-2M16 20v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {baths} bath
          </span>
          <span>{sqft} sqft</span>
        </div>
      </div>
    </div>
  );
}
