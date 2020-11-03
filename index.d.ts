import { Context, Request } from 'koa';

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
