import React, { useState, useCallback, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ControlBar from "./ControlBar";
import Tooltip from "./Tooltip";
import WorldMap from "./WorldMap";
import MapStyles from "./MapStyles";
import AnalyticsSidebar from "./AnalyticsSidebar";
import CyberHeader from "./CyberHeader";
import IPAnalytics from "./IPAnalytics";
import AttackTypeSidebar from "./AttackTypeSidebar";
import "./AnalyticsSidebar.css";

const FullScreenWorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [resetKey, setResetKey] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // Drag line states
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [showLines] = useState(true);
  
  // Filter states
  const [selectedAttackType, setSelectedAttackType] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  
  // Sidebar toggle state
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate proper scale based on screen size and sidebar visibility
  const calculateScale = () => {
    const baseScale = Math.min(
      windowDimensions.width / 4.5,
      windowDimensions.height / 2.5
    );
    const minScale = Math.max(baseScale, 350);
    
    // Make map more zoomed out when sidebar is off
    return sidebarVisible ? minScale : minScale * 0.9;
  };

  // Handle country click
  const handleCountryClick = useCallback((geo) => {
    const countryName = geo.properties.NAME || geo.properties.name || "Unknown";

    setSelectedCountry({
      name: countryName,
      id: geo.properties.ISO_A3 || geo.rsmKey,
    });
  }, []);

  // Handle country hover
  const handleCountryHover = useCallback((geo, event) => {
    const countryName = geo.properties.NAME || geo.properties.name || "Unknown";
    setHoveredCountry(geo.rsmKey);
    setTooltipContent(`${countryName}`);
    setShowTooltip(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    setShowTooltip(false);
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback(
    (attack) => {
      setSelectedCountry({
        name: attack.country,
        type: "Cyber Attack",
        attackType: attack.attackType,
        severity: attack.severity,
        attacks: attack.attacks,
      });
    },
    []
  );


  // Reset function
  const handleResetZoom = useCallback(() => {
    setSelectedCountry(null);
    setHoveredCountry(null);
    setShowTooltip(false);
    setResetKey((prev) => prev + 1);
  }, []);


  // Drag line handlers
  const handleDragStart = useCallback((coordinates) => {
    setIsDragging(true);
    setDragStart(coordinates);
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (isDragging) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  }, [isDragging]);


  // Filter handlers
  const handleAttackTypeFilter = useCallback((attackType) => {
    setSelectedAttackType(attackType);
  }, []);

  const handleSeverityFilter = useCallback((severity) => {
    setSelectedSeverity(severity);
  }, []);

  // Sidebar toggle handler
  const handleToggleSidebar = useCallback(() => {
    setSidebarVisible(prev => !prev);
  }, []);


  // Get country color based on state
  const getCountryColor = (geo) => {
    if (
      selectedCountry &&
      selectedCountry.name === (geo.properties.NAME || geo.properties.name)
    ) {
      return "#00ff88";
    }
    if (hoveredCountry === geo.rsmKey) {
      return "#00d4ff";
    }
    return "rgba(255, 255, 255, 0.1)";
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "r":
        case "R":
          event.preventDefault();
          handleResetZoom();
          break;
        case "Escape":
          setSelectedCountry(null);
          if (isDragging) {
            handleDragEnd();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleResetZoom, isDragging, handleDragEnd]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        zIndex: 999,
        overflow: "hidden",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        display: "flex",
        flexDirection: "row"
      }}
    >
      {/* Cyber Header - Only show when sidebar is closed */}
      {!sidebarVisible && <CyberHeader />}

      {/* Standalone Hamburger Menu - positioned on sidebar edge */}
      <button
        onClick={handleToggleSidebar}
        style={{
          position: "absolute",
          top: "50%",
          right: sidebarVisible ? "25%" : "20px",
          transform: "translateY(-50%)",
          zIndex: 1001,
          background: "rgba(0, 212, 255, 0.1)",
          border: "1px solid rgba(0, 212, 255, 0.3)",
          borderRadius: "8px 0 0 8px",
          padding: "12px 8px",
          cursor: "pointer",
          color: "#00d4ff",
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "rgba(0, 212, 255, 0.2)";
          e.target.style.boxShadow = "0 4px 12px rgba(0, 212, 255, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "rgba(0, 212, 255, 0.1)";
          e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
        }}
      >
        {sidebarVisible ? (
          <HiX 
            size={24} 
            color="#ff0000" 
            style={{
              filter: "drop-shadow(0 0 6px rgba(255, 0, 0, 0.5))",
              transition: "all 0.3s ease"
            }}
          />
        ) : (
          <HiMenu 
            size={24} 
            color="#ffffff" 
            style={{
              transition: "all 0.3s ease"
            }}
          />
        )}
      </button>

      {/* Map Container - responsive width based on sidebar visibility */}
      <div style={{ 
        width: sidebarVisible ? "75%" : "100%", 
        height: "100vh", 
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
        transition: "all 0.3s ease",
        zIndex: 1
      }}>
        <div style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>


          <Tooltip
            show={showTooltip}
            content={tooltipContent}
            position={mousePosition}
          />

          <WorldMap
            windowDimensions={windowDimensions}
            calculateScale={calculateScale}
            resetKey={resetKey}
            onCountryClick={handleCountryClick}
            onCountryHover={handleCountryHover}
            onMouseLeave={handleMouseLeave}
            onMarkerClick={handleMarkerClick}
            getCountryColor={getCountryColor}
            // Drag line props
            isDragging={isDragging}
            dragStart={dragStart}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            showLines={showLines}
            // Filter props
            selectedAttackType={selectedAttackType}
            selectedSeverity={selectedSeverity}
          />

          <MapStyles />

          {/* IP Analytics Info - Only show when sidebar is off */}
          {!sidebarVisible && (
            <IPAnalytics selectedCountry={selectedCountry} />
          )}

          {/* Attack Type Sidebar - Only show when sidebar is off */}
          {!sidebarVisible && (
            <AttackTypeSidebar selectedCountry={selectedCountry} />
          )}
        </div>
      </div>

      {/* Sidebar Container - conditional rendering with animation */}
      <div style={{ 
        width: sidebarVisible ? "25%" : "0%", 
        height: "100vh", 
        flexShrink: 0,
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        transition: "all 0.3s ease",
        opacity: sidebarVisible ? 1 : 0,
        transform: sidebarVisible ? "translateX(0)" : "translateX(100%)"
      }}>
        <AnalyticsSidebar
          selectedCountry={selectedCountry}
          selectedAttackType={selectedAttackType}
          onAttackTypeFilter={handleAttackTypeFilter}
          selectedSeverity={selectedSeverity}
          onSeverityFilter={handleSeverityFilter}
        />
      </div>
    </div>
  );
};

export default FullScreenWorldMap;
