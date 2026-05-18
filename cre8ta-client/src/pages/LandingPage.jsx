import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { Avatar } from "../components/ui/Avatar";

export const LandingPage = ({ onNavigate }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    { icon: "zap", title: "Smart Matching", desc: "AI-powered pairing connects creators with brands that fit their niche and audience perfectly.", color: "#FF6B35", gradient: "linear-gradient(135deg, #FF6B35, #E85D04)" },
    { icon: "dollar", title: "Seamless Monetization", desc: "Built-in payment infrastructure. Get paid instantly for campaigns you complete.", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)" },
    { icon: "target", title: "Campaign Tools", desc: "Create, track, and optimize campaigns with real-time analytics and performance dashboards.", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #2563EB)" },
    { icon: "sparkle", title: "AI-Powered Creation", desc: "Caption generators, content ideas, and profile optimizers trained on top-performing content.", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)" },
    { icon: "globe", title: "Multi-Platform", desc: "Connect TikTok, YouTube, Instagram and more. Manage everything from one dashboard.", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #BE185D)" },
    { icon: "trending", title: "Growth Analytics", desc: "Deep insights into your audience, engagement trends, and revenue performance.", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0891B2)" },
  ];

  const steps = [
    { n: "01", title: "Create your profile", desc: "Sign up as a creator or brand. Connect your social accounts and showcase your work.", icon: "user" },
    { n: "02", title: "Match & Collaborate", desc: "Browse campaigns or let brands find you. Our AI recommends the best fits.", icon: "zap" },
    { n: "03", title: "Create & Get Paid", desc: "Execute campaigns with built-in tools, submit deliverables, and receive payment instantly.", icon: "dollar" },
  ];

  const testimonials = [
    {
      name: "Tshepiso Malema",
      handle: "@tshepiso_malema",
      content: "Went from 12K → 185K followers in 90 days. Posted every single day on Cre8ta and collaborated with top SA brands.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      metric: "+1400%",
      metricLabel: "Follower Growth"
    },
    {
      name: "Lesley Zibu",
      handle: "@lesley_zibu",
      content: "Cre8ta helped me land 5 brand deals in my first month. The AI tools save me hours of work every week.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      metric: "5 Deals",
      metricLabel: "In 30 Days"
    },
    {
      name: "Theo Baloyi",
      handle: "@bathu_sa",
      content: "We've found our best creators through Cre8ta. The match rate is unmatched in the SA market.",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
      metric: "R450K+",
      metricLabel: "Campaign Spend"
    }
  ];

  const platforms = ["TikTok", "YouTube", "Instagram", "Twitter", "LinkedIn", "Podcast"];
  const stats = [
    { value: "12K+", label: "Creators", icon: "users" },
    { value: "800+", label: "Brands", icon: "briefcase" },
    { value: "R2.4M+", label: "Paid Out", icon: "dollar" },
    { value: "94%", label: "Match Rate", icon: "trending" },
  ];

  

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ paddingTop: 64, overflowX: "hidden" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "center", background: "var(--white)" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", zIndex: 0 }} className="hero-glow" />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 0, opacity: 0.6 }} className="hero-glow" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", textAlign: "center", zIndex: 1, position: "relative" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,107,53,.12)", border: "1px solid rgba(255,107,53,.3)", borderRadius: 100, padding: "6px 14px", marginBottom: 32 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--gold-dark)" }}>South Africa's #1 Creator Platform</span>
          </div>
          <h1 className="fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,88px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-2px", color: "var(--ink)", marginBottom: 24 }}>
            Where Creators<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              Meet Brands
            </span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "var(--muted)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.65 }}>
            Cre8ta is the premium platform connecting South Africa's best content creators with world-class brands with AI tools, seamless payments, and zero friction.
          </p>
          <div className="fade-up-3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="gold" size="lg" onClick={() => onNavigate("register")}>
              <Icon name="sparkle" size={16} /> Join as Creator
            </Button>
            <Button variant="primary" size="lg" onClick={() => onNavigate("register")}>
              Hire Creators <Icon name="arrow" size={16} />
            </Button>
          </div>
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {stats.map((stat, idx) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge variant="gold" icon="zap">Features</Badge>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", marginTop: 16, marginBottom: 16 }}>
            Everything you need to grow
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>One platform for the entire creator-brand relationship cycle.</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          {features.map((f, i) => (
            <div 
              key={i} 
              className="card" 
              style={{ 
                animationDelay: `${i * 0.1}s`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: 16, 
                background: `linear-gradient(135deg, ${f.color}20, ${f.color}08)`,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                marginBottom: 20,
                transition: "all 0.3s ease"
              }}>
                <Icon name={f.icon} size={24} color={f.color} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              <div style={{ 
                marginTop: 20,
                width: 40,
                height: 2,
                background: f.gradient,
                borderRadius: 2,
                transition: "width 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.width = "60px"}
              onMouseLeave={e => e.currentTarget.style.width = "40px"} />
            </div>
          ))}
        </div>
      </section>

      {/* How it works section with animated timeline */}
      <section style={{ 
        background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)", 
        padding: "100px 24px", 
        position: "relative", 
        overflow: "hidden" 
      }}>
        <div style={{ 
          position: "absolute", 
          top: "20%", 
          right: "10%", 
          width: 400, 
          height: 400, 
          borderRadius: "50%", 
          background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite"
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Badge variant="gold" style={{ animation: "pulse 2s ease-in-out infinite" }}>How it works</Badge>
            <h2 style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "clamp(36px,5vw,52px)", 
              fontWeight: 800, 
              letterSpacing: "-1.5px", 
              color: "white", 
              marginTop: 20 
            }}>
              Get started in minutes
            </h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            {steps.map((s, i) => (
              <div 
                key={i} 
                className="fade-up"
                style={{ 
                  position: "relative",
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div style={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: "50%", 
                  background: "rgba(255,107,53,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  border: "2px solid rgba(255,107,53,0.3)"
                }}>
                  <Icon name={s.icon} size={32} color="var(--gold)" />
                </div>
                <div style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: 48, 
                  fontWeight: 900, 
                  color: "rgba(255,107,53,0.15)",
                  lineHeight: 1,
                  position: "absolute",
                  top: -20,
                  right: 20,
                  zIndex: 0
                }}>{s.n}</div>
                <div style={{ width: 50, height: 3, background: "var(--gold)", borderRadius: 2, marginBottom: 20 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{ padding: "80px 32px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 700, marginBottom: 16 }}>
              Trusted by South Africa's best creators
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 16 }}>
              Real stories from real creators who grew with Cre8ta
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <img src={t.image} alt={t.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--gold-dark)" }}>{t.handle}</div>
                  </div>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic", color: "var(--ink)" }}>
                  "{t.content}"
                </p>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{t.metricLabel}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "var(--gold-dark)" }}>{t.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax Effect */}
      <section style={{ 
        background: "linear-gradient(135deg, #FF6B35 0%, #E85D04 100%)", 
        padding: "100px 24px", 
        textAlign: "center", 
        position: "relative", 
        overflow: "hidden",
        transform: scrolled ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.5s ease"
      }}>
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)",
          pointerEvents: "none" 
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "clamp(36px,5vw,56px)", 
            fontWeight: 800, 
            letterSpacing: "-1.5px", 
            color: "var(--ink)", 
            marginBottom: 20,
            animation: "slideUp 0.6s ease"
          }}>
            Ready to Cre8te?
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: "rgba(13,13,13,.8)", 
            marginBottom: 40, 
            maxWidth: 500, 
            margin: "0 auto 40px",
            animation: "slideUp 0.6s ease 0.1s both"
          }}>
            Join thousands of creators and brands already building together.
          </p>
          <div style={{ 
            display: "flex", 
            gap: 16, 
            justifyContent: "center", 
            flexWrap: "wrap",
            animation: "slideUp 0.6s ease 0.2s both"
          }}>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => onNavigate("register")}
              style={{
                transform: "scale(1)",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Start for Free <Icon name="arrow" size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => onNavigate("marketplace")} 
              style={{ 
                background: "rgba(255,255,255,0.95)", 
                borderColor: "rgba(13,13,13,0.2)",
                transform: "scale(1)",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Browse Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--ink)", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div className="gold-gradient" style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s ease-in-out infinite" }}>
                  <Icon name="sparkle" size={16} color="#0D0D0D" />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "white" }}>Cre8ta</span>
              </div>
              <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, lineHeight: 1.7, maxWidth: 250 }}>
                The creator economy platform built for South Africa's next generation.
              </p>
            </div>
            {[
              ["Platform", ["Marketplace", "AI Tools", "Analytics", "Pricing"]],
              ["Creators", ["How it Works", "Success Stories", "Creator Fund", "Blog"]],
              ["Company", ["About", "Careers", "Press", "Contact"]]
            ].map(([title, links]) => (
              <div key={title}>
                <div style={{ color: "white", fontWeight: 700, fontSize: 14, marginBottom: 20, letterSpacing: "0.05em" }}>{title}</div>
                {links.map(l => (
                  <div 
                    key={l} 
                    style={{ 
                      color: "rgba(255,255,255,.45)", 
                      fontSize: 14, 
                      marginBottom: 12, 
                      cursor: "pointer", 
                      transition: "all 0.2s ease" 
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = "#FF6B35";
                      e.target.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = "rgba(255,255,255,.45)";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div style={{ 
            borderTop: "1px solid rgba(255,255,255,.1)", 
            paddingTop: 28, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            flexWrap: "wrap", 
            gap: 16 
          }}>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>© 2025 Cre8ta. All rights reserved.</span>
            <div style={{ display: "flex", gap: 20 }}>
              {["twitter", "instagram", "youtube", "github"].map(s => (
                <div 
                  key={s} 
                  style={{ 
                    color: "rgba(255,255,255,.45)", 
                    cursor: "pointer", 
                    transition: "all 0.2s ease",
                    padding: 8,
                    borderRadius: 8
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#FF6B35";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,.45)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon name={s} size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};