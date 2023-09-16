import { defineStore } from "pinia";
import { RawMaterialTypeService, WarehouseService } from "../services";
import { RawMaterialType, Warehouse } from "../types";

const warehouseService = new WarehouseService("/warehouse");
const rawmaterialtypeService = new RawMaterialTypeService("/rawmaterialtype");

export const useWarehouseStore = defineStore({
  id: "warehouse",
  state: () => ({
    warehouse: undefined as Warehouse | undefined,
    warehouses: undefined as Array<Warehouse> | undefined,
    rawmaterialType: undefined as RawMaterialType | undefined,
    rawmaterialTypes: undefined as Array<RawMaterialType> | undefined,
  }),
  getters: {},
  actions: {
    //Warehouse
    setNewWarehouse(id: string) {
      this.warehouse = {
        id: id,
        name: "",
        description: "",
        siteId: "",
        disabled: false,
      } as Warehouse;
    },
    async fetchWarehouses() {
      this.warehouses = await warehouseService.getAll();
    },
    async fetchWarehouse(id: string) {
      this.warehouse = await warehouseService.getById(id);
    },
    async createWarehouse(warehouse: Warehouse) {
      const result = await warehouseService.create(warehouse);
      if (result) await this.fetchWarehouses();
      return result;
    },
    async updateWarehouse(id: string, warehouse: Warehouse) {
      const result = await warehouseService.update(id, warehouse);
      if (result) await this.fetchWarehouses();
      return result;
    },
    async deleteWarehouse(id: string) {
      const result = await warehouseService.delete(id);
      if (result) await this.fetchWarehouses();
      return result;
    },
    //RawMaterialsType
    setNewRawMaterialType(id: string) {
      this.rawmaterialType = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as RawMaterialType;
    },
    async fetchRawMaterialTypes() {
      this.rawmaterialTypes = await rawmaterialtypeService.getAll();
    },
    async fetchRawMaterialType(id: string) {
      this.rawmaterialType = await rawmaterialtypeService.getById(id);
    },
    async createRawMaterialType(rawmaterialType: RawMaterialType) {
      const result = await rawmaterialtypeService.create(rawmaterialType);
      if (result) await this.fetchRawMaterialTypes();
      return result;
    },
    async updateRawMaterialType(id: string, rawmaterialType: RawMaterialType) {
      const result = await rawmaterialtypeService.update(id, rawmaterialType);
      if (result) await this.fetchRawMaterialTypes();
      return result;
    },
    async deleteRawMaterialType(id: string) {
      const result = await rawmaterialtypeService.delete(id);
      if (result) await this.fetchRawMaterialTypes();
      return result;
    },
  },
});
