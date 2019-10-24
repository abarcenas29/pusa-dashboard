require('dotenv').config()

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoPrefixer = require('autoprefixer')
const cssnano = require('cssnano')
const Workbox = require('workbox-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development'
  const srcFolder = process.env.SCR_FOLDER

  const config = {
    entry: path.resolve(
      __dirname,
      '..',
      process.env.SCR_FOLDER,
      process.env.WEBPACK_ENTRY_PATH
    ),
    target: 'web',
    output: {
      path: path.resolve(__dirname, '..', process.env.WEBPACK_BUILD_PATH),
      filename: '[name].bundle.js',
      chunkFilename: 'bundle.[chunkhash].js',
      publicPath: '/'
    },
    devtool: (isDevMode) ? 'inline-source-map' : false,
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
        App: path.resolve(__dirname, '..', srcFolder),
        Components: path.resolve(__dirname, '..', srcFolder, 'components'),
        Containers: path.resolve(__dirname, '..', srcFolder, 'containers'),
        Helpers: path.resolve(__dirname, '..', srcFolder, 'helpers'),
        RootContainers: path.resolve(__dirname, '..', srcFolder, 'rootContainers'),
        Routes: path.resolve(__dirname, '..', srcFolder, 'routes')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(srcFolder, 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new CopyWebpackPlugin([
        path.resolve('app', 'manifest.json'),
        {
          from: path.resolve('app', 'assets'),
          to: 'assets'
        },
        {
          from: path.resolve('app', 'images'),
          to: 'images'
        }
      ]),
      new DotenvWebpack()
    ],
    devServer: {
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3100,
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoPrefixer,
                  cssnano({
                    preset: 'default'
                  })
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
              }
            }
          ]
        }
      ]
    }
  }

  if (isDevMode) {
    config.plugins.push(new Workbox.GenerateSW({
      clientsClaim: true,
      importWorkboxFrom: 'cdn',
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      skipWaiting: true,
      swDest: 'sw.js',
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'images'
          }
        },
        {
          urlPattern: /\.(?:js|css)$/,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'pusa',
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 60
            }
          }
        },
        {
          urlPattern: `${process.env.API_URL}/*`,
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'pusa',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300
            },
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    }))
  }

  /*
  uncomment this if you want to analyze the build sizes of your build file
  if (!isDevMode) {
    config.plugins.push(
      new BundleAnalyzerPlugin()
    )
  }
  */

  return config
}
