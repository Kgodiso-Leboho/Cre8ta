import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Icon } from "../components/ui/Icon";
import { mockUsers, mockBrands, getAllUsers, findUserByEmail, createUser } from "../data/mockData";

export const AuthPage = ({ mode = "login", onNavigate }) => {
  const [step, setStep] = useState(mode === "register" ? 0 : 1);
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(() => {
    // Initialize users from localStorage or use mock data
    const savedUsers = localStorage.getItem("cre8ta_users");
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
    // Convert mockUsers object to array
    const initialUsers = [
      {
        id: tshepisoUser.id,
        name: tshepisoUser.name,
        email: tshepisoUser.email,
        password: "password123",
        role: tshepisoUser.role,
        avatar: tshepisoUser.avatar,
        bio: tshepisoUser.bio,
        location: tshepisoUser.location,
        joinedDate: tshepisoUser.joinedDate,
        verified: tshepisoUser.verified,
        metrics: tshepisoUser.metrics,
        niches: tshepisoUser.niches,
        socialLinks: tshepisoUser.socialLinks
      },
      {
        id: lesleyUser.id,
        name: lesleyUser.name,
        email: lesleyUser.email,
        password: "password123",
        role: lesleyUser.role,
        avatar: lesleyUser.avatar,
        bio: lesleyUser.bio,
        location: lesleyUser.location,
        joinedDate: lesleyUser.joinedDate,
        verified: lesleyUser.verified,
        metrics: lesleyUser.metrics,
        niches: lesleyUser.niches,
        socialLinks: lesleyUser.socialLinks
      },
      {
        id: "brand_bathu",
        name: "Bathu",
        email: "collab@bathu.co.za",
        password: "brand123",
        role: "brand",
        avatar: "https://logo.clearbit.com/bathu.co.za",
        bio: "Premium South African sneaker brand.",
        location: "Johannesburg",
        joinedDate: "2024-01-15",
        verified: true,
        metrics: {
          activeCampaigns: 5,
          totalSpend: 45000,
          avgEngagement: 7.8,
          totalApplications: 124
        }
      },
      {
        id: "brand_galxboy",
        name: "GalXBoy",
        email: "partners@galxboy.com",
        password: "brand123",
        role: "brand",
        avatar: "https://logo.clearbit.com/galxboy.com",
        bio: "Urban streetwear brand from Soweto.",
        location: "Soweto",
        joinedDate: "2024-01-20",
        verified: true,
        metrics: {
          activeCampaigns: 3,
          totalSpend: 28000,
          avgEngagement: 8.2,
          totalApplications: 89
        }
      }
    ];
    localStorage.setItem("cre8ta_users", JSON.stringify(initialUsers));
    return initialUsers;
  });

  // Helper functions
  const findUser = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Store current user in localStorage
      localStorage.setItem("cre8ta_current_user", JSON.stringify(user));
      return user;
    }
    return null;
  };

  const findUserByEmailOnly = (email) => {
    return users.find(u => u.email === email);
  };

  const registerUser = (userData) => {
    // Check if email already exists
    if (findUserByEmailOnly(userData.email)) {
      throw new Error("Email already registered");
    }
    
    const newUser = {
      id: `${userData.role}_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      avatar: userData.role === "creator" 
        ? `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
        : "https://logo.clearbit.com/placeholder.com",
      bio: userData.role === "creator" 
        ? "New creator on Cre8ta platform" 
        : "New brand on Cre8ta platform",
      location: userData.role === "creator" ? "South Africa" : "",
      joinedDate: new Date().toISOString().split('T')[0],
      verified: false,
      metrics: userData.role === "creator" ? {
        followers: 0,
        engagement: 0,
        avgRate: 0,
        totalEarnings: 0,
        monthlyViews: 0,
        activeCampaigns: 0
      } : {
        activeCampaigns: 0,
        totalSpend: 0,
        avgEngagement: 0,
        totalApplications: 0
      }
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("cre8ta_users", JSON.stringify(updatedUsers));
    localStorage.setItem("cre8ta_current_user", JSON.stringify(newUser));
    return newUser;
  };

  const validate = () => {
    const e = {};
    if (step === 1 && !form.email) e.email = "Email is required";
    if (step === 1 && !form.password) e.password = "Password is required";
    if (step === 1 && form.password && form.password.length < 6) e.password = "Must be at least 6 characters";
    if (step === 1 && mode === "register" && !form.name) e.name = "Full name is required";
    if (step === 1 && mode === "register" && form.email && !isValidEmail(form.email)) e.email = "Invalid email format";
    return e;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = () => {
    const user = findUser(form.email, form.password);
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (user.role === "brand") {
          onNavigate("brand-dashboard");
        } else {
          onNavigate("creator-dashboard");
        }
      }, 800);
    } else {
      setErrors({ general: "Invalid email or password" });
    }
  };

  const handleRegister = () => {
    try {
      const newUser = registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: role
      });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (newUser.role === "brand") {
          onNavigate("brand-dashboard");
        } else {
          onNavigate("creator-dashboard");
        }
      }, 800);
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { 
      setErrors(e); 
      return; 
    }
    
    if (mode === "login") {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // Test credentials helper
  const fillTestCredentials = (userType) => {
    if (userType === "creator") {
      setForm({ name: "", email: "tshepiso@cre8ta.com", password: "password123" });
      setRole("creator");
    } else if (userType === "brand") {
      setForm({ name: "", email: "collab@bathu.co.za", password: "brand123" });
      setRole("brand");
    }
    setErrors({});
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", padding: "24px", paddingTop: 88 }}>
      <div style={{ width: "100%", maxWidth: 440, animation: "scaleIn .35s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 32 }} onClick={() => onNavigate("landing")}>
            <div className="gold-gradient" style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="sparkle" size={16} color="#0D0D0D" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22 }}>Cre8ta</span>
          </div>
          {step === 0 ? (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Who are you?</h1>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>Choose your role to personalize your experience.</p>
            </>
          ) : (
            <>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
                {mode === "login" ? "Welcome back" : `Join as ${role === "brand" ? "Brand" : "Creator"}`}
              </h1>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>
                {mode === "login" ? "Sign in to your Cre8ta account." : "Create your free account today."}
              </p>
            </>
          )}
        </div>

        <div className="card" style={{ padding: 32 }}>
          {step === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { id: "creator", icon: "camera", title: "I'm a Creator", desc: "Monetize your content and connect with brands." },
                { id: "brand", icon: "briefcase", title: "I'm a Brand", desc: "Discover creators and launch campaigns." },
              ].map(r => (
                <div key={r.id}
                  onClick={() => setRole(r.id)}
                  style={{
                    padding: 20, borderRadius: 12, border: `2px solid ${role === r.id ? "var(--gold)" : "var(--border)"}`,
                    cursor: "pointer", transition: "all .2s",
                    background: role === r.id ? "rgba(245,200,66,.07)" : "var(--white)"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: role === r.id ? "rgba(245,200,66,.2)" : "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={r.icon} size={20} color={role === r.id ? "var(--gold-dark)" : "var(--muted)"} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{r.title}</div>
                      <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>{r.desc}</div>
                    </div>
                    {role === r.id && (
                      <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon name="check" size={12} color="var(--ink)" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="gold" onClick={() => role && setStep(1)} disabled={!role} style={{ marginTop: 8, justifyContent: "center" }}>
                Continue <Icon name="arrow" size={16} />
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Show test credentials hint for login */}
              {mode === "login"}

              {mode === "register" && (
                <Input label="Full name" placeholder="e.g., Tshepiso Malema" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  error={errors.name} />
              )}
              <Input label="Email address" type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                error={errors.email} />
              <Input label="Password" type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                error={errors.password} />
              
              {/* Show general error */}
              {errors.general && (
                <div style={{ fontSize: 12, color: "#FF006E", textAlign: "center", padding: 8, background: "rgba(255,0,110,0.1)", borderRadius: 8 }}>
                  {errors.general}
                </div>
              )}

              {mode === "login" && (
                <div style={{ textAlign: "right", marginTop: -8 }}>
                  <span style={{ fontSize: 13, color: "var(--gold-dark)", cursor: "pointer", fontWeight: 500 }}>Forgot password?</span>
                </div>
              )}
              
              <Button variant="gold" onClick={handleSubmit} disabled={loading} style={{ justifyContent: "center", marginTop: 4 }}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="loader" size={16} color="var(--ink)" /> Processing...
                  </span>
                ) : mode === "login" ? "Sign in" : "Create account"}
              </Button>
              
              {mode === "register" && step === 1 && (
                <button onClick={() => setStep(0)} style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", textAlign: "center" }}>
                  ← Change role
                </button>
              )}
              
              <div style={{ textAlign: "center", paddingTop: 8, borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <span style={{ color: "var(--gold-dark)", fontWeight: 500, cursor: "pointer" }}
                  onClick={() => {
                    onNavigate(mode === "login" ? "register" : "login");
                    setStep(mode === "login" ? 0 : 1);
                    setRole("");
                    setForm({ name: "", email: "", password: "" });
                    setErrors({});
                  }}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};