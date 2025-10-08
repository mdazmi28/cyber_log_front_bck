import React, { useState, useEffect } from "react";
import { cyberAttackMarkers, getSeverityColor } from "./constants";

const AttackSensitivity = ({ selectedCountry }) => {
  const [analytics, setAnalytics] = useState(null);

  // Calculate analytics data
  useEffect(() => {
    const calculateAnalytics = () => {
      const totalAttacks = cyberAttackMarkers.reduce((sum, marker) => {
        const attackCount = marker.attacks === "Protected" ? 0 : parseInt(marker.attacks.replace(/,/g, ""));
        return sum + attackCount;
      }, 0);

      const severityCounts = cyberAttackMarkers.reduce((acc, marker) => {
        if (marker.attacks !== "Protected") {
          acc[marker.severity] = (acc[marker.severity] || 0) + 1;
        }
        return acc;
      }, {});

      const attackTypeCounts = cyberAttackMarkers.reduce((acc, marker) => {
        if (marker.attacks !== "Protected") {
          acc[marker.attackType] = (acc[marker.attackType] || 0) + 1;
        }
        return acc;
      }, {});

      const topCountries = cyberAttackMarkers
        .filter(marker => marker.attacks !== "Protected")
        .map(marker => ({
          country: marker.country,
          attacks: parseInt(marker.attacks.replace(/,/g, "")),
          severity: marker.severity,
          attackType: marker.attackType
        }))
        .sort((a, b) => b.attacks - a.attacks)
        .slice(0, 3); // Show only top 3 for compact view

      return {
        totalAttacks,
        severityCounts,
        attackTypeCounts,
        topCountries,
        totalCountries: cyberAttackMarkers.length - 1,
        protectedCountries: 1
      };
    };

    setAnalytics(calculateAnalytics());
  }, []);

  if (!analytics) return null;

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical": return "🔴";
      case "high": return "🟠";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };


  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "280px",
      maxHeight: "350px",
      background: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 212, 255, 0.3)",
      borderRadius: "10px",
      padding: "12px",
      color: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "11px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      zIndex: 1000,
      overflow: "hidden",
      transition: "all 0.3s ease"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        borderBottom: "1px solid rgba(0, 212, 255, 0.2)",
        paddingBottom: "6px"
      }}>
        <h3 style={{
          margin: 0,
          fontSize: "12px",
          fontWeight: "600",
          color: "#00d4ff",
          letterSpacing: "0.5px"
        }}>
          THREAT SENSITIVITY
        </h3>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          {/* <div style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#ff4757",
            animation: "pulse 2s infinite"
          }} /> */}
          {/* <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.7)" }}>LIVE</span> */}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6px",
        marginBottom: "10px"
      }}>
        <div style={{
          background: "rgba(255, 71, 87, 0.1)",
          border: "1px solid rgba(255, 71, 87, 0.3)",
          borderRadius: "5px",
          padding: "6px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#ff4757" }}>
            {analytics.totalAttacks.toLocaleString()}
          </div>
          <div style={{ fontSize: "8px", color: "rgba(255, 255, 255, 0.7)" }}>
            TOTAL ATTACKS
          </div>
        </div>
        <div style={{
          background: "rgba(0, 212, 255, 0.1)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "5px",
          padding: "6px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "14px", fontWeight: "bold", color: "#00d4ff" }}>
            {analytics.totalCountries}
          </div>
          <div style={{ fontSize: "8px", color: "rgba(255, 255, 255, 0.7)" }}>
            AFFECTED
          </div>
        </div>
      </div>

      {/* Severity Overview */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          fontSize: "10px",
          fontWeight: "600",
          color: "#00d4ff",
          marginBottom: "5px",
          letterSpacing: "0.3px"
        }}>
          THREAT LEVELS
        </div>
        <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
          {Object.entries(analytics.severityCounts).map(([severity, count]) => (
            <div key={severity} style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              background: `rgba(${severity === 'critical' ? '255, 71, 87' : severity === 'high' ? '255, 165, 2' : severity === 'medium' ? '255, 215, 0' : '0, 255, 136'}, 0.1)`,
              border: `1px solid rgba(${severity === 'critical' ? '255, 71, 87' : severity === 'high' ? '255, 165, 2' : severity === 'medium' ? '255, 215, 0' : '0, 255, 136'}, 0.3)`,
              borderRadius: "3px",
              padding: "2px 4px",
              fontSize: "8px"
            }}>
              <span>{getSeverityIcon(severity)}</span>
              <span style={{ color: getSeverityColor(severity), fontWeight: "600" }}>
                {severity.toUpperCase()}
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Countries */}
      <div style={{ marginBottom: "10px" }}>
        <div style={{
          fontSize: "10px",
          fontWeight: "600",
          color: "#00d4ff",
          marginBottom: "5px",
          letterSpacing: "0.3px"
        }}>
          TOP THREATS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {analytics.topCountries.map((country, index) => (
            <div key={country.country} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "3px",
              padding: "3px 5px",
              fontSize: "9px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ 
                  fontSize: "7px", 
                  color: "rgba(255, 255, 255, 0.5)",
                  minWidth: "10px"
                }}>
                  #{index + 1}
                </span>
                <span style={{ color: "#ffffff", fontWeight: "500" }}>
                  {country.country.length > 10 ? country.country.substring(0, 10) + "..." : country.country}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: getSeverityColor(country.severity), fontSize: "7px" }}>
                  {getSeverityIcon(country.severity)}
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "8px" }}>
                  {country.attacks.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Country Info */}
      {selectedCountry && (
        <div style={{
          borderTop: "1px solid rgba(0, 212, 255, 0.2)",
          paddingTop: "6px"
        }}>
          <div style={{
            fontSize: "10px",
            fontWeight: "600",
            color: "#00d4ff",
            marginBottom: "3px"
          }}>
            SELECTED: {selectedCountry.name}
          </div>
          {selectedCountry.type === "Cyber Attack" && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "9px"
            }}>
              <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {selectedCountry.attackType}
              </span>
              <span style={{
                background: getSeverityColor(selectedCountry.severity),
                color: "#000",
                padding: "1px 4px",
                borderRadius: "2px",
                fontSize: "7px",
                fontWeight: "bold"
              }}>
                {selectedCountry.severity}
              </span>
              <span style={{ color: "#ffffff", fontWeight: "600" }}>
                {selectedCountry.attacks}
              </span>
            </div>
          )}
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AttackSensitivity;
