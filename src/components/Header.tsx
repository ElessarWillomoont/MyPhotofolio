import React from 'react';
import Head from 'next/head'; // Import the next/head component

const Header: React.FC = () => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </Head>
      {/* Additional header content can be included here, such as a navigation bar */}
    </>
  );
};

export default Header;
