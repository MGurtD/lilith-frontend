import { AxiosInstance } from "axios";
import apiClient, { logException } from "../api.client";

export class FileService {
  public apiClient: AxiosInstance;
  private resource: string;
  constructor() {
    this.apiClient = apiClient;
    this.resource = "/File";
  }

  public async GetByPath(fileName: string): Promise<any | undefined> {
    try {
      let response = await this.apiClient.get(
        `${this.resource}?fileName=${fileName}`
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      logException(error);
    }
  }
}
