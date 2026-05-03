export const Avatar = ({ name, src, size = 40, ring }) => {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#F5C842", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B"];
  const bg = colors[name?.charCodeAt(0) % colors.length] || colors[0];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: src ? "transparent" : bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color: "var(--ink)",
      fontFamily: "var(--font-display)", flexShrink: 0,
      border: ring ? "3px solid var(--gold)" : "none",
      overflow: "hidden"
    }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
};