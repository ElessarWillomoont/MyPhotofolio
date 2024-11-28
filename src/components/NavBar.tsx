//src/components/NavBar.tsx

"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, Offcanvas, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useAppLanguage } from '../context/LanguageContext';
import Link from 'next/link';  // 引入 Next.js 的 Link 组件

const NavBar: React.FC = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { getTranslations } = useAppLanguage();
  const offcanvasWidth = 250;

  const defaultTranslations = useMemo(() => ({
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact"
  }), []);

  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('/components/NavBar', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [defaultTranslations, getTranslations]);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>
      <Navbar expand="md" className={`d-none d-md-flex ${styles.fixedNav}`}>
        <Nav className="flex-column text-center">
          <Link href="/" legacyBehavior>
            <a className="nav-link">{translations.home}</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="nav-link">{translations.about}</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="nav-link">{translations.services}</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="nav-link">{translations.contact}</a>
          </Link>
        </Nav>
      </Navbar>

      <button
        className={`d-md-none ${styles.hamburgerButton} ${showOffcanvas ? styles.hamburgerButtonShift : ''}`}
        onClick={toggleOffcanvas}
        style={{ right: showOffcanvas ? `${offcanvasWidth}px` : '0px' }}
      >
        ☰
      </button>

      <Offcanvas
        show={showOffcanvas}
        onHide={toggleOffcanvas}
        placement="end"
        style={{ width: `${offcanvasWidth}px`, zIndex: 1040 }}
        className={styles.customOffcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{translations.language}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link href="/" legacyBehavior>
              <a className="nav-link" onClick={toggleOffcanvas}>{translations.home}</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="nav-link" onClick={toggleOffcanvas}>{translations.about}</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className="nav-link" onClick={toggleOffcanvas}>{translations.services}</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="nav-link" onClick={toggleOffcanvas}>{translations.contact}</a>
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
