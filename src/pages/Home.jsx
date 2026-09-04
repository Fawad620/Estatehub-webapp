import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import PropertyCard from "../components/PropertyCard";

const properties = [
  { id: 1, image: "https://images.olx.com.pk/thumbnails/632060167-400x300.jpeg", title: "DHA Phase 5 Villa", address: "DHA Phase 5, Islamabad", price: "Rs 4.2 core", oldPrice: "Rs 4.8 core", beds: 5, baths: 6, sqft: "4,500" },
  { id: 2, image: "https://media.zameen.com/thumbnails/34778212-800x600.jpeg", title: "G-13 Modern House", address: "G-13, Islamabad", price: "Rs 1 core", oldPrice: "Rs 3.4 core", beds: 4, baths: 4, sqft: "2,250" },
  { id: 3, image: "https://havenholidayhome.com/public/propertys/2026/Mar/1773221512-69b1368883bb7.webp", title: "Bahria Garden Home", address: "Bahria Town Phase 7, Rawalpindi", price: "Rs 2.4 core", oldPrice: "Rs 2.8 lac", beds: 4, baths: 5, sqft: "2,700" },
  { id: 4, image: "https://images.olx.com.pk/thumbnails/600529096-400x300.jpeg", title: "F-11 Executive House", address: "F-11, Islamabad", price: "Rs 5.5 core", oldPrice: "Rs 6.2 core", beds: 6, baths: 6, sqft: "5,400" },
  { id: 5, image: "https://th.bing.com/th/id/R.e4bc72c312ba441861c5a27a12ae3359?rik=SoizNkzWYQwiCw&pid=ImgRaw&r=0", title: "Range Road Residence", address: "Range Road, Rawalpindi", price: "Rs 1.8 core", oldPrice: "Rs 2.1 core", beds: 5, baths: 4, sqft: "2,475" },
  { id: 6, image: "https://images.olx.com.pk/thumbnails/632060167-400x300.jpeg", title: "PWD Family Portion", address: "PWD Housing Scheme, Islamabad", price: "Rs 1.25 core", oldPrice: "Rs 1.5 core", beds: 3, baths: 3, sqft: "1,800" },
  { id: 7, image: "https://st.hzcdn.com/simgs/pictures/exteriors/prairie-style-exterior-rhoads-estate-homes-llc-img~61b18c180739ef53_9-6447-1-dd76e08.jpg", title: "Satellite Town Upper Portion", address: "Satellite Town, Rawalpindi", price: "Rs 5 core", oldPrice: "Rs 1.1 core", beds: 3, baths: 3, sqft: "1,650" },
  { id: 8, image: "https://images.olx.com.pk/thumbnails/600529096-400x300.jpeg", title: "Bani Gala View House", address: "Bani Gala, Islamabad", price: "Rs 3.6 core", oldPrice: "Rs 3 core", beds: 5, baths: 5, sqft: "3,600" },
  { id: 9, image: "https://tse4.mm.bing.net/th/id/OIP.2VRyjm4KwYPmMJuef8dJMQHaE8?r=0&w=2940&h=1960&rs=1&pid=ImgDetMain&o=7&rm=3", title: "Chaklala Scheme Home", address: "Chaklala Scheme 3, Rawalpindi", price: "Rs 1.65 core", oldPrice: "Rs 1.9 core", beds: 4, baths: 4, sqft: "2,250" },
];

const activity = [
  { value: "8,200+", label: "active buyers" },
  { value: "1,140+", label: "verified homes" },
  { value: "320+", label: "new weekly leads" },
];

