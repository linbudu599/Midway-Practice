import * as assert from "assert";
import { mm } from "midway-mock";

describe("test/service/user.test.ts", () => {
  let app;

  beforeAll(() => {
    app = mm.app({
      typescript: true,
    });
    return app.ready();
  });

  it("Unit Test Mock Service", async () => {
    // Explain: 只是把注入的依赖服务取出来就可以了
    const user = await app.applicationContext.getAsync("userService");
    const result = await user.uTMockService(599);
    const { id } = result;
    assert(id === 599);
    expect(id).toBe(599);
    // assert(username === "mockedName");
  });
});
