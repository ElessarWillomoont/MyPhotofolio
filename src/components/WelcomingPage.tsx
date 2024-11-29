"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppLanguage } from "../context/LanguageContext";
import styles from "./WelcomingPage.module.css";
import Image from "next/image";
import signatureSVG from "../public/images/signature.svg";

interface WelcomingPageProps {
    fadeInDuration?: number; // 淡入效果持续时间，单位为毫秒
}

const WelcomingPage: React.FC<WelcomingPageProps> = ({ fadeInDuration = 1000 }) => {
    const { language, getTranslations } = useAppLanguage();
    const [translations, setTranslations] = useState<{ [key: string]: string }>({
        welcomeMessage: "Welcome!",
        scrollDown: "Scroll Down",
        clickToStart: "Click to Start",
    });

    const [isDrawingComplete, setIsDrawingComplete] = useState(false); // 是否完成显示
    const [hasUserClicked, setHasUserClicked] = useState(false); // 用户是否点击开始动画
    const [isOverlayVisible, setIsOverlayVisible] = useState(false); // 控制毛玻璃背景显示
    const containerRef = useRef<HTMLDivElement>(null);

    // 加载翻译内容
    useEffect(() => {
        const loadTranslations = async () => {
            const loadedTranslations = await getTranslations(
                "/components/WelcomingPage",
                translations
            );
            setTranslations(loadedTranslations);
        };
        loadTranslations();
    }, [getTranslations, language, translations]);

    // 淡入签名逻辑
    const fadeInSignature = () => {
        setTimeout(() => {
            setIsDrawingComplete(true);
        }, fadeInDuration); // 动画完成后更新状态
    };

    // 用户点击事件
    const handleUserClick = () => {
        if (!hasUserClicked) {
            setHasUserClicked(true); // 设置用户已点击
            setIsOverlayVisible(true); // 显示毛玻璃背景
            fadeInSignature(); // 开始淡入
        } else if (!isDrawingComplete) {
            setIsDrawingComplete(true); // 跳过动画
        }
    };

    return (
        <div className={styles.container} ref={containerRef} onClick={handleUserClick}>
            {/* 毛玻璃背景覆盖层 */}
            <div
                className={`${styles.backgroundOverlay} ${
                    isOverlayVisible ? styles.visible : ""
                }`}
            ></div>
            {!hasUserClicked && (
                <div className={styles.clickToStart}>
                    {translations.clickToStart} {/* 点击提示 */}
                </div>
            )}
            {hasUserClicked && (
                <>
                    <Image
                        src={signatureSVG}
                        alt="Signature"
                        className={`${styles.signature} ${
                            isDrawingComplete ? styles.fadeInComplete : ""
                        }`}
                        id="signatureSVG"
                    />
                    {isDrawingComplete && (
                        <>
                            <div className={styles.welcomeMessage}>{translations.welcomeMessage}</div>
                            <div className={styles.scrollDown}>{translations.scrollDown}</div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default WelcomingPage;
