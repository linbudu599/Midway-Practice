import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { User } from "./entity/user";
import { initialData } from "./helper/init";

useContainer(Container);

class AppBootHook {
  app: any;
  constructor(app: any) {
    this.app = app;
  }

  async willReady() {
    console.log("===TypeORM Starting===");
    createConnection({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "111",
      database: "midway_test",
      entities: [User],
      synchronize: true,
      dropSchema: true,
      logging: true,
      logger: "advanced-console",
    })
      .then(async (connection) => {
        // insert initialize user info
        console.log("DataBase Connected");
        const res = await connection.manager.insert(User, initialData(5));
        console.log(res);
        console.log("Operation Successed");
      })
      .catch((error) => console.log(error));
  }

  async didReady() {}
}

export default AppBootHook;
