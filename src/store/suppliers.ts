import { defineStore } from "pinia";
import { Supplier, SupplierType } from "../types";
import {
  SupplierService,
  SupplierTypeService,
} from "../api/services/suppliers.service";

const service = new SupplierService("/supplier");
const typeService = new SupplierTypeService("/suppliertype");

export const useSuppliersStore = defineStore({
  id: "suppliers",
  state: () => ({
    suppliers: undefined as Array<Supplier> | undefined,
    supplierTypes: undefined as Array<SupplierType> | undefined,
    supplier: undefined as Supplier | undefined,
    supplierType: undefined as SupplierType | undefined,
  }),
  getters: {},
  actions: {
    async fetchSuppliers() {
      this.suppliers = await service.getAll();
    },
    async fetchSupplier(id: string) {
      this.supplier = await service.getById(id);
    },
    async createSupplier(supplier: Supplier) {
      const result = await service.create(supplier);
      if (result) await this.fetchSuppliers();
    },
    async updateSupplier(id: string, supplier: Supplier) {
      const result = await service.update(id, supplier);
      if (result) await this.fetchSuppliers();
    },
    async deleteSupplier(id: string) {
      const result = await service.delete(id);
      if (result) await this.fetchSuppliers();
    },

    async fetchSupplierTypes() {
      this.supplierTypes = await typeService.getAll();
    },
    async fetchSupplierType(id: string) {
      this.supplierType = await typeService.getById(id);
    },
    async createSupplierType(supplierType: SupplierType) {
      const result = await typeService.create(supplierType);
    },
    async updateSupplierType(id: string, supplierType: SupplierType) {
      const result = await typeService.update(id, supplierType);
    },
    async deleteSupplierType(id: string) {
      const result = await typeService.delete(id);
    },
  },
});
