import { Container } from "injection";

class A {}
class B {}

const container = new Container();

container.bind(A);
container.bind(B);

class C {
  a: any;
  b: any;
  constructor() {
    this.a = container.get("a");
    this.b = container.get("b");
    console.log(this.a, this.b);
  }
}

const c = new C();

// 容器: 对象池, 在运行时(应用初始化?)时处理依赖, 并将类实例化, 由容器来管理每个对象实例信息
// 用户不关心什么时候创建, 当需要拿到对象实例时就能拿到
// 依赖对象的实例化是自动的

console.log(container.get("a") instanceof A)

