import{N as r}from"./index-77e4d88f.js";import{S as i}from"./index-c5381636.js";const d=r({id:"deliveryNote",state:()=>({deliveryNote:void 0,deliveryNotes:void 0,invoiceableDeliveryNotes:void 0}),getters:{},actions:{async GetById(e){this.deliveryNote=await i.DeliveryNote.getById(e)},async GetDetailsById(e){const t=await i.DeliveryNote.getById(e);this.deliveryNote&&t&&(this.deliveryNote.details=[],this.deliveryNote.details=t==null?void 0:t.details)},async GetFiltered(e,t,s){s?this.deliveryNotes=await i.DeliveryNote.GetBetweenDatesAndCustomer(e,t,s):this.deliveryNotes=await i.DeliveryNote.GetBetweenDates(e,t)},async GetByInvoiceId(e){this.deliveryNotes=await i.DeliveryNote.GetByInvoiceId(e)},async GetToInvoice(e){this.invoiceableDeliveryNotes=await i.DeliveryNote.GetToInvoice(e)},async Create(e){return(await i.DeliveryNote.Create(e)).result},async Update(e,t){return await i.DeliveryNote.update(e,t)},async Delete(e){return await i.DeliveryNote.delete(e)},async AddOrder(e,t){const s=await i.DeliveryNote.AddOrder(e,t);return await this.GetDetailsById(e),s},async DeleteOrder(e,t){const s=await i.DeliveryNote.DeleteOrder(e,t);return await this.GetDetailsById(e),s}}});export{d as u};
