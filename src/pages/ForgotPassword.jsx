import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiUrl } from "../utils/api";

const initialForm = { fullName: "", email: "", phone: "", password: "", confirmPassword: "" };

export default function ForgotPassword() {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "buyer");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ error: "", success: "", loading: false });
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 8) {
      setStatus({ error: "New password should be at least 8 characters.", success: "", loading: false });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setStatus({ error: "Passwords do not match.", success: "", loading: false });
      return;
    }
    setStatus({ error: "", success: "", loading: true });
    try {
      const response = await fetch(apiUrl("/api/auth/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to change password.");
      setForm(initialForm);
      setStatus({ error: "", success: "Password changed successfully. You can now log in.", loading: false });
    } catch (error) {
      setStatus({ error: error.message || "Unable to change password. Please try again.", success: "", loading: false });
    }
  };

  return <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-16"><div className="w-full max-w-lg"><div className="rounded-2xl border border-brand-navy/10 p-8 shadow-sm"><Link to="/login" className="text-sm font-medium text-brand-blue hover:underline">Back to login</Link><h1 className="mt-5 text-2xl font-semibold text-brand-navy">Change your password</h1><p className="mt-1 text-sm text-brand-navy/60">Confirm your account details before choosing a new password.</p><div className="mt-6 grid grid-cols-2 rounded-md bg-brand-mist p-1 text-sm font-medium">{["buyer", "seller"].map((option) => <button key={option} type="button" onClick={() => setRole(option)} className={`rounded-md py-2 capitalize transition ${role === option ? "bg-white text-brand-blue shadow-sm" : "text-brand-navy/60 hover:text-brand-navy"}`}>{option}</button>)}</div><form className="mt-6 space-y-4" onSubmit={submit}>{status.error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{status.error}</p>}{status.success && <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{status.success}</p>}<div><label className="field-label">Full name</label><input required className="field-input" placeholder="Your full name" value={form.fullName} onChange={update("fullName")} /></div><div className="grid gap-4 sm:grid-cols-2"><div><label className="field-label">Email address</label><input required type="email" className="field-input" placeholder="you@example.com" value={form.email} onChange={update("email")} /></div><div><label className="field-label">Contact number</label><input required type="tel" className="field-input" placeholder="+92 300 555 0148" value={form.phone} onChange={update("phone")} /></div></div><div className="grid gap-4 sm:grid-cols-2"><div><label className="field-label">New password</label><input required type="password" className="field-input" placeholder="At least 8 characters" value={form.password} onChange={update("password")} /></div><div><label className="field-label">Confirm password</label><input required type="password" className="field-input" placeholder="Re-enter password" value={form.confirmPassword} onChange={update("confirmPassword")} /></div></div><button type="submit" disabled={status.loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">{status.loading ? "Changing password..." : `Change ${role} password`}</button></form></div></div></section>;
}
