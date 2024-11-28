"use client";

import React from "react";
import styles from "./DynamicBackground.module.css";

interface DynamicBackgroundProps {
  backgroundImage: string | null; // 背景图片地址
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundImage }) => {
  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <div className={styles.overlay}></div> {/* 毛玻璃遮罩层 */}
    </div>
  );
};

export default DynamicBackground;
