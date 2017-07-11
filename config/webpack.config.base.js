const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintFormatter = require('eslint-friendly-formatter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const postcssImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const paths = require('./paths')

const env = process.env.NODE_ENV
const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[path][name]__[local]--[hash:base64:5]'
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => {
        const plugins = [
          postcssImport({ root: loader.resourcePath }),
          cssnext({ browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', 'IOS 8'], flexbox: 'no-2009' }) // include autoprefixer
        ]
        if (env === 'production') {
          plugins.push(cssnano({ autoprefixer: false })) // compresses css; disabled autoprefixer
        }
        return plugins
      }
    },
  }
]

module.exports = {
  context: path.resolve('src'),
  entry: [
    paths.appIndex
  ],
  output: {
    path: path.resolve(paths.appBuild),
    filename: 'static/js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: /src/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: eslintFormatter
          }
        }]
      },

      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: /src/,
      },

      {
        test: /\.css$/,
        include: /src/,
        use: env === 'production'
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoader
          })
          : ['style-loader'].concat(cssLoader)
      },

    ],
    noParse: /node_modules\/(jquey|chart\.js)/  // 脱离webpack的解析
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.json'],
    alias: {
      // 'react': 'react/dist/react.js',
      // 'react-dom': 'react-dom/dist/react-dom.js',
      '~': path.join(__dirname, '..', 'src')
    },
    mainFields: ['jsnext:main', 'module', 'main'],  // 优化支持tree-shaking的库
  },

  plugins: [
    // new webpack.DllPlugin({
    //   path: path.join(__dirname, '..', paths.appBuild, '[name]-manifest.json'),
    //   name: '[name]_[hash]'
    // }),  // https://webpack.github.io/analyse/
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    })
  ],
}
