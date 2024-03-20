import { defineStore } from "pinia";
import {
  SalesOrderHeader,
  SalesOrderDetail,
  CreateSalesHeaderRequest,
  Budget,
} from "../types";
import SalesServices from "../services";
import { GenericResponse } from "../../../types";
import { convertDateTimeToJSON } from "../../../utils/functions";

export const useSalesOrderStore = defineStore({
  id: "salesOrder",
  state: () => ({
    salesOrder: undefined as SalesOrderHeader | undefined,
    salesOrders: undefined as Array<SalesOrderHeader> | undefined,
    salesOrdersToDeliver: undefined as Array<SalesOrderHeader> | undefined,
    createWorkOrderDialogVisibility: false,
  }),
  getters: {},
  actions: {
    async Create(createRequest: CreateSalesHeaderRequest) {
      const created = await SalesServices.SalesOrder.Create(createRequest);
      return created;
    },
    async CreateFromBudget(
      budget: Budget
    ): Promise<GenericResponse<SalesOrderHeader>> {
      budget.date = convertDateTimeToJSON(budget.date);
      if (budget.acceptanceDate) {
        budget.acceptanceDate = convertDateTimeToJSON(budget.acceptanceDate);
      }

      const response = await SalesServices.SalesOrder.CreateFromBudget(budget);
      return response;
    },
    async GetById(id: string) {
      this.salesOrder = await SalesServices.SalesOrder.getById(id);
    },
    async GetFiltered(startTime: string, endTime: string, customerId?: string) {
      if (customerId) {
        this.salesOrders =
          await SalesServices.SalesOrder.GetBetweenDatesAndCustomer(
            startTime,
            endTime,
            customerId
          );
      } else {
        this.salesOrders = await SalesServices.SalesOrder.GetBetweenDates(
          startTime,
          endTime
        );
      }
    },
    async GetByDeliveryNote(deliveryNoteId: string) {
      this.salesOrders = await SalesServices.SalesOrder.GetByDeliveryNote(
        deliveryNoteId
      );
    },
    async GetToDeliver(customerId: string) {
      this.salesOrdersToDeliver = await SalesServices.SalesOrder.GetToDeliver(
        customerId
      );
    },
    async Update(id: string, salesOrder: SalesOrderHeader) {
      const updated = await SalesServices.SalesOrder.update(id, salesOrder);
      return updated;
    },
    async Delete(id: string): Promise<boolean> {
      const deleted = await SalesServices.SalesOrder.delete(id);
      return deleted;
    },
    async CreateDetail(detail: SalesOrderDetail): Promise<boolean> {
      const created = await SalesServices.SalesOrder.CreateDetail(detail);
      if (created) await this.GetById(detail.salesOrderHeaderId);
      return created;
    },
    async UpdateDetail(detail: SalesOrderDetail): Promise<boolean> {
      const updated = await SalesServices.SalesOrder.UpdateDetail(detail);
      //if (updated) await this.GetById(detail.salesOrderHeaderId);
      return updated;
    },
    async DeleteDetail(detail: SalesOrderDetail): Promise<boolean> {
      const deleted = await SalesServices.SalesOrder.DeleteDetail(detail);
      if (deleted) await this.GetById(detail.salesOrderHeaderId);
      return deleted;
    },
  },
});
