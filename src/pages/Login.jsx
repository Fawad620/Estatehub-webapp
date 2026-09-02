import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    // Hook this up to your auth API. For now, just route home.
    navigate("/");
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-brand-navy/10 p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-brand-navy">Welcome back</h1>
          <p className="mt-1 text-sm text-brand-navy/60">
            Log in to manage your saved listings and messages.
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-md bg-brand-mist p-1 text-sm font-medium">
            {["buyer", "seller"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={`rounded-md py-2 capitalize transition ${
                  role === option
                    ? "bg-white text-brand-blue shadow-sm"
                    : "text-brand-navy/60 hover:text-brand-navy"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

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
              <label className="field-label">Password</label>
              <input
                type="password"
                className="field-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange("password")}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-brand-navy/60">
                <input type="checkbox" className="rounded border-brand-navy/30" />
                Remember me
              </label>
              <a href="#reset" className="font-medium text-brand-blue hover:underline">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary w-full">
              Log in as {role}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-brand-navy/60">
            Don't have an account?{" "}
            <Link
              to={role === "buyer" ? "/register/buyer" : "/register/seller"}
              className="font-medium text-brand-blue hover:underline"
            >
              Sign up as a {role}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
