import initialize from '@decorator/initialize';
import auth from '@entity/auth';

@initialize(auth)
class Entity {}

export default new Entity() as any;