import{_ as C}from"./DropdownReference.vue_vue_type_script_setup_true_lang-83dec806.js";import{d as L,g as O,u as P,j as $,x as j,r as q,H as G,E as k,o as Q,P as p,h as c,c as W,i as a,w as n,G as z,a as Y,e as t,k as s,C as J,D as h,n as g}from"./index-69c3f293.js";import{u as K}from"./workmaster-8c728189.js";import{u as X}from"./reference-4ad8a4b8.js";import{g as Z}from"./functions-4d7ada1d.js";import"./index-b0fd6b10.js";import"./base.service-330045d1.js";import"./reference.service-7103735d.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";const ee={class:"flex flex-wrap align-items-center justify-content-between gap-2"},te={class:"datatable-filter"},oe={class:"filter-field"},le=t("label",{class:"block text-900 mb-2"},"Referència",-1),ae={class:"datatable-buttons"},re=["onClick"],se=["onClick"],ne=t("br",null,null,-1),ie=t("section",{class:"two-columns"},[t("div",null,[t("h3",null,"Origen")]),t("div",null,[t("h3",null,"Destí")])],-1),ce={class:"two-columns"},ke=L({__name:"Workmasters",setup(de){const y=O(),I=P(),b=$(),T=j(),e=K(),_=X(),d=q({referenceId:void 0}),B=()=>{d.value.referenceId=void 0},V=G(()=>e.workmasters?d.value.referenceId?e.workmasters.filter(r=>r.referenceId===d.value.referenceId):e.workmasters:[]),i=k({visible:!1,title:"Crear ruta",closable:!0,position:"center",modal:!0}),u=k({visible:!1,title:"Copiar ruta",closable:!0,position:"center",modal:!0});Q(async()=>{await e.fetchAll(),await _.fetchReferencesByModule("sales"),I.setMenuItem({icon:p.CALENDAR,title:"Gestió de rutes de fabricació"})});const N=()=>{const r=Z();e.setNew(r),i.visible=!0},D=(r,l)=>{e.workmasterToCopy={workmasterId:l.id,workmaster:l,referenceId:null,referenceCode:""},u.visible=!0},S=async()=>{e.workmasterToCopy.referenceId===""&&(e.workmasterToCopy.referenceId=null);const r=await e.copy(e.workmasterToCopy);await e.fetchAll(),u.visible=!1,r?b.add({severity:"success",summary:"Copiada",life:3e3}):b.add({severity:"error",summary:"Hi ha hagut un error en el proces",life:3e3})},R=()=>{e.workmasterToCopy.referenceCode=""},x=()=>{e.workmasterToCopy.referenceId=""},E=r=>{!r.originalEvent.target.className.includes("grid_delete_column_button")&&!r.originalEvent.target.className.includes("grid_copy_column_button")&&y.push({path:`/workmaster/${r.data.id}`})},U=async()=>{if(!e.workmaster)return;await e.create(e.workmaster)&&y.push({path:`/workmaster/${e.workmaster.id}`})},A=(r,l)=>{T.require({target:r.currentTarget,message:`Está segur que vol eliminar la ruta ${l.reference.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await e.delete(l.id)&&(b.add({severity:"success",summary:"Eliminada",life:3e3}),await e.fetchAll())}})};return(r,l)=>{const m=c("Button"),f=c("Column"),F=c("BooleanColumn"),M=c("DataTable"),w=c("Dialog"),H=c("BaseInput");return Y(),W(z,null,[a(M,{value:V.value,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh","sort-field":"reference.code","sort-order":1,onRowClick:E},{header:n(()=>[t("div",ee,[t("div",te,[t("div",oe,[le,a(C,{label:"",modelValue:d.value.referenceId,"onUpdate:modelValue":l[0]||(l[0]=o=>d.value.referenceId=o),fullName:!0},null,8,["modelValue"])])]),t("div",ae,[a(m,{class:"datatable-button mr-2",icon:s(p).FILTER_SLASH,rounded:"",raised:"",onClick:B},null,8,["icon"]),a(m,{icon:s(p).PLUS,rounded:"",raised:"",onClick:N},null,8,["icon"])])])]),default:n(()=>[a(f,{field:"reference.code",sortable:"",header:"Referencia",style:{width:"50%"}},{body:n(o=>[J(h(s(_).getFullName(o.data.reference)),1)]),_:1}),a(f,{field:"baseQuantity",header:"Quantitat Base",style:{width:"25%"}}),a(f,{header:"Desactivada",style:{width:"25%"}},{body:n(o=>[a(F,{value:o.data.disabled},null,8,["value"])]),_:1}),a(f,null,{body:n(o=>[t("i",{class:g([s(p).COPY,"grid_copy_column_button"]),onClick:v=>D(v,o.data)},null,10,re)]),_:1}),a(f,null,{body:n(o=>[t("i",{class:g([s(p).TIMES,"grid_delete_column_button"]),onClick:v=>A(v,o.data)},null,10,se)]),_:1})]),_:1},8,["value"]),a(w,{visible:i.visible,"onUpdate:visible":l[2]||(l[2]=o=>i.visible=o),header:i.title,closable:i.closable,modal:i.modal},{default:n(()=>[t("div",null,[a(C,{label:"Referència",modelValue:s(e).workmaster.referenceId,"onUpdate:modelValue":l[1]||(l[1]=o=>s(e).workmaster.referenceId=o),fullName:!0},null,8,["modelValue"])]),ne,t("div",null,[a(m,{label:"Crear",style:{float:"right"},onClick:U})])]),_:1},8,["visible","header","closable","modal"]),a(w,{visible:u.visible,"onUpdate:visible":l[5]||(l[5]=o=>u.visible=o),header:u.title,closable:!0,modal:!0},{default:n(()=>[ie,t("section",ce,[t("div",null,[t("p",null,h(s(_).getFullNameById(s(e).workmasterToCopy.workmaster.referenceId)),1)]),t("div",null,[a(C,{label:"Referència existent:",modelValue:s(e).workmasterToCopy.referenceId,"onUpdate:modelValue":l[3]||(l[3]=o=>s(e).workmasterToCopy.referenceId=o),fullName:!0,onChange:R},null,8,["modelValue"]),a(H,{class:"mb-2",label:"Nou codi:",id:"referenceCode",modelValue:s(e).workmasterToCopy.referenceCode,"onUpdate:modelValue":l[4]||(l[4]=o=>s(e).workmasterToCopy.referenceCode=o),onChange:x},null,8,["modelValue"])])]),t("div",null,[a(m,{label:"Copiar",style:{float:"right"},onClick:S})])]),_:1},8,["visible","header"])],64)}}});export{ke as default};
