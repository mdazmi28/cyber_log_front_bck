// import React from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Sphere,
//   Graticule,
//   ZoomableGroup,
//   Line,
// } from "react-simple-maps";
// import { geoUrl } from "./constants";
// import CyberAttackMarkers from "./CyberAttackMarkers";
// import DragLines from "./DragLines";
// import NetworkConnections from "./NetworkConnections";
// import RealTimeData from "./RealTimeData";

// const WorldMap = ({
//   windowDimensions,
//   calculateScale,
//   resetKey,
//   onCountryClick,
//   onCountryHover,
//   onMouseLeave,
//   onMarkerClick,
//   getCountryColor,
//   // Drag line props
//   isDragging,
//   dragStart,
//   onDragStart,
//   onDragEnd: handleDragEnd,
//   onMouseMove,
//   showLines = true,
//   // Filter props
//   selectedAttackType = "all",
//   selectedSeverity = "all",
// }) => {
//   return (
//     <div 
//       style={{ 
//         position: "relative",
//         width: "100%",
//         height: "100%"
//       }}
//       onMouseMove={onMouseMove}
//       onMouseUp={isDragging ? handleDragEnd : undefined}
//     >
//       <ComposableMap
//         key={resetKey}
//         projection="geoEqualEarth"
//         projectionConfig={{
//           scale: calculateScale(),
//           center: [0, 0],
//         }}
//         width={windowDimensions.width}
//         height={windowDimensions.height}
//         style={{ 
//           width: "100%", 
//           height: "100%",
//           display: "block",
//           position: "absolute",
//           top: 0,
//           left: 0
//         }}
//       >
//         {/* Ocean removed - no bluish effect */}

//         {/* Grid removed for cleaner look */}

//         {/* Countries with Nice Colors */}
//         <Geographies geography={geoUrl}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill={getCountryColor(geo)}
//                 stroke="rgba(255, 255, 255, 0.2)"
//                 strokeWidth={0.5}
//                 style={{
//                   default: {
//                     fill: getCountryColor(geo),
//                     stroke: "rgba(255, 255, 255, 0.2)",
//                     strokeWidth: 0.5,
//                     outline: "none",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                   },
//                   hover: {
//                     fill: "#ffffff",
//                     stroke: "rgba(255, 255, 255, 0.5)",
//                     strokeWidth: 1,
//                     outline: "none",
//                     cursor: "pointer",
//                     filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
//                   },
//                   pressed: {
//                     fill: "#00ff88",
//                     stroke: "rgba(0, 255, 136, 0.8)",
//                     strokeWidth: 1.5,
//                     outline: "none",
//                     filter: "drop-shadow(0 0 12px rgba(0, 255, 136, 0.8))",
//                   },
//                 }}
//                 onClick={(event) => onCountryClick(geo, event)}
//                 onMouseEnter={(event) => onCountryHover(geo, event)}
//                 onMouseLeave={onMouseLeave}
//               />
//             ))
//           }
//         </Geographies>

//         {/* Network Connections */}
//         <NetworkConnections
//           showLines={showLines}
//         />

//         {/* Drag Lines */}
//         <DragLines
//           isDragging={isDragging}
//           dragStart={dragStart}
//           showLines={showLines}
//         />

//         {/* Cyber Attack Markers */}
//         <CyberAttackMarkers 
//           onMarkerClick={onMarkerClick} 
//           onDragStart={onDragStart}
//           onDragEnd={handleDragEnd}
//           isDragging={isDragging}
//           selectedAttackType={selectedAttackType}
//           selectedSeverity={selectedSeverity}
//         />

//         {/* Real-time Attack Data */}
//         <RealTimeData />
//       </ComposableMap>
//     </div>
//   );
// };

// export default WorldMap;

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { geoUrl } from "./constants";
import CyberAttackMarkers from "./CyberAttackMarkers";
import DragLines from "./DragLines";
import RealTimeData from "./RealTimeData";

const WorldMap = ({
  windowDimensions,
  calculateScale,
  resetKey,
  onCountryClick,
  onCountryHover,
  onMouseLeave,
  onMarkerClick,
  getCountryColor,
  // Drag line props
  isDragging,
  dragStart,
  onDragStart,
  onDragEnd: handleDragEnd,
  onMouseMove,
  showLines = true,
  // Filter props
  selectedAttackType = "all",
  selectedSeverity = "all",
}) => {
  return (
    <div 
      style={{ 
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      onMouseMove={onMouseMove}
      onMouseUp={isDragging ? handleDragEnd : undefined}
    >
      <ComposableMap
        key={resetKey}
        projection="geoEqualEarth"
        projectionConfig={{
          scale: calculateScale(),
          center: [0, 0],
        }}
        width={windowDimensions.width}
        height={windowDimensions.height}
        style={{ 
          width: "100%", 
          height: "100%",
          display: "block",
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        <ZoomableGroup
          // Allow zooming out beyond initial view (like Google Maps)
          minZoom={0.3}
          // High zoom level for detailed view
          maxZoom={15}
          // Smooth zoom sensitivity (similar to Google Maps)
          zoomSensitivity={0.3}
          // Allow extensive panning
          translateExtent={[
            [-2000, -1000],
            [windowDimensions.width + 2000, windowDimensions.height + 1000],
          ]}
          // Smooth zoom transitions
          filterZoomEvent={(evt) => {
            // Allow all zoom events (wheel, touch, etc.)
            return true;
          }}
        >
          {/* Countries with Nice Colors */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColor(geo)}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: getCountryColor(geo),
                      stroke: "rgba(255, 255, 255, 0.2)",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: "#ffffff",
                      stroke: "rgba(255, 255, 255, 0.5)",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
                    },
                    pressed: {
                      fill: "#00ff88",
                      stroke: "rgba(0, 255, 136, 0.8)",
                      strokeWidth: 1.5,
                      outline: "none",
                      filter: "drop-shadow(0 0 12px rgba(0, 255, 136, 0.8))",
                    },
                  }}
                  onClick={(event) => onCountryClick(geo, event)}
                  onMouseEnter={(event) => onCountryHover(geo, event)}
                  onMouseLeave={onMouseLeave}
                />
              ))
            }
          </Geographies>


          {/* Drag Lines */}
          <DragLines
            isDragging={isDragging}
            dragStart={dragStart}
            showLines={showLines}
          />

          {/* Cyber Attack Markers */}
          <CyberAttackMarkers 
            onMarkerClick={onMarkerClick} 
            onDragStart={onDragStart}
            onDragEnd={handleDragEnd}
            isDragging={isDragging}
            selectedAttackType={selectedAttackType}
            selectedSeverity={selectedSeverity}
          />

          {/* Real-time Attack Data */}
          <RealTimeData />
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
