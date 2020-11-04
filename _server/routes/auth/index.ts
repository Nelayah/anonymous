import ctrl from './controller';

export default router => {
  router.get('/login', ctrl.login);
  router.get('/register', ctrl.register);
};