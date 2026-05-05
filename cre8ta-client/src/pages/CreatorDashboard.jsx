import { useState, useEffect } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { Icon } from "../components/ui/Icon";
import { CreatorProfilePage } from "./CreatorProfilePage";
import { CampaignsList } from "../sections/CampaignsList";
import { MarketplacePage } from "./MarketplacePage";
import { AIToolsPage } from "./AIToolsPage";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { EarningsSection } from "../sections/EarningsSection";
import { getCurrentUser } from "../data/mockData";

export const CreatorDashboard = ({ section, onSection, onNavigate }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(true); // Keep sidebar open on desktop
      } else {
        setSidebarOpen(false); // Close sidebar on mobile by default
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getUserActivity = () => {
    if (currentUser?.name === "Tshepiso Malema") {
      return [
        { text: "Bathu approved your campaign application", time: "2 hours ago", icon: "check", color: "#10B981" },
        { text: "New message from GalXBoy Partnerships", time: "5 hours ago", icon: "bell", color: "var(--gold-dark)" },
        { text: "Your portfolio was viewed 156 times today", time: "1 day ago", icon: "eye", color: "#3B82F6" },
        { text: "Payment of R18,000 received from Bathu", time: "2 days ago", icon: "dollar", color: "#10B981" },
        { text: "New follower milestone: 185K", time: "3 days ago", icon: "users", color: "#EC4899" }
      ];
    } else if (currentUser?.name === "Lesley Zibu") {
      return [
        { text: "MaXhosa Africa shortlisted your application", time: "1 hour ago", icon: "check", color: "#10B981" },
        { text: "Your TikTok went viral! 432K views", time: "3 hours ago", icon: "trending", color: "#FF006E" },
        { text: "Yangas wants to collaborate", time: "1 day ago", icon: "briefcase", color: "#3B82F6" },
        { text: "GalXBoy campaign payment processed", time: "2 days ago", icon: "dollar", color: "#10B981" }
      ];
    }
    return [
      { text: "Welcome to Cre8ta! Complete your profile", time: "Just now", icon: "sparkle", color: "var(--gold-dark)" },
      { text: "Browse campaigns to get started", time: "Just now", icon: "search", color: "#3B82F6" }
    ];
  };

  const getUserMetrics = () => {
    if (currentUser?.name === "Tshepiso Malema") {
      return {
        totalEarnings: "R12,450",
        monthlyViews: "890K",
        activeCampaigns: "4",
        engagementRate: "7.2%",
        earningsDelta: "+18.2%",
        viewsDelta: "+24.1%",
        campaignsDelta: "+2",
        engagementDelta: "+0.8%"
      };
    } else if (currentUser?.name === "Lesley Zibu") {
      return {
        totalEarnings: "R8,920",
        monthlyViews: "650K",
        activeCampaigns: "3",
        engagementRate: "8.1%",
        earningsDelta: "+32.5%",
        viewsDelta: "+45.2%",
        campaignsDelta: "+1",
        engagementDelta: "+1.2%"
      };
    }
    return {
      totalEarnings: "R0",
      monthlyViews: "0",
      activeCampaigns: "0",
      engagementRate: "0%",
      earningsDelta: "0%",
      viewsDelta: "0%",
      campaignsDelta: "0",
      engagementDelta: "0%"
    };
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const metrics = getUserMetrics();
  const activity = getUserActivity();
  const greeting = getGreeting();
  const userName = currentUser?.name?.split(' ')[0] || "Creator";

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSectionChange = (newSection) => {
    onSection(newSection);
    if (isMobile) {
      closeSidebar();
    }
  };

  const content = {
    overview: (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: 16,
          marginBottom: 28,
          alignItems: "flex-start"
        }}>
          <div style={{ width: "100%" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 5vw, 26px)", fontWeight: 800, marginBottom: 4 }}>
              {greeting}, {userName} 👋
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Here's what's happening with your creator account.
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={() => onSection("marketplace")}>
            <Icon name="grid" size={14} /> Browse Campaigns
          </Button>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
          gap: 16, 
          marginBottom: 28 
        }}>
          <StatCard label="Total Earnings" value={metrics.totalEarnings} delta={metrics.earningsDelta} icon="dollar" loading={loading} />
          <StatCard label="Monthly Views" value={metrics.monthlyViews} delta={metrics.viewsDelta} icon="eye" color="#3B82F6" loading={loading} />
          <StatCard label="Active Campaigns" value={metrics.activeCampaigns} delta={metrics.campaignsDelta} icon="briefcase" color="#8B5CF6" loading={loading} />
          <StatCard label="Engagement Rate" value={metrics.engagementRate} delta={metrics.engagementDelta} icon="trending" color="#10B981" loading={loading} />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Recent Activity</h3>
              <Badge variant="gold">{activity.length} new</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {loading ? [...Array(4)].map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <Skeleton width={36} height={36} radius={10} />
                  <div style={{ flex: 1 }}>
                    <Skeleton height={13} style={{ marginBottom: 6 }} />
                    <Skeleton width="30%" height={11} />
                  </div>
                </div>
              )) : activity.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: a.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={a.icon} size={15} color={a.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.5 }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Profile Strength</h3>
              <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--gold-dark)" }}>
                {currentUser?.name === "Tshepiso Malema" ? "85%" : currentUser?.name === "Lesley Zibu" ? "78%" : "45%"}
              </span>
            </div>
            <div className="progress" style={{ marginBottom: 24 }}>
              <div className="progress-bar" style={{ width: currentUser?.name === "Tshepiso Malema" ? "85%" : currentUser?.name === "Lesley Zibu" ? "78%" : "45%" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: "Add portfolio items", done: currentUser?.name === "Tshepiso Malema" || currentUser?.name === "Lesley Zibu" },
                { text: "Connect social accounts", done: currentUser?.name === "Tshepiso Malema" || currentUser?.name === "Lesley Zibu" },
                { text: "Set your niche & rates", done: currentUser?.name === "Tshepiso Malema" || currentUser?.name === "Lesley Zibu" },
                { text: "Upload profile video", done: currentUser?.name === "Tshepiso Malema" },
                { text: "Get 3 brand reviews", done: currentUser?.name === "Tshepiso Malema" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                  <div style={{ 
                    width: 20, height: 20, borderRadius: "50%", 
                    background: item.done ? "var(--gold)" : "var(--surface-2)", 
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 
                  }}>
                    {item.done && <Icon name="check" size={11} color="var(--ink)" />}
                  </div>
                  <span style={{ color: item.done ? "var(--ink)" : "var(--muted)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    profile: <CreatorProfilePage isOwner onNavigate={onNavigate} />,
    campaigns: <CampaignsList onNavigate={onNavigate} />,
    marketplace: <MarketplacePage onNavigate={onNavigate} />,
    "ai-tools": <AIToolsPage />,
    analytics: <AnalyticsSection />,
    earnings: <EarningsSection onNavigate={onNavigate} />
  };

  if (!currentUser) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div className="card" style={{ textAlign: "center", padding: "clamp(24px, 6vw, 48px)" }}>
          <Icon name="loader" size={48} color="var(--gold)" />
          <h2 style={{ marginTop: 20 }}>Loading your profile...</h2>
        </div>
      </div>
    );
  }

  return (
  <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface)", position: "relative" }}>
    {/* Mobile Menu Button */}
    {isMobile && (
      <button
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 1001,
          background: "var(--gold)",
          border: "none",
          borderRadius: "12px",
          width: "44px",
          height: "44px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
        aria-label="Menu"
      >
        <Icon name="menu" size={20} color="var(--ink)" />
      </button>
    )}

    {/* Overlay */}
    {isMobile && sidebarOpen && (
      <div
        onClick={closeSidebar}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
          animation: "fadeIn 0.3s ease",
        }}
      />
    )}

    {/* Sidebar */}
    <div
      style={{
        position: isMobile ? "fixed" : "sticky",
        top: 0,
        left: 0,
        height: "100vh",
        width: "280px",
        backgroundColor: "var(--surface)",
        borderRight: "1px solid var(--border)",
        transform: isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 1000,
        overflowY: "auto",
        flexShrink: 0,
      }}
      className={isMobile && sidebarOpen ? "sidebar open" : "sidebar"}
    >
      <Sidebar 
        role="creator" 
        activeSection={section} 
        onSection={handleSectionChange} 
        onNavigate={onNavigate}
        isMobile={isMobile}
        onClose={closeSidebar}
      />
    </div>

    {/* Main Content */}
    <main
      style={{
        flex: 1,
        padding: isMobile ? "clamp(16px, 4vw, 24px)" : "clamp(24px, 4vw, 40px)",
        width: "100%",
        minWidth: 0,
        marginTop: isMobile ? "60px" : "0",
        marginLeft: isMobile ? 0 : "0",
      }}
    >
      {content[section] || content.overview}
    </main>
    
    {/* Add animations */}
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  </div>
);
};