import{N as n,S as r}from"./index-abfce291.js";const s=n({id:"referenceType",state:()=>({referenceType:void 0,referenceTypes:void 0}),getters:{},actions:{setNewReferenceType(e){this.referenceType={id:e,name:"",description:"",disabled:!1}},getReferenceTypeById(e){var t;return(t=this.referenceTypes)==null?void 0:t.find(c=>c.id===e)},async fetchAll(){this.referenceTypes=await r.ReferenceType.getAll()},async fetchActive(){this.referenceTypes=await r.ReferenceType.getActive()},async fetchReferenceType(e){this.referenceType=await r.ReferenceType.getById(e)},async createReferenceType(e){const t=await r.ReferenceType.create(e);return t&&await this.fetchAll(),t},async updateReferenceType(e,t){const c=await r.ReferenceType.update(e,t);return c&&await this.fetchAll(),c},async deleteReferenceType(e){const t=await r.ReferenceType.delete(e);return t&&await this.fetchAll(),t}}});export{s as u};
