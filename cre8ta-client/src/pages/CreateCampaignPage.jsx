import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser } from "../data/mockData";

export const CreateCampaignPage = ({ onSection }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({ 
    title: "", 
    budget: "", 
    description: "", 
    requirements: "", 
    platform: "", 
    category: "", 
    deadline: "" 
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleSubmit = () => {
    const e = {};
    if (!form.title) e.title = "Campaign title is required";
    if (!form.budget) e.budget = "Budget range is required";
    if (!form.description) e.description = "Campaign description is required";
    if (!form.platform) e.platform = "Please select a platform";
    if (!form.category) e.category = "Please select a category";
    if (!form.deadline) e.deadline = "Please set a deadline";
    
    if (Object.keys(e).length) { 
      setErrors(e); 
      return; 
    }
    
    setLoading(true);
    
    // Create campaign object
    const newCampaign = {
      id: `camp_${Date.now()}`,
      brand: currentUser?.name || "Your Brand",
      brandId: currentUser?.id,
      title: form.title,
      budget: form.budget,
      category: form.category,
      platform: form.platform,
      deadline: form.deadline,
      description: form.description,
      requirements: form.requirements.split('\n').filter(r => r.trim()),
      tags: form.category.toLowerCase().split(','),
      applications: 0,
      status: "active",
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    setTimeout(() => {
      try {
        // Get existing campaigns
        const existingCampaigns = localStorage.getItem("cre8ta_campaigns");
        let campaigns = [];
        
        if (existingCampaigns) {
          campaigns = JSON.parse(existingCampaigns);
        }
        
        // Add new campaign
        campaigns.push(newCampaign);
        
        // Save back to localStorage
        localStorage.setItem("cre8ta_campaigns", JSON.stringify(campaigns));
        
        // Also store in session for immediate display
        sessionStorage.setItem("last_created_campaign", JSON.stringify(newCampaign));
        
        setLoading(false);
        setSubmitted(true);
      } catch (error) {
        console.error("Error saving campaign:", error);
        setLoading(false);
        setErrors({ submit: "Failed to save campaign. Please try again." });
      }
    }, 1500);
  };

  if (submitted) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", animation: "scaleIn .4s ease" }}>
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, rgba(255,0,110,0.2), rgba(131,56,236,0.2))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Icon name="check" size={32} color="#FF006E" />
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Campaign Created! 🎉</h2>
      <p style={{ color: "var(--muted)", marginBottom: 28, textAlign: "center", maxWidth: 360 }}>
        Your campaign "{form.title}" is now live on the marketplace. Creators can start applying immediately.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="gold" onClick={() => onSection("campaigns")}>
          <Icon name="briefcase" size={16} /> View My Campaigns
        </Button>
        <Button variant="ghost" onClick={() => {
          setSubmitted(false);
          setForm({ title: "", budget: "", description: "", requirements: "", platform: "", category: "", deadline: "" });
        }}>
          <Icon name="plus" size={16} /> Create Another
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, animation: "fadeUp .4s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Create a Campaign</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          Fill in the details to publish your campaign to thousands of South African creators.
        </p>
      </div>
      
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Campaign Title */}
        <Input 
          label="Campaign Title" 
          placeholder="e.g., Bathu Summer Drop 2025" 
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
          error={errors.title} 
        />
        
        {/* Budget and Platform Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <Input 
            label="Budget Range (ZAR)" 
            placeholder="e.g., R15,000–R25,000" 
            value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} 
            error={errors.budget} 
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Platform</label>
            <select 
              className={`input ${errors.platform ? "error" : ""}`} 
              value={form.platform} 
              onChange={e => setForm(f => ({ ...f, platform: e.target.value }))}
            >
              <option value="">Select platform</option>
              {["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn", "Multi-Platform"].map(p => (
                <option key={p}>{p}</option>
              ))}
            </select>
            {errors.platform && <span style={{ fontSize: 12, color: "#FF006E" }}>{errors.platform}</span>}
          </div>
        </div>
        
        {/* Category and Deadline Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500 }}>Category</label>
            <select 
              className={`input ${errors.category ? "error" : ""}`} 
              value={form.category} 
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              <option value="">Select category</option>
              {["Fashion", "Streetwear", "Tech", "Health", "Food", "Travel", "Music", "Fitness", "Beauty", "Lifestyle"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.category && <span style={{ fontSize: 12, color: "#FF006E" }}>{errors.category}</span>}
          </div>
          <Input 
            label="Application Deadline" 
            type="date" 
            value={form.deadline}
            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
            error={errors.deadline} 
          />
        </div>
        
        {/* Campaign Description */}
        <Input 
          label="Campaign Description" 
          placeholder="Describe what the campaign is about, your brand vision, and what you're looking for from creators..." 
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
          error={errors.description} 
          rows={4} 
        />
        
        {/* Requirements */}
        <Input 
          label="Requirements (one per line)" 
          placeholder="Example:
50K+ followers
Fashion/Streetwear niche
3 Instagram posts + 5 stories
Must be based in SA" 
          value={form.requirements}
          onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} 
          rows={4} 
        />
        
        {/* AI Tip */}
        <div style={{ 
          padding: 16, 
          background: "linear-gradient(135deg, rgba(255,0,110,0.08), rgba(131,56,236,0.08))", 
          border: "1px solid rgba(255,0,110,0.2)", 
          borderRadius: 12, 
          display: "flex", 
          gap: 12, 
          alignItems: "flex-start" 
        }}>
          <Icon name="zap" size={20} color="#FF006E" />
          <div style={{ fontSize: 13, color: "#FF006E" }}>
            <strong>✨ AI Pro Tip:</strong> Campaigns with detailed briefs get 3x more quality applications. Include your brand tone, example content, and specific deliverables. Brands that add visual references receive 5x more applications!
          </div>
        </div>
        
        {/* Form Actions */}
        <div style={{ display: "flex", gap: 12, paddingTop: 8, flexWrap: "wrap" }}>
          <Button 
            variant="gold" 
            onClick={handleSubmit} 
            disabled={loading} 
            style={{ justifyContent: "center", flex: 1 }}
          >
            {loading ? (
              <>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
                  <Icon name="loader" size={16} />
                </span>
                {" Publishing..."}
              </>
            ) : (
              <>
                <Icon name="check" size={16} /> Publish Campaign
              </>
            )}
          </Button>
          <Button variant="ghost" onClick={() => onSection("brand-overview")}>
            Cancel
          </Button>
        </div>
        
        {/* Error message */}
        {errors.submit && (
          <div style={{ 
            padding: 12, 
            background: "rgba(255,0,110,0.1)", 
            borderRadius: 8, 
            color: "#FF006E", 
            fontSize: 13,
            textAlign: "center"
          }}>
            {errors.submit}
          </div>
        )}
      </div>
      
      {/* Preview Section (Optional) */}
      {form.title && form.description && (
        <div className="card" style={{ marginTop: 24, background: "linear-gradient(135deg, rgba(255,0,110,0.05), rgba(131,56,236,0.05))" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
            <Icon name="eye" size={16} /> Live Preview
          </h3>
          <div style={{ fontSize: 14 }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{form.title || "Campaign Title"}</div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>
              {form.budget || "Budget"} · {form.platform || "Platform"} · Due {form.deadline || "Date"}
            </div>
            <p style={{ fontSize: 13, color: "var(--ink)" }}>{form.description.substring(0, 150)}...</p>
          </div>
        </div>
      )}
    </div>
  );
};