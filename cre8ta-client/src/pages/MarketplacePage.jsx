import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";

export const MarketplacePage = ({ onNavigate }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const campaigns = [
    { id: 1, brand: "Nike Africa", title: "Summer Vibes Campaign", budget: "$3,000–$5,000", category: "Fashion", platform: "Instagram", deadline: "Jun 15, 2025", desc: "We're looking for lifestyle and fashion creators to showcase our new summer collection in authentic, story-driven content.", requirements: ["50K+ followers", "Fashion/Lifestyle niche", "3 feed posts + 5 stories"], tags: ["lifestyle", "fashion", "summer"], applications: 24 },
    { id: 2, brand: "Spotify Africa", title: "Music Discovery Series", budget: "$1,500–$2,500", category: "Music", platform: "TikTok", deadline: "May 28, 2025", desc: "Spotlight emerging African artists on your platform and show how you use Spotify to discover new music.", requirements: ["20K+ TikTok followers", "Music interest", "2 TikTok videos"], tags: ["music", "culture"], applications: 41 },
    { id: 3, brand: "Apple SA", title: "Shot on iPhone Creator Program", budget: "$8,000–$15,000", category: "Tech", platform: "YouTube", deadline: "Jul 1, 2025", desc: "We're collaborating with Africa's most talented creators to produce cinematic content using the iPhone 16 Pro.", requirements: ["100K+ YouTube", "High production quality", "1 mini-documentary"], tags: ["tech", "film", "premium"], applications: 67 },
    { id: 4, brand: "Woolworths SA", title: "Autumn Essentials", budget: "$800–$1,200", category: "Fashion", platform: "Instagram", deadline: "May 22, 2025", desc: "Partner with us to showcase our new autumn wardrobe essentials in authentic, everyday styling content.", requirements: ["10K+ followers", "Fashion focus", "5 posts"], tags: ["fashion", "local"], applications: 15 },
    { id: 5, brand: "Discovery Health", title: "Wellness January Challenge", budget: "$2,000–$4,000", category: "Health", platform: "TikTok", deadline: "Jun 30, 2025", desc: "Join our wellness campaign to inspire your community to prioritize health and active lifestyles.", requirements: ["30K+ followers", "Wellness/Fitness niche", "12 short videos"], tags: ["wellness", "fitness"], applications: 29 },
    { id: 6, brand: "Samsung Africa", title: "Galaxy AI Feature Showcase", budget: "$5,000–$8,000", category: "Tech", platform: "YouTube", deadline: "Jun 20, 2025", desc: "Be among the first creators to showcase Samsung Galaxy's AI features to your audience.", requirements: ["80K+ YouTube", "Tech audience", "2 long-form videos"], tags: ["tech", "ai"], applications: 52 },
  ];

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      {selectedCampaign && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setSelectedCampaign(null)}>
          <div className="modal">
            <div style={{ padding: "28px 28px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <Badge variant="gold">{selectedCampaign.category}</Badge>
                    <Badge variant="gray">{selectedCampaign.platform}</Badge>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{selectedCampaign.title}</h2>
                  <p style={{ color: "var(--muted)", fontSize: 14 }}>by {selectedCampaign.brand}</p>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setSelectedCampaign(null)} style={{ padding: "6px 10px" }}>
                  <Icon name="x" size={16} />
                </button>
              </div>
            </div>
            <div style={{ padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["Budget", selectedCampaign.budget], ["Deadline", selectedCampaign.deadline], ["Applications", selectedCampaign.applications]].map(([l, v]) => (
                  <div key={l} style={{ background: "var(--surface)", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <h4 style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Campaign Brief</h4>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75 }}>{selectedCampaign.desc}</p>
              </div>
              <div>
                <h4 style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Requirements</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedCampaign.requirements.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(245,200,66,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="check" size={11} color="var(--gold-dark)" />
                      </div>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="gold" style={{ justifyContent: "center" }} onClick={() => setSelectedCampaign(null)}>
                <Icon name="briefcase" size={16} /> Apply to Campaign
              </Button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Campaign Marketplace</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Browse and apply to brand campaigns that match your profile.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 16, marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 13 }}>
          <Icon name="filter" size={14} /> Filter by:
        </div>
        {[["Category", ["all", "Fashion", "Tech", "Music", "Health"]], ["Platform", ["all", "Instagram", "TikTok", "YouTube"]], ["Budget", ["all", "Under $2K", "$2K–$5K", "$5K+"]]].map(([label, opts]) => (
          <select key={label} className="input" style={{ width: "auto", padding: "8px 12px", fontSize: 13 }}>
            {opts.map(o => <option key={o}>{o === "all" ? `All ${label}` : o}</option>)}
          </select>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 13, color: "var(--muted)" }}>{campaigns.length} campaigns</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {campaigns.map((c, i) => (
          <div key={c.id} className="card" style={{ cursor: "pointer", animationDelay: `${i * 0.05}s` }}
            onClick={() => setSelectedCampaign(c)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 6 }}>{c.brand}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{c.title}</h3>
              </div>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
              {c.desc.slice(0, 80)}...
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <Badge variant="gold">{c.category}</Badge>
              <Badge variant="blue">{c.platform}</Badge>
              {c.tags.slice(0, 1).map(t => <Badge key={t} variant="gray">{t}</Badge>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{c.budget}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Due {c.deadline}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                <Icon name="user" size={12} /> {c.applications} applied
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};