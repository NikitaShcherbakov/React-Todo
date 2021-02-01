 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const path = require("path");

 module.exports = merge(common, {
     mode: 'development',
     devtool: 'inline-source-map',
     devServer: {
         port: 9000,
         contentBase: path.join(__dirname, "../dist"),
         overlay: true,
         hot: true,
         compress: true,
         historyApiFallback: true
     }
 });
