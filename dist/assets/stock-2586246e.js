import{N as t}from"./index-d4f01faf.js";import{S as o}from"./index-9bed6c4c.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};
