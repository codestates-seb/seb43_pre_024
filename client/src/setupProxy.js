const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    `${process.env.REACT_JIEUN}/questions`,
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      changeOrigin: true,
    })
  );
};