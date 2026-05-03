export const Input = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  className = "", 
  rows 
}) => {
  // Use CSS custom properties from your theme for consistent colors
  const labelStyles = {
    fontSize: 13, 
    fontWeight: 500, 
    color: "var(--color-ink)" // Changed from --ink to --color-ink to match your CSS
  };
  
  const errorStyles = {
    fontSize: 12, 
    color: "#EF4444"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={labelStyles}>{label}</label>}
      
      {rows ? (
        <textarea
          className={`input ${error ? "error" : ""} ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      ) : (
        <input
          className={`input ${error ? "error" : ""} ${className}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};