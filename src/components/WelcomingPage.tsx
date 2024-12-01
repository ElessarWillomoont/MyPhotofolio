"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppLanguage } from "../context/LanguageContext";
import styles from "./WelcomingPage.module.css";
import Image from "next/image";
import signatureSVG from "../public/images/signature.svg";

interface WelcomingPageProps {
    fadeInDuration?: number; // Duration of the fade-in effect, in milliseconds
}

const WelcomingPage: React.FC<WelcomingPageProps> = ({ fadeInDuration = 1000 }) => {
    const { language, getTranslations } = useAppLanguage();
    const [translations, setTranslations] = useState<{ [key: string]: string }>({
        welcomeMessage: "Welcome!",
        scrollDown: "Scroll Down",
        clickToStart: "Click to Start",
    });

    const [isDrawingComplete, setIsDrawingComplete] = useState(false); // Whether the drawing is complete
    const [hasUserClicked, setHasUserClicked] = useState(false); // Whether the user has clicked to start the animation
    const [isOverlayVisible, setIsOverlayVisible] = useState(false); // Controls the visibility of the frosted glass background
    const containerRef = useRef<HTMLDivElement>(null);

    // Load translation content
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

    // Fade-in signature logic
    const fadeInSignature = () => {
        setTimeout(() => {
            setIsDrawingComplete(true);
        }, fadeInDuration); // Update state after animation completes
    };

    // User click event
    const handleUserClick = () => {
        if (!hasUserClicked) {
            setHasUserClicked(true); // Set the user as clicked
            setIsOverlayVisible(true); // Show the frosted glass background
            fadeInSignature(); // Start fade-in
        } else if (!isDrawingComplete) {
            setIsDrawingComplete(true); // Skip the animation
        }
    };

    return (
        <div className={styles.container} ref={containerRef} onClick={handleUserClick}>
            {/* Frosted glass background overlay */}
            <div
                className={`${styles.backgroundOverlay} ${
                    isOverlayVisible ? styles.visible : ""
                }`}
            ></div>
            {!hasUserClicked && (
                <div className={styles.clickToStart}>
                    {translations.clickToStart} {/* Click to start prompt */}
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
