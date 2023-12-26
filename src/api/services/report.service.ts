import { AxiosInstance } from "axios";
import reportApiClient from "../reports.client";

export class ReportService {
  public apiClient: AxiosInstance;
  constructor() {
    this.apiClient = reportApiClient;
  }

  public async Download(
    data: any,
    reportName: string,
    fileName: string
  ): Promise<any> {
    let response = await this.apiClient.post(
      `/download`,
      {
        data,
        reportName,
        fileName,
      },
      { responseType: "blob" }
    );
    if (response.status === 200) {
      return response.data;
    }
  }
}
