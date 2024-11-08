import{ac as r}from"./index-40c5ef33.js";class p extends r{async getByReferenceId(t){const e=await this.apiClient.get(`${this.resource}/reference/${t}`);if(e.status===200)return e.data}async copyWorkMaster(t){return(await this.apiClient.post(`${this.resource}/copy`,t)).data}async calculateCost(t,e){let s=`${this.resource}/cost/${t}`;return e&&(s=s.concat(`?quantity=${e}`)),(await this.apiClient.get(s)).data}async getCosts(t,e){let s=`${this.resource}/costs/${t}`;return e&&(s=s.concat(`?quantity=${e}`)),(await this.apiClient.get(s)).data}}class h extends r{async getByWorkMasterId(t){const e=await this.apiClient.get(`${this.resource}?workMasterId=${t}`);if(e.status===200)return e.data}}class u extends r{async getByWorkMasterPhaseId(t){const e=await this.apiClient.get(`${this.resource}?workMasterPhaseId=${t}`);if(e.status===200)return e.data}}class k extends r{async getByWorkMasterPhaseId(t){const e=await this.apiClient.get(`${this.resource}?workMasterPhaseId=${t}`);if(e.status===200)return e.data}}class $ extends r{async GetBetweenDatesAndStatus(t,e,s,i,o){let n=`${this.resource}?startTime=${t}&endTime=${e}`;s&&(n+=`&statusId=${s}`),i&&(n+=`&referenceId=${s}`),o&&(n+=`&customerId=${o}`);const c=await this.apiClient.get(n);if(c.status===200)return c.data}async GetBySalesOrderId(t){let e=`${this.resource}/SalesOrder/${t}`;const s=await this.apiClient.get(e);if(s.status===200)return s.data}async Create(t){return(await this.apiClient.post(`${this.resource}/CreateFromWorkMaster`,t)).data}async CreateFromSalesOrderDetail(t,e){return(await this.apiClient.post(`${this.resource}/CreateFromSalesOrderDetail/${e}`,t)).data}}class w extends r{async getByWorkOrderId(t){const e=await this.apiClient.get(`${this.resource}?workOrderId=${t}`);if(e.status===200)return e.data}async getExternalWorkOrderPhases(t,e){const s=await this.apiClient.get(`${this.resource}/External?startTime=${t}&endTime=${e}`);if(s.status===200)return s.data.map(n=>({...n.phase,workOrder:n.workOrder}))}}class y extends r{async getByWorkOrderPhaseId(t){const e=await this.apiClient.get(`${this.resource}?workOrderPhaseId=${t}`);if(e.status===200)return e.data}}class W extends r{async getByWorkOrderPhaseId(t){const e=await this.apiClient.get(`${this.resource}?workOrderPhaseId=${t}`);if(e.status===200)return e.data}}class O extends r{async getByWorkcenterId(t){const e=await this.apiClient.get(`${this.resource}/ByWorkcenter/${t}`);if(e.status===200)return e.data}async getByWorkOrderId(t){const e=await this.apiClient.get(`/WorkOrder/${t}/Detailed`);if(e.status===200)return e.data}}class P extends r{async GetBetweenDates(t,e,s,i,o){let n=`${this.resource}?startTime=${t}&endTime=${e}`;s&&(n+=`&workcenterId=${s}`),i&&(n+=`&operatorId=${i}`),o&&(n+=`&workorderId=${o}`);const c=await this.apiClient.get(n);if(c.status===200)return c.data}async GetByWorkOrderId(t){const e=await this.apiClient.get(`${this.resource}/WorkOrder/${t}`);if(e.status===200)return e.data}}class f extends r{async getDetailsByshiftId(t){const e=await this.apiClient.get(`${this.resource}/Detail/${t}`);if(e.status===200)return e.data}async createDetail(t){const e=await this.apiClient.post(`${this.resource}/Detail`,t);return e.status===200||e.status===201}async updateDetail(t){const e=await this.apiClient.put(`${this.resource}/Detail/${t.id}`,t);return e.status===200||e.status===201}async deleteDetail(t){const e=await this.apiClient.delete(`${this.resource}/Detail/${t}`);return e.status===200||e.status===201}}class S extends r{async GetByWorkcenterId(t){const e=await this.apiClient.get(`${this.resource}/workcenter/${t}`);if(e.status===200)return e.data}async GetWorkOrderPhaseById(t){const e=await this.apiClient.get(`${this.resource}/workorderphase/${t}`);if(e.status===200)return e.data}}class C extends r{async GetGroupedByMonthAndWorkcenterType(t,e){const s=await this.apiClient.get(`${this.resource}/GroupedByMonthAndWorkcenterType?startTime=${t}&endTime=${e}`);if(s.status===200)return s.data}async GetGroupedByMonthAndWorkcenter(t,e){const s=await this.apiClient.get(`${this.resource}/GroupedByMonthAndWorkcenter?startTime=${t}&endTime=${e}`);if(s.status===200)return s.data}async GroupedByMonthAndOperator(t,e){const s=await this.apiClient.get(`${this.resource}/GroupedByMonthAndOperator?startTime=${t}&endTime=${e}`);if(s.status===200)return s.data}}class d extends r{}class D extends r{}class I extends r{}class T extends r{}class l extends r{}class g extends r{}class M extends r{}class B extends r{}class v extends r{}const m={Enterprise:new d("/Enterprise"),Areas:new d("/Area"),Site:new d("/Site"),WorkcenterType:new l("/WorkcenterType"),Workcenter:new l("/Workcenter"),WorkcenterCost:new g("/WorkcenterCost"),MachineStatus:new M("/MachineStatus"),OperatorType:new v("/OperatorType"),Operator:new B("/Operator"),WorkMaster:new p("/WorkMaster"),WorkMasterPhase:new h("/WorkMaster/Phase"),WorkMasterPhaseDetail:new u("/WorkMaster/Phase/Detail"),WorkMasterPhaseBillOfMaterials:new k("/WorkMaster/Phase/BillOfMaterials"),WorkOrder:new $("/WorkOrder"),WorkOrderPhase:new w("/WorkOrder/Phase"),WorkOrderPhaseDetail:new y("/WorkOrder/Phase/Detail"),WorkOrderPhaseBillOfMaterials:new W("/WorkOrder/Phase/BillOfMaterials"),ProductionPart:new P("/ProductionPart"),DetailedWorkOrder:new O("/WorkOrder/Detailed"),ShiftService:new f("/Shift"),PlanningService:new S("/Planning"),ProductionCostDashboardService:new C("/productioncost")};export{d as A,D as E,M,B as O,m as P,I as S,T as W,l as a,g as b,v as c,C as d};
