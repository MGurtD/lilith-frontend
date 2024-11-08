import{ac as o,t as a}from"./index-40c5ef33.js";import{C as c,a as p}from"./customers-e5cc267b.js";class u extends o{async Create(e){const t=`${this.resource}`;return(await this.apiClient.post(t,e)).status===200}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await a.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,r=await a.get(n);if(r.status===200)return r.data}async GetReportDataById(e){const t=`${this.resource}/Report/${e}`,s=await a.get(t);if(s.status===200)return s.data}async CreateDetail(e){const t=`${this.resource}/Detail`;return(await a.post(t,e)).status===200}async UpdateDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await a.put(t,e)).status===200}async DeleteDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await a.delete(t)).status===200}}class d extends o{async Create(e){const t=`${this.resource}`;return(await this.apiClient.post(t,e)).data}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await a.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,r=await a.get(n);if(r.status===200)return r.data}async GetByInvoiceId(e){const t=`${this.resource}/Invoice/${e}`,s=await a.get(t);if(s.status===200)return s.data}async GetToInvoice(e){const t=`${this.resource}/ToInvoice?customerId=${e}`,s=await a.get(t);if(s.status===200)return s.data}async GetReportDataById(e){const t=`${this.resource}/Report/${e}`,s=await a.get(t);if(s.status===200)return s.data}async AddOrder(e,t){const s=`${this.resource}/${e}/AddOrder`;return(await a.post(s,t)).data}async DeleteOrder(e,t){const s=`${this.resource}/${e}/RemoveOrder`;return(await a.post(s,t)).data}}class $ extends o{async Create(e){const t=`${this.resource}`;return(await this.apiClient.post(t,e)).status===200}async CreateRectificative(e){const t=`${this.resource}`,s=await this.apiClient.post(`${t}/rectificative`,e);if(s.status===200)return s.data}async GetHeader(e){const t=`${this.resource}/header/${e}`,s=await this.apiClient.get(t);if(s.status===200)return s.data}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await this.apiClient.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndStatus(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&statusId=${s}`,r=await this.apiClient.get(n);if(r.status===200)return r.data}async GetBetweenDatesAndExcludeStatus(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&excludeStatusId=${s}`,r=await this.apiClient.get(n);if(r.status===200)return r.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,r=await this.apiClient.get(n);if(r.status===200)return r.data}async GetReportDataById(e){const t=`${this.resource}/Report/${e}`,s=await this.apiClient.get(t);if(s.status===200)return s.data}async Update(e){const t=`${this.resource}/${e.id}`;return(await this.apiClient.put(t,e)).status===200}async UpdateStatuses(e){const t=`${this.resource}/UpdateStatuses`;return(await this.apiClient.post(t,e)).status===200}async Delete(e){const t=`${this.resource}/${e.id}`;return(await this.apiClient.delete(t)).status===200}async AddDeliveryNote(e,t){const s=`${this.resource}/${e}/AddDeliveryNote`;return(await this.apiClient.post(s,t)).data}async RemoveDeliveryNote(e,t){const s=`${this.resource}/${e}/RemoveDeliveryNote`;return(await this.apiClient.post(s,t)).data}async CreateDetail(e){const t=`${this.resource}/Detail`;return(await this.apiClient.post(t,e)).data}async UpdateDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await this.apiClient.put(t,e)).status===200}async DeleteDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await this.apiClient.delete(t)).status===200}}class l extends o{async Create(e){const t=`${this.resource}`;return(await this.apiClient.post(t,e)).status===200}async CreateFromBudget(e){const t=`${this.resource}`;return(await this.apiClient.post(`${t}/FromBudget`,e)).data}async GetFromBudgetId(e){const t=`${this.resource}/budget/${e}`,s=await a.get(t);if(s.status===200)return s.data}async GetBetweenDates(e,t){const s=`${this.resource}?startTime=${e}&endTime=${t}`,n=await a.get(s);if(n.status===200)return n.data}async GetBetweenDatesAndCustomer(e,t,s){const n=`${this.resource}?startTime=${e}&endTime=${t}&customerId=${s}`,r=await a.get(n);if(r.status===200)return r.data}async GetReportDataById(e){const t=`${this.resource}/Report/${e}`,s=await a.get(t);if(s.status===200)return s.data}async GetByDeliveryNote(e){const t=`${this.resource}/DeliveryNote/${e}`,s=await a.get(t);if(s.status===200)return s.data}async GetToDeliver(e){const t=`${this.resource}/ToDeliver?customerId=${e}`,s=await a.get(t);if(s.status===200)return s.data}async CreateDetail(e){const t=`${this.resource}/Detail`;return(await a.post(t,e)).status===200}async UpdateDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await a.put(t,e)).status===200}async DeleteDetail(e){const t=`${this.resource}/Detail/${e.id}`;return(await a.delete(t)).status===200}}const w={CustomerType:new c("/CustomerType"),Customer:new p("/Customer"),Budget:new u("/Budget"),SalesOrder:new l("/SalesOrder"),DeliveryNote:new d("/DeliveryNote"),SalesInvoice:new $("/SalesInvoice")};export{w as S};
