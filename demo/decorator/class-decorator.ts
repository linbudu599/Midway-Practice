// 类装饰器, 入参: 构造函数
// 执行时机: 类创建完成后执行
// 执行顺序: 从下到上  从右到左  后搜集的先执行
// function classDeco(constructor: Function): void {
//   console.log(constructor);
//   console.log("Class Decorator");
//   // 可以在Babel编译结果知道方法被添加到这里了
//   constructor.prototype.methodFromDeco = (): void => {
//     console.log("Method From Class Decorator");
//   };
// }
// 这种模式更好  可以根据条件判断是否启用装饰器或如何装饰
// 但这两种都会导致在实例上没有该方法提示
// function classDeco(): Function {
//   return function (constructor: Function): void {
//     console.log(constructor);
//     console.log("Class Decorator");
//     // 可以在Babel编译结果知道方法被添加到这里了
//     constructor.prototype.methodFromDeco = (): void => {
//       console.log("Method From Class Decorator");
//     };
//   };
// }
function classDeco() {
  return function <T extends new (...args: any[]) => {}>(constructor: T): T {
    return class extends constructor {
      name = "deco!";
      methodFromDeco() {
        console.log("Method From Class Decorator");
      };
    };
  };
}

// @classDeco()
// class Test {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

const Test = classDeco()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
);

// const test = new Test("budu");
// console.log(test);
// // (test as any).methodFromDeco();
// test.methodFromDeco();

// 但是常见的还是@写法, 它是如何保证正确提示的?