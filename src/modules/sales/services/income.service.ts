import { ConsolidatedIncomes } from "../types";
import apiClient from "../../../api/api.client";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class IncomeService extends BaseService<ConsolidatedIncomes> {
  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<ConsolidatedIncomes> | undefined> {
    const endpoint = `${this.resource}/consolidated?startTime=${startTime}&endTime=${endTime}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<ConsolidatedIncomes>;
    }
  }
  async getMonthly(year: number, month: number): Promise<number | undefined> {
    let endpoint = `${this.resource}/Monthly?year=${year}&month=${month}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as number;
    }
  }
}
