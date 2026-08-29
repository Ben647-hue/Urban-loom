import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./logout.css"

const Location = () => {
  const navigate = useNavigate()
  return (
    <div className="d-flex flex-column min-vh-100 loc-bg">

      

      {/* HERO BANNER */}
      <div className="loc-banner d-flex flex-column justify-content-center align-items-center text-center text-light">
        <div className="pin-icon mb-3">📍</div>
        <h1 className="loc-title mb-2">Find Us in Nairobi</h1>
        <p className="loc-subtitle">Visit Urban Loom at Village Market — your trusted clothes brand</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="container py-5 flex-grow-1">
        <div className="row g-4 align-items-stretch">

          {/* INFO CARD */}
          <div className="col-lg-4">
            <div className="loc-info-card h-100 p-4">
              <h4 className="text-warning mb-4 fw-bold">🏪 Our Location</h4>

              <div className="info-row mb-3">
                <span className="info-icon">🏠</span>
                <div>
                  <p className="info-label">Address</p>
                  <p className="info-value">Urban Loom<br />Village Market, Limuru Rod<br/>Nairobi County, Kenya</p>
                </div>
              </div>

              <div className="info-row mb-3">
                <span className="info-icon">🕐</span>
                <div>
                  <p className="info-label">Working Hours</p>
                  <p className="info-value">Mon – Sat: 8:00 AM – 6:00 PM</p>
                  <p className="info-value">Sunday: 10:00 AM – 3:00 PM</p>
                </div>
              </div>

              <div className="info-row mb-3">
                <span className="info-icon">📞</span>
                <div>
                  <p className="info-label">Phone</p>
                  <p className="info-value">+254 746 953592</p>
                </div>
              </div>

              <div className="info-row mb-4">
                <span className="info-icon">✉️</span>
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-value">cartineesee@gmail.com</p>
                </div>
              </div>

              <a
                href="https://www.google.com/search?q=Village+Market"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gradient w-100"
              >
                🗺️ Get Directions to Village Market
              </a>
                <button
              className="btn-back"
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
            </div>
          </div>

          {/* MAP — pinned to Village Market, Nairobi */}
          <div className="col-lg-8">
            <div className="loc-map-wrapper">
              <iframe
                title="Urban Loom Location - Village Market"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.571439243764!2d36.797204!3d-1.229007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17042a926315%3A0xb35154ee4a46014e!2sThe%20Village%20Market!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"

                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px", borderRadius: "20px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* LANDMARK CARDS */}
        <div className="row g-3 mt-4">
          <div className="col-12">
            <h5 className="text-warning fw-bold mb-3">🧭 Nearby Landmarks</h5>
          </div>
          {[
            { icon: "🛒", name: "Village Market", desc: "We are here!" },
            { icon: "🏛️", name: "UN Complex Gigiri", desc: "3 min drive" },
            { icon: "🌲", name: "Karura Forest", desc: "5 min drive" },
            { icon: "🛍️", name: "Two Rivers Mall", desc: "10 min drive" },
          ].map((lm, i) => (
            <div className="col-sm-6 col-md-3" key={i}>
              <div className={`landmark-card text-center p-3 ${i === 0 ? 'landmark-active' : ''}`}>
                <div className="landmark-icon mb-2">{lm.icon}</div>
                <p className="landmark-name">{lm.name}</p>
                <span className={`landmark-dist ${i === 0 ? 'landmark-dist-here' : ''}`}>{lm.desc}</span>
              </div>
            </div>
          ))}
        </div>
       

      </div>

      {/* FOOTER */}
      <footer className="mt-auto bg-dark text-light text-center py-4">
        <h5>©2026 Urban Loom . All Rights Reserved.</h5>
        <p>Follow us on social media for exclusive deals!</p>
      </footer>

      {/* ===== STYLES ===== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500&display=swap');

        * { font-family: 'DM Sans', sans-serif; }

        .loc-bg {
          background: linear-gradient(135deg, #f0f0f0, #ffe6e6, #f0f0f0);
        }
        .offer-navbar {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          font-weight: bold;
        }
        .offer-link {
          color: white !important;
          font-weight: bold;
          transition: color 0.3s, transform 0.2s;
        }
        .offer-link:hover, .offer-link.active {
          color: #ffd633 !important;
          transform: scale(1.1);
        }

        /* BANNER */
        .loc-banner {
          height: 220px;
          background: linear-gradient(45deg, #ff4d4d, #ffb84d);
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          margin-bottom: 0;
          padding: 20px;
        }
        .pin-icon {
          font-size: 2.5rem;
          animation: bounce 1.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .loc-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 2.2rem;
          letter-spacing: -1px;
        }
        .loc-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        /* INFO CARD */
        .loc-info-card {
          background: linear-gradient(145deg, #ffffff, #ffe6f0);
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .loc-info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .info-icon {
          font-size: 1.4rem;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin-bottom: 2px;
        }
        .info-value {
          font-weight: 500;
          color: #333;
          margin-bottom: 0;
          font-size: 0.95rem;
        }

        /* MAP */
        .loc-map-wrapper {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          height: 100%;
          min-height: 450px;
          border: 3px solid #ffb84d;
        }

        /* LANDMARK CARDS */
        .landmark-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.25s, box-shadow 0.25s;
          border-bottom: 3px solid #ff4d4d;
        }
        .landmark-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }
        .landmark-active {
          border: 2px solid #ff4d4d;
          background: linear-gradient(145deg, #fff5f5, #fff);
        }
        .landmark-icon { font-size: 2rem; }
        .landmark-name {
          font-weight: 700;
          font-size: 0.9rem;
          color: #333;
          margin-bottom: 4px;
        }
        .landmark-dist {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 20px;
        }
        .landmark-dist-here {
          background: linear-gradient(90deg, #1db954, #00c853);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* BUTTON */
        .btn-gradient {
          background: linear-gradient(90deg, #ff4d4d, #ffb84d);
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 10px;
          padding: 10px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-gradient:hover {
          transform: scale(1.04);
          box-shadow: 0 6px 20px rgba(255,77,77,0.4);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Location;