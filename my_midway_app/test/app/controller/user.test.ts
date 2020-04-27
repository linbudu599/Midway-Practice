import { app, assert } from 'midway-mock/bootstrap';

describe("test/app/controller/user.test.ts", () => {
  it("GET /user/insert", () => {
    return app
      .httpRequest()
      .get("/user/insert")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        return res.body.data.affectedRows === 5;
      });
  });

  it("GET /user/uid/:uid", () => {
    return (
      app
        .httpRequest()
        .get("/user/uid/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        // TODO: check only parts of res fields
        .expect({
          success: true,
          message: "Successfully Search User Info",
          data: {
            uid: 1,
            name: "linbudu",
            description: "Frontend Engineer",
            age: 21,
            job: "Frontend Engineer",
            isMarried: false,
          },
        })
    );
  });
});
