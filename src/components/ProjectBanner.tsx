"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProjectBanner.module.css";
import { useAppLanguage } from "../context/LanguageContext"; // 导入多语言支持逻辑
import defaultBackground from "../public/images/project_banner.jpg";
import { StaticImageData } from "next/image";

interface ProjectBannerProps {
    backgroundImage?: StaticImageData; // 背景图片为可选项，默认为静态图片
  }
  
  const ProjectBanner: React.FC<ProjectBannerProps> = ({ backgroundImage = defaultBackground }) => {
    const { language, getTranslations } = useAppLanguage();
  
    const defaultTranslations = useMemo(
      () => ({
        title: "My Project",
      }),
      []
    );
  
    const [translations, setTranslations] = useState<{ [key: string]: string }>(
      defaultTranslations
    );
  
    useEffect(() => {
      const loadTranslations = async () => {
        const loadedTranslations = await getTranslations(
          "/components/ProjectBanner",
          defaultTranslations
        );
        setTranslations(loadedTranslations);
      };
      loadTranslations();
    }, [getTranslations, language, defaultTranslations]);
  
    return (
      <div
        className={styles.bannerContainer}
        style={{
          backgroundImage: `url(${backgroundImage.src})`, // 使用静态导入图片的路径
        }}
      >
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerText}>{translations.title}</div>
      </div>
    );
  };
  
  export default ProjectBanner;