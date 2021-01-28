module.exports = {
  test: {
    presets: [
      ['next/babel', { 'preset-react': { importSource: '@emotion/core' } }],
    ],
    plugins: ['emotion'],
  },
  "development": {
    "presets": ["next/babel"]
  },
  "production": {
    "presets": ["next/babel"]
  }
};
