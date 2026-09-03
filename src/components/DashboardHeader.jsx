import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { endSession } from "../utils/auth";

const navLinks = [
  { label: "Dashboard" },
  { label: "Mission", page: "mission" },
  { label: "About the company", page: "about" },
  { label: "Buy through company", page: "buy", sellerDashboard: true },
  { label: "Guide to buy", page: "guide", buyerOnly: true },
];

export default function DashboardHeader({ role, name }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    endSession();
    navigate("/", { replace: true });
  };

  return (
    <header className="border-b border-brand-navy/10 bg-white">
      <div className="container-page flex min-h-20 items-center justify-between gap-5 py-3">
        <Link to={`/${role}-dashboard`} className="flex shrink-0 items-center gap-2">
          <img src="/estatehub-logo.svg" alt="EstateHub logo" className="h-10 w-10 object-contain" />
          <span className="text-lg font-semibold text-brand-navy">EstateHub</span>
        </Link>

        <nav className="dashboard-nav flex max-w-[52vw] items-center gap-5 overflow-x-auto whitespace-nowrap lg:max-w-none lg:gap-6">
          {navLinks.map((link) => (
              ((!link.buyerOnly || role === "buyer") && <NavLink key={link.label} to={role === "seller" && link.sellerDashboard ? "/seller-dashboard/sell" : link.page ? `/${role}-dashboard/${link.page}` : `/${role}-dashboard`} className="text-sm font-medium text-brand-navy/65 transition hover:text-brand-blue">
              {role === "seller" && link.sellerDashboard ? "Sell through company" : link.label}
            </NavLink>)
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-right sm:block">
            <span className="block text-sm font-semibold text-brand-navy">{name || role}</span>
            <span className="block text-xs capitalize text-brand-navy/50">{role} account</span>
          </span>
          <button type="button" onClick={handleLogout} className="inline-flex h-10 items-center gap-2 rounded-md border border-brand-navy/15 px-3 text-sm font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue" aria-label="Log out">
            <LogOut size={16} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
