import{B as r}from"./base.service-3e1c705c.js";class d extends r{async copyWorkMaster(s){return(await this.apiClient.post(`${this.resource}/copy`,s)).status===200}async calculateCost(s){return(await this.apiClient.get(`${this.resource}/cost/${s}`)).data}}class l extends r{async getByWorkMasterId(s){const e=await this.apiClient.get(`${this.resource}?workMasterId=${s}`);if(e.status===200)return e.data}}class h extends r{async getByWorkMasterPhaseId(s){const e=await this.apiClient.get(`${this.resource}?workMasterPhaseId=${s}`);if(e.status===200)return e.data}}class p extends r{async getByWorkMasterPhaseId(s){const e=await this.apiClient.get(`${this.resource}?workMasterPhaseId=${s}`);if(e.status===200)return e.data}}class k extends r{async GetBetweenDatesAndStatus(s,e,a){let n=`${this.resource}?startTime=${s}&endTime=${e}`;a&&(n+=`&statusId=${a}`);const o=await this.apiClient.get(n);if(o.status===200)return o.data}async GetBySalesOrderId(s){let e=`${this.resource}/SalesOrder/${s}`;const a=await this.apiClient.get(e);if(a.status===200)return a.data}async Create(s){return(await this.apiClient.post(`${this.resource}/CreateFromWorkMaster`,s)).data}async CreateFromSalesOrderDetail(s,e){return(await this.apiClient.post(`${this.resource}/CreateFromSalesOrderDetail/${e}`,s)).data}}class W extends r{async getByWorkOrderId(s){const e=await this.apiClient.get(`${this.resource}?workOrderId=${s}`);if(e.status===200)return e.data}}class u extends r{async getByWorkOrderPhaseId(s){const e=await this.apiClient.get(`${this.resource}?workOrderPhaseId=${s}`);if(e.status===200)return e.data}}class w extends r{async getByWorkOrderPhaseId(s){const e=await this.apiClient.get(`${this.resource}?workOrderPhaseId=${s}`);if(e.status===200)return e.data}}class i extends r{}class $ extends r{}class C extends r{}class v extends r{}class c extends r{}class O extends r{}class S extends r{}class M extends r{}class y extends r{}const x={Enterprise:new i("/Enterprise"),Areas:new i("/Area"),Site:new i("/Site"),WorkcenterType:new c("/WorkcenterType"),Workcenter:new c("/Workcenter"),WorkcenterCost:new O("/WorkcenterCost"),MachineStatus:new S("/MachineStatus"),OperatorType:new y("/OperatorType"),Operator:new M("/Operator"),WorkMaster:new d("/WorkMaster"),WorkMasterPhase:new l("/WorkMaster/Phase"),WorkMasterPhaseDetail:new h("/WorkMaster/Phase/Detail"),WorkMasterPhaseBillOfMaterials:new p("/WorkMaster/Phase/BillOfMaterials"),WorkOrder:new k("/WorkOrder"),WorkOrderPhase:new W("/WorkOrder/Phase"),WorkOrderPhaseDetail:new u("/WorkOrder/Phase/Detail"),WorkOrderPhaseBillOfMaterials:new w("/WorkOrder/Phase/BillOfMaterials")};export{i as A,$ as E,S as M,M as O,C as S,v as W,c as a,O as b,y as c,x as d};