"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "../../context/LanguageContext";
import styles from "./AboutPage.module.css";
import LanguageSelector from '../../components/LanguageSelector';
import NavBar from '../../components/NavBar';

const AboutPage: React.FC = () => {
    const { language, getTranslations } = useAppLanguage();

    const defaultTranslations = useMemo(() => ({
        selfIntroduction: "I'm a fifth-year ESILV engineering student focused on AI and cognitive science.",
        contact: "Email: yedong.wu@edu.devinci.fr / LinkedIn: https://linkedin.com/in/yedong-wu",
        timeline: [
            {
                year: "2016",
                title: "Entered Shanghai Institute of Technology",
                content: "Began studying Electrical Engineering and Automation.",
            },
            {
                year: "2018 August",
                title: "PLC Training at Siemens Headquarters, Nuremberg",
                content: "Focused on advanced PLC programming techniques and automation systems.",
            },
            {
                year: "2020",
                title: "Graduated and Joined TÜV Rheinland Group",
                content: "Began working as a Test Engineer in the photovoltaic laboratory, specializing in mechanical load, hail impact, hot-spot durability, and power curve testing.",
            },
            {
                year: "2022",
                title: "Transferred to TÜV Rheinland Yangtze River Delta Center",
                content: "Supported laboratory expansion and operational setup in Suzhou.",
            },
            {
                year: "2022 August - 2023",
                title: "Coordinated Laboratory Setup",
                content: "Managed communication and coordination during the construction of the Yangtze River Delta Center.",
            },
            {
                year: "2023 September",
                title: "Started MS in Creative Technology at ESILV",
                content: "Focused on project-based learning, covering areas such as AI, prototyping, PCB design, and coding.",
            },
            // {
            //     year: "2024",
            //     title: "Improving French Language Proficiency",
            //     content: "Began engaging with French-speaking communities to enhance language skills.",
            // },
        ],
    }), []);

    const [translations, setTranslations] = useState(defaultTranslations);

    useEffect(() => {
        const loadTranslations = async () => {
            const loadedTranslations = await getTranslations("/components/AboutPage", defaultTranslations);
            setTranslations(loadedTranslations);
        };
        loadTranslations();
    }, [getTranslations, defaultTranslations, language]);

    return (
        <div className={styles.aboutPage}>
            <NavBar />
            <LanguageSelector />
            <div className={styles["custom-timeline"]}>
                {translations.timeline
                    .slice()
                    .reverse()
                    .map((item, index) => (
                        <div
                            key={index}
                            className={`${styles["custom-timeline-item"]} ${
                                index % 2 === 0 ? styles.left : styles.right
                            }`}
                        >
                            <div className={styles["custom-timeline-title"]}>{item.year}</div>
                            <div className={styles["custom-timeline-content"]}>
                                <strong>{item.title}</strong>
                                <p>{item.content}</p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AboutPage;
