// src/components/DynamicBackground.tsx
"use client";

import React from "react";
import styles from "./DynamicBackground.module.css";

interface DynamicBackgroundProps {
  backgroundImage: string | null;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundImage }) => {
  return (
    <div
      className={styles.dynamicBackground}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};

export default DynamicBackground;
