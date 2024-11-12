import React from 'react';
import styles from './MainPage.module.css'; // 引入CSS模块

const MainPage: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      {/* 这是主页面，可以在这里添加更多内容 */}
      <h1>
        Hi, This is Main Page
        <p>
          Hallo World!
        </p>
      </h1>
    </div>
  );
};

export default MainPage;
