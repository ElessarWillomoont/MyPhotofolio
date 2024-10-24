import React from 'react';
import Head from 'next/head'; // 导入 next/head 组件

const Header: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </Head>
      {/* 这里可以包含其他的 header 内容，例如导航栏 */}
    </>
  );
};

export default Header;
