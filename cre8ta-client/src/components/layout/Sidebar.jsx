import { useState, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { getCurrentUser } from "../../data/mockData";

export const Sidebar = ({ role = "creator", activeSection, onSection, onNavigate }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    // Set user name based on role and actual user
    if (user) {
      setUserName(user.name);
    } else if (role === "creator") {
      setUserName("Tshepiso Malema");
    } else {
      setUserName("Bathu");
    }
  }, [role]);

  const creatorLinks = [
    { id: "overview", icon: "home", label: "Overview" },
    { id: "profile", icon: "user", label: "My Profile" },
    { id: "campaigns", icon: "briefcase", label: "Campaigns" },
    { id: "marketplace", icon: "grid", label: "Marketplace" },
    { id: "ai-tools", icon: "zap", label: "AI Tools" },
    { id: "earnings", icon: "dollar", label: "Earnings" },
    { id: "analytics", icon: "chart", label: "Analytics" },
  ];
  
  const brandLinks = [
    { id: "brand-overview", icon: "home", label: "Overview" },
    { id: "campaigns", icon: "briefcase", label: "Campaigns" },
    { id: "discover", icon: "search", label: "Discover Creators" },
    { id: "create-campaign", icon: "plus", label: "Create Campaign" },
    { id: "analytics", icon: "chart", label: "Analytics" },
  ];
  
  const links = role === "creator" ? creatorLinks : brandLinks;
  
  // Get badge variant based on role
  const badgeVariant = role === "creator" ? "pink" : "purple";
  const badgeLabel = role === "creator" ? "Creator" : "Brand";
  
  // Get avatar ring color based on user
  const hasRing = currentUser?.verified || role === "creator";
  
  return (
    <aside className="sidebar">
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
          <div className="gold-gradient" style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="sparkle" size={14} color="#0D0D0D" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Cre8ta</span>
        </div>
      </div>
      
      <div style={{ padding: "12px 0", flex: 1 }}>
        <div style={{ padding: "4px 16px 8px", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {role === "creator" ? "Creator Hub" : "Brand Hub"}
        </div>
        {links.map(link => (
          <div 
            key={link.id} 
            className={`sidebar-link ${activeSection === link.id ? "active" : ""}`}
            onClick={() => onSection(link.id)} 
            style={{ animation: "slideIn .3s ease both" }}
          >
            <Icon name={link.icon} size={16} />
            <span>{link.label}</span>
            <div className="nav-dot" />
          </div>
        ))}
      </div>
      
      <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Avatar 
            name={userName} 
            image={currentUser?.avatar}  // Pass the user's avatar
            size={36} 
            ring={hasRing} 
          />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{userName}</div>
            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          </div>
        </div>
        <button 
          className="btn btn-ghost btn-sm" 
          style={{ width: "100%", justifyContent: "center", gap: 6 }}
          onClick={() => {
            // Clear current user from localStorage
            localStorage.removeItem("cre8ta_current_user");
            onNavigate("landing");
          }}
        >
          Log out
        </button>
      </div>
    </aside>
  );
};