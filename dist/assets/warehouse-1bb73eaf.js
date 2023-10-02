import{I as w}from"./index-d7e0b608.js";import{B as i}from"./base.service-1e1fcad7.js";class c extends i{}class o extends i{}const s=new c("/warehouse"),r=new o("/rawmaterialtype"),u=w({id:"warehouse",state:()=>({warehouse:void 0,warehouses:void 0,rawmaterialType:void 0,rawmaterialTypes:void 0}),getters:{},actions:{setNewWarehouse(e){this.warehouse={id:e,name:"",description:"",siteId:"",disabled:!1}},async fetchWarehouses(){this.warehouses=await s.getAll()},async fetchWarehouse(e){this.warehouse=await s.getById(e)},async createWarehouse(e){const a=await s.create(e);return a&&await this.fetchWarehouses(),a},async updateWarehouse(e,a){const t=await s.update(e,a);return t&&await this.fetchWarehouses(),t},async deleteWarehouse(e){const a=await s.delete(e);return a&&await this.fetchWarehouses(),a},setNewRawMaterialType(e){this.rawmaterialType={id:e,name:"",description:"",disabled:!1}},async fetchRawMaterialTypes(){this.rawmaterialTypes=await r.getAll()},async fetchRawMaterialType(e){this.rawmaterialType=await r.getById(e)},async createRawMaterialType(e){const a=await r.create(e);return a&&await this.fetchRawMaterialTypes(),a},async updateRawMaterialType(e,a){const t=await r.update(e,a);return t&&await this.fetchRawMaterialTypes(),t},async deleteRawMaterialType(e){const a=await r.delete(e);return a&&await this.fetchRawMaterialTypes(),a}}});export{u};
