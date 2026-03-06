import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useNavigate } from 'react-router-dom';
import { loadSlim } from "@tsparticles/slim";
import { 
  ChevronLeft, ChevronRight, ShieldCheck, 
  Zap, MapPin, Star, Quote, Mail, Instagram, Twitter 
} from "lucide-react";

export default function Home() {
  const [init, setInit] = useState(false); 
  const [index, setIndex] = useState(0);
  const bikes = ["/bike1.png", "/bike2.png", "/bike3.png"];
  const navigate = useNavigate();

  const cities = [
    { name: "Kolkata", img: "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80" },
    { name: "Mumbai", img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80" },
    { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80" }
  ];

  // Particle Initialization
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % bikes.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + bikes.length) % bikes.length);

  useEffect(() => {
    const t = setInterval(nextSlide, 6000);
    return () => clearInterval(t);
  }, [index]);

  function ReviewCard({ img, name, txt }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      style={styles.reviewCard}
    >
      {/* 1. Full rectangular image at the top */}
      <div style={styles.imageContainer}>
        <img src={img} style={styles.portrait} alt={name} />
      </div>

      {/* 2. Content area below the image */}
      <div style={styles.reviewContent}>
        <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
          {/* 5 Star Rating */}
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
          ))}
        </div>
        <span style={styles.reviewerName}>{name}</span>
        <p style={styles.reviewText}>"{txt}"</p>
      </div>
    </motion.div>
  );
}

  return (
    <div style={styles.page}>
      {/* 3D INTERACTIVE PARTICLE BACKGROUND */}
      {init && (
        <Particles
          id="tsparticles"
          options={particleOptions}
        />
      )}

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          style={{ maxWidth: 550, zIndex: 10 }}
        >
          <h1 style={styles.title}>Ride Smart with <span style={{color:"#fff"}}>RiderGo</span></h1>
          <p style={styles.sub}>Compare bikes and scooters instantly. The fastest way to move across the city at the best guaranteed price.</p>
          <div style={{display:'flex', gap:15}}>
            <motion.button 
  onClick={() => navigate('/booking')} 
  whileHover={{ 
    scale: 1.05, 
    boxShadow: "0 0 25px rgba(255, 215, 0, 0.6)" 
  }} 
  whileTap={{ scale: 0.95 }} 
  style={styles.btn}
>
  Book Your Ride
</motion.button>
            <motion.button whileHover={{ backgroundColor: "rgba(255,215,0,0.1)" }} style={styles.btnOutline}>Explore</motion.button>
          </div>
        </motion.div>

        {/* TRIPLE IMAGE SLIDER */}
        <div style={styles.sliderWrapper}>
          <button onClick={prevSlide} style={styles.arrowBtn}><ChevronLeft color="#FFD700" size={30}/></button>
          
          <div style={styles.sliderTrack}>
            <img src={bikes[(index - 1 + bikes.length) % bikes.length]} style={styles.sideBike} alt="prev" />
            <AnimatePresence mode="wait">
      <motion.img
        key={index}
        src={bikes[index]}
        style={styles.mainBike}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </AnimatePresence>
            <img src={bikes[(index + 1) % bikes.length]} style={styles.sideBike} alt="next" />
          </div>

          <button onClick={nextSlide} style={styles.arrowBtn}><ChevronRight color="#FFD700" size={30}/></button>
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Features Section */}
        <section style={styles.section}>
  <motion.h1
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    style={styles.sectionTitle}
  >
    Why Choose Us?
  </motion.h1>

  <div style={styles.grid}>
    <FeatureCard 
      index={0}
      icon={<Zap size={32} color="#FFD700"/>} 
      t="Instant Booking" 
      d="Experience lightning-fast confirmation. Get your ride ready in under 10 seconds with our optimized matching engine."
    />
    <FeatureCard 
      index={1}
      icon={<ShieldCheck size={32} color="#FFD700"/>} 
      t="Verified Riders" 
      d="Your safety is our priority. Every pilot undergoes rigorous background checks and professional training."
    />
    <FeatureCard 
      index={2}
      icon={<MapPin size={32} color="#FFD700"/>} 
      t="Live Tracking" 
      d="Stay informed with millisecond-accurate GPS tracking. Share your live location with loved ones instantly."
    />
  </div>
