import { useEffect, useState } from "react";
import { CheckCircle2, Home, MapPinned, Building2, Pencil, Trash2 } from "lucide-react";
import DashboardShell from "../components/DashboardShell";
import { getSession } from "../utils/auth";

const initialForm = { sellerName: "", sellerEmail: "", sellerPhone: "", title: "", location: "", category: "house", price: "", bedrooms: "", bathrooms: "", size: "", description: "", images: [] };
const categories = [
  { value: "house", label: "House", icon: Home },
  { value: "plot", label: "Plot", icon: MapPinned },
  { value: "office", label: "Office", icon: Building2 },
];

export default function SellerDashboard() {
  const session = getSession();
  const [form, setForm] = useState({ ...initialForm, sellerName: session?.fullName || "", sellerEmail: session?.email || "", sellerPhone: session?.phone || "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const handleChange = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length !== 1) {
      setError("Please choose exactly 1 property image.");
      return;
    }
    setError("");
    Promise.all(files.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }))).then((images) => setForm((current) => ({ ...current, images }))).catch(() => setError("Unable to read one of the selected images."));
  };
  const loadProperties = () => fetch(`http://localhost:5000/api/properties/seller?sellerId=${encodeURIComponent(session?.id || "")}&sellerEmail=${encodeURIComponent(session?.email || "")}`).then((response) => response.json()).then((data) => { if (data.success) setProperties(data.properties); }).catch(() => setError("Unable to load your properties."));
  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/seller?sellerId=${encodeURIComponent(session?.id || "")}&sellerEmail=${encodeURIComponent(session?.email || "")}`)
      .then((response) => response.json())
      .then((data) => { if (data.success) setProperties(data.properties); })
      .catch(() => setError("Unable to load your properties."));
  }, [session?.id, session?.email]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(editingId ? `http://localhost:5000/api/properties/${editingId}` : "http://localhost:5000/api/properties", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sellerId: session?.id, sellerEmail: form.sellerEmail }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to submit property.");
      setSubmitted(true);
      setEditingId(null);
      loadProperties();
      setForm({ ...initialForm, sellerName: session?.fullName || "", sellerEmail: session?.email || "", sellerPhone: session?.phone || "" });
    } catch (requestError) {
      setError(requestError.message || "Unable to submit property. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const editProperty = (property) => setForm({ sellerName: property.sellerName, sellerEmail: property.sellerEmail, sellerPhone: property.sellerPhone, title: property.title, location: property.location, category: property.category, price: property.price, bedrooms: property.bedrooms ?? "", bathrooms: property.bathrooms ?? "", size: property.size, description: property.description || "", images: property.images || [] });
  const startEdit = (property) => { setEditingId(property._id); editProperty(property); setSubmitted(false); setError(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const deleteProperty = async (id) => { if (!window.confirm("Delete this property listing?")) return; const response = await fetch(`http://localhost:5000/api/properties/${id}?sellerId=${encodeURIComponent(session?.id || "")}&sellerEmail=${encodeURIComponent(session?.email || "")}`, { method: "DELETE" }); if (response.ok) setProperties((current) => current.filter((property) => property._id !== id)); else setError("Unable to delete property."); };

  return (
    <DashboardShell role="seller">
      <section className="container-page py-10 sm:py-14">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Seller workspace</p>
          <h1 className="mt-3 text-3xl font-semibold text-brand-navy sm:text-4xl">Bring your next property to market.</h1>
          <p className="mt-3 text-base leading-relaxed text-brand-navy/60">Create a clear listing once, then connect with serious buyers through EstateHub.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <form onSubmit={handleSubmit} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-brand-navy/10 pb-5">
              <div><h2 className="text-xl font-semibold text-brand-navy">Property information</h2><p className="mt-1 text-sm text-brand-navy/55">Add the details buyers need to make a decision.</p></div>
              <span className="hidden rounded-full bg-brand-mist px-3 py-1 text-xs font-semibold text-brand-blue sm:inline">New listing</span>
            </div>
            {submitted && <div className="mt-5 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"><CheckCircle2 size={17} /> Listing sent to admin for verification.</div>}
            {error && <div className="mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
            <div className="mt-6 space-y-5">
              <div><p className="mb-3 text-sm font-semibold text-brand-navy">Seller contact information</p><div className="grid gap-4 sm:grid-cols-3"><div><label className="field-label">Your name</label><input required className="field-input" placeholder="Full name" value={form.sellerName} onChange={handleChange("sellerName")} /></div><div><label className="field-label">Email address</label><input required type="email" className="field-input" placeholder="you@example.com" value={form.sellerEmail} onChange={handleChange("sellerEmail")} /></div><div><label className="field-label">Contact number</label><input required type="tel" className="field-input" placeholder="+92 300 555 0148" value={form.sellerPhone} onChange={handleChange("sellerPhone")} /></div></div></div>
              <div><label className="field-label">Listing title</label><input required className="field-input" placeholder="Modern family home in DHA Phase 5" value={form.title} onChange={handleChange("title")} /></div>
              <div><label className="field-label">Property location</label><input required className="field-input" placeholder="Sector, society, or city" value={form.location} onChange={handleChange("location")} /></div>
              <div><label className="field-label">Property category</label><div className="grid gap-3 sm:grid-cols-3">{categories.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setForm((current) => ({ ...current, category: value }))} className={`flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-sm font-semibold transition ${form.category === value ? "border-brand-blue bg-brand-mist text-brand-blue" : "border-brand-navy/15 text-brand-navy/60 hover:border-brand-blue/50"}`}><Icon size={17} />{label}</button>)}</div></div>
              <div className="grid gap-4 sm:grid-cols-2"><div><label className="field-label">Price</label><input required className="field-input" placeholder="Rs 4.2 crore" value={form.price} onChange={handleChange("price")} /></div><div><label className="field-label">Size</label><input required className="field-input" placeholder=" kanal / sqft" value={form.size} onChange={handleChange("size")} /></div></div>
              {form.category === "house" && <div className="grid gap-4 sm:grid-cols-2"><div><label className="field-label">Bedrooms</label><input type="number" min="0" className="field-input" placeholder="5" value={form.bedrooms} onChange={handleChange("bedrooms")} /></div><div><label className="field-label">Bathrooms</label><input type="number" min="0" className="field-input" placeholder="6" value={form.bathrooms} onChange={handleChange("bathrooms")} /></div></div>}
              <div><label className="field-label">House image (1 required)</label><input type="file" accept="image/*" onChange={handleImagesChange} className="block w-full rounded-md border border-dashed border-brand-navy/20 bg-brand-mist/40 px-3 py-3 text-sm text-brand-navy/60 file:mr-3 file:rounded file:border-0 file:bg-brand-blue file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white" />{form.images.length > 0 && <div className="mt-3 max-w-xs">{form.images.map((image, index) => <img key={image} src={image} alt={`House preview ${index + 1}`} className="aspect-4/3 w-full rounded-md object-cover" />)}</div>}</div>
              <div><label className="field-label">Description</label><textarea className="field-input h-28 py-3" placeholder="Tell buyers what makes this property special" value={form.description} onChange={handleChange("description")} /></div>
              <div className="flex flex-wrap gap-3"><button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Saving..." : editingId ? "Update and send for review" : "Send for admin review"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ ...initialForm, sellerName: session?.fullName || "", sellerEmail: session?.email || "", sellerPhone: session?.phone || "" }); }} className="btn-secondary w-full sm:w-auto">Cancel edit</button>}</div>
            </div>
          </form>

          <aside className="rounded-xl bg-brand-navy p-6 text-white"><p className="text-sm font-semibold text-brand-sky">Seller checklist</p><h2 className="mt-3 text-xl font-semibold">Listings that get attention are specific.</h2><ul className="mt-6 space-y-4 text-sm leading-relaxed text-brand-mist/75"><li>Use a precise location and an honest price.</li><li>Add room dimensions where possible.</li><li>Show buyers what makes the property worth visiting.</li></ul></aside>
        </div>
        <section className="mt-12"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Your listings</p><h2 className="mt-2 text-2xl font-semibold text-brand-navy">Manage submitted properties</h2></div><span className="text-sm text-brand-navy/55">{properties.length} total</span></div><div className="mt-5 grid gap-4">{properties.length === 0 ? <div className="rounded-xl border border-dashed border-brand-navy/20 bg-white p-8 text-center text-sm text-brand-navy/55">Your submitted properties will appear here.</div> : properties.map((property) => <article key={property._id} className="flex flex-col justify-between gap-4 rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div className="flex items-center gap-4"><img src={property.images?.[0]} alt={property.title} className="h-20 w-24 rounded-md object-cover" /><div><h3 className="font-semibold text-brand-navy">{property.title}</h3><p className="mt-1 text-sm text-brand-navy/60">{property.location} · {property.category} · {property.price}</p><span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${property.status === "approved" ? "bg-emerald-50 text-emerald-700" : property.status === "rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>{property.status}</span></div></div><div className="flex gap-2"><button type="button" onClick={() => startEdit(property)} className="btn-secondary px-3 py-2" aria-label={`Edit ${property.title}`}><Pencil size={16} /> Edit</button><button type="button" onClick={() => deleteProperty(property._id)} className="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50" aria-label={`Delete ${property.title}`}><Trash2 size={16} /> Delete</button></div></article>)}</div></section>
      </section>
    </DashboardShell>
  );
}
