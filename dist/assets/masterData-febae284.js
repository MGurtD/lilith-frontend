import{I as t}from"./index-8f350042.js";import{S as e}from"./index-9bb1cbdb.js";const i=t({id:"sharedMasterData",state:()=>({paymentMethods:[],taxes:[],exercises:[],lifecycles:[],references:[]}),getters:{},actions:{async fetchMasterData(){this.paymentMethods=await e.PaymentMethod.getActive(),this.exercises=await e.Exercice.getActive(),this.taxes=await e.Tax.getActive(),this.lifecycles=await e.Lifecycle.getActive()}}});export{i as u};
