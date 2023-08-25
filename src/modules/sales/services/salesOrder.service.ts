import { SalesOrderDetail, SalesOrderHeader } from "../types";
import apiClient, { logException } from "../../../api/api.client";
import BaseService from "../../../api/base.service";

export class SalesOrderDetailService extends BaseService<SalesOrderDetail> {}

export class SalesOrderHeaderService extends BaseService<SalesOrderHeader> {
  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<SalesOrderHeader> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<SalesOrderHeader>;
    }
  }

  async CreateDetail(request: SalesOrderDetail): Promise<boolean> {
    const endpoint = `${this.resource}/Detail`;
    const response = await apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async UpdateDetail(request: SalesOrderDetail): Promise<boolean> {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await apiClient.put(endpoint, request);
    return response.status === 200;
  }

  async DeleteDetail(request: SalesOrderDetail): Promise<boolean> {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await apiClient.delete(endpoint);
    return response.status === 200;
  }
}
