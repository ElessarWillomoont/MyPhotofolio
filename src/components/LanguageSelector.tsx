// src/components/LanguageSelector.tsx
"use client"

import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useAppLanguage } from '../context/LanguageContext';
import styles from './LanguageSelector.module.css'; // 引入样式

const LanguageSelector: React.FC = () => {
    const { setLanguage } = useAppLanguage();

    return (
        <div className={`${styles.languageSelector} position-fixed top-0 end-0 m-3`}>
            <ButtonGroup>
                <Button variant="link" className={`${styles.languageButton} d-none d-md-inline`} onClick={() => setLanguage('en')}>EN</Button>
                <span className={`${styles.divider} d-none d-md-inline`}></span>
                <Button variant="link" className={`${styles.languageButton} d-none d-md-inline`} onClick={() => setLanguage('fr')}>FR</Button>
                <span className={`${styles.divider} d-none d-md-inline`}></span>
                <Button variant="link" className={`${styles.languageButton} d-none d-md-inline`} onClick={() => setLanguage('zh')}>中</Button>

                {/* Mobile friendly dropdown or smaller button version */}
                <div className="d-md-none">
                    <Button variant="link" className={styles.languageButton} onClick={() => setLanguage('en')}>EN</Button>
                    <Button variant="link" className={styles.languageButton} onClick={() => setLanguage('fr')}>FR</Button>
                    <Button variant="link" className={styles.languageButton} onClick={() => setLanguage('zh')}>中</Button>
                </div>
            </ButtonGroup>
        </div>
    );
};

export default LanguageSelector;
