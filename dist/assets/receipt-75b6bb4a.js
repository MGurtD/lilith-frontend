import{J as a}from"./index-53820b8d.js";import{E as s}from"./index-c96e9700.js";const n=a({id:"receipts",state:()=>({receipts:void 0,receipt:void 0}),getters:{},actions:{setNewReceipt(t){this.receipt={id:t,date:"",details:[],disabled:!1,exerciseId:"",statusId:"",supplierId:"",supplierNumber:"",number:""}},async fetchFiltered(t,e,i,c){this.receipts=await s.Receipt.getFiltered(t,e,i)},async fetchReceipts(){this.receipts=await s.Receipt.getAll()},async fetchReceipt(t){this.receipt=await s.Receipt.getById(t)},async createReceipt(t){const e=await s.Receipt.create(t);return e&&await this.fetchReceipts(),e},async updateReceipt(t,e){const i=await s.Receipt.update(t,e);return i&&await this.fetchReceipts(),i},async deleteReceipt(t){const e=await s.Receipt.delete(t);return e&&await this.fetchReceipts(),e},async createReceiptDetail(t){const e=await s.Receipt.addDetail(t);return e.result&&await this.fetchReceipt(t.receiptId),e},async updateReceiptDetail(t,e){const i=await s.Receipt.updateDetail(e);return i.result&&await this.fetchReceipt(e.receiptId),i},async deleteReceiptDetail(t){const e=await s.Receipt.removeDetail(t);if(e.result){const i=this.receipt.details.find(c=>c.id===t);if(i){const c=this.receipt.details.indexOf(i);this.receipt.details.splice(c)}}return e},async calculateDetailWeightAndPrice(t){const e=await s.Receipt.calculateDetailWeightAndPrice(t);if(e.result)return e.content}}});export{n as u};
