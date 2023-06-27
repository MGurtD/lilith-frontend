import { defineStore } from "pinia";
import PurchaseServices from "../services";
import {
  PurchaseInvoiceStatus,
  PurchaseInvoiceTransition as PurchaseInvoiceStatusTransition,
} from "../types";

export const usePurchaseInvoiceStatusStore = defineStore({
  id: "purchaseInvoiceStatus",
  state: () => ({
    purchaseInvoiceStatus: undefined as PurchaseInvoiceStatus | undefined,
    purchaseInvoiceStatuses: undefined as
      | Array<PurchaseInvoiceStatus>
      | undefined,
  }),
  getters: {},
  actions: {
    setNewPurchaseInvoiceStatus(id: string) {
      this.purchaseInvoiceStatus = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as PurchaseInvoiceStatus;
    },
    async fetchPurchaseInvoiceStatuses() {
      this.purchaseInvoiceStatuses =
        await PurchaseServices.PurchaseInvoiceStatus.getAll();
    },
    async fetchPurchaseInvoiceStatus(id: string) {
      this.purchaseInvoiceStatus =
        await PurchaseServices.PurchaseInvoiceStatus.getById(id);
    },
    async createPurchaseInvoiceStatus(
      purchaseInvoiceStatus: PurchaseInvoiceStatus
    ) {
      const result = await PurchaseServices.PurchaseInvoiceStatus.create(
        purchaseInvoiceStatus
      );
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },
    async updatePurchaseInvoiceStatus(
      id: string,
      purchaseInvoiceStatus: PurchaseInvoiceStatus
    ) {
      const result = await PurchaseServices.PurchaseInvoiceStatus.update(
        id,
        purchaseInvoiceStatus
      );
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },
    async deletePurchaseInvoiceStatus(id: string) {
      const result = await PurchaseServices.PurchaseInvoiceStatus.delete(id);
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },

    // Transitions
    async createPurchaseInvoiceStatusTransition(
      purchaseInvoiceStatusTrans: PurchaseInvoiceStatusTransition
    ) {
      const result = await PurchaseServices.PurchaseInvoiceStatus.addTransition(
        purchaseInvoiceStatusTrans
      );
      if (result)
        await this.fetchPurchaseInvoiceStatus(
          purchaseInvoiceStatusTrans.fromStatusId
        );
      return result;
    },
    async deletePurchaseInvoiceStatusTransition(
      purchaseInvoiceStatusTrans: PurchaseInvoiceStatusTransition
    ) {
      const result =
        await PurchaseServices.PurchaseInvoiceStatus.removeTransition(
          purchaseInvoiceStatusTrans
        );
      if (result)
        await this.fetchPurchaseInvoiceStatus(
          purchaseInvoiceStatusTrans.fromStatusId
        );
      return result;
    },
  },
});
