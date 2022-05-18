const path = require('path');
const rules = require('require.all')('./webpack/rules');
const plugins = require('require.all')('./webpack/plugins');

module.exports = (env) => {
  const environment = env.NODE_ENV;
  env.NODE_ENV = JSON.stringify(environment);

  rules((_, rule) => rule(environment));
  plugins((_, rule) => rule(environment));

  return {
    mode: environment,
    entry: {
      app: [path.resolve(__dirname, 'src/js/index.ts'), path.resolve(__dirname, 'src/styles/index.scss')]
    },
    output: {
      filename: '[name].js'
    },
    module: {
      rules: [...rules.files, ...rules.scripts, rules.styles]
    },
    plugins: [plugins.html, plugins.images, plugins.extractStyles],
    devServer: {
      open: true,
      port: 4000,
      https: false,
      hot: true,
      historyApiFallback: true,
      watchOptions: {
        poll: true
      }
      // proxy: { '/api': 'http://localhost:3000' }
    },
    optimization: {
      minimize: false,
      minimizer: [plugins.uglify],
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: path.resolve(__dirname, 'node_modules'),
            name: 'vendor',
            enforce: true
          }
        }
      }
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        styles: path.resolve(__dirname, 'src/styles'),
        assets: path.resolve(__dirname, 'src/assets'),
        '~': path.resolve(__dirname, 'src/js')
      }
    }
  };
};
