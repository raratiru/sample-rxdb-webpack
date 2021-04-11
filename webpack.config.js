const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


//console.log(process.env.NODE_ENV);
//process.exit();


const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/templates/index.html")
    })
];
if (process.env.NODE_ENV === 'disc')
    plugins.push(new BundleAnalyzerPlugin());



module.exports = {
    mode: 'production',
    entry: './src/index.js',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ]
    },
    plugins,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build/rxdb.js',
    },
    stats: {
        warnings: false
    },
    devServer: {
      contentBase: './dist',
    }
};
