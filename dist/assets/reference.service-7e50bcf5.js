import{B as s}from"./base.service-642755fa.js";class o extends s{async getByModule(t){const e=await this.apiClient.get(`${this.resource}/${t}`);if(e.status===200)return e.data}async getSalesReferencesByCustomer(t){const e=await this.apiClient.get(`${this.resource}/sales/customer/${t}`);if(e.status===200)return e.data}async getReferenceFormats(){const t=await this.apiClient.get(`${this.resource}/Formats`);if(t.status===200)return t.data}async deleteReference(t){const e=await this.apiClient.delete(`${this.resource}/${t}`);return e.status===200?{result:!0,errors:[],content:e.data}:{result:!1,errors:[e.data?e.data.toString():"Error desconegut"],content:null}}}export{o as R};