const perks = [
  {
    title: "No hidden fees",
    body: "The price you see on a listing is the price you're quoted at close. Every fee is itemized before you sign anything.",
  },
  {
    title: "Verified listings only",
    body: "Every property is checked against public records before it goes live, so what you view is what actually exists.",
  },
  {
    title: "Agents who respond",
    body: "Message a seller or agent directly through EstateHub and expect a reply inside one business day.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ location: "", type: "", status: "", price: "" });
  const [showLoanAnnouncement, setShowLoanAnnouncement] = useState(true);

  useEffect(() => {
    if (!showLoanAnnouncement) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setShowLoanAnnouncement(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showLoanAnnouncement]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      {showLoanAnnouncement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="PM Housing Loan Scheme 2026 announcement"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowLoanAnnouncement(false);
          }}
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setShowLoanAnnouncement(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy/85 text-white transition hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-sky focus:ring-offset-2"
              aria-label="Close announcement"
            >
              <X size={21} />
            </button>
            <img
              src="https://schemes.org.pk/wp-content/uploads/2026/05/PM-Home-Loan-Scheme-2026.webp"
              alt="PM Housing Loan Scheme 2026: apply online now for up to Rs 10 million"
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-40 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl" />

        <div className="container-page relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wide text-brand-sky">
              Real listings, real numbers
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Find homes across Islamabad and Rawalpindi
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-mist/80">
              EstateHub connects buyers and sellers directly, with clear
              pricing and no guesswork. Search by sector, society, budget, and
              property type, then message an owner the same day.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {activity.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/10 bg-white/10 px-4 py-3">
                  <p className="text-xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs capitalize text-brand-mist/75">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#search" className="btn-primary">
                Search properties
              </a>
              <Link to="/register/seller" className="btn-secondary bg-transparent text-white hover:bg-white hover:text-brand-navy">
                List your property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search widget */}
      <section id="search" className="relative z-10 -mt-10 px-5 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="container-page grid gap-4 rounded-xl border border-brand-navy/10 bg-white p-6 shadow-xl shadow-brand-navy/10 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
        >
          <div>
            <label className="field-label">Location</label>
            <input
              className="field-input"
              placeholder="Islamabad or Rawalpindi"
              value={form.location}
              onChange={handleChange("location")}
            />
          </div>
          <div>
            <label className="field-label">Property type</label>
            <select className="field-input" value={form.type} onChange={handleChange("type")}>
              <option value="">Any type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
            </select>
          </div>
          <div>
            <label className="field-label">Status</label>
            <select className="field-input" value={form.status} onChange={handleChange("status")}>
              <option value="">Any status</option>
              <option value="rent">For rent</option>
              <option value="sale">For sale</option>
            </select>
          </div>
          <div>
            <label className="field-label">Price limit</label>
            <input
              className="field-input"
              placeholder="$5,000"
              value={form.price}
              onChange={handleChange("price")}
            />
          </div>
          <button type="submit" className="btn-primary w-full lg:col-span-1">
            Search
          </button>
        </form>
      </section>

      {/* Listings */}
      <section className="container-page py-20">
        <div className="max-w-xl">
            <h2 className="text-3xl font-semibold text-brand-navy">
            Listings picked for Islamabad and Rawalpindi
          </h2>
          <p className="mt-3 text-brand-navy/60">
            A mix of rental homes and family portions, refreshed as new listings
            are verified.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-brand-mist py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-brand-navy">
              Built to make buying and selling less stressful
            </h2>
            <p className="mt-4 max-w-md text-brand-navy/60">
              EstateHub strips out the parts of the process that usually slow
              people down, so buyers and sellers can move at their own pace.
            </p>

            <div className="mt-8 space-y-6">
              {perks.map((perk) => (
                <div key={perk.title} className="flex gap-4">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-brand-navy">{perk.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-navy/60">{perk.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://havenholidayhome.com/public/propertys/2026/Mar/1773221512-69b1368883bb7.webp"
              alt="Modern Islamabad home listed on EstateHub"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-2xl bg-brand-blue px-8 py-14 text-center sm:px-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to see what's on the market?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-brand-mist/80">
            Create a free account to save listings, message owners, and get
            notified when something new fits your search.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/register/buyer" className="btn-secondary">
              Join as a buyer
            </Link>
            <Link
              to="/register/seller"
              className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-blue"
            >
              Join as a seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
