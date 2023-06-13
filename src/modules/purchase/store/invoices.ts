import { defineStore } from "pinia";
import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceStatusService,
} from "../services/purchase.service";
import {
  PurchaseInvoiceSerie,
  PurchaseInvoiceStatus,
  PurchaseInvoiceTransition as PurchaseInvoiceStatusTransition,
} from "../types";

const purchaseInvoiceSerieService = new PurchaseInvoiceSerieService(
  "/purchaseinvoiceserie"
);
const purchaseInvoiceStatusService = new PurchaseInvoiceStatusService(
  "/purchaseinvoicestatus"
);

export const usePurchaseStore = defineStore({
  id: "purchases",
  state: () => ({
    //Series
    purchaseInvoiceSerie: undefined as PurchaseInvoiceSerie | undefined,
    purchaseInvoiceSeries: undefined as Array<PurchaseInvoiceSerie> | undefined,
    //Status
    purchaseInvoiceStatus: undefined as PurchaseInvoiceStatus | undefined,
    purchaseInvoiceStatuses: undefined as
      | Array<PurchaseInvoiceStatus>
      | undefined,
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
      this.purchaseInvoiceSeries = await purchaseInvoiceSerieService.getAll();
    },

    async fetchPurchaseInvoiceSerie(id: string) {
      this.purchaseInvoiceSerie = await purchaseInvoiceSerieService.getById(id);
    },

    async createPurchaseInvoiceSerie(
      purchaseInvoiceSerie: PurchaseInvoiceSerie
    ) {
      const result = await purchaseInvoiceSerieService.create(
        purchaseInvoiceSerie
      );
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },

    async updatePurchaseInvoiceSerie(
      id: string,
      purchaseInvoiceSerie: PurchaseInvoiceSerie
    ) {
      const result = await purchaseInvoiceSerieService.update(
        id,
        purchaseInvoiceSerie
      );
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },

    async deletePurchaseInvoiceSerie(id: string) {
      const result = await purchaseInvoiceSerieService.delete(id);
      if (result) await this.fetchPurchaseInvoiceSeries();
      return result;
    },

    //Status
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
        await purchaseInvoiceStatusService.getAll();
    },
    async fetchPurchaseInvoiceStatus(id: string) {
      this.purchaseInvoiceStatus = await purchaseInvoiceStatusService.getById(
        id
      );
    },
    async createPurchaseInvoiceStatus(
      purchaseInvoiceStatus: PurchaseInvoiceStatus
    ) {
      const result = await purchaseInvoiceStatusService.create(
        purchaseInvoiceStatus
      );
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },
    async updatePurchaseInvoiceStatus(
      id: string,
      purchaseInvoiceStatus: PurchaseInvoiceStatus
    ) {
      const result = await purchaseInvoiceStatusService.update(
        id,
        purchaseInvoiceStatus
      );
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },
    async deletePurchaseInvoiceStatus(id: string) {
      const result = await purchaseInvoiceStatusService.delete(id);
      if (result) await this.fetchPurchaseInvoiceStatuses();
      return result;
    },

    // Transitions
    async createPurchaseInvoiceStatusTransition(
      purchaseInvoiceStatusTrans: PurchaseInvoiceStatusTransition
    ) {
      const result = await purchaseInvoiceStatusService.addTransition(
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
      const result = await purchaseInvoiceStatusService.removeTransition(
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
