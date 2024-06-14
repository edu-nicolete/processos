const proxy = [
    {
      context: '/processos',
      target: 'http://localhost:8888',
      pathRewrite: {'^/processos' : ''}
    }
  ];
  module.exports = proxy;