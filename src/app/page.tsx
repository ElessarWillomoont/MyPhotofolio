import React from 'react';
import Header from '../components/Header'; // 引入 Header 组件
import MainPage from '../components/MainPage';

const Page: React.FC = () => {
  return (
    <>
      <Header /> {/* 使用 Header 组件 */}
      <MainPage />
      <MainPage />
      <MainPage />
      <MainPage />
    </>
  );
};

export default Page;
