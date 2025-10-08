// import React, { useState, useEffect } from "react";
// import { Marker, Line } from "react-simple-maps";
// import { cyberAttackMarkers, getSeverityColor } from "./constants";

// const DragLines = ({ 
//   isDragging, 
//   dragStart, 
//   showLines = true 
// }) => {
//   const [animationProgress, setAnimationProgress] = useState(0);
//   const [dragAnimationSpeed, setDragAnimationSpeed] = useState(0.02);

//   // Animate the arrows with faster speed for drag line
//   useEffect(() => {
//     const speed = isDragging ? dragAnimationSpeed : 0.01;
//     const interval = setInterval(() => {
//       setAnimationProgress((prev) => (prev + speed) % 1);
//     }, 20);
//     return () => clearInterval(interval);
//   }, [isDragging, dragAnimationSpeed]);

//   // Speed up animation when dragging
//   useEffect(() => {
//     if (isDragging) {
//       setDragAnimationSpeed(0.025);
//     }
//   }, [isDragging]);

//   // Get the target coordinates (Bangladesh)
//   const targetMarker = cyberAttackMarkers.find(marker => 
//     marker.severity.toLowerCase() === "target"
//   );
  
//   if (!targetMarker) return null;

//   const targetCoords = targetMarker.coordinates;

//   // Function to adjust coordinates to ensure better visual path
//   const adjustForShorterPath = (from, to) => {
//     const [fromLon] = from;
//     const [toLon, toLat] = to;
    
//     // Calculate the longitude difference
//     let lonDiff = toLon - fromLon;
    
//     // Special handling for western hemisphere (USA, Brazil) going to eastern hemisphere (Bangladesh)
//     // Prefer eastward route (land routes) for these countries
//     if (fromLon < -30 && toLon > 60) {
//       // Coming from Americas to Asia - prefer eastward
//       if (lonDiff < 0) {
//         lonDiff += 360; // Force eastward route
//       }
//     } else {
//       // For all other cases, use shortest path
//       // Normalize to [-180, 180]
//       while (lonDiff > 180) {
//         lonDiff -= 360;
//       }
//       while (lonDiff < -180) {
//         lonDiff += 360;
//       }
//     }
    
//     // Adjust target longitude
//     const adjustedLon = fromLon + lonDiff;
    
//     return [adjustedLon, toLat];
//   };

//   // Function to interpolate between two coordinates (smart routing)
//   const interpolateCoords = (from, to, progress) => {
//     const [fromLon, fromLat] = from;
//     const [toLon, toLat] = to;
    
//     // Calculate longitude difference
//     let lonDiff = toLon - fromLon;
    
//     // Special handling for western hemisphere (USA, Brazil) going to eastern hemisphere (Bangladesh)
//     // Prefer eastward route (land routes) for these countries
//     if (fromLon < -30 && toLon > 60) {
//       // Coming from Americas to Asia - prefer eastward
//       if (lonDiff < 0) {
//         lonDiff += 360; // Force eastward route
//       }
//     } else {
//       // For all other cases, use shortest path
//       // Normalize to [-180, 180]
//       while (lonDiff > 180) {
//         lonDiff -= 360;
//       }
//       while (lonDiff < -180) {
//         lonDiff += 360;
//       }
//     }
    
//     // Interpolate using the preferred path
//     const interpolatedLon = fromLon + lonDiff * progress;
//     const interpolatedLat = fromLat + (toLat - fromLat) * progress;
    
//     return [interpolatedLon, interpolatedLat];
//   };

//   // Calculate angle for arrow rotation (smart routing)
//   const calculateAngle = (from, to) => {
//     const [fromLon, fromLat] = from;
//     const [toLon, toLat] = to;
    
//     // Calculate longitude difference using smart routing logic
//     let lonDiff = toLon - fromLon;
    
