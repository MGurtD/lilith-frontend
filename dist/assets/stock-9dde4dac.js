import{I as t}from"./index-3b4220ae.js";import{S as o}from"./index-4ccec676.js";const c=t({id:"stock",state:()=>({stocks:void 0}),getters:{},actions:{async fetchStocks(){this.stocks=await o.Stock.getAll()}}});export{c as u};
