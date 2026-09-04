import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, Mail, Phone, MapPin } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import PropertyCard from "../components/PropertyCard";
import { apiUrl } from "../utils/api";

const tabs = ["all", "house", "plot", "office"];

export default function BuyerDashboard() {
  const [listings, setListings] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
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
        {filtered.length ? <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((property) => <PropertyCard key={property.id} property={property} onViewDetails={setSelectedProperty} />)}</div> : <div className="mt-8 rounded-xl border border-dashed border-brand-navy/20 bg-white p-12 text-center"><h2 className="text-lg font-semibold text-brand-navy">No verified properties available</h2><p className="mt-2 text-sm text-brand-navy/60">Properties will appear here after admin verification.</p></div>}
      </section>
      {selectedProperty && <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/50 p-4" role="dialog" aria-modal="true" aria-label="Property details"><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b border-brand-navy/10 p-5"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">Verified {selectedProperty.category}</p><h2 className="mt-1 text-2xl font-semibold text-brand-navy">{selectedProperty.title}</h2></div><button type="button" onClick={() => setSelectedProperty(null)} className="flex h-9 w-9 items-center justify-center rounded-md text-brand-navy/60 hover:bg-brand-mist hover:text-brand-navy" aria-label="Close property details"><X size={20} /></button></div><div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_260px]"><div><img src={selectedProperty.image} alt={selectedProperty.title} className="aspect-[4/3] w-full rounded-lg object-cover" /><div className="mt-5 flex items-center gap-2 text-sm text-brand-navy/65"><MapPin size={17} className="text-brand-blue" />{selectedProperty.address}</div><p className="mt-4 text-2xl font-semibold text-brand-blue">{selectedProperty.price}</p><div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-brand-mist p-4 text-center text-sm text-brand-navy/65"><span><strong className="block text-lg text-brand-navy">{selectedProperty.beds}</strong>Beds</span><span><strong className="block text-lg text-brand-navy">{selectedProperty.baths}</strong>Baths</span><span><strong className="block text-lg text-brand-navy">{selectedProperty.sqft}</strong>Size</span></div><p className="mt-5 text-sm leading-relaxed text-brand-navy/65">{selectedProperty.description || "Contact the seller for more property details."}</p></div><aside className="h-fit rounded-lg bg-brand-navy p-5 text-white"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-sky">Seller details</p><h3 className="mt-3 text-xl font-semibold">{selectedProperty.sellerName || "EstateHub seller"}</h3><a href={`mailto:${selectedProperty.sellerEmail}`} className="mt-5 flex items-start gap-2 break-all text-sm text-brand-mist/80 hover:text-white"><Mail size={16} className="mt-0.5 shrink-0" />{selectedProperty.sellerEmail}</a><a href={`tel:${selectedProperty.sellerPhone}`} className="mt-3 flex items-start gap-2 text-sm text-brand-mist/80 hover:text-white"><Phone size={16} className="mt-0.5 shrink-0" />{selectedProperty.sellerPhone}</a><p className="mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-brand-mist/65">This property has been reviewed and approved by EstateHub.</p></aside></div></div></div>}
    </DashboardShell>
  );
}
