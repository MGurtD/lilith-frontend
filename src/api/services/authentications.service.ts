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
      if (response.status === 200) {
        console.log(response.data);

        const decodedToken = jwtDecode(response.data.token);
        console.log(decodedToken);
      }
    } catch (error) {}
  }

  public async Register(UserRegister: UserRegister) {
    try {
      let response = await this.apiClient.post(
        `${this.resource}/Register`,
        UserRegister
      );
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {}
  }
}

export interface UserRegister {
  name: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
