require('dotenv').config()

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoPrefixer = require('autoprefixer')
const cssnano = require('cssnano')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(srcFolder, 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new CopyWebpackPlugin([
        path.resolve('app', 'manifest.json'),
        path.resolve('app', 'site.webmanifest'),
        {
          from: path.resolve('app', 'assets'),
          to: 'assets'
        },
        {
          from: path.resolve('app', 'images'),
          to: 'images'
        }
      ]),
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './app/sw-src.js',
        swDest: 'sw.js'
      }),
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

  return config
}
