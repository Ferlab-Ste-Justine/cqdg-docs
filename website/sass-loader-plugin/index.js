const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function (context, options) {
    const devEnv = process.env.NODE_ENV === 'development';
    return {
        name: "sass-loader-plugin",
        configureWebpack() {
            return {
                plugins: [
                    new MiniCssExtractPlugin({
                        filename: devEnv ? '[name].css' : '[name].[hash].css',
                        chunkFilename: devEnv ? '[id].css' : '[id].[hash].css'
                    })
                ],
                module: {
                    rules: [
                        {
                            test: /\.module\.s(a|c)ss$/,
                            loader: [
                                devEnv ? 'style-loader' :
                                    MiniCssExtractPlugin.loader,
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: true,
                                        sourceMap: devEnv
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        additionalData: '@import "./static/scss/_app.scss";',
                                        sourceMap: devEnv
                                    }
                                }
                            ]
                        },
                        {
                            test: /\.s(a|c)ss$/,
                            exclude: /\.module.(s(a|c)ss)$/,
                            loader: [
                                devEnv ? 'style-loader' : MiniCssExtractPlugin.loader,
                                'css-loader',
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        additionalData: '@import "./static/scss/_app.scss";',
                                        sourceMap: devEnv
                                    }
                                }
                            ]
                        }
                    ]
                },
            }
        }
    }
}