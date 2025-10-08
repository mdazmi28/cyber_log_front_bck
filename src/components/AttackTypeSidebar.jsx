import React, { useState, useEffect } from "react";
import { cyberAttackMarkers, getSeverityColor } from "./constants";
import "./AttackTypeSidebar.css";

const AttackTypeSidebar = ({ selectedCountry }) => {
  const [analytics, setAnalytics] = useState(null);

  // Calculate analytics data
  useEffect(() => {
    const calculateAnalytics = () => {
      const attackTypeCounts = cyberAttackMarkers.reduce((acc, marker) => {
        if (marker.attacks !== "Protected") {
          acc[marker.attackType] = (acc[marker.attackType] || 0) + 1;
        }
        return acc;
      }, {});

      const attackTypeDetails = cyberAttackMarkers
        .filter(marker => marker.attacks !== "Protected")
        .map(marker => {
          const attackCount = parseInt(marker.attacks.replace(/,/g, "")) || 0;
          return {
            type: marker.attackType,
            country: marker.country,
            severity: marker.severity,
            attacks: attackCount,
            coordinates: marker.coordinates
          };
        })
        .sort((a, b) => b.attacks - a.attacks);

      // Group by attack type
      const groupedByType = attackTypeDetails.reduce((acc, attack) => {
        if (!acc[attack.type]) {
          acc[attack.type] = {
            type: attack.type,
            totalAttacks: 0,
            countries: [],
            severity: attack.severity
          };
        }
        acc[attack.type].totalAttacks += attack.attacks;
        acc[attack.type].countries.push(attack.country);
        return acc;
      }, {});

      // Convert to array and sort by total attacks
      const attackTypeStats = Object.values(groupedByType)
        .sort((a, b) => b.totalAttacks - a.totalAttacks)
        .slice(0, 6); // Show top 6 attack types

      return {
        attackTypeCounts,
        attackTypeStats,
        totalTypes: Object.keys(attackTypeCounts).length
      };
    };

    setAnalytics(calculateAnalytics());
  }, []);

  const getAttackTypeIcon = (attackType) => {
    switch (attackType.toLowerCase()) {
      case "ddos": return "🌐";
      case "malware": return "🦠";
      case "phishing": return "🎣";
      case "ransomware": return "🔒";
      case "botnet": return "🤖";
      case "data breach": return "📊";
      case "sql injection": return "💉";
      case "apt": return "🎯";
      case "zero-day": return "⚡";
      case "cryptojacking": return "⛏️";
      case "target": return "🛡️";
      default: return "⚠️";
    }
  };

  const getAttackTypeColor = (attackType) => {
    switch (attackType.toLowerCase()) {
      case "ddos": return "#ff6b6b";
      case "malware": return "#4ecdc4";
      case "phishing": return "#45b7d1";
      case "ransomware": return "#96ceb4";
      case "botnet": return "#feca57";
      case "data breach": return "#ff9ff3";
      case "sql injection": return "#54a0ff";
      case "apt": return "#5f27cd";
      case "zero-day": return "#00d2d3";
      case "cryptojacking": return "#ff9f43";
      default: return "#00d4ff";
    }
  };


  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  if (!analytics || !analytics.attackTypeStats || analytics.attackTypeStats.length === 0) {
    return (
      <div className="attack-type-sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-title">ATTACK TYPES</h3>
        </div>
        <div style={{ 
          padding: "20px", 
          textAlign: "center", 
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "12px"
        }}>
          No attack data available
        </div>
      </div>
    );
  }

  return (
    <div className="attack-type-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h3 className="sidebar-title">
          ATTACK TYPES
        </h3>
        <div className="sidebar-header-right">
          {/* Optional: Add status indicator here */}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card stat-card-types">
          <div className="stat-number">
            {analytics.totalTypes}
          </div>
          <div className="stat-label">
            TYPES
          </div>
        </div>
        <div className="stat-card stat-card-active">
          <div className="stat-number">
            {analytics.attackTypeStats.length}
          </div>
          <div className="stat-label">
            ACTIVE
          </div>
        </div>
      </div>

      {/* Attack Type Distribution */}
      <div className="attack-distribution-section">
        <div className="section-title">
          ATTACK DISTRIBUTION
        </div>
        <div className="attack-distribution">
          {analytics.attackTypeStats.map((attackType) => {
            const typeColor = getAttackTypeColor(attackType.type);
            const maxAttacks = Math.max(...analytics.attackTypeStats.map(a => a.totalAttacks));
            const percentage = maxAttacks > 0 ? (attackType.totalAttacks / maxAttacks) * 100 : 0;
            
            return (
              <div key={attackType.type} className="attack-type-item">
                <div className="attack-type-header">
                  <div className="attack-type-info">
                    <span className="attack-type-icon">
                      {getAttackTypeIcon(attackType.type)}
                    </span>
                    <span className="attack-type-name">
                      {attackType.type.toUpperCase()}
                    </span>
                    <span 
                      className="country-count-badge"
                      style={{
                        background: hexToRgba(typeColor, 0.2),
                        color: typeColor
                      }}
                    >
                      {attackType.countries.length}
                    </span>
                  </div>
                  <span className="attack-count">
                    {attackType.totalAttacks.toLocaleString()}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar"
                    style={{
                      background: `linear-gradient(90deg, ${typeColor}, ${typeColor}aa)`,
                      width: `${percentage}%`
                    }}
                  />
                </div>
                
                {/* Countries List */}
                <div className="countries-list">
                  {attackType.countries.slice(0, 3).map((country, idx) => (
                    <span key={idx} className="country-tag">
                      {country.length > 7 ? country.substring(0, 7) + "..." : country}
                    </span>
                  ))}
                  {attackType.countries.length > 3 && (
                    <span className="country-count-more">
                      +{attackType.countries.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Country Attack Type */}
      {selectedCountry && selectedCountry.type === "Cyber Attack" && (
        <div className="selected-country-section">
          <div className="section-title">
            SELECTED: {selectedCountry.attackType}
          </div>
          <div className="selected-country-card">
            <span className="selected-attack-icon">
              {getAttackTypeIcon(selectedCountry.attackType)}
            </span>
            <div className="selected-country-info">
              <div className="selected-attack-name">
                {selectedCountry.attackType}
              </div>
              <div className="selected-attack-details">
                <span 
                  className="severity-badge"
                  style={{
                    background: getSeverityColor(selectedCountry.severity),
                    color: "#000"
                  }}
                >
                  {selectedCountry.severity}
                </span>
                <span className="attack-count-text">
                  {selectedCountry.attacks} attacks
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttackTypeSidebar;
