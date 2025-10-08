import React from "react";
import { professionalButtonStyle } from "./constants";

const ControlBar = ({ 
  selectedAttackType,
  onAttackTypeFilter,
  selectedSeverity,
  onSeverityFilter
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "-0px",
        left: "20px",
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(0, 212, 255, 0.3)",
        padding: "12px 20px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.2)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* <button
        onClick={onZoomIn}
        style={professionalButtonStyle}
        title="Zoom In"
      >
        <span style={{ fontSize: "14px", fontWeight: "600" }}>+</span>
      </button> */}
      
      {/* <button
        onClick={onZoomOut}
        style={professionalButtonStyle}
        title="Zoom Out"
      >
        <span style={{ fontSize: "14px", fontWeight: "600" }}>−</span>
      </button> */}
      
      

      {/* Attack Type Filter */}
      <select
        value={selectedAttackType || "all"}
        onChange={(e) => onAttackTypeFilter && onAttackTypeFilter(e.target.value)}
        style={{
          ...professionalButtonStyle,
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          color: "#00d4ff",
          fontSize: "12px",
          fontWeight: "600",
          padding: "8px 12px",
          minWidth: "120px",
          cursor: "pointer",
        }}
        title="Filter by Attack Type"
      >
        <option value="all">ALL TYPES</option>
        <option value="DDoS">DDoS</option>
        <option value="Malware">Malware</option>
        <option value="Phishing">Phishing</option>
        <option value="Ransomware">Ransomware</option>
        <option value="Botnet">Botnet</option>
        <option value="Data Breach">Data Breach</option>
        <option value="SQL Injection">SQL Injection</option>
        <option value="APT">APT</option>
        <option value="Zero-day">Zero-day</option>
        <option value="Cryptojacking">Cryptojacking</option>
      </select>

      {/* Severity Filter */}
      <select
        value={selectedSeverity || "all"}
        onChange={(e) => onSeverityFilter && onSeverityFilter(e.target.value)}
        style={{
          ...professionalButtonStyle,
          background: "rgba(0, 0, 0, 0.8)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          color: "#00d4ff",
          fontSize: "12px",
          fontWeight: "600",
          padding: "8px 12px",
          minWidth: "100px",
          cursor: "pointer",
        }}
        title="Filter by Severity"
      >
        <option value="all">ALL LEVELS</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
        <option value="Target">Protected</option>
      </select>
    </div>
  );
};

export default ControlBar;
