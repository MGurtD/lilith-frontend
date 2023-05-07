import { AxiosInstance } from "axios";
import apiClient from "../api.client";
import jwtDecode from "jwt-decode";

export class AuthenticationService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/Authentication";
  }

  public async Login(UserLogin: UserLogin) {
    try {
      let response = await this.apiClient.post(
        `${this.resource}/Login`,
        UserLogin
      );

      return response.data;
    } catch (error) {}
  }

  public async Register(UserRegister: UserRegister) {
    try {
      let response = await this.apiClient.post(
        `${this.resource}/Register`,
        UserRegister
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export interface UserRegister {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  mail: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
}
