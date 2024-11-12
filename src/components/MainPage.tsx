"use client";

import React, { useEffect, useState } from 'react';
import { useAppLanguage } from '../context/LanguageContext'; // 导入 useAppLanguage
import styles from './MainPage.module.css'; // 引入CSS模块

const MainPage: React.FC = () => {
  const { language, getTranslations } = useAppLanguage();
  
  // 默认翻译内容
  const defaultTranslations = {
    greeting: "Hi, This is Main Page",
    message: "Hello World!"
  };

  // 初始化翻译内容状态
  const [translations, setTranslations] = useState<{ [key: string]: string }>(defaultTranslations);

  // 加载 MainPage 的翻译文件
  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations('/components/MainPage', defaultTranslations);
      setTranslations(loadedTranslations);
    };
    loadTranslations();
  }, [defaultTranslations, getTranslations, language]);

  return (
    <div className={styles.mainContainer}>
      {/* 主页面内容 */}
      <h1>{translations.greeting}</h1>
      <pre className={styles.preText}>{translations.message}</pre> {/* 使用本地类名 */}
    </div>
  );
};

export default MainPage;
