import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser } from "../data/mockData";

export const CampaignsList = ({ brand, onNavigate }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    loadCampaigns(user);
  }, [brand]);

  const loadCampaigns = (user) => {
    setLoading(true);
    
    if (brand) {
      // Brand view - show campaigns they created
      const allCampaigns = localStorage.getItem("cre8ta_campaigns");
      if (allCampaigns) {
        const parsedCampaigns = JSON.parse(allCampaigns);
        const userCampaigns = parsedCampaigns.filter(c => c.brandId === user?.id);
        setCampaigns(userCampaigns);
      } else {
        setCampaigns([]);
      }
    } else {
      // Creator view - show campaigns they applied to
      const appliedIds = localStorage.getItem("cre8ta_applied_campaigns");
      const allCampaigns = localStorage.getItem("cre8ta_campaigns");
      
      if (appliedIds && allCampaigns) {
        const appliedArray = JSON.parse(appliedIds);
        const allCampaignsArray = JSON.parse(allCampaigns);
        const appliedCampaigns = allCampaignsArray.filter(c => appliedArray.includes(c.id));
        setCampaigns(appliedCampaigns);
      } else {
        setCampaigns([]);
      }
    }
    
    setLoading(false);
  };

  const getStatusColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    if (deadlineDate < today) return "gray";
    if (deadlineDate - today < 7 * 24 * 60 * 60 * 1000) return "gold";
    return "green";
  };

  const getStatusText = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    if (deadlineDate < today) return "Expired";
    if (deadlineDate - today < 7 * 24 * 60 * 60 * 1000) return "Ending Soon";
    return "Active";
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === "all") return true;
    if (filter === "active") return getStatusText(campaign.deadline) === "Active";
    if (filter === "ending") return getStatusText(campaign.deadline) === "Ending Soon";
    if (filter === "expired") return getStatusText(campaign.deadline) === "Expired";
    return true;
  });

  if (loading) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
          {brand ? "Your Campaigns" : "My Campaigns"}
        </h1>
        <div className="card" style={{ padding: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty State for Creators (no applied campaigns)
  if (!brand && campaigns.length === 0) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>My Campaigns</h1>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          padding: "80px 24px", 
          background: "var(--surface-glass)", 
          borderRadius: 20, 
          border: "2px dashed var(--border)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No campaigns yet</h3>
          <p style={{ color: "var(--muted)", marginBottom: 20, textAlign: "center", maxWidth: 320 }}>
            You haven't applied to any campaigns yet. Browse the marketplace to find your next brand partnership.
          </p>
          <Button variant="gold" onClick={() => onNavigate("marketplace")}>
            <Icon name="grid" size={16} /> Browse Marketplace
          </Button>
        </div>
      </div>
    );
  }

  // Empty State for Brands (no created campaigns)
  if (brand && campaigns.length === 0) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800 }}>Your Campaigns</h1>
          <Button variant="gold" onClick={() => onNavigate("create-campaign")}>
            <Icon name="plus" size={16} /> Create Campaign
          </Button>
        </div>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          padding: "80px 24px", 
          background: "var(--surface-glass)", 
          borderRadius: 20, 
          border: "2px dashed var(--border)"
        }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📢</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>No campaigns created yet</h3>
          <p style={{ color: "var(--muted)", marginBottom: 20, textAlign: "center", maxWidth: 320 }}>
            Create your first campaign to start collaborating with South Africa's top creators.
          </p>
          <Button variant="gold" onClick={() => onNavigate("create-campaign")}>
            <Icon name="plus" size={16} /> Create Your First Campaign
          </Button>
        </div>
      </div>
    );
  }

  // Campaigns List View
  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800 }}>
          {brand ? "Your Campaigns" : "My Campaigns"}
        </h1>
        {brand && (
          <Button variant="gold" onClick={() => onNavigate("create-campaign")}>
            <Icon name="plus" size={16} /> Create New Campaign
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Campaigns", icon: "grid" },
            { id: "active", label: "Active", icon: "check" },
            { id: "ending", label: "Ending Soon", icon: "zap" },
            { id: "expired", label: "Expired", icon: "x" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`btn ${filter === f.id ? "btn-gold" : "btn-ghost"} btn-sm`}
              style={{ gap: 6 }}
            >
              <Icon name={f.icon} size={14} /> {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filteredCampaigns.map((campaign, i) => {
          const status = getStatusText(campaign.deadline);
          const statusColor = getStatusColor(campaign.deadline);
          
          return (
            <div key={campaign.id} className="card" style={{ padding: 20, transition: "all 0.3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                    <Badge variant={statusColor === "green" ? "green" : statusColor === "gold" ? "gold" : "gray"}>
                      {status}
                    </Badge>
                    <Badge variant="pink">{campaign.category}</Badge>
                    <Badge variant="cyan">{campaign.platform}</Badge>
                  </div>
                  
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    {campaign.title}
                  </h3>
                  
                  <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 12, lineHeight: 1.6 }}>
                    {campaign.desc.substring(0, 120)}...
                  </p>
                  
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="dollar" size={14} color="#FF006E" />
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#FF006E" }}>{campaign.budget}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="calendar" size={14} color="var(--muted)" />
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>Due {campaign.deadline}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="user" size={14} color="var(--muted)" />
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{campaign.applications} applicants</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {brand ? (
                    <>
                      <Button variant="ghost" size="sm">
                        <Icon name="eye" size={14} /> View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="users" size={14} /> Applications ({campaign.applications})
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm">
                      <Icon name="eye" size={14} /> View Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      {filteredCampaigns.length > 0 && (
        <div className="card" style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(255,0,110,0.05), rgba(131,56,236,0.05))" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, textAlign: "center" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#FF006E" }}>{campaigns.length}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Total Campaigns</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#10B981" }}>
                {campaigns.filter(c => getStatusText(c.deadline) === "Active").length}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Active</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#F59E0B" }}>
                {campaigns.filter(c => getStatusText(c.deadline) === "Ending Soon").length}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Ending Soon</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--muted)" }}>
                {campaigns.reduce((sum, c) => sum + (c.applications || 0), 0)}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Total Applications</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};