// src/components/LanguageLayout.tsx
"use client"; // Ensure this is a client-side component

import React from 'react';
import { useAppLanguage } from '../context/LanguageContext';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const LanguageLayout = ({ children }: { children: React.ReactNode }) => {
  const { language } = useAppLanguage(); // Get the current language from LanguageContext

  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};

export default LanguageLayout;
