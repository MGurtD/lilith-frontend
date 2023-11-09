import {
  CreateSalesHeaderRequest,
  DeliveryNote,
  DeliveryNoteDetail,
} from "../types";
import apiClient from "../../../api/api.client";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class DeliveryNoteService extends BaseService<DeliveryNote> {
  async Create(
    request: CreateSalesHeaderRequest
  ): Promise<GenericResponse<DeliveryNote>> {
    const endpoint = `${this.resource}`;
    const response = await this.apiClient.post(endpoint, request);
    return response.data as GenericResponse<DeliveryNote>;
  }

  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<DeliveryNote> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<DeliveryNote>;
    }
  }

  async GetBetweenDatesAndCustomer(
    startTime: string,
    endTime: string,
    customerId: string
  ): Promise<Array<DeliveryNote> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&customerId=${customerId}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<DeliveryNote>;
    }
  }

  async CreateDetail(
    request: DeliveryNoteDetail
  ): Promise<GenericResponse<DeliveryNoteDetail>> {
    const endpoint = `${this.resource}/Detail`;
    const response = await apiClient.post(endpoint, request);
    return response.data as GenericResponse<DeliveryNoteDetail>;
  }

  async UpdateDetail(
    request: DeliveryNoteDetail
  ): Promise<GenericResponse<DeliveryNoteDetail>> {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await apiClient.put(endpoint, request);
    return response.data as GenericResponse<DeliveryNoteDetail>;
  }

  async DeleteDetail(
    request: DeliveryNoteDetail
  ): Promise<GenericResponse<DeliveryNoteDetail>> {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await apiClient.delete(endpoint);
    return response.data as GenericResponse<DeliveryNoteDetail>;
  }
}
