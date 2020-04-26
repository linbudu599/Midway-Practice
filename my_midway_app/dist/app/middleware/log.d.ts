import { Context } from "midway";
declare function log(options: any): (ctx: Context, next: any) => Promise<void>;
export default log;
