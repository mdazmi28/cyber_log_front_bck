import React from "react";

const MapStyles = () => {
  return (
    <style jsx>{`
      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.1);
        }
      }

      @keyframes ping {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        75%,
        100% {
          opacity: 0;
          transform: scale(1.5);
        }
      }

      /* Target-specific animations */
      @keyframes targetPulse {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.8;
          transform: scale(1.2);
        }
      }

      @keyframes targetPing {
        0% {
          opacity: 0.8;
          transform: scale(1);
        }
        75%,
        100% {
          opacity: 0;
          transform: scale(2);
        }
      }

      /* Drag line animations */
      @keyframes lineFlow {
        0% {
          stroke-dashoffset: 0;
        }
        100% {
          stroke-dashoffset: 20;
        }
      }

      @keyframes cyberPulse {
        0%, 100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
      }

      @keyframes dataFlow {
        0% {
          stroke-dashoffset: 0;
          opacity: 0.8;
        }
        50% {
          opacity: 1;
        }
        100% {
          stroke-dashoffset: 40;
          opacity: 0.6;
        }
      }

      @keyframes dragPulse {
        0% {
          stroke-opacity: 0.6;
        }
        100% {
          stroke-opacity: 1;
        }
      }

      @keyframes targetGlow {
        0% {
          stroke-opacity: 0.4;
          transform: scale(1);
        }
        100% {
          stroke-opacity: 0.8;
          transform: scale(1.1);
        }
      }
    `}</style>
  );
};

export default MapStyles;