</section>

        {/* Cities Section */}
        <section style={styles.sectionDark}>
          <h1 style={styles.sectionTitle}>Available Cities</h1>
          <div style={styles.grid}>
            {cities.map((city, i) => (
              <motion.div 
                key={i} 
                style={{...styles.cityCard, backgroundImage: `url(${city.img})`}}
                whileHover={{ scale: 1.05, rotateY: 10, boxShadow: "0 0 20px #FFD700" }}
              >
                <div style={styles.cityOverlay}>
                  <MapPin size={18} color="#FFD700" />
                  <span>{city.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
<section style={styles.section}>
  <div style={{ marginBottom: 60 }}>
    <motion.span 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      style={{ color: "#FFD700", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", fontSize: "14px" }}
    >
      Testimonials
    </motion.span>
    <motion.h1 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      style={{ ...styles.sectionTitle, marginTop: 10, marginBottom: 0 }}
    >
      Our Happy Riders
    </motion.h1>
  </div>

  <div style={styles.grid}>
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <ReviewCard 
        img="/user1.png" 
        name="Aman Gupta" 
        location="Kolkata"
        txt="Best bike rental ever! The booking process was seamless and the bike was in pristine condition." 
      />
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <ReviewCard 
        img="/user2.png" 
        name="Riya Sharma" 
        location="Delhi"
        txt="Incredibly reliable and affordable. These EV bikes are perfect for beating the Delhi traffic." 
      />
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
    >
      <ReviewCard 
        img="/user3.png" 
        name="Rahul Singh" 
        location="Bangalore"
        txt="RiderGo is a lifesaver. I've saved so much time on my daily commute. Highly recommended!" 
      />
    </motion.div>
  </div>
</section>

        {/* Footer */}
       <footer style={styles.footer}>
  <div style={styles.footerGlow}></div>

  <div style={styles.footerContent}>
    <div style={{ flex: 2 }}>
      <h2 style={{ color: "#FFD700", marginBottom: 15, fontSize: '28px', fontWeight: '900' }}>RiderGo</h2>
      <p style={{ color: "#888", lineHeight: '1.6', maxWidth: '300px' }}>Fast • Safe • Affordable mobility. Let's make every ride better.</p>
      <div style={{ display: 'flex', gap: 15, marginTop: 25 }}>
        <Instagram color="#FFD700" style={styles.iconHover} />
        <Twitter color="#FFD700" style={styles.iconHover} />
        <Mail color="#FFD700" style={styles.iconHover} />
      </div>
    </div>

    <div style={{ flex: 1 }}>
      <h4 style={styles.footerHead}>Company</h4>
      <ul style={styles.footerList}>
        <li style={styles.footerListItem}>About Us</li>
        <li style={styles.footerListItem}>Careers</li>
        <li style={styles.footerListItem}>Terms & Privacy</li>
      </ul>
    </div>

    <div style={{ flex: 1.5 }}>
      <h4 style={styles.footerHead}>Newsletter</h4>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "15px" }}>Get the latest updates on your rides.</p>
      <div style={styles.inputContainer}>
        <input type="email" placeholder="Email Address" style={styles.input} />
        <button style={styles.miniBtn}>Join</button>
      </div>
    </div>
  </div>

  <div style={styles.footerBottom}>
    <div style={styles.divider}></div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
      <p style={styles.copyright}>© 2026 RiderGo. All Rights Reserved.</p>
      <p style={{ ...styles.copyright, opacity: 0.5 }}>Designed for the modern rider by Kris Mehra</p>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}

/* SUB-COMPONENTS */
function FeatureCard({ icon, t, d, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
      style={styles.card}
    >
      <div style={styles.cardGlow}></div>
      
      <div style={styles.iconContainer}>{icon}</div>
      <h3 style={styles.cardTitle}>{t}</h3>
      <p style={styles.cardDesc}>{d}</p>
      
      {/* Bottom accent line */}
      <div style={styles.cardAccent}></div>
    </motion.div>
  );
}

function ReviewCard({ img, name, txt }) {
  return (
    <motion.div 
      whileHover={{ 
        y: -10, 
        borderColor: "rgba(255, 215, 0, 1)",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.2)" 
      }}
      style={styles.reviewCard}
    >
      <div style={styles.imageContainer}>
        <img src={img} style={styles.portrait} alt={name} />
      </div>

      <div style={styles.reviewContent}>
        <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
          ))}
        </div>
        <span style={styles.reviewerName}>{name}</span>
        <p style={styles.reviewText}>"{txt}"</p>
      </div>
    </motion.div>
  );
}

