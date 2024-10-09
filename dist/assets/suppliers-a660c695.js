import{N as u}from"./index-77e4d88f.js";import{S as l,a as c}from"./suppliers.service-05c90099.js";const p=new l("/supplier"),r=new c("/suppliertype"),f=u({id:"suppliers",state:()=>({supplierTypes:void 0,supplierType:void 0,suppliers:void 0,supplier:void 0,supplierReferences:void 0,supplierReference:void 0}),getters:{getName:e=>t=>{var s;if(!e.suppliers)return"";const i=(s=e.suppliers)==null?void 0:s.find(a=>a.id===t);return i?i.comercialName:""}},actions:{setNewSupplier(e){this.supplier={id:e,comercialName:"",taxName:"",address:"",vatNumber:"",city:"",country:"Espanya",disabled:!1,observations:"",phone:"",postalCode:"",region:""}},async fetchSuppliers(){this.suppliers=await p.getAll()},async fetchSupplier(e){this.supplier=await p.getById(e)},async createSupplier(e){const t=await p.create(e);return t&&await this.fetchSuppliers(),t},async updateSupplier(e,t){const i=await p.update(e,t);return i&&await this.fetchSuppliers(),i},async deleteSupplier(e){const t=await p.delete(e);return t&&await this.fetchSuppliers(),t},setNewSupplierType(e){this.supplierType={id:e,name:"",description:""}},async fetchSupplierTypes(){this.supplierTypes=await r.getAll()},async fetchSupplierType(e){this.supplierType=await r.getById(e)},async createSupplierType(e){const t=await r.create(e);return t&&await this.fetchSupplierTypes(),t},async updateSupplierType(e,t){const i=await r.update(e,t);return i&&await this.fetchSupplierTypes(),i},async deleteSupplierType(e){const t=await r.delete(e);return t&&await this.fetchSupplierTypes(),t},async addContactToSupplier(e){const t=await p.addContact(e);return t&&await this.fetchSupplier(e.supplierId),t},async updateContactFromSupplier(e){const t=await p.updateContact(e);return t&&await this.fetchSupplier(e.supplierId),t},async removeContactFromSupplier(e){const t=await p.removeContact(e.id);return t&&await this.fetchSupplier(e.supplierId),t},async fetchSupplierReference(e){this.supplierReference=await p.getReference(e)},async fetchSupplierReferences(e){this.supplierReferences=await p.getReferences(e)},async addReferenceToSupplier(e){const t=await p.addReference(e);return t&&await this.fetchSupplierReferences(e.supplierId),t},async updateReferenceFromSupplier(e){const t=await p.updateReference(e);return t&&await this.fetchSupplierReferences(e.supplierId),t},async removeReferenceFromSupplier(e){const t=await p.removeReference(e.id);return t&&await this.fetchSupplierReferences(e.supplierId),t}}});export{f as u};