"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAppLanguage } from '../context/LanguageContext'; // Import useAppLanguage
import styles from './MainPage.module.css'; // Import CSS module

const MainPage: React.FC = () => {
  const { language, getTranslations } = useAppLanguage();
  
  // Default translation content
  const defaultTranslations = useMemo(() => ({
    greeting: "Hi, This is Main Page",
    message: "Hello World!"
  }), []);

  // Initialize translation content state
  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  // Load MainPage's translation file
  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('/components/MainPage', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [defaultTranslations, getTranslations, language]);

  return (
    <div className={styles.mainContainer}>
      {/* Main page content */}
      <h1>{translations.greeting}</h1>
      <pre className={styles.preText}>{translations.message}</pre> {/* Use local class names */}
    </div>
  );
};

export default MainPage;