//     // Special handling for western hemisphere (USA, Brazil) going to eastern hemisphere (Bangladesh)
//     // Prefer eastward route (land routes) for these countries
//     if (fromLon < -30 && toLon > 60) {
//       // Coming from Americas to Asia - prefer eastward
//       if (lonDiff < 0) {
//         lonDiff += 360; // Force eastward route
//       }
//     } else {
//       // For all other cases, use shortest path
//       // Normalize to [-180, 180]
//       while (lonDiff > 180) {
//         lonDiff -= 360;
//       }
//       while (lonDiff < -180) {
//         lonDiff += 360;
//       }
//     }
    
//     const latDiff = toLat - fromLat;
    
//     return Math.atan2(latDiff, lonDiff) * (180 / Math.PI);
//   };

//   return (
//     <>

//       {/* Static lines from all attackers (source) to Bangladesh (destination) - faint guide lines */}
//       {showLines && cyberAttackMarkers
//         .filter(marker => marker.severity.toLowerCase() !== "target")
//         .map((attacker) => {
//           const adjustedTarget = adjustForShorterPath(attacker.coordinates, targetCoords);
          
//           return (
//             <Line
//               key={`line-${attacker.country}`}
//               from={attacker.coordinates}
//               to={adjustedTarget}
//               stroke={getSeverityColor(attacker.severity)}
//               strokeWidth={1}
//               strokeOpacity={0.2}
//               strokeDasharray="5,5"
//               style={{
//                 filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))",
//               }}
//             />
//           );
//         })}

//       {/* Animated arrows flowing from attackers (source) to Bangladesh (destination) */}
//       {showLines && cyberAttackMarkers
//         .filter(marker => marker.severity.toLowerCase() !== "target")
//         .map((attacker) => {
//           // Create multiple arrows with staggered animations (3 arrows per line)
//           const numArrows = 3;
//           const arrows = [];
          
//           for (let i = 0; i < numArrows; i++) {
//             const offset = i / numArrows;
//             const progress = (animationProgress + offset) % 1;
//             // Arrows flow from attacker (source) to target (Bangladesh - destination)
//             // interpolateCoords now handles shortest path automatically
//             const currentPos = interpolateCoords(attacker.coordinates, targetCoords, progress);
//             // Arrow always points directly towards Bangladesh (final destination)
//             const angle = calculateAngle(currentPos, targetCoords);
            
//             // Add slight pulse effect
//             const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.15;
            
//             arrows.push(
//               <Marker key={`arrow-${attacker.country}-${i}`} coordinates={currentPos}>
//                 <g transform={`rotate(${angle}) scale(${pulseScale})`}>
//                   {/* Main arrow pointing towards Bangladesh */}
//                   <path
//                     d="M-10,-5 L3,0 L-10,5 L-7,0 Z"
//                     fill={getSeverityColor(attacker.severity)}
//                     opacity={0.9}
//                     style={{
//                       filter: `drop-shadow(0 0 4px ${getSeverityColor(attacker.severity)})`,
//                       transition: "all 0.1s ease-out",
//                     }}
//                   />
//                   {/* Inner highlight - shows direction */}
//                   <path
//                     d="M-7,-3 L0,0 L-7,3 L-5,0 Z"
//                     fill="#FFFFFF"
//                     opacity={0.5}
//                   />
//                 </g>
//               </Marker>
//             );
//           }
          
//           return arrows;
//         })}

//       {/* Dynamic dragging line */}
//       {isDragging && dragStart && (
//         <>
//           <Line
//             from={dragStart}
//             to={targetCoords}
//             stroke="#FF6B6B"
//             strokeWidth={2}
//             strokeOpacity={0.3}
//             strokeDasharray="8,4"
//             style={{
//               filter: "drop-shadow(0 0 5px rgba(255, 107, 107, 0.5))",
//             }}
//           />
          
