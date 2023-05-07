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
        const users = response.data as Array<user>;
        console.log(users);

        return users;
      }
    } catch (error) {}
  }

  public async GetById(id: string) {
    try {
      let response = await this.apiClient.get(`${this.resource}/${id}`);
      if (response.status === 200) {
        const user = response.data as user;
        console.log(user);

        return user;
      }
    } catch (error) {}
  }
}

export interface user {
  id: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  disabled: boolean;
}
