import { defineStore } from "pinia";
import {
  CreatePurchaseDocumentRequest,
  PurchaseOrder,
  PurchaseOrderDetail,
} from "../types";
import Services from "../services";

export const useOrderStore = defineStore({
  id: "purchaseOrders",
  state: () => ({
    orders: undefined as Array<PurchaseOrder> | undefined,
    order: undefined as PurchaseOrder | undefined,
  }),
  getters: {},
  actions: {
    setNew(id: string) {
      this.order = {
        id: id,
        disabled: false,
        date: "",
        exerciseId: "",
        statusId: "",
        supplierId: "",
        number: "",
        purchaseInvoiceId: null,
        details: [],
      } as PurchaseOrder;
    },
    async fetchFiltered(
      startDate: string,
      endDate: string,
      supplierId?: string,
      statusId?: string
    ) {
      this.orders = await Services.Order.getBetweenDates(
        startDate,
        endDate,
        supplierId,
        statusId
      );
    },
    async fetchAll() {
      this.orders = await Services.Order.getAll();
    },
    async fetchOne(id: string) {
      this.order = await Services.Order.getById(id);
    },
    async create(createRequest: CreatePurchaseDocumentRequest) {
      const result = await Services.Order.create(createRequest);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, Order: PurchaseOrder) {
      const result = await Services.Order.update(id, Order);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const response = await Services.Order.delete(id);
      if (response) await this.fetchAll();
      return response;
    },

    async createDetail(detail: PurchaseOrderDetail) {
      const response = await Services.Order.addDetail(detail);
      if (response.result) await this.fetchOne(detail.purchaseOrderId);
      return response;
    },
    async updateDetail(id: string, detail: PurchaseOrderDetail) {
      const response = await Services.Order.updateDetail(detail);
      if (response.result) await this.fetchOne(detail.purchaseOrderId);
      return response;
    },
    async deleteDetail(id: string) {
      const response = await Services.Order.removeDetail(id);
      if (response.result) {
        const detail = this.order!.details.find((d) => d.id === id);
        if (detail) {
          const index = this.order!.details.indexOf(detail);
          this.order!.details.splice(index);
        }
      }
      return response;
    },
  },
});