const path = require('path');
const webpack = require('webpack');
const project = require('./package.json');

// https://github.com/aurelia/webpack-plugin
const { AureliaPlugin } = require("aurelia-webpack-plugin");

// https://github.com/ampedandwired/html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: "aurelia-bootstrapper",
        vendor: Object.keys(project.dependencies)
    },
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, './wwwroot')
    },

    // https://webpack.js.org/configuration/devtool/#devtool
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js"],
        modules: ['src', 'node_modules']
    },

    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" },
            { test: /\.html$/, loader: 'html-loader', exclude: path.resolve('src/index.html') },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        // https://github.com/jods4/aurelia-webpack-build/wiki/AureliaPlugin-options
        new AureliaPlugin({ includeAll: 'src' }),
        new webpack.optimize.CommonsChunkPlugin({ name: ['vendor'] }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
