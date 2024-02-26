import { defineStore } from "pinia";
import { ProductionPart } from "../types";
import Services from "../services";

export const useProductionPartStore = defineStore({
  id: "productionParts",
  state: () => ({
    productionPart: undefined as ProductionPart | undefined,
    productionParts: undefined as Array<ProductionPart> | undefined,
  }),
  getters: {},
  actions: {
    setNew(id: string) {
      this.productionPart = {
        id,
        date: new Date(),
        workCenterId: "",
        workOrderPhaseDetailId: "",
        operatorId: "",
        quantity: 0,
        time: 0,
      } as ProductionPart;
    },
    async fetchAll() {
      this.productionParts = await Services.ProductionPart.getAll();
    },
    async fetchByWorkOrderId(workOrderId: string) {
      this.productionParts = await Services.ProductionPart.GetByWorkOrderId(
        workOrderId
      );
    },
    async fetchOne(id: string) {
      this.productionPart = await Services.ProductionPart.getById(id);
    },
    async fetchFiltered(
      startTime: string,
      endTime: string,
      workcenterid: string,
      operatorid: string
    ) {
      this.productionParts = await Services.ProductionPart.GetBetweenDates(
        startTime,
        endTime,
        workcenterid,
        operatorid
      );
    },
    async create(model: ProductionPart) {
      const result = await Services.ProductionPart.create(model);
      if (result) await this.fetchOne(model.id);
      return result;
    },
    async delete(id: string) {
      const result = await Services.ProductionPart.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, model: ProductionPart) {
      const result = await Services.ProductionPart.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
  },
});
