// 访问器装饰器
function visitorDeco(
  target: any,
  key: string,
  descripitor: PropertyDescriptor
) {
  // 修饰符是被修饰的属性
  // 也可以用修饰符去做修改
  console.log(target, key, descripitor);
}

class Test2 {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  @visitorDeco
  set name(name: string) {
    this._name = name;
  }
}
// get 与 set访问器只能有一个被装饰
const test2 = new Test2("budu");
console.log(test2.name)