"use client";

import React, { useEffect, useState } from "react";
import styles from "./DynamicBackground.module.css";

interface DynamicBackgroundProps {
  backgroundImage: string | null; // Background image URL
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundImage }) => {
  const [currentBackground, setCurrentBackground] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState<string>(styles.fadeIn); // Default display state

  useEffect(() => {
    if (backgroundImage !== currentBackground) {
      setAnimationState(styles.fadeOut); // Start fade-out animation
      const timer = setTimeout(() => {
        setCurrentBackground(backgroundImage); // Update the background image
        setAnimationState(styles.fadeIn); // Start fade-in animation
      }, 500); // Animation duration matches the CSS transition time

      return () => clearTimeout(timer); // Clear the previous timer to prevent multiple triggers
    }
  }, [backgroundImage, currentBackground]);

  return (
    <div
      className={`${styles.background} ${animationState}`}
      style={{
        backgroundImage: currentBackground ? `url(${currentBackground})` : undefined,
      }}
    >
      <div className={styles.overlay}></div> {/* Frosted glass overlay */}
    </div>
  );
};

export default DynamicBackground;
