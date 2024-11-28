import CopyWebpackPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'fr', 'zh'], // 支持的语言（例如英文、法文、中文）
    defaultLocale: 'en',         // 默认语言
  },
  webpack(config, { isServer }) {
    // 添加对 YAML 文件的处理
    config.module.rules.push({
      test: /\.yaml$/,
      use: 'yaml-loader',
    });

    // 动态复制 Source Map 文件
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', // Source 文件路径
              to: 'static/css/app', // 目标路径 (_next/static/css/)
            },
          ],
        })
      );
    }

    return config;
  },
};

export default nextConfig;
