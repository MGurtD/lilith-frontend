import { defineStore } from "pinia";
import SalesService from "../services";
import {
  SalesInvoice,
  SalesInvoiceDetail,
  CreateSalesHeaderRequest,
  CreateInvoiceDetailsFromOrderDetailsRequest,
  DeliveryNote,
  CreateRectificativeInvoiceRequest,
} from "../types";
import { GenericResponse } from "../../../types";

export const useSalesInvoiceStore = defineStore({
  id: "salseInvoices",
  state: () => ({
    invoice: undefined as SalesInvoice | undefined,
    invoices: undefined as Array<SalesInvoice> | undefined,
  }),
  getters: {},
  actions: {
    async Create(createRequest: CreateSalesHeaderRequest) {
      const created = await SalesService.SalesInvoice.Create(createRequest);
      return created;
    },
    async CreateRectificative(
      request: CreateRectificativeInvoiceRequest
    ): Promise<GenericResponse<SalesInvoice> | undefined> {
      const response = await SalesService.SalesInvoice.CreateRectificative(
        request
      );
      return response;
    },
    async GetHeaderById(id: string) {
      const updatedInvoice = await SalesService.SalesInvoice.GetHeader(id);
      if (updatedInvoice && this.invoice) {
        this.invoice.baseAmount = updatedInvoice.baseAmount;
        this.invoice.taxAmount = updatedInvoice.taxAmount;
        this.invoice.grossAmount = updatedInvoice.grossAmount;
        this.invoice.netAmount = updatedInvoice.netAmount;
      }
    },
    async GetById(id: string) {
      this.invoice = await SalesService.SalesInvoice.getById(id);
    },
    async GetDetailsById(id: string) {
      const updatedInvoice = await SalesService.SalesInvoice.getById(id);
      if (this.invoice && updatedInvoice)
        this.invoice.salesInvoiceDetails = updatedInvoice?.salesInvoiceDetails;
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

    async AddDeliveryNote(
      id: string,
      deliveryNote: DeliveryNote
    ): Promise<GenericResponse<any>> {
      const response = await SalesService.SalesInvoice.AddDeliveryNote(
        id,
        deliveryNote
      );
      this.GetDetailsById(id);
      this.GetHeaderById(id);
      return response;
    },
    async RemoveDeliveryNote(
      id: string,
      deliveryNote: DeliveryNote
    ): Promise<GenericResponse<any>> {
      const response = await SalesService.SalesInvoice.RemoveDeliveryNote(
        id,
        deliveryNote
      );
      this.GetDetailsById(id);
      this.GetHeaderById(id);
      return response;
    },

    async CreateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<GenericResponse<any>> {
      const response = await SalesService.SalesInvoice.CreateDetail(
        invoiceDetail
      );
      this.GetDetailsById(invoiceDetail.salesInvoiceId);
      this.GetHeaderById(invoiceDetail.salesInvoiceId);
      return response;
    },
    async UpdateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const updated = await SalesService.SalesInvoice.UpdateDetail(
        invoiceDetail
      );
      this.GetDetailsById(invoiceDetail.salesInvoiceId);
      this.GetHeaderById(invoiceDetail.salesInvoiceId);
      return updated;
    },
    async DeleteInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const deleted = await SalesService.SalesInvoice.DeleteDetail(
        invoiceDetail
      );
      this.GetDetailsById(invoiceDetail.salesInvoiceId);
      this.GetHeaderById(invoiceDetail.salesInvoiceId);
      return deleted;
    },
  },
});
