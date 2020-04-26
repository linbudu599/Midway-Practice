# EggJS Praticing

## 入手方向

- 基础
  - 基础使用
    - 内置对象及挂载属性
  - middleware
  - schedule
- 进阶
  - extend -> midway-typegraphql 思路?
  - plugin -> 摸清 egg-graphql
  - 环境
  - custom initializing
  - 安全 鉴权
  - 代理
  - 加载器
  - 常用插件
  - 多进程与 IPC
- 正式
  - 单测
  - 构建部署
  - 代码质量

## 基础使用与例子

个人感觉`- router.ts`是有必要的? 即使是 midway 有装饰器体系, 也最好在一个地方收纳一下路由方便查看/维护?

在路由中确定对应的控制器, 在控制器中去调用服务.

- service 被挂载在 ctx 上了
- 方便复用逻辑

扩展:

```js
// app/extend/helper.js
const moment = require("moment");
exports.relativeTime = (time) => moment(new Date(time * 1000)).fromNow();

// usage
helper.relativeTime();
```

(是起到了 util 的功能吗?)

中间件与配置中间件:

```js
// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get("user-agent") || "";
    // 我怎么觉得这里的这个约定没有必要?
    const match = options.ua.some((ua) => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = "Go away, robot.";
    } else {
      await next();
    }
  };
};

// 会自动附加配置到中间件, 然后中间件中使用options获取
// config/config.default.js
// add middleware robot
exports.middleware = ["robot"];
// robot's configurations
exports.robot = {
  ua: [/Baiduspider/i],
};
```

**中间件的配置合并!**

框架与插件中使用中间件

也能按文件获取, 但是要手动添加

```js
// app.js
module.exports = (app) => {
  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift("report");
};

// app/middleware/report.js
module.exports = () => {
  return async function (ctx, next) {
    const startTime = Date.now();
    await next();
    // 上报请求时间
    reportTime(Date.now() - startTime);
  };
};
```

路由级别的中间件, 需要在路由文件中实例化并挂载

```js
module.exports = (app) => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  app.- router.get("/needgzip", gzip, app.controller.handler);
};
```

内置对象:

this.app, 访问应用实例. 扩展实际上是把`app/extend/application.js`中的对象与应用对象合并了, 即能够在 app 上访问到扩展的方法

```js
// app/extend/application.js
module.exports = {
  foo(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
  },
};
```

属性扩展的话, 使用`Symbol`+`Getter`, 在`Egg-GraphQL`里也看到了这样的写法来扩展`app.graphql`属性?

this.ctx, 每次请求生成, 扩展方式是`context.js`.

中间件中 this 即为 ctx, 控制器中类的写法通过 this.ctx，方法的写法直接通过 ctx 入参. helper 与 service 中的 this 指向本身, 通过 this.ctx 访问 context 对象.

Request, ctx.request 访问, 很多属性和方法被代理到了 ctx 上

Response 同.

helper, util 工具类函数. 逻辑复用与易于测试.

好像没看到有`/help/`目录的约定, 只有 extend 下的?

通过 ctx.helper 访问

路由, 支持的触发动作:

```js
router.verb('path-match', app.controller.action);
router.verb('router-name', 'path-match', app.controller.action);
router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);
```

- router.head - HEAD
- router.options - OPTIONS
- router.get - GET
- router.put - PUT
- router.post - POST
- router.patch - PATCH
- router.delete - DELETE
- router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
- router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。

controller - 指定路由映射到的具体的 controller 上，controller 可以有两种写法：
app.controller.user.fetch - 直接指定一个具体的 controller
'user.fetch' - 可以简写为字符串形式

RESTFul 风格定义 -> resource

提供了 app.router.resources('routerName', 'pathMatch', controller) 快速在一个路径上生成 CRUD 路由结构。

```js
// app/router.js
module.exports = (app) => {
  const { router, controller } = app;
  router.resources("posts", "/api/posts", controller.posts);
  router.resources("users", "/api/v1/users", controller.v1.users); // app/controller/v1/users.js
};
```

上面代码就在 /posts 路径上部署了一组 CRUD 路径结构，对应的 Controller 为 app/controller/posts.js 接下来， 你只需要在 posts.js 里面实现对应的函数就可以了。

路由参数获取

/xxx + /xxx?name=budu -> ctx.query.name

/xxx/:id + /xxx/1 -> ctx.params.name

表单: ctx.request.body

控制器详解:

- this.ctx
- this.app
- this.service
- this.config
- this.logger

定义一个控制器基类(如成功与 404handler), 供其他控制器使用.

每一次请求访问服务端都会实例化一个新的 controller 对象

this.ctx.query/queries/params/body

文件处理, 详见[获取上传的文件](https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件)

添加自定义规则, 在 app.js 中(启动初始化?)

app.validator.addRule(type,check)

```js
// app.js
app.validator.addRule("json", (rule, value) => {
  try {
    JSON.parse(value);
  } catch (err) {
    return "must be json string";
  }
});

class PostController extends Controller {
  async handler() {
    const ctx = this.ctx;
    // query.test 字段必须是 json 字符串
    const rule = { test: "json" };
    ctx.validate(rule, ctx.query);
  }
}
```

插件, 实际上就是一个迷你应用, `egg-graphql`给我的感觉也是.

这里等后面自己写插件了研究, 目前好像只要会用就行了

启动自定义, 主要是生命周期和全局注入吧?

demo

文档中的 RESTFuldemo

校验: by egg-valiadate

```js
// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: "string",
  title: "string",
  tab: { type: "enum", values: ["ask", "share", "job"], required: false },
  content: "string",
};

class TopicController extends Controller {
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const id = await ctx.service.topics.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      topic_id: id,
    };
    ctx.status = 201;
  }
}
module.exports = TopicController;
```

统一错误处理中间件

```js
// app/middleware/error_handler.js
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};

// config/config.default.js
module.exports = {
  // 加载 errorHandler 中间件
  middleware: ["errorHandler"],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: "/api",
  },
};
```

编译运行

