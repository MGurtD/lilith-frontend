import{J as o}from"./index-61ceac46.js";import{S as r}from"./index-dbe80950.js";const n=o({id:"deliveryNote",state:()=>({deliveryNote:void 0,deliveryNotes:void 0,invoiceableDeliveryNotes:void 0}),getters:{},actions:{async GetById(e){this.deliveryNote=await r.DeliveryNote.getById(e)},async GetFiltered(e,t,i){i?this.deliveryNotes=await r.DeliveryNote.GetBetweenDatesAndCustomer(e,t,i):this.deliveryNotes=await r.DeliveryNote.GetBetweenDates(e,t)},async GetByInvoiceId(e){this.deliveryNotes=await r.DeliveryNote.GetByInvoiceId(e)},async GetToInvoice(e){this.invoiceableDeliveryNotes=await r.DeliveryNote.GetToInvoice(e)},async Create(e){return(await r.DeliveryNote.Create(e)).result},async Update(e,t){return await r.DeliveryNote.update(e,t)},async Delete(e){return await r.DeliveryNote.delete(e)},async AddOrder(e,t){return await r.DeliveryNote.AddOrder(e,t)},async DeleteOrder(e,t){return await r.DeliveryNote.DeleteOrder(e,t)}}});export{n as u};
