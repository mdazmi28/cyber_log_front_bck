import React, { useState, useEffect } from "react";
import { Marker } from "react-simple-maps";

const RealTimeData = ({ onAttackDetected }) => {
  const [attacks, setAttacks] = useState([]);

  // Simulate real-time attack data
  useEffect(() => {
    const attackTypes = ["DDoS", "Malware", "Phishing", "Ransomware", "Botnet", "Data Breach"];
    const countries = [
      { name: "United States", coordinates: [-95.7129, 37.0902] },
      { name: "China", coordinates: [104.1954, 35.8617] },
      { name: "Russia", coordinates: [105.3188, 61.524] },
      { name: "Germany", coordinates: [10.4515, 51.1657] },
      { name: "United Kingdom", coordinates: [-3.436, 55.3781] },
      { name: "India", coordinates: [78.9629, 20.5937] },
      { name: "Japan", coordinates: [138.2529, 36.2048] },
      { name: "France", coordinates: [2.2137, 46.6034] },
    ];

    const generateAttack = () => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      const severity = ["Critical", "High", "Medium", "Low"][Math.floor(Math.random() * 4)];
      
      const newAttack = {
        id: Date.now() + Math.random(),
        country: country.name,
        coordinates: country.coordinates,
        attackType,
        severity,
        timestamp: new Date(),
        duration: 2000 + Math.random() * 3000, // 2-5 seconds
      };

      setAttacks(prev => [...prev, newAttack]);
      
      // Notify parent component
      if (onAttackDetected) {
        onAttackDetected(newAttack);
      }

      // Remove attack after duration
      setTimeout(() => {
        setAttacks(prev => prev.filter(attack => attack.id !== newAttack.id));
      }, newAttack.duration);
    };

    // Generate attacks every 1-3 seconds
    const interval = setInterval(generateAttack, 1000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [onAttackDetected]);

  return (
    <>
      {attacks.map(attack => (
        <Marker key={attack.id} coordinates={attack.coordinates}>
          {/* Animated attack indicator */}
          <circle
            r={3}
            fill="#ff4757"
            stroke="#fff"
            strokeWidth={1}
            opacity={0.8}
            style={{
              animation: "cyberPulse 0.5s ease-in-out infinite",
              filter: "drop-shadow(0 0 6px rgba(255, 71, 87, 0.8))",
            }}
          />
          
          {/* Expanding ring effect */}
          <circle
            r={8}
            fill="none"
            stroke="#ff4757"
            strokeWidth={1}
            opacity={0.6}
            style={{
              animation: "targetPing 1s ease-out infinite",
              filter: "drop-shadow(0 0 4px rgba(255, 71, 87, 0.6))",
            }}
          />
          
          {/* Attack type indicator */}
          <text
            textAnchor="middle"
            y={-15}
            style={{
              fontFamily: "monospace",
              fill: "#ff4757",
              fontSize: "10px",
              fontWeight: "600",
              textShadow: "0 0 4px rgba(0,0,0,0.8)",
            }}
          >
            {attack.attackType}
          </text>
        </Marker>
      ))}
    </>
  );
};

export default RealTimeData;
