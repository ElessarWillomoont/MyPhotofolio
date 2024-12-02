"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar, Offcanvas, Nav } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { useAppLanguage } from "../context/LanguageContext";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { getTranslations } = useAppLanguage();
  const offcanvasWidth = 250;

  // 统一定义导航项
  const navItems = useMemo(
    () => [
      { href: "/", key: "home" },
      { href: "/about", key: "about" },
      // { href: "/services", key: "services" },
      // { href: "/contact", key: "contact" },
    ],
    []
  );

  const defaultTranslations = useMemo(() => {
    return navItems.reduce((acc, item) => {
      acc[item.key] = item.key.charAt(0).toUpperCase() + item.key.slice(1); // 默认翻译为首字母大写
      return acc;
    }, {} as { [key: string]: string });
  }, [navItems]);

  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations("/components/NavBar", defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [defaultTranslations, getTranslations]);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>
      {/* 主导航栏 */}
      <Navbar expand="md" className={`d-none d-md-flex ${styles.customFixedNav}`}>
        <Nav className={`flex-column text-center ${styles.customNav}`}>
          {navItems.map((item) => (
            <Link href={item.href} legacyBehavior key={item.key}>
              <a className={`nav-link ${styles.customNavLink}`}>{translations[item.key]}</a>
            </Link>
          ))}
        </Nav>
      </Navbar>

      {/* 汉堡菜单按钮 */}
      <button
        className={`d-md-none ${styles.hamburgerButton} ${showOffcanvas ? styles.hamburgerButtonShift : ""}`}
        onClick={toggleOffcanvas}
        style={{ right: showOffcanvas ? `${offcanvasWidth}px` : "0px" }}
      >
        ☰
      </button>

      {/* 侧边导航栏 */}
      <Offcanvas
        show={showOffcanvas}
        onHide={toggleOffcanvas}
        placement="end"
        style={{ width: `${offcanvasWidth}px`, zIndex: 1040 }}
        className={styles.customOffcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className={`flex-column ${styles.customNav}`}>
            {navItems.map((item) => (
              <Link href={item.href} legacyBehavior key={item.key}>
                <a className={`nav-link ${styles.customNavLink}`} onClick={toggleOffcanvas}>
                  {translations[item.key]}
                </a>
              </Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
