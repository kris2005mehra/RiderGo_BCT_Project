import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Gauge } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";

const vehicles = [
  { id: 1, name: "Volt-X 500", category: "Electric", price: "₹499/day", range: "120km", topSpeed: "85km/h", img: "/bike11.png", desc: "The future of urban mobility. Silent, powerful and smart." },
  { id: 2, name: "Neon Pulse", category: "Electric", price: "₹550/day", range: "140km", topSpeed: "95km/h", img: "/bike22.png", desc: "High-performance electric scooter with regenerative braking." },
  { id: 3, name: "Electric Bicycle", category: "Electric", price: "₹200/day", range: "50km", topSpeed: "80km/h", img: "/bike33.png", desc: "Military-grade battery tech for the long-distance commuter." },
  { id: 4, name: "KTM Duke", category: "Sport", price: "₹899/day", range: "350km", topSpeed: "160km/h", img: "/bike4.png", desc: "Aggressive styling meets raw 600cc combustion power." },
  { id: 5, name: "Yamaha Scooty", category: "Sport", price: "₹1200/day", range: "300km", topSpeed: "210km/h", img: "/bike5.png", desc: "Track-ready machine for those who live on the edge." },
  { id: 6, name: "Shadow R-1", category: "Sport", price: "₹950/day", range: "320km", topSpeed: "180km/h", img: "/bike6.png", desc: "Matte white-red finish with a screaming inline-four engine." },
  { id: 7, name: "Royal Enfield", category: "City", price: "₹399/day", range: "200km", topSpeed: "70km/h", img: "/bike7.png", desc: "Classic 1970s aesthetic packed with modern reliability." },
  { id: 8, name: "Jupiter Vista", category: "City", price: "₹750/day", range: "450km", topSpeed: "110km/h", img: "/bike8.png", desc: "Ergonomic design built for comfortable weekend getaways." },
  { id: 9, name: "Pulsar", category: "City", price: "₹450/day", range: "250km", topSpeed: "90km/h", img: "/bike9.png", desc: "Regulated performance for a smooth and safe ride in traffic." },
];

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const particleOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "#050505" } },
  particles: {
    number: { value: 70 },
    color: { value: "#FFD700" },
    links: { enable: true, color: "#FFD700", opacity: 0.2 },
    move: { enable: true, speed: 0.4 }
  },
  particles: {
    number: { value: 70, density: { enable: true, area: 800 } },
    color: { value: "#FFD700" },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: true, speed: 1, minimumValue: 0.2, sync: false }
    },
    shadow: { enable: true, color: "#FFD700", blur: 5 },
    size: { value: { min: 1, max: 3 } },
    links: { enable: true, distance: 150, color: "#FFD700", opacity: 0.2, width: 1 },
    move: { enable: true, speed: 0.4, direction: "none", outModes: { default: "out" }, random: true, straight: false }
  },
  detectRetina: true,
};

const styles = {
  container: { position: 'relative', width: '100%', minHeight: "100vh", color: "#fff", padding: "80px 5% 60px", fontFamily: 'sans-serif' },
  contentWrapper: { position: 'relative', zIndex: 10 },
  header: { textAlign: 'center', marginBottom: 50 },
  title: { fontSize: "52px", fontWeight: "900", marginBottom: 10 },
  subtitle: { color: "#888", fontSize: "18px" },
  tabContainer: { display: 'flex', justifyContent: 'center', gap: 12, marginTop: 30 },
  tab: { background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid #333", padding: "10px 22px", borderRadius: "30px", cursor: "pointer", transition: "0.3s" },
  activeTab: { background: "#FFD700", color: "#000", border: "1px solid #FFD700", padding: "10px 22px", borderRadius: "30px", cursor: "pointer", fontWeight: "700" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "35px", maxWidth: "1200px", margin: "0 auto" },
  card: { background: "rgba(15, 15, 15, 0.85)", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255, 215, 0, 0.15)", backdropFilter: "blur(15px)" },
  imgWrapper: { position: 'relative', height: '200px', background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bikeImg: { width: '80%', height: 'auto', objectFit: 'contain' },
  priceTag: { position: 'absolute', top: 15, right: 15, background: '#FFD700', color: '#000', padding: '4px 12px', borderRadius: '8px', fontWeight: '900', fontSize: '13px' },
  info: { padding: '20px' },
  categoryBadge: { color: "#FFD700", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" },
  bikeName: { fontSize: '22px', fontWeight: '900', color: '#fff', marginBottom: '10px' },
  bikeDesc: { color: '#777', fontSize: '13px', lineHeight: '1.5', height: '40px', overflow: 'hidden' },
  statsRow: { display: 'flex', justifyContent: 'space-between', margin: '15px 0', padding: '12px 0', borderTop: '1px solid #222', borderBottom: '1px solid #222' },
  stat: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#ccc' },
  bookBtn: { width: '100%', padding: '12px', background: '#FFD700', color: '#000', border: 'none', borderRadius: '10px', fontWeight: '900', fontSize: '15px', textTransform: 'uppercase', cursor: 'pointer', boxShadow: "0 4px 12px rgba(255, 215, 0, 0.2)" }
};

export default function Vehicles() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const filteredVehicles = filter === "All" 
    ? vehicles 
    : vehicles.filter(v => v.category === filter);

  return (
    <div style={styles.container}>
      <Particles 
        id="tsparticles"
        init={particlesInit} 
        options={particleOptions} 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      
      <div style={styles.contentWrapper}>
        <section style={styles.header}>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.title}>
            Our <span style={{ color: '#FFD700' }}>Fleet</span>
          </motion.h1>
          <p style={styles.subtitle}>Premium rides for every journey.</p>
          <div style={styles.tabContainer}>
            {["All", "Electric", "Sport", "City"].map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={filter === cat ? styles.activeTab : styles.tab}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        <div style={styles.grid}>
          <AnimatePresence mode='popLayout'>
            {filteredVehicles.map((bike) => (
              <motion.div 
                layout
                key={bike.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, borderColor: "rgba(255, 215, 0, 0.5)" }}
                style={styles.card}
              >
                <div style={styles.imgWrapper}>
                  <img src={bike.img} alt={bike.name} style={styles.bikeImg} />
                  <div style={styles.priceTag}>{bike.price}</div>
                </div>
                <div style={styles.info}>
                  <div style={styles.categoryBadge}>{bike.category}</div>
                  <h3 style={styles.bikeName}>{bike.name}</h3>
                  <p style={styles.bikeDesc}>{bike.desc}</p>
                  <div style={styles.statsRow}>
                    <div style={styles.stat}><Zap size={14} color="#FFD700"/> {bike.range}</div>
                    <div style={styles.stat}><Gauge size={14} color="#FFD700"/> {bike.topSpeed}</div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/booking')} 
                    style={styles.bookBtn}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}