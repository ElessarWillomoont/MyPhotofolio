import CopyWebpackPlugin from 'copy-webpack-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add GitHub Pages specific settings for basePath and assetPrefix
  // output: 'export', // Enable static export to generate HTML files
  // basePath: '/<your-repo-name>', // Replace <your-repo-name> with your GitHub repository name
  // assetPrefix: '/<your-repo-name>', // Prefix for static assets to match GitHub Pages path

  // Commented out i18n configuration because it conflicts with static export
  
  i18n: {
    locales: ['en', 'fr', 'zh'], // Supported languages (e.g., English, French, Chinese)
    defaultLocale: 'en',         // Default language
  },
  

  webpack(config, { isServer }) {
    // Add support for YAML files
    config.module.rules.push({
      test: /\.yaml$/,
      use: 'yaml-loader',
    });

    // Dynamically copy Source Map files for Bootstrap
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', // Path to source file
              to: 'static/css/app', // Destination path (_next/static/css/)
            },
          ],
        })
      );
    }

    return config;
  },
};

export default nextConfig;
