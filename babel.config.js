module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            tests: ["./__tests/__"],
            "@root": "./",
            "@types": "./src/types",
            "@store": "./src/store",
            "@components": "./src/components",
            "@features": "./src/features",
            "@utils": "./src/utils",
            "@routers": "./src/routers",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@assets": "./assets",
            "@selectors": "./src/selectors",
            "@theme": "./src/theme",
          },
        },
      ],
    ],
  };
};
