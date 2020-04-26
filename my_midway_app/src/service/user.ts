import { provide } from "midway";
import { Connection, getConnection } from "typeorm";
import { User } from "../entity/user";
import { initialData } from "../helper/init";
import { IUserService, searchConditions } from "../interface";

// import { InjectRepository } from "typeorm-typedi-extensions";

@provide("userService")
export class UserService implements IUserService {
  connection: Connection;
  constructor() // @InjectRepository(User) private readonly userRepository: Repository<User>
  {
    // this.userRepository = userRepository;
  }
  // async getUser(options: IUserOptions): Promise<IUserResult> {
  //   const connection = getConnection();
  //   const res = await connection.manager.insert(User, initialData(5));
  //   const a = await connection.manager.delete(User,{name:"sds"})
  //   console.log(res);
  //   console.log("getConnection Successfully");
  //   return {
  //     id: options.id,
  //     username: "mockedName",
  //     phone: "12345678901",
  //     email: "xxx.xxx@xxx.com",
  //   };
  // }
  async getUser() {
    console.log("===getUser Service Invoked===");
    const result = await this.connection.manager.find(User);
    console.log(result);
    return result;
  }

  async insertUser() {
    console.log("===insertUser Service Invoked===");
    const connection = getConnection();
    const result = connection.manager.insert(User, initialData(5));
    // const result = this.userRepository.insert(initialData(5));
    console.log(result);
    return result;
  }

  async searchUser(conditions: searchConditions) {
    console.log("===searchUser Service Invoked===");
    const result = this.connection.manager.find(User, { ...conditions });
    console.log(result);
    return result;
  }

  async deleteUser(uid: number) {
    console.log("===deleteUser Service Invoked===");
    const result = this.connection.manager.delete(User, uid);
    console.log(result);
    return result;
  }
}
