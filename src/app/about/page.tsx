"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "../../context/LanguageContext";
import styles from "./AboutPage.module.css";
import LanguageSelector from "../../components/LanguageSelector";
import NavBar from "../../components/NavBar";
import ButtonGroup from "../../components/ButtonGroup"; // Import ButtonGroup component
import svgLinkedIn from "../../public/icons/linkedin.svg"
import svgGithub from "../../public/icons/github.svg"

const AboutPage: React.FC = () => {
    const { language, getTranslations } = useAppLanguage();

    const defaultTranslations = useMemo<any>(() => ({
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



    const buttons = [
        { svg: svgLinkedIn, link: "https://github.com/ElessarWillomoont" },
        { svg: svgGithub, link: "https://www.linkedin.com/in/yedong-wu-aa8b7a2a9/" },
      ];

    const [translations, setTranslations] = useState(defaultTranslations);

    useEffect(() => {
        const loadTranslations = async () => {
            const loadedTranslations = await getTranslations("/components/AboutPage", defaultTranslations);
            
            // 检查 timeline 数据的类型，并确保数据结构正确
            const processedTranslations = {
                ...defaultTranslations,
                ...loadedTranslations,
                timeline: Array.isArray(loadedTranslations.timeline)
                    ? loadedTranslations.timeline.map((item: any) => ({
                          year: item.year || "",
                          title: item.title || "",
                          content: item.content || "",
                      }))
                    : defaultTranslations.timeline,
            };
            
            setTranslations(processedTranslations);
        };
        loadTranslations();
    }, [defaultTranslations, getTranslations, language]);

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
                    .map(
                        (
                            item: {
                                year: string | number | bigint | boolean | React.ReactNode;
                                title: string | number | bigint | boolean | React.ReactNode;
                                content: string | number | bigint | boolean | React.ReactNode;
                            },
                            index: React.Key | null | undefined
                        ) => {
                            // 显式转换 index 为数字类型
                            const numericIndex = Number(index);

                            return (
                                <div
                                    key={numericIndex} // 使用转换后的数字作为 key
                                    className={`${styles.timelineItem} ${
                                        numericIndex % 2 === 0 ? styles.left : styles.right
                                    }`}
                                >
                                    <div className={styles.timelineTitle}>{item.year}</div>
                                    <div className={styles.timelineContent}>
                                        <strong>{item.title}</strong>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                            );
                        }
                    )}
            </div>
            <footer className={styles.footer}>
                <ButtonGroup buttons={buttons} maxButtonsPerRow={2} buttonSize="60px" />
            </footer>
        </div>
);
};

export default AboutPage;
