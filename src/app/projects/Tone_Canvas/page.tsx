"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "../../../context/LanguageContext"; // Context for translations
import NavBar from "../../../components/NavBar"; // Navigation Bar
import styles from "./ProjectPage.module.css"; // CSS module

const ToneCanvasPage: React.FC = () => {
  const { getTranslations } = useAppLanguage();

  // Default translations with structured sections
  const defaultTranslations: any = useMemo(() => ({
    title: "Tone Canvas: An Interactive Learning Tool",
    description: "Learning tones and intonation is both crucial and challenging for language learners.",
    sections: {
      contextAndBackground: {
        title: "Context and Background",
        content: "The study of tones and intonation plays a critical role in language learning. Tone Canvas combines multimodal learning theories with interactive tools to reduce cognitive load and improve language acquisition outcomes.",
      },
      problemStatement: {
        title: "Problem Statement and Motivation",
        content: "This project addresses challenges in tone learning by applying cognitive load theory and multimodal input techniques, including visual guides, auditory feedback, and gesture-based interactions.",
      },
      contribution: {
        title: "My Contribution",
        content: "My main contribution to this project is building a robust cross-platform system architecture that supports interactive, multimodal learning. This includes the development of gesture-based input handling, real-time visual feedback, and device compatibility.",
      },
    },
    skills: ["React", "Next.js", "TypeScript", "Multimodal Interaction"],
  }), []);

  // UseState with `any` type to bypass type checks
  const [translations, setTranslations] = useState<any>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations(
        "/pages/projects/tone_canvas",
        defaultTranslations
      );
      console.log("Loaded translations:", loadedTranslations); // Log the loaded translations
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, defaultTranslations]);

  useEffect(() => {
    console.log("Current translations:", translations); // Log the current translations on every update
  }, [translations]);

  return (
    <div className={styles.projectPage}>
      <NavBar />
      <header className={styles.header}>
        <h1>{translations.title}</h1>
        <div className={styles.skills}>
          {Array.isArray(translations.skills.list) ? (
            translations.skills.list.map((skill: string, index: number) => (
              <span key={index} className={styles.skillTag}>
                {skill}
              </span>
            ))
          ) : (
            <p>Skills data is missing or invalid.</p> // Handle missing or invalid skills
          )}
        </div>

      </header>
      <main className={styles.content}>
        <section className={styles.intro}>
          <p>{translations.description}</p>
        </section>
        {Object.entries(translations.sections).map(([key, section]: [string, any]) => (
          <section key={key} className={styles.section}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ToneCanvasPage;
