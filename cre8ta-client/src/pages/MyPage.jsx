import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Icon } from "../components/ui/Icon";
import { Avatar } from "../components/ui/Avatar";

export const LandingPage = ({ onNavigate }) => {
  const features = [
    { icon: "zap", title: "Smart Matching", desc: "AI-powered pairing connects creators with brands that fit their niche and audience perfectly." },
    { icon: "dollar", title: "Seamless Monetization", desc: "Built-in payment infrastructure. Get paid instantly for campaigns you complete." },
    { icon: "target", title: "Campaign Tools", desc: "Create, track, and optimize campaigns with real-time analytics and performance dashboards." },
    { icon: "sparkle", title: "AI-Powered Creation", desc: "Caption generators, content ideas, and profile optimizers trained on top-performing content." },
    { icon: "globe", title: "Multi-Platform", desc: "Connect TikTok, YouTube, Instagram and more. Manage everything from one dashboard." },
    { icon: "trending", title: "Growth Analytics", desc: "Deep insights into your audience, engagement trends, and revenue performance." },
  ];
  const steps = [
    { n: "01", title: "Create your profile", desc: "Sign up as a creator or brand. Connect your social accounts and showcase your work." },
    { n: "02", title: "Match & Collaborate", desc: "Browse campaigns or let brands find you. Our AI recommends the best fits." },
    { n: "03", title: "Create & Get Paid", desc: "Execute campaigns with built-in tools, submit deliverables, and receive payment instantly." },
  ];
  const testimonials = [
    { name: "Zanele Dlamini", role: "Lifestyle Creator · 240K followers", text: "Cre8ta changed how I work with brands. I went from cold DMs to consistent monthly income in 60 days.", avatar: "ZD" },
    { name: "Marcus Liu", role: "Head of Partnerships · Zara Africa", text: "We found three incredible creators in under a week. The campaign ROI was 4x what we expected.", avatar: "ML" },
    { name: "Farai Mutasa", role: "Tech Creator · 180K followers", text: "The AI tools alone are worth it. The caption generator has saved me hours every single week.", avatar: "FM" },
  ];
  const platforms = ["TikTok", "YouTube", "Instagram", "Twitter", "LinkedIn", "Podcast"];
  
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ position: "relative", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "center", background: "var(--white)" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", zIndex: 0 }} className="hero-glow" />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", zIndex: 0, opacity: 0.6 }} className="hero-glow" />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", textAlign: "center", zIndex: 1, position: "relative" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,200,66,.12)", border: "1px solid rgba(245,200,66,.3)", borderRadius: 100, padding: "6px 14px", marginBottom: 32 }}>
            <Icon name="sparkle" size={14} color="var(--gold-dark)" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--gold-dark)" }}>The creator economy, reimagined</span>
          </div>
          <h1 className="fade-up-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px,8vw,88px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-2px", color: "var(--ink)", marginBottom: 24 }}>
            Where Creators<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              Meet Brands
              {/*<span style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 6, background: "var(--gold)", opacity: 0.5, borderRadius: 3 }} />*/}
            </span>
          </h1>
          <p className="fade-up-2" style={{ fontSize: "clamp(16px,2.5vw,20px)", color: "var(--muted)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.65 }}>
            Cre8ta is the premium platform connecting Africa's best content creators with world-class brands with AI tools, seamless payments, and zero friction.
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
            {[["12K+", "Creators"], ["800+", "Brands"], ["$2.4M+", "Paid Out"], ["94%", "Match Rate"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>{n}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform logos section */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap" }}>Works with</span>
          {platforms.map(p => (
            <span key={p} style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)", padding: "6px 16px", background: "var(--white)", borderRadius: 100, border: "1px solid var(--border)" }}>{p}</span>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge variant="gold" icon="zap">Features</Badge>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", marginTop: 16, marginBottom: 16 }}>
            Everything you need to grow
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 480, margin: "0 auto" }}>One platform for the entire creator-brand relationship cycle.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(245,200,66,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={f.icon} size={20} color="var(--gold-dark)" />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section style={{ background: "var(--ink)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <Badge variant="gold">How it works</Badge>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--white)", marginTop: 16 }}>
              Live in three steps
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 72, fontWeight: 900, color: "rgba(245,200,66,.1)", lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
                <div style={{ width: 40, height: 3, background: "var(--gold)", borderRadius: 2, marginBottom: 20 }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--white)", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge variant="gold" icon="star">Testimonials</Badge>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, letterSpacing: "-1.5px", marginTop: 16 }}>Loved by creators & brands</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, s) => <Icon key={s} name="star" size={14} color="var(--gold)" />)}
              </div>
              <p style={{ color: "var(--ink)", fontSize: 15, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={t.name} size={40} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section style={{ background: "var(--gold)", padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,.2) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--ink)", marginBottom: 20 }}>
            Ready to Cre8te?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(13,13,13,.65)", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
            Join thousands of creators and brands already building together.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" onClick={() => onNavigate("register")}>Start for Free</Button>
            <Button variant="ghost" size="lg" onClick={() => onNavigate("marketplace")} style={{ background: "rgba(255,255,255,.5)", borderColor: "rgba(13,13,13,.2)" }}>Browse Campaigns</Button>
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer style={{ background: "var(--ink)", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div className="gold-gradient" style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="sparkle" size={14} color="#0D0D0D" />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "white" }}>Cre8ta</span>
              </div>
              <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, lineHeight: 1.7 }}>The creator economy platform built for Africa's next generation.</p>
            </div>
            {[["Platform", ["Marketplace", "AI Tools", "Analytics", "Pricing"]],
              ["Creators", ["How it Works", "Success Stories", "Creator Fund", "Blog"]],
              ["Company", ["About", "Careers", "Press", "Contact"]]].map(([title, links]) => (
              <div key={title}>
                <div style={{ color: "white", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>{title}</div>
                {links.map(l => <div key={l} style={{ color: "rgba(255,255,255,.4)", fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color .15s" }}
                  onMouseEnter={e => e.target.style.color = "var(--gold)"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.4)"}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span style={{ color: "rgba(255,255,255,.3)", fontSize: 13 }}>© 2025 Cre8ta. All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["twitter", "instagram", "youtube"].map(s => (
                <div key={s} style={{ color: "rgba(255,255,255,.4)", cursor: "pointer", transition: "color .15s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.4)"}>
                  <Icon name={s} size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};