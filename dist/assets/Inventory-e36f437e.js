import{I as F,d as C,j as N,r as D,h as I,a as _,c as T,e as s,i as n,n as $,k as r,s as y,y as c,l as P,u as A,o as L,P as Q,w as f,G as j,C as U,D as z}from"./index-8f350042.js";import{u as G}from"./stock-3acf72df.js";import{u as E}from"./reference-a84866df.js";import{u as O}from"./stockMovement-4076fe90.js";import{_ as H}from"./DropdownReference.vue_vue_type_script_setup_true_lang-5313a810.js";import{c as X,d as J,a as K,F as W}from"./form-validator-f8953ae6.js";import{g as S}from"./functions-2e154ea4.js";import{v as Y}from"./v4-a960c1f4.js";import"./index-e27054ea.js";import"./base.service-642755fa.js";import"./reference.service-7e50bcf5.js";import"./_commonjsHelpers-725317a4.js";const Z=F({id:"inventory",state:()=>({inventory:void 0,inventories:void 0}),getters:{},actions:{setNewInventory(g){this.inventory={id:g,stockId:"",movementType:"",locationId:"",referenceId:"",oldQuantity:0,newQuantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date}}}}),x={key:0},ee={class:"three-columns"},te={class:"three-columns"},ne={class:"mt-2"},oe={class:"mt-2"},ae={class:"mt-2"},ie=C({__name:"FormInventoryNewMovements",props:{newMovement:{}},emits:["submit","cancel"],setup(g,{emit:k}){const p=g,M=N();E();const m=X().shape({newQuantity:J().min(1).required("La quantitat ha de ser superior a 1"),referenceId:K().required("La referencia és obligatoria")}),v=D({result:!1,errors:{}}),V=()=>{const t=new W(m);v.value=t.validate(p.newMovement)},b=async()=>{if(V(),v.value.result)k("submit",p.newMovement);else{let t="";Object.entries(v.value.errors).forEach(a=>{t+=`${a[1].map(w=>w)}.   `}),M.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,a)=>{const w=I("Button");return t.newMovement?(_(),T("form",x,[s("div",null,[n(H,{label:"Material",fullName:!0,modelValue:t.newMovement.referenceId,"onUpdate:modelValue":a[0]||(a[0]=i=>t.newMovement.referenceId=i),class:$({"p-invalid":v.value.errors.referenceId})},null,8,["modelValue","class"])]),s("section",ee,[s("div",null,[n(c,{type:r(y).NUMERIC,label:"Quantitat",modelValue:t.newMovement.newQuantity,"onUpdate:modelValue":a[1]||(a[1]=i=>t.newMovement.newQuantity=i)},null,8,["type","modelValue"])]),s("div",null,[n(c,{type:r(y).NUMERIC,label:"Amplada (mm)",decimals:2,modelValue:t.newMovement.width,"onUpdate:modelValue":a[2]||(a[2]=i=>t.newMovement.width=i)},null,8,["type","modelValue"])]),s("div",null,[n(c,{type:r(y).NUMERIC,decimals:2,label:"Alçada (mm)",modelValue:t.newMovement.height,"onUpdate:modelValue":a[3]||(a[3]=i=>t.newMovement.height=i)},null,8,["type","modelValue"])])]),s("section",te,[s("div",ne,[n(c,{type:r(y).NUMERIC,decimals:2,label:"Longitud (mm)",modelValue:t.newMovement.length,"onUpdate:modelValue":a[4]||(a[4]=i=>t.newMovement.length=i)},null,8,["type","modelValue"])]),s("div",oe,[n(c,{type:r(y).NUMERIC,decimals:2,label:"Diàmetre (mm)",modelValue:t.newMovement.diameter,"onUpdate:modelValue":a[5]||(a[5]=i=>t.newMovement.diameter=i)},null,8,["type","modelValue"])]),s("div",ae,[n(c,{type:r(y).NUMERIC,decimals:2,label:"Gruix (mm)",modelValue:t.newMovement.thickness,"onUpdate:modelValue":a[6]||(a[6]=i=>t.newMovement.thickness=i)},null,8,["type","modelValue"])])]),n(w,{label:"Crear",onClick:b,style:{float:"right"},size:"small",class:"mt-2"})])):P("",!0)}}}),le={class:"flex flex-wrap align-items-center justify-content-between gap-2"},se=s("span",{class:"text-xl text-900 font-bold"},"Inventari",-1),ge=C({__name:"Inventory",setup(g){const k=A(),p=G(),M=E(),m=Z(),v=O(),V=N();L(async()=>{k.setMenuItem({icon:Q.BOX,title:"Inventari"}),await b()});const b=async()=>{var d;await p.fetchStocks(),m.inventories=[],(d=p.stocks)==null||d.forEach(o=>{var l;let u={id:Y(),stockId:o.id,movementType:"bal",locationId:o.locationId,referenceId:o.referenceId,oldQuantity:o.quantity,newQuantity:o.quantity,width:o.width,length:o.length,height:o.height,diameter:o.diameter,thickness:o.thickness,movementDate:new Date};(l=m.inventories)==null||l.push(u)}),await M.fetchReferences()},t=D(!1),a=D({}),w=d=>{var o;(o=m.inventories)==null||o.push(d),t.value=!1},i=()=>{t.value=!0,a.value={id:S(),stockId:S(),movementType:"",locationId:"3fa85f64-5717-4562-b3fc-2c963f66afa6",referenceId:"",oldQuantity:0,newQuantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date}},B=async()=>{var l;let d={id:"",stockId:"",movementType:"",locationId:"",referenceId:"",quantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date,description:""},o=[];(l=m.inventories)==null||l.filter(e=>e.newQuantity!=e.oldQuantity).forEach(async e=>{e.newQuantity<e.oldQuantity?d={id:e.id,stockId:e.stockId,movementType:"OUTPUT",locationId:e.locationId,referenceId:e.referenceId,quantity:e.newQuantity-e.oldQuantity,width:e.width,length:e.length,height:e.height,diameter:e.diameter,thickness:e.thickness,movementDate:e.movementDate,description:"Sortida per inventari"}:e.newQuantity>e.oldQuantity&&(d={id:e.id,stockId:e.stockId,movementType:"INPUT",locationId:e.locationId,referenceId:e.referenceId,quantity:e.newQuantity-e.oldQuantity,width:e.width,length:e.length,height:e.height,diameter:e.diameter,thickness:e.thickness,movementDate:e.movementDate,description:"Entrada per inventari"}),o.push(v.Create(d))});const u=await Promise.all(o);console.log(u),u.filter(e=>e===!0).length===o.length?(V.add({severity:"success",summary:"Inventari creat correctament",life:5e3}),b()):V.add({severity:"error",summary:"Error al crear el moviment d'inventari",life:5e3})};return(d,o)=>{const u=I("Button"),l=I("Column"),e=I("DataTable"),R=I("Dialog");return _(),T(j,null,[n(e,{value:r(m).inventories,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh"},{header:f(()=>[s("div",le,[se,s("div",null,[n(u,{icon:r(Q).PLUS,rounded:"",raised:"",onClick:i},null,8,["icon"]),U("   "),n(u,{icon:r(Q).SAVE,rounded:"",raised:"",onClick:B},null,8,["icon"])])])]),default:f(()=>[n(l,{header:"Producte",style:{width:"28%"}},{body:f(h=>[U(z(r(M).getFullNameById(h.data.referenceId)),1)]),_:1}),n(l,{field:"oldQuantity",header:"Uds.",style:{width:"12%"}}),n(l,{header:"Recompte",style:{width:"12%"}},{body:f(h=>[n(c,{class:"mb-2",label:"",id:"newQuantity",modelValue:h.data.newQuantity,"onUpdate:modelValue":q=>h.data.newQuantity=q},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),n(l,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),n(l,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),n(l,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),n(l,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),n(l,{field:"thickness",header:"Gruix mm",style:{width:"12%"}})]),_:1},8,["value"]),n(R,{closable:!0,visible:t.value,"onUpdate:visible":o[0]||(o[0]=h=>t.value=h),modal:!0},{default:f(()=>[n(ie,{newMovement:a.value,onSubmit:w},null,8,["newMovement"])]),_:1},8,["visible"])],64)}}});export{ge as default};
