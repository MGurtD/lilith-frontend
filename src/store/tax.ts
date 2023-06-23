import { defineStore } from "pinia";
import { TaxService } from "../api/services/tax.service";
import { Tax } from "../types";

const service = new TaxService("/Tax");

export const useTaxesStore = defineStore({
  id: "tax",
  state: () => ({
    tax: undefined as Tax | undefined,
    taxes: undefined as Array<Tax> | undefined,
  }),
  getters: {},
  actions: {
    setNew(id: string) {
      this.tax = {
        id: id,
        name: "",
        disabled: false,
      } as Tax;
    },

    async fetchAll() {
      this.taxes = await service.getAll();
    },
    async fetchOne(id: string) {
      this.tax = await service.getById(id);
    },
    async create(model: Tax) {
      const result = await service.create(model);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, model: Tax) {
      const result = await service.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await service.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
  },
});
