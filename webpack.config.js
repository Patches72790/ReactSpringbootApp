const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

module.exports = {
    entry: './src/main/js/src/index.tsx',
    mode: 'development',
    cache: true,
    //devtool: "source-map",
    target: "web",
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.PORT': JSON.stringify(process.env.PORT),
            'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
