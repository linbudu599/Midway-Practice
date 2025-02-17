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
    createConnection("default")
      .then(async (connection) => {
        // insert initialize user info
        console.log("DataBase Connected");
        await connection.manager.insert(User, initialData(5));
        console.log("Operation Successed");
      })
      .catch((error) => console.log(error));
  }
}

export default AppBootHook;
