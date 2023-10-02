import{I as u}from"./index-d7e0b608.js";import{B as r}from"./base.service-1e1fcad7.js";class y extends r{}class f extends r{}class k extends r{}class S extends r{}class v extends r{}class T extends r{}class O extends r{}class W extends r{}class C extends r{}class m extends r{}const s=new S("/workcenter"),i=new v("/workcentertype"),c=new T("/workcentercost"),n=new y("/area"),o=new k("/site"),p=new f("/enterprise"),h=new W("/operator"),d=new C("/operatortype"),w=new m("/operatorcost"),l=new O("/machinestatus"),A=u({id:"plantmodel",state:()=>({workcenter:void 0,workcenters:void 0,workcentercost:void 0,workcentercosts:void 0,workcenterType:void 0,workcenterTypes:void 0,area:void 0,areas:void 0,site:void 0,sites:void 0,enterprise:void 0,enterprises:void 0,operator:void 0,operators:void 0,operatorType:void 0,operatorTypes:void 0,operatorCost:void 0,operatorCosts:void 0,machineStatus:void 0,machineStatuses:void 0}),getters:{},actions:{setNewWorkcenter(e){this.workcenter={id:e,name:"",description:"",workcenterTypeId:"",areaId:"",disabled:!1}},async fetchWorkcenters(){this.workcenters=await s.getAll()},async fetchWorkcenter(e){this.workcenter=await s.getById(e)},async createWorkcenter(e){const t=await s.create(e);return t&&await this.fetchWorkcenters(),t},async updateWorkcenter(e,t){const a=await s.update(e,t);return a&&await this.fetchWorkcenters(),a},async deleteWorkcenter(e){const t=await s.delete(e);return t&&await this.fetchWorkcenters(),t},setNewWorkcenterType(e){this.workcenterType={id:e,name:"",description:"",disabled:!1}},async fetchWorkcenterTypes(){this.workcenterTypes=await i.getAll()},async fetchWorkcenterType(e){this.workcenterType=await i.getById(e)},async createWorkcenterType(e){const t=await i.create(e);return t&&await this.fetchWorkcenterTypes(),t},async updateWorkcenterType(e,t){const a=await i.update(e,t);return a&&await this.fetchWorkcenterTypes(),a},async deleteWorkcenterType(e){const t=await i.delete(e);return t&&await this.fetchWorkcenterTypes(),t},setNewWorkcenterCost(e){this.workcentercost={id:e,workcenterId:"",machineStatusId:"",cost:0,disabled:!1}},async fetchWorkcenterCosts(){this.workcentercosts=await c.getAll()},async fetchWorkcenterCost(e){this.workcentercost=await c.getById(e)},async createWorkcenterCost(e){const t=await c.create(e);return t&&await this.fetchWorkcenterCosts(),t},async updateWorkcenterCost(e,t){const a=await c.update(e,t);return a&&await this.fetchWorkcenterCosts(),a},async deleteWorkcenterCost(e){const t=await c.delete(e);return t&&await this.fetchWorkcenterCosts(),t},setNewArea(e){this.area={id:e,name:"",description:"",siteId:"",disabled:!1}},async fetchAreas(){this.areas=await n.getAll()},async fetchArea(e){this.area=await n.getById(e)},async createArea(e){const t=await n.create(e);return t&&await this.fetchAreas(),t},async updateArea(e,t){const a=await n.update(e,t);return a&&await this.fetchAreas(),a},async deleteArea(e){const t=await n.delete(e);return t&&await this.fetchAreas(),t},setNewSite(e){this.site={id:e,name:"",description:"",address:"",city:"",postalCode:"",region:"",country:"",phoneNumber:"",email:"",vatNumber:"",enterpriseId:"",disabled:!1}},async fetchSites(){this.sites=await o.getAll()},async fetchSite(e){this.site=await o.getById(e)},async createSite(e){const t=await o.create(e);return t&&await this.fetchSites(),t},async updateSite(e,t){const a=await o.update(e,t);return a&&await this.fetchSites(),a},async deleteSite(e){const t=await o.delete(e);return t&&await this.fetchSites(),t},setNewEnterprise(e){this.enterprise={id:e,name:"",description:"",siteId:"",disabled:!1}},async fetchEnterprises(){this.enterprises=await p.getAll()},async fetchEnterprise(e){this.enterprise=await p.getById(e)},async createEnterprise(e){const t=await p.create(e);return t&&await this.fetchEnterprises(),t},async updateEnterprise(e,t){const a=await p.update(e,t);return a&&await this.fetchEnterprises(),a},async deleteEnterprise(e){const t=await p.delete(e);return t&&await this.fetchEnterprises(),t},setNewOperator(e){this.operator={id:e,code:"",name:"",surname:"",operatorTypeId:"",disabled:!1}},async fetchOperators(){this.operators=await h.getAll()},async fetchOperator(e){this.operator=await h.getById(e)},async createOperator(e){const t=await h.create(e);return t&&await this.fetchOperators(),t},async updateOperator(e,t){const a=await h.update(e,t);return a&&await this.fetchOperators(),a},async deleteOperator(e){const t=await h.delete(e);return t&&await this.fetchOperators(),t},setNewOperatorType(e){this.operatorType={id:e,name:"",description:"",disabled:!1}},async fetchOperatorTypes(){this.operatorTypes=await d.getAll()},async fetchOperatorType(e){this.operatorType=await d.getById(e)},async createOperatorType(e){const t=await d.create(e);return t&&await this.fetchOperatorTypes(),t},async updateOperatorType(e,t){const a=await d.update(e,t);return a&&await this.fetchOperatorTypes(),a},async deleteOperatorType(e){const t=await d.delete(e);return t&&await this.fetchOperatorTypes(),t},setNewOperatorCost(e){this.operatorCost={id:e,operatorTypeId:"",machineStatusId:"",cost:0,disabled:!1}},async fetchOperatorCosts(){this.operatorCosts=await w.getAll()},async fetchOperatorCost(e){this.operatorCost=await w.getById(e)},async createOperatorCost(e){const t=await w.create(e);return t&&await this.fetchOperatorCosts(),t},async updateOperatorCost(e,t){const a=await w.update(e,t);return a&&await this.fetchOperatorCosts(),a},async deleteOperatorCost(e){const t=await w.delete(e);return t&&await this.fetchOperatorCosts(),t},setNewMachineStatus(e){this.machineStatus={id:e,name:"",description:"",disabled:!1}},async fetchMachineStatuses(){this.machineStatuses=await l.getAll()},async fetchMachineStatus(e){this.machineStatus=await l.getById(e)},async createMachineStatus(e){const t=await l.create(e);return t&&await this.fetchMachineStatuses(),t},async updateMachineStatus(e,t){const a=await l.update(e,t);return a&&await this.fetchMachineStatuses(),a},async deleteMachineStatus(e){const t=await l.delete(e);return t&&await this.fetchMachineStatuses(),t}}});export{A as u};
