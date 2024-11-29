"use client";

import React, { useEffect, useState } from "react";
import styles from "./DynamicBackground.module.css";

interface DynamicBackgroundProps {
  backgroundImage: string | null; // 背景图片地址
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ backgroundImage }) => {
  const [currentBackground, setCurrentBackground] = useState<string | null>(null);
  const [animationState, setAnimationState] = useState<string>(styles.fadeIn); // 默认显示状态

  useEffect(() => {
    if (backgroundImage !== currentBackground) {
      setAnimationState(styles.fadeOut); // 开始淡出动画
      const timer = setTimeout(() => {
        setCurrentBackground(backgroundImage); // 更新背景图片
        setAnimationState(styles.fadeIn); // 开始淡入动画
      }, 500); // 动画时间与 CSS 过渡时间一致

      return () => clearTimeout(timer); // 清除之前的定时器，防止多次触发
    }
  }, [backgroundImage, currentBackground]);

  return (
    <div
      className={`${styles.background} ${animationState}`}
      style={{
        backgroundImage: currentBackground ? `url(${currentBackground})` : undefined,
      }}
    >
      <div className={styles.overlay}></div> {/* 毛玻璃遮罩层 */}
    </div>
  );
};

export default DynamicBackground;