//           {/* Animated arrows on dragging line - flowing from drag point to Bangladesh */}
//           {[0, 1, 2, 3, 4].map((i) => {
//             const offset = i / 5;
//             const progress = (animationProgress + offset) % 1;
//             const currentPos = interpolateCoords(dragStart, targetCoords, progress);
//             // Arrow always points directly towards Bangladesh (final destination)
//             const angle = calculateAngle(currentPos, targetCoords);
            
//             // Pulse effect based on position
//             const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.2;
            
//             return (
//               <Marker key={`drag-arrow-${i}`} coordinates={currentPos}>
//                 <g transform={`rotate(${angle}) scale(${pulseScale})`}>
//                   {/* Main drag arrow pointing towards Bangladesh */}
//                   <path
//                     d="M-14,-7 L4,0 L-14,7 L-9,0 Z"
//                     fill="#FF6B6B"
//                     opacity={0.95}
//                     style={{
//                       filter: "drop-shadow(0 0 8px rgba(255, 107, 107, 1))",
//                       transition: "all 0.1s ease-out",
//                     }}
//                   />
//                   {/* Inner glow - shows direction clearly */}
//                   <path
//                     d="M-11,-5 L1,0 L-11,5 L-7,0 Z"
//                     fill="#FFFFFF"
//                     opacity={0.6}
//                   />
//                 </g>
//               </Marker>
//             );
//           })}
//         </>
//       )}

//       {/* Connection points on target when dragging */}
//       {isDragging && (
//         <Marker coordinates={targetCoords}>
//           <circle
//             r={8}
//             fill="none"
//             stroke="#00FF00"
//             strokeWidth={3}
//             opacity={0.8}
//             style={{
//               animation: "targetGlow 1s infinite alternate",
//               filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))",
//             }}
//           />
//           <circle
//             r={4}
//             fill="#00FF00"
//             opacity={0.9}
//             style={{
//               animation: "targetPulse 1s infinite",
//             }}
//           />
//         </Marker>
//       )}
//     </>
//   );
// };

// export default DragLines;














// import React, { useState, useEffect } from "react";
// import { Marker, Line } from "react-simple-maps";
// import { cyberAttackMarkers, getSeverityColor } from "./constants";

// const DragLines = ({ 
//   isDragging, 
//   dragStart, 
//   showLines = true 
// }) => {
//   const [animationProgress, setAnimationProgress] = useState(0);
//   const [dragAnimationSpeed, setDragAnimationSpeed] = useState(0.02);

//   // Animate the arrows with faster speed for drag line
//   useEffect(() => {
//     const speed = isDragging ? dragAnimationSpeed : 0.01;
//     const interval = setInterval(() => {
//       setAnimationProgress((prev) => (prev + speed) % 1);
//     }, 20);
//     return () => clearInterval(interval);
//   }, [isDragging, dragAnimationSpeed]);

//   // Speed up animation when dragging
//   useEffect(() => {
//     if (isDragging) {
//       setDragAnimationSpeed(0.025);
//     }
//   }, [isDragging]);

//   // Get the target coordinates (Bangladesh)
//   const targetMarker = cyberAttackMarkers.find(marker => 
//     marker.severity.toLowerCase() === "target"
//   );
  
//   if (!targetMarker) return null;

//   const targetCoords = targetMarker.coordinates;

//   // Function to calculate great circle path with proper curve
//   const calculateGreatCirclePath = (from, to) => {
//     const [fromLon, fromLat] = from;
//     const [toLon, toLat] = to;
    
//     // Convert to radians
//     const lat1 = (fromLat * Math.PI) / 180;
//     const lon1 = (fromLon * Math.PI) / 180;
//     const lat2 = (toLat * Math.PI) / 180;
//     const lon2 = (toLon * Math.PI) / 180;
    
//     // Calculate the great circle distance and bearing
//     const dLon = lon2 - lon1;
//     const dLat = lat2 - lat1;
    
//     // For visual appeal, we'll create a curved path by adding a control point
//     const midLat = (fromLat + toLat) / 2;
//     const midLon = (fromLon + toLon) / 2;
    
