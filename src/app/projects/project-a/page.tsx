// pages/project-a.tsx
"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAppLanguage } from '../../../context/LanguageContext';
import styles from './ProjectPage.module.css';

const ProjectAPage: React.FC = () => {
  const { getTranslations } = useAppLanguage();
  
  const defaultTranslations = useMemo(() => ({
    title: "Project A",
    description: "Description of Project A..."
  }), []);

  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('/pages/project-a', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, defaultTranslations]);

  return (
    <div className={styles.projectPage}>
      <h1>{translations.title}</h1>
      <p>{translations.description}</p>
    </div>
  );
};

export default ProjectAPage;
