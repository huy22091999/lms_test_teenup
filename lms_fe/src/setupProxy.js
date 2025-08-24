const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.175.66:8080',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '/api', // rewrite path
      },
      onProxyReq: function(proxyReq, req, res) {
        console.log('Proxying:', req.method, req.url, '->', proxyReq.path);
      },
      onError: function(err, req, res) {
        console.error('Proxy Error:', err);
      }
    })
  );
};
