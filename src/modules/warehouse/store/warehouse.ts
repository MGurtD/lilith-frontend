import { defineStore } from "pinia";
import Services from "../services";
import { Warehouse, Location } from "../types";

export const useWarehouseStore = defineStore({
  id: "warehouse",
  state: () => ({
    warehouse: undefined as Warehouse | undefined,
    warehouses: undefined as Array<Warehouse> | undefined,
  }),
  getters: {},
  actions: {
    // Warehouse
    setNewWarehouse(id: string) {
      this.warehouse = {
        id: id,
        name: "",
        description: "",
        defaultLocationId: "",
        siteId: "",
        disabled: false,
      } as Warehouse;
    },
    async fetchWarehouses() {
      this.warehouses = await Services.Warehouse.getAll();
    },
    async fetchWarehouse(id: string) {
      this.warehouse = await Services.Warehouse.getById(id);
    },
    async createWarehouse(warehouse: Warehouse) {
      const result = await Services.Warehouse.create(warehouse);
      if (result) await this.fetchWarehouses();
      return result;
    },
    async updateWarehouse(id: string, warehouse: Warehouse) {
      const result = await Services.Warehouse.update(id, warehouse);
      if (result) await this.fetchWarehouses();
      return result;
    },
    async deleteWarehouse(id: string) {
      const result = await Services.Warehouse.delete(id);
      if (result) await this.fetchWarehouses();
      return result;
    },

    async createLocation(location: Location) {
      const result = await Services.Warehouse.CreateLocation(location);
      if (result) await this.fetchWarehouse(location.warehouseId);
      return result;
    },
    async updateLocation(id: string, location: Location) {
      const result = await Services.Warehouse.UpdateLocation(id, location);
      if (result) await this.fetchWarehouse(location.warehouseId);
      return result;
    },
    async deleteLocation(id: string) {
      const result = await Services.Warehouse.DeleteLocation(id);
      if (result) await this.fetchWarehouse(id);
      return result;
    },
  },
});
