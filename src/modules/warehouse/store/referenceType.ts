import { defineStore } from "pinia";
import Services from "../services";
import { ReferenceType } from "../types";

export const useReferenceTypeStore = defineStore({
  id: "warehouse",
  state: () => ({
    referenceType: undefined as ReferenceType | undefined,
    referenceTypes: undefined as Array<ReferenceType> | undefined,
  }),
  getters: {},
  actions: {
    setNewRawMaterialType(id: string) {
      this.referenceType = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as ReferenceType;
    },
    async fetchAll() {
      this.referenceTypes = await Services.ReferenceType.getAll();
    },
    async fetchRawMaterialType(id: string) {
      this.referenceType = await Services.ReferenceType.getById(id);
    },
    async createRawMaterialType(rawmaterialType: ReferenceType) {
      const result = await Services.ReferenceType.create(rawmaterialType);
      if (result) await this.fetchAll();
      return result;
    },
    async updateRawMaterialType(id: string, rawmaterialType: ReferenceType) {
      const result = await Services.ReferenceType.update(id, rawmaterialType);
      if (result) await this.fetchAll();
      return result;
    },
    async deleteRawMaterialType(id: string) {
      const result = await Services.ReferenceType.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
  },
});
