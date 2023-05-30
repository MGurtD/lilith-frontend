import { AxiosInstance } from "axios";
import apiClient, { logException } from "../api.client";

export class UserService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/User";
  }

  public async GetAll(): Promise<User[] | undefined> {
    try {
      let response = await this.apiClient.get(this.resource);
      if (response.status === 200) {
        //const res:AxiosResponse<User[]> = response.data;
        const models = response.data as Array<User>;
        console.log(models);
        return models;
        //return res;
      }
    } catch (error) {
      logException(error);
    }
  }

  public async GetById(id: string): Promise<User | undefined> {
    try {
      let response = await this.apiClient.get(`${this.resource}/${id}`);
      if (response.status === 200) {
        return response.data as User;
      }
    } catch (error) {
      logException(error);
    }
  }

  public async Update(user: User): Promise<boolean> {
    try {
      let response = await this.apiClient.put(
        `${this.resource}/${user.id}`,
        user
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      logException(error);
    }
    return false;
  }
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  disabled: boolean;
  roleId: string;
}
