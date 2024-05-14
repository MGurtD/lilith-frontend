import{J as n}from"./index-3b8fad0b.js";import{R as a}from"./reference.service-d6c42ab4.js";const s=new a("/reference"),f=n({id:"reference",state:()=>({reference:void 0,references:void 0,referenceFormats:void 0,module:""}),getters:{getFullName:t=>e=>e?(e.description.length>=30&&(e.description=e.description.substring(0,29)),e.sales?`${e.code} (v. ${e.version}) - ${e.description}`:`${e.code} - ${e.description}`):"",getShortName:t=>e=>e?(e.description.length>=30&&(e.description=e.description.substring(0,29)),e.sales?`${e.code} (v. ${e.version})`:`${e.code}`):""},actions:{getFullNameById(t){var r;const e=(r=this.references)==null?void 0:r.find(i=>i.id===t);return e?this.getFullName(e):""},getShortNameById(t){var r;const e=(r=this.references)==null?void 0:r.find(i=>i.id===t);return e?this.getShortName(e):""},setNewReference(t){this.reference={id:t,code:"",description:"",cost:0,price:0,disabled:!1,version:"1",sales:this.module==="sales",purchase:this.module==="purchase",production:this.module==="production",referenceTypeId:null,referenceFormatId:null,density:0,lastPurchaseCost:0,isService:!1,lastCost:0,workMasterCost:0,customerId:null}},async fetchReferences(){this.references=await s.getAll(),this.referenceFormats||(this.referenceFormats=await s.getReferenceFormats())},async fetchReferencesByModule(t){this.module=t,this.references=await s.getByModule(t),this.referenceFormats||(this.referenceFormats=await s.getReferenceFormats())},async fetchReferencesByCustomer(t){this.module="sales",this.references=await s.getSalesReferencesByCustomer(t),this.referenceFormats||(this.referenceFormats=await s.getReferenceFormats())},async fetchReference(t){this.reference=await s.getById(t)},async createReference(t){const e=await s.create(t);return e&&await this.fetchReferencesByModule(this.module),e},async updateReference(t,e){const r=await s.update(t,e);return r&&await this.fetchReferencesByModule(this.module),r},async deleteReference(t){const e=await s.deleteReference(t);return e.result&&await this.fetchReferencesByModule(this.module),e}}});export{f as u};