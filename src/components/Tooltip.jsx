import React from "react";

const Tooltip = ({ show, content, position }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: position.y - 50,
        left: position.x + 15,
        zIndex: 1001,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        pointerEvents: "none",
        backdropFilter: "blur(10px)",
      }}
    >
      {content}
    </div>
  );
};

export default Tooltip;
