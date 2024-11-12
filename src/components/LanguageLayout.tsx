// src/components/LanguageLayout.tsx
"use client"; // 确保这是一个客户端组件

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
  const { language } = useAppLanguage(); // 从 LanguageContext 获取当前语言

  return (
    <html lang={language}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};

export default LanguageLayout;
