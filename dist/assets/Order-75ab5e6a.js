import{d as N,E as J,j as A,C as K,r as g,h as I,a as C,c as k,i as a,k as i,e as r,s as B,z as P,n as L,l as U,D as ce,p as me,b as pe,f as H,g as W,v as X,o as Y,S as fe,m as Z,w as v,Q as ve,H as E,G as $,I as x,R as j,P as Q,u as _e,x as be,K as ye,F as T,J as G}from"./index-d4f01faf.js";import{u as M}from"./order-9d9c007c.js";import{u as ee}from"./suppliers-0ea5d8a0.js";import{_ as te}from"./DropdownLifecycle.vue_vue_type_script_setup_true_lang-728289a5.js";import{c as ae,a as O,F as se,d as he}from"./form-validator-e18d88f5.js";import{L as De}from"./LinkReference-8502fbe8.js";import{_ as we}from"./DropdownReference.vue_vue_type_script_setup_true_lang-9e7acd0e.js";import{R as Ie}from"./index-7cbe1881.js";import{u as Ve}from"./reference-1f2c96f9.js";import{u as Ce}from"./lifecycle-1f6a3992.js";import{u as Re}from"./referenceType-5e3c78d5.js";import"./index-b7ccdf16.js";import"./suppliers.service-adc4e955.js";const F=D=>(me("data-v-0624241f"),D=D(),pe(),D),Se=F(()=>r("br",null,null,-1)),ge={key:0},Ee={class:"three-columns"},xe={class:"mt-1"},ke={class:"mt-1"},$e=F(()=>r("label",{class:"block text-900 mb-2"},"Exercici",-1)),Te={class:"mt-1"},Oe=F(()=>r("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),Ne={class:"three-columns"},Ue={class:"mt-1"},Fe={class:"mt-1"},qe=F(()=>r("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),Be=N({__name:"FormOrder",emits:["submit","cancel"],setup(D,{expose:w,emit:b}){const R=M(),S=ee(),p=J(),y=A(),{order:o}=K(R),l=ae().shape({supplierId:O().required("El client es obligatori"),statusId:O().required("L'estat es obligatori"),exerciseId:O().required("L'exercici es obligatori")}),d=g({result:!1,errors:{}}),h=()=>{const c=new se(l);d.value=c.validate(o.value)},n=async()=>{if(h(),d.value.result)o.value.date=ce(o.value.date),b("submit",o.value);else{let c="";Object.entries(d.value.errors).forEach(s=>{c+=`${s[1].map(m=>m)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:c,life:5e3})}};return w({submitForm:n}),(c,s)=>{const m=I("Button"),e=I("Dropdown"),_=I("Calendar");return C(),k("div",null,[a(m,{label:"Guardar",size:"small",class:"grid_add_row_button",onClick:n}),Se,i(o)?(C(),k("form",ge,[r("section",Ee,[r("div",xe,[a(P,{type:i(B).TEXT,label:"Número",id:"number",modelValue:i(o).number,"onUpdate:modelValue":s[0]||(s[0]=t=>i(o).number=t),disabled:""},null,8,["type","modelValue"])]),r("div",ke,[$e,a(e,{modelValue:i(o).exerciseId,"onUpdate:modelValue":s[1]||(s[1]=t=>i(o).exerciseId=t),editable:"",options:i(p).exercises,optionValue:"id",optionLabel:"name",class:L(["w-full",{"p-invalid":d.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),r("div",Te,[Oe,a(_,{modelValue:i(o).date,"onUpdate:modelValue":s[2]||(s[2]=t=>i(o).date=t),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),r("section",Ne,[r("div",Ue,[a(te,{label:"Estat",name:"PurchaseOrder",modelValue:i(o).statusId,"onUpdate:modelValue":s[3]||(s[3]=t=>i(o).statusId=t)},null,8,["modelValue"])]),r("div",Fe,[qe,a(e,{modelValue:i(o).supplierId,"onUpdate:modelValue":s[4]||(s[4]=t=>i(o).supplierId=t),editable:"",options:i(S).suppliers,optionValue:"id",optionLabel:"comercialName",class:L(["w-full",{"p-invalid":d.value.errors.customerId}])},null,8,["modelValue","options","class"])])])])):U("",!0)])}}});const Pe=H(Be,[["__scopeId","data-v-0624241f"]]),Le=["onClick"],Qe={class:"expanded-details"},Ae=["onClick"],Me=N({__name:"TableOrderDetails",props:{details:{}},emits:["edit","delete"],setup(D,{emit:w}){const b=D,R=W(),S=X(),p=M(),y=g(void 0),o=g({}),l=g([]);Y(async()=>{var s;await p.getReceptions(S.params.id),p.receptions&&(l.value=((s=b.details)==null?void 0:s.map(m=>{var e;return{...m,receptions:(e=p.receptions)==null?void 0:e.filter(_=>_.purchaseOrderDetailId===m.id)}}))||[],y.value=await fe.Lifecycle.getByName("PurchaseOrderDetail"))});const d=s=>{if(!y.value)return"";const m=y.value.statuses.find(e=>e.id===s);return m?m.name:""},h=s=>{try{s.originalEvent.target.className.includes("grid_delete_column_button")||w("edit",s.data)}catch{}},n=(s,m)=>{w("delete",m)},c=s=>{const m=`/receipts/${s}`;R.push(m)};return(s,m)=>{const e=I("Column"),_=I("DataTable");return C(),Z(_,{onRowClick:h,value:l.value,tableStyle:"min-width: 100%",class:"p-datatable-sm","sort-mode":"single","sort-field":"reference.code","sort-order":1,dataKey:"id",expandedRows:o.value,"onUpdate:expandedRows":m[0]||(m[0]=t=>o.value=t)},{header:v(()=>[ve(s.$slots,"header",{},void 0,!0)]),expansion:v(({data:t})=>[r("div",Qe,[a(_,{value:t.receptions},{default:v(()=>[a(e,{field:"receiptDetail.receipt.number",header:"Albarà"},{body:v(({data:V})=>[r("span",{class:"link",onClick:z=>c(V.receiptDetail.receipt.id)},E(V.receiptDetail.receipt.number),9,Ae)]),_:2},1024),a(e,{field:"quantity",header:"Quantitat"}),a(e,{field:"createdOn",header:"Data"},{body:v(({data:V})=>[$(E(i(x)(V.createdOn)),1)]),_:2},1024),a(e,{field:"user",header:"Usuari"})]),_:2},1032,["value"])])]),default:v(()=>[a(e,{expander:"",style:{width:"2%"}}),a(e,{field:"quantity",header:"Quantitat",style:{width:"5%"}}),a(e,{field:"receivedQuantity",header:"Q. Rebuda",style:{width:"6%"}}),a(e,{field:"reference.code",sortable:"",header:"Material",style:{width:"40%"}},{body:v(({data:t})=>[a(De,{id:t.referenceId,category:t.reference.categoryName,fullName:!0},null,8,["id","category"])]),_:1}),a(e,{field:"statusId",header:"Estat",style:{width:"7.5%"}},{body:v(({data:t})=>[$(E(d(t.statusId)),1)]),_:1}),a(e,{field:"expectedReceiptDate",header:"Data Recepció",style:{width:"7.5%"}},{body:v(({data:t})=>[$(E(i(x)(t.expectedReceiptDate)),1)]),_:1}),a(e,{field:"unitPrice",header:"Preu Un.",style:{width:"5%"}},{body:v(({data:t})=>[$(E(i(j)(t.unitPrice)),1)]),_:1}),a(e,{field:"amount",header:"Preu",style:{width:"5%"}},{body:v(({data:t})=>[$(E(i(j)(t.amount)),1)]),_:1}),a(e,{style:{width:"5%"}},{body:v(({data:t})=>[t.receivedQuantity===0?(C(),k("i",{key:0,class:L([i(Q).TIMES,"grid_delete_column_button"]),onClick:V=>n(V,t)},null,10,Le)):U("",!0)]),_:1})]),_:3},8,["value","expandedRows"])}}});const ze=H(Me,[["__scopeId","data-v-201830b6"]]),je={key:0},Ge={class:"three-columns"},Je=r("label",{class:"block text-900 mb-2"},"Data prevista",-1),Ke={class:"three-columns mt-2"},He=N({__name:"FormOrderDetail",props:{detail:{}},emits:["submit","cancel"],setup(D,{emit:w}){const b=D,R=A(),S=ae().shape({quantity:he().min(1).required("La quantitat ha de ser superior a 1"),referenceId:O().required("La referencia és obligatoria")}),p=g({result:!1,errors:{}}),y=()=>{const l=new se(S);p.value=l.validate(b.detail)},o=async()=>{if(y(),p.value.result)w("submit",b.detail);else{let l="";Object.entries(p.value.errors).forEach(d=>{l+=`${d[1].map(h=>h)}.   `}),R.add({severity:"warn",summary:"Formulari inválid",detail:l,life:5e3})}};return(l,d)=>{const h=I("Calendar"),n=I("Button");return l.detail?(C(),k("form",je,[r("section",Ge,[r("div",null,[a(we,{label:"Material",modelValue:l.detail.referenceId,"onUpdate:modelValue":d[0]||(d[0]=c=>l.detail.referenceId=c),fullName:!0,disabled:l.detail.receivedQuantity>0},null,8,["modelValue","disabled"])]),r("div",null,[a(te,{label:"Estat",name:"PurchaseOrderDetail",modelValue:l.detail.statusId,"onUpdate:modelValue":d[1]||(d[1]=c=>l.detail.statusId=c)},null,8,["modelValue"])]),r("div",null,[Je,a(h,{label:"Data prevista",modelValue:l.detail.expectedReceiptDate,"onUpdate:modelValue":d[2]||(d[2]=c=>l.detail.expectedReceiptDate=c),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),r("section",Ke,[r("div",null,[a(P,{disabled:l.detail.receivedQuantity>0,type:i(B).NUMERIC,label:"Quantitat",modelValue:l.detail.quantity,"onUpdate:modelValue":d[3]||(d[3]=c=>l.detail.quantity=c)},null,8,["disabled","type","modelValue"])]),r("div",null,[a(P,{type:i(B).CURRENCY,label:"Preu",modelValue:l.detail.amount,"onUpdate:modelValue":d[4]||(d[4]=c=>l.detail.amount=c),disabled:l.detail.receivedQuantity>0},null,8,["type","modelValue","disabled"])])]),a(n,{label:"Crear",onClick:o,style:{float:"right"},size:"small",class:"mt-2"})])):U("",!0)}}}),We={key:0},Xe=r("br",null,null,-1),Ye={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ze=r("span",{class:"text-xl text-900 font-bold"},"Detall de la comanda",-1),et={key:1},ft=N({__name:"Order",setup(D){const w=W(),b=X(),R=_e(),S=be(),p=Ve(),y=Re(),o=M(),l=ee(),d=J(),h=Ce(),{order:n}=K(o),c=async()=>{var u;await o.fetchOne(b.params.id),h.lifecycle||h.fetchOneByName("PurchaseOrder"),d.exercises||d.fetchActive(),l.suppliers||l.fetchSuppliers(),y.referenceTypes||y.fetchActive(),(!p.references||p.module!=="purchase")&&p.fetchReferencesByModule("purchase"),n.value&&(n.value.date=x(n.value.date)),R.setMenuItem({icon:Q.BUILDING,title:`Comanda de compra ${(u=n.value)==null?void 0:u.number}`,backButtonVisible:!0})};Y(async()=>{await c()});const s=A(),m=async()=>{let u=!1,f="";n.value&&(u=await o.update(n.value.id,n.value),f="Comanda actualizada correctament",u&&(s.add({severity:"success",summary:f,life:5e3}),w.back()))},e=ye({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0}),_=g(T.CREATE),t=g({}),V=()=>{_.value=T.CREATE,t.value={id:G(),purchaseOrderId:n.value.id,amount:0,unitPrice:0,quantity:0,receivedQuantity:0,referenceId:"",statusId:"",expectedReceiptDate:null,workOrderPhaseId:null,disabled:!1},e.title="Crear línia",e.visible=!0},z=u=>{_.value=T.EDIT,t.value=u,p.setNewReference(G(),Ie.MATERIAL),e.title="Modificar línia",e.visible=!0},oe=async u=>{_.value===T.CREATE?await le(u):_.value===T.EDIT&&await ie(u),e.visible=!1,w.push({path:b.path,query:b.query})},le=async u=>{const f=await o.createDetail(u);n.value.date=x(n.value.date),f.result||q(f)},ie=async u=>{const f=await o.updateDetail(u.id,u);n.value.date=x(n.value.date),f.result||q(f)},re=async u=>{S.require({message:"Está segur que vols la línia?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{const f=await o.deleteDetail(u.id);n.value.date=x(n.value.date),f.result||q(f)}})},q=u=>{s.add({severity:"error",summary:u.errors[0],life:1e4,closable:!0})};return(u,f)=>{const ne=I("Button"),de=I("Dialog");return i(n)?(C(),k("main",We,[a(Pe,{onSubmit:m}),Xe,i(n).details?(C(),Z(ze,{key:0,details:i(n).details,onEdit:z,onDelete:re},{header:v(()=>[r("div",Ye,[Ze,r("div",null,[a(ne,{size:"small",icon:i(Q).PLUS,rounded:"",onClick:V},null,8,["icon"])])])]),_:1},8,["details"])):U("",!0),a(de,{visible:e.visible,"onUpdate:visible":f[0]||(f[0]=ue=>e.visible=ue),header:e.title,closable:e.closable,modal:e.modal},{default:v(()=>[a(He,{detail:t.value,onSubmit:oe},null,8,["detail"])]),_:1},8,["visible","header","closable","modal"])])):(C(),k("main",et,"Carregant comanda ..."))}}});export{ft as default};
