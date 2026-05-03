import { useState, useEffect } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { Icon } from "../components/ui/Icon";
import { CreatorProfilePage } from "./CreatorProfilePage";
import { CampaignsList } from "../sections/CampaignsList";
import { MarketplacePage } from "./MarketplacePage";
import { AIToolsPage } from "./AIToolsPage";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { EarningsSection } from "../sections/EarningsSection";

export const CreatorDashboard = ({ section, onSection, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t); }, []);

  const activity = [
    { text: "Nike Campaign approved your application", time: "2h ago", icon: "check", color: "#15803D" },
    { text: "New message from Zara Partnerships", time: "5h ago", icon: "bell", color: "var(--gold-dark)" },
    { text: "Your portfolio was viewed 84 times today", time: "1d ago", icon: "eye", color: "#3B82F6" },
    { text: "Payment of $1,200 received from Adidas", time: "2d ago", icon: "dollar", color: "#10B981" },
  ];

  const content = {
    overview: (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Good morning, Amara 👋</h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>Here's what's happening with your creator account.</p>
          </div>
          <Button variant="gold" size="sm" onClick={() => onSection("marketplace")}>
            <Icon name="grid" size={14} /> Browse Campaigns
          </Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
          <StatCard label="Total Earnings" value="$8,420" delta="+18.2%" icon="dollar" loading={loading} />
          <StatCard label="Monthly Views" value="1.4M" delta="+24.1%" icon="eye" color="#3B82F6" loading={loading} />
          <StatCard label="Active Campaigns" value="3" delta="+1" icon="briefcase" color="#8B5CF6" loading={loading} />
          <StatCard label="Engagement Rate" value="6.8%" delta="+0.4%" icon="trending" color="#10B981" loading={loading} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Recent Activity</h3>
              <Badge variant="gold">{activity.length} new</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {loading ? [...Array(4)].map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <Skeleton width={36} height={36} radius={10} />
                  <div style={{ flex: 1 }}>
                    <Skeleton height={13} style={{ marginBottom: 6 }} />
                    <Skeleton width="30%" height={11} />
                  </div>
                </div>
              )) : activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={a.icon} size={15} color={a.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Profile Strength</h3>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--gold-dark)" }}>72%</span>
            </div>
            <div className="progress" style={{ marginBottom: 24 }}><div className="progress-bar" style={{ width: "72%" }} /></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[{ text: "Add portfolio items", done: true }, { text: "Connect social accounts", done: true }, { text: "Set your niche & rates", done: true }, { text: "Upload profile video", done: false }, { text: "Get 3 brand reviews", done: false }].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.done ? "var(--gold)" : "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.done && <Icon name="check" size={11} color="var(--ink)" />}
                  </div>
                  <span style={{ color: item.done ? "var(--ink)" : "var(--muted)", textDecoration: item.done ? "none" : "none" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    profile: <CreatorProfilePage isOwner onNavigate={onNavigate} />,
    campaigns: <CampaignsList onNavigate={onNavigate} />,
    marketplace: <MarketplacePage onNavigate={onNavigate} />,  // ← THIS LINE
    "ai-tools": <AIToolsPage />,  // ← AND THIS LINE
    analytics: <AnalyticsSection />,
    earnings: <EarningsSection />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)" }}>
      <Sidebar role="creator" activeSection={section} onSection={onSection} onNavigate={onNavigate} />
      <main style={{ flex: 1, marginLeft: 240, padding: "40px 36px", maxWidth: "calc(100vw - 240px)" }}>
        {content[section] || content.overview}
      </main>
    </div>
  );
};