import { Middleware, WebMiddleware, provide, config, inject } from "midway";
import { IUserService } from "../../interface";

@provide("SPRouterMiddleware")
export class SPRouterMiddleware implements WebMiddleware {
  @config("spRouter")
  ownConfig;

  @inject("userService")
  userService: IUserService;

  resolve(): Middleware {
    return async (ctx, next) => {
      ctx.spKey = "Key From SP Router Middleware: " + this.ownConfig.param;
      // ctx.service = await ctx.requestContext.getAsync("userService");
      console.log("===SP Router Middleware Start===");
      console.log(ctx.spKey);
      // console.log(ctx.service.testService());
      console.log("===SP Router Middleware End===");
      await next();
    };
  }
}
