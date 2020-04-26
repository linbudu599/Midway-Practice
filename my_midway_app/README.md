# Midway-Pratice

## Docs & NoteBook

## Problem

> These problems occurred when I'm trying to make a simple RESTFul API.

- Problems on `TypeORM` & `TypeDI`, I used to use them with `typeorm-typedi-extensions`, which make the code clean and readable. So in my origin plans I should be able to use like this:

  ```typescript
  // src/app.ts, notice I had already create the `Container`
  import { createConnection, useContainer } from "typeorm";
  import { Container } from "typedi";

  useContainer(Container);

  class AppBootHook {
    // ...
    async willReady() {
      console.log("===TypeORM Starting===");
      createConnection({
        // ...config
      })
        .then(async (connection) => {
          // check connection
        })
        .catch((error) => console.log(error));
    }
  }

  //src/service/user.ts
  import { Repository } from "typeorm";
  import { InjectRepository } from "typeorm-typedi-extensions";

  @provide("userService")
  export class UserService implements IUserService {
    connection: Connection;
    constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async insertUser() {
      console.log("===insertUser Service Invoked===");
      const result = this.userRepository.insert(initialData(5));
      return result;
    }
  ```
  
  