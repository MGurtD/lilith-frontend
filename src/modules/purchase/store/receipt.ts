import { defineStore } from "pinia";
import { CreateReceiptRequest, Receipt, ReceiptDetail } from "../types";
import Services from "../services";

export const useReceiptsStore = defineStore({
  id: "receipts",
  state: () => ({
    receipts: undefined as Array<Receipt> | undefined,
    receipt: undefined as Receipt | undefined,
  }),
  getters: {},
  actions: {
    setNewReceipt(id: string) {
      this.receipt = {
        id: id,
        date: "",
        details: [],
        disabled: false,
        exerciseId: "",
        statusId: "",
        supplierId: "",
        supplierNumber: "",
        number: "",
      } as Receipt;
    },
    async fetchFiltered(
      startDate: string,
      endDate: string,
      supplierId?: string,
      statusId?: string
    ) {
      this.receipts = await Services.Receipt.getFiltered(
        startDate,
        endDate,
        supplierId
      );
    },
    async fetchReceipts() {
      this.receipts = await Services.Receipt.getAll();
    },
    async fetchReceipt(id: string) {
      this.receipt = await Services.Receipt.getById(id);
    },
    async createReceipt(createRequest: CreateReceiptRequest) {
      const result = await Services.Receipt.create(createRequest);
      if (result) await this.fetchReceipts();
      return result;
    },
    async updateReceipt(id: string, receipt: Receipt) {
      const result = await Services.Receipt.update(id, receipt);
      if (result) await this.fetchReceipts();
      return result;
    },
    async deleteReceipt(id: string) {
      const response = await Services.Receipt.delete(id);
      if (response) await this.fetchReceipts();
      return response;
    },

    async createReceiptDetail(detail: ReceiptDetail) {
      const response = await Services.Receipt.addDetail(detail);
      if (response.result) await this.fetchReceipt(detail.receiptId);
      return response;
    },
    async updateReceiptDetail(id: string, detail: ReceiptDetail) {
      const response = await Services.Receipt.updateDetail(detail);
      if (response.result) await this.fetchReceipt(detail.receiptId);
      return response;
    },
    async deleteReceiptDetail(id: string) {
      const response = await Services.Receipt.removeDetail(id);
      if (response.result) {
        const detail = this.receipt!.details.find((d) => d.id === id);
        if (detail) {
          const index = this.receipt!.details.indexOf(detail);
          this.receipt!.details.splice(index);
        }
      }
      return response;
    },
  },
});
