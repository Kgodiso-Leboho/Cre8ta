import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Icon } from "./ui/Icon";
import { Badge } from "./ui/Badge";
import { getCurrentUser } from "../data/mockData";

export const EditProfile = ({ onClose, onSave }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    email: "",
    website: "",
    niches: [],
    socialLinks: {
      instagram: "",
      tiktok: "",
      youtube: "",
      twitter: ""
    }
  });
  const [newNiche, setNewNiche] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        location: user.location || "",
        email: user.email || "",
        website: user.website || "",
        niches: user.niches || [],
        socialLinks: {
          instagram: user.socialLinks?.instagram || "",
          tiktok: user.socialLinks?.tiktok || "",
          youtube: user.socialLinks?.youtube || "",
          twitter: user.socialLinks?.twitter || ""
        }
      });
    }
    setLoading(false);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setSaving(true);
    
    try {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        email: formData.email,
        website: formData.website,
        niches: formData.niches,
        socialLinks: formData.socialLinks
      };
      
      // Update in localStorage
      const users = JSON.parse(localStorage.getItem("cre8ta_users") || "[]");
      const updatedUsers = users.map(user => 
        user.id === currentUser?.id ? updatedUser : user
      );
      localStorage.setItem("cre8ta_users", JSON.stringify(updatedUsers));
      localStorage.setItem("cre8ta_current_user", JSON.stringify(updatedUser));
      
      setSaving(false);
      if (onSave) onSave(updatedUser);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaving(false);
      alert("Failed to save profile. Please try again.");
    }
  };

  const addNiche = () => {
    if (newNiche.trim() && !formData.niches.includes(newNiche.trim())) {
      setFormData({
        ...formData,
        niches: [...formData.niches, newNiche.trim()]
      });
      setNewNiche("");
    }
  };

  const removeNiche = (nicheToRemove) => {
    setFormData({
      ...formData,
      niches: formData.niches.filter(niche => niche !== nicheToRemove)
    });
  };

  const updateSocialLink = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="modal" style={{ maxWidth: 500, margin: "auto" }}>
        <div style={{ padding: 40, textAlign: "center" }}>
          <div className="skeleton" style={{ width: "100%", height: 200, borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  const isCreator = currentUser?.role === "creator";

  return (
    <div className="modal" style={{ maxWidth: 550, width: "90%", margin: "auto", maxHeight: "85vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ 
        padding: "20px 24px", 
        borderBottom: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0
      }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, margin: 0 }}>
            Edit Profile
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 0 0" }}>
            Update your profile information
          </p>
        </div>
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
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-2)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <Icon name="x" size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "20px 24px",
        scrollbarWidth: "thin"
      }}>
        {/* Basic Information */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Basic Information
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input
              label="Full Name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Location"
              placeholder="e.g., Johannesburg, South Africa"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            {!isCreator && (
              <Input
                label="Website"
                placeholder="https://yourbrand.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            )}
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Bio
          </h3>
          <Input
            label="About You"
            placeholder={isCreator 
              ? "Tell brands about yourself, your content style, and what you love creating..." 
              : "Tell creators about your brand, mission, and what you're looking for..."}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
          />
        </div>

        {/* Niches (for creators) */}
        {isCreator && (
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
              Content Niches
            </h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input
                className="input"
                placeholder="Add a niche (e.g., Fashion, Tech)"
                value={newNiche}
                onChange={(e) => setNewNiche(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addNiche()}
                style={{ flex: 1 }}
              />
              <Button variant="gold" size="sm" onClick={addNiche}>
                <Icon name="plus" size={14} /> Add
              </Button>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {formData.niches.map((niche, idx) => (
                <Badge key={idx} variant="orange">
                  {niche}
                  <button
                    onClick={() => removeNiche(niche)}
                    style={{ 
                      background: "none", 
                      border: "none", 
                      cursor: "pointer", 
                      marginLeft: 6, 
                      padding: 0,
                      display: "inline-flex",
                      alignItems: "center"
                    }}
                  >
                    <Icon name="x" size={10} />
                  </button>
                </Badge>
              ))}
              {formData.niches.length === 0 && (
                <span style={{ color: "var(--muted)", fontSize: 13 }}>No niches added yet</span>
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Social Links
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, textAlign: "center" }}>
                <Icon name="instagram" size={18} color="#E1306C" />
              </div>
              <input
                className="input"
                placeholder="Instagram username"
                value={formData.socialLinks.instagram}
                onChange={(e) => updateSocialLink("instagram", e.target.value)}
                style={{ flex: 1, fontSize: 13 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, textAlign: "center" }}>
                <Icon name="tiktok" size={18} color="#010101" />
              </div>
              <input
                className="input"
                placeholder="TikTok username"
                value={formData.socialLinks.tiktok}
                onChange={(e) => updateSocialLink("tiktok", e.target.value)}
                style={{ flex: 1, fontSize: 13 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, textAlign: "center" }}>
                <Icon name="youtube" size={18} color="#FF0000" />
              </div>
              <input
                className="input"
                placeholder="YouTube channel URL or handle"
                value={formData.socialLinks.youtube}
                onChange={(e) => updateSocialLink("youtube", e.target.value)}
                style={{ flex: 1, fontSize: 13 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, textAlign: "center" }}>
                <Icon name="twitter" size={18} color="#1DA1F2" />
              </div>
              <input
                className="input"
                placeholder="Twitter/X username"
                value={formData.socialLinks.twitter}
                onChange={(e) => updateSocialLink("twitter", e.target.value)}
                style={{ flex: 1, fontSize: 13 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div style={{ 
        padding: "16px 24px", 
        borderTop: "1px solid var(--border)",
        display: "flex",
        gap: 12,
        justifyContent: "flex-end",
        flexShrink: 0,
        background: "var(--white)"
      }}>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gold" size="sm" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
                <Icon name="loader" size={14} />
              </span>
              {" Saving..."}
            </>
          ) : (
            <>
              <Icon name="check" size={14} /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};