import ctrl from './controller';
import authentication from '@middleware/authentication';

export default router => {
  router.get('/v1/messages', authentication, ctrl.messages);
};