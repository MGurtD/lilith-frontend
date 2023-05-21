import { defineStore } from "pinia";
import { Supplier, SupplierContact, SupplierType } from "../types";
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
    setNewSupplier(id: string) {
      this.supplier = {
        id: id,
        comercialName: "",
        taxName: "",
        address: "",
        cif: "",
        city: "",
        country: "Espanya",
        disabled: false,
        observations: "",
        phone: "",
        postalCode: "",
        region: "",
      } as Supplier;
    },
    async fetchSuppliers() {
      this.suppliers = await service.getAll();
    },
    async fetchSupplier(id: string) {
      this.supplier = await service.getById(id);
    },
    async createSupplier(supplier: Supplier) {
      const result = await service.create(supplier);
      if (result) await this.fetchSuppliers();
      return result;
    },
    async updateSupplier(id: string, supplier: Supplier) {
      const result = await service.update(id, supplier);
      if (result) await this.fetchSuppliers();
      return result;
    },
    async deleteSupplier(id: string) {
      const result = await service.delete(id);
      if (result) await this.fetchSuppliers();
      return result;
    },

    setNewSupplierType(id: string) {
      this.supplierType = {
        id: id,
        name: "",
        description: "",
      } as SupplierType;
    },
    async fetchSupplierTypes() {
      this.supplierTypes = await typeService.getAll();
    },
    async fetchSupplierType(id: string) {
      this.supplierType = await typeService.getById(id);
    },
    async createSupplierType(supplierType: SupplierType) {
      const result = await typeService.create(supplierType);
      if (result) await this.fetchSupplierTypes();
      return result;
    },
    async updateSupplierType(id: string, supplierType: SupplierType) {
      const result = await typeService.update(id, supplierType);
      if (result) await this.fetchSupplierTypes();
      return result;
    },
    async deleteSupplierType(id: string) {
      const result = await typeService.delete(id);
      if (result) await this.fetchSupplierTypes();
      return result;
    },

    async addContactToSupplier(contact: SupplierContact) {
      const result = await service.addContact(contact);
      if (result) await this.fetchSupplier(contact.supplierId);
      return result;
    },
    async updateContactFromSupplier(contact: SupplierContact) {
      const result = await service.updateContact(contact);
      if (result) await this.fetchSupplier(contact.supplierId);
      return result;
    },
    async removeContactFromSupplier(contact: SupplierContact) {
      const result = await service.removeContact(contact.id);
      if (result) await this.fetchSupplier(contact.supplierId);
      return result;
    },
  },
});
