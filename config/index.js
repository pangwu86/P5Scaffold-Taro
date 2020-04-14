// eslint-disable-next-line
const path = require("path");

const config = {
  projectName: "taro-boilerplate",
  date: "2020-4-1",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
    "@css": path.resolve(__dirname, "..", "src/assets/css"),
    "@js": path.resolve(__dirname, "..", "src/assets/js"),
    "@images": path.resolve(__dirname, "..", "src/assets/images/"),
    "@utils": path.resolve(__dirname, "..", "src/utils"),
    "@services": path.resolve(__dirname, "..", "src/services"),
    "@components": path.resolve(__dirname, "..", "src/components"),
  },
  babel: {
    sourceMap: true,
    presets: [
      [
        "env",
        {
          modules: false,
        },
      ],
    ],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      [
        "transform-runtime",
        {
          helpers: false,
          polyfill: false,
          regenerator: true,
          moduleName: "babel-runtime",
        },
      ],
    ],
  },
  copy: {
    patterns: [{ from: "src/sitemap.json", to: "dist/sitemap.json" }],
    options: {},
  },
  plugins: [],
  defineConstants: {},
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
