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
    // console.log(`Attempting to load translations for language: ${language} from file: ${filePath}.yaml`);
    
    try {
      // Use fetch to get the YAML file content
      // const response = await fetch(`/locales/${filePath}.yaml`);
      // const response = await fetch(`/localesl/components/NavBar.yaml`);
      const response = await fetch(`/localesl/${filePath}.yaml`);
      const yamlText = await response.text();
      // console.log(`YAML file loaded as string:`, yamlText);

      // Use js-yaml to parse the YAML file while preserving the format
      const translations = yaml.load(yamlText) as { [key: string]: { [key: string]: string } };
      // console.log(`Parsed translations object:`, translations);

      if (translations && translations[language]) {
        // console.log(`Translations loaded for ${language}:`, translations[language]);
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

// Custom hook for easier access to language context
export const useAppLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useAppLanguage must be used within a LanguageProvider');
  }
  return context;
};
