const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://i8a404.p.ssafy.io/',
      pathRewrite: {
        '^/api': '',
      },
    })
  );
  app.use(
    '/detail/api',
    createProxyMiddleware({
      target: 'http://i8a404.p.ssafy.io/',
      pathRewrite: {
        '^/detail/api': '',
      },
    })
  );
  app.use(
    '/mypage/api',
    createProxyMiddleware({
      target: 'http://i8a404.p.ssafy.io/',
      pathRewrite: {
        '^/mypage/api': '',
      },
    })
  );
  app.use(
    '/useredit/api',
    createProxyMiddleware({
      target: 'http://i8a404.p.ssafy.io/',
      pathRewrite: {
        '^/useredit/api': '',
      },
    })
  );
  app.use(
    '/likes/api',
    createProxyMiddleware({
      target: 'http://i8a404.p.ssafy.io/',
      pathRewrite: {
        '^/likes/api': '',
      },
      changeOrigin: true,
    })
  );
};
