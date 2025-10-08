import React from "react";
import { Line } from "react-simple-maps";
import { cyberAttackMarkers } from "./constants";

const NetworkConnections = ({ showLines }) => {
  if (!showLines) return null;

  // Get target country (Bangladesh)
  const targetCountry = cyberAttackMarkers.find(marker => marker.severity.toLowerCase() === "target");
  if (!targetCountry) return null;

  // Get all attacker countries
  const attackerCountries = cyberAttackMarkers.filter(marker => marker.severity.toLowerCase() !== "target");

  return (
    <>
      {attackerCountries.map((attacker, index) => (
        <Line
          key={`connection-${attacker.country}`}
          from={targetCountry.coordinates}
          to={attacker.coordinates}
          stroke="#ff4757"
          strokeWidth={0.5}
          strokeOpacity={0.6}
          strokeDasharray="5,5"
          style={{
            animation: `lineFlow 3s linear infinite`,
            animationDelay: `${index * 0.5}s`,
            filter: "drop-shadow(0 0 4px rgba(255, 71, 87, 0.6))",
          }}
        />
      ))}
      
      {/* Additional animated lines for visual effect */}
      {attackerCountries.slice(0, 3).map((attacker, index) => (
        <Line
          key={`effect-${attacker.country}`}
          from={targetCountry.coordinates}
          to={attacker.coordinates}
          stroke="#00d4ff"
          strokeWidth={0.3}
          strokeOpacity={0.3}
          strokeDasharray="2,8"
          style={{
            animation: `lineFlow 4s linear infinite reverse`,
            animationDelay: `${index * 0.8}s`,
            filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.4))",
          }}
        />
      ))}
    </>
  );
};

export default NetworkConnections;
