import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";
import { mockDiscoverCreators } from "../data/mockData";

export const DiscoverCreators = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [selectedNiche, setSelectedNiche] = useState("All Niches");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [filteredCreators, setFilteredCreators] = useState([]);
  const [invitedCreators, setInvitedCreators] = useState([]);

  // South African creators data
  const creators = [
    { 
      name: "Tshepiso Malema", 
      niche: "Fashion & Streetwear", 
      followers: "185K", 
      er: "7.2%", 
      rate: "R950/post", 
      platforms: ["instagram", "tiktok", "youtube"], 
      match: 98, 
      location: "Johannesburg",
      bio: "Joburg-based fashion creator specializing in local streetwear",
      verified: true,
      pastCollabs: ["Bathu", "GalXBoy", "Yangas"]
    },
    { 
      name: "Lesley Zibu", 
      niche: "Lifestyle & Culture", 
      followers: "142K", 
      er: "8.1%", 
      rate: "R750/post", 
      platforms: ["instagram", "tiktok", "youtube"], 
      match: 94, 
      location: "Pretoria",
      bio: "Celebrating South African culture, music, and fashion",
      verified: true,
      pastCollabs: ["MaXhosa Africa", "GalXBoy"]
    },
    { 
      name: "Linda Zulu", 
      niche: "Fitness & Health", 
      followers: "98K", 
      er: "6.5%", 
      rate: "R550/post", 
      platforms: ["instagram", "tiktok"], 
      match: 87, 
      location: "Durban",
      bio: "Fitness enthusiast promoting healthy lifestyle in SA",
      verified: false,
      pastCollabs: ["Mzansi Fit"]
    },
    { 
      name: "Thando Dlamini", 
      niche: "Travel & Food", 
      followers: "156K", 
      er: "5.9%", 
      rate: "R800/post", 
      platforms: ["instagram", "youtube"], 
      match: 82, 
      location: "Cape Town",
      bio: "Exploring South Africa's hidden gems and culinary delights",
      verified: true,
      pastCollabs: ["Cape Town Tourism", "Foodies SA"]
    },
    { 
      name: "Naledi Dube", 
      niche: "Beauty & Lifestyle", 
      followers: "95K", 
      er: "9.4%", 
      rate: "R650/post", 
      platforms: ["tiktok", "instagram"], 
      match: 88, 
      location: "Cape Town",
      bio: "Beauty creator sharing makeup tips and local products",
      verified: false,
      pastCollabs: ["Sephora SA", "Local Beauty Brands"]
    },
    { 
      name: "Sipho Nkosi", 
      niche: "Tech & Gaming", 
      followers: "78K", 
      er: "6.2%", 
      rate: "R500/post", 
      platforms: ["youtube", "twitter", "tiktok"], 
      match: 79, 
      location: "Johannesburg",
      bio: "Tech reviews and gaming content for South African audience",
      verified: false,
      pastCollabs: ["Samsung SA", "MTN"]
    }
  ];

  useEffect(() => {
    filterCreators();
  }, [searchTerm, selectedPlatform, selectedNiche, selectedBudget]);

  const filterCreators = () => {
    let filtered = [...creators];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Platform filter
    if (selectedPlatform !== "All Platforms") {
      filtered = filtered.filter(c => 
        c.platforms.includes(selectedPlatform.toLowerCase())
      );
    }
    
    // Niche filter
    if (selectedNiche !== "All Niches") {
      filtered = filtered.filter(c => 
        c.niche.toLowerCase().includes(selectedNiche.toLowerCase())
      );
    }
    
    // Budget filter
    if (selectedBudget !== "All Budgets") {
      const budgetValue = parseInt(selectedBudget.replace('R', '').replace('+', ''));
      if (selectedBudget === "R500 - R750") {
        filtered = filtered.filter(c => {
          const rate = parseInt(c.rate.replace('R', '').replace('/post', ''));
          return rate >= 500 && rate <= 750;
        });
      } else if (selectedBudget === "R750 - R1000") {
        filtered = filtered.filter(c => {
          const rate = parseInt(c.rate.replace('R', '').replace('/post', ''));
          return rate >= 750 && rate <= 1000;
        });
      } else if (selectedBudget === "R1000+") {
        filtered = filtered.filter(c => {
          const rate = parseInt(c.rate.replace('R', '').replace('/post', ''));
          return rate >= 1000;
        });
      }
    }
    
    setFilteredCreators(filtered);
  };

  const handleInvite = (creatorName) => {
    if (invitedCreators.includes(creatorName)) {
      setInvitedCreators(invitedCreators.filter(c => c !== creatorName));
    } else {
      setInvitedCreators([...invitedCreators, creatorName]);
      // Show success message (could be replaced with toast notification)
      alert(`✨ Invitation sent to ${creatorName}! They will be notified about your campaign.`);
    }
  };

  const nicheOptions = ["All Niches", "Fashion", "Streetwear", "Lifestyle", "Fitness", "Travel", "Beauty", "Tech"];
  const platformOptions = ["All Platforms", "Instagram", "TikTok", "YouTube", "Twitter"];
  const budgetOptions = ["All Budgets", "R500 - R750", "R750 - R1000", "R1000+"];

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Discover South African Creators</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Find the perfect creator match for your brand, from Joburg to Cape Town.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge variant="pink" icon="trending">Top Matches</Badge>
          <Badge variant="purple" icon="users">{filteredCreators.length} Creators</Badge>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
              <Icon name="search" size={16} color="var(--muted)" />
            </div>
            <input 
              className="input" 
              placeholder="Search creators..." 
              style={{ paddingLeft: 36 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="input" 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
          >
            {platformOptions.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          
          <select 
            className="input" 
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
          >
            {nicheOptions.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
          
          <select 
            className="input" 
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
          >
            {budgetOptions.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Results Count */}
      <div style={{ marginBottom: 16, fontSize: 13, color: "var(--muted)" }}>
        Showing {filteredCreators.length} of {creators.length} creators
      </div>
      
      {/* Creators Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {filteredCreators.map((c, i) => (
          <div key={i} className="card" style={{ padding: 20, transition: "all 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <Avatar name={c.name} size={56} ring={c.match >= 90} />
              <div style={{ 
                background: "linear-gradient(135deg, rgba(255,0,110,0.15), rgba(131,56,236,0.15))", 
                color: "#FF006E", 
                fontSize: 12, 
                fontWeight: 700, 
                padding: "4px 12px", 
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <Icon name="zap" size={10} /> {c.match}% Match
              </div>
            </div>
            
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{c.name}</h3>
            <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>
              {c.niche} · {c.location}
              {c.verified && <span style={{ marginLeft: 6, color: "#3A86FF" }}>✓ Verified</span>}
            </p>
            
            <p style={{ fontSize: 12, color: "var(--ink)", marginBottom: 12, lineHeight: 1.5 }}>
              {c.bio}
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[
                ["Followers", c.followers], 
                ["Engagement", c.er], 
                ["Rate", c.rate],
                ["Collabs", c.pastCollabs.length.toString()]
              ].map(([l, v]) => (
                <div key={l} style={{ background: "var(--surface)", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
            
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {c.platforms.map(p => (
                <div key={p} style={{ 
                  width: 28, 
                  height: 28, 
                  borderRadius: 6, 
                  background: "linear-gradient(135deg, rgba(255,0,110,0.1), rgba(131,56,236,0.1))", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <Icon name={p} size={14} />
                </div>
              ))}
            </div>
            
            <Button 
              variant={invitedCreators.includes(c.name) ? "ghost" : "gold"} 
              size="sm" 
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => handleInvite(c.name)}
            >
              {invitedCreators.includes(c.name) ? (
                <>
                  <Icon name="check" size={14} /> Invitation Sent
                </>
              ) : (
                <>
                  <Icon name="briefcase" size={14} /> Invite to Campaign
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredCreators.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 60 }}>
          <Icon name="search" size={48} color="var(--muted)" />
          <h3 style={{ marginTop: 16, fontSize: 18, fontWeight: 600 }}>No creators found</h3>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Try adjusting your filters to find more creators
          </p>
          <Button 
            variant="ghost" 
            style={{ marginTop: 16 }}
            onClick={() => {
              setSearchTerm("");
              setSelectedPlatform("All Platforms");
              setSelectedNiche("All Niches");
              setSelectedBudget("All Budgets");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

// Badge component (add if not imported)
const Badge = ({ children, variant, icon }) => {
  const variants = {
    pink: "badge-pink",
    purple: "badge-purple",
    gold: "badge-gold"
  };
  
  return (
    <span className={`badge ${variants[variant] || "badge-gray"}`}>
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
};