import{N as t}from"./index-0165ef2a.js";import{S as o}from"./index-7d1efa57.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};