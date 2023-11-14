export default {
  routes: [
    {
      method: 'GET',
      path: '/ebooks',
      handler: 'ebooks.getContent',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/ebooks',
      handler: 'ebooks.postContent',
      config: {
        policies: [],
        middlewares: [],
      },
    },

  ],
};
