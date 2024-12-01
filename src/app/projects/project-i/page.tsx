// pages/project-a.tsx
"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useAppLanguage } from '../../../context/LanguageContext';
import styles from './ProjectPage.module.css';
import LanguageSelector from '../../../components/LanguageSelector'; 
import NavBar from '../../../components/NavBar';

const ProjectAPage: React.FC = () => {
  const { getTranslations } = useAppLanguage();
  
  const defaultTranslations = useMemo(() => ({
    title: "Project A",
    description: "Description of Project A..."
  }), []);

  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('/pages/projects/project-b', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, defaultTranslations]);

  return (
    <div className={styles.projectPage}>
      <LanguageSelector /> 
      <NavBar />
      <h1>{translations.title}</h1>
      <p>{translations.description}</p>
    </div>
  );
};

export default ProjectAPage;
