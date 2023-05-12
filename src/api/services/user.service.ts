import { AxiosInstance } from "axios";
import apiClient, { logException } from "../api.client";

export class UserService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/User";
  }

  public async GetAll(): Promise<User[] | undefined>  {
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
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  disabled: boolean;
}
