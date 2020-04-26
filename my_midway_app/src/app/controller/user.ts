import { Context, controller, get, inject, provide, logger } from "midway";
import { IUserService } from "../../interface";

@provide()
@controller("/user")
export class UserController {
  @inject()
  ctx: Context;

  @inject("userService")
  userService: IUserService;

  @logger("ownLogger")
  logger: any;

  @get("/insert")
  async insertUser(): Promise<void> {
    console.log("GET/ /user/insert");
    const res = await this.userService.insertUser();
    this.ctx.body = {
      success: true,
      message: "Successfully Inserted 5 User Info",
      data: res,
    };
  }

  @get("/:id", { middleware: ["SPRouterMiddleware"] })
  async getUser(): Promise<void> {
    console.log("GET/ /user/:id");
    // const user: IUserResult = await this.userService.getUser({ id });
    // const res: ITestResult = await this.userService.testService("linbudu");
    // this.ctx.body = { success: true, message: "OK", data: user, res };
  }
}