//     // Calculate curve height based on distance
//     const distance = Math.sqrt(dLat * dLat + dLon * dLon);
//     const curveHeight = Math.min(distance * 0.3, 20); // Max 20 degrees curve
    
//     // Perpendicular offset for curve
//     const perpLat = -dLon / distance * curveHeight;
//     const perpLon = dLat / distance * curveHeight;
    
//     const controlLat = midLat + perpLat;
//     const controlLon = midLon + perpLon;
    
//     return {
//       start: from,
//       control: [controlLon, controlLat],
//       end: to
//     };
//   };

//   // Function to interpolate along quadratic bezier curve
//   const interpolateQuadraticBezier = (start, control, end, t) => {
//     const [x0, y0] = start;
//     const [x1, y1] = control;
//     const [x2, y2] = end;
    
//     const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
//     const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
    
//     return [x, y];
//   };

//   // Function to calculate tangent direction along bezier curve
//   const calculateBezierTangent = (start, control, end, t) => {
//     const [x0, y0] = start;
//     const [x1, y1] = control;
//     const [x2, y2] = end;
    
//     // First derivative of quadratic bezier
//     const dx = 2 * (1 - t) * (x1 - x0) + 2 * t * (x2 - x1);
//     const dy = 2 * (1 - t) * (y1 - y0) + 2 * t * (y2 - y1);
    
//     return Math.atan2(dy, dx) * (180 / Math.PI);
//   };

//   // Function to create SVG path for curved line
//   const createCurvedPath = (start, control, end) => {
//     const [x0, y0] = start;
//     const [x1, y1] = control;
//     const [x2, y2] = end;
    
//     return `M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}`;
//   };

//   return (
//     <>
//       {/* Static curved lines from all attackers to Bangladesh */}
//       {showLines && cyberAttackMarkers
//         .filter(marker => marker.severity.toLowerCase() !== "target")
//         .map((attacker) => {
//           const path = calculateGreatCirclePath(attacker.coordinates, targetCoords);
          
//           return (
//             <g key={`line-group-${attacker.country}`}>
//               {/* Create curved path using multiple small segments for better rendering */}
//               {Array.from({ length: 20 }, (_, i) => {
//                 const t1 = i / 20;
//                 const t2 = (i + 1) / 20;
//                 const pos1 = interpolateQuadraticBezier(path.start, path.control, path.end, t1);
//                 const pos2 = interpolateQuadraticBezier(path.start, path.control, path.end, t2);
                
//                 return (
//                   <Line
//                     key={`segment-${i}`}
//                     from={pos1}
//                     to={pos2}
//                     stroke={getSeverityColor(attacker.severity)}
//                     strokeWidth={1}
//                     strokeOpacity={0.2}
//                     style={{
//                       filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))",
//                     }}
//                   />
//                 );
//               })}
//             </g>
//           );
//         })}

//       {/* Animated arrows flowing along curved paths */}
//       {showLines && cyberAttackMarkers
//         .filter(marker => marker.severity.toLowerCase() !== "target")
//         .map((attacker) => {
//           const path = calculateGreatCirclePath(attacker.coordinates, targetCoords);
//           const numArrows = 3;
//           const arrows = [];
          
//           for (let i = 0; i < numArrows; i++) {
//             const offset = i / numArrows;
//             const progress = (animationProgress + offset) % 1;
            
//             // Skip arrows at the very beginning or end
//             if (progress < 0.05 || progress > 0.95) continue;
            
//             const currentPos = interpolateQuadraticBezier(path.start, path.control, path.end, progress);
//             const angle = calculateBezierTangent(path.start, path.control, path.end, progress);
            
//             // Add slight pulse effect
//             const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.1;
            
