import { defineStore } from "pinia";
import SalesService from "../services";
import {
  SalesInvoice,
  SalesInvoiceDetail,
  CreateInvoiceRequest,
  CreateInvoiceDetailsFromOrderDetailsRequest,
} from "../types";

export const useSalesInvoiceStore = defineStore({
  id: "salseInvoices",
  state: () => ({
    invoice: undefined as SalesInvoice | undefined,
    invoices: undefined as Array<SalesInvoice> | undefined,
  }),
  getters: {},
  actions: {
    async Create(createRequest: CreateInvoiceRequest) {
      const created = await SalesService.SalesInvoice.Create(createRequest);
      return created;
    },
    async GetById(id: string) {
      this.invoice = await SalesService.SalesInvoice.getById(id);
    },
    async GetFiltered(
      startDate: string,
      endDate: string,
      statusId?: string,
      customerId?: string,
      exerciseId?: string
    ) {
      if (statusId) {
        this.invoices =
          await SalesService.SalesInvoice.GetBetweenDatesAndStatus(
            startDate,
            endDate,
            statusId
          );
      } else if (customerId) {
        this.invoices =
          await SalesService.SalesInvoice.GetBetweenDatesAndCustomer(
            startDate,
            endDate,
            customerId
          );
      } else {
        this.invoices = await SalesService.SalesInvoice.GetBetweenDates(
          startDate,
          endDate
        );
        console.log("GetFiltered", this.invoices);
      }
    },
    async Update(invoice: SalesInvoice) {
      const updated = await SalesService.SalesInvoice.update(
        invoice.id,
        invoice
      );
      return updated;
    },
    async Delete(id: string): Promise<boolean> {
      const deleted = await SalesService.SalesInvoice.delete(id);
      return deleted;
    },

    async CreateInvoiceDetailsFromOrderDetails(
      createRequest: CreateInvoiceDetailsFromOrderDetailsRequest
    ): Promise<boolean> {
      const created =
        await SalesService.SalesInvoice.CreateInvoiceDetailsFromOrderDetails(
          createRequest
        );
      return created;
    },
    async CreateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const created = await SalesService.SalesInvoice.CreateDetail(
        invoiceDetail
      );
      await this.GetById(invoiceDetail.salesInvoiceId);
      return created;
    },
    async UpdateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const updated = await SalesService.SalesInvoice.UpdateDetail(
        invoiceDetail
      );
      await this.GetById(invoiceDetail.salesInvoiceId);
      return updated;
    },
    async DeleteInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const deleted = await SalesService.SalesInvoice.DeleteDetail(
        invoiceDetail
      );
      await this.GetById(invoiceDetail.salesInvoiceId);
      return deleted;
    },
  },
});
