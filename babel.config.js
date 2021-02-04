module.exports = {
  env: {
    development: {
      presets: ["next/babel"],
    },
    production: {
      presets: ["next/babel"],
    },
    test: {
      presets: ["@babel/preset-env", "@babel/react"],
      plugins: ["@babel/plugin-syntax-jsx"],
    },
  },
}
