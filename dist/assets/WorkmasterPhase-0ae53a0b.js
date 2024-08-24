import{_ as oe}from"./FormWorkmasterPhase.vue_vue_type_script_setup_true_lang-fcb7f576.js";import{d as $,x as F,h,a as V,m as S,w as v,e as i,i as l,k as d,P as B,G as L,H as W,B as ie,n as M,J as j,j as q,r as E,c as R,s as g,z as T,l as D,v as ne,u as re,C as de,K as me,o as ue,F as k,L as ce}from"./index-709c40c8.js";import{u as A}from"./plantmodel-06593ba6.js";import{u as z}from"./workmaster-699a1a15.js";import{c as G,d as N,F as H,a as pe}from"./form-validator-6d089293.js";import{u as O}from"./reference-ced38a82.js";import{_ as he}from"./DropdownReference.vue_vue_type_script_setup_true_lang-e1a79f67.js";import"./index-7cbe1881.js";import"./index-5492b314.js";const fe={class:"flex flex-wrap align-items-center justify-content-between gap-2"},be=i("span",{class:"text-xl text-900 font-bold"},"Pasos de fabricació",-1),ve=["onClick"],ye=$({__name:"TableWorkmasterPhaseDetails",props:{workmasterPhase:{},details:{}},emits:["add","edit","delete"],setup(P,{emit:c}){const f=P,I=F();z();const b=A(),y=a=>{var m;if(!b.machineStatuses)return"";const t=(m=b.machineStatuses)==null?void 0:m.find(p=>a===p.id);return t?t.name:""},o=()=>{const a={id:j(),workMasterPhaseId:f.workmasterPhase.id,estimatedTime:0,estimatedOperatorTime:0,isCycleTime:!1,machineStatusId:"",comment:"",order:w()};c("add",a)},w=()=>{let a=10;return f.details?(f.details.length+1)*10:a},s=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||c("edit",a.data)},e=(a,t)=>{I.require({target:a.currentTarget,message:"Está segur que vol eliminar el pas de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{c("delete",t)}})};return(a,t)=>{const m=h("Button"),p=h("Column"),u=h("DataTable");return V(),S(u,{onRowClick:s,value:a.details,tableStyle:"min-width: 100%","sort-field":"order","sort-order":1},{header:v(()=>[i("div",fe,[be,l(m,{icon:d(B).PLUS,rounded:"",raised:"",onClick:o},null,8,["icon"])])]),default:v(()=>[l(p,{sortable:"",field:"order",header:"Ordre",style:{width:"10%"}}),l(p,{header:"Estat de màquina",style:{width:"25%"}},{body:v(r=>[L(W(y(r.data.machineStatusId)),1)]),_:1}),l(p,{header:"Temps de cicle",style:{width:"25%"}},{body:v(r=>[l(ie,{value:r.data.isCycleTime},null,8,["value"])]),_:1}),l(p,{field:"estimatedTime",header:"Temps màquina (min)",style:{width:"25%"}}),l(p,{field:"estimatedOperatorTime",header:"Temps operari (min)",style:{width:"25%"}}),l(p,{style:{width:"25%"}},{body:v(r=>[i("i",{class:M([d(B).TIMES,"grid_delete_column_button"]),onClick:C=>e(C,r.data)},null,10,ve)]),_:1})]),_:1},8,["value"])}}}),we={key:0},_e={class:"three-columns"},Ie=i("label",{class:"block text-900 mb-2"},"Estat",-1),ke=i("label",{class:"block text-900v mb-1"},"Temps de cicle",-1),ge={class:"three-columns mt-2"},Te={class:"mt-2"},Ve=i("label",{class:"block text-900v mb-1"},"Comentari fabricació",-1),Pe=i("br",null,null,-1),Ce=$({__name:"FormWorkmasterPhaseDetail",props:{detail:{}},emits:["submit","cancel"],setup(P,{emit:c}){const f=P,I=A(),b=q(),y=G().shape({order:N().required("L'ordre és obligatori").positive("L'ordre ha de ser positiu"),estimatedTime:N().required("El temps estimat és obligatori")}),o=E({result:!1,errors:{}}),w=()=>{const e=new H(y);o.value=e.validate(f.detail)},s=async()=>{if(w(),o.value.result)c("submit",f.detail);else{let e="";Object.entries(o.value.errors).forEach(a=>{e+=`${a[1].map(t=>t)}.   `}),b.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,a)=>{const t=h("Dropdown"),m=h("Checkbox"),p=h("Textarea"),u=h("Button");return e.detail?(V(),R("form",we,[i("section",_e,[i("div",null,[l(T,{type:d(g).NUMERIC,label:"Ordre",modelValue:e.detail.order,"onUpdate:modelValue":a[0]||(a[0]=r=>e.detail.order=r),class:M({"p-invalid":o.value.errors.order})},null,8,["type","modelValue","class"])]),i("div",null,[Ie,l(t,{modelValue:e.detail.machineStatusId,"onUpdate:modelValue":a[1]||(a[1]=r=>e.detail.machineStatusId=r),editable:"",options:d(I).machineStatuses,optionValue:"id",optionLabel:"description",class:M(["w-full",{"p-invalid":o.value.errors.machineStatusId}])},null,8,["modelValue","options","class"])]),i("div",null,[ke,l(m,{modelValue:e.detail.isCycleTime,"onUpdate:modelValue":a[2]||(a[2]=r=>e.detail.isCycleTime=r),class:"w-full",binary:!0},null,8,["modelValue"])])]),i("section",ge,[i("div",null,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Temps màquina (min)",modelValue:e.detail.estimatedTime,"onUpdate:modelValue":a[3]||(a[3]=r=>e.detail.estimatedTime=r),class:M({"p-invalid":o.value.errors.estimatedTime})},null,8,["type","modelValue","class"])]),i("div",null,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Temps operari (min)",modelValue:e.detail.estimatedOperatorTime,"onUpdate:modelValue":a[4]||(a[4]=r=>e.detail.estimatedOperatorTime=r),class:M({"p-invalid":o.value.errors.estimatedTime})},null,8,["type","modelValue","class"])])]),i("div",Te,[Ve,l(p,{class:"w-full",modelValue:e.detail.comment,"onUpdate:modelValue":a[5]||(a[5]=r=>e.detail.comment=r)},null,8,["modelValue"])]),Pe,i("div",null,[l(u,{label:"Guardar pas",style:{float:"right"},size:"small",onClick:s})])])):D("",!0)}}}),Ee={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Me=i("span",{class:"text-xl text-900 font-bold"},"Materials de fabricació",-1),De=["onClick"],Se=$({__name:"TableWorkmasterPhaseBillOfMaterials",props:{workmasterPhase:{},billOfMaterials:{}},emits:["add","edit","delete"],setup(P,{emit:c}){const f=P,I=F(),b=O(),y=e=>{var t;if(!b.references)return"";const a=(t=b.references)==null?void 0:t.find(m=>e===m.id);return a?b.getFullName(a):""},o=()=>{const e={id:j(),workMasterPhaseId:f.workmasterPhase.id,referenceId:"",quantity:0,width:0,diameter:0,height:0,length:0,thickness:0};c("add",e)},w=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||c("edit",e.data)},s=(e,a)=>{I.require({target:e.currentTarget,message:"Está segur que vol eliminar el material de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{c("delete",a)}})};return(e,a)=>{const t=h("Button"),m=h("Column"),p=h("DataTable");return V(),S(p,{onRowClick:w,value:e.billOfMaterials,tableStyle:"min-width: 100%"},{header:v(()=>[i("div",Ee,[Me,l(t,{icon:d(B).PLUS,rounded:"",raised:"",onClick:o},null,8,["icon"])])]),default:v(()=>[l(m,{header:"Material consum",style:{width:"30%"}},{body:v(u=>[L(W(y(u.data.referenceId)),1)]),_:1}),l(m,{field:"quantity",header:"Consum",style:{width:"15%"}}),l(m,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),l(m,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),l(m,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),l(m,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),l(m,{field:"thickness",header:"Gruix mm",style:{width:"12%"}}),l(m,{style:{width:"10%"}},{body:v(u=>[i("i",{class:M([d(B).TIMES,"grid_delete_column_button"]),onClick:r=>s(r,u.data)},null,10,De)]),_:1})]),_:1},8,["value"])}}}),Be={key:0},$e={class:"three-columns"},Ue={class:"three-columns"},Re={class:"mt-2"},Ne={class:"mt-2"},qe={class:"mt-2"},Ae=i("br",null,null,-1),Oe=$({__name:"FormWorkmasterPhaseBomItem",props:{bomItem:{}},emits:["submit","cancel"],setup(P,{emit:c}){const f=P;O();const I=q(),b=G().shape({referenceId:pe().required("El material de consum és obligatori"),quantity:N().min(1,"La quantitat a consumir ha de ser positiva").required("La quantitat a consumir és obligatoria")}),y=E({result:!1,errors:{}}),o=()=>{const s=new H(b);y.value=s.validate(f.bomItem)},w=async()=>{if(o(),y.value.result)c("submit",f.bomItem);else{let s="";Object.entries(y.value.errors).forEach(e=>{s+=`${e[1].map(a=>a)}.   `}),I.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,e)=>{const a=h("Button");return s.bomItem?(V(),R("form",Be,[i("div",null,[l(he,{label:"Material",fullName:!0,modelValue:s.bomItem.referenceId,"onUpdate:modelValue":e[0]||(e[0]=t=>s.bomItem.referenceId=t),class:M({"p-invalid":y.value.errors.referenceId})},null,8,["modelValue","class"])]),i("section",$e,[i("div",null,[l(T,{type:d(g).NUMERIC,label:"Quantitat",modelValue:s.bomItem.quantity,"onUpdate:modelValue":e[1]||(e[1]=t=>s.bomItem.quantity=t)},null,8,["type","modelValue"])]),i("div",null,[l(T,{type:d(g).NUMERIC,label:"Amplada (mm)",decimals:2,modelValue:s.bomItem.width,"onUpdate:modelValue":e[2]||(e[2]=t=>s.bomItem.width=t)},null,8,["type","modelValue"])]),i("div",null,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Alçada (mm)",modelValue:s.bomItem.height,"onUpdate:modelValue":e[3]||(e[3]=t=>s.bomItem.height=t)},null,8,["type","modelValue"])])]),i("section",Ue,[i("div",Re,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Longitud (mm)",modelValue:s.bomItem.length,"onUpdate:modelValue":e[4]||(e[4]=t=>s.bomItem.length=t)},null,8,["type","modelValue"])]),i("div",Ne,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Diàmetre (mm)",modelValue:s.bomItem.diameter,"onUpdate:modelValue":e[5]||(e[5]=t=>s.bomItem.diameter=t)},null,8,["type","modelValue"])]),i("div",qe,[l(T,{type:d(g).NUMERIC,decimals:2,label:"Gruix (mm)",modelValue:s.bomItem.thickness,"onUpdate:modelValue":e[6]||(e[6]=t=>s.bomItem.thickness=t)},null,8,["type","modelValue"])])]),Ae,i("div",null,[l(a,{label:"Guardar material",style:{float:"right"},size:"small",onClick:w})])])):D("",!0)}}}),Fe={key:0,class:"main"},xe=$({__name:"WorkmasterPhase",setup(P){const c=ne(),f=q(),I=re(),b=O(),y=A(),o=z(),{workmaster:w,workmasterPhase:s}=de(o),e=E(""),a=E(""),t=me({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0});ue(async()=>{e.value=c.params.id,a.value=c.params.phaseid,await m();let n="";n="Ruta de fabricació",w.value&&s.value&&(n=`${n} ${b.getFullName(w.value.reference)} - Fase ${s.value.code}`),I.setMenuItem({icon:B.BUILDING,backButtonVisible:!0,title:n}),b.fetchReferencesByModule("purchase"),y.fetchActiveModel()});const m=async()=>{await o.fetchPhaseById(a.value)},p=async n=>{await o.updatePhase(a.value,n)&&f.add({severity:"success",summary:"Fase actualitzada",detail:`La fase ${n.code} ha estat actualitzada correctament`,life:1e4})},u=E(k.CREATE),r=E(void 0),C=E(void 0),J=()=>{r.value=void 0,C.value=void 0},K=n=>{u.value=k.CREATE,r.value=n,t.title="Afegir pas de fabricació",t.visible=!0},Q=n=>{u.value=k.EDIT,r.value=n,t.title="Modificar pas de fabricació",t.visible=!0},x=async n=>{await o.updatePhase(o.workmasterPhase.id,o.workmasterPhase),await o.deletePhaseDetail(n.id)},X=async n=>{let _;u.value===k.CREATE?_=o.createPhaseDetail(n):u.value===k.EDIT&&(_=o.updatePhaseDetail(n.id,n)),await o.updatePhase(o.workmasterPhase.id,o.workmasterPhase),await _&&(t.visible=!1)},Y=n=>{u.value=k.CREATE,C.value=n,t.title="Afegir material",t.visible=!0},Z=n=>{u.value=k.EDIT,C.value=n,t.title="Modificar material",t.visible=!0},ee=async n=>{await o.updatePhase(o.workmasterPhase.id,o.workmasterPhase),await o.deletePhaseBomItem(n.id)},te=async n=>{let _;u.value===k.CREATE?_=o.createPhaseBomItem(n):u.value===k.EDIT&&(_=o.updatePhaseBomItem(n.id,n)),await o.updatePhase(o.workmasterPhase.id,o.workmasterPhase),await _&&(t.visible=!1)};return(n,_)=>{const U=h("TabPanel"),ae=h("TabView"),le=h("Dialog");return V(),R(ce,null,[i("header",null,[d(w)&&d(s)?(V(),S(oe,{key:0,workmaster:d(w),phase:d(s),onSubmit:p},null,8,["workmaster","phase"])):D("",!0)]),d(s)?(V(),R("main",Fe,[l(ae,null,{default:v(()=>[l(U,{header:"Pasos"},{default:v(()=>[l(ye,{workmasterPhase:d(s),details:d(s).details,onAdd:K,onEdit:Q,onDelete:x},null,8,["workmasterPhase","details"])]),_:1}),l(U,{header:"Materials"},{default:v(()=>[l(Se,{workmasterPhase:d(s),billOfMaterials:d(s).billOfMaterials,onAdd:Y,onEdit:Z,onDelete:ee},null,8,["workmasterPhase","billOfMaterials"])]),_:1})]),_:1}),l(le,{visible:t.visible,"onUpdate:visible":_[0]||(_[0]=se=>t.visible=se),header:t.title,closable:t.closable,modal:t.modal,onHide:J},{default:v(()=>[r.value?(V(),S(Ce,{key:0,detail:r.value,onSubmit:X},null,8,["detail"])):D("",!0),C.value?(V(),S(Oe,{key:1,bomItem:C.value,onSubmit:te},null,8,["bomItem"])):D("",!0)]),_:1},8,["visible","header","closable","modal"])])):D("",!0)],64)}}});export{xe as default};