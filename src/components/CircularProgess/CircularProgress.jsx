import React from "react";
import "./CircularProgress.css";

function CircularProgress({ value, max }) {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const progress = ((value / max) * 31) / 36;
  const strokeDashoffset = circumference * (1 - progress);
  const offset = circumference * ((360 - 310) / 360);

  //dot values
  const dotRadius = 3.5;
  const dotX = 100 + radius * Math.cos(2 * Math.PI * progress);
  const dotY = 100 + radius * Math.sin(2 * Math.PI * progress);
  const rotation = (strokeDashoffset / circumference) * 360;

  return (
    <svg width="224" height="224">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#7AD3FF", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#4FBAF0", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <circle
        stroke="#F0FAFF"
        fill="transparent"
        strokeWidth="25"
        r={radius}
        cx="100"
        cy="100"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(115, 100, 100)"
        strokeLinecap="round"
      />

      <circle
        className="progress-circle"
        stroke="url(#gradient)"
        fill="transparent"
        strokeWidth="25"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={radius}
        cx="100"
        cy="100"
        transform="rotate(115, 100, 100)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        
        cx={dotX}
        cy={dotY}
        r={dotRadius}
        fill="white"
        transform="rotate(115, 100, 100)"
      />
    </svg>
  );
}

export default CircularProgress;
