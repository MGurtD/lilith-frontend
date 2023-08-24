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
    async GetBetweenDates(startTime: string, endTime: string) {
      this.salesOrders = await SalesServices.SalesOrder.GetBetweenDates(
        startTime,
        endTime
      );
    },
  },
});
