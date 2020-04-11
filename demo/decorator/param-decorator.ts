function paramDeco(target: any, key: string, paramIndex: number) {
  // key是所在方法
  console.log(target, key, paramIndex);
}

class Test3 {
  getInfo(@paramDeco name: string): void {
    console.log(name);
  }
}

const test3 = new Test3();

test3.getInfo("budu");
