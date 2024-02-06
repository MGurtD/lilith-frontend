import { defineStore } from "pinia";
import { ProductionPart } from "../types";
import Services from "../services";

export const useProductionPartsStore = defineStore({
  id: "productionParts",
  state: () => ({
    productionPart: undefined as ProductionPart | undefined,
    productionParts: undefined as Array<ProductionPart> | undefined,
  }),
  getters: {},
  actions: {},
});
