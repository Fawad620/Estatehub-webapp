import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import PropertyCard from "../components/PropertyCard";
import { apiUrl } from "../utils/api";

const tabs = ["all", "house", "plot", "office"];

export default function BuyerDashboard() {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  useEffect(() => {
    fetch(apiUrl("/api/properties/approved"))
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) return;
        const approved = data.properties.filter((property) => property.status === "approved").map((property) => ({
          ...property,
          id: property._id,
          address: property.location,
          beds: property.bedrooms ?? "-",
          baths: property.bathrooms ?? "-",
          sqft: property.size,
          image: property.images?.[0],
        }));
        setListings(approved);
      })
      .catch(() => {});
  }, []);
  const filtered = listings.filter((listing) => (category === "all" || listing.category === category) && `${listing.title} ${listing.address}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardShell role="buyer">
      <section className="container-page py-10 sm:py-14">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Buyer workspace</p><h1 className="mt-3 text-3xl font-semibold text-brand-navy sm:text-4xl">Find a place that fits your life.</h1><p className="mt-3 text-base text-brand-navy/60">Browse verified EstateHub properties across Islamabad and Rawalpindi.</p></div><span className="text-sm font-semibold text-brand-navy/55">{filtered.length} properties found</span></div>
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-brand-navy/10 bg-white p-4 shadow-sm sm:flex-row"><div className="relative flex-1"><Search size={18} className="absolute left-3 top-3 text-brand-navy/40" /><input aria-label="Search properties" className="field-input pl-10" placeholder="Search by location or property name" value={query} onChange={(event) => setQuery(event.target.value)} /></div><button type="button" className="btn-secondary"><SlidersHorizontal size={17} /> Filters</button></div>
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-brand-navy/10 pb-4">{tabs.map((tab) => <button type="button" key={tab} onClick={() => setCategory(tab)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${category === tab ? "bg-brand-navy text-white" : "bg-brand-mist text-brand-navy/60 hover:text-brand-blue"}`}>{tab === "all" ? "All properties" : `${tab}s`}</button>)}</div>
        {filtered.length ? <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((property) => <PropertyCard key={property.id} property={property} />)}</div> : <div className="mt-8 rounded-xl border border-dashed border-brand-navy/20 bg-white p-12 text-center"><h2 className="text-lg font-semibold text-brand-navy">No verified properties available</h2><p className="mt-2 text-sm text-brand-navy/60">Properties will appear here after admin verification.</p></div>}
      </section>
    </DashboardShell>
  );
}
