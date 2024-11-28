"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, Offcanvas, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useAppLanguage } from '../context/LanguageContext';
import Link from 'next/link';

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
      {/* 导航栏 */}
      <Navbar expand="md" className={`d-none d-md-flex ${styles.customFixedNav}`}>
        <Nav className={`flex-column text-center ${styles.customNav}`}>
          <Link href="/" legacyBehavior>
            <a className={`nav-link ${styles.customNavLink}`}>{translations.home}</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className={`nav-link ${styles.customNavLink}`}>{translations.about}</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className={`nav-link ${styles.customNavLink}`}>{translations.services}</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className={`nav-link ${styles.customNavLink}`}>{translations.contact}</a>
          </Link>
        </Nav>
      </Navbar>

      {/* 汉堡菜单按钮 */}
      <button
        className={`d-md-none ${styles.hamburgerButton} ${showOffcanvas ? styles.hamburgerButtonShift : ''}`}
        onClick={toggleOffcanvas}
        style={{ right: showOffcanvas ? `${offcanvasWidth}px` : '0px' }}
      >
        ☰
      </button>

      {/* Offcanvas */}
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
          <Nav className={`flex-column ${styles.customNav}`}>
            <Link href="/" legacyBehavior>
              <a className={`nav-link ${styles.customNavLink}`} onClick={toggleOffcanvas}>
                {translations.home}
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className={`nav-link ${styles.customNavLink}`} onClick={toggleOffcanvas}>
                {translations.about}
              </a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className={`nav-link ${styles.customNavLink}`} onClick={toggleOffcanvas}>
                {translations.services}
              </a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className={`nav-link ${styles.customNavLink}`} onClick={toggleOffcanvas}>
                {translations.contact}
              </a>
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
