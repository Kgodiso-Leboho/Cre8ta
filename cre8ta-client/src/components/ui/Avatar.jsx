import { useState } from "react";
import { Icon } from "./Icon";

export const Avatar = ({ name, src, size = 40, ring, image }) => {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = image || src;
  
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#FF6B35", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899"];
  const colorIndex = name?.charCodeAt(0) % colors.length || 0;
  const bg = colors[colorIndex];
  
  if (avatarUrl && !imgError) {
    return (
      <div style={{
        width: size, 
        height: size, 
        borderRadius: "50%", 
        flexShrink: 0,
        border: ring ? "3px solid #FF6B35" : "none",
        overflow: "hidden",
        position: "relative",
        background: "#f0f0f0"
      }}>
        <img 
          src={avatarUrl} 
          alt={name} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            objectPosition: "center"
          }} 
          onError={() => setImgError(true)}
        />
      </div>
    );
  }
  
  // Fallback to initials with colored background
  return (
    <div style={{
      width: size, 
      height: size, 
      borderRadius: "50%", 
      background: bg,
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      fontSize: size * 0.35, 
      fontWeight: 700, 
      color: "white",
      fontFamily: "var(--font-display)", 
      flexShrink: 0,
      border: ring ? "3px solid #FF6B35" : "none"
    }}>
      {initials || <Icon name="user" size={size * 0.5} />}
    </div>
  );
};
