import{N as s}from"./index-77e4d88f.js";import{S as o}from"./index-3dbea2d2.js";const r=s({id:"stockMovement",state:()=>({stockMovement:void 0,stockMovements:void 0}),getters:{},actions:{async Create(e){return o.StockMovementService.Create(e)},async GetBetweenDates(e,t){this.stockMovements=await o.StockMovementService.GetBetweenDates(e,t)}}});export{r as u};