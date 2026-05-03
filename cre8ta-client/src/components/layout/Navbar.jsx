import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

export const Navbar = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className="nav" style={{ boxShadow: scrolled ? "var(--shadow-sm)" : "none" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
          <div className="gold-gradient" style={{ width: 32, height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="sparkle" size={16} color="#0D0D0D" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>Cre8ta</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("login")}>Log in</Button>
          <Button variant="gold" size="sm" onClick={() => onNavigate("register")}>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};