import{K as A,d as R,j as q,r as S,h as y,a as U,c as C,e as l,i as o,w as h,D as N,l as T,k as m,n as P,s as I,y as p,u as j,o as z,P as Q,G as O,C as E}from"./index-9ee31eec.js";import{u as G}from"./stock-10982f7d.js";import{u as F}from"./reference-b31f5c29.js";import{u as x}from"./stockMovement-7adcc0ca.js";import{c as H,d as K,a as X,F as J}from"./form-validator-7a510593.js";import{g as B}from"./functions-afe9fe15.js";import{v as W}from"./v4-a960c1f4.js";import"./index-d1c8328b.js";import"./base.service-aa9daa2d.js";import"./reference.service-8d98e13b.js";const Y=A({id:"inventory",state:()=>({inventory:void 0,inventories:void 0}),getters:{},actions:{setNewInventory(g){this.inventory={id:g,stockId:"",movementType:"",locationId:"",referenceId:"",oldQuantity:0,newQuantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date}}}}),Z={key:0},ee={class:"two-columns-7525"},te=l("label",{class:"block text-900 mb-2"},"Material",-1),ne={key:0,class:"flex align-items-center"},oe={class:"four-columns"},ae={class:"mt-2"},ie={class:"mt-2"},se={class:"mt-2"},le={class:"mt-2"},re=R({__name:"FormInventoryNewMovements",props:{newMovement:{}},emits:["submit","cancel"],setup(g,{emit:V}){const f=g,b=q(),c=F(),k=H().shape({newQuantity:K().min(1).required("La quantitat ha de ser superior a 1"),referenceId:X().required("La referencia és obligatoria")}),u=S({result:!1,errors:{}}),M=()=>{const t=new J(k);u.value=t.validate(f.newMovement)},_=async()=>{if(M(),u.value.result)V("submit",f.newMovement);else{let t="";Object.entries(u.value.errors).forEach(a=>{t+=`${a[1].map(w=>w)}.   `}),b.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,a)=>{const w=y("Dropdown"),D=y("Button");return t.newMovement?(U(),C("form",Z,[l("section",ee,[l("div",null,[te,o(w,{modelValue:t.newMovement.referenceId,"onUpdate:modelValue":a[0]||(a[0]=i=>t.newMovement.referenceId=i),editable:"",options:m(c).references,optionValue:"id",optionLabel:"description",class:P(["w-full",{"p-invalid":u.value.errors.referenceId}])},{option:h(i=>[i.option?(U(),C("div",ne,N(i.option.code)+" - "+N(i.option.description),1)):T("",!0)]),_:1},8,["modelValue","options","class"])]),l("div",null,[o(p,{type:m(I).NUMERIC,label:"Quantitat",modelValue:t.newMovement.newQuantity,"onUpdate:modelValue":a[1]||(a[1]=i=>t.newMovement.newQuantity=i)},null,8,["type","modelValue"])])]),l("section",oe,[l("div",ae,[o(p,{type:m(I).NUMERIC,label:"Amplada",decimals:2,modelValue:t.newMovement.width,"onUpdate:modelValue":a[2]||(a[2]=i=>t.newMovement.width=i)},null,8,["type","modelValue"])]),l("div",ie,[o(p,{type:m(I).NUMERIC,decimals:2,label:"Alçada",modelValue:t.newMovement.height,"onUpdate:modelValue":a[3]||(a[3]=i=>t.newMovement.height=i)},null,8,["type","modelValue"])]),l("div",se,[o(p,{type:m(I).NUMERIC,decimals:2,label:"Longitud",modelValue:t.newMovement.length,"onUpdate:modelValue":a[4]||(a[4]=i=>t.newMovement.length=i)},null,8,["type","modelValue"])]),l("div",le,[o(p,{type:m(I).NUMERIC,decimals:2,label:"Diàmetre",modelValue:t.newMovement.diameter,"onUpdate:modelValue":a[5]||(a[5]=i=>t.newMovement.diameter=i)},null,8,["type","modelValue"])])]),o(D,{label:"Crear",onClick:_,style:{float:"right"},size:"small",class:"mt-2"})])):T("",!0)}}}),de={class:"flex flex-wrap align-items-center justify-content-between gap-2"},me=l("span",{class:"text-xl text-900 font-bold"},"Inventari",-1),be=R({__name:"Inventory",setup(g){const V=j(),f=G(),b=F(),c=Y(),k=x(),u=q();z(async()=>{V.setMenuItem({icon:Q.BOX,title:"Inventari"}),await M()});const M=async()=>{var r;await f.fetchStocks(),c.inventories=[],(r=f.stocks)==null||r.forEach(n=>{var s;let d={id:W(),stockId:n.id,movementType:"bal",locationId:n.locationId,referenceId:n.referenceId,oldQuantity:n.quantity,newQuantity:n.quantity,width:n.width,length:n.length,height:n.height,diameter:n.diameter,thickness:n.thickness,movementDate:new Date};(s=c.inventories)==null||s.push(d)}),await b.fetchReferences()},_=r=>{var d;const n=(d=b.references)==null?void 0:d.find(s=>s.id===r);return n?n.description:""},t=S(!1),a=S({}),w=r=>{var n;(n=c.inventories)==null||n.push(r),t.value=!1},D=()=>{t.value=!0,a.value={id:B(),stockId:B(),movementType:"",locationId:"3fa85f64-5717-4562-b3fc-2c963f66afa6",referenceId:"",oldQuantity:0,newQuantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date}},i=async()=>{var s;let r={id:"",stockId:"",movementType:"",locationId:"",referenceId:"",quantity:0,width:0,length:0,height:0,diameter:0,thickness:0,movementDate:new Date,description:""},n=[];(s=c.inventories)==null||s.filter(e=>e.newQuantity!=e.oldQuantity).forEach(async e=>{e.newQuantity<e.oldQuantity?r={id:e.id,stockId:e.stockId,movementType:"OUTPUT",locationId:e.locationId,referenceId:e.referenceId,quantity:e.newQuantity-e.oldQuantity,width:e.width,length:e.length,height:e.height,diameter:e.diameter,thickness:e.thickness,movementDate:e.movementDate,description:"Sortida per inventari"}:e.newQuantity>e.oldQuantity&&(r={id:e.id,stockId:e.stockId,movementType:"INPUT",locationId:e.locationId,referenceId:e.referenceId,quantity:e.newQuantity-e.oldQuantity,width:e.width,length:e.length,height:e.height,diameter:e.diameter,thickness:e.thickness,movementDate:e.movementDate,description:"Entrada per inventari"}),n.push(k.Create(r))});const d=await Promise.all(n);console.log(d),d.filter(e=>e===!0).length===n.length?(u.add({severity:"success",summary:"Inventari creat correctament",life:5e3}),M()):u.add({severity:"error",summary:"Error al crear el moviment d'inventari",life:5e3})};return(r,n)=>{const d=y("Button"),s=y("Column"),e=y("DataTable"),$=y("Dialog");return U(),C(O,null,[o(e,{value:m(c).inventories,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh"},{header:h(()=>[l("div",de,[me,l("div",null,[o(d,{icon:m(Q).PLUS,rounded:"",raised:"",onClick:D},null,8,["icon"]),E("   "),o(d,{icon:m(Q).SAVE,rounded:"",raised:"",onClick:i},null,8,["icon"])])])]),default:h(()=>[o(s,{header:"Producte",style:{width:"28%"}},{body:h(v=>[E(N(_(v.data.referenceId)),1)]),_:1}),o(s,{field:"oldQuantity",header:"Uds.",style:{width:"12%"}}),o(s,{header:"Recompte",style:{width:"12%"}},{body:h(v=>[o(p,{class:"mb-2",label:"",id:"newQuantity",modelValue:v.data.newQuantity,"onUpdate:modelValue":L=>v.data.newQuantity=L},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),o(s,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),o(s,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),o(s,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),o(s,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),o(s,{field:"thickness",header:"Gruix mm",style:{width:"12%"}})]),_:1},8,["value"]),o($,{closable:!0,visible:t.value,"onUpdate:visible":n[0]||(n[0]=v=>t.value=v),modal:!0},{default:h(()=>[o(re,{newMovement:a.value,onSubmit:w},null,8,["newMovement"])]),_:1},8,["visible"])],64)}}});export{be as default};
