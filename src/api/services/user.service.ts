import { AxiosInstance } from "axios";
import apiClient from "../api.client";

export class UserService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/user";
  }

  public async GetAll() {
    try {
      let response = await this.apiClient.get(this.resource);
      if (response.status === 200) {
        const users = response.data as Array<User>;
        console.log(users);

        return users;
      }
    } catch (error) {}
  }

  public async GetById(id: string) {
    try {
      let response = await this.apiClient.get(`${this.resource}/${id}`);
      if (response.status === 200) {
        const user = response.data as User;
        console.log(user);

        return user;
      }
    } catch (error) {}
  }
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  disabled: boolean;
}
