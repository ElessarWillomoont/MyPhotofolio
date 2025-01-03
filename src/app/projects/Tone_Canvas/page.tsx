"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "../../../context/LanguageContext"; // Context for translations
import NavBar from "../../../components/NavBar"; // Navigation Bar
import styles from "./ProjectPage.module.css"; // CSS module
import LanguageSelector from "../../../components/LanguageSelector";
import Image from "next/image"; // Import the Next.js Image component

// Import images
import backgroundImg from "../../../public/images/projects/Tone_canvas.jpg";
import avatarImg from "../../../public/images/project_header/Tone_Canvas.jpg";

const ToneCanvasPage: React.FC = () => {
  const { getTranslations } = useAppLanguage();

  // Default translations with structured sections
  const defaultTranslations: any = useMemo(() => ({
    title: "Tone Canvas: An Interactive Learning Tool",
    description: "Learning tones and intonation is both crucial and challenging for language learners.",
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
    skills: {
      list: ["React", "Next.js", "TypeScript", "Multimodal Interaction"],
    },
  }), []);

  const [translations, setTranslations] = useState<any>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations(
        "/pages/projects/tone_canvas",
        defaultTranslations
      );
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [getTranslations, defaultTranslations]);

  return (
    <div className={styles.projectPage}>
      <NavBar />
      <LanguageSelector />
      <div className={styles.heroSection}>
        <Image
          src={backgroundImg}
          alt="Background"
          className={styles.backgroundImage}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.avatarContainer}>
        <Image
          src={avatarImg}
          alt="Avatar"
          className={styles.avatar}
          width={120}
          height={120}
        />
      </div>
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
            <p>Skills data is missing or invalid.</p>
          )}
        </div>
      </header>
      <div className={styles.projectContent}>
          {/* Example of displaying YouTube video */}
          <iframe
            className={styles.mediaContent}
            src="https://www.youtube.com/embed/qVom-iq-W1A"
            title="Tone Canvas"
            allowFullScreen
          ></iframe>
          {/* Example of displaying a static image */}
          {/* Uncomment the next block to test static images */}
          {/* <Image
            src={backgroundImg}
            alt="Project Content"
            className={styles.mediaContent}
            layout="responsive"
            objectFit="contain"
          /> */}
        </div>
      <main className={styles.content}>
        <section className={styles.intro}>
          <p>{translations.description}</p>
        </section>
        <section className={styles.section}>
          <h2>{translations.contextAndBackground.title}</h2>
          <p>{translations.contextAndBackground.content}</p>
        </section>

        <section className={styles.section}>
          <h2>{translations.problemStatement.title}</h2>
          <p>{translations.problemStatement.content}</p>
        </section>

        <section className={styles.section}>
          <h2>{translations.contribution.title}</h2>
          <p>{translations.contribution.content}</p>
        </section>
      </main>
    </div>
  );
};

export default ToneCanvasPage;
