const path = require( 'path' )
const webpack = require( 'webpack' )

module.exports = {
  mode: 'development',
  entry: {
    frontend: [ './js/main.js' ],
  },
  output: {
    path: path.resolve( __dirname, 'js' ),
    filename: 'traveling-session-map.[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin( {
      $: 'jquery',
      jQuery: 'jquery'
    } )
  ]
}