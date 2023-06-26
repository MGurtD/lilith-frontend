import { defineStore } from "pinia";
import SharedServices from "../../../api/services";
import PurchaseServices from "../services";
import {
  PurchaseInvoice,
  PurchaseInvoiceSerie,
  PurchaseInvoiceStatus,
  PurchaseInvoiceUpdateStatues,
  PurchaseMasterData,
} from "../types";
import { Exercise, PaymentMethod, Tax } from "../../../types";
import { Supplier } from "../types";

export const usePurchaseMasterDataStore = defineStore({
  id: "purchaseMasterData",
  state: () => ({
    masterData: {
      paymentMethods: [] as Array<PaymentMethod>,
      series: [] as Array<PurchaseInvoiceSerie>,
      statuses: [] as Array<PurchaseInvoiceStatus>,
      suppliers: [] as Array<Supplier>,
      taxes: [] as Array<Tax>,
      exercises: [] as Array<Exercise>,
    } as PurchaseMasterData,
    purchaseInvoices: undefined as Array<PurchaseInvoice> | undefined,
  }),
  getters: {},
  actions: {
    async fetchMasterData() {
      this.masterData.series =
        await PurchaseServices.PurchaseInvoiceSerie.getAll();
      this.masterData.statuses =
        await PurchaseServices.PurchaseInvoiceStatus.getAll();
      this.masterData.series =
        await PurchaseServices.PurchaseInvoiceSerie.getAll();
      this.masterData.suppliers = await PurchaseServices.Supplier.getAll();
      this.masterData.paymentMethods =
        await SharedServices.PaymentMethod.getAll();
      this.masterData.exercises = await SharedServices.Exercice.getAll();
      this.masterData.taxes = await SharedServices.Tax.getAll();
    },
    async getPurchaseInvoices(
      startDate: string,
      endDate: string,
      statusId?: string,
      excludeStatusId?: string,
      supplierId?: string,
      exerciseId?: string
    ) {
      if (statusId) {
        this.purchaseInvoices =
          await PurchaseServices.PurchaseInvoice.GetBetweenDatesAndStatus(
            startDate,
            endDate,
            statusId
          );
      } else if (excludeStatusId) {
        this.purchaseInvoices =
          await PurchaseServices.PurchaseInvoice.GetBetweenDatesAndExcludeStatus(
            startDate,
            endDate,
            excludeStatusId
          );
      } else if (supplierId) {
        this.purchaseInvoices =
          await PurchaseServices.PurchaseInvoice.GetBetweenDatesAndSupplier(
            startDate,
            endDate,
            supplierId
          );
      } else {
        this.purchaseInvoices =
          await PurchaseServices.PurchaseInvoice.GetBetweenDates(
            startDate,
            endDate
          );
      }
    },

    async UpdateInvoicesStatus(
      request: PurchaseInvoiceUpdateStatues
    ): Promise<boolean> {
      const updated = await PurchaseServices.PurchaseInvoice.UpdateStatuses(
        request
      );
      console.log("purchaseMasterData.UpdateInvoicesStatus", updated);
      return updated;
    },
  },
});
