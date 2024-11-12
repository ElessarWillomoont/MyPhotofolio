// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';
import LanguageLayout from '../components/LanguageLayout';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
