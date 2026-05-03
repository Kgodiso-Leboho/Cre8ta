export const Button = ({ children, variant = "primary", size = "", onClick, disabled, className = "", style: s }) => (
  <button
    className={`btn btn-${variant} btn-${size || "md"} ${className}`}
    onClick={onClick}
    disabled={disabled}
    style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer", ...s }}
  >
    {children}
  </button>
);