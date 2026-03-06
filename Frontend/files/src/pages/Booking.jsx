import React, { useEffect, useState } from 'react';
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Bike, CreditCard } from 'lucide-react';

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
    backdropFilter: "blur(20px)",
    padding: "30px 40px",
    borderRadius: "28px",
    width: "90%",
    maxWidth: "420px",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
    boxSizing: "border-box"
  },
  title: {
    color: "#FFD700",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "900",
    margin: "0 0 25px 0",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  inputGroup: { position: "relative", marginBottom: "15px" },
  icon: { position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#FFD700", zIndex: 3 },
  input: {
    width: "100%",
    padding: "12px 12px 12px 45px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 215, 0, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  row: { display: "flex", gap: "10px" },
  priceBox: {
    background: "rgba(255, 215, 0, 0.05)",
    padding: "15px",
    borderRadius: "16px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px dashed rgba(255, 215, 0, 0.3)"
  },
  priceLabel: { color: "#888", fontSize: "13px", margin: "0 0 5px 0" },
  priceAmount: { color: "#FFD700", fontSize: "28px", fontWeight: "900", margin: 0 },
  button: {
    width: "100%",
    padding: "14px",
    background: "#FFD700",
    color: "#000",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  }
};

export default function Booking() {

  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const [price, setPrice] = useState(0);

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    date: "",
    time: ""
  });

  // ✅ Fetch Bikes
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get(`${API}/bikes`);
        setBikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBikes();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Bike Select
  const handleBikeChange = (e) => {
    const bikeId = e.target.value;
    setSelectedBike(bikeId);

    const bike = bikes.find(b => b._id === bikeId);
    if (bike) setPrice(bike.price);
  };

  // ✅ Create Booking
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(`${API}/bookings`, {
        bikeId: selectedBike,
        ...form
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Booking Successful 🚀");
      navigate("/dashboard");

    } catch (err) {
      alert("Booking Failed ❌");
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        <h1 style={styles.title}>Secure Booking</h1>

        <div style={styles.inputGroup}>
          <MapPin size={18} style={styles.icon} />
          <input 
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            type="text" 
            placeholder="Pickup Location" 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <MapPin size={18} style={styles.icon} />
          <input 
            name="drop"
            value={form.drop}
            onChange={handleChange}
            type="text" 
            placeholder="Drop Location" 
            style={styles.input} 
          />
        </div>
        
        <div style={styles.row}>
          <div style={{...styles.inputGroup, flex: 1}}>
            <Calendar size={18} style={styles.icon} />
            <input 
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date" 
              style={{...styles.input, paddingLeft: '40px'}} 
            />
          </div>

          <div style={{...styles.inputGroup, flex: 1}}>
            <Clock size={18} style={styles.icon} />
            <input 
              name="time"
              value={form.time}
              onChange={handleChange}
              type="time" 
              style={{...styles.input, paddingLeft: '40px'}} 
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <Bike size={18} style={styles.icon} />
          <select 
            onChange={handleBikeChange}
            style={{...styles.input, appearance: 'none'}}
          >
            <option value="">Select Vehicle</option>

            {bikes.map(bike => (
              <option 
                key={bike._id} 
                value={bike._id}
                style={{background: '#111'}}
              >
                {bike.name} - ₹{bike.price}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.priceBox}>
          <p style={styles.priceLabel}>Estimated Total</p>
          <h2 style={styles.priceAmount}>₹{price}</h2>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
          whileTap={{ scale: 0.98 }}
          style={styles.button}
          onClick={handleBooking}
        >
          <CreditCard size={18} />
          Confirm Booking
        </motion.button>
      </motion.div>
    </div>
  );
}