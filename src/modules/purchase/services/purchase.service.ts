import apiClient, { logException } from "../../../api/api.client";
import BaseService from "../../../api/base.service";
import {
  PurchaseInvoiceDueDate,
  PurchaseInvoice,
  PurchaseInvoiceSerie,
  PurchaseInvoiceStatus,
  PurchaseInvoiceTransition,
  PurchaseInvoiceUpdateStatues,
  PurchaseInvoiceImport,
} from "../types";

export class PurchaseInvoiceSerieService extends BaseService<PurchaseInvoiceSerie> {}

export class PurchaseInvoiceStatusService extends BaseService<PurchaseInvoiceStatus> {
  async addTransition(model: PurchaseInvoiceTransition): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.post(
        `${this.resource}/Transition`,
        model
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
  async removeTransition(model: PurchaseInvoiceTransition): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await this.apiClient.delete(
        `${this.resource}/Transition/${model.fromStatusId}/${model.toStatusId}`
      );
      if (response.status === 200 || response.status === 201) {
        result = true;
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
}

export class PurchaseInvoiceService extends BaseService<PurchaseInvoice> {
  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<PurchaseInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<PurchaseInvoice>;
    }
  }

  async GetBetweenDatesAndStatus(
    startTime: string,
    endTime: string,
    statusId: string
  ): Promise<Array<PurchaseInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&statusId=${statusId}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<PurchaseInvoice>;
    }
  }

  async GetBetweenDatesAndExcludeStatus(
    startTime: string,
    endTime: string,
    excludeStatusId: string
  ): Promise<Array<PurchaseInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&excludeStatusId=${excludeStatusId}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<PurchaseInvoice>;
    }
  }

  async GetBetweenDatesAndSupplier(
    startTime: string,
    endTime: string,
    supplierId: string
  ): Promise<Array<PurchaseInvoice> | undefined> {
    const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}&supplierId=${supplierId}`;
    const response = await apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<PurchaseInvoice>;
    }
  }

  async GetDueDates(
    purchaseInvoice: PurchaseInvoice
  ): Promise<Array<PurchaseInvoiceDueDate> | undefined> {
    const response = await apiClient.post(
      `${this.resource}/DueDates`,
      purchaseInvoice
    );
    if (response.status === 200) {
      return response.data as Array<PurchaseInvoiceDueDate>;
    }
  }

  async RecreateDueDates(purchaseInvoice: PurchaseInvoice): Promise<boolean> {
    const response = await apiClient.post(
      `${this.resource}/RecreateDueDates`,
      purchaseInvoice
    );
    return response.status === 200;
  }

  async UpdateStatuses(
    request: PurchaseInvoiceUpdateStatues
  ): Promise<boolean> {
    const endpoint = `${this.resource}/UpdateStatuses`;
    const response = await apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async CreateImport(request: PurchaseInvoiceImport): Promise<boolean> {
    const endpoint = `${this.resource}/Import`;
    const response = await apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async UpdateImport(request: PurchaseInvoiceImport): Promise<boolean> {
    const endpoint = `${this.resource}/Import/${request.id}`;
    const response = await apiClient.put(endpoint, request);
    return response.status === 200;
  }

  async DeleteImport(request: PurchaseInvoiceImport): Promise<boolean> {
    const endpoint = `${this.resource}/Import/${request.id}`;
    const response = await apiClient.delete(endpoint);
    return response.status === 200;
  }
}
