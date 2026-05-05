import { useState, useEffect } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";
import { CampaignsList } from "../sections/CampaignsList";
import { DiscoverCreators } from "./DiscoverCreators";
import { MarketplacePage } from "./MarketplacePage";
import { CreateCampaignPage } from "./CreateCampaignPage";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { getCurrentUser, mockDiscoverCreators } from "../data/mockData";

export const BrandDashboard = ({ section, onSection, onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const isBathu = currentUser?.name === "Bathu";
  const isGalXBoy = currentUser?.name === "GalXBoy";

  const getBrandCampaigns = () => {
    if (isBathu) {
      return [
        { title: "Bathu Summer Drop 2025", status: "active", applications: 45, budget: "R25,000", platform: "Instagram", deadline: "Dec 15" },
        { title: "Bathu 990v4 Launch", status: "active", applications: 38, budget: "R18,000", platform: "TikTok", deadline: "Dec 30" },
        { title: "Bathu Heritage Campaign", status: "review", applications: 12, budget: "R30,000", platform: "YouTube", deadline: "Jan 15" },
      ];
    } else if (isGalXBoy) {
      return [
        { title: "GalXBoy Heritage Collection", status: "active", applications: 38, budget: "R18,000", platform: "TikTok", deadline: "Dec 30" },
        { title: "GalXBoy Streetwear Drop", status: "active", applications: 28, budget: "R15,000", platform: "Instagram", deadline: "Jan 10" },
        { title: "GalXBoy x Local Artist", status: "draft", applications: 0, budget: "R22,000", platform: "Multi", deadline: "Feb 1" },
      ];
    }
    return [
      { title: "Summer Campaign 2025", status: "active", applications: 24, budget: "R15,000", platform: "Instagram", deadline: "Dec 15" },
      { title: "Product Launch", status: "active", applications: 18, budget: "R20,000", platform: "TikTok", deadline: "Dec 30" },
      { title: "Brand Awareness", status: "review", applications: 8, budget: "R12,000", platform: "YouTube", deadline: "Jan 15" },
    ];
  };

  const getTopMatches = () => {
    if (isBathu) {
      return [
        { name: "Tshepiso Malema", niche: "Fashion", followers: "185K", rate: "R950/post", match: 98 },
        { name: "Lesley Zibu", niche: "Lifestyle", followers: "142K", rate: "R750/post", match: 94 },
        { name: "Linda Zulu", niche: "Fitness", followers: "98K", rate: "R550/post", match: 87 },
      ];
    } else if (isGalXBoy) {
      return [
        { name: "Lesley Zibu", niche: "Lifestyle", followers: "142K", rate: "R750/post", match: 96 },
        { name: "Tshepiso Malema", niche: "Fashion", followers: "185K", rate: "R950/post", match: 92 },
        { name: "Thando Dlamini", niche: "Travel", followers: "156K", rate: "R800/post", match: 88 },
      ];
    }
    return mockDiscoverCreators.slice(0, 3).map(c => ({
      name: c.name, niche: c.niche, followers: c.followers, rate: c.rate, match: c.match
    }));
  };

  const getBrandMetrics = () => {
    if (isBathu) {
      return { activeCampaigns: "3", totalApplications: "95", totalSpend: "R73K", avgEngagement: "7.8%", applicationsDelta: "+24", spendDelta: "+18.2%", engagementDelta: "+1.2%" };
    } else if (isGalXBoy) {
      return { activeCampaigns: "2", totalApplications: "66", totalSpend: "R33K", avgEngagement: "8.2%", applicationsDelta: "+18", spendDelta: "+25.5%", engagementDelta: "+1.5%" };
    }
    return { activeCampaigns: "2", totalApplications: "42", totalSpend: "R27K", avgEngagement: "6.5%", applicationsDelta: "+12", spendDelta: "+15.3%", engagementDelta: "+0.7%" };
  };

  const campaigns = getBrandCampaigns();
  const creators = getTopMatches();
  const metrics = getBrandMetrics();
  const brandName = currentUser?.name || "Brand";
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Good afternoon";

  const handleSectionChange = (newSection) => {
    onSection(newSection);
    setSidebarOpen(false);
  };

  const content = {
    "brand-overview": (
      <div style={{ animation: "fadeUp .4s ease" }}>
        {/* Header */}
        <div className="bdash-header">
          <div>
            <h1 className="bdash-title">{greeting}, {brandName}!</h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Manage campaigns and discover South African talent.</p>
          </div>
          <Button variant="gold" onClick={() => handleSectionChange("create-campaign")} size="sm">
            <Icon name="plus" size={16} /> New Campaign
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="bdash-stats-grid">
          <StatCard label="Active Campaigns" value={metrics.activeCampaigns} icon="briefcase" color="#8B5CF6" />
          <StatCard label="Total Applications" value={metrics.totalApplications} delta={`+${metrics.applicationsDelta}`} icon="user" color="#FF6B35" />
          <StatCard label="Total Spend" value={metrics.totalSpend} delta={metrics.spendDelta} icon="dollar" color="#FFE600" />
          <StatCard label="Avg. Engagement" value={metrics.avgEngagement} delta={metrics.engagementDelta} icon="trending" color="#10B981" />
        </div>

        {/* Two-col cards */}
        <div className="bdash-two-col">
          {/* Active Campaigns */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Active Campaigns</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => handleSectionChange("campaigns")}>View all</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {campaigns.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 150 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Badge variant={c.status === "active" ? "green" : c.status === "review" ? "gold" : "gray"}>{c.status}</Badge>
                      <Badge variant="gray">{c.platform}</Badge>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#FF6B35" }}>{c.budget}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.applications} apps</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Matches */}
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Top Matches</h3>
              <Badge variant="pink" icon="zap">AI Powered</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {creators.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < creators.length - 1 ? "1px solid var(--border)" : "none", flexWrap: "wrap" }}>
                  <Avatar name={c.name} size={38} />
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.niche} · {c.followers}</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.15), rgba(232,93,4,0.15))", color: "#FF6B35", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>
                    {c.match}% Match
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => handleSectionChange("discover")} style={{ width: "100%", justifyContent: "center" }}>
                <Icon name="search" size={14} /> Discover more creators
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bdash-quick-stats">
          <div className="card" style={{ textAlign: "center", padding: 20 }}>
            <Icon name="users" size={24} color="#FF6B35" />
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{metrics.totalApplications}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Total Applications Received</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: 20 }}>
            <Icon name="trending" size={24} color="#8338EC" />
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>{metrics.avgEngagement}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Average Creator Engagement</div>
          </div>
          <div className="card" style={{ textAlign: "center", padding: 20 }}>
            <Icon name="star" size={24} color="#FFE600" />
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>94%</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Creator Satisfaction Rate</div>
          </div>
        </div>
      </div>
    ),
    campaigns: <CampaignsList onNavigate={onNavigate} brand />,
    discover: <DiscoverCreators onNavigate={onNavigate} />,
    marketplace: <MarketplacePage onNavigate={onNavigate} />,
    "create-campaign": <CreateCampaignPage onSection={handleSectionChange} />,
    analytics: <AnalyticsSection />,
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <Icon name="loader" size={48} color="#FF6B35" />
          <h2 style={{ marginTop: 20 }}>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bdash-root">
      {/* ── Mobile hamburger ── */}
      <button
        className="bdash-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <Icon name="menu" size={20} color="var(--white)" />
      </button>

      {/* ── Backdrop (mobile only) ── */}
      {sidebarOpen && (
        <div className="bdash-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <Sidebar
        role="brand"
        activeSection={section}
        onSection={handleSectionChange}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Main content ── */}
      <main className="bdash-main">
        {content[section] || content["brand-overview"]}
      </main>

      <style>{`
        .bdash-root {
          display: flex;
          min-height: 100vh;
          background: var(--surface);
        }

        .bdash-main {
          flex: 1;
          margin-left: 240px;
          padding: clamp(24px, 4vw, 40px);
          min-width: 0;
          width: 100%;
        }

        /* Hamburger — hidden on desktop */
        .bdash-menu-btn {
          display: none;
        }

        /* Backdrop — hidden on desktop */
        .bdash-backdrop {
          display: none;
        }

        .bdash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .bdash-title {
          font-family: var(--font-display);
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 800;
          margin-bottom: 4px;
        }

        .bdash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .bdash-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .bdash-quick-stats {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .bdash-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bdash-quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .bdash-main {
            margin-left: 0;
            padding: 72px 16px 24px;
          }

          .bdash-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 16px;
            left: 16px;
            z-index: 200;
            width: 44px;
            height: 44px;
            background: var(--gold);
            border: none;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,.2);
          }

          .bdash-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.45);
            backdrop-filter: blur(3px);
            z-index: 49;
            animation: bdashFadeIn .2s ease;
          }

          .bdash-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .bdash-two-col {
            grid-template-columns: 1fr;
          }

          .bdash-quick-stats {
            grid-template-columns: 1fr;
          }

          .bdash-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 420px) {
          .bdash-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes bdashFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};