import { useState, useEffect } from "react";
import { StatCard } from "../components/ui/StatCard";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser, mockAnalytics } from "../data/mockData";

export const AnalyticsSection = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    // Load analytics based on user
    if (user?.name === "Tshepiso Malema") {
      setAnalyticsData({
        reach: { value: "4.2M", delta: "+32%" },
        engagement: { value: "7.2%", delta: "+0.8%" },
        contentPieces: { value: "48", delta: "+12" },
        brandCollabs: { value: "15", delta: "+5" },
        weeklyData: [
          { week: "Week 1", views: 125000, engagement: 6.8, likes: 8900 },
          { week: "Week 2", views: 142000, engagement: 7.1, likes: 10200 },
          { week: "Week 3", views: 168000, engagement: 7.3, likes: 12100 },
          { week: "Week 4", views: 189000, engagement: 7.5, likes: 14200 }
        ],
        topContent: [
          { title: "Bathu 990v4 Styling", views: 245000, engagement: 8.2 },
          { title: "Soweto Street Style", views: 432000, engagement: 7.8 },
          { title: "Day in Joburg Vlog", views: 189000, engagement: 6.9 }
        ],
        demographics: {
          age: { "18-24": 35, "25-34": 45, "35-44": 15, "45+": 5 },
          location: { "Johannesburg": 40, "Pretoria": 25, "Cape Town": 20, "Durban": 10, "Other": 5 },
          gender: { "Female": 55, "Male": 42, "Other": 3 }
        }
      });
    } else if (user?.name === "Kgodiso Leboho") {
      setAnalyticsData({
        reach: { value: "2.8M", delta: "+45%" },
        engagement: { value: "8.1%", delta: "+1.2%" },
        contentPieces: { value: "32", delta: "+8" },
        brandCollabs: { value: "9", delta: "+3" },
        weeklyData: [
          { week: "Week 1", views: 78000, engagement: 7.2, likes: 5600 },
          { week: "Week 2", views: 92000, engagement: 7.8, likes: 7200 },
          { week: "Week 3", views: 115000, engagement: 8.1, likes: 9400 },
          { week: "Week 4", views: 142000, engagement: 8.4, likes: 11800 }
        ],
        topContent: [
          { title: "Pretoria Street Style", views: 178000, engagement: 8.5 },
          { title: "GalXBoy Unboxing", views: 267000, engagement: 7.9 },
          { title: "Day in Pretoria CBD", views: 312000, engagement: 8.2 }
        ],
        demographics: {
          age: { "18-24": 42, "25-34": 38, "35-44": 12, "45+": 8 },
          location: { "Pretoria": 45, "Johannesburg": 30, "Cape Town": 15, "Durban": 5, "Other": 5 },
          gender: { "Female": 62, "Male": 35, "Other": 3 }
        }
      });
    } else {
      setAnalyticsData({
        reach: { value: "0", delta: "0%" },
        engagement: { value: "0%", delta: "0%" },
        contentPieces: { value: "0", delta: "0" },
        brandCollabs: { value: "0", delta: "0" },
        weeklyData: [
          { week: "Week 1", views: 0, engagement: 0, likes: 0 },
          { week: "Week 2", views: 0, engagement: 0, likes: 0 },
          { week: "Week 3", views: 0, engagement: 0, likes: 0 },
          { week: "Week 4", views: 0, engagement: 0, likes: 0 }
        ],
        topContent: [],
        demographics: {
          age: { "18-24": 0, "25-34": 0, "35-44": 0, "45+": 0 },
          location: {},
          gender: { "Female": 0, "Male": 0, "Other": 0 }
        }
      });
    }
    
    setLoading(false);
  }, []);

  const renderBarChart = (data, color = "#FF006E") => {
    const maxValue = Math.max(...Object.values(data));
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 150 }}>
        {Object.entries(data).map(([label, value]) => (
          <div key={label} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ 
              height: `${(value / maxValue) * 120}px`, 
              background: `linear-gradient(180deg, ${color}, ${color}88)`,
              borderRadius: "8px 8px 4px 4px",
              transition: "height 0.3s ease",
              position: "relative",
              marginBottom: 8
            }}>
              <div style={{ 
                position: "absolute", 
                top: -20, 
                left: "50%", 
                transform: "translateX(-50%)",
                fontSize: 11,
                fontWeight: 600,
                color: color
              }}>
                {value}%
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderLineChart = () => {
    const data = analyticsData?.weeklyData || [];
    const maxViews = Math.max(...data.map(d => d.views), 1);
    
    return (
      <div style={{ position: "relative", paddingTop: 20 }}>
        <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ position: "absolute", top: 0, left: 0 }}>
          <polyline
            points={data.map((d, i) => `${(i / (data.length - 1)) * 400},${200 - (d.views / maxViews) * 150}`).join(" ")}
            fill="none"
            stroke="#FF006E"
            strokeWidth="2"
          />
          {data.map((d, i) => (
            <circle
              key={i}
              cx={(i / (data.length - 1)) * 400}
              cy={200 - (d.views / maxViews) * 150}
              r="4"
              fill="#FF006E"
            />
          ))}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 160, position: "relative", zIndex: 1 }}>
          {data.map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, color: "var(--muted)" }}>
              {d.week}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Analytics</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />
          ))}
        </div>
        <div className="skeleton" style={{ height: 300, borderRadius: 20 }} />
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800 }}>Analytics</h1>
        <div style={{ display: "flex", gap: 8 }}>
          {["weekly", "monthly", "yearly"].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`btn ${selectedPeriod === period ? "btn-gold" : "btn-ghost"} btn-sm`}
              style={{ textTransform: "capitalize" }}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Reach" value={analyticsData?.reach.value} delta={analyticsData?.reach.delta} icon="globe" color="#3A86FF" />
        <StatCard label="Avg Engagement" value={analyticsData?.engagement.value} delta={analyticsData?.engagement.delta} icon="trending" color="#10B981" />
        <StatCard label="Content Pieces" value={analyticsData?.contentPieces.value} delta={`+${analyticsData?.contentPieces.delta}`} icon="grid" color="#8B5CF6" />
        <StatCard label="Brand Collabs" value={analyticsData?.brandCollabs.value} delta={`+${analyticsData?.brandCollabs.delta}`} icon="briefcase" color="#FF006E" />
      </div>

      {/* Performance Chart */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Performance Overview</h3>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Views and engagement trends over time</p>
        </div>
        {renderLineChart()}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 20, gap: 20, flexWrap: "wrap" }}>
          {analyticsData?.weeklyData.map((week, i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#FF006E" }}>{week.views.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{week.week} Views</div>
              <div style={{ fontSize: 12, color: "#10B981", marginTop: 4 }}>↑ {week.engagement}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Content */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Top Performing Content</h3>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Your best performing posts this period</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {analyticsData?.topContent.map((content, i) => (
            <div key={i} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 16, 
              padding: 16, 
              background: "var(--surface)", 
              borderRadius: 12,
              border: "1px solid var(--border)"
            }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 8, 
                background: `linear-gradient(135deg, #FF006E, #8338EC)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20
              }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{content.title}</div>
                <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                  <span style={{ color: "var(--muted)" }}>👁️ {content.views.toLocaleString()} views</span>
                  <span style={{ color: "#10B981" }}>❤️ {content.engagement}% engagement</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="eye" size={14} /> View
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Demographics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Age Demographics */}
        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Age Demographics</h3>
            <p style={{ color: "var(--muted)", fontSize: 12 }}>Audience age distribution</p>
          </div>
          {renderBarChart(analyticsData?.demographics.age, "#3A86FF")}
        </div>

        {/* Location Demographics */}
        <div className="card">
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Top Locations</h3>
            <p style={{ color: "var(--muted)", fontSize: 12 }}>Where your audience is from</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(analyticsData?.demographics.location || {}).map(([city, percent]) => (
              <div key={city}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                  <span>{city}</span>
                  <span style={{ fontWeight: 600, color: "#FF006E" }}>{percent}%</span>
                </div>
                <div className="progress" style={{ height: 6 }}>
                  <div className="progress-bar" style={{ width: `${percent}%`, background: "linear-gradient(90deg, #FF006E, #8338EC)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gender Demographics */}
      <div className="card" style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>Gender Distribution</h3>
          <p style={{ color: "var(--muted)", fontSize: 12 }}>Audience gender breakdown</p>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(analyticsData?.demographics.gender || {}).map(([gender, percent]) => (
            <div key={gender} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ 
                width: 100, 
                height: 100, 
                margin: "0 auto",
                borderRadius: "50%",
                background: `conic-gradient(#FF006E 0deg ${percent * 3.6}deg, #E5E7EB ${percent * 3.6}deg 360deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12
              }}>
                <div style={{ background: "white", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#FF006E" }}>{percent}%</div>
                </div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{gender}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};