import{I as t}from"./index-d7d79c10.js";import{S as o}from"./index-53e8d308.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};
