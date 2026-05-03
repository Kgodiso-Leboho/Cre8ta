import { useState } from "react";
import "./styles/global.css";
import "./styles/animations.css";

import { Navbar } from "./components/layout/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { CreatorDashboard } from "./pages/CreatorDashboard";
import { BrandDashboard } from "./pages/BrandDashboard";
import { MarketplacePage } from "./pages/MarketplacePage";
import { AIToolsPage } from "./pages/AIToolsPage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";

export default function App() {
  const [page, setPage] = useState("landing");
  const [creatorSection, setCreatorSection] = useState("overview");
  const [brandSection, setBrandSection] = useState("brand-overview");

  const navigate = (p) => {
    setPage(p);
    if (p === "creator-dashboard") setCreatorSection("overview");
    if (p === "brand-dashboard") setBrandSection("brand-overview");
    window.scrollTo(0, 0);
  };

  const handleCreatorSection = (s) => {
    setCreatorSection(s);
    setPage("creator-dashboard");
  };

  const handleBrandSection = (s) => {
    if (s === "marketplace") { setPage("marketplace"); return; }
    setPage("brand-dashboard");
    setBrandSection(s);
  };

  return (
    <div className="cre8ta-root">
      {(page === "landing" || page === "marketplace" || page === "ai-tools") && (
        <Navbar onNavigate={navigate} currentPage={page} />
      )}

      {page === "landing" && <LandingPage onNavigate={navigate} />}
      {page === "login" && <AuthPage mode="login" onNavigate={navigate} />}
      {page === "register" && <AuthPage mode="register" onNavigate={navigate} />}

      {page === "creator-dashboard" && (
        <CreatorDashboard section={creatorSection} onSection={handleCreatorSection} onNavigate={navigate} />
      )}

      {page === "creator-profile" && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate("creator-dashboard")} style={{ marginBottom: 20 }}>
            ← Back to dashboard
          </button>
          <CreatorProfilePage onNavigate={navigate} />
        </div>
      )}

      {page === "brand-dashboard" && (
        <BrandDashboard section={brandSection} onSection={handleBrandSection} onNavigate={navigate} />
      )}
    </div>
  );
}