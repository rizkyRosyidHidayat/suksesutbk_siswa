const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const compressionPlugin = [
  new CompressionPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new CompressionPlugin({
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
  }),
]
module.exports = {
  configureWebpack: {
    plugins: process.env.NODE_ENV === 'production'
    ? compressionPlugin
    : []
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/peserta/'
    : '/'
}