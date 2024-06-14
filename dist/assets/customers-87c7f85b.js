import{I as c}from"./index-ffbfd559.js";import{B as u}from"./base.service-bfea8aa4.js";class n extends u{}class m extends u{async addContact(t){const s=await this.apiClient.post(`${this.resource}/Contact`,t);return s.status===200||s.status===201}async updateContact(t){const s=await this.apiClient.put(`${this.resource}/Contact/${t.id}`,t);return s.status===200||s.status===201}async removeContact(t){const s=await this.apiClient.delete(`${this.resource}/Contact/${t}`);return s.status===200||s.status===201}async addAddress(t){const s=await this.apiClient.post(`${this.resource}/Address`,t);return s.status===200||s.status===201}async updateAddress(t){const s=await this.apiClient.put(`${this.resource}/Address/${t.id}`,t);return s.status===200||s.status===201}async removeAddress(t){const s=await this.apiClient.delete(`${this.resource}/Address/${t}`);return s.status===200||s.status===201}}const r=new m("/Customer"),a=new n("/CustomerType"),p=c({id:"customers",state:()=>({customers:void 0,customerTypes:void 0,customer:void 0,customerType:void 0}),getters:{getCustomerNameById:e=>t=>{var o;const s=(o=e.customers)==null?void 0:o.find(i=>i.id===t);return s?s.comercialName:""}},actions:{setNewCustomer(e){this.customer={id:e,code:"",comercialName:"",taxName:"",vatNumber:"",web:"",disabled:!1,customerTypeId:""}},async fetchCustomers(){this.customers=await r.getAll()},async fetchCustomer(e){this.customer=await r.getById(e)},async createCustomer(e){const t=await r.create(e);return t&&await this.fetchCustomers(),t},async updateCustomer(e,t){const s=await r.update(e,t);return s&&await this.fetchCustomers(),s},async deleteCustomer(e){const t=await r.delete(e);return t&&await this.fetchCustomers(),t},setNewCustomerType(e){this.customerType={id:e,name:"",description:""}},async fetchCustomerTypes(){this.customerTypes=await a.getAll()},async fetchCustomerType(e){this.customerType=await a.getById(e)},async createCustomerType(e){const t=await a.create(e);return t&&await this.fetchCustomerTypes(),t},async updateCustomerType(e,t){const s=await a.update(e,t);return s&&await this.fetchCustomerTypes(),s},async deleteCustomerType(e){const t=await a.delete(e);return t&&await this.fetchCustomerTypes(),t},async addContactToCustomer(e){const t=await r.addContact(e);return t&&await this.fetchCustomer(e.customerId),t},async updateContactFromCustomer(e){const t=await r.updateContact(e);return t&&await this.fetchCustomer(e.customerId),t},async removeContactFromCustomer(e){const t=await r.removeContact(e.id);return t&&await this.fetchCustomer(e.customerId),t},async addAddressToCustomer(e){const t=await r.addAddress(e);return t&&await this.fetchCustomer(e.customerId),t},async updateAddressFromCustomer(e){const t=await r.updateAddress(e);return t&&await this.fetchCustomer(e.customerId),t},async removeAddressFromCustomer(e){const t=await r.removeAddress(e.id);return t&&await this.fetchCustomer(e.customerId),t}}});export{n as C,m as a,p as u};