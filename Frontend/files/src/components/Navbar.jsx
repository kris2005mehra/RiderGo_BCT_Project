import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Booking", path: "/booking" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Login", path: "/login" },
  ];

  return (
    <motion.nav
      style={styles.nav}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* LOGO */}
      <Link to="/" style={styles.logo}>
        RiderGo
      </Link>

      {/* LINKS */}
      <div style={styles.links}>
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            style={{
              ...styles.link,
              color:
                location.pathname === l.path ? "#FFD700" : "white",
            }}
          >
            {l.name}

            {/* UNDERLINE */}
            {location.pathname === l.path && (
              <motion.div
                layoutId="underline"
                style={styles.underline}
              />
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "18px 60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    backdropFilter: "blur(12px)",
    background: "rgba(0,0,0,0.6)",
    borderBottom: "1px solid #FFD700",
    zIndex: 999,
  },

  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#FFD700",
    textShadow: "0 0 10px #FFD700",
  },

  links: {
    display: "flex",
    gap: "35px",
  },

  link: {
    position: "relative",
    textDecoration: "none",
    fontSize: "17px",
    transition: "0.3s",
  },

  underline: {
    height: "3px",
    background: "#FFD700",
    width: "100%",
    position: "absolute",
    bottom: "-6px",
    left: 0,
    borderRadius: "10px",
    boxShadow: "0 0 10px #FFD700",
  },
};