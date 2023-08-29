import { defineStore } from "pinia";
import { SalesOrderHeader, SalesOrderDetail } from "../types";
import SalesServices from "../services";

export const useSalesOrderStore = defineStore({
  id: "salesOrder",
  state: () => ({
    salesOrder: undefined as SalesOrderHeader | undefined,
    salesOrders: undefined as Array<SalesOrderHeader> | undefined,
  }),
  getters: {},
  actions: {
    setNewSalesOrder(id: string) {
      this.salesOrder = {
        id: id,
        customerId: "",
        exerciseId: "",
        salesOrderDate: new Date(),
        salesOrderNumber: 0,
        customerCode: "",
        customerComercialName: "",
        customerTaxName: "",
        customerVatNumber: "",
        customerAccountNumber: "",
        siteId: "",
        name: "",
        address: "",
        city: "",
        postalCode: "",
        region: "",
        country: "",
        vatNumber: "",
        statusId: "",
        salesOrderDetails: [],
      } as SalesOrderHeader;
    },
    async Create(salesOrder: SalesOrderHeader) {
      const created = await SalesServices.SalesOrder.create(salesOrder);
      return created;
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
