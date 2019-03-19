module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },
    devServer: {
        proxy: { // 配置跨域
            '/api': {
                target: 'http://localhost:3000/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}