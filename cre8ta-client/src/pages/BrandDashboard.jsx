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

export const BrandDashboard = ({ section, onSection, onNavigate }) => {
  const campaigns = [
    { title: "Summer Lookbook 2025", status: "active", applications: 24, budget: "$5,000", platform: "Instagram", deadline: "Jun 15" },
    { title: "Product Launch - AirMax Z", status: "active", applications: 38, budget: "$12,000", platform: "TikTok", deadline: "May 30" },
    { title: "Brand Awareness Q2", status: "review", applications: 12, budget: "$3,500", platform: "YouTube", deadline: "Jun 1" },
  ];
  const creators = [
    { name: "Zanele Dlamini", niche: "Lifestyle", followers: "240K", rate: "$800/post", match: 98 },
    { name: "Farai Mutasa", niche: "Tech", followers: "180K", rate: "$600/post", match: 94 },
    { name: "Kwame Asante", niche: "Fitness", followers: "320K", rate: "$1,200/post", match: 91 },
  ];

  const content = {
    "brand-overview": (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Brand Dashboard</h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Manage campaigns and discover talent.</p>
          </div>
          <Button variant="gold" onClick={() => onSection("create-campaign")}>
            <Icon name="plus" size={16} /> New Campaign
          </Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard label="Active Campaigns" value="3" icon="briefcase" color="#8B5CF6" />
          <StatCard label="Total Applications" value="74" delta="+18" icon="user" color="var(--gold-dark)" />
          <StatCard label="Total Spend" value="$20.5K" delta="+12.4%" icon="dollar" />
          <StatCard label="Avg. Engagement" value="5.2%" delta="+0.8%" icon="trending" color="#10B981" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Active Campaigns</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => onSection("campaigns")}>View all</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {campaigns.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 16px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{c.title}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Badge variant={c.status === "active" ? "green" : "gold"}>{c.status}</Badge>
                      <Badge variant="gray">{c.platform}</Badge>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.budget}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.applications} apps</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Top Matches</h3>
              <Badge variant="gold" icon="zap">AI</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {creators.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < creators.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <Avatar name={c.name} size={38} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{c.niche} · {c.followers}</div>
                  </div>
                  <div style={{ background: "rgba(245,200,66,.15)", color: "var(--gold-dark)", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>{c.match}%</div>
                </div>
              ))}
              <Button variant="ghost" size="sm" onClick={() => onSection("discover")} style={{ width: "100%", justifyContent: "center" }}>
                Discover more creators
              </Button>
            </div>
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

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)" }}>
      <Sidebar role="brand" activeSection={section} onSection={onSection} onNavigate={onNavigate} />
      <main style={{ flex: 1, marginLeft: 240, padding: "40px 36px", maxWidth: "calc(100vw - 240px)" }}>
        {content[section] || content["brand-overview"]}
      </main>
    </div>
  );
};