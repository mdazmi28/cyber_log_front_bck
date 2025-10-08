import React, { useState, useEffect } from "react";

const CyberHeader = () => {
  const [stats, setStats] = useState({
    totalAttacks: 0,
    activeThreats: 0,
    protectedSystems: 0,
    lastUpdate: new Date(),
  });

  // Simulate real-time statistics
  useEffect(() => {
    const updateStats = () => {
      setStats(prev => ({
        totalAttacks: prev.totalAttacks + Math.floor(Math.random() * 5),
        activeThreats: Math.floor(Math.random() * 50) + 10,
        protectedSystems: Math.floor(Math.random() * 20) + 5,
        lastUpdate: new Date(),
      }));
    };

    const interval = setInterval(updateStats, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 212, 255, 0.3)",
        borderRadius: "10px",
        padding: "12px 16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.2)",
        fontFamily: "monospace",
        color: "#00d4ff",
        minWidth: "260px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: "16px", 
          fontWeight: "700",
          background: "linear-gradient(45deg, #00d4ff, #00ff88)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          CYBER THREAT MAP
        </h2>
        <div style={{ 
          fontSize: "9px", 
          color: "rgba(0, 212, 255, 0.6)",
          marginTop: "3px",
        }}>
          REAL-TIME MONITORING SYSTEM
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: "#ff4757",
            textShadow: "0 0 8px rgba(255, 71, 87, 0.6)",
          }}>
            {stats.totalAttacks.toLocaleString()}
          </div>
          <div style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)" }}>
            TOTAL ATTACKS
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: "#ffa502",
            textShadow: "0 0 8px rgba(255, 165, 2, 0.6)",
          }}>
            {stats.activeThreats}
          </div>
          <div style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)" }}>
            ACTIVE THREATS
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: "#00ff88",
            textShadow: "0 0 8px rgba(0, 255, 136, 0.6)",
          }}>
            {stats.protectedSystems}
          </div>
          <div style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)" }}>
            PROTECTED
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ 
            fontSize: "11px", 
            fontWeight: "600", 
            color: "#00d4ff",
            textShadow: "0 0 4px rgba(0, 212, 255, 0.6)",
          }}>
            {stats.lastUpdate.toLocaleTimeString()}
          </div>
          <div style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)" }}>
            LAST UPDATE
          </div>
        </div>
      </div>

      {/* Status indicator */}
      <div style={{ 
        marginTop: "10px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: "6px",
      }}>
        <div style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#00ff88",
          animation: "cyberPulse 2s infinite",
          boxShadow: "0 0 6px rgba(0, 255, 136, 0.6)",
        }} />
        <span style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.7)" }}>
          SYSTEM ACTIVE
        </span>
      </div>
    </div>
  );
};

export default CyberHeader;
