import { logException } from "../../../api/api.client";
import BaseService from "../../../api/base.service";
import { PurchaseInvoiceSerie, PurchaseInvoiceStatus, PurchaseInvoiceTransition } from "../types";

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
      const response = await this.apiClient.post(
        `${this.resource}/Transition/${model.id}`,
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
}
