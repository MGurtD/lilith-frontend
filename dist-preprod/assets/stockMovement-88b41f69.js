import{N as s}from"./index-948abaa8.js";import{S as o}from"./index-10fb56eb.js";const r=s({id:"stockMovement",state:()=>({stockMovement:void 0,stockMovements:void 0}),getters:{},actions:{async Create(e){return o.StockMovementService.Create(e)},async GetBetweenDates(e,t){this.stockMovements=await o.StockMovementService.GetBetweenDates(e,t)}}});export{r as u};
