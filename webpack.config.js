const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const WorkerPlugin = require( 'worker-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const path = require( 'path' );

module.exports = {
    entry: './src/App.jsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve( __dirname, 'build' ),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [ "*", ".js", ".jsx" ]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        redux: 'Redux',
        'react-router-dom': 'ReactRouterDOM'
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new WorkerPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        compress: true,
        port: 1234,
        historyApiFallback: true,
        hot: true
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                }
            }
        }
    }
};