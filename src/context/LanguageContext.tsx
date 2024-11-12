"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import yaml from 'js-yaml';

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
    console.log(`Attempting to load translations for language: ${language} from file: ${filePath}.yaml`);
    
    try {
      // 使用 fetch 获取 YAML 文件内容
      // const response = await fetch(`/locales/${filePath}.yaml`);
      // const response = await fetch(`/localesl/components/NavBar.yaml`);
      const response = await fetch(`/localesl/${filePath}.yaml`);
      const yamlText = await response.text();
      // console.log(`YAML file loaded as string:`, yamlText);

      // 使用 js-yaml 解析 YAML 文件，保留格式
      const translations = yaml.load(yamlText) as { [key: string]: { [key: string]: string } };
      // console.log(`Parsed translations object:`, translations);

      if (translations && translations[language]) {
        console.log(`Translations loaded for ${language}:`, translations[language]);
        return { ...defaultTranslations, ...translations[language] };
      } else {
        console.warn(`Translations for ${language} not found in the YAML file. Falling back to default translations.`);
        return defaultTranslations;
      }
    } catch (error) {
      console.warn(`Error loading translation file at ${filePath}.yaml for ${language}. Falling back to default translations.`, error);
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
