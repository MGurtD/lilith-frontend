import{l as n}from"./index-b9d41b02.js";import{B as i}from"./base.service-7dbc85ae.js";class o extends i{}const a=new o("/PaymentMethod"),d=n({id:"paymentMethod",state:()=>({paymentMethods:void 0,paymentMethod:void 0}),getters:{},actions:{setNew(e){this.paymentMethod={id:e,name:"",description:"",disabled:!1,dueDays:0,paymentDay:1,numberOfPayments:1,frequency:1}},async fetchAll(){this.paymentMethods=await a.getAll()},async fetchOne(e){this.paymentMethod=await a.getById(e)},async create(e){const t=await a.create(e);return t&&await this.fetchAll(),t},async update(e,t){const s=await a.update(e,t);return s&&await this.fetchAll(),s},async delete(e){const t=await a.delete(e);return t&&await this.fetchAll(),t}}});export{d as u};