//             arrows.push(
//               <Marker key={`arrow-${attacker.country}-${i}`} coordinates={currentPos}>
//                 <g transform={`rotate(${angle}) scale(${pulseScale})`}>
//                   {/* Streamlined arrow shape */}
//                   <path
//                     d="M-6,-3 L6,0 L-6,3 L-3,0 Z"
//                     fill={getSeverityColor(attacker.severity)}
//                     opacity={0.9}
//                     style={{
//                       filter: `drop-shadow(0 0 3px ${getSeverityColor(attacker.severity)})`,
//                     }}
//                   />
//                   {/* Inner highlight */}
//                   <path
//                     d="M-3,-2 L4,0 L-3,2 L-1,0 Z"
//                     fill="#FFFFFF"
//                     opacity={0.6}
//                   />
//                 </g>
//               </Marker>
//             );
//           }
          
//           return arrows;
//         })}

//       {/* Dynamic dragging line with curve */}
//       {isDragging && dragStart && (
//         <>
//           {(() => {
//             const dragPath = calculateGreatCirclePath(dragStart, targetCoords);
            
//             return (
//               <>
//                 {/* Curved drag line */}
//                 {Array.from({ length: 25 }, (_, i) => {
//                   const t1 = i / 25;
//                   const t2 = (i + 1) / 25;
//                   const pos1 = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, t1);
//                   const pos2 = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, t2);
                  
//                   return (
//                     <Line
//                       key={`drag-segment-${i}`}
//                       from={pos1}
//                       to={pos2}
//                       stroke="#FF6B6B"
//                       strokeWidth={2}
//                       strokeOpacity={0.6}
//                       style={{
//                         filter: "drop-shadow(0 0 5px rgba(255, 107, 107, 0.5))",
//                       }}
//                     />
//                   );
//                 })}
                
//                 {/* Animated arrows on curved drag path */}
//                 {[0, 1, 2, 3, 4].map((i) => {
//                   const offset = i / 5;
//                   const progress = (animationProgress + offset) % 1;
                  
//                   if (progress < 0.05 || progress > 0.95) return null;
                  
//                   const currentPos = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, progress);
//                   const angle = calculateBezierTangent(dragPath.start, dragPath.control, dragPath.end, progress);
                  
//                   const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.2;
                  
//                   return (
//                     <Marker key={`drag-arrow-${i}`} coordinates={currentPos}>
//                       <g transform={`rotate(${angle}) scale(${pulseScale})`}>
//                         <path
//                           d="M-8,-4 L8,0 L-8,4 L-4,0 Z"
//                           fill="#FF6B6B"
//                           opacity={0.95}
//                           style={{
//                             filter: "drop-shadow(0 0 6px rgba(255, 107, 107, 0.8))",
//                           }}
//                         />
//                         <path
//                           d="M-4,-3 L6,0 L-4,3 L-2,0 Z"
//                           fill="#FFFFFF"
//                           opacity={0.7}
//                         />
//                       </g>
//                     </Marker>
//                   );
//                 })}
//               </>
//             );
//           })()}
//         </>
//       )}

//       {/* Connection points on target when dragging */}
//       {isDragging && (
//         <Marker coordinates={targetCoords}>
//           <circle
//             r={8}
//             fill="none"
//             stroke="#00FF00"
//             strokeWidth={3}
//             opacity={0.8}
//             style={{
//               animation: "targetGlow 1s infinite alternate",
//               filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))",
//             }}
//           />
//           <circle
//             r={4}
//             fill="#00FF00"
//             opacity={0.9}
//             style={{
//               animation: "targetPulse 1s infinite",
//             }}
//           />
//         </Marker>
//       )}
//     </>
//   );
// };

// export default DragLines;













import React, { useState, useEffect } from "react";
import { Marker, Line } from "react-simple-maps";
import { cyberAttackMarkers, getSeverityColor } from "./constants";

