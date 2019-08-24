require('dotenv').config()

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoPrefixer = require('autoprefixer')
const cssnano = require('cssnano')
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
        Components: path.resolve(__dirname, '..', srcFolder, 'components'),
        Containers: path.resolve(__dirname, '..', srcFolder, 'containers'),
        RootContainers: path.resolve(__dirname, '..', srcFolder, 'rootContainers'),
        Helpers: path.resolve(__dirname, '..', srcFolder, 'helpers')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(srcFolder, 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
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
