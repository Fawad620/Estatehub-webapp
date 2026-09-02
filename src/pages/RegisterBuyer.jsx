import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterBuyer() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      setError("Fill in every field to create your account.");
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
    // Hook this up to your registration API. For now, just route to login.
    navigate("/login");
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-brand-navy/10 p-8 shadow-sm">
          <p className="text-sm font-medium text-brand-blue">Buyer account</p>
          <h1 className="mt-1 text-2xl font-semibold text-brand-navy">
            Create your buyer profile
          </h1>
          <p className="mt-1 text-sm text-brand-navy/60">
            Save listings, message sellers, and get alerts when new homes
            match your search.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <div>
              <label className="field-label">Full name</label>
              <input
                className="field-input"
                placeholder="Jordan Blake"
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
                  placeholder="+92 300 555 0148"
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </div>
            </div>

            <div>
              <label className="field-label">City you're searching in</label>
              <input
                className="field-input"
                placeholder="Islamabad"
                value={form.city}
                onChange={handleChange("city")}
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
              Create buyer account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-navy/60">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-brand-blue hover:underline">
              Log in
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-brand-navy/60">
            Listing a property instead?{" "}
            <Link to="/register/seller" className="font-medium text-brand-blue hover:underline">
              Sign up as a seller
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
