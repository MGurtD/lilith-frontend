import{J as r}from"./index-30e64f83.js";import{d as a}from"./index-b8eb6b9a.js";const c=r({id:"workmaster",state:()=>({workmaster:void 0,workmasters:void 0,workmasterPhase:void 0,workmasterToCopy:void 0}),getters:{getByReferenceId:e=>t=>!t||!e.workmasters?[]:e.workmasters.filter(s=>s.referenceId===t)},actions:{setNew(e){this.workmaster={id:e,baseQuantity:1,referenceId:"",disabled:!1,phases:[]}},async fetchAll(){this.workmasters=await a.WorkMaster.getAll()},async fetchAllActives(){var e;this.workmasters=await a.WorkMaster.getAll(),this.workmasters=(e=this.workmasters)==null?void 0:e.filter(t=>!t.disabled)},async fetchOne(e){this.workmaster=await a.WorkMaster.getById(e)},async create(e){const t=await a.WorkMaster.create(e);return t&&await this.fetchOne(e.id),t},async update(e,t){const s=await a.WorkMaster.update(e,t);return s&&await this.fetchAll(),s},async delete(e){const t=await a.WorkMaster.delete(e);return t&&await this.fetchAll(),t},async calculate(e){return await a.WorkMaster.calculateCost(e)},async copy(e){const t=await a.WorkMaster.copyWorkMaster(e);return t&&await this.fetchAll(),t},async fetchPhaseById(e){this.workmasterPhase=await a.WorkMasterPhase.getById(e)},async createPhase(e){const t=await a.WorkMasterPhase.create(e);return t&&await this.fetchPhaseById(e.id),t},async updatePhase(e,t){const s=await a.WorkMasterPhase.update(e,t);return s&&await this.fetchPhaseById(t.id),s},async deletePhase(e){const t=await a.WorkMasterPhase.delete(e);return t&&await this.fetchOne(this.workmaster.id),t},async createPhaseDetail(e){const t=await a.WorkMasterPhaseDetail.create(e);return t&&await this.fetchPhaseById(e.workMasterPhaseId),t},async updatePhaseDetail(e,t){const s=await a.WorkMasterPhaseDetail.update(e,t);return s&&await this.fetchPhaseById(t.workMasterPhaseId),s},async deletePhaseDetail(e){const t=await a.WorkMasterPhaseDetail.delete(e);return t&&await this.fetchPhaseById(this.workmasterPhase.id),t},async createPhaseBomItem(e){const t=await a.WorkMasterPhaseBillOfMaterials.create(e);return t&&await this.fetchPhaseById(e.workMasterPhaseId),t},async updatePhaseBomItem(e,t){const s=await a.WorkMasterPhaseBillOfMaterials.update(e,t);return s&&await this.fetchPhaseById(t.workMasterPhaseId),s},async deletePhaseBomItem(e){const t=await a.WorkMasterPhaseBillOfMaterials.delete(e);return t&&await this.fetchPhaseById(this.workmasterPhase.id),t}}});export{c as u};