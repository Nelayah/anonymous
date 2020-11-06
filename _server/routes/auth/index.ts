import ctrl from './controller';
import authentication from '@middleware/authentication';

export default router => {
  router.post('/v1/auth/login', ctrl.login);
  router.post('/v1/auth/logout', ctrl.logout);
  router.post('/v1/auth/register', ctrl.register);
  router.get('/v1/auth/user', authentication, ctrl.user);
};