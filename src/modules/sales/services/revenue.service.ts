import { Revenue } from "../types";
import BaseService from "../../../api/base.service";

export class RevenueService extends BaseService<Revenue> {
  async GetByMonthAndYear(
    month: number,
    year: number
  ): Promise<Revenue | undefined> {
    const endpoint = `${this.resource}?month=${month}&year=${year}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Revenue;
    }
  }
}
