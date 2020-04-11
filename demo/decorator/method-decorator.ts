// 普通方法 target -> prototype
// 静态: 类的构造函数
// 执行时机同类装饰器
function methodDeco(target: any, key: string, descripitor: PropertyDescriptor) {
  console.log(target, key, descripitor);
  // 使用修饰符禁止重写方法等
  // 修改函数值
  descripitor.writable = false;
  // descripitor.value = (): string => {
  //   return "Method Decorator";
  // };
}

class Test1 {
  @methodDeco
  commonMethod(): string {
    return "common";
  }
  @methodDeco
  static staticMethod(): string {
    return "static";
  }
}

const test1 = new Test1();
