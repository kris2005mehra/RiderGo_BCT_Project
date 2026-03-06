import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, History, Bike, ArrowRight, Map, ShieldCheck 
} from 'lucide-react';

const styles = {
  container: { 
    minHeight: "100vh", 
    background: "#050505", 
    color: "#fff", 
    fontFamily: "'Inter', sans-serif",
    paddingBottom: "80px"
  },
  main: { 
    maxWidth: "1200px", 
    margin: "0 auto", 
    padding: "80px 5% 40px" // Added top padding since navbar is gone
  },
  
  // CENTERED HEADER SECTION
  headerSection: { 
    marginBottom: "60px", 
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  
  statsGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "25px", 
    marginBottom: "40px" 
  },
  statCard: {
    background: "linear-gradient(145deg, #111, #080808)",
    padding: "30px", 
    borderRadius: "24px", 
    border: "1px solid #1a1a1a",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "rgba(255, 215, 0, 0.05)",
    display: "grid",
    placeItems: "center"
  },
  rideCard: {
    background: "rgba(255, 215, 0, 0.02)", 
    borderRadius: "32px",
    border: "1px solid rgba(255, 215, 0, 0.1)", 
    padding: "60px 40px",
    textAlign: "center", 
    marginBottom: "40px",
    position: "relative",
    overflow: "hidden"
  },
  historyBox: { 
    background: "#0a0a0a", 
    borderRadius: "24px", 
    padding: "30px", 
    border: "1px solid #1a1a1a" 
  },
  historyRow: {
    display: "grid", 
    gridTemplateColumns: "auto 1fr auto auto",
    alignItems: "center", 
    gap: "20px", 
    padding: "20px 0", 
    borderBottom: "1px solid #1a1a1a"
  },
  btnPrimary: {
    background: "#FFD700", 
    color: "#000", 
    border: "none", 
    padding: "16px 40px",
    borderRadius: "14px", 
    fontWeight: "900", 
    cursor: "pointer", 
    display: "inline-flex",
    alignItems: "center", 
    gap: "10px", 
    fontSize: "16px",
    boxShadow: "0 10px 20px rgba(255, 215, 0, 0.15)"
  }
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        
        {/* CENTERED HEADER */}
        <section style={styles.headerSection}>
         
         
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={{ fontSize: "48px", fontWeight: "900", marginBottom: "15px", letterSpacing: "-1px" }}
          >
            Hey Rider, <span style={{ color: "#FFD700" }}>Your Status</span>
          </motion.h1>
          <p style={{ color: "#888", fontSize: "18px", maxWidth: "600px", lineHeight: "1.6" }}>
            You've saved 12kg of CO2 this month by riding electric! ♻️
          </p>
        </section>

        {/* STATS */}
        <div style={styles.statsGrid}>
          {[
            { label: "Wallet Balance", val: "₹540.00", icon: Wallet },
            { label: "Safety Score", val: "98/100", icon: ShieldCheck },
            { label: "Total Distance", val: "124 km", icon: Map },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={styles.statCard}
            >
              <div style={styles.iconBox}><stat.icon size={24} color="#FFD700" /></div>
              <div>
                <div style={{ color: "#666", fontSize: "13px", fontWeight: "600", textTransform: "uppercase" }}>{stat.label}</div>
                <div style={{ fontSize: "24px", fontWeight: "900", marginTop: "4px" }}>{stat.val}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* READY TO RIDE CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          style={styles.rideCard}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "15px" }}>Ready for a ride?</h2>
            <p style={{ color: "#888", marginBottom: "35px", maxWidth: "500px", margin: "0 auto 35px", fontSize: "16px" }}>
              The streets are waiting. Pick a machine from our premium fleet and start your journey now.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, background: "#fff" }} 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/booking')} 
              style={styles.btnPrimary}
            >
              Book Your Ride <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* RECENT TRIPS */}
        <div style={styles.historyBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "800", display: "flex", alignItems: "center", gap: "12px" }}>
              <History size={24} color="#FFD700" /> Recent Trips
            </h2>
            <span style={{ color: "#444", fontSize: "12px", fontWeight: "800", cursor: "pointer", letterSpacing: "1px" }}>VIEW ALL ACTIVITY</span>
          </div>

          {[
            { name: "KTM Duke 390", date: "24 Oct, 02:30 PM", price: "₹450", status: "Completed" },
            { name: "Volt-X 500", date: "21 Oct, 10:15 AM", price: "₹120", status: "Completed" },
          ].map((trip, i) => (
            <div key={i} style={styles.historyRow}>
              <div style={{ width: "45px", height: "45px", background: "#151515", borderRadius: "12px", display: "grid", placeItems: "center" }}>
                <Bike size={20} color="#FFD700" />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "16px" }}>{trip.name}</div>
                <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{trip.date}</div>
              </div>
              <div style={{ fontWeight: "800", color: "#fff", fontSize: "16px" }}>{trip.price}</div>
              <div style={{ color: "#4ade80", background: "rgba(74, 222, 128, 0.1)", padding: "5px 15px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>{trip.status}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}