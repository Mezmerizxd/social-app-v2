const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export default (config) => {
  config.resolve.alias = {
    '@lib': path.resolve(__dirname, '../../lib'),
    '@styled': path.resolve(__dirname, 'src/renderer/styled'),
    '@clientLib': path.resolve(__dirname, 'src/lib'),
    ...config.resolve.alias,
  };

  /*
   * NOTE:
   * Preact CLI uses Webpack 4.
   * So we are going to modify one of the existing DefinePlugins already added by Preact CLI.
   */
  const definitions = {
    // 'process.env.ENV_NAME': JSON.stringify(process.env.ENV_NAME),
  };

  for (const plugin of config.plugins) {
    if (plugin.definitions) {
      plugin.definitions = {
        ...plugin.definitions,
        ...definitions,
      };
      break;
    }
  }
};
