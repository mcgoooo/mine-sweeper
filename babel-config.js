module.exports = {
  "env": {
    "development": {
      "presets": ["next/babel"]
    },
    "production": {
      "presets": ["next/babel"]
    },
    "test": {
      "presets": ["env", "react","@babel/preset-react"],
      "plugins": ["@babel/plugin-syntax-jsx"]
    }
  }
}
