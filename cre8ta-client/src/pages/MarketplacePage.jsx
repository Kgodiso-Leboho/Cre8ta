import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser } from "../data/mockData";

export const MarketplacePage = ({ onNavigate }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [appliedFilters, setAppliedFilters] = useState(false);
  const [appliedCampaigns, setAppliedCampaigns] = useState([]);

  useEffect(() => {
    // Get current user
    const user = getCurrentUser();
    setCurrentUser(user);
    
    // Load applied campaigns from localStorage
    const savedApplied = localStorage.getItem("cre8ta_applied_campaigns");
    if (savedApplied) {
      setAppliedCampaigns(JSON.parse(savedApplied));
    }
    
    // Load campaigns
    loadCampaigns();
  }, []);

  const loadCampaigns = () => {
    // First, try to load from localStorage
    const savedCampaigns = localStorage.getItem("cre8ta_campaigns");
    let allCampaigns = [];
    
    if (savedCampaigns && JSON.parse(savedCampaigns).length > 0) {
      allCampaigns = JSON.parse(savedCampaigns);
    } else {
      // Default South African campaigns
      allCampaigns = [
        { 
          id: "camp_bathu_1", 
          brand: "Bathu", 
          title: "Bathu Summer Drop 2025", 
          budget: "R15,000–R25,000", 
          category: "Fashion", 
          platform: "Instagram", 
          deadline: "Dec 15, 2025", 
          desc: "We're looking for authentic creators to showcase our new summer sneaker collection. Show us how you style Bathu with your everyday fits.",
          requirements: ["10K+ followers minimum", "Fashion/Streetwear niche", "3 Instagram posts + 5 stories", "Must be based in SA"],
          tags: ["sneakers", "streetwear", "summer", "local"],
          applications: 45,
          brandId: "brand_bathu"
        },
        { 
          id: "camp_galxboy_1", 
          brand: "GalXBoy", 
          title: "GalXBoy Heritage Collection", 
          budget: "R10,000–R18,000", 
          category: "Streetwear", 
          platform: "TikTok", 
          deadline: "Dec 30, 2025", 
          desc: "Celebrate South African street culture with our new heritage drop. Create engaging TikTok content that shows off our latest pieces.",
          requirements: ["20K+ TikTok followers", "Streetwear/Hip-hop niche", "2 TikTok videos (15-30 seconds)", "Must tag @galxboy"],
          tags: ["streetwear", "urban", "culture", "tiktok"],
          applications: 38,
          brandId: "brand_galxboy"
        },
        { 
          id: "camp_maxhosa_1", 
          brand: "MaXhosa Africa", 
          title: "MaXhosa Heritage Month", 
          budget: "R30,000–R50,000", 
          category: "Luxury Fashion", 
          platform: "Instagram", 
          deadline: "Jan 15, 2026", 
          desc: "Celebrate heritage through fashion. We want creators who can tell powerful stories through our luxury knitwear collection.",
          requirements: ["50K+ followers minimum", "Fashion/Culture focus", "1 YouTube video + 2 IG posts", "High production quality"],
          tags: ["luxury", "heritage", "fashion", "premium"],
          applications: 67,
          brandId: "brand_maxhosa"
        },
        { 
          id: "camp_yangas_1", 
          brand: "Yangas", 
          title: "Yangas Everyday Comfort", 
          budget: "R5,000–R10,000", 
          category: "Lifestyle", 
          platform: "Instagram", 
          deadline: "Dec 10, 2025", 
          desc: "Showcase how Yangas sneakers fit into your daily life. From running errands to casual outings, we want to see real moments.",
          requirements: ["5K+ followers", "Lifestyle/Fashion niche", "5 Instagram stories + 1 post", "Authentic, unscripted content"],
          tags: ["comfort", "everyday", "casual"],
          applications: 23,
          brandId: "brand_yangas"
        },
        { 
          id: "camp_sketchy_1", 
          brand: "Sketchy Souls", 
          title: "Custom Art Collaboration", 
          budget: "R8,000–R15,000", 
          category: "Art", 
          platform: "Instagram", 
          deadline: "Jan 5, 2026", 
          desc: "We want to see your creative process! Customize our sneakers or create art inspired by our brand.",
          requirements: ["10K+ followers", "Art/Creative niche", "Process video + final reveal", "Original artwork"],
          tags: ["art", "custom", "creative", "process"],
          applications: 31,
          brandId: "brand_sketchy"
        },
        { 
          id: "camp_mzansi_1", 
          brand: "Mzansi Fit", 
          title: "New Year New You Challenge", 
          budget: "R12,000–R20,000", 
          category: "Fitness", 
          platform: "TikTok", 
          deadline: "Feb 1, 2026", 
          desc: "Kick off 2026 with Mzansi Fit! Create fitness content that inspires your audience to get active in our gear.",
          requirements: ["15K+ followers", "Fitness/Wellness niche", "30-day challenge content series", "2 TikTok videos per week"],
          tags: ["fitness", "health", "new year", "workout"],
          applications: 52,
          brandId: "brand_mzansi"
        }
      ];
    }
    
    setCampaigns(allCampaigns);
    setFilteredCampaigns(allCampaigns);
    setLoading(false);
  };

  const handleApply = (campaign) => {
    if (!currentUser) {
      alert("Please login to apply for campaigns");
      onNavigate("login");
      return;
    }
    
    if (currentUser.role !== "creator") {
      alert("Only creators can apply for campaigns");
      return;
    }
    
    // Check if already applied
    if (appliedCampaigns.includes(campaign.id)) {
      alert(`You have already applied to ${campaign.title}`);
      return;
    }
    
    // Add to applied campaigns
    const updatedApplied = [...appliedCampaigns, campaign.id];
    setAppliedCampaigns(updatedApplied);
    localStorage.setItem("cre8ta_applied_campaigns", JSON.stringify(updatedApplied));
    
    // Increment applications count
    const updatedCampaigns = campaigns.map(c => {
      if (c.id === campaign.id) {
        return { ...c, applications: c.applications + 1 };
      }
      return c;
    });
    setCampaigns(updatedCampaigns);
    setFilteredCampaigns(
      filteredCampaigns.map(c => 
        c.id === campaign.id ? { ...c, applications: c.applications + 1 } : c
      )
    );
    localStorage.setItem("cre8ta_campaigns", JSON.stringify(updatedCampaigns));
    
    alert(`✨ Successfully applied to ${campaign.title}! The brand will review your application.`);
    setSelectedCampaign(null);
  };

  const applyFilters = () => {
    let filtered = [...campaigns];
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(c => c.platform === selectedPlatform);
    }
    
    if (selectedBudget !== "all") {
      if (selectedBudget === "Under R10K") {
        filtered = filtered.filter(c => {
          const budget = c.budget;
          const numbers = budget.match(/R(\d+[,]?\d*)/g);
          if (numbers) {
            const min = parseInt(numbers[0].replace('R', '').replace(',', ''));
            return min < 10000;
          }
          return false;
        });
      } else if (selectedBudget === "R10K–R20K") {
        filtered = filtered.filter(c => {
          const budget = c.budget;
          const numbers = budget.match(/R(\d+[,]?\d*)/g);
          if (numbers) {
            const min = parseInt(numbers[0].replace('R', '').replace(',', ''));
            return min >= 10000 && min <= 20000;
          }
          return false;
        });
      } else if (selectedBudget === "R20K+") {
        filtered = filtered.filter(c => {
          const budget = c.budget;
          const numbers = budget.match(/R(\d+[,]?\d*)/g);
          if (numbers) {
            const min = parseInt(numbers[0].replace('R', '').replace(',', ''));
            return min > 20000;
          }
          return false;
        });
      }
    }
    
    setFilteredCampaigns(filtered);
    setAppliedFilters(true);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSelectedBudget("all");
    setFilteredCampaigns(campaigns);
    setAppliedFilters(false);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <div className="skeleton" style={{ width: 300, height: 200, borderRadius: 20 }} />
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      {/* Campaign Modal */}
      {selectedCampaign && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setSelectedCampaign(null)}>
          <div className="modal">
            <div style={{ padding: "28px 28px 0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                    <Badge variant="orange">{selectedCampaign.category}</Badge>
                    <Badge variant="cyan">{selectedCampaign.platform}</Badge>
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
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12 }}>
                {[
                  ["Budget", selectedCampaign.budget], 
                  ["Deadline", selectedCampaign.deadline], 
                  ["Applications", `${selectedCampaign.applications} applied`]
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "var(--surface)", borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#FF6B35" }}>{v}</div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Campaign Brief</h4>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75 }}>{selectedCampaign.desc || selectedCampaign.description || "No description available"}</p>
              </div>
              
              <div>
                <h4 style={{ fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Requirements</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedCampaign.requirements.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,107,53,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="check" size={11} color="#FF6B35" />
                      </div>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="gold" 
                style={{ justifyContent: "center" }} 
                onClick={() => handleApply(selectedCampaign)}
                disabled={appliedCampaigns.includes(selectedCampaign.id)}
              >
                {appliedCampaigns.includes(selectedCampaign.id) ? (
                  <>
                    <Icon name="check" size={16} /> Application Submitted
                  </>
                ) : (
                  <>
                    <Icon name="briefcase" size={16} /> Apply to Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Campaign Marketplace</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Browse and apply to brand campaigns from top South African brands.</p>
        </div>
        {currentUser?.role !== "creator" && (
          <Badge variant="orange" icon="sparkle">Creators: Apply to earn!</Badge>
        )}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 12 }}>
          <select 
            className="input" 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ fontSize: 13 }}
          >
            <option value="all">All Categories</option>
            {["Fashion", "Streetwear", "Luxury Fashion", "Lifestyle", "Art", "Fitness"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
          
          <select 
            className="input" 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{ fontSize: 13 }}
          >
            <option value="all">All Platforms</option>
            {["Instagram", "TikTok", "YouTube"].map(p => (
              <option key={p}>{p}</option>
            ))}
          </select>
          
          <select 
            className="input" 
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            style={{ fontSize: 13 }}
          >
            <option value="all">All Budgets</option>
            <option value="Under R10K">Under R10K</option>
            <option value="R10K–R20K">R10K – R20K</option>
            <option value="R20K+">R20K+</option>
          </select>
        </div>
        
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
          </Button>
          <Button variant="gold" size="sm" onClick={applyFilters}>
            <Icon name="filter" size={14} /> Apply Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          Showing {filteredCampaigns.length} of {campaigns.length} campaigns
        </div>
        {appliedFilters && (
          <Badge variant="orange" icon="check">Filters Applied</Badge>
        )}
      </div>

      {/* Campaigns Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {filteredCampaigns.map((c, i) => (
          <div key={c.id} className="card" style={{ cursor: "pointer", transition: "all 0.3s ease" }}
            onClick={() => setSelectedCampaign(c)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#FF6B35", marginBottom: 6 }}>{c.brand}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>{c.title}</h3>
              </div>
              {appliedCampaigns.includes(c.id) && (
                <Badge variant="green" icon="check">Applied</Badge>
              )}
            </div>
            
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
              {c.desc ? c.desc.substring(0, 100) : (c.description ? c.description.substring(0, 100) : "No description available")}...
            </p>
            
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <Badge variant="orange">{c.category}</Badge>
              <Badge variant="cyan">{c.platform}</Badge>
              {c.tags && c.tags.slice(0, 2).map(t => (
                <Badge key={t} variant="gray">{t}</Badge>
              ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#FF6B35" }}>{c.budget}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Due {c.deadline}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                <Icon name="user" size={12} /> {c.applications} applied
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="card" style={{ textAlign: "center", padding: 60 }}>
          <Icon name="search" size={48} color="var(--muted)" />
          <h3 style={{ marginTop: 16, fontSize: 18, fontWeight: 600 }}>No campaigns found</h3>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Try adjusting your filters to see more opportunities
          </p>
          <Button variant="ghost" style={{ marginTop: 16 }} onClick={resetFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};