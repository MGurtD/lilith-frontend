import { AxiosInstance } from "axios";
import apiClient from "../api.client";

export class AuthenticationService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/role";
  }

  public async GetAll() {
    try {
      let response = await this.apiClient.get(this.resource);
      if (response.status === 200) {
        const roles = response.data as Array<Role>;
        console.log(roles);

        return roles;
      }
    } catch (error) {}
  }

  public async GetById(id: string) {
    try {
      let response = await this.apiClient.get(`${this.resource}/${id}`);
      if (response.status === 200) {
        const role = response.data as Role;
        console.log(role);

        return role;
      }
    } catch (error) {}
  }
}

export interface Role {
  id: string;
  name: string;
}
