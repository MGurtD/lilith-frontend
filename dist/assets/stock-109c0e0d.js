import{N as t}from"./index-abfce291.js";import{S as o}from"./index-5009e854.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};
