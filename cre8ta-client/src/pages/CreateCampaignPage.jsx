import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Icon } from "../components/ui/Icon";

export const CreateCampaignPage = ({ onSection }) => {
  const [form, setForm] = useState({ title: "", budget: "", description: "", requirements: "", platform: "", category: "", deadline: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const e = {};
    if (!form.title) e.title = "Title is required";
    if (!form.budget) e.budget = "Budget is required";
    if (!form.description) e.description = "Description is required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", animation: "scaleIn .4s ease" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(245,200,66,.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Icon name="check" size={32} color="var(--gold-dark)" />
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Campaign Created!</h2>
      <p style={{ color: "var(--muted)", marginBottom: 28, textAlign: "center", maxWidth: 360 }}>Your campaign is now live on the marketplace. Creators can start applying immediately.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Button variant="gold" onClick={() => onSection("campaigns")}>View Campaigns</Button>
        <Button variant="ghost" onClick={() => setSubmitted(false)}>Create Another</Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, animation: "fadeUp .4s ease" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Create a Campaign</h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>Fill in the details to publish your campaign to thousands of creators.</p>
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Input label="Campaign Title" placeholder="e.g. Summer Lookbook 2025" value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))} error={errors.title} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Input label="Budget Range (USD)" placeholder="e.g. $2,000–$5,000" value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} error={errors.budget} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Platform</label>
            <select className="input" value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}>
              <option value="">Select platform</option>
              {["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Multi-Platform"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Category</label>
            <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              <option value="">Select category</option>
              {["Fashion", "Tech", "Health", "Food", "Travel", "Music", "Fitness", "Beauty"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Application Deadline" type="date" value={form.deadline}
            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
        </div>
        <Input label="Campaign Description" placeholder="Describe what the campaign is about, your brand vision, and what you're looking for from creators..." value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))} error={errors.description} rows={4} />
        <Input label="Requirements" placeholder="List your requirements, one per line (e.g. 50K+ followers, Fashion niche, 3 posts)" value={form.requirements}
          onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} rows={3} />
        <div style={{ padding: 16, background: "rgba(245,200,66,.08)", border: "1px solid rgba(245,200,66,.3)", borderRadius: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Icon name="zap" size={16} color="var(--gold-dark)" />
          <div style={{ fontSize: 13, color: "var(--gold-dark)" }}>
            <strong>AI Tip:</strong> Campaigns with detailed briefs get 3x more quality applications. Include your brand tone, example content, and specific deliverables.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
          <Button variant="gold" onClick={handleSubmit} disabled={loading} style={{ justifyContent: "center", flex: 1 }}>
            {loading ? <><Icon name="loader" size={16} /> Publishing...</> : <><Icon name="check" size={16} /> Publish Campaign</>}
          </Button>
          <Button variant="ghost" onClick={() => onSection("brand-overview")}>Cancel</Button>
        </div>
      </div>
    </div>
  );
};