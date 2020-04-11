# 熟悉使用部分

## 理解

不只是一个 Koa/Express/Egg 的后端框架, 它是**全栈**的:

- Web 层是基于 Egg.js 的
- Pandora.js, pm2 同类? 应用管理器, 暂不清楚与 Egg 自带的进程守护有什么区别
- SandBox, 不太清楚是啥其实, README 鸽了两年了, 理解为类似 PM2 监控界面? 就是将进程运行状况可视化?
- Injection, 这个是重点, 因为之前没有好好体验过 Ioc 这种思想. 这应该也是整个 midway 比较重要的部分

这个全栈指的是, 它额外包含应用的监控?
我有点倾向于理解为在 Egg 的基础上做了依赖注入的支持(Web 层)?

## 目录结构

> 讲道理我每次看文档都会研究目录结构, 因为我觉得它就是~~世界之窗~~!

- logs/ 日志
- run/ 编译好的运行时配置以及路由配置
- src/
  - app/ 主应用
    - controller
    - middleware
    - public
    - view
    - ...
  - config/ 配置, 就是 egg 的方式
  - lib/ 业务逻辑层, 我的理解是像 ORM 的 Model 工具函数 第三方这种?
  - test/
  - ...

就先从 Web 层入手吧, 得再把 Egg.js 研究下...

配置部分, 支持根据环境加载, 我也更喜欢这种,环境变量文件的确不够方便

中间件, 同Egg以及洋葱模型

## 路由

路由, 仍支持Egg那种汇总+命令式, 但推荐使用装饰器(Nest那种), 爱了. 底层基于Koa-Router, 路由和控制器器放在了一起:

```typescript
@provide()
@controller('/')
export class HomeController {

  @inject()
  ctx: Context;

  @get('/')
  async index() {
    this.ctx.body = `Welcome to midwayjs!`;
  }
}

```

IoC自扫描机制..., 是应用启动前(初始化?)会扫描收集依赖吗?

路由绑定, 也就是说如果同时还想使用`app/router.js`这种方式, 需要从容器中拿到控制器实例来绑定.

举例: 一个没有被`@controller`修饰的控制器在初始化时不会被自动绑定到某个路由, 但由于具有`@provide`装饰器会被IoC加载(得再研究哈IoC的理念), 但希望这个控制器被外部路由使用(如`app/router`)

```typescript
// app/router.ts

module.exports = function(app) {
  app.get('/api/index', app.generateController('baseApi.index'));
};

```

优先级 -> `@priority()`, 就像`React-Router`的某个API来的  

路由级别中间件, 等到时候和中间件一起看.  

同一控制器上支持挂载不同路由 √, 如get与post  



## 依赖注入体系

> 这个排期预计是最长的, 我想从 ts 装饰器底层开始搞

## 框架增强注入

> 在搞懂了依赖注入体系的基础上, 考虑增强注入(`@inject`不够用)

## 框架扩展

## 测试

## 构建部署

## Demo 分析

### 初始 demo
