import { defineStore } from "pinia";
import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceService,
  PurchaseInvoiceStatusService,
} from "../services/purchase.service";
import {
  PurchaseInvoice,
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

const purchaseInvoiceService = new PurchaseInvoiceService("/purchaseinvoice");

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
    //Invoice
    purchaseInvoice: undefined as PurchaseInvoice | undefined,
    purchaseInvoices: undefined as Array<PurchaseInvoice> | undefined,
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
    //Invoices
    setNewPurchaseInvoice() {
      this.purchaseInvoice = {
        number: 0,
        supplierNumber: 0,
        purchaseInvoiceDate: new Date(),
        baseAmount: 0.0,
        transportAmount: 0.0,
        subtotal: 0.0,
        taxAmount: 0.0,
        grossAmount: 0.0,
        netAmount: 0.0,
        discountPercentage: 0.0,
        discountAmount: 0.0,
        supplierId: "",
        taxId: "",
        exerciseId: "",
        purchaseInvoiceSerieId: "",
        paymentMethodId: "",
        purchaseInvoiceStatusId: "",
        purchaseInvoiceDueDates: [],
      };
    },
    async createPurchaseInvoice(purchaseInvoice: PurchaseInvoice) {
      const result = await purchaseInvoiceService.create(purchaseInvoice);
      if (result) return result;
    },
    async getPurchaseInvoiceBetweenDates(startDate: Date, endDate: Date) {
      const result = purchaseInvoiceService.getBetweenDates(startDate, endDate);
      if (result) return result;
    },
  },
});
