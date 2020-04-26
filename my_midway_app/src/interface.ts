import { InsertResult, DeleteResult } from "typeorm";
import { User } from "./entity/user";

/**
 * @description User-Service response
 */
export interface IUserResult {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  getUser(): Promise<IUser[]>;
  insertUser(): Promise<InsertResult>;
  searchUser(conditions: searchConditions): Promise<User[]>;
  deleteUser(uid: number): Promise<DeleteResult>;
}
export type searchConditions = Partial<IUser>;
export interface IUser {
  uid?: number;
  name: string;
  description?: string;
  age: number;
  job?: string;
  isMarried?: boolean;
}
