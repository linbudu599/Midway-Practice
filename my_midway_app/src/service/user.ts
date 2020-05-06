import { provide } from "midway";
import { Container } from "typedi";
import { Connection, getConnection, useContainer } from "typeorm";
import { User } from "../entity/user";
import { initialData } from "../helper/init";
import { IUserService, searchConditions, IUTMock } from "../interface";

useContainer(Container);

@provide("userService")
export class UserService implements IUserService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }
  async uTMockService(id: number): Promise<IUTMock> {
    return new Promise<IUTMock>((resolve) => {
      setTimeout(() => {
        resolve({
          id: id,
          username: "mockedName",
          phone: "12345678901",
          email: "xxx.xxx@xxx.com",
        });
      }, 500);
    });
  }
  async getUser() {
    console.log("===getUser Service Invoked===");
    const result = await this.connection.manager.find(User);
    console.log(result);
    return result;
  }

  async insertUser() {
    console.log("===insertUser Service Invoked===");
    const connection = getConnection();
    // const res2 = await this.userRepository.insert(initialData(5));
    // console.log(res2);
    const result = connection.manager.insert(User, initialData(5));
    // console.log(result);
    return result;
  }

  async searchUser(conditions: searchConditions) {
    console.log("===searchUser Service Invoked===");
    const connection = getConnection();
    console.log(conditions);
    const result = await connection.manager.find(User, { ...conditions });
    console.log(result);
    return result;
  }

  async findByUid(uid: number): Promise<User> {
    console.log("===findByUid Service Invoked===");
    const connection = getConnection();
    // TODO: return null when uid dose not exist
    const result = await connection.manager.findOne(User, uid);
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
