import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";

export const DiscoverCreators = ({ onNavigate }) => {
  const creators = [
    { name: "Zanele Dlamini", niche: "Lifestyle", followers: "240K", er: "7.2%", rate: "$800/post", platforms: ["instagram", "tiktok"], match: 98, location: "Johannesburg" },
    { name: "Farai Mutasa", niche: "Tech", followers: "180K", er: "5.8%", rate: "$600/post", platforms: ["youtube", "twitter"], match: 94, location: "Harare" },
    { name: "Kwame Asante", niche: "Fitness", followers: "320K", er: "8.1%", rate: "$1,200/post", platforms: ["instagram", "youtube"], match: 91, location: "Accra" },
    { name: "Naledi Dube", niche: "Beauty", followers: "95K", er: "9.4%", rate: "$400/post", platforms: ["tiktok", "instagram"], match: 88, location: "Cape Town" },
    { name: "Seun Adeyemi", niche: "Fashion", followers: "460K", er: "4.9%", rate: "$2,000/post", platforms: ["instagram", "youtube"], match: 85, location: "Lagos" },
    { name: "Amara Chen", niche: "Food", followers: "130K", er: "6.5%", rate: "$500/post", platforms: ["tiktok", "instagram"], match: 82, location: "Nairobi" },
  ];
  
  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Discover Creators</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Find the perfect creator match for your brand.</p>
        </div>
      </div>
      <div className="card" style={{ padding: 14, marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative", minWidth: 200 }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
            <Icon name="search" size={14} color="var(--muted)" />
          </div>
          <input className="input" placeholder="Search creators by name or niche..." style={{ paddingLeft: 36, fontSize: 13 }} />
        </div>
        {["Platform", "Niche", "Budget"].map(f => (
          <select key={f} className="input" style={{ width: "auto", padding: "8px 12px", fontSize: 13 }}>
            <option>All {f}s</option>
          </select>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {creators.map((c, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <Avatar name={c.name} size={48} ring />
              <div style={{ background: "rgba(245,200,66,.15)", color: "var(--gold-dark)", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 8 }}>
                {c.match}% match
              </div>
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{c.name}</h3>
            <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 12 }}>{c.niche} · {c.location}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[["Followers", c.followers], ["Eng. Rate", c.er]].map(([l, v]) => (
                <div key={l} style={{ background: "var(--surface)", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {c.platforms.map(p => (
                <div key={p} style={{ width: 26, height: 26, borderRadius: 6, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={p} size={13} />
                </div>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 600 }}>{c.rate}</span>
            </div>
            <Button variant="gold" size="sm" style={{ width: "100%", justifyContent: "center" }}>
              <Icon name="briefcase" size={13} /> Invite to Campaign
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};