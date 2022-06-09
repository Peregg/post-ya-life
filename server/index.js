/* eslint-disable */
require('@babel/register')({
  presets: ['@babel/preset-env'],
  ignore: ['node_modules', '.next'],
  extensions: ['.js', '.ts'],
});

module.exports = require('./server.js');
