export default {
  routes: [
    {
     method: 'GET',
     path: '/search',
     handler: 'search.getByMeiliSearch',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
