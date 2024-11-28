// src/app/layout.tsx
import type { Metadata } from "next";

import { LanguageProvider } from '../context/LanguageContext';
import LanguageLayout from '../components/LanguageLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Photofolio of Candle",
  description: "Photofolio of Candle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LanguageLayout>
        {children}
      </LanguageLayout>
    </LanguageProvider>
  );
}
