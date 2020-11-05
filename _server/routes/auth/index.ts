import ctrl from './controller';

export default router => {
  router.post('/v1/auth/login', ctrl.login);
  router.post('/v1/auth/register', ctrl.register);
};