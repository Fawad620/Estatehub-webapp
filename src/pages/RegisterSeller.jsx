import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  agency: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterSeller() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = { ...form };
    delete required.agency; // optional field
    if (Object.values(required).some((v) => !v.trim())) {
      setError("Fill in every required field to create your account.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError("");
    try {
      const response = await fetch(apiUrl("/api/auth/register"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, role: "seller" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to create account.");
      navigate("/login", { state: { role: "seller" } });
    } catch (requestError) {
      setError(requestError.message || "Unable to create account. Please try again.");
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-brand-navy/10 p-8 shadow-sm">
          <p className="text-sm font-medium text-brand-blue">Seller account</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-navy">
            List your property with EstateHub
          </h1>
          <p className="mt-1 text-sm text-brand-navy/60">
            Post listings, respond to buyer messages, and track interest from
            one dashboard.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <div>
              <label className="field-label">Full name</label>
              <input
                className="field-input"
                placeholder="Morgan Reyes"
                value={form.fullName}
                onChange={handleChange("fullName")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                />
              </div>
              <div>
                <label className="field-label">Phone number</label>
                <input
                  type="tel"
                  className="field-input"
                  placeholder="(203) 555-0148"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </div>
            </div>

            <div>
              <label className="field-label">Agency name (optional)</label>
              <input
                className="field-input"
                placeholder="Leave blank if you're listing independently"
                value={form.agency}
                onChange={handleChange("agency")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange("password")}
                />
              </div>
              <div>
                <label className="field-label">Confirm password</label>
                <input
                  type="password"
                  className="field-input"
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              Create seller account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-navy/60">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-brand-blue hover:underline">
              Log in
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-brand-navy/60">
            Looking for a place instead?{" "}
            <Link to="/register/buyer" className="font-medium text-brand-blue hover:underline">
              Sign up as a buyer
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
