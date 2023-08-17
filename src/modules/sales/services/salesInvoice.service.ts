import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";
import {
  CreateInvoiceDetailsFromOrderDetailsRequest,
  CreateInvoiceRequest,
  SalesInvoice,
  SalesInvoiceDetail,
  SalesInvoiceDueDate,
  SalesInvoiceImport,
} from "../types";

export class SalesInvoiceService extends BaseService<SalesInvoice> {
  async Create(
    request: CreateInvoiceRequest
  ): Promise<GenericResponse<SalesInvoice> | undefined> {
    const endpoint = `${this.resource}`;
    const response = await this.apiClient.post(endpoint, request);
    if (response.status === 200) {
      return response.data as GenericResponse<SalesInvoice>;
    }
  }

  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<SalesInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<SalesInvoice>;
    }
  }

  async GetBetweenDatesAndStatus(
    startTime: string,
    endTime: string,
    statusId: string
  ): Promise<Array<SalesInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&statusId=${statusId}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<SalesInvoice>;
    }
  }

  async GetBetweenDatesAndCustomer(
    startTime: string,
    endTime: string,
    customerId: string
  ): Promise<Array<SalesInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&customerId=${customerId}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<SalesInvoice>;
    }
  }

  async Update(request: SalesInvoice) {
    const endpoint = `${this.resource}/${request.id}`;
    const response = await this.apiClient.put(endpoint, request);
    return response.status === 200;
  }

  async Delete(request: SalesInvoice) {
    const endpoint = `${this.resource}/${request.id}`;
    const response = await this.apiClient.delete(endpoint);
    return response.status === 200;
  }

  async CreateDetail(request: SalesInvoiceDetail) {
    const endpoint = `${this.resource}/Detail`;
    const response = await this.apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async CreateInvoiceDetailsFromOrderDetails(
    request: CreateInvoiceDetailsFromOrderDetailsRequest
  ) {
    const endpoint = `${this.resource}/Detail`;
    const response = await this.apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async UpdateDetail(request: SalesInvoiceDetail) {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await this.apiClient.put(endpoint, request);
    return response.status === 200;
  }

  async DeleteDetail(request: SalesInvoiceDetail) {
    const endpoint = `${this.resource}/Detail/${request.id}`;
    const response = await this.apiClient.delete(endpoint);
    return response.status === 200;
  }
}
