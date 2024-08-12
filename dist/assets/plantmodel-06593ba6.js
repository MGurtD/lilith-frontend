import{N as u}from"./index-709c40c8.js";import{W as y,a as f,b as l,A as k,S,E as v,O as T,c as m,M as W}from"./index-5492b314.js";const a=new y("/workcenter"),s=new f("/workcentertype"),h=new l("/workcentercost"),i=new k("/area"),w=new S("/site"),d=new v("/enterprise"),c=new T("/operator"),n=new m("/operatortype"),o=new W("/machinestatus"),I=u({id:"plantmodel",state:()=>({workcenter:void 0,workcenters:void 0,workcentercost:void 0,workcentercosts:void 0,workcenterType:void 0,workcenterTypes:void 0,area:void 0,areas:void 0,site:void 0,sites:void 0,enterprise:void 0,enterprises:void 0,operator:void 0,operators:void 0,operatorType:void 0,operatorTypes:void 0,machineStatus:void 0,machineStatuses:void 0}),getters:{getWorkcentersByTypeId:e=>t=>e.workcenters?e.workcenters.filter(r=>r.workcenterTypeId===t):[],getWorkcenterNameById:e=>t=>{if(!e.workcenters)return"";const r=e.workcenters.find(p=>p.id===t);return r?r.description:""},getOperatorNameById:e=>t=>{if(!e.operators)return"";const r=e.operators.find(p=>p.id===t);return r?`${r.name} ${r.surname}`:""},getMachineStatusNameById:e=>t=>{if(!e.machineStatuses)return"";const r=e.machineStatuses.find(p=>p.id===t);return r?`${r.description}`:""}},actions:{setNewWorkcenter(e){this.workcenter={id:e,name:"",description:"",workcenterTypeId:"",areaId:"",shiftId:"",disabled:!1}},async fetchActiveModel(){this.workcenterTypes=await s.getActive(),this.areas=await i.getActive(),this.workcenters=await a.getActive(),this.machineStatuses=await o.getActive(),this.operatorTypes=await n.getActive(),this.operators=await c.getActive()},async fetchWorkcenters(){this.workcenters=await a.getAll()},async fetchWorkcenter(e){this.workcenter=await a.getById(e)},async createWorkcenter(e){const t=await a.create(e);return t&&await this.fetchWorkcenters(),t},async updateWorkcenter(e,t){const r=await a.update(e,t);return r&&await this.fetchWorkcenters(),r},async deleteWorkcenter(e){const t=await a.delete(e);return t&&await this.fetchWorkcenters(),t},setNewWorkcenterType(e){this.workcenterType={id:e,name:"",description:"",profitPercentage:0,disabled:!1}},async fetchWorkcenterTypes(){this.workcenterTypes=await s.getAll()},async fetchWorkcenterType(e){this.workcenterType=await s.getById(e)},async createWorkcenterType(e){const t=await s.create(e);return t&&await this.fetchWorkcenterTypes(),t},async updateWorkcenterType(e,t){const r=await s.update(e,t);return r&&await this.fetchWorkcenterTypes(),r},async deleteWorkcenterType(e){const t=await s.delete(e);return t&&await this.fetchWorkcenterTypes(),t},setNewWorkcenterCost(e){this.workcentercost={id:e,workcenterId:"",machineStatusId:"",cost:0,disabled:!1}},async fetchWorkcenterCosts(){this.workcentercosts=await h.getAll()},async fetchWorkcenterCost(e){this.workcentercost=await h.getById(e)},async createWorkcenterCost(e){const t=await h.create(e);return t&&await this.fetchWorkcenterCosts(),t},async updateWorkcenterCost(e,t){const r=await h.update(e,t);return r&&await this.fetchWorkcenterCosts(),r},async deleteWorkcenterCost(e){const t=await h.delete(e);return t&&await this.fetchWorkcenterCosts(),t},setNewArea(e){this.area={id:e,name:"",description:"",siteId:"",disabled:!1}},async fetchAreas(){this.areas=await i.getAll()},async fetchArea(e){this.area=await i.getById(e)},async createArea(e){const t=await i.create(e);return t&&await this.fetchAreas(),t},async updateArea(e,t){const r=await i.update(e,t);return r&&await this.fetchAreas(),r},async deleteArea(e){const t=await i.delete(e);return t&&await this.fetchAreas(),t},setNewSite(e){this.site={id:e,name:"",description:"",address:"",city:"",postalCode:"",region:"",country:"",phoneNumber:"",email:"",vatNumber:"",enterpriseId:"",disabled:!1}},async fetchSites(){this.sites=await w.getAll()},async fetchSite(e){this.site=await w.getById(e)},async createSite(e){const t=await w.create(e);return t&&await this.fetchSites(),t},async updateSite(e,t){const r=await w.update(e,t);return r&&await this.fetchSites(),r},async deleteSite(e){const t=await w.delete(e);return t&&await this.fetchSites(),t},setNewEnterprise(e){this.enterprise={id:e,name:"",description:"",siteId:"",disabled:!1}},async fetchEnterprises(){this.enterprises=await d.getAll()},async fetchEnterprise(e){this.enterprise=await d.getById(e)},async createEnterprise(e){const t=await d.create(e);return t&&await this.fetchEnterprises(),t},async updateEnterprise(e,t){const r=await d.update(e,t);return r&&await this.fetchEnterprises(),r},async deleteEnterprise(e){const t=await d.delete(e);return t&&await this.fetchEnterprises(),t},setNewOperator(e){this.operator={id:e,code:"",name:"",surname:"",operatorTypeId:"",disabled:!1}},async fetchOperators(){this.operators=await c.getAll()},async fetchOperator(e){this.operator=await c.getById(e)},async createOperator(e){const t=await c.create(e);return t&&await this.fetchOperators(),t},async updateOperator(e,t){const r=await c.update(e,t);return r&&await this.fetchOperators(),r},async deleteOperator(e){const t=await c.delete(e);return t&&await this.fetchOperators(),t},setNewOperatorType(e){this.operatorType={id:e,name:"",description:"",disabled:!1}},async fetchOperatorTypes(){this.operatorTypes=await n.getAll()},async fetchOperatorType(e){this.operatorType=await n.getById(e)},async createOperatorType(e){const t=await n.create(e);return t&&await this.fetchOperatorTypes(),t},async updateOperatorType(e,t){const r=await n.update(e,t);return r&&await this.fetchOperatorTypes(),r},async deleteOperatorType(e){const t=await n.delete(e);return t&&await this.fetchOperatorTypes(),t},setNewMachineStatus(e){this.machineStatus={id:e,name:"",description:"",color:"",stoped:!1,operatorsAllowed:!0,closed:!1,preferred:!1,icon:"",disabled:!1}},async fetchMachineStatuses(){this.machineStatuses=await o.getAll()},async fetchMachineStatus(e){this.machineStatus=await o.getById(e)},async createMachineStatus(e){const t=await o.create(e);return t&&await this.fetchMachineStatuses(),t},async updateMachineStatus(e,t){const r=await o.update(e,t);return r&&await this.fetchMachineStatuses(),r},async deleteMachineStatus(e){const t=await o.delete(e);return t&&await this.fetchMachineStatuses(),t}}});export{I as u};
