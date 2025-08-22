import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";
import {
  FindInvoicesRequest,
  FindInvoicesResponse,
  VerifactuInvoiceRequest,
} from "../types";

export class VerifactuService extends BaseService<any> {
  async FindInvoices(
    month: number,
    year: number
  ): Promise<FindInvoicesResponse | undefined> {
    const endpoint = `${this.resource}?Month=${month}&Year=${year}`;
    const response = await this.apiClient.get(endpoint);

    if (response.status === 200) {
      return response.data as FindInvoicesResponse;
    }
  }

  async GetInvoiceRequests(
    invoiceId: string
  ): Promise<VerifactuInvoiceRequest[] | undefined> {
    const endpoint = `${this.resource}/${invoiceId}/Requests`;
    const response = await this.apiClient.get(endpoint);

    if (response.status === 200) {
      return response.data as VerifactuInvoiceRequest[];
    }
  }

  async SendToVerifactu(
    invoiceId: string
  ): Promise<GenericResponse<any> | undefined> {
    const endpoint = `${this.resource}/${invoiceId}/SendToVerifactu`;
    const response = await this.apiClient.post(endpoint);

    if (response.status === 200) {
      return response.data as GenericResponse<any>;
    }
  }
}
