import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";

export const CreatorProfilePage = ({ isOwner, onNavigate }) => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const portfolio = [
    { title: "Spring Collection BTS", platform: "instagram", views: "124K", img: "🌸" },
    { title: "Tech Review: Galaxy S25", platform: "youtube", views: "84K", img: "📱" },
    { title: "Day in My Life Cape Town", platform: "tiktok", views: "2.1M", img: "🌊" },
    { title: "Brand Collab: Zara Basics", platform: "instagram", views: "98K", img: "👗" },
    { title: "Coffee Morning Routine", platform: "tiktok", views: "430K", img: "☕" },
    { title: "5 Things I Wish I Knew", platform: "youtube", views: "156K", img: "💡" },
  ];
  const platformColors = { instagram: "#E1306C", youtube: "#FF0000", tiktok: "#010101" };
  
  return (
    <div style={{ maxWidth: 900, animation: "fadeUp .4s ease" }}>
      {/* Header */}
      <div className="card" style={{ marginBottom: 24, padding: 0, overflow: "hidden" }}>
        <div style={{ height: 160, background: "linear-gradient(135deg, var(--ink) 0%, #1A1A1A 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "30%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,.3) 0%, transparent 70%)" }} />
        </div>
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -44, marginBottom: 20 }}>
            <div style={{ position: "relative" }}>
              <Avatar name="Amara Osei" size={80} ring />
              {isOwner && (
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: "var(--white)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)", cursor: "pointer", border: "1.5px solid var(--border)" }}>
                  <Icon name="camera" size={12} />
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
              {isOwner ? (
                <Button variant="ghost" size="sm"><Icon name="settings" size={14} /> Edit Profile</Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm"><Icon name="link" size={14} /> Share</Button>
                  <Button variant="gold" size="sm"><Icon name="briefcase" size={14} /> Hire Me</Button>
                </>
              )}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Amara Osei</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>Lifestyle & Fashion Creator · Cape Town, ZA</p>
              <p style={{ fontSize: 14, color: "var(--ink)", maxWidth: 500, lineHeight: 1.7, marginBottom: 16 }}>
                Creating content at the intersection of fashion, culture, and African storytelling. Partnered with 30+ global brands.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Fashion", "Lifestyle", "Travel", "Beauty"].map(tag => <Badge key={tag} variant="gray">{tag}</Badge>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, minWidth: 280 }}>
              {[["240K", "Followers"], ["6.8%", "Engagement"], ["$1.2K", "Avg Rate"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center", padding: "16px 12px", background: "var(--surface)", borderRadius: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 }}>{v}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {["twitter", "instagram", "youtube", "tiktok"].map(s => (
              <div key={s} style={{ width: 32, height: 32, borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--surface-2)"; }}>
                <Icon name={s} size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {["portfolio", "metrics", "reviews"].map(t => (
          <div key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}
            style={{ textTransform: "capitalize" }}>{t}</div>
        ))}
      </div>

      {activeTab === "portfolio" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {portfolio.map((p, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 140, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
                {p.img}
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <Badge variant="gray" style={{ background: platformColors[p.platform] + "22", color: platformColors[p.platform] }}>
                    {p.platform}
                  </Badge>
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{p.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 12 }}>
                  <Icon name="eye" size={12} /> {p.views} views
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "metrics" && (
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Performance Metrics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[["Avg Views/Post", "84K"], ["Avg Likes/Post", "5.7K"], ["Story Views", "12K"], ["Link Click Rate", "3.2%"], ["Saves Rate", "1.8%"], ["Share Rate", "0.9%"]].map(([l, v]) => (
              <div key={l} style={{ padding: 16, background: "var(--surface)", borderRadius: 12 }}>
                <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>{l}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[{ brand: "Nike Africa", text: "Amara's content exceeded all our expectations. High-quality, on-brand, and delivered early.", rating: 5 },
            { brand: "Zara Partnerships", text: "Professional, creative, and incredibly engaged audience. Will work with again.", rating: 5 }].map((r, i) => (
            <div key={i} className="card">
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {[...Array(r.rating)].map((_, s) => <Icon key={s} name="star" size={14} color="var(--gold)" />)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink)", marginBottom: 12 }}>"{r.text}"</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>— {r.brand}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};