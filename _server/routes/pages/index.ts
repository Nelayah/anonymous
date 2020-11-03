import ctrl from './controller';

export default router => {
  router.get('/alive', async ctx => {
    return ctx.body = 'Service Alive';
  });
  router.get('/', ctrl.redirect);
  router.get('/pages', ctrl.redirect);
  router.get('/pages/*', ctrl.render);
};