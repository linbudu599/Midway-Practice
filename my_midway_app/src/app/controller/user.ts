import { Context, controller, get, inject, provide, logger } from "midway";
import { IUserService, IUserResult, ITestResult } from "../../interface";

@provide()
// 相当于prefix
@controller("/user")
export class UserController {
  @inject()
  ctx: Context;

  @inject("userService")
  userService: IUserService;

  @logger("ownLogger")
  logger: any;

  @get("/:id", { middleware: ["SPRouterMiddleware"] })
  async getUser(): Promise<void> {
    const id: number = this.ctx.params.id;
    const user: IUserResult = await this.userService.getUser({ id });
    const res: ITestResult = await this.userService.testService("linbudu");
    this.ctx.body = { success: true, message: "OK", data: user, res };
  }
}