/* 3D PARTICLE CONFIGURATION */
const particleOptions = {
  fullScreen: { 
    enable: true, 
    zIndex: -1 
  },
  background: {
    color: { value: "#050505" }, 
  },
  fpsLimit: 120,
  // INTERACTIVITY DISABLED
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
      resize: true,
    }
  },
  particles: {
    number: { 
      value: 90, 
      density: { enable: true, area: 800 } 
    },
    color: { value: "#FFD700" }, 
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.5, max: 0.9 }, 
      animation: { 
        enable: true, 
        speed: 1, 
        minimumValue: 0.4, 
        sync: false 
      }
    },
    
    shadow: {
      enable: true,
      color: "#FFD700",
      blur: 10 
    },
    size: { 
      value: { min: 1.5, max: 3.5 } 
    },
    links: {
      enable: true,
      distance: 160,
      color: "#FFD700",
      opacity: 0.35,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none", 
      outModes: { default: "out" },
      random: true,
      straight: false
    }
  },
  detectRetina: true,
};

/* STYLES */
const styles = {
  sectionTitle: { 
  fontSize: "52px", 
  fontWeight: "900", 
  color: "#FFD700", 
  textAlign: "center",
  textShadow: "0 10px 20px rgba(0,0,0,0.3)" 
},
  section: { padding: "120px 80px", textAlign: "center" },
  sectionTitle: { 
    fontSize: 48, 
    fontWeight: 900, 
    marginBottom: 80, 
    color: "#FFD700",
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  grid: { 
    display: "flex", 
    gap: 30, 
    flexWrap: "wrap", 
    justifyContent: "center" 
  },
  card: { 
    background: "rgba(255, 215, 0, 0.03)", 
    padding: "50px 35px", 
    width: "320px", 
    borderRadius: "28px", 
    border: "1px solid rgba(255, 215, 0, 0.1)", 
    textAlign: 'left',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: "blur(10px)",
    display: 'flex',
    flexDirection: 'column',
    transition: 'border 0.3s ease'
  },
  cardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  iconContainer: {
    background: 'rgba(255,215,0,0.1)',
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '25px',
    border: '1px solid rgba(255,215,0,0.2)'
  },
  cardTitle: { 
    fontSize: '22px', 
    fontWeight: '700', 
    marginBottom: '15px', 
    color: '#fff' 
  },
  cardDesc: { 
    color: "#999", 
    fontSize: '15px', 
    lineHeight: '1.6',
    margin: 0 
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: '80%',
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
    opacity: 0.5
  },
  page: { background: "transparent", color: "#fff", fontFamily: "'Inter', sans-serif", overflowX: "hidden", position: 'relative' },
  hero: { minHeight: "100vh", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 100px", gap: 30, position: "relative", zIndex: 1 },
  title: { fontSize: 72, fontWeight: 900, lineHeight: 1.1, color: "#FFD700", textShadow: "0 10px 30px rgba(0,0,0,0.5)" },
  sub: { color: "#aaa", fontSize: 18, margin: "25px 0", maxWidth: 450, lineHeight: '1.6' },
  btn: { padding: "18px 38px", background: "#FFD700", border: "none", borderRadius: 14, fontWeight: "800", fontSize: 16, cursor: "pointer", color: "#000" },
  btnOutline: { padding: "18px 38px", background: "transparent", border: "2px solid #FFD700", color: "#FFD700", borderRadius: 14, fontWeight: "700", cursor: "pointer", transition: "0.3s" },

  sliderWrapper: { display: 'flex', alignItems: 'center', gap: 20, zIndex: 5 },
  sliderTrack: { display: 'flex', alignItems: 'center', gap: -60, perspective: '1200px' },
  mainBike: { width: 480, height: 340, borderRadius: 30, objectFit: "cover", boxShadow: "0 20px 40px rgba(0,0,0,0.8)", zIndex: 10, border: '1.5px solid #FFD700' },
  sideBike: { width: 180, height: 160, borderRadius: 20, objectFit: "cover", opacity: 0.2, filter: "grayscale(1) blur(3px)", border: '1px solid rgba(255,215,0,0.3)' },
  arrowBtn: { background: "rgba(255,215,0,0.1)", border: "1px solid #FFD700", borderRadius: "50%", width: 55, height: 55, cursor: "pointer", display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: "blur(5px)" },

  section: { padding: "100px 80px", textAlign: "center", position: "relative", zIndex: 1 },
  sectionDark: { padding: "100px 80px", background: "rgba(10,10,10,0.8)", textAlign: "center", backdropFilter: "blur(10px)" },
  sectionTitle: { fontSize: 42, fontWeight: 800, marginBottom: 60, color: "#FFD700" },
  grid: { display: "flex", gap: 25, flexWrap: "wrap", justifyContent: "center" },
  card: { background: "rgba(20,20,20,0.6)", padding: 40, width: 280, borderRadius: 24, border: "1px solid #333", textAlign: 'left', backdropFilter: "blur(10px)", transition: "0.3s" },

  cityCard: { width: 280, height: 400, borderRadius: 24, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', cursor: 'pointer', border: '1.5px solid #FFD700', transition: "0.5s" },
  cityOverlay: { position: 'absolute', bottom: 0, width: '100%', padding: '25px', background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)', fontSize: 22, fontWeight: '700', display: 'flex', alignItems: 'center', gap: 10 },

  reviewCard: { 
  background: "rgba(15, 15, 15, 0.8)",
  width: 350, 
  borderRadius: 28, 
  border: "2px solid rgba(255, 215, 0, 0.3)", 
  textAlign: 'left', 
  display: 'flex', 
  flexDirection: 'column', 
  overflow: 'hidden', 
  backdropFilter: "blur(15px)",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.05)",
  transition: "all 0.3s ease"
},
  imageContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
    overflow: 'hidden'
  },
  portrait: { 
    width: "100%", 
    height: "100%", 
    objectFit: "cover",
    borderBottom: "2px solid #FFD700" 
  },
  reviewContent: {
    padding: "25px 25px 35px 25px",
  },
  reviewText: { 
    color: "#bbb", 
    fontStyle: 'italic', 
    fontSize: '15px', 
    lineHeight: '1.7',
    margin: 0
  },
  reviewerName: {
    color: "#FFD700",
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "10px",
    display: "block"
  },

  footer: { 
    padding: "80px 100px 30px", 
    background: "rgba(10, 10, 10, 0.8)",
    backdropFilter: "blur(15px)",
    borderTop: "1px solid rgba(255, 215, 0, 0.1)", 
    position: "relative" 
  },
  footerGlow: {
    position: 'absolute',
    top: -1,
    left: '10%',
    width: '80%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
    boxShadow: '0 0 15px #FFD700'
  },
  footerContent: { display: 'flex', justifyContent: 'space-between', gap: 50 },
  footerHead: { color: '#fff', fontSize: '18px', marginBottom: 20, fontWeight: '700' },
  footerList: { listStyle: 'none', padding: 0 },
  footerListItem: { color: '#666', marginBottom: 10, cursor: 'pointer', transition: '0.3s', fontSize: '14px' },
  
  inputContainer: { 
    display: 'flex', 
    background: '#111', 
    padding: '4px', 
    borderRadius: '12px', 
    border: '1px solid #333' 
  },
  input: { 
    padding: "10px 15px", 
    background: "transparent", 
    border: "none", 
    color: "#fff", 
    outline: 'none', 
    flex: 1 
  },
  miniBtn: { 
    padding: "10px 20px", 
    background: "#FFD700", 
    border: "none", 
    borderRadius: '10px', 
    cursor: "pointer", 
    fontWeight: 'bold',
    color: '#000'
  },
  
  iconHover: { cursor: 'pointer', transition: '0.3s' },
  footerBottom: { marginTop: 60 },
  divider: { height: '1px', background: 'rgba(255, 255, 255, 0.05)', width: '100%' },
  copyright: { opacity: 0.3, fontSize: '12px' }
};
