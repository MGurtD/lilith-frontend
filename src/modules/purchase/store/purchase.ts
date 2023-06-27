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
    
  },
});
