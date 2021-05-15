const webpackconfig = require("./webpack-storybook.config.js");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ],
  webpackFinal: async (config) => {
    let custom = webpackconfig();

    let resultConfig = {
      ...config,
      parallelism: 1,
      module: {
        ...config.module,
        rules: custom.module.rules,
      },
    };

    if (resultConfig.mode === "production") {
      // see https://github.com/storybooks/storybook/issues/1570
      resultConfig.plugins = resultConfig.plugins.filter(
        (plugin) => plugin.constructor.name !== "UglifyJsPlugin"
      );
    }

    return resultConfig;
  },
};
