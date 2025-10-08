import React, { useState, useEffect } from "react";
import { cyberAttackMarkers, getSeverityColor } from "./constants";
import ControlBar from "./ControlBar";

const AnalyticsSidebar = ({ 
  selectedCountry,
  selectedAttackType,
  onAttackTypeFilter,
  selectedSeverity,
  onSeverityFilter
}) => {
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
        .slice(0, 5);

      const recentAttacks = cyberAttackMarkers
        .filter(marker => marker.attacks !== "Protected")
        .map(marker => ({
          country: marker.country,
          attackType: marker.attackType,
          severity: marker.severity,
          attacks: marker.attacks,
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time within last week
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 10);

      return {
        totalAttacks,
        severityCounts,
        attackTypeCounts,
        topCountries,
        recentAttacks,
        totalCountries: cyberAttackMarkers.length - 1, // Exclude protected country
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

  const getThreatLevel = (severity) => {
    switch (severity.toLowerCase()) {
      case "critical": return { level: "CRITICAL", color: "#ff4757", bg: "rgba(255, 71, 87, 0.1)" };
      case "high": return { level: "HIGH", color: "#ffa502", bg: "rgba(255, 165, 2, 0.1)" };
      case "medium": return { level: "MEDIUM", color: "#ffd700", bg: "rgba(255, 215, 0, 0.1)" };
      case "low": return { level: "LOW", color: "#00ff88", bg: "rgba(0, 255, 136, 0.1)" };
      case "target": return { level: "PROTECTED", color: "#00d4ff", bg: "rgba(0, 212, 255, 0.1)" };
      default: return { level: "UNKNOWN", color: "#ff4757", bg: "rgba(255, 71, 87, 0.1)" };
    }
  };

  return (
    <div className="analytics-sidebar">
      <div className="sidebar-header">
        <h2>CYBER THREAT MAP</h2>
        <div style={{ 
          fontSize: "10px", 
          color: "rgba(0, 212, 255, 0.6)",
          marginTop: "4px",
        }}>
          REAL-TIME MONITORING SYSTEM
        </div>
      </div>

      <div className="sidebar-content">
        {/* Enhanced Filter Section */}
        <div className="filter-section">
          <div className="filter-header">
            <div className="filter-icon">🔍</div>
            <h3>FILTER CONTROLS</h3>
          </div>
          <div className="filter-controls">
            <div className="filter-group">
              <label className="filter-label">Attack Type</label>
              <select
                value={selectedAttackType || "all"}
                onChange={(e) => onAttackTypeFilter && onAttackTypeFilter(e.target.value)}
                className="filter-select attack-type-select"
                title="Filter by Attack Type"
              >
                <option value="all">🌐 All Types</option>
                <option value="DDoS">🌐 DDoS</option>
                <option value="Malware">🦠 Malware</option>
                <option value="Phishing">🎣 Phishing</option>
                <option value="Ransomware">🔒 Ransomware</option>
                <option value="Botnet">🤖 Botnet</option>
                <option value="Data Breach">📊 Data Breach</option>
                <option value="SQL Injection">💉 SQL Injection</option>
                <option value="APT">🎯 APT</option>
                <option value="Zero-day">⚡ Zero-day</option>
                <option value="Cryptojacking">⛏️ Cryptojacking</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Threat Level</label>
              <select
                value={selectedSeverity || "all"}
                onChange={(e) => onSeverityFilter && onSeverityFilter(e.target.value)}
                className="filter-select severity-select"
                title="Filter by Severity"
              >
                <option value="all">⚪ All Levels</option>
                <option value="Critical">🔴 Critical</option>
                <option value="High">🟠 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
                <option value="Target">🛡️ Protected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Real-time Stats Header */}
        <div className="stats-section">
          <h3>Live Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{analytics.totalAttacks.toLocaleString()}</div>
              <div className="stat-label">Total Attacks</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{analytics.totalCountries}</div>
              <div className="stat-label">Affected Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{analytics.protectedCountries}</div>
              <div className="stat-label">Protected</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{new Date().toLocaleTimeString()}</div>
              <div className="stat-label">Last Update</div>
            </div>
          </div>
          
          {/* Live indicator */}
          <div className="live-indicator" style={{ marginTop: "12px" }}>
            <div className="live-dot" />
            <span>SYSTEM ACTIVE</span>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="chart-section">
          <h3>Attack Severity</h3>
          <div className="severity-chart">
            {Object.entries(analytics.severityCounts).map(([severity, count]) => (
              <div key={severity} className="severity-item">
                <div className="severity-info">
                  <span className="severity-icon">{getSeverityIcon(severity)}</span>
                  <span className="severity-name">{severity}</span>
                </div>
                <div className="severity-bar">
                  <div 
                    className="severity-fill"
                    style={{ 
                      width: `${(count / Math.max(...Object.values(analytics.severityCounts))) * 100}%`,
                      backgroundColor: getSeverityColor(severity)
                    }}
                  />
                </div>
                <span className="severity-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Level Overview */}
        <div className="chart-section">
          <h3>Threat Level Status</h3>
          <div className="threat-levels">
            {Object.entries(analytics.severityCounts).map(([severity, count]) => {
              const threatInfo = getThreatLevel(severity);
              return (
                <div key={severity} className="threat-level-item" style={{ backgroundColor: threatInfo.bg }}>
                  <div className="threat-level-info">
                    <span className="threat-level-icon">{getSeverityIcon(severity)}</span>
                    <span className="threat-level-name" style={{ color: threatInfo.color }}>
                      {threatInfo.level}
                    </span>
                  </div>
                  <div className="threat-level-count" style={{ color: threatInfo.color }}>
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attack Types */}
        <div className="chart-section">
          <h3>Attack Types</h3>
          <div className="attack-types">
            {Object.entries(analytics.attackTypeCounts).map(([type, count]) => (
              <div key={type} className="attack-type-item">
                <span className="attack-icon">{getAttackTypeIcon(type)}</span>
                <span className="attack-name">{type}</span>
                <span className="attack-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="chart-section">
          <h3>Top Affected Countries</h3>
          <div className="top-countries">
            {analytics.topCountries.map((country, index) => (
              <div key={country.country} className="country-item">
                <div className="country-rank">#{index + 1}</div>
                <div className="country-info">
                  <div className="country-name">{country.country}</div>
                  <div className="country-details">
                    <span className="attack-type">{country.attackType}</span>
                    <span className="severity-badge" style={{ backgroundColor: getSeverityColor(country.severity) }}>
                      {country.severity}
                    </span>
                  </div>
                </div>
                <div className="country-attacks">{country.attacks.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="chart-section">
          <h3>Real-time Activity</h3>
          <div className="recent-activity">
            {analytics.recentAttacks.map((attack, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{getAttackTypeIcon(attack.attackType)}</div>
                <div className="activity-info">
                  <div className="activity-country">{attack.country}</div>
                  <div className="activity-details">
                    <span className="activity-type">{attack.attackType}</span>
                    <span className="activity-severity" style={{ color: getSeverityColor(attack.severity) }}>
                      {attack.severity}
                    </span>
                  </div>
                </div>
                <div className="activity-time">
                  {attack.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          
          {/* Live indicator */}
          <div className="live-indicator">
            <div className="live-dot" />
            <span>LIVE</span>
          </div>
        </div>

        {/* Selected Country Details */}
        {selectedCountry && (
          <div className="selected-country-section">
            <h3>Selected Country</h3>
            <div className="selected-country-card">
              <div className="country-header">
                <h4>{selectedCountry.name}</h4>
                {selectedCountry.type === "Cyber Attack" && (
                  <span className="attack-badge" style={{ backgroundColor: getSeverityColor(selectedCountry.severity) }}>
                    {selectedCountry.severity}
                  </span>
                )}
              </div>
              {selectedCountry.type === "Cyber Attack" && (
                <div className="country-details">
                  <div className="detail-item">
                    <span className="detail-label">Attack Type:</span>
                    <span className="detail-value">{selectedCountry.attackType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Attack Count:</span>
                    <span className="detail-value">{selectedCountry.attacks}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsSidebar;
