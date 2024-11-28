import React from 'react';
import Header from '../components/Header'; // 引入 Header 组件
import MainPage from '../components/MainPage';
import NavBar from '../components/NavBar';
import LanguageSelector from '../components/LanguageSelector'; // 引入语言选择组件

const Page: React.FC = () => {
  return (
    <>
      <Header /> {/* 使用 Header 组件 */}
      <NavBar />
      <LanguageSelector /> {/* 引入语言选择组件 */}
      <MainPage />
      <MainPage />
      <MainPage />
      <MainPage />
    </>
  );
};

export default Page;
