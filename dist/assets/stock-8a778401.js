import{I as t}from"./index-e365f3be.js";import{S as o}from"./index-ac01e9f5.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};