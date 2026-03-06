import React, { useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, LogIn, UserPlus } from "lucide-react";

const styles = {
  container: { 
    position: "relative", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh",
    width: "100vw",
    backgroundImage: "url('/bookingbdg.png')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden", 
    fontFamily: "sans-serif",
    margin: 0,
    boxSizing: "border-box"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)", 
    zIndex: 1
  },
  card: {
    position: "relative",
    zIndex: 2,
    background: "rgba(15, 15, 15, 0.85)",
    backdropFilter: "blur(10px)", 
    padding: "40px",
    borderRadius: "28px",
    width: "90%",
    maxWidth: "400px",
    border: "1px solid rgba(255, 215, 0, 0.3)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
    boxSizing: "border-box",
    textAlign: "center"
  },
  logo: {
    color: "#FFD700",
    fontSize: "22px",
    fontWeight: "900",
    letterSpacing: "3px",
    marginBottom: "5px",
    display: "block"
  },
  title: {
    color: "#fff",
    fontSize: "26px",
    fontWeight: "800",
    marginBottom: "30px",
  },
  inputGroup: { position: "relative", marginBottom: "15px" },
  icon: { position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#FFD700", zIndex: 3 },
  input: {
    width: "100%",
    padding: "14px 14px 14px 45px",
    background: "rgba(0, 0, 0, 0.5)",
    border: "1px solid rgba(255, 215, 0, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "16px",
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "900",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
    boxShadow: "0 10px 20px rgba(255, 215, 0, 0.2)",
  },
  toggleText: {
    marginTop: "25px",
    color: "#888",
    fontSize: "14px"
  },
  link: {
    color: "#FFD700",
    fontWeight: "800",
    cursor: "pointer",
    marginLeft: "5px",
    textDecoration: "underline"
  }
};


export default function LoginSignup() {

  const [isLogin, setIsLogin] = useState(true);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if(isLogin){
        // LOGIN
        const res = await axios.post(`${API}/users/login`,{
          email,
          password
        });

        localStorage.setItem("token", res.data.token);
        alert("Login Success 🚀");
        navigate("/dashboard");

      } else {
        // SIGNUP
        await axios.post(`${API}/users/signup`,{
          name,
          email,
          password
        });

        alert("Signup Success!!! Please Login");
        setIsLogin(true);
      }

    } catch(err){
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <motion.div layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={styles.card}>
        <span style={styles.logo}>RiderGo</span>
        <h1 style={styles.title}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit}>

          <AnimatePresence>
            {!isLogin && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={styles.inputGroup}>
                <User size={18} style={styles.icon}/>
                <input
                  type="text"
                  placeholder="Full Name"
                  style={styles.input}
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  required
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={styles.inputGroup}>
            <Mail size={18} style={styles.icon}/>
            <input
              type="email"
              placeholder="Email"
              style={styles.input}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={18} style={styles.icon}/>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.95}} type="submit" style={styles.button}>
            {isLogin ? "Login Now" : "Join RiderGo"}
            {isLogin ? <LogIn size={18}/> : <UserPlus size={18}/>}
          </motion.button>

        </form>

        <p style={styles.toggleText}>
          {isLogin ? "New to RiderGo?" : "Already a member?"}
          <span style={styles.link} onClick={()=>setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}