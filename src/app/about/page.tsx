"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "../../context/LanguageContext";
import styles from "./AboutPage.module.css";
import LanguageSelector from "../../components/LanguageSelector";
import NavBar from "../../components/NavBar";

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
                content: "Worked as a Test Engineer specializing in photovoltaic laboratory testing.",
            },
            {
                year: "2022",
                title: "Transferred to TÜV Rheinland Yangtze River Delta Center",
                content: "Supported laboratory expansion and operational setup in Suzhou.",
            },
            {
                year: "2023 September",
                title: "Started MS in Creative Technology at ESILV",
                content: "Focused on project-based learning in AI and prototyping.",
            },
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
            {/* 自我介绍 */}
            <div className={styles["custom-intro"]}>
                <h2>Self-Introduction</h2>
                <p>{translations.selfIntroduction}</p>
            </div>
            {/* 联系方式 */}
            <div className={styles["custom-contact"]}>
                <h3>Contact Information</h3>
                <pre>{translations.contact}</pre>
            </div>
            {/* 时间线 */}
            <div className={styles.timeline}>
                {translations.timeline
                    .slice()
                    .reverse()
                    .map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.timelineItem} ${
                                index % 2 === 0 ? styles.left : styles.right
                            }`}
                        >
                            <div className={styles.timelineTitle}>{item.year}</div>
                            <div className={styles.timelineContent}>
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
