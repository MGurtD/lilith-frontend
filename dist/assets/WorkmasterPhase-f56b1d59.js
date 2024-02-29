import{_ as se}from"./FormWorkmasterPhase.vue_vue_type_script_setup_true_lang-cd04fcef.js";import{d as B,x as F,h as b,a as g,m as D,w as _,e as s,i as a,k as r,P as S,C as O,D as L,B as oe,n as M,j as W,r as E,c as R,s as T,y as C,l as P,v as ie,g as ne,u as re,z as de,E as me,o as ue,F as k,G as ce}from"./index-555c6e5a.js";import{g as j}from"./functions-79f2dbc4.js";import{u as A}from"./plantmodel-978ee1cf.js";import{u as G}from"./workmaster-8b6d5b29.js";import{c as z,d as N,F as x,a as pe}from"./form-validator-f8953ae6.js";import{u as q}from"./reference-82dd30df.js";import{_ as fe}from"./DropdownReference.vue_vue_type_script_setup_true_lang-81ba6276.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-dda8c344.js";import"./base.service-fff6fc35.js";import"./reference.service-fdfd63b3.js";const be={class:"flex flex-wrap align-items-center justify-content-between gap-2"},he=s("span",{class:"text-xl text-900 font-bold"},"Pasos de fabricació",-1),ve=["onClick"],_e=B({__name:"TableWorkmasterPhaseDetails",props:{workmasterPhase:{},details:{}},emits:["add","edit","delete"],setup(V,{emit:f}){const h=V,I=F();G();const y=A(),d=e=>{var u;if(!y.machineStatuses)return"";const l=(u=y.machineStatuses)==null?void 0:u.find(m=>e===m.id);return l?l.name:""},c=()=>{const e={id:j(),workMasterPhaseId:h.workmasterPhase.id,estimatedTime:0,isCycleTime:!1,machineStatusId:"",comment:"",order:p()};f("add",e)},p=()=>{let e=10;return h.details?(h.details.length+1)*10:e},o=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||f("edit",e.data)},t=(e,l)=>{I.require({target:e.currentTarget,message:"Está segur que vol eliminar el pas de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{f("delete",l)}})};return(e,l)=>{const u=b("Button"),m=b("Column"),v=b("DataTable");return g(),D(v,{onRowClick:o,value:e.details,tableStyle:"min-width: 100%","sort-field":"order","sort-order":1},{header:_(()=>[s("div",be,[he,a(u,{icon:r(S).PLUS,rounded:"",raised:"",onClick:c},null,8,["icon"])])]),default:_(()=>[a(m,{sortable:"",field:"order",header:"Ordre",style:{width:"10%"}}),a(m,{header:"Estat de màquina",style:{width:"25%"}},{body:_(n=>[O(L(d(n.data.machineStatusId)),1)]),_:1}),a(m,{field:"estimatedTime",header:"Temps (min)",style:{width:"25%"}}),a(m,{header:"Temps de cicle",style:{width:"25%"}},{body:_(n=>[a(oe,{value:n.data.isCycleTime},null,8,["value"])]),_:1}),a(m,{style:{width:"25%"}},{body:_(n=>[s("i",{class:M([r(S).TIMES,"grid_delete_column_button"]),onClick:U=>t(U,n.data)},null,10,ve)]),_:1})]),_:1},8,["value"])}}}),ye={key:0},Ie={class:"four-columns"},we=s("label",{class:"block text-900 mb-2"},"Estat",-1),ke=s("label",{class:"block text-900v mb-1"},"Temps de cicle",-1),ge={class:"mt-3"},Ve=s("label",{class:"block text-900v mb-1"},"Comentari fabricació",-1),Te=s("br",null,null,-1),Ce=B({__name:"FormWorkmasterPhaseDetail",props:{detail:{}},emits:["submit","cancel"],setup(V,{emit:f}){const h=V,I=A(),y=W(),d=z().shape({order:N().required("L'ordre és obligatori").positive("L'ordre ha de ser positiu"),estimatedTime:N().required("El temps estimat és obligatori")}),c=E({result:!1,errors:{}}),p=()=>{const t=new x(d);c.value=t.validate(h.detail)},o=async()=>{if(p(),c.value.result)f("submit",h.detail);else{let t="";Object.entries(c.value.errors).forEach(e=>{t+=`${e[1].map(l=>l)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const l=b("Dropdown"),u=b("Checkbox"),m=b("Textarea"),v=b("Button");return t.detail?(g(),R("form",ye,[s("section",Ie,[s("div",null,[a(C,{type:r(T).NUMERIC,label:"Ordre",modelValue:t.detail.order,"onUpdate:modelValue":e[0]||(e[0]=n=>t.detail.order=n),class:M({"p-invalid":c.value.errors.order})},null,8,["type","modelValue","class"])]),s("div",null,[we,a(l,{modelValue:t.detail.machineStatusId,"onUpdate:modelValue":e[1]||(e[1]=n=>t.detail.machineStatusId=n),editable:"",options:r(I).machineStatuses,optionValue:"id",optionLabel:"description",class:M(["w-full",{"p-invalid":c.value.errors.machineStatusId}])},null,8,["modelValue","options","class"])]),s("div",null,[ke,a(u,{modelValue:t.detail.isCycleTime,"onUpdate:modelValue":e[2]||(e[2]=n=>t.detail.isCycleTime=n),class:"w-full",binary:!0},null,8,["modelValue"])]),s("div",null,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Temps estimat (min)",modelValue:t.detail.estimatedTime,"onUpdate:modelValue":e[3]||(e[3]=n=>t.detail.estimatedTime=n),class:M({"p-invalid":c.value.errors.estimatedTime})},null,8,["type","modelValue","class"])])]),s("div",ge,[Ve,a(m,{class:"w-full",modelValue:t.detail.comment,"onUpdate:modelValue":e[4]||(e[4]=n=>t.detail.comment=n)},null,8,["modelValue"])]),Te,s("div",null,[a(v,{label:"Guardar pas",style:{float:"right"},size:"small",onClick:o})])])):P("",!0)}}}),Ee={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Pe=s("span",{class:"text-xl text-900 font-bold"},"Materials de fabricació",-1),Me=["onClick"],De=B({__name:"TableWorkmasterPhaseBillOfMaterials",props:{workmasterPhase:{},billOfMaterials:{}},emits:["add","edit","delete"],setup(V,{emit:f}){const h=V,I=F(),y=q(),d=t=>{var l;if(!y.references)return"";const e=(l=y.references)==null?void 0:l.find(u=>t===u.id);return e?y.getFullName(e):""},c=()=>{const t={id:j(),workMasterPhaseId:h.workmasterPhase.id,referenceId:"",quantity:0,width:0,diameter:0,height:0,length:0,thickness:0};f("add",t)},p=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||f("edit",t.data)},o=(t,e)=>{I.require({target:t.currentTarget,message:"Está segur que vol eliminar el material de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{f("delete",e)}})};return(t,e)=>{const l=b("Button"),u=b("Column"),m=b("DataTable");return g(),D(m,{onRowClick:p,value:t.billOfMaterials,tableStyle:"min-width: 100%"},{header:_(()=>[s("div",Ee,[Pe,a(l,{icon:r(S).PLUS,rounded:"",raised:"",onClick:c},null,8,["icon"])])]),default:_(()=>[a(u,{header:"Material consum",style:{width:"30%"}},{body:_(v=>[O(L(d(v.data.referenceId)),1)]),_:1}),a(u,{field:"quantity",header:"Consum",style:{width:"15%"}}),a(u,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),a(u,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),a(u,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),a(u,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),a(u,{field:"thickness",header:"Gruix mm",style:{width:"12%"}}),a(u,{style:{width:"10%"}},{body:_(v=>[s("i",{class:M([r(S).TIMES,"grid_delete_column_button"]),onClick:n=>o(n,v.data)},null,10,Me)]),_:1})]),_:1},8,["value"])}}}),Se={key:0},Be={class:"three-columns"},$e={class:"three-columns"},Re={class:"mt-2"},Ue={class:"mt-2"},Ne={class:"mt-2"},Ae=s("br",null,null,-1),qe=B({__name:"FormWorkmasterPhaseBomItem",props:{bomItem:{}},emits:["submit","cancel"],setup(V,{emit:f}){const h=V;q();const I=W(),y=z().shape({referenceId:pe().required("El material de consum és obligatori"),quantity:N().min(1,"La quantitat a consumir ha de ser positiva").required("La quantitat a consumir és obligatoria")}),d=E({result:!1,errors:{}}),c=()=>{const o=new x(y);d.value=o.validate(h.bomItem)},p=async()=>{if(c(),d.value.result)f("submit",h.bomItem);else{let o="";Object.entries(d.value.errors).forEach(t=>{o+=`${t[1].map(e=>e)}.   `}),I.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,t)=>{const e=b("Button");return o.bomItem?(g(),R("form",Se,[s("div",null,[a(fe,{label:"Material",fullName:!0,modelValue:o.bomItem.referenceId,"onUpdate:modelValue":t[0]||(t[0]=l=>o.bomItem.referenceId=l),class:M({"p-invalid":d.value.errors.referenceId})},null,8,["modelValue","class"])]),s("section",Be,[s("div",null,[a(C,{type:r(T).NUMERIC,label:"Quantitat",modelValue:o.bomItem.quantity,"onUpdate:modelValue":t[1]||(t[1]=l=>o.bomItem.quantity=l)},null,8,["type","modelValue"])]),s("div",null,[a(C,{type:r(T).NUMERIC,label:"Amplada (mm)",decimals:2,modelValue:o.bomItem.width,"onUpdate:modelValue":t[2]||(t[2]=l=>o.bomItem.width=l)},null,8,["type","modelValue"])]),s("div",null,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Alçada (mm)",modelValue:o.bomItem.height,"onUpdate:modelValue":t[3]||(t[3]=l=>o.bomItem.height=l)},null,8,["type","modelValue"])])]),s("section",$e,[s("div",Re,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Longitud (mm)",modelValue:o.bomItem.length,"onUpdate:modelValue":t[4]||(t[4]=l=>o.bomItem.length=l)},null,8,["type","modelValue"])]),s("div",Ue,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Diàmetre (mm)",modelValue:o.bomItem.diameter,"onUpdate:modelValue":t[5]||(t[5]=l=>o.bomItem.diameter=l)},null,8,["type","modelValue"])]),s("div",Ne,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Gruix (mm)",modelValue:o.bomItem.thickness,"onUpdate:modelValue":t[6]||(t[6]=l=>o.bomItem.thickness=l)},null,8,["type","modelValue"])])]),Ae,s("div",null,[a(e,{label:"Guardar material",style:{float:"right"},size:"small",onClick:p})])])):P("",!0)}}}),Fe={key:0,class:"main"},Ze=B({__name:"WorkmasterPhase",setup(V){const f=ie();ne();const h=re(),I=q(),y=A(),d=G(),{workmaster:c,workmasterPhase:p}=de(d),o=E(""),t=E(""),e=me({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0});ue(async()=>{o.value=f.params.id,t.value=f.params.phaseid,await l();let i="";i="Ruta de fabricació",c.value&&p.value&&(i=`${i} ${I.getFullName(c.value.reference)} - Fase ${p.value.code}`),h.setMenuItem({icon:S.BUILDING,backButtonVisible:!0,title:i}),I.fetchReferencesByModule("purchase"),y.fetchActiveModel()});const l=async()=>{await d.fetchPhaseById(t.value)},u=async i=>{await d.updatePhase(t.value,i)},m=E(k.CREATE),v=E(void 0),n=E(void 0),U=()=>{v.value=void 0,n.value=void 0},H=i=>{m.value=k.CREATE,v.value=i,e.title="Afegir pas de fabricació",e.visible=!0},Q=i=>{m.value=k.EDIT,v.value=i,e.title="Modificar pas de fabricació",e.visible=!0},J=i=>{d.deletePhaseDetail(i.id)},K=async i=>{let w;m.value===k.CREATE?w=d.createPhaseDetail(i):m.value===k.EDIT&&(w=d.updatePhaseDetail(i.id,i)),await w&&(e.visible=!1)},X=i=>{m.value=k.CREATE,n.value=i,e.title="Afegir material",e.visible=!0},Y=i=>{m.value=k.EDIT,n.value=i,e.title="Modificar material",e.visible=!0},Z=i=>{d.deletePhaseBomItem(i.id)},ee=async i=>{let w;m.value===k.CREATE?w=d.createPhaseBomItem(i):m.value===k.EDIT&&(w=d.updatePhaseBomItem(i.id,i)),await w&&(e.visible=!1)};return(i,w)=>{const $=b("TabPanel"),te=b("TabView"),ae=b("Dialog");return g(),R(ce,null,[s("header",null,[r(c)&&r(p)?(g(),D(se,{key:0,workmaster:r(c),phase:r(p),onSubmit:u},null,8,["workmaster","phase"])):P("",!0)]),r(p)?(g(),R("main",Fe,[a(te,null,{default:_(()=>[a($,{header:"Pasos"},{default:_(()=>[a(_e,{workmasterPhase:r(p),details:r(p).details,onAdd:H,onEdit:Q,onDelete:J},null,8,["workmasterPhase","details"])]),_:1}),a($,{header:"Materials"},{default:_(()=>[a(De,{workmasterPhase:r(p),billOfMaterials:r(p).billOfMaterials,onAdd:X,onEdit:Y,onDelete:Z},null,8,["workmasterPhase","billOfMaterials"])]),_:1})]),_:1}),a(ae,{visible:e.visible,"onUpdate:visible":w[0]||(w[0]=le=>e.visible=le),header:e.title,closable:e.closable,modal:e.modal,onHide:U},{default:_(()=>[v.value?(g(),D(Ce,{key:0,detail:v.value,onSubmit:K},null,8,["detail"])):P("",!0),n.value?(g(),D(qe,{key:1,bomItem:n.value,onSubmit:ee},null,8,["bomItem"])):P("",!0)]),_:1},8,["visible","header","closable","modal"])])):P("",!0)],64)}}});export{Ze as default};
