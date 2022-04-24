const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../story/**/*.stories.mdx', '../story/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};
