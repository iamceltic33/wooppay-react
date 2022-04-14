const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public")
        },
        port: 3000,
        hot: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"]
                }
            },
            {
                test: /\.s[ac]ss/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
}