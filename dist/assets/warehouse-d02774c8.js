import{J as r}from"./index-19723412.js";import{S as t}from"./index-06438670.js";const i=r({id:"warehouse",state:()=>({warehouse:void 0,warehouses:void 0}),getters:{},actions:{setNewWarehouse(e){this.warehouse={id:e,name:"",description:"",defaultLocationId:"",siteId:"",disabled:!1}},async fetchWarehouses(){this.warehouses=await t.Warehouse.getAll()},async fetchWarehouse(e){this.warehouse=await t.Warehouse.getById(e)},async createWarehouse(e){const a=await t.Warehouse.create(e);return a&&await this.fetchWarehouses(),a},async updateWarehouse(e,a){const s=await t.Warehouse.update(e,a);return s&&await this.fetchWarehouses(),s},async deleteWarehouse(e){const a=await t.Warehouse.delete(e);return a&&await this.fetchWarehouses(),a},async createLocation(e){const a=await t.Warehouse.CreateLocation(e);return a&&await this.fetchWarehouse(e.warehouseId),a},async updateLocation(e,a){const s=await t.Warehouse.UpdateLocation(e,a);return s&&await this.fetchWarehouse(a.warehouseId),s},async deleteLocation(e){const a=await t.Warehouse.DeleteLocation(e);return a&&this.warehouse&&await this.fetchWarehouse(this.warehouse.id),a}}});export{i as u};
