import {
  Context,
  controller,
  get,
  post,
  inject,
  provide,
  logger,
} from "midway";
import { IUserService, searchConditions } from "../../interface";

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

  @post("search")
  async searchUser(conditions: searchConditions): Promise<void> {
    console.log("POST /user/search");
    const res = await this.userService.searchUser(conditions);
    this.ctx.body = {
      success: true,
      message: "Successfully Search User Info",
      data: res,
    };
  }

  @get("/uid/:uid", { middleware: ["SPRouterMiddleware"] })
  async findByUid(): Promise<void> {
    const uid = this.ctx.params.uid;
    console.log(`GET/ /uid/${uid}`);
    const res = await this.userService.findByUid(uid);
    this.ctx.body = {
      success: true,
      message: "Successfully Search User Info",
      data: res,
    };
  }
}
