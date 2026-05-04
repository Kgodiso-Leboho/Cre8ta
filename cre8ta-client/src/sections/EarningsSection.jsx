import { useState, useEffect } from "react";
import { StatCard } from "../components/ui/StatCard";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { Icon } from "../components/ui/Icon";
import { getCurrentUser } from "../data/mockData";

export const EarningsSection = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [earningsData, setEarningsData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    loadEarningsData(user);
    setLoading(false);
  }, []);

  const loadEarningsData = (user) => {
    if (user?.name === "Tshepiso Malema") {
      setEarningsData({
        totalEarned: { value: "R12,450", delta: "+18.2%" },
        thisMonth: { value: "R3,800", delta: "+24%" },
        pending: { value: "R2,200", icon: "zap", color: "#8B5CF6" },
        withdrawn: { value: "R7,250", icon: "check", color: "#10B981" }
      });
      setTransactions([
        { brand: "Bathu", amount: "+R18,000", date: "Nov 15, 2025", status: "paid", campaign: "Summer Drop Campaign" },
        { brand: "GalXBoy", amount: "+R14,000", date: "Nov 5, 2025", status: "paid", campaign: "Heritage Collection" },
        { brand: "Yangas", amount: "+R7,500", date: "Oct 28, 2025", status: "paid", campaign: "Everyday Comfort" },
        { brand: "Sketchy Souls", amount: "+R11,000", date: "Oct 15, 2025", status: "pending", campaign: "Custom Art Collab" },
        { brand: "MaXhosa Africa", amount: "+R40,000", date: "Nov 10, 2025", status: "pending", campaign: "Heritage Month" }
      ]);
    } else if (user?.name === "Kgodiso Leboho") {
      setEarningsData({
        totalEarned: { value: "R8,920", delta: "+32.5%" },
        thisMonth: { value: "R2,450", delta: "+45%" },
        pending: { value: "R1,500", icon: "zap", color: "#8B5CF6" },
        withdrawn: { value: "R4,970", icon: "check", color: "#10B981" }
      });
      setTransactions([
        { brand: "MaXhosa Africa", amount: "+R40,000", date: "Nov 10, 2025", status: "pending", campaign: "Heritage Campaign" },
        { brand: "Mzansi Fit", amount: "+R16,000", date: "Oct 30, 2025", status: "paid", campaign: "New Year Challenge" },
        { brand: "GalXBoy", amount: "+R14,000", date: "Oct 20, 2025", status: "paid", campaign: "Streetwear Drop" },
        { brand: "Yangas", amount: "+R5,500", date: "Sep 25, 2025", status: "paid", campaign: "Comfort Collection" }
      ]);
    } else {
      setEarningsData({
        totalEarned: { value: "R0", delta: "0%" },
        thisMonth: { value: "R0", delta: "0%" },
        pending: { value: "R0", icon: "zap", color: "#8B5CF6" },
        withdrawn: { value: "R0", icon: "check", color: "#10B981" }
      });
      setTransactions([]);
    }
  };

  const getFilteredTransactions = () => {
    if (selectedPeriod === "all") return transactions;
    if (selectedPeriod === "pending") return transactions.filter(t => t.status === "pending");
    if (selectedPeriod === "paid") return transactions.filter(t => t.status === "paid");
    return transactions;
  };

  const getTotalByStatus = (status) => {
    return transactions
      .filter(t => t.status === status)
      .reduce((sum, t) => {
        const amount = parseInt(t.amount.replace('+R', '').replace(',', ''));
        return sum + amount;
      }, 0);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
  };

  if (loading) {
    return (
      <div style={{ animation: "fadeUp .4s ease" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Earnings</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton" style={{ height: 100, borderRadius: 16 }} />
          ))}
        </div>
        <div className="skeleton" style={{ height: 300, borderRadius: 20 }} />
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800 }}>Earnings</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <Badge variant="pink" icon="trending">
            Total: {earningsData?.totalEarned.value}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard 
          label="Total Earned" 
          value={earningsData?.totalEarned.value} 
          delta={earningsData?.totalEarned.delta} 
          icon="dollar" 
          color="#FF006E"
        />
        <StatCard 
          label="This Month" 
          value={earningsData?.thisMonth.value} 
          delta={earningsData?.thisMonth.delta} 
          icon="trending" 
          color="#10B981" 
        />
        <StatCard 
          label="Pending" 
          value={earningsData?.pending.value} 
          icon="zap" 
          color="#8B5CF6" 
        />
        <StatCard 
          label="Withdrawn" 
          value={earningsData?.withdrawn.value} 
          icon="check" 
          color="#3B82F6" 
        />
      </div>

      {/* Earnings Overview */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>Earnings Overview</h3>
          <p style={{ color: "var(--muted)", fontSize: 13 }}>Track your income and payment status</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20, marginBottom: 20 }}>
          <div style={{ textAlign: "center", padding: 16, background: "var(--surface)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#10B981" }}>
              {formatAmount(getTotalByStatus("paid"))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Total Received</div>
          </div>
          <div style={{ textAlign: "center", padding: 16, background: "var(--surface)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F59E0B" }}>
              {formatAmount(getTotalByStatus("pending"))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Pending Payment</div>
          </div>
          <div style={{ textAlign: "center", padding: 16, background: "var(--surface)", borderRadius: 12 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#FF006E" }}>
              {transactions.length}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Total Collaborations</div>
          </div>
        </div>
      </div>

      {/* Transaction Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedPeriod("all")}
          className={`btn ${selectedPeriod === "all" ? "btn-gold" : "btn-ghost"} btn-sm`}
        >
          All Transactions
        </button>
        <button
          onClick={() => setSelectedPeriod("paid")}
          className={`btn ${selectedPeriod === "paid" ? "btn-gold" : "btn-ghost"} btn-sm`}
        >
          <Icon name="check" size={14} /> Paid
        </button>
        <button
          onClick={() => setSelectedPeriod("pending")}
          className={`btn ${selectedPeriod === "pending" ? "btn-gold" : "btn-ghost"} btn-sm`}
        >
          <Icon name="zap" size={14} /> Pending
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
          Recent Transactions
        </h3>
        
        {getFilteredTransactions().length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Icon name="dollar" size={48} color="var(--muted)" />
            <p style={{ color: "var(--muted)", marginTop: 12 }}>No transactions found</p>
          </div>
        ) : (
          <>
            {getFilteredTransactions().map((t, i) => (
              <div 
                key={i} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 16, 
                  padding: "16px 0", 
                  borderBottom: i < getFilteredTransactions().length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,0,110,0.05)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <Avatar name={t.brand} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.brand}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.campaign}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{t.date}</div>
                </div>
                <Badge variant={t.status === "paid" ? "green" : "gold"}>
                  {t.status === "paid" ? "Completed" : "Processing"}
                </Badge>
                <div style={{ 
                  fontFamily: "var(--font-display)", 
                  fontWeight: 700, 
                  fontSize: 18, 
                  color: t.status === "paid" ? "#10B981" : "#F59E0B" 
                }}>
                  {t.amount}
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* Withdrawal Button */}
        {earningsData?.pending.value !== "R0" && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <Button variant="gold">
              <Icon name="dollar" size={16} /> Withdraw Available Funds
            </Button>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
              Minimum withdrawal: R500 | Processing time: 2-3 business days
            </p>
          </div>
        )}
      </div>

      {/* Earnings Tips */}
      {transactions.length === 0 && (
        <div className="card" style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(255,0,110,0.1), rgba(131,56,236,0.1))" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Icon name="sparkle" size={24} color="#FF006E" />
            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 4 }}>Start Earning Today!</h4>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                Browse campaigns in the marketplace and apply to start your first collaboration. 
                Top creators earn up to R50,000 per campaign!
              </p>
              <Button variant="gold" size="sm" style={{ marginTop: 12 }} onClick={() => onNavigate("marketplace")}>
                Browse Campaigns
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};