import{N as n}from"./index-948abaa8.js";import{S as a}from"./index-d848dba1.js";const d=n({id:"salseInvoices",state:()=>({invoice:void 0,invoices:void 0}),getters:{},actions:{async Create(e){return await a.SalesInvoice.Create(e)},async CreateRectificative(e){return await a.SalesInvoice.CreateRectificative(e)},async GetById(e){this.invoice=await a.SalesInvoice.getById(e)},async GetFiltered(e,t,s,i,o){s?this.invoices=await a.SalesInvoice.GetBetweenDatesAndStatus(e,t,s):i?this.invoices=await a.SalesInvoice.GetBetweenDatesAndCustomer(e,t,i):this.invoices=await a.SalesInvoice.GetBetweenDates(e,t)},async Update(e){return await a.SalesInvoice.update(e.id,e)},async Delete(e){return await a.SalesInvoice.delete(e)},async AddDeliveryNote(e,t){return await a.SalesInvoice.AddDeliveryNote(e,t)},async RemoveDeliveryNote(e,t){return await a.SalesInvoice.RemoveDeliveryNote(e,t)},async CreateInvoiceDetail(e){const t=await a.SalesInvoice.CreateDetail(e);return await this.GetById(e.salesInvoiceId),t},async UpdateInvoiceDetail(e){const t=await a.SalesInvoice.UpdateDetail(e);return await this.GetById(e.salesInvoiceId),t},async DeleteInvoiceDetail(e){const t=await a.SalesInvoice.DeleteDetail(e);return await this.GetById(e.salesInvoiceId),t}}});export{d as u};
