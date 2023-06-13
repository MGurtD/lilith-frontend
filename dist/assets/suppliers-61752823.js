import{n as p,l}from"./index-b9d41b02.js";import{B as u}from"./base.service-7dbc85ae.js";class c extends u{async addContact(e){let s=!1;try{const i=await this.apiClient.post(`${this.resource}/Contact`,e);(i.status===200||i.status===201)&&(s=!0)}catch(i){p(i)}return s}async updateContact(e){let s=!1;try{const i=await this.apiClient.put(`${this.resource}/Contact/${e.id}`,e);(i.status===200||i.status===201)&&(s=!0)}catch(i){p(i)}return s}async removeContact(e){let s=!1;try{const i=await this.apiClient.delete(`${this.resource}/Contact/${e}`);(i.status===200||i.status===201)&&(s=!0)}catch(i){p(i)}return s}}class n extends u{}const r=new c("/supplier"),a=new n("/suppliertype"),d=l({id:"suppliers",state:()=>({suppliers:void 0,supplierTypes:void 0,supplier:void 0,supplierType:void 0}),getters:{},actions:{setNewSupplier(t){this.supplier={id:t,comercialName:"",taxName:"",address:"",vatNumber:"",city:"",country:"Espanya",disabled:!1,observations:"",phone:"",postalCode:"",region:""}},async fetchSuppliers(){this.suppliers=await r.getAll()},async fetchSupplier(t){this.supplier=await r.getById(t)},async createSupplier(t){const e=await r.create(t);return e&&await this.fetchSuppliers(),e},async updateSupplier(t,e){const s=await r.update(t,e);return s&&await this.fetchSuppliers(),s},async deleteSupplier(t){const e=await r.delete(t);return e&&await this.fetchSuppliers(),e},setNewSupplierType(t){this.supplierType={id:t,name:"",description:""}},async fetchSupplierTypes(){this.supplierTypes=await a.getAll()},async fetchSupplierType(t){this.supplierType=await a.getById(t)},async createSupplierType(t){const e=await a.create(t);return e&&await this.fetchSupplierTypes(),e},async updateSupplierType(t,e){const s=await a.update(t,e);return s&&await this.fetchSupplierTypes(),s},async deleteSupplierType(t){const e=await a.delete(t);return e&&await this.fetchSupplierTypes(),e},async addContactToSupplier(t){const e=await r.addContact(t);return e&&await this.fetchSupplier(t.supplierId),e},async updateContactFromSupplier(t){const e=await r.updateContact(t);return e&&await this.fetchSupplier(t.supplierId),e},async removeContactFromSupplier(t){const e=await r.removeContact(t.id);return e&&await this.fetchSupplier(t.supplierId),e}}});export{d as u};