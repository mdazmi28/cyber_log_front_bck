import React, { useState, useEffect } from "react";
import { ipAnalyticsData, getSeverityColor } from "./constants";

const IPAnalytics = ({ selectedCountry }) => {
  const [activeTab, setActiveTab] = useState("connections");
  const [analytics, setAnalytics] = useState(null);

  // Calculate analytics data
  useEffect(() => {
    const calculateAnalytics = () => {
      const totalConnections = ipAnalyticsData.ipConnections.reduce((sum, conn) => sum + conn.attacks, 0);
      const totalSourceAttacks = ipAnalyticsData.topSourceIPs.reduce((sum, ip) => sum + ip.attacks, 0);
      const totalDestAttacks = ipAnalyticsData.topDestinationIPs.reduce((sum, ip) => sum + ip.attacks, 0);
      const totalCountryAttacks = ipAnalyticsData.topSourceCountries.reduce((sum, country) => sum + country.attacks, 0);

      return {
        totalConnections,
        totalSourceAttacks,
        totalDestAttacks,
        totalCountryAttacks,
        ...ipAnalyticsData
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
      case "target": return "🛡️";
      default: return "⚪";
    }
  };

  const renderIPConnections = (data) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "320px", overflowY: "auto" }}>
      {data.map((connection, index) => (
        <div key={`connection-${index}`} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          padding: "6px 8px",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", flex: 1, minWidth: 0 }}>
            <span style={{ 
              fontSize: "11px", 
              color: "rgba(255, 255, 255, 0.5)",
              minWidth: "16px"
            }}>
              #{index + 1}
            </span>
            <span style={{ 
              color: "#ff6b6b", 
              fontWeight: "500",
              fontFamily: "monospace",
              fontSize: "11px"
            }}>
              {connection.sourceIP}
            </span>
            <span style={{ 
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "10px",
              margin: "0 3px"
            }}>
              →
            </span>
            <span style={{ 
              color: "#00d4ff", 
              fontWeight: "500",
              fontFamily: "monospace",
              fontSize: "11px"
            }}>
              {connection.destIP}
            </span>
            <span style={{ 
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "10px",
              margin: "0 3px"
            }}>
              →
            </span>
            <span style={{ 
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "11px",
              flexShrink: 0
            }}>
              {connection.sourceCountry.length > 12 ? connection.sourceCountry.substring(0, 12) + "..." : connection.sourceCountry}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: getSeverityColor(connection.severity), fontSize: "12px" }}>
              {getSeverityIcon(connection.severity)}
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13px" }}>
              {connection.attacks.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderIPList = (data, type) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "320px", overflowY: "auto" }}>
      {data.map((item, index) => (
        <div key={`${type}-${index}`} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          padding: "6px 8px",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
            <span style={{ 
              fontSize: "11px", 
              color: "rgba(255, 255, 255, 0.5)",
              minWidth: "16px"
            }}>
              #{index + 1}
            </span>
            <span style={{ 
              color: "#ffffff", 
              fontWeight: "500",
              fontFamily: "monospace",
              fontSize: "12px"
            }}>
              {item.ip}
            </span>
            <span style={{ 
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "11px",
              marginLeft: "6px"
            }}>
              {item.country.length > 10 ? item.country.substring(0, 10) + "..." : item.country}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: getSeverityColor(item.severity), fontSize: "12px" }}>
              {getSeverityIcon(item.severity)}
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13px" }}>
              {item.attacks.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCountryList = (data) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "320px", overflowY: "auto" }}>
      {data.map((country, index) => (
        <div key={`country-${index}`} style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "4px",
          padding: "6px 8px",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
            <span style={{ 
              fontSize: "11px", 
              color: "rgba(255, 255, 255, 0.5)",
              minWidth: "16px"
            }}>
              #{index + 1}
            </span>
            <span style={{ 
              color: "#ffffff", 
              fontWeight: "500",
              fontSize: "12px"
            }}>
              {country.country.length > 14 ? country.country.substring(0, 14) + "..." : country.country}
            </span>
            <span style={{ 
              color: "rgba(0, 212, 255, 0.8)",
              fontSize: "11px",
              marginLeft: "6px"
            }}>
              {country.percentage}%
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: getSeverityColor(country.severity), fontSize: "12px" }}>
              {getSeverityIcon(country.severity)}
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "13px" }}>
              {country.attacks.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "20px",
      width: "380px",
      height: "520px",
      background: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 212, 255, 0.3)",
      borderRadius: "10px",
      padding: "16px",
      color: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: "15px",
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
          fontSize: "18px",
          fontWeight: "600",
          color: "#00d4ff",
          letterSpacing: "0.5px"
        }}>
          IP ANALYTICS
        </h3>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        gap: "4px",
        marginBottom: "1px",
        flexWrap: "wrap"
      }}>
        {[
          { key: "connections", label: "Connections", count: analytics.ipConnections.length },
          { key: "sourceIPs", label: "Source IPs", count: analytics.topSourceIPs.length },
          { key: "destIPs", label: "Dest IPs", count: analytics.topDestinationIPs.length },
          { key: "countries", label: "Countries", count: analytics.topSourceCountries.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key ? "rgba(0, 212, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${activeTab === tab.key ? "rgba(0, 212, 255, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
              borderRadius: "4px",
              padding: "6px 10px",
              fontSize: "12px",
              color: activeTab === tab.key ? "#00d4ff" : "rgba(255, 255, 255, 0.7)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontWeight: "500"
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      <div style={{ marginBottom: "10px" }}>
        {activeTab === "connections" && (
          <>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#00d4ff",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              IP CONNECTIONS: Source - Destination - Country
            </div>
            {renderIPConnections(analytics.ipConnections)}
          </>
        )}

        {activeTab === "sourceIPs" && (
          <>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#00d4ff",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              TOP SOURCE IPs
            </div>
            {renderIPList(analytics.topSourceIPs, "source")}
          </>
        )}

        {activeTab === "destIPs" && (
          <>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#00d4ff",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              TOP DESTINATION IPs
            </div>
            {renderIPList(analytics.topDestinationIPs, "dest")}
          </>
        )}

        {activeTab === "countries" && (
          <>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#00d4ff",
              marginBottom: "8px",
              letterSpacing: "0.3px"
            }}>
              TOP SOURCE COUNTRIES
            </div>
            {renderCountryList(analytics.topSourceCountries)}
          </>
        )}
      </div>

      {/* Summary Stats */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "12px",
        color: "rgba(255, 255, 255, 0.6)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "8px"
      }}>
        <span>Connections: {analytics.totalConnections.toLocaleString()}</span>
        <span>Source: {analytics.totalSourceAttacks.toLocaleString()}</span>
        <span>Dest: {analytics.totalDestAttacks.toLocaleString()}</span>
      </div>

      {/* Selected Country Info */}
      {selectedCountry && (
        <div style={{
          marginTop: "10px",
          padding: "8px",
          background: "rgba(0, 212, 255, 0.1)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "6px",
          fontSize: "10px"
        }}>
          <div style={{ color: "#00d4ff", fontWeight: "600", marginBottom: "4px" }}>
            SELECTED: {selectedCountry}
          </div>
          <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            Click on map markers for detailed analysis
          </div>
        </div>
      )}
    </div>
  );
};

export default IPAnalytics;

