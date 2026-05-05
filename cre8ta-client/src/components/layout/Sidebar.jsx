// src/components/layout/Sidebar.jsx
import { useState, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { getCurrentUser } from "../../data/mockData";

export const Sidebar = ({ 
  role = "creator", 
  activeSection, 
  onSection, 
  onNavigate, 
  isOpen = false,    
  onClose = null     
}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      setUserName(user.name);
    } else if (role === "creator") {
      setUserName("Tshepiso Malema");
    } else {
      setUserName("Bathu");
    }
  }, [role]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

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
  const badgeVariant = role === "creator" ? "pink" : "purple";
  const badgeLabel = role === "creator" ? "Creator" : "Brand";
  const hasRing = currentUser?.verified || role === "creator";

  const handleLinkClick = (linkId) => {
    onSection(linkId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop — rendered outside aside so it sits behind sidebar */}
      {isOpen && onClose && (
        <div
          onClick={onClose}
          style={{
            display: "none", // overridden by media query in global.css
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 49,
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              onClick={() => onNavigate("landing")}
            >
              <div
                className="gold-gradient"
                style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                <Icon name="sparkle" size={14} color="#0D0D0D" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18 }}>Cre8ta</span>
            </div>

            {/* Close button — mobile only */}
            {onClose && isOpen && (
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 8,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="x" size={18} color="var(--muted)" />
              </button>
            )}
          </div>
        </div>

        {/* Nav links */}
        <div style={{ padding: "12px 0", flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "4px 16px 8px", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {role === "creator" ? "Creator Hub" : "Brand Hub"}
          </div>

          {links.map((link) => (
            <div
              key={link.id}
              className={`sidebar-link ${activeSection === link.id ? "active" : ""}`}
              onClick={() => handleLinkClick(link.id)}
              style={{
                animation: "slideIn .3s ease both",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                margin: "2px 8px",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeSection === link.id ? "var(--gold)" : "transparent",
                color: activeSection === link.id ? "var(--ink)" : "var(--muted)",
                fontWeight: activeSection === link.id ? 600 : 500,
              }}
            >
              <Icon name={link.icon} size={16} color={activeSection === link.id ? "var(--ink)" : "var(--muted)"} />
              <span style={{ fontSize: 14 }}>{link.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: 16, borderTop: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Avatar
              name={userName}
              image={currentUser?.avatar}
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
            style={{ width: "100%", justifyContent: "center", gap: 6, padding: "8px 12px", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("cre8ta_current_user");
              onNavigate("landing");
            }}
          >
            <Icon name="logout" size={14} /> Log out
          </button>
        </div>
      </aside>
    </>
  );
};