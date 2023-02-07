const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/',
      pathRewrite: {
        '^/api': '',
      },
    })
  );
  app.use(
    '/detail/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/',
      pathRewrite: {
        '^/detail/api': '',
      },
    })
  );
  app.use(
    '/mypage/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/',
      pathRewrite: {
        '^/mypage/api': '',
      },
    })
  );
  app.use(
    '/useredit/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/',
      pathRewrite: {
        '^/useredit/api': '',
      },
    })
  );
  app.use(
    '/likes/api',
    createProxyMiddleware({
      target:
        'http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/',
      pathRewrite: {
        '^/likes/api': '',
      },
      changeOrigin: true,
    })
  );
};
