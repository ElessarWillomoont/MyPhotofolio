"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar, Offcanvas, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';
import { useAppLanguage } from '../context/LanguageContext';

const NavBar: React.FC = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { language, setLanguage, getTranslations } = useAppLanguage();
  const offcanvasWidth = 250;

  // 默认翻译内容
  // 使用 useMemo 包装默认翻译内容，以避免在每次渲染时重新创建
  const defaultTranslations = useMemo(() => ({
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    language: "Language"
  }), []);

  // 初始化翻译内容状态
  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  // 加载 NavBar 的翻译文件
  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('components/NavBar', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [defaultTranslations, getTranslations, language]);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>
      {/* 宽屏时的右侧固定导航栏 */}
      <Navbar expand="md" className={`d-none d-md-flex ${styles.fixedNav}`}>
        <Nav className="flex-column text-center">
          <Nav.Link href="#home">{translations.home}</Nav.Link>
          <Nav.Link href="#about">{translations.about}</Nav.Link>
          <Nav.Link href="#services">{translations.services}</Nav.Link>
          <Nav.Link href="#contact">{translations.contact}</Nav.Link>
        </Nav>
      </Navbar>

      {/* 窄屏时的汉堡菜单按钮 */}
      <button
        className={`d-md-none ${styles.hamburgerButton} ${showOffcanvas ? styles.hamburgerButtonShift : ''}`}
        onClick={toggleOffcanvas}
        style={{ right: showOffcanvas ? `${offcanvasWidth}px` : '0px' }}
      >
        ☰
      </button>

      {/* Offcanvas 侧边栏 */}
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
            <Nav.Link href="#home" onClick={toggleOffcanvas}>{translations.home}</Nav.Link>
            <Nav.Link href="#about" onClick={toggleOffcanvas}>{translations.about}</Nav.Link>
            <Nav.Link href="#services" onClick={toggleOffcanvas}>{translations.services}</Nav.Link>
            <Nav.Link href="#contact" onClick={toggleOffcanvas}>{translations.contact}</Nav.Link>
            <hr />
            {/* 语言切换选项 */}
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
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
