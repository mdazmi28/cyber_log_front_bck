import React from "react";
import { Marker } from "react-simple-maps";
import { cyberAttackMarkers, getSeverityColor } from "./constants";

const CyberAttackMarkers = ({ 
  onMarkerClick, 
  onDragStart, 
  onDragEnd, 
  isDragging,
  selectedAttackType = "all",
  selectedSeverity = "all"
}) => {
  // Filter markers based on selected criteria
  const filteredMarkers = cyberAttackMarkers.filter(marker => {
    const attackTypeMatch = selectedAttackType === "all" || marker.attackType === selectedAttackType;
    const severityMatch = selectedSeverity === "all" || marker.severity === selectedSeverity;
    return attackTypeMatch && severityMatch;
  });

  return (
    <>
      {filteredMarkers.map(
        ({
          country,
          coordinates,
          markerOffset,
          attackType,
          severity,
          attacks,
        }) => {
          const isTarget = severity.toLowerCase() === "target";
          const isAttacker = !isTarget;

          return (
            <Marker key={country} coordinates={coordinates}>
              {/* Main attack marker */}
              <circle
                r={isTarget ? 8 : 6}
                fill={getSeverityColor(severity)}
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={1.5}
                style={{
                  cursor: isAttacker ? "grab" : "pointer",
                  filter: isTarget
                    ? "drop-shadow(0 0 12px rgba(0, 255, 136, 0.9))"
                    : "drop-shadow(0 0 10px rgba(220, 20, 60, 0.8))",
                  animation: isTarget
                    ? "targetPulse 2s infinite"
                    : "pulse 2s infinite",
                }}
                onClick={() =>
                  onMarkerClick({
                    country,
                    coordinates,
                    attackType,
                    severity,
                    attacks,
                  })
                }
                onMouseDown={(e) => {
                  if (isAttacker) {
                    e.preventDefault();
                    onDragStart(coordinates);
                  }
                }}
                onMouseUp={() => {
                  if (isAttacker && isDragging) {
                    onDragEnd();
                  }
                }}
              />
              {/* Outer ring for attack visualization */}
              <circle
                r={isTarget ? 14 : 12}
                fill="none"
                stroke={getSeverityColor(severity)}
                strokeWidth={1.5}
                opacity={0.6}
                strokeDasharray="4,4"
                style={{
                  cursor: "pointer",
                  animation: isTarget
                    ? "targetPing 2s infinite"
                    : "ping 2s infinite",
                }}
                onClick={() =>
                  onMarkerClick({
                    country,
                    coordinates,
                    attackType,
                    severity,
                    attacks,
                  })
                }
              />
              {/* Attack type icon */}
              <text
                textAnchor="middle"
                y={markerOffset - 8}
                style={{
                  fontFamily: "monospace",
                  fill: isTarget ? "#00ff88" : "#ff4757",
                  fontSize: `12px`,
                  fontWeight: "700",
                  cursor: "pointer",
                  textShadow: "0 0 8px rgba(0,0,0,0.8)",
                }}
                onClick={() =>
                  onMarkerClick({
                    country,
                    coordinates,
                    attackType,
                    severity,
                    attacks,
                  })
                }
              >
                {isTarget ? "🛡️" : "⚡"}
              </text>
              
              {/* Attack count */}
              <text
                textAnchor="middle"
                y={markerOffset + 8}
                style={{
                  fontFamily: "monospace",
                  fill: isTarget ? "#00ff88" : "#ff4757",
                  fontSize: `10px`,
                  fontWeight: "600",
                  cursor: "pointer",
                  textShadow: "0 0 6px rgba(0,0,0,0.8)",
                }}
                onClick={() =>
                  onMarkerClick({
                    country,
                    coordinates,
                    attackType,
                    severity,
                    attacks,
                  })
                }
              >
                {attacks}
              </text>
            </Marker>
          );
        }
      )}
    </>
  );
};

export default CyberAttackMarkers;
