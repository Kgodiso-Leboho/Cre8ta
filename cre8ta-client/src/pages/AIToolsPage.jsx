import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { Icon } from "../components/ui/Icon";

export const AIToolsPage = () => {
  const [activeTool, setActiveTool] = useState("caption");
  const [inputs, setInputs] = useState({ caption: "", idea: "", profile: "" });
  const [outputs, setOutputs] = useState({ caption: "", idea: "", profile: "" });
  const [loading, setLoading] = useState({});
  const [copied, setCopied] = useState({});

  const generate = (tool) => {
    if (!inputs[tool]) return;
    setLoading(l => ({ ...l, [tool]: true }));
    setOutputs(o => ({ ...o, [tool]: "" }));
    setTimeout(() => {
      const results = {
        caption: `✨ Stepping into the weekend like I own it — because I do. 💛\n\nThis look is giving everything I didn't know I needed this season. The colour, the cut, the confidence? Unmatched.\n\n📍 Cape Town, South Africa\n🛍️ @zaraofficial new arrivals\n\n#CapeTownCreator #AfricanFashion #OutfitOfTheDay #StyleInspo #FashionContent #ZaraPartner`,
        idea: `🎯 5 Content Ideas for Your Niche:\n\n1. "A Week in My Budget" — Track every rand you spend for 7 days and turn it into a TikTok series. Authenticity + money content = massive saves.\n\n2. "Get Ready With Me: Brand Meeting Edition" — Show your pre-campaign prep, email writing, and what you bring to brand calls.\n\n3. "The Ugly Truth About Creator Life" — An honest video about slow months, rejection emails, and bouncing back. This performs incredibly well.\n\n4. "Creator Tech Stack 2025" — Tools, apps, and gear you use for content creation. Great affiliate opportunity.\n\n5. "Day in Cape Town vs Johannesburg" — Cultural comparison content always outperforms. Easy collab opportunity too.`,
        profile: `📊 Profile Optimization Report\n\n✅ STRENGTHS:\n• Bio is clear and includes niche keywords\n• Profile photo is professional and high-contrast\n• Strong highlight covers\n\n⚠️ OPPORTUNITIES:\n• Add a link-in-bio tool (Linktree, Stan Store)\n• Your posting frequency dropped 40% last month — aim for 4x/week\n• Your Reels hook rate is 62% — industry leaders are at 80%+\n\n🚀 TOP RECOMMENDATION:\nPin 3 of your highest-performing posts to maximize new visitor conversion. Your "Day in My Life" video has 2.1M views — it should be the first thing people see.`,
      };
      setOutputs(o => ({ ...o, [tool]: results[tool] }));
      setLoading(l => ({ ...l, [tool]: false }));
    }, 2000);
  };

  const copyOutput = (tool) => {
    navigator.clipboard?.writeText(outputs[tool]);
    setCopied(c => ({ ...c, [tool]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [tool]: false })), 2000);
  };

  const tools = [
    { id: "caption", icon: "sparkle", label: "Caption Generator", placeholder: "Describe your post (e.g. outdoor fashion shoot, golden hour, Cape Town beach)...", inputLabel: "Post description" },
    { id: "idea", icon: "zap", label: "Content Ideas", placeholder: "What's your niche? (e.g. African fashion creator, 240K Instagram, targets Gen Z women)...", inputLabel: "Your niche & audience" },
    { id: "profile", icon: "user", label: "Profile Optimizer", placeholder: "Paste your bio or describe your current profile setup...", inputLabel: "Your profile details" },
  ];

  return (
    <div style={{ maxWidth: 800, animation: "fadeUp .4s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, rgba(245,200,66,.2), rgba(245,200,66,.05))", border: "1px solid rgba(245,200,66,.3)", borderRadius: 100, padding: "6px 14px", marginBottom: 12 }}>
          <Icon name="sparkle" size={14} color="var(--gold-dark)" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gold-dark)" }}>Powered by Cre8ta AI</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>AI Creator Tools</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>Your AI-powered toolkit for captions, ideas, and profile growth.</p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {tools.map(t => (
          <button key={t.id} onClick={() => setActiveTool(t.id)}
            className={`btn ${activeTool === t.id ? "btn-gold" : "btn-ghost"} btn-sm`}
            style={{ gap: 6 }}>
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        ))}
      </div>

      {tools.map(t => activeTool === t.id && (
        <div key={t.id} style={{ animation: "scaleIn .25s ease" }}>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245,200,66,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={t.icon} size={18} color="var(--gold-dark)" />
              </div>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>{t.label}</h2>
              </div>
            </div>
            <Input label={t.inputLabel} placeholder={t.placeholder} value={inputs[t.id]}
              onChange={e => setInputs(i => ({ ...i, [t.id]: e.target.value }))} rows={3} />
            <Button variant="gold" onClick={() => generate(t.id)} disabled={loading[t.id] || !inputs[t.id]}
              style={{ marginTop: 14, justifyContent: "center" }}>
              {loading[t.id] ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
                    <Icon name="loader" size={16} />
                  </span>
                  Generating...
                </span>
              ) : <><Icon name="sparkle" size={16} /> Generate</>}
            </Button>
          </div>

          {loading[t.id] && (
            <div className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Skeleton height={13} />
                <Skeleton height={13} width="85%" />
                <Skeleton height={13} width="70%" />
                <Skeleton height={13} width="90%" />
                <Skeleton height={13} width="60%" />
              </div>
            </div>
          )}

          {outputs[t.id] && !loading[t.id] && (
            <div className="card" style={{ animation: "scaleIn .3s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D" }}>Generated</span>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => copyOutput(t.id)} style={{ gap: 6 }}>
                  <Icon name={copied[t.id] ? "check" : "copy"} size={14} />
                  {copied[t.id] ? "Copied!" : "Copy"}
                </button>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 10, padding: 18, fontSize: 14, lineHeight: 1.85, whiteSpace: "pre-wrap", color: "var(--ink)" }}>
                {outputs[t.id]}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <Button variant="ghost" size="sm" onClick={() => generate(t.id)}>Regenerate</Button>
                <Button variant="ghost" size="sm">Save to Library</Button>
              </div>
            </div>
          )}

          {!outputs[t.id] && !loading[t.id] && (
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", border: "2px dashed var(--border)", background: "var(--surface)" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(245,200,66,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={t.icon} size={24} color="var(--gold-dark)" />
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14, textAlign: "center" }}>Fill in the details above and click Generate to see your AI-powered output.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};