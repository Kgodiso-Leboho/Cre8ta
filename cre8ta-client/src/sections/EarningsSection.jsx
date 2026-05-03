import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";

export const EarningsSection = () => (
  <div style={{ animation: "fadeUp .4s ease" }}>
    <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Earnings</h1>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
      <StatCard label="Total Earned" value="$8,420" delta="+18.2%" icon="dollar" />
      <StatCard label="This Month" value="$1,840" delta="+24%" icon="trending" color="#10B981" />
      <StatCard label="Pending" value="$620" icon="zap" color="#8B5CF6" />
      <StatCard label="Withdrawn" value="$7,800" icon="check" color="#3B82F6" />
    </div>
    <div className="card">
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Recent Transactions</h3>
      {[{ brand: "Nike Africa", amount: "+$1,200", date: "May 1, 2025", status: "paid" }, { brand: "Spotify", amount: "+$800", date: "Apr 22, 2025", status: "paid" }, { brand: "Apple SA", amount: "+$2,400", date: "Apr 15, 2025", status: "paid" }, { brand: "Zara", amount: "+$620", date: "Apr 10, 2025", status: "pending" }].map((t, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
          <Avatar name={t.brand} size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t.brand}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.date}</div>
          </div>
          <Badge variant={t.status === "paid" ? "green" : "gold"}>{t.status}</Badge>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: t.status === "paid" ? "#15803D" : "var(--muted)" }}>{t.amount}</div>
        </div>
      ))}
    </div>
  </div>
);