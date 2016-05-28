const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const join = path.join;
const resolve = path.resolve;
const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');

const { env: { NODE_ENV } } = process;
const isDev = NODE_ENV === 'development';

const config = getConfig({
  isDev,
  in: join(src, 'src/app,js'),
  out: dest,
  clearBeforeBuild: true,
});

module.exports = config;
