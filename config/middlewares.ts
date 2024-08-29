export default [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      header: '*',
      origin: ['http://localhost:3000', 'http://192.168.20.216:3000', 'https://api.elvis.wang:1337', 'http://api.elvis.wang:1337', 'https://book.elvis.wang:3001', 'http://192.168.3.3:1337', 'http://192.168.3.17:3000']
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
