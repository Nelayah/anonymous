import * as path from 'path';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer = require('autoprefixer');

const { NODE_ENV } = process.env;
const DEV_MODE = NODE_ENV === 'development';
const PROD_MODE = NODE_ENV === 'production';
const extractCSS = new ExtractTextPlugin({ filename: `css/[name].css`, allChunks: true });
const cssOptions = [
  {
    loader: 'css-loader',
    options: {
      minimize: PROD_MODE,
      sourceMap: DEV_MODE,
      modules: true,
      localIdentName: '[local]___[hash:base64:8]'
    }
  }
];
const lessOptions = [
  ...cssOptions,
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [autoprefixer({ browsers: ['last 5 versions'] })];
      }
    }
  },
  { loader: 'less-loader' }
];

const configure = {
  mode: NODE_ENV,
  devtool: DEV_MODE ? '#cheap-module-eval-source-map' : 'source-map',
  entry: {
    'js/app': ['./_client/index.tsx']
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'js/app.[name].js',
    path: path.join(__dirname, '../_server/public/assets'),
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.less'],
    alias: {
      '@root': path.resolve(__dirname, '../_client'),
      '@pages': path.resolve(__dirname, '../_client/pages'),
      '@util': path.resolve(__dirname, '../_client/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|js|ts)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'es2015',
              sourceMap: true
            }
          }
        }]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: DEV_MODE ? [{ loader: 'style-loader' }, ...lessOptions] : extractCSS.extract({ fallback: 'style-loader', use: lessOptions })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: DEV_MODE ? [{ loader: 'style-loader' }, ...cssOptions] : extractCSS.extract({ fallback: 'style-loader', use: cssOptions })
      },
      {
        test: /\.css$/,
        exclude: /_client/,
        use: DEV_MODE ? [{ loader: 'style-loader' }, { loader: 'css-loader' }] : extractCSS.extract({ fallback: 'style-loader', use: { loader: 'css-loader' } })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [ { loader: 'file-loader?name=static/images/[hash:8].[ext]' } ]
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {},
  stats: {
    modules: false,
    moduleTrace: false,
    children: false
  },
  plugins: []
};

if (PROD_MODE) {
  configure.plugins = [
    ...configure.plugins,
    new CleanWebpackPlugin(['_server/public/assets/js', '_server/public/assets/css'], {
      root: path.join(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    extractCSS
  ];
  configure.optimization = {
    ...configure.optimization,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          output: {
            comments: false
          },
          compress: {
            drop_console: true,
            pure_funcs: ['console.log']
          }
        }
      })
    ]
  };
}

export default configure;