const DragLines = ({ 
  isDragging, 
  dragStart, 
  showLines = true 
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dragAnimationSpeed, setDragAnimationSpeed] = useState(0.02);

  // Animate the circles with faster speed for drag line
  useEffect(() => {
    const speed = isDragging ? dragAnimationSpeed : 0.01;
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + speed) % 1);
    }, 20);
    return () => clearInterval(interval);
  }, [isDragging, dragAnimationSpeed]);

  // Speed up animation when dragging
  useEffect(() => {
    if (isDragging) {
      setDragAnimationSpeed(0.025);
    }
  }, [isDragging]);

  // Get the target coordinates (Bangladesh)
  const targetMarker = cyberAttackMarkers.find(marker => 
    marker.severity.toLowerCase() === "target"
  );
  
  if (!targetMarker) return null;

  const targetCoords = targetMarker.coordinates;

  // Function to calculate great circle path with proper curve
  const calculateGreatCirclePath = (from, to) => {
    const [fromLon, fromLat] = from;
    const [toLon, toLat] = to;
    
    // Convert to radians
    const lat1 = (fromLat * Math.PI) / 180;
    const lon1 = (fromLon * Math.PI) / 180;
    const lat2 = (toLat * Math.PI) / 180;
    const lon2 = (toLon * Math.PI) / 180;
    
    // Calculate the great circle distance and bearing
    const dLon = lon2 - lon1;
    const dLat = lat2 - lat1;
    
    // For visual appeal, we'll create a curved path by adding a control point
    const midLat = (fromLat + toLat) / 2;
    const midLon = (fromLon + toLon) / 2;
    
    // Calculate curve height based on distance
    const distance = Math.sqrt(dLat * dLat + dLon * dLon);
    const curveHeight = Math.min(distance * 0.3, 20); // Max 20 degrees curve
    
    // Perpendicular offset for curve
    const perpLat = -dLon / distance * curveHeight;
    const perpLon = dLat / distance * curveHeight;
    
    const controlLat = midLat + perpLat;
    const controlLon = midLon + perpLon;
    
    return {
      start: from,
      control: [controlLon, controlLat],
      end: to
    };
  };

  // Function to interpolate along quadratic bezier curve
  const interpolateQuadraticBezier = (start, control, end, t) => {
    const [x0, y0] = start;
    const [x1, y1] = control;
    const [x2, y2] = end;
    
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * x1 + t * t * x2;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * y1 + t * t * y2;
    
    return [x, y];
  };

  return (
    <>
      {/* Static curved lines from all attackers to Bangladesh */}
      {showLines && cyberAttackMarkers
        .filter(marker => marker.severity.toLowerCase() !== "target")
        .map((attacker) => {
          const path = calculateGreatCirclePath(attacker.coordinates, targetCoords);
          
          return (
            <g key={`line-group-${attacker.country}`}>
              {/* Create curved path using multiple small segments for better rendering */}
              {Array.from({ length: 20 }, (_, i) => {
                const t1 = i / 20;
                const t2 = (i + 1) / 20;
                const pos1 = interpolateQuadraticBezier(path.start, path.control, path.end, t1);
                const pos2 = interpolateQuadraticBezier(path.start, path.control, path.end, t2);
                
                return (
                  <Line
                    key={`segment-${i}`}
                    from={pos1}
                    to={pos2}
                    stroke={getSeverityColor(attacker.severity)}
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    style={{
                      filter: "drop-shadow(0 0 2px rgba(0,0,0,0.2))",
                    }}
                  />
                );
              })}
            </g>
          );
        })}

      {/* Animated circles flowing along curved paths */}
      {showLines && cyberAttackMarkers
        .filter(marker => marker.severity.toLowerCase() !== "target")
        .map((attacker) => {
          const path = calculateGreatCirclePath(attacker.coordinates, targetCoords);
          const numCircles = 3;
          const circles = [];
          
          for (let i = 0; i < numCircles; i++) {
            const offset = i / numCircles;
            const progress = (animationProgress + offset) % 1;
            
            // Skip circles at the very beginning or end
            if (progress < 0.05 || progress > 0.95) continue;
            
            const currentPos = interpolateQuadraticBezier(path.start, path.control, path.end, progress);
            
            // Add slight pulse effect
            const pulseScale = 1 + Math.sin(progress * Math.PI * 4) * 0.2;
            const baseRadius = 3;
            const radius = baseRadius * pulseScale;
            
            circles.push(
              <Marker key={`circle-${attacker.country}-${i}`} coordinates={currentPos}>
                <g>
                  {/* Outer glow circle */}
                  <circle
                    r={radius + 2}
                    fill={getSeverityColor(attacker.severity)}
                    opacity={0.3}
                    style={{
                      filter: `drop-shadow(0 0 6px ${getSeverityColor(attacker.severity)})`,
                    }}
                  />
                  {/* Main circle */}
                  <circle
                    r={radius}
                    fill={getSeverityColor(attacker.severity)}
                    opacity={0.9}
                    style={{
                      filter: `drop-shadow(0 0 3px ${getSeverityColor(attacker.severity)})`,
                    }}
                  />
                  {/* Inner highlight circle */}
                  <circle
                    r={radius * 0.6}
                    fill="#FFFFFF"
                    opacity={0.7}
                  />
                </g>
              </Marker>
            );
          }
          
          return circles;
        })}

      {/* Dynamic dragging line with curve */}
      {isDragging && dragStart && (
        <>
          {(() => {
            const dragPath = calculateGreatCirclePath(dragStart, targetCoords);
            
            return (
              <>
                {/* Curved drag line */}
                {Array.from({ length: 25 }, (_, i) => {
                  const t1 = i / 25;
                  const t2 = (i + 1) / 25;
                  const pos1 = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, t1);
                  const pos2 = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, t2);
                  
                  return (
                    <Line
                      key={`drag-segment-${i}`}
                      from={pos1}
                      to={pos2}
                      stroke="#FF6B6B"
                      strokeWidth={2}
                      strokeOpacity={0.6}
                      style={{
                        filter: "drop-shadow(0 0 5px rgba(255, 107, 107, 0.5))",
                      }}
                    />
                  );
                })}
                
                {/* Animated circles on curved drag path */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const offset = i / 5;
                  const progress = (animationProgress + offset) % 1;
                  
                  if (progress < 0.05 || progress > 0.95) return null;
                  
                  const currentPos = interpolateQuadraticBezier(dragPath.start, dragPath.control, dragPath.end, progress);
                  
                  const pulseScale = 1 + Math.sin(progress * Math.PI * 2) * 0.3;
                  const baseRadius = 4;
                  const radius = baseRadius * pulseScale;
                  
                  return (
                    <Marker key={`drag-circle-${i}`} coordinates={currentPos}>
                      <g>
                        {/* Outer glow circle for drag */}
                        <circle
                          r={radius + 3}
                          fill="#FF6B6B"
                          opacity={0.4}
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(255, 107, 107, 0.8))",
                          }}
                        />
                        {/* Main drag circle */}
                        <circle
                          r={radius}
                          fill="#FF6B6B"
                          opacity={0.95}
                          style={{
                            filter: "drop-shadow(0 0 6px rgba(255, 107, 107, 0.8))",
                          }}
                        />
                        {/* Inner highlight circle */}
                        <circle
                          r={radius * 0.5}
                          fill="#FFFFFF"
                          opacity={0.8}
                        />
                      </g>
                    </Marker>
                  );
                })}
              </>
            );
          })()}
        </>
      )}

      {/* Connection points on target when dragging */}
      {isDragging && (
        <Marker coordinates={targetCoords}>
          <circle
            r={8}
            fill="none"
            stroke="#00FF00"
            strokeWidth={3}
            opacity={0.8}
            style={{
              animation: "targetGlow 1s infinite alternate",
              filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.8))",
            }}
          />
          <circle
            r={4}
            fill="#00FF00"
            opacity={0.9}
            style={{
              animation: "targetPulse 1s infinite",
            }}
          />
        </Marker>
      )}
    </>
  );
};

export default DragLines;