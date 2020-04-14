import { Context } from "midway";

function log(options) {
  return async (ctx: Context, next) => {
    console.log("===Log Middleware Start===");
    console.log(`level: ${options.level}`);
    await next();
    console.log("===Log Middleware End===");
  };
}

export default log;
