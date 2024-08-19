import {
  PurchaseOrder,
  PurchaseOrderDetail,
} from "../types";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class OrderService extends BaseService<PurchaseOrder> {
  async getBetweenDates(
    startTime: string,
    endTime: string,
    supplierId?: string,
    statusId?: string
  ): Promise<Array<PurchaseOrder> | undefined> {
    let endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    if (supplierId) endpoint += `&supplierId=${supplierId}`;
    if (statusId) endpoint += `&statusId=${statusId}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<PurchaseOrder>;
    }
  }

  async addDetail(
    model: PurchaseOrderDetail
  ): Promise<GenericResponse<PurchaseOrderDetail>> {
    const response = await this.apiClient.post(
      `${this.resource}/Detail`,
      model
    );
    return response.data as GenericResponse<PurchaseOrderDetail>;
  }

  async updateDetail(
    model: PurchaseOrderDetail
  ): Promise<GenericResponse<PurchaseOrderDetail>> {
    const response = await this.apiClient.put(
      `${this.resource}/Detail/${model.id}`,
      model
    );
    return response.data as GenericResponse<PurchaseOrderDetail>;
  }

  async removeDetail(
    id: string
  ): Promise<GenericResponse<PurchaseOrderDetail>> {
    const response = await this.apiClient.delete(
      `${this.resource}/Detail/${id}`
    );
    return response.data as GenericResponse<PurchaseOrderDetail>;
  }
}
