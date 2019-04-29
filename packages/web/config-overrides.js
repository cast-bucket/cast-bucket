const fs = require("fs");
const path = require("path");
const resolve = require("resolve");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const externalModules = [
  resolveApp("../../node_modules/react-native-super-grid"),
  resolveApp("../../node_modules/react-native-unimodules"),
  resolveApp("../../node_modules/expo-av"),
  resolveApp("../../node_modules/@unimodules/core"),
  resolveApp("../../node_modules/@unimodules/react-native-adapter")
];

const appIncludes = [
  resolveApp("src"),
  resolveApp("../core/src"),
  resolveApp("../components/src/components"),
  ...externalModules
];

module.exports = function override(config, env) {
  config.resolve.alias["react-native/Libraries/Components/View/ViewStylePropTypes$"] =
    "react-native-web/dist/exports/View/ViewStylePropTypes";
  config.resolve.alias["react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$"] =
    "react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter";
  config.resolve.alias["react-native/Libraries/vendor/emitter/EventEmitter$"] =
    "react-native-web/dist/vendor/react-native/emitter/EventEmitter";
  config.resolve.alias["react-native/Libraries/vendor/emitter/EventSubscriptionVendor$"] =
    "react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor";
  config.resolve.alias["react-native/Libraries/EventEmitter/NativeEventEmitter$"] =
    "react-native-web/dist/vendor/react-native/NativeEventEmitter";
  config.resolve.alias["deepmerge$"] = "deepmerge/dist/umd.js";

  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== "ModuleScopePlugin"
  );

  config.module.rules[0].include = appIncludes;
  config.module.rules[1] = null;
  config.module.rules[2].oneOf[1].include = appIncludes;
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve("babel-plugin-react-native-web")
  ].concat(config.module.rules[2].oneOf[1].options.plugins);
  config.module.rules = config.module.rules.filter(Boolean);

  config.plugins.push(new webpack.DefinePlugin({ __DEV__: env !== "production" }));

  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "report.html"
    })
  );

  return config;
};
