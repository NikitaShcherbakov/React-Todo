    const path = require("path");
    const webpack = require("webpack");
    const merge = require("webpack-merge");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    const {
        CleanWebpackPlugin
    } = require("clean-webpack-plugin");

    module.exports = {
        entry: {
            "react-hot-loader": path.resolve(path.join(__dirname, "../node_modules/react-hot-loader")),
            myfileJS: path.resolve(__dirname, "../src/script.js")
        },
        output: {
            filename: "js/[name].js",
            path: path.resolve(__dirname, "../dist"),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            cacheDirectory: true,
                            plugins: ["@babel/transform-runtime", "@babel/plugin-proposal-class-properties", "react-hot-loader/babel"]
                        },
                    },
                },
                {
                    test: /\.html$/,
                    use: ["html-loader"]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                    MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                    },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                    }
                ],
            },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
            },
                {
                    test: /\.(gif|png|jpg|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[name].[ext]",
                                outputPath: "images/",
                                esModule: false,
                                useRelativePath: true
                            }
                    },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true,
                                mozjpeg: {
                                    progressive: true,
                                    quality: 75
                                  },
                                  optipng: {
                                    enabled: false,
                                  },
                                  pngquant: {
                                    quality: [0.75, 0.90],
                                    speed: 4
                                  },
                                  gifsicle: {
                                    interlaced: false,
                                  },
                                  webp: {
                                    quality: 75
                                  }
                            }
                    }
                ],
            },
        ],
        },
        plugins: [
        new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "../public/index.html"),
                files: {
                    css: "main.css",
                    js: "myfileJS.js"
                }
            }),
        new MiniCssExtractPlugin({
                filename: "main.css",
                publicPath: '../'
            }),
        new CleanWebpackPlugin({
                path: "../dist/*.*"
            }),
        ],
    }
