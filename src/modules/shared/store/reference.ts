import { defineStore } from "pinia";
import { ReferenceService } from "../services/reference.service";
import { Reference } from "../types";

const referenceService = new ReferenceService("/reference");
export const useReferenceStore = defineStore({
  id: "reference",
  state: () => ({
    reference: undefined as Reference | undefined,
    references: undefined as Array<Reference> | undefined,
    module: "" as string,
  }),
  getters: {},
  actions: {
    setNewReference(id: string) {
      this.reference = {
        id: id,
        code: "",
        description: "",
        cost: 0.0,
        price: 0.0,
        disabled: false,
        sales: this.module === "sales",
        purchase: this.module === "purchase",
        production: this.module === "production",
        density: 0,
        formatId: 0,
        lastPurchaseCost: 0,
      } as Reference;
    },
    async fetchReferences() {
      this.references = await referenceService.getAll();
    },
    async fetchReferencesByModule(module: string) {
      this.module = module;
      this.references = await referenceService.getByModule(module);
    },
    async fetchReference(id: string) {
      this.reference = await referenceService.getById(id);
    },
    async createReference(reference: Reference) {
      const result = await referenceService.create(reference);
      if (result) await referenceService.getByModule(this.module);
      return result;
    },
    async updateReference(id: string, reference: Reference) {
      const result = await referenceService.update(id, reference);
      if (result) await referenceService.getByModule(this.module);
      return result;
    },
    async deleteReference(id: string) {
      const result = await referenceService.delete(id);
      if (result) await referenceService.getByModule(this.module);
      return result;
    },
  },
});
