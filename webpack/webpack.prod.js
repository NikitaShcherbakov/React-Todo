 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const path = require("path");
 const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
 const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

 module.exports = merge(common, {
     mode: 'production',
     devtool: 'source-map',
     plugins: [
        new OptimizeCSSAssetsPlugin({
             assetNameRegExp: /\.css$/g,
             ssProcessor: require("cssnano"),
             cssProcessorPluginOptions: {
                 preset: ["default", {
                     discardComments: {
                         removeAll: true
                     }
                }],
             },
             canPrint: true,
         }),
        ],
     optimization: {
         minimizer: [
            new UglifyJsPlugin({
                 cache: true,
                 parallel: true,
                 sourceMap: true
             }),
        ]
     },
 });
