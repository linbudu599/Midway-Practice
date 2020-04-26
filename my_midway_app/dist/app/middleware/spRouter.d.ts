import { Middleware, WebMiddleware } from "midway";
import { IUserService } from "../../interface";
export declare class SPRouterMiddleware implements WebMiddleware {
    ownConfig: any;
    userService: IUserService;
    resolve(): Middleware;
}
