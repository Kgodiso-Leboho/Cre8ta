import { StatCard } from "../components/ui/StatCard";
import { Icon } from "../components/ui/Icon";

export const AnalyticsSection = () => (
  <div style={{ animation: "fadeUp .4s ease" }}>
    <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Analytics</h1>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
      <StatCard label="Total Reach" value="4.2M" delta="+32%" icon="globe" color="#3B82F6" />
      <StatCard label="Avg Engagement" value="6.8%" delta="+0.4%" icon="trending" color="#10B981" />
      <StatCard label="Content Pieces" value="48" delta="+6" icon="grid" color="#8B5CF6" />
      <StatCard label="Brand Collabs" value="12" delta="+3" icon="briefcase" />
    </div>
    <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 280, background: "var(--surface)", border: "2px dashed var(--border)" }}>
      <div style={{ textAlign: "center", color: "var(--muted)" }}>
        <Icon name="chart" size={40} color="var(--border)" />
        <p style={{ marginTop: 12, fontSize: 14 }}>Analytics charts would render here with real data integration</p>
      </div>
    </div>
  </div>
);