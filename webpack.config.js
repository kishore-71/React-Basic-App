const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
const packageJson = require("./package.json")
module.exports = {
    mode: "development",
    devServer: {
        port: 8006,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    entry: path.resolve(__dirname, './src/index.js'),

    plugins: [
        new CompressionWebpackPlugin({
            algorithm: "gzip"
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin(
            {
                name: 'loyalty',
                filename:
                    'remoteEntry.js',
                exposes: {
                    './loyaltyCard':
                        './src/index',
                },
                shared: packageJson.dependencies
            }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    },
                },

            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}