import{N as t}from"./index-206100ee.js";import{S as o}from"./index-3f1a9249.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};
