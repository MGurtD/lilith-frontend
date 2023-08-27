import { defineStore } from "pinia";
import {
  SalesOrderHeader,
  SalesOrderDetail,
  CreateSalesHeaderRequest,
} from "../types";
import SalesServices from "../services";

export const useSalesOrderStore = defineStore({
  id: "salesOrder",
  state: () => ({
    salesOrder: undefined as SalesOrderHeader | undefined,
    salesOrders: undefined as Array<SalesOrderHeader> | undefined,
  }),
  getters: {},
  actions: {
    async Create(createRequest: CreateSalesHeaderRequest) {
      const created = await SalesServices.SalesOrder.Create(createRequest);
      return created;
    },
    async GetById(id: string) {
      this.salesOrder = await SalesServices.SalesOrder.getById(id);
    },
    async GetBetweenDates(startTime: string, endTime: string) {
      this.salesOrders = await SalesServices.SalesOrder.GetBetweenDates(
        startTime,
        endTime
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
      return created;
    },
    async UpdateDetail(detail: SalesOrderDetail): Promise<boolean> {
      const updated = await SalesServices.SalesOrder.UpdateDetail(detail);
      return updated;
    },
    async DeleteDetail(detail: SalesOrderDetail): Promise<boolean> {
      const deleted = await SalesServices.SalesOrder.DeleteDetail(detail);
      return deleted;
    },
  },
});
