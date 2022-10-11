const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/project', {
            target: 'http://localhost:7001',
            changeOrigin: true,
            ws: false,
            pathRewrite: {
                '^/project': '/project',
            },
        })
    );
};
