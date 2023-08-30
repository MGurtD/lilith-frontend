import{C as p,a as u}from"./customers-b2428f08.js";import{R as d}from"./reference.service-d2af7bd6.js";import{B as o}from"./base.service-bb100fed.js";import{a as i,d as l}from"./functions-c791afc8.js";import{t as r}from"./index-4a35f1ba.js";class m extends o{async Create(e){const t=`${this.resource}`;return(await this.apiClient.post(t,e)).status===200}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await this.apiClient.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndStatus(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&statusId=${s}`,a=await this.apiClient.get(n);if(a.status===200)return a.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,a=await this.apiClient.get(n);if(a.status===200)return a.data}async Update(e){const t=`${this.resource}/${e.id}`;return(await this.apiClient.put(t,e)).status===200}async Delete(e){const t=`${this.resource}/${e.id}`;return(await this.apiClient.delete(t)).status===200}async GetInvoiceableOrderDetails(e){const t=i(l(0,0,-1)),s=i(new Date),n=`${this.resource}/InvoiceableOrderDetails?startTime=${t}&endTime=${s}&customerId=${e}`,a=await this.apiClient.get(n);if(a.status===200)return a.data}async CreateDetail(e){const t=`${this.resource}/Detail`;return(await this.apiClient.post(t,e)).data}async CreateInvoiceDetailsFromOrderDetails(e){const t=`${this.resource}/Detail/FromOrderDetails`;return(await this.apiClient.post(t,e)).status===200}async UpdateDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await this.apiClient.put(t,e)).status===200}async DeleteDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await this.apiClient.delete(t)).status===200}}class $ extends o{async Create(e){const t=`${this.resource}`,s=await this.apiClient.post(t,e);if(s.status===200)return s.data}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await r.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,a=await r.get(n);if(a.status===200)return a.data}async CreateDetail(e){const t=`${this.resource}/Detail`;return(await r.post(t,e)).status===200}async UpdateDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await r.put(t,e)).status===200}async DeleteDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await r.delete(t)).status===200}}const T={Reference:new d("/Reference"),CustomerType:new p("/CustomerType"),Customer:new u("/Customer"),SalesInvoice:new m("/SalesInvoice"),SalesOrder:new $("/SalesOrder")};export{T as s};
