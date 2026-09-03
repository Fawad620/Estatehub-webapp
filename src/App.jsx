import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RegisterBuyer from "./pages/RegisterBuyer";
import RegisterSeller from "./pages/RegisterSeller";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import CompanyPage from "./pages/CompanyPage";
import GuideToBuy from "./pages/GuideToBuy";
import ForgotPassword from "./pages/ForgotPassword";
import { getSession } from "./utils/auth";

function ProtectedRoute({ role, children }) {
  const session = getSession();
  if (!session) return <Navigate to="/login" replace />;
  if (session.role !== role) return <Navigate to={`/${session.role}-dashboard`} replace />;
  return children;
}

function DashboardCompanyRoute({ role }) {
  const { page } = useParams();
  if (!["mission", "about", "buy"].includes(page)) return <Navigate to={`/${role}-dashboard`} replace />;
  return <ProtectedRoute role={role}><CompanyPage role={role} page={page} /></ProtectedRoute>;
}

export default function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/seller-dashboard") || location.pathname.startsWith("/buyer-dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {!isDashboard && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register/buyer" element={<RegisterBuyer />} />
          <Route path="/register/seller" element={<RegisterSeller />} />
          <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
          <Route path="/seller-dashboard/sell" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
          <Route path="/buyer-dashboard" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer-dashboard/guide" element={<ProtectedRoute role="buyer"><GuideToBuy /></ProtectedRoute>} />
          <Route path="/seller-dashboard/:page" element={<DashboardCompanyRoute role="seller" />} />
          <Route path="/buyer-dashboard/:page" element={<DashboardCompanyRoute role="buyer" />} />
        </Routes>
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}
