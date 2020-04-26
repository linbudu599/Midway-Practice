import { Context } from "midway";
import { IUserService } from "../../interface";
export declare class UserController {
    ctx: Context;
    userService: IUserService;
    logger: any;
    getUser(): Promise<void>;
}
