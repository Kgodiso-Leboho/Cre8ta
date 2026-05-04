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
import { getCurrentUser, mockCampaigns, mockDiscoverCreators } from "../data/mockData";

export const BrandDashboard = ({ section, onSection, onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Check which brand is logged in
  const isBathu = currentUser?.name === "Bathu";
  const isGalXBoy = currentUser?.name === "GalXBoy";
  const isOtherBrand = currentUser?.role === "brand" && !isBathu && !isGalXBoy;

  // Brand-specific campaigns
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

  // Brand-specific top creator matches
  const getTopMatches = () => {
    if (isBathu) {
      return [
        { name: "Tshepiso Malema", niche: "Fashion", followers: "185K", rate: "R950/post", match: 98 },
        { name: "Kgodiso Leboho", niche: "Lifestyle", followers: "142K", rate: "R750/post", match: 94 },
        { name: "Linda Zulu", niche: "Fitness", followers: "98K", rate: "R550/post", match: 87 },
      ];
    } else if (isGalXBoy) {
      return [
        { name: "Kgodiso Leboho", niche: "Lifestyle", followers: "142K", rate: "R750/post", match: 96 },
        { name: "Tshepiso Malema", niche: "Fashion", followers: "185K", rate: "R950/post", match: 92 },
        { name: "Thando Dlamini", niche: "Travel", followers: "156K", rate: "R800/post", match: 88 },
      ];
    }
    return mockDiscoverCreators.slice(0, 3).map(c => ({
      name: c.name,
      niche: c.niche,
      followers: c.followers,
      rate: c.rate,
      match: c.match
    }));
  };

  // Brand-specific metrics
  const getBrandMetrics = () => {
    if (isBathu) {
      return {
        activeCampaigns: "3",
        totalApplications: "95",
        totalSpend: "R73K",
        avgEngagement: "7.8%",
        applicationsDelta: "+24",
        spendDelta: "+18.2%",
        engagementDelta: "+1.2%"
      };
    } else if (isGalXBoy) {
      return {
        activeCampaigns: "2",
        totalApplications: "66",
        totalSpend: "R33K",
        avgEngagement: "8.2%",
        applicationsDelta: "+18",
        spendDelta: "+25.5%",
        engagementDelta: "+1.5%"
      };
    }
    return {
      activeCampaigns: "2",
      totalApplications: "42",
      totalSpend: "R27K",
      avgEngagement: "6.5%",
      applicationsDelta: "+12",
      spendDelta: "+15.3%",
      engagementDelta: "+0.7%"
    };
  };

  const campaigns = getBrandCampaigns();
  const creators = getTopMatches();
  const metrics = getBrandMetrics();
  const brandName = currentUser?.name || "Brand";
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Good afternoon";

  const content = {
    "brand-overview": (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
              {greeting}, {brandName}! 👋
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Manage campaigns and discover South African talent.</p>
          </div>
          <Button variant="gold" onClick={() => onSection("create-campaign")}>
            <Icon name="plus" size={16} /> New Campaign
          </Button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard label="Active Campaigns" value={metrics.activeCampaigns} icon="briefcase" color="#8B5CF6" />
          <StatCard label="Total Applications" value={metrics.totalApplications} delta={`+${metrics.applicationsDelta}`} icon="user" color="#FF006E" />
          <StatCard label="Total Spend" value={metrics.totalSpend} delta={metrics.spendDelta} icon="dollar" color="#FFE600" />
          <StatCard label="Avg. Engagement" value={metrics.avgEngagement} delta={metrics.engagementDelta} icon="trending" color="#10B981" />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Active Campaigns</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => onSection("campaigns")}>View all</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {campaigns.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Badge variant={c.status === "active" ? "green" : c.status === "review" ? "gold" : "gray"}>{c.status}</Badge>
                      <Badge variant="gray">{c.platform}</Badge>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--neon-pink)" }}>{c.budget}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.applications} apps</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Top Matches</h3>
              <Badge variant="pink" icon="zap">AI Powered</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {creators.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < creators.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <Avatar name={c.name} size={38} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.niche} · {c.followers}</div>
                  </div>
                  <div style={{ background: "linear-gradient(135deg, rgba(255,0,110,0.15), rgba(131,56,236,0.15))", color: "#FF006E", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>
                    {c.match}% Match
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => onSection("discover")} style={{ width: "100%", justifyContent: "center" }}>
                <Icon name="search" size={14} /> Discover more creators
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div className="card" style={{ textAlign: "center", padding: 20 }}>
            <Icon name="users" size={24} color="#FF006E" />
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
    "create-campaign": <CreateCampaignPage onSection={onSection} />,
    analytics: <AnalyticsSection />,
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)", alignItems: "center", justifyContent: "center" }}>
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <Icon name="loader" size={48} color="#FF006E" />
          <h2 style={{ marginTop: 20 }}>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)" }}>
      <Sidebar role="brand" activeSection={section} onSection={onSection} onNavigate={onNavigate} />
      <main style={{ flex: 1, marginLeft: 240, padding: "40px 36px", maxWidth: "calc(100vw - 240px)" }}>
        {content[section] || content["brand-overview"]}
      </main>
    </div>
  );
};