import { IUserService, IUserOptions, IUserResult, ITestResult } from "../interface";
export declare class UserService implements IUserService {
    getUser(options: IUserOptions): Promise<IUserResult>;
    testService(params: string): Promise<ITestResult>;
}
