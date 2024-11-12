"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'zh';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  getTranslations: (filePath: string, defaultTranslations: { [key: string]: string }) => Promise<{ [key: string]: string }>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const getTranslations = async (filePath: string, defaultTranslations: { [key: string]: string }) => {
    try {
      // 根据传入的 filePath 和当前语言动态构建路径，例如 '../components/NavBar.json'
      const translationModule = await import(`../${filePath}.json`);
      const translations = translationModule.default[language];
      return { ...defaultTranslations, ...translations };
    } catch (error) {
      console.warn(`Translation file at ${filePath}.json for ${language} not found. Falling back to default translations. Error:`, error);
      return defaultTranslations;
    }
  };
  

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义 hook，用于方便访问语言上下文
export const useAppLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useAppLanguage must be used within a LanguageProvider');
  }
  return context;
};
