const webpack = require('webpack');
const Config = require('rc')('ci');

const processed = Object
  .keys(Config)
  .filter(i => ['config', 'configs', '_'].indexOf(i) === -1)
  .reduce((obj, key)=> {
    obj[`Config_${key}`] = JSON.stringify(Config[key]);
    return obj;
  }, {});

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify("object"),
      VERSION: false
    }),
    new webpack.DefinePlugin(processed)
  ]
};
