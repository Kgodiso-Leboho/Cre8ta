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
    // BRAND navigation - FIXED
    if (s === "marketplace") { 
      setPage("marketplace"); 
      return; 
    }
    setBrandSection(s);
    setPage("brand-dashboard");
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

      {/* Add marketplace and ai-tools pages */}
      {page === "marketplace" && (
        <div style={{ paddingTop: 80, padding: "80px 24px 60px", maxWidth: 1200, margin: "0 auto" }}>
          <MarketplacePage onNavigate={navigate} />
        </div>
      )}

      {page === "ai-tools" && (
        <div style={{ paddingTop: 80, padding: "80px 24px 60px", maxWidth: 900, margin: "0 auto" }}>
          <AIToolsPage />
        </div>
      )}
    </div>
  );
}