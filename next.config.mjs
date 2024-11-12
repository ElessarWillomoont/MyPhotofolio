// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ['en', 'fr', 'zh'], // 支持的语言（例如英文、法文、中文）
      defaultLocale: 'en',         // 默认语言
    },
  };
  
  export default nextConfig;