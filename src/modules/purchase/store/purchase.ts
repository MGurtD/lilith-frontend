import { defineStore } from "pinia";
import SharedServices from "../../../api/services";
import PurchaseServices from "../services";
import {
  PurchaseInvoiceSerie,
  PurchaseInvoiceStatus,
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
  }),
  getters: {},
  actions: {
    async fetchMasterData() {
      this.masterData.series =
        await PurchaseServices.purchaseInvoiceSerie.getAll();
      this.masterData.statuses =
        await PurchaseServices.purchaseInvoiceStatus.getAll();
      this.masterData.series =
        await PurchaseServices.purchaseInvoiceSerie.getAll();
      this.masterData.suppliers = await PurchaseServices.supplier.getAll();
      this.masterData.paymentMethods =
        await SharedServices.paymentMethod.getAll();
      this.masterData.exercises = await SharedServices.exercice.getAll();
      this.masterData.taxes = await SharedServices.tax.getAll();
    },
  },
});
