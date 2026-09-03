import { ArrowLeft, CheckCircle2, FileCheck2, Gavel, House, MapPinned, ReceiptText, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardShell from "../components/DashboardShell";

const steps = [
  [MapPinned, "Research & location", ["Choose the city or area based on your budget, purpose, and growth potential.", "Compare nearby properties to avoid overpaying."]],
  [UserRoundCheck, "Verify the seller & property", ["Confirm the seller is the legal owner by checking the Sale Deed (Registry) and Title Deed.", "Get a Fard/Intiqal from the local land revenue office to confirm ownership history.", "Check the housing authority or society NOC, especially in new schemes."]],
  [Gavel, "Legal due diligence", ["Hire a property lawyer to check documents, encumbrances, disputes, and fraudulent title risks.", "Legal fees typically range from 1% to 2% of the property value.", "Confirm the property is not under litigation or mortgaged to a bank."]],
  [House, "Physically inspect the property", ["Visit in person to verify boundaries, condition, plot number, and size against the documents."]],
  [ReceiptText, "Token money & agreement", ["Pay token money only with a signed receipt listing the full property details and terms.", "Prepare a Bayana (advance payment agreement) covering the deal, timeline, and default penalties."]],
  [FileCheck2, "Registration process", ["Have a lawyer or deed writer prepare the Sale Deed.", "Pay applicable stamp duty, registration fee, and capital value tax (CVT).", "Register the deed at the area's Sub-Registrar office.", "Complete Mutation (Intiqal) to formally transfer ownership in revenue records."]],
  [ShieldCheck, "Post-purchase", ["Transfer electricity, gas, and water utility bills into your name.", "Keep the Sale Deed, Mutation copy, and tax receipts safely"]],
];

export default function GuideToBuy() {
  return (
    <DashboardShell role="buyer">
      <section className="bg-brand-navy py-14 sm:py-18">
        <div className="container-page max-w-3xl">
          <Link to="/buyer-dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-sky hover:text-white"><ArrowLeft size={16} /> Back to dashboard</Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-brand-sky">Buyer guide</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">Buy property with confidence.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-mist/80">Use this checklist when evaluating a house, plot, or office in Pakistan. Always confirm details with a qualified property lawyer.</p>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {steps.map(([Icon, title, items], index) => (
            <article key={title} className="rounded-xl border border-brand-navy/10 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-mist text-brand-blue"><Icon size={21} /></span><div><span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">Step {index + 1}</span><h2 className="mt-1 text-xl font-semibold text-brand-navy">{title}</h2></div></div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-brand-navy/65">{items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-blue" />{item}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-xl bg-brand-mist p-6"><h2 className="text-xl font-semibold text-brand-navy">Key laws in Pakistan</h2><p className="mt-3 text-sm leading-relaxed text-brand-navy/65">Property transactions are commonly governed by the Transfer of Property Act 1882, Stamp Act 1899, Land Revenue Act 1967, and Registration Act 1908.</p></article>
          <article className="rounded-xl bg-brand-navy p-6 text-white"><h2 className="text-xl font-semibold">For overseas Pakistanis</h2><p className="mt-3 text-sm leading-relaxed text-brand-mist/75">Prepare your passport copy, NICOP, and a signed and attested buyer-seller affidavit. Use a power of attorney if you cannot attend in person. Use government-recognized transaction channels and avoid Hawala/Hundi methods.</p></article>
        </div>
      </section>
    </DashboardShell>
  );
}