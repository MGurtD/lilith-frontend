import { defineStore } from "pinia";
import PurchaseService from "../services";
import { PurchaseInvoiceSerie } from "../types";

export const usePurchaseInvoiceSeries = defineStore({
  id: "purchaseInvoiceSeries",
  state: () => ({
    purchaseInvoiceSerie: undefined as PurchaseInvoiceSerie | undefined,
    purchaseInvoiceSeries: undefined as Array<PurchaseInvoiceSerie> | undefined,
  }),
  getters: {},
  actions: {
    //Series
    setNewPurchaseInvoiceSerie(id: string) {
      this.purchaseInvoiceSerie = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as PurchaseInvoiceSerie;
    },

    async fetchPurchaseInvoiceSeries() {
      this.purchaseInvoiceSeries =
        await PurchaseService.PurchaseInvoiceSerie.getAll();
    },

    async fetchPurchaseInvoiceSerie(id: string) {
      this.purchaseInvoiceSerie =
        await PurchaseService.PurchaseInvoiceSerie.getById(id);
    },

    async createPurchaseInvoiceSerie(
      purchaseInvoiceSerie: PurchaseInvoiceSerie
    ) {
      const result = await PurchaseService.PurchaseInvoiceSerie.create(
        purchaseInvoiceSerie
      );
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },

    async updatePurchaseInvoiceSerie(
      id: string,
      purchaseInvoiceSerie: PurchaseInvoiceSerie
    ) {
      const result = await PurchaseService.PurchaseInvoiceSerie.update(
        id,
        purchaseInvoiceSerie
      );
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },

    async deletePurchaseInvoiceSerie(id: string) {
      const result = await PurchaseService.PurchaseInvoiceSerie.delete(id);
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },
  },
});
