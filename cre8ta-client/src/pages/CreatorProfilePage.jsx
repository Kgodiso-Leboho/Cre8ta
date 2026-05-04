import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser } from "../data/mockData";

export const CreatorProfilePage = ({ isOwner = false, onNavigate, creatorId }) => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Check if we're viewing Tshepiso or Kgodiso
  const isTshepiso = currentUser?.name === "Tshepiso Malema" || creatorId === "tshepiso";
  const isKgodiso = currentUser?.name === "Kgodiso Leboho" || creatorId === "kgodiso";
  
  // Portfolio data based on creator
  const getPortfolio = () => {
    if (isTshepiso) {
      return [
        { title: "Bathu 990v4 Styling", platform: "instagram", views: "245K", img: "👟" },
        { title: "Soweto Street Style", platform: "tiktok", views: "432K", img: "🏙️" },
        { title: "Day in Joburg Vlog", platform: "youtube", views: "189K", img: "🚗" },
        { title: "Local Brands Haul", platform: "instagram", views: "312K", img: "🛍️" },
        { title: "GalXBoy Unboxing", platform: "tiktok", views: "178K", img: "📦" },
        { title: "Joburg Nightlife", platform: "instagram", views: "98K", img: "🌃" }
      ];
    } else if (isKgodiso) {
      return [
        { title: "Pretoria Street Style", platform: "instagram", views: "178K", img: "🌸" },
        { title: "GalXBoy Heritage Collection", platform: "youtube", views: "267K", img: "🎨" },
        { title: "Day in Pretoria CBD", platform: "tiktok", views: "312K", img: "🏛️" },
        { title: "South African Music Review", platform: "youtube", views: "156K", img: "🎵" },
        { title: "Local Market Tour", platform: "instagram", views: "89K", img: "🛒" }
      ];
    }
    return [
      { title: "Welcome to Cre8ta!", platform: "instagram", views: "0", img: "✨" },
      { title: "Complete your profile", platform: "tiktok", views: "0", img: "📝" }
    ];
  };

  // Metrics based on creator
  const getMetrics = () => {
    if (isTshepiso) {
      return {
        followers: "185K",
        engagement: "7.2%",
        avgRate: "R950",
        bio: "Joburg-based fashion and lifestyle creator. Showing you how to style local brands with international flair. 🇿🇦",
        location: "Johannesburg, South Africa",
        niches: ["Fashion", "Streetwear", "Lifestyle", "Sneakers"],
        name: "Tshepiso Malema",
        tagline: "Fashion & Streetwear Creator"
      };
    } else if (isKgodiso) {
      return {
        followers: "142K",
        engagement: "8.1%",
        avgRate: "R750",
        bio: "Pretoria-based content creator. Celebrating South African culture, music, and fashion. Let's collab! ✨",
        location: "Pretoria, South Africa",
        niches: ["Lifestyle", "Music", "Fashion", "Vlogs"],
        name: "Kgodiso Leboho",
        tagline: "Lifestyle & Culture Creator"
      };
    }
    return {
      followers: "0",
      engagement: "0%",
      avgRate: "R0",
      bio: "New creator on Cre8ta. Ready to collaborate and create amazing content! 🚀",
      location: "South Africa",
      niches: ["Content Creation"],
      name: currentUser?.name || "Creator",
      tagline: "Content Creator"
    };
  };

  const portfolio = getPortfolio();
  const metrics = getMetrics();
  const platformColors = { instagram: "#E1306C", youtube: "#FF0000", tiktok: "#010101" };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <div className="skeleton" style={{ width: 200, height: 200, borderRadius: "50%" }} />
      </div>
    );
  }
  
  return (
    <div style={{ maxWidth: 900, animation: "fadeUp .4s ease" }}>
      {/* Header */}
      <div className="card" style={{ marginBottom: 24, padding: 0, overflow: "hidden" }}>
        <div style={{ 
          height: 160, 
          background: isTshepiso 
            ? "linear-gradient(135deg, #FF006E, #8338EC, #3A86FF)" 
            : isKgodiso 
            ? "linear-gradient(135deg, #FF5400, #FFE600, #FF006E)"
            : "linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)", 
          position: "relative", 
          overflow: "hidden" 
        }}>
          <div style={{ position: "absolute", top: "30%", right: "10%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,.2) 0%, transparent 70%)" }} />
        </div>
        <div style={{ padding: "0 28px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -44, marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Avatar 
                name={metrics.name} 
                size={80} 
                ring={isTshepiso || isKgodiso} 
              />
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
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{metrics.name}</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 12 }}>{metrics.tagline} · {metrics.location}</p>
              <p style={{ fontSize: 14, color: "var(--ink)", maxWidth: 500, lineHeight: 1.7, marginBottom: 16 }}>
                {metrics.bio}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {metrics.niches.map((tag, idx) => <Badge key={idx} variant="gray">{tag}</Badge>)}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, minWidth: 280 }}>
              {[
                [metrics.followers, "Followers"], 
                [metrics.engagement, "Engagement"], 
                [metrics.avgRate, "Avg Rate"]
              ].map(([v, l], idx) => (
                <div key={idx} style={{ textAlign: "center", padding: "16px 12px", background: "var(--surface)", borderRadius: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #FF006E, #8338EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {v}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {["instagram", "tiktok", "youtube", "twitter"].map((s, idx) => (
              <div key={idx} style={{ width: 32, height: 32, borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #FF006E, #8338EC)"; e.currentTarget.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.transform = "scale(1)"; }}>
                <Icon name={s} size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 24 }}>
        {["portfolio", "metrics", "reviews"].map((t, idx) => (
          <div key={idx} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}
            style={{ textTransform: "capitalize", cursor: "pointer" }}>{t}</div>
        ))}
      </div>

      {activeTab === "portfolio" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {portfolio.map((p, idx) => (
            <div key={idx} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ height: 140, background: "linear-gradient(135deg, #FF006E, #8338EC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, position: "relative" }}>
                {p.img}
                <div style={{ position: "absolute", top: 10, left: 10 }}>
                  <Badge variant="gray" style={{ background: (platformColors[p.platform] || "#6B7280") + "22", color: platformColors[p.platform] || "#6B7280" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {(isTshepiso ? [
              ["Avg Views/Post", "156K"],
              ["Avg Likes/Post", "11.2K"],
              ["Story Views", "28K"],
              ["Link Click Rate", "4.1%"],
              ["Saves Rate", "2.3%"],
              ["Share Rate", "1.2%"]
            ] : isKgodiso ? [
              ["Avg Views/Post", "128K"],
              ["Avg Likes/Post", "9.8K"],
              ["Story Views", "22K"],
              ["Link Click Rate", "3.7%"],
              ["Saves Rate", "1.9%"],
              ["Share Rate", "0.9%"]
            ] : [
              ["Avg Views/Post", "0"],
              ["Avg Likes/Post", "0"],
              ["Story Views", "0"],
              ["Link Click Rate", "0%"],
              ["Saves Rate", "0%"],
              ["Share Rate", "0%"]
            ]).map(([l, v], idx) => (
              <div key={idx} style={{ padding: 16, background: "var(--surface)", borderRadius: 12 }}>
                <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>{l}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(isTshepiso ? [
            { brand: "Bathu", text: "Tshepiso's content is authentic and engaging. He captured the essence of our brand perfectly.", rating: 5, date: "Nov 2025" },
            { brand: "GalXBoy", text: "Working with Tshepiso was a dream. His creativity and professionalism are top-tier.", rating: 5, date: "Oct 2025" },
            { brand: "Yangas", text: "Great collaboration! Tshepiso delivered high-quality content that resonated with our audience.", rating: 4, date: "Sep 2025" }
          ] : isKgodiso ? [
            { brand: "MaXhosa Africa", text: "Kgodiso's storytelling ability is unmatched. She brought our heritage collection to life.", rating: 5, date: "Nov 2025" },
            { brand: "GalXBoy", text: "Amazing energy and creativity! Kgodiso understood our brand vision immediately.", rating: 5, date: "Oct 2025" }
          ] : [
            { brand: "Welcome to Cre8ta", text: "Complete your profile and start collaborating with brands!", rating: 0, date: "Just now" }
          ]).map((r, idx) => (
            <div key={idx} className="card">
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {[...Array(Math.max(0, r.rating))].map((_, s) => <Icon key={s} name="star" size={14} color="#FFE600" />)}
                {[...Array(Math.max(0, 5 - r.rating))].map((_, s) => <Icon key={`empty-${s}`} name="star" size={14} color="var(--border)" />)}
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink)", marginBottom: 12 }}>"{r.text}"</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>— {r.brand}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>{r.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};