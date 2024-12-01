"use client";

import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import NavBar from '../components/NavBar';
import LanguageSelector from '../components/LanguageSelector'; // Import the Language Selector component
import ProjectTree from '../components/ProjectTree';
import DynamicBackground from '../components/DynamicBackground'; // Import the Dynamic Background component
import WelcomingPage from '../components/WelcomingPage';
import ProjectBanner from '@/components/ProjectBanner';
import Footer from '@/components/Footer';

const Page: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // State to manage the background

  return (
    <>
      <DynamicBackground backgroundImage={backgroundImage} /> {/* Dynamic Background */}
      <Header /> {/* Use the Header component */}
      <NavBar />
      <LanguageSelector /> {/* Import the Language Selector component */}
      <WelcomingPage />
      <ProjectBanner />
      <ProjectTree onHoverBackgroundChange={setBackgroundImage} /> {/* Pass callback to update the background */}
      <Footer backgroundColor="steelblue"/>
    </>
  );
};

export default Page;
