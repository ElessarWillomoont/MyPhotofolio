// src/context/LanguageContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../public/locales/en/common.json';
import fr from '../public/locales/fr/common.json';
import zh from '../public/locales/zh/common.json';

// 定义语言类型
type Language = 'en' | 'fr' | 'zh';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: { [key: string]: string };
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<{ [key: string]: string }>(en);

  // 根据当前语言加载翻译内容
  useEffect(() => {
    const loadTranslations = () => {
      switch (language) {
        case 'fr':
          setTranslations(fr);
          break;
        case 'zh':
          setTranslations(zh);
          break;
        default:
          setTranslations(en);
          break;
      }
    };
    loadTranslations();
  }, [language]); // 当 language 改变时重新加载 translations

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义 hook，用于方便访问语言上下文
export const useAppLanguage  = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
