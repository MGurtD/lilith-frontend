import{N as d}from"./index-77e4d88f.js";import{P as a}from"./index-fc95771f.js";const h=d({id:"workorder",state:()=>({workorder:void 0,workorders:void 0,workorderPhase:void 0,workorderPhases:void 0,workorderPhaseDetail:void 0,workorderPhaseDetails:void 0,detailedWorkOrders:void 0}),getters:{},actions:{getWorkOrderCodeById(r){var t;const e=(t=this.workorders)==null?void 0:t.find(s=>s.id===r);if(e)return e.code},getWorkOrderStatusById(r){var t;const e=(t=this.workorders)==null?void 0:t.find(s=>s.id===r);if(e)return e.statusId},getWorkOrderCost(r){var s;let e=0;const t=(s=this.workorders)==null?void 0:s.find(o=>o.id===r);return t&&(e=t.machineCost+t.operatorCost+t.materialCost),e},setNew(r){this.workorder={id:r,code:"",workMasterId:"",referenceId:"",exerciceId:"",order:0,plannedQuantity:0,plannedDate:"",statusId:"",startTime:null,endTime:null,comment:"",disabled:!1,costMachine:0,costOperator:0,machineCost:0,operatorCost:0,machineTime:0,operatorTime:0,materialCost:0,materialTime:0,totalQuantity:0,phases:[]}},async fetchFiltered(r,e,t,s,o){this.workorders=await a.WorkOrder.GetBetweenDatesAndStatus(r,e,t,s,o)},async fetchAll(){this.workorders=await a.WorkOrder.getAll()},async fetchOne(r){this.workorder=await a.WorkOrder.getById(r)},async fetchBySalesOrder(r){this.workorders=await a.WorkOrder.GetBySalesOrderId(r)},async create(r){const e=await a.WorkOrder.Create(r);return e&&await this.fetchOne(e.content.id),e},async createAndUpdateSalesOrderDetail(r,e){const t=await a.WorkOrder.CreateFromSalesOrderDetail(r,e);return t&&await this.fetchOne(t.content.id),t},async update(r,e){const t=await a.WorkOrder.update(r,e);return t&&await this.fetchAll(),t},async delete(r){const e=await a.WorkOrder.delete(r);return e&&await this.fetchAll(),e},async fetchPhaseById(r){this.workorderPhase=await a.WorkOrderPhase.getById(r)},async fetchExternalPhases(){this.workorderPhases=await a.WorkOrderPhase.getExternalWorkOrderPhases()},async createPhase(r){const e=await a.WorkOrderPhase.create(r);return e&&await this.fetchPhaseById(r.id),e},async updatePhase(r,e){const t=await a.WorkOrderPhase.update(r,e);return t&&await this.fetchPhaseById(e.id),t},async deletePhase(r){const e=await a.WorkOrderPhase.delete(r);return e&&await this.fetchOne(this.workorder.id),e},async createPhaseDetail(r){const e=await a.WorkOrderPhaseDetail.create(r);return e&&await this.fetchPhaseById(r.workOrderPhaseId),e},async updatePhaseDetail(r,e){const t=await a.WorkOrderPhaseDetail.update(r,e);return t&&await this.fetchPhaseById(e.workOrderPhaseId),t},async deletePhaseDetail(r){const e=await a.WorkOrderPhaseDetail.delete(r);return e&&await this.fetchPhaseById(this.workorderPhase.id),e},async createPhaseBomItem(r){const e=await a.WorkOrderPhaseBillOfMaterials.create(r);return e&&await this.fetchPhaseById(r.workOrderPhaseId),e},async updatePhaseBomItem(r,e){const t=await a.WorkOrderPhaseBillOfMaterials.update(r,e);return t&&await this.fetchPhaseById(e.workOrderPhaseId),t},async deletePhaseBomItem(r){const e=await a.WorkOrderPhaseBillOfMaterials.delete(r);return e&&await this.fetchPhaseById(this.workorderPhase.id),e},async fetchByWorkcenterId(r){this.detailedWorkOrders=await a.DetailedWorkOrder.getByWorkcenterId(r)},async fetchByWorkOrderId(r){try{const e=await a.DetailedWorkOrder.getByWorkOrderId(r);if(e)return this.detailedWorkOrders=e,e;console.error(`No se encontraron órdenes de trabajo detalladas para el ID: ${r}`);return}catch(e){console.error(`Error al obtener la orden de trabajo: ${e}`);return}}}});export{h as u};