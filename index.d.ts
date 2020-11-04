import { Context, Request } from 'koa';
import { any } from 'ramda';

declare global {

  namespace Types {
    interface KoaContext extends Context {
      request: Request & {
        fields: any
        files: any;
      };
    }
  }
}
