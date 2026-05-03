import { Icon } from './Icon';

export const StatCard = ({ label, value, delta, icon, color = "var(--gold)", loading }) => (
  <div className="card" style={{ padding: 20 }}>
    {loading ? (
      <>
        <div className="skeleton" style={{ height: 16, width: "60%", marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 32, width: "40%" }} />
      </>
    ) : (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={icon} size={16} color={color} />
          </div>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)" }}>{value}</div>
        {delta && (
          <div style={{ fontSize: 12, color: delta.startsWith("+") ? "#15803D" : "#DC2626", marginTop: 6, fontWeight: 500 }}>
            {delta} vs last month
          </div>
        )}
      </>
    )}
  </div>
);