require('babel-register');

const _ = require('lodash');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

const webpack = require('webpack');

// const fs = require('fs');
const path = require('path');
const join = path.join;
const resolve = path.resolve;
const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');


const config = getConfig({
  isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true,
});

// Environment Variables
const dotenv = require('dotenv');
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv);

const defines = Object.keys(envVariables).reduce((memo, key) => {
  const memoClone = _.cloneDeep(memo);
  const value = JSON.stringify(envVariables[key]);

  memoClone[`__${key.toUpperCase()}__`] = value;

  return memoClone;
}, { __NODE_ENV__: JSON.stringify(NODE_ENV) });

config.plugins = [new webpack.DefinePlugin(defines)].concat(config.plugins);

// Relative Requires
config.resolve.root = [src, modules];
config.resolve.alias = {
  css: join(src, 'styles'),
  containers: join(src, 'containers'),
  components: join(src, 'components'),
  utils: join(src, 'utils'),
};

// Testing
if (isTest) {
  config.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true,
  };

  config.plugins = config.plugins.filter(plugin => {
    const name = plugin.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/);

    const index = [
      'DedupePlugin',
      'UglifyJsPlugin',
    ].indexOf(fnName[1]);

    return index < 0;
  });
}

// CSS Modules
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({}),
]);

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l.loader && l.loader.match(match));
  return found ? found[0] : null;
};

const cssloader = findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: cssloader.loader
    .replace(matchCssLoaders,
    `$1$2?modules&localIdentName=${cssModulesNames}$3`),
});

config.module.loaders.push(newloader);

cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newloader.loader;

config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css',
});

// export config
module.exports = config;
