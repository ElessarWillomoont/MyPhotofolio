"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./Footer.module.css";
import { useAppLanguage } from "../context/LanguageContext";
import { StaticImageData } from "next/image";

interface FooterProps {
  backgroundImage?: StaticImageData; // Optional background image
  backgroundColor?: string; // Optional background color
}

const Footer: React.FC<FooterProps> = ({ backgroundImage, backgroundColor = "#333" }) => {
  const { language, getTranslations } = useAppLanguage();

  const defaultTranslations = useMemo(
    () => ({
      lastUpdated: "Last updated at 29/Nov/2024", // Default text
    }),
    []
  );

  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    defaultTranslations
  );

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations(
        "/components/Footer",
        defaultTranslations
      );
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, language, defaultTranslations]);

  return (
    <div
      className={`${styles.footerContainer} ${!backgroundImage ? styles.defaultBackground : ""}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage.src})` : undefined,
        backgroundColor: backgroundImage ? undefined : backgroundColor,
      }}
    >
      {translations.lastUpdated}
    </div>
  );
};

export default Footer;
