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
import { PurchaseInvoiceUpdateStatues as InvoiceUpdateStatues } from "../../purchase/types";
import { REPORTS, ReportService } from "../../../api/services/report.service";
import { createBlobAndDownloadFile } from "../../../utils/functions";

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
      excludeStatusId?: string
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
      } else if (excludeStatusId) {
        this.invoices =
          await SalesService.SalesInvoice.GetBetweenDatesAndExcludeStatus(
            startDate,
            endDate,
            excludeStatusId
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
    async UpdateInvoicesStatuses(
      invoiceImport: InvoiceUpdateStatues
    ): Promise<boolean> {
      const updated = await SalesService.SalesInvoice.UpdateStatuses(
        invoiceImport
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
      return response;
    },

    async CreateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<GenericResponse<any>> {
      const response = await SalesService.SalesInvoice.CreateDetail(
        invoiceDetail
      );
      await this.GetDetailsById(invoiceDetail.salesInvoiceId);
      return response;
    },
    async UpdateInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const updated = await SalesService.SalesInvoice.UpdateDetail(
        invoiceDetail
      );
      await this.GetDetailsById(invoiceDetail.salesInvoiceId);
      return updated;
    },
    async DeleteInvoiceDetail(
      invoiceDetail: SalesInvoiceDetail
    ): Promise<boolean> {
      const deleted = await SalesService.SalesInvoice.DeleteDetail(
        invoiceDetail
      );
      await this.GetDetailsById(invoiceDetail.salesInvoiceId);
      return deleted;
    },
    async PrintInvoice(id: string, number: string): Promise<boolean> {
      const invoiceReport = await SalesService.SalesInvoice.GetReportDataById(
        id
      );
      if (!invoiceReport) return false;

      const fileName = `Factura_${number}.docx`;
      const reportService = new ReportService();
      const report = await reportService.Download(
        invoiceReport,
        REPORTS.Invoice,
        fileName
      );

      if (report) {
        createBlobAndDownloadFile(fileName, report);
        return true;
      } else {
        return false;
      }
    },
  },
});
