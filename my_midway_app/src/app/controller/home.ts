import {
  Context,
  controller,
  inject,
  EggAppConfig,
  get,
  provide,
  config,
} from "midway";

@provide()
@controller("/")
export class HomeController {
  @inject()
  ctx: Context;

  @config("home")
  homeConfig: EggAppConfig;

  @get("/")
  async index() {
    this.ctx.body = `Welcome to midwayjs!`;
  }

  @get("/config")
  async config() {
    const homeConfig = this.homeConfig.key;
    this.ctx.body = { homeConfig };
  }

  @get("/uid/:uid")
  async uid() {
    const uid = this.ctx.params.uid;
    this.ctx.body = { uid };
  }
}
