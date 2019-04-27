const path = require("path");

module.exports = {
  projectRoot: path.resolve(__dirname, "../../"),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    }),
    assetPlugins: ["react-native-svg-asset-plugin"]
  }
};
