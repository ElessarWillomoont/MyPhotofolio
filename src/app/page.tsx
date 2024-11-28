"use client";

import React, { useState } from 'react';
import Header from '../components/Header'; // 引入 Header 组件
import MainPage from '../components/MainPage';
import NavBar from '../components/NavBar';
import LanguageSelector from '../components/LanguageSelector'; // 引入语言选择组件
import ProjectTree from '../components/ProjectTree';
import DynamicBackground from '../components/DynamicBackground'; // 引入动态背景组件
import WelcomingPage from '../components/WelcomingPage';

const Page: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null); // 用于管理背景状态

  return (
    <>
      <DynamicBackground backgroundImage={backgroundImage} /> {/* 动态背景 */}
      <Header /> {/* 使用 Header 组件 */}
      <NavBar />
      <LanguageSelector /> {/* 引入语言选择组件 */}
      <WelcomingPage />
      <ProjectTree onHoverBackgroundChange={setBackgroundImage} /> {/* 传递背景更新回调 */}
      <MainPage />
      <MainPage />
      <MainPage />
    </>
  );
};

export default Page;
