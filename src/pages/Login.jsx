import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { startSession } from "../utils/auth";
import { apiUrl } from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "buyer");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to log in.");
      if (data.user.role !== role) throw new Error(`This account is registered as a ${data.user.role}.`);
      const session = startSession(data.user);
      navigate(`/${session.role}-dashboard`, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <Link to="/forgot-password" state={{ role }} className="font-medium text-brand-blue hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full">
              {loading ? "Logging in..." : `Log in as ${role}`}
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
