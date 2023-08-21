import { SalesOrderDetail, SalesOrderHeader } from "../types";
import apiClient, { logException } from "../../../api/api.client";
import BaseService from "../../../api/base.service";

export class SalesOrderDetailService extends BaseService<SalesOrderDetail> {}
export class SalesOrderHeaderService extends BaseService<SalesOrderHeader> {
    async GetBetweenDates(
        startTime: string,
        endTime: string        
      ): Promise<Array<SalesOrderHeader> | undefined> {
        this.resource = this.resource.replace('Header','');
        const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
        const response = await apiClient.get(endpoint);
        if (response.status === 200) {
          return response.data as Array<SalesOrderHeader>;
        }
      }
}