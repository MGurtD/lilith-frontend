import apiClient, { logException } from "../../../api/api.client";
import BaseService from "../../../api/base.service";
import {
  PurchaseInvoice,
  PurchaseInvoiceSerie,
  PurchaseInvoiceStatus,
  PurchaseInvoiceTransition,
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
  async getBetweenDates(startDate: Date, endDate: Date): Promise<Array<PurchaseInvoice> | undefined> {
    try{
      const response = await apiClient.post(`${this.resource}/GetBetweenDates`, {startDate, endDate});
      if (response.status === 200) {
        return response.data as Array<PurchaseInvoice>;
      }
    }catch (err) {
      logException(err);
    }
  }
}

