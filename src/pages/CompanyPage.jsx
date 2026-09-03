import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Building2, Handshake, ShieldCheck } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import PropertyCard from "../components/PropertyCard";
import { getSession } from "../utils/auth";
import { apiUrl } from "../utils/api";

const companyListings = [
  { id: 1, image: "https://images.olx.com.pk/thumbnails/632060167-400x300.jpeg", title: "DHA Phase 5 Villa", address: "DHA Phase 5, Islamabad", price: "Rs 4.2 lac", beds: 5, baths: 6, sqft: "4,500" },
  { id: 2, image: "https://images.olx.com.pk/thumbnails/590998256-400x300.jpeg", title: "G-13 Modern House", address: "G-13, Islamabad", price: "Rs 2.9 lac", beds: 4, baths: 4, sqft: "2,250" },
  { id: 3, image: "https://images.olx.com.pk/thumbnails/600529096-400x300.jpeg", title: "Bahria Green Plot", address: "Bahria Town, Rawalpindi", price: "Rs 1.2 crore", beds: "-", baths: "-", sqft: "2,250" },
];

const pageContent = {
  mission: {
    eyebrow: "Our mission",
    title: "Make every property decision clearer.",
    body: "EstateHub gives buyers and sellers the information, confidence, and direct connections they need to move forward without guesswork.",
    cards: [
      [ShieldCheck, "Trust in every listing", "We review property details so you can start conversations with confidence."],
      [Handshake, "People before paperwork", "We keep the experience direct, responsive, and easy to understand."],
      [BadgeCheck, "Progress for every user", "Whether you are searching or selling, every action should lead to a clear next step."],
    ],
  },
  about: {
    eyebrow: "About the company",
    title: "Property search, made more human.",
    body: "EstateHub was built in Islamabad for people tired of outdated listings, unclear prices, and slow replies. We bring verified homes, plots, and offices into one straightforward place.",
    cards: [
      [Building2, "Local by design", "Our team understands the neighborhoods and property markets of Islamabad and Rawalpindi."],
      [BadgeCheck, "Verified details", "Clear pricing and useful property information help you spend time on the right options."],
      [Handshake, "A direct relationship", "Buyers and sellers connect without unnecessary layers between them."],
    ],
  },
  buy: {
    eyebrow: "Buy through the company",
    title: "A clearer path from search to keys.",
    body: "Browse properties reviewed by EstateHub, compare the details that matter, and connect with the right seller when you are ready.",
    cards: [
      [ShieldCheck, "Verified options", "Spend less time sorting through unclear or outdated listings."],
      [Building2, "Every property type", "Find houses, plots, and offices in one focused marketplace."],
      [Handshake, "Guidance when needed", "Our local team helps you take the next step with confidence."],
    ],
  },
};

export default function CompanyPage({ role, page }) {
  const content = pageContent[page];
  const session = getSession();
  const [request, setRequest] = useState({ buyerName: session?.fullName || "", buyerEmail: session?.email || "", buyerPhone: session?.phone || "", preferredType: "any", preferredLocation: "", budget: "", message: "" });
  const [requestStatus, setRequestStatus] = useState({ loading: false, message: "", error: "" });
  const handleRequestChange = (field) => (event) => setRequest((current) => ({ ...current, [field]: event.target.value }));
  const submitRequest = async (event) => {
    event.preventDefault();
    setRequestStatus({ loading: true, message: "", error: "" });
    try {
      const response = await fetch(apiUrl("/api/buyer-requests"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...request, buyerId: session?.id, buyerEmail: session?.email }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send request.");
      setRequest({ buyerName: session?.fullName || "", buyerEmail: session?.email || "", buyerPhone: session?.phone || "", preferredType: "any", preferredLocation: "", budget: "", message: "" });
      setRequestStatus({ loading: false, message: "Your request has been sent to the EstateHub team.", error: "" });
    } catch (error) {
      setRequestStatus({ loading: false, message: "", error: error.message });
    }
  };

  return (
    <DashboardShell role={role}>
      <section className="bg-brand-navy py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">{content.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-mist/80">{content.body}</p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-18">
        <div className="grid gap-5 md:grid-cols-3">
          {content.cards.map(([Icon, title, body]) => (
            <article key={title} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-mist text-brand-blue"><Icon size={21} /></span>
              <h2 className="mt-5 text-lg font-semibold text-brand-navy">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-navy/60">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {page === "buy" ? (
        <section className="bg-brand-mist py-14 sm:py-18">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Buy through EstateHub</p><h2 className="mt-2 text-3xl font-semibold text-brand-navy">Properties ready for your next step.</h2></div>
              <Link to={`/${role}-dashboard`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy">Explore all listings <ArrowRight size={17} /></Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">{companyListings.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
            {role === "buyer" && <form onSubmit={submitRequest} className="mt-12 rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8"><div className="max-w-xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Need a hand?</p><h2 className="mt-2 text-2xl font-semibold text-brand-navy">Tell our team what you want to buy.</h2><p className="mt-2 text-sm leading-relaxed text-brand-navy/60">Share your preferences and an EstateHub advisor will contact you.</p></div>{requestStatus.message && <p className="mt-5 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{requestStatus.message}</p>}{requestStatus.error && <p className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{requestStatus.error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-3"><div><label className="field-label">Your name</label><input required className="field-input" placeholder="Your full name" value={request.buyerName} onChange={handleRequestChange("buyerName")} /></div><div><label className="field-label">Email address</label><input required type="email" className="field-input" placeholder="you@example.com" value={request.buyerEmail} onChange={handleRequestChange("buyerEmail")} /></div><div><label className="field-label">Contact number</label><input required type="tel" className="field-input" placeholder="+92 300 555 0148" value={request.buyerPhone} onChange={handleRequestChange("buyerPhone")} /></div></div><div className="mt-4 grid gap-4 sm:grid-cols-3"><div><label className="field-label">Property type</label><select className="field-input" value={request.preferredType} onChange={handleRequestChange("preferredType")}><option value="any">Any type</option><option value="house">House</option><option value="plot">Plot</option><option value="office">Office</option></select></div><div><label className="field-label">Preferred location</label><input required className="field-input" placeholder="DHA Phase 5" value={request.preferredLocation} onChange={handleRequestChange("preferredLocation")} /></div><div><label className="field-label">Budget</label><input required className="field-input" placeholder="Rs 3 crore" value={request.budget} onChange={handleRequestChange("budget")} /></div></div><div className="mt-4"><label className="field-label">Other details</label><textarea required className="field-input h-28 py-3" placeholder="I am looking for a family home..." value={request.message} onChange={handleRequestChange("message")} /></div><button disabled={requestStatus.loading} type="submit" className="btn-primary mt-5 disabled:opacity-60">{requestStatus.loading ? "Sending request..." : "Contact EstateHub"}</button></form>}
          </div>
        </section>
      ) : (
        <section className="container-page pb-16 text-center"><Link to={`/${role}-dashboard`} className="btn-primary">Return to dashboard</Link></section>
      )}
    </DashboardShell>
  );
}
