"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppLanguage } from "../context/LanguageContext";
import styles from "./WelcomingPage.module.css";
import signatureSVGPath from "../public/images/signature.svg"; // 确保路径正确

console.log("Imported SVG Path:", signatureSVGPath);

interface WelcomingPageProps {
  drawDuration?: number; // 每个路径的绘制持续时间，单位为毫秒
}

const WelcomingPage: React.FC<WelcomingPageProps> = ({ drawDuration = 2000 }) => {
  const { language, getTranslations } = useAppLanguage();
  const [translations, setTranslations] = useState<{ [key: string]: string }>({
    welcomeMessage: "Welcome!",
    scrollDown: "Scroll Down",
    clickToStart: "Click to Start",
  });
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false); // 是否已开始绘制
  const containerRef = useRef<HTMLDivElement>(null);

  // 加载翻译内容
  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations(
        "/components/WelcomingPage",
        translations
      );
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, language, translations]);

  // 动态绘制签名
  const drawSignature = () => {
    const svgElement = document.getElementById("signatureSVG") as SVGSVGElement | null;
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }
    console.log("Signature drawing started.");

    const paths = svgElement.querySelectorAll("path");
    let totalDuration = 0;

    paths.forEach((path, index) => {
      const length = (path as SVGPathElement).getTotalLength();
      const pathElement = path as SVGPathElement;

      // 初始化 stroke 属性
      pathElement.style.strokeDasharray = `${length}`;
      pathElement.style.strokeDashoffset = `${length}`;
      pathElement.style.transition = "none";

      // 强制触发重绘
      void pathElement.getBoundingClientRect();

      // 设置动画属性
      pathElement.style.transition = `stroke-dashoffset ${
        drawDuration / paths.length
      }ms linear ${totalDuration}ms`;
      totalDuration += drawDuration / paths.length;

      // 设置动画结束状态
      setTimeout(() => {
        pathElement.style.strokeDashoffset = "0";
        if (index === paths.length - 1) {
          console.log("Signature drawing completed.");
          setIsDrawingComplete(true);
        }
      }, totalDuration);
    });
  };

  // 开始绘制
  const handleStartDrawing = () => {
    if (hasStartedDrawing) return; // 防止重复触发
    setHasStartedDrawing(true);
    drawSignature();
  };

  // 跳过动画
  const handleSkip = () => {
    setIsDrawingComplete(true);
    console.log("Animation skipped.");

    // 强制设置 SVG 完成状态
    const svgElement = document.getElementById("signatureSVG") as SVGSVGElement | null;
    if (svgElement) {
      const paths = svgElement.querySelectorAll("path");
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        const pathElement = path as SVGPathElement;

        pathElement.style.strokeDasharray = `${length}`;
        pathElement.style.strokeDashoffset = "0"; // 直接设置为完成状态
        pathElement.style.transition = "none"; // 取消动画
      });
    }
  };

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const containerHeight = containerRef.current?.offsetHeight || 1;
      if (scrollY > containerHeight * 0.3) {
        // 滚动超过30%，跳到下一部分
        window.scrollTo({ top: containerHeight, behavior: "smooth" });
      } else if (scrollY < containerHeight * 0.1) {
        // 返回顶部
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onClick={hasStartedDrawing && !isDrawingComplete ? handleSkip : undefined}
    >
      {!hasStartedDrawing && !isDrawingComplete && (
        <div className={styles.clickToStart} onClick={handleStartDrawing}>
          {translations.clickToStart}
        </div>
      )}
      {hasStartedDrawing && !isDrawingComplete && (
        <object
          data={signatureSVGPath}
          type="image/svg+xml"
          id="signatureSVG"
          className={styles.signature}
        />
      )}
      {isDrawingComplete && (
        <>
          <object
            data={signatureSVGPath}
            type="image/svg+xml"
            id="signatureSVG"
            className={styles.signature}
          />
          <div className={styles.welcomeMessage}>{translations.welcomeMessage}</div>
          <div className={styles.scrollDown}>{translations.scrollDown}</div>
        </>
      )}
    </div>
  );
};

export default WelcomingPage;
