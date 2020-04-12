# How Injection Works

> Inversion of Control

## 装饰器

- 逻辑复用, 代码可读性(TypeGraphQL 爱了爱了)
- 装饰器的工厂模式, 控制装饰行为

Express 项目的控制器与装饰器实现:

> 项目.d.ts 文件的 Request 定义为 any, 在自己的项目中如果有确切的类型定义可以 extends 原本的 Request, 然后修改回调(Koa 的话是 ctx)函数中的 Request 类型规范.

```typescript
import "reflect-metadata";

enum Method {
  get = "get",
  post = "post"
}

function controller(target: any) {
  for (let key in target.prototype) {
    // console.log(Reflect.getMetadata("path", target.prototype, key));
    const path = Reflect.getMetadata("path", target.prototype, key);
    const method: Method = Reflect.getMetadata("method", target.prototype, key);
    const handler = target,prototype[key];
    if(path && method && handler){
      router[method](path, handler);
    }
  }

}

// function get() {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "get", target, key);
//   };
// }

// function post() {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata("path", path, target, key);
//     Reflect.defineMetadata("method", "post", target, key);
//   };
// }

// 装饰器工厂
function decoFactory(type: string){
  return function (path: string){
    return function (target: any, key: string) {
        Reflect.defineMetadata("path", path, target, key);
        Reflect.defineMetadata("method", type, target, key);
      };
  }
}

const get = decoFactory("get");
const post = decoFactory("post");
const put = decoFactory("put");

@controller
class LoginController {
  @get("/")
  home() {
    // 逻辑
  }
}
```

在`@get()`中定义元数据, 然后在`@controller`中收集元数据, 并去使用

## Injection

容器: 对象池, 在运行时(应用初始化?)时处理依赖, 并将类实例化, 由容器来管理每个对象实例信息
用户不关心什么时候创建, 当需要拿到对象实例时就能拿到
依赖对象的实例化是自动的.

Midway 内部有自动扫描(依赖收集吗?)的机制, 即在应用正式启动前会先去进行这一步, 包含装饰器的文件会自动绑定到容器.  
嗯我感觉至少`run/midway-router.json`的文件是这一步得来的, 因为路由和控制器也是装饰器的形式. 容器的话, 还不太清楚各个装饰器对应的容器关系是怎么样的.

- ApplicationContext, 基础容器, 添加定义以及根据定义获取对象实例
- Container, 做了上层封装, 通过 bind 函数快速生成类定义
- RequestContext, 请求链路容器, 自动销毁对象, 并依赖另一个容器创建实例(啥意思我也不太懂)

对象定义, 由对象基本元信息组成, 如

- 属性
- 依赖
- 是否异步创建
- 初始化方法

用处: 在容器被创建后, 需要往其中添加对象定义然后容器才能将对应对象创建出(实例化?)
稍微看了一下, 也是借助`Reflect`和`reflect-metadata`

```js
container.get("a") instanceof A; // true
```

容器内部是以何种形态储存的? 是以类存储每次`get`返回一个新实例吗?

实际上不会每次都手动绑定然后通过`get/getAsync`拿到对应对象. 而是通过`@provide`与`@inject`来完成绑定定义与自动注入属性

(demo 代码中真的只有属性被额外加了`@inject`, 方法不需要, 是因为被作为元信息收集了吗?)

```typescript
@provide()
export class UserService {
  @inject()
  userModel;

  async getUser(userId) {
    return await this.userModel.get(userId);
  }
}
```

`userModel`应该是 ORM 提供的吧?

`UserService`类直接可以被导出, 它会被 IoC 容器自动扫描并绑定定义(`bind`)到容器.

(参数为对象 id, 可选)

`@inject`稍微复杂一些, 有点不太懂.

> 将容器中的定义实例化成一个对象, 绑定到属性中. 意思是这个属性会被绑定到容器中`UserService`实例对象?

这样调用时可以在实例中访问到该属性(正是由于这句话才产生了我上面的理解, 到时候还不懂的话去问师兄吧?)

注入的时机为实例化之后, 即在 constructor 方法中无法获取注入属性, 除非使用 **构造器注入**

父类属性被`@inject()`修饰后, 子类实例也会获取到该属性, 因为是被添加到父类原型上的?

对象 ID, 默认为驼峰形式的类名(`UserService` -> `userService`, `A` -> `a`), 可以修改默认的 ID 来实现同名注入不同实例.

(文档读到这里突然感觉到一个问题, 我好像还是对**依赖注入** **控制反转** 这几个概念有点似懂非懂?)

作用域配置, 即容器作用域级别?

- Singleton 单例，全局唯一（进程级别）
- Request 默认，请求作用域，生命周期随着请求链路，在请求链路上唯一，请求结束立即销毁
- Prototype 原型作用域，每次调用都会重复创建一个新的对象

修改方式:

