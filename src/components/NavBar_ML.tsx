// src/components/NavBar.tsx
"use client";

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useAppLanguage } from '../context/LanguageContext';

const NavBar: React.FC = () => {
  const { language, setLanguage, translations } = useAppLanguage();

  return (
    <>
      <Navbar expand="md" className={`d-none d-md-flex ${styles.fixedNav}`}>
        <Nav className="flex-column text-center">
          <Nav.Link href="#home">{translations.home}</Nav.Link>
          <Nav.Link href="#about">{translations.about}</Nav.Link>
          <Nav.Link href="#services">{translations.services}</Nav.Link>
          <Nav.Link href="#contact">{translations.contact}</Nav.Link>
        </Nav>
      </Navbar>

      <div className="text-center">
        <button onClick={() => setLanguage('en')} disabled={language === 'en'}>
          English
        </button>
        <button onClick={() => setLanguage('fr')} disabled={language === 'fr'}>
          Français
        </button>
        <button onClick={() => setLanguage('zh')} disabled={language === 'zh'}>
          中文
        </button>
      </div>
    </>
  );
};

export default NavBar;
