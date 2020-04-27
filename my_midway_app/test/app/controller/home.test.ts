import { app} from "midway-mock/bootstrap";


describe("test/app/controller/home.test.ts", () => {
  it("GET /", () => {
    return app
      .httpRequest()
      .get("/")
      .set("Accept", "text/plain; charset=utf-8")
      .expect("Content-Type", "text/plain; charset=utf-8")
      .expect(200)
      .expect("Welcome to midwayjs!");
  });

  it("GET /config", () => {
    return app
      .httpRequest()
      .get("/config")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({ homeConfig: "Unit Test Mock" });
  });

  it("GET /uid/:uid", () => {
    return app
      .httpRequest()
      .get("/uid/599")
      .expect(200)
      .expect(({ body: { uid } }) => {
        uid = String(uid);
      })
      .expect({ uid: "599" });
  });
});