```typescript
@scope(ScopeEnum.Prototype)
@provide("petrol")
export class PetrolEngine implements Engine {
  capacity = 10;
}

@scope(ScopeEnum.Singleton)
@provide("diesel")
export class DieselEngine implements Engine {
  capacity = 20;
}

// in IoC Container
// 每次调用重复创建
assert(container.getAsync("petrol") === container.getAsync("petrol")); // false
// 进程级别唯一
assert(container.getAsync("diesel") === container.getAsync("diesel")); // true
```

异步初始化, 用于某个实例在被其他依赖调用前进行初始化, 通过`@init`来确保初始化方法被调用

```typescript
@provide()
export class BaseService {
  @config("hello")
  config;

  @plugin("plugin2")
  plugin2;

  @init()
  async init() {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.config.c = 10;
        resolve();
      }, 100);
    });
  }
}
```

被标记的方法会在实例化后自动调用, 仍然以异步的形式.

动态函数注入, 适用于如工厂函数需要对不同场景针对性的返回不同实例,

```typescript
export function adapterFactory(context: IApplicationContext) {
  return async (adapterName: string) => {
    if (adapterName === "google") {
      return await context.getAsync("googleAdapter");
    }

    if (adapterName === "baidu") {
      return await context.getAsync("baiduAdapter");
    }

    // return await context.getAsync(adapterName + 'Adapter');
  };
}

providerWrapper([
  {
    id: "adapterFactory",
    provider: adapterFactory,
  },
]);

// 使用

@provide()
export class BaseService {
  @config("adapterName")
  adapterName;

  @inject("adapterFactory")
  factory;

  adapter: Adapter;

  @init()
  async init() {
    this.adapter = await this.factory(this.adapterName);
  }
}
```

(适配器?)

注意工厂函数使用的容器级别.  
内部还是会去`getAsync`获取实例.

(得去看看`TypeDI`+`TypeORM`的思路...)

注入已有的对象, 如应用已经具有现成的实例, 现在需要该实例对象能够被容器中的实例(容器中的实例? 这么说容器中存储的形态是实例?)引用.

```typescript
// in global file
import * as urllib from "urllib";
container.registerobject("httpclient", urllib);

// use
@provide()
export class BaseService {
  @inject()
  httpclient;

  async getUser() {
    return await this.httpclient.request("/api/getuser");
  }
}
```

这么神奇的吗

## IoC

DI 是实现 IoC 的一种方式, 在 IoC 思想中, 存在一个调度者(容器), 它拥有系统内所有对象, 在一个对象被创建时, 它所需要的依赖会被注入到对象中. 而不是硬编码在代码中.

"哪些控制被反转了?"

依赖对象的获得. 不再是由每个对象自己去获取与其合作的对象.

IoC 意味着将设计好的对象交给容器控制, 容器控制对象, 主要控制了其外部资源获取. 为什么叫反转? 因为对象只是被动的接收依赖.

### 在 JS 中实现 IoC

在前面 Express 项目中我们可以看到其实现不可缺少的部分, `Reflect`, 以及 `reflect-metadata`. 后者主要是在`Reflect`对象上进行了扩展, 增强了元数据的能力.

```js
Reflect.defineMetadata(metadataKey, metadataValue, C.prototype, "method");
```

在这里元数据会被定义到**C 的原型对象**上.

在前面的例子里, 我们主要在方法装饰器中收集(定义)了元数据, 包括该方法对应的 **路径** 与 **请求方式**, 然后在 `@controller` 中, 我们以原型对象上获取到的键去把元数据取出来, 并创建路由与其对应的 handler.

几个疑惑:

- 元数据是储存在类上的吗? 或者说以类/对象为单位?
- `TypeGraphQL`的参数装饰器也是预先收集 schema 定义然后在收集完元数据后生成 SDL?
- 元数据的加载使用优先级比类中代码更高(因为装饰器执行更早).

常用 API

- defineMetadata
- hasMetadata
- hasOwnMetadata
- getMetadata
- getOwnMetadata
- getMetadataKeys
- getOwnMetadataKeys
- deleteMetadata

还有一种装饰器写法, 但我觉得可读性不太好

## 整理

大致整理一下我认为`Injection`做了什么:

- 依赖注入, 在`reflect-metadata`的基础上更贴近了 IoC 的思想, 尤其是核心的容器概念. 这一点在`TypeDI+TypeORM+TypeGraphQL`的协作中也有体现:

```typescript
TypeORM.useContainer(Container);

async function initialize() {
  await TypeORM.createConnection({
    // ...database config
  });

  const schema = await buildSchema({
    container: Container,
  });
```

虽然还没有源码但是大致能猜出来, TypeGraphQL 会去容器中收集对象信息, 然后 build schema, 那么`@Query`这种 API 会把数据注入到统一容器? 按照这个代码, 全局的容器是统一的. (好像这才是正常的? 不然一堆容器更不好维护)

- 装饰器注入, 不需要每次手动绑定(`bind`)再`getAsync`拿到对象, 使用`@provide`来使得类会被容器自动扫描并绑定. `@inject`用于对属性注入, 会去容器中查找定义并绑定到属性?

- 其他功能, 如异步初始化/动态注入.
