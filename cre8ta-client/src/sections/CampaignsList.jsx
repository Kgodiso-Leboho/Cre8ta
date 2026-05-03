import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";

export const CampaignsList = ({ brand, onNavigate }) => (
  <div style={{ animation: "fadeUp .4s ease" }}>
    <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
      {brand ? "Your Campaigns" : "My Campaigns"}
    </h1>
    {!brand ? (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 24px", background: "var(--white)", borderRadius: 20, border: "2px dashed var(--border)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No active campaigns yet</h3>
        <p style={{ color: "var(--muted)", marginBottom: 20, textAlign: "center", maxWidth: 320 }}>
          You haven't applied to any campaigns yet. Browse the marketplace to find your next brand partnership.
        </p>
        <Button variant="gold" onClick={() => onNavigate("marketplace")}><Icon name="grid" size={16} /> Browse Marketplace</Button>
      </div>
    ) : (
      <div style={{ color: "var(--muted)", fontSize: 14 }}>Campaign management view — list of all brand campaigns with status filters.</div>
    )}
  </div>
);