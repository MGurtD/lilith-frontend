import{a as le}from"./FormWorkorderPhase.vue_vue_type_script_setup_true_lang-d984c55c.js";import{d as B,x as O,h as b,a as g,m as S,w as _,e as o,i as a,k as r,P as M,C as q,D as F,B as oe,n as D,j as L,r as E,c as R,s as T,y as C,l as P,v as se,g as ie,u as ne,z as re,E as de,o as me,F as k,G as ue}from"./index-19723412.js";import{g as W}from"./functions-79f2dbc4.js";import{u as N}from"./plantmodel-1a358cab.js";import{u as ce}from"./workmaster-5a5400db.js";import{c as j,d as A,F as G,a as pe}from"./form-validator-f8953ae6.js";import{u as z}from"./reference-9dcfccff.js";import{_ as fe}from"./DropdownReference.vue_vue_type_script_setup_true_lang-d94355dd.js";import{u as be}from"./workorder-76074e4e.js";import"./lifecycle-ad25beff.js";import"./index-524ef867.js";import"./base.service-2e682391.js";import"./reference.service-fb6ab95a.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-02c37b31.js";const he={class:"flex flex-wrap align-items-center justify-content-between gap-2"},ve=o("span",{class:"text-xl text-900 font-bold"},"Pasos de fabricació",-1),_e=["onClick"],ye=B({__name:"TableWorkorderPhaseDetails",props:{workorderPhase:{},details:{}},emits:["add","edit","delete"],setup(V,{emit:f}){const h=V,w=O();ce();const y=N(),d=e=>{var u;if(!y.machineStatuses)return"";const l=(u=y.machineStatuses)==null?void 0:u.find(m=>e===m.id);return l?l.name:""},c=()=>{const e={id:W(),workOrderPhaseId:h.workorderPhase.id,estimatedTime:0,isCycleTime:!1,machineStatusId:"",comment:"",order:p()};f("add",e)},p=()=>{let e=10;return h.details?(h.details.length+1)*10:e},s=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||f("edit",e.data)},t=(e,l)=>{w.require({target:e.currentTarget,message:"Está segur que vol eliminar el pas de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{f("delete",l)}})};return(e,l)=>{const u=b("Button"),m=b("Column"),v=b("DataTable");return g(),S(v,{onRowClick:s,value:e.details,tableStyle:"min-width: 100%","sort-field":"order","sort-order":1},{header:_(()=>[o("div",he,[ve,a(u,{icon:r(M).PLUS,rounded:"",raised:"",onClick:c},null,8,["icon"])])]),default:_(()=>[a(m,{sortable:"",field:"order",header:"Ordre",style:{width:"10%"}}),a(m,{header:"Estat de màquina",style:{width:"25%"}},{body:_(n=>[q(F(d(n.data.machineStatusId)),1)]),_:1}),a(m,{field:"estimatedTime",header:"Temps (min)",style:{width:"25%"}}),a(m,{header:"Temps de cicle",style:{width:"25%"}},{body:_(n=>[a(oe,{value:n.data.isCycleTime},null,8,["value"])]),_:1}),a(m,{style:{width:"25%"}},{body:_(n=>[o("i",{class:D([r(M).TIMES,"grid_delete_column_button"]),onClick:U=>t(U,n.data)},null,10,_e)]),_:1})]),_:1},8,["value"])}}}),Ie={key:0},we={class:"four-columns"},ke=o("label",{class:"block text-900 mb-2"},"Estat",-1),ge=o("label",{class:"block text-900v mb-1"},"Temps de cicle",-1),Ve={class:"mt-3"},Te=o("label",{class:"block text-900v mb-1"},"Comentari fabricació",-1),Ce=o("br",null,null,-1),Ee=B({__name:"FormWorkorderPhaseDetail",props:{detail:{}},emits:["submit","cancel"],setup(V,{emit:f}){const h=V,w=N(),y=L(),d=j().shape({order:A().required("L'ordre és obligatori").positive("L'ordre ha de ser positiu"),estimatedTime:A().required("El temps estimat és obligatori")}),c=E({result:!1,errors:{}}),p=()=>{const t=new G(d);c.value=t.validate(h.detail)},s=async()=>{if(p(),c.value.result)f("submit",h.detail);else{let t="";Object.entries(c.value.errors).forEach(e=>{t+=`${e[1].map(l=>l)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const l=b("Dropdown"),u=b("Checkbox"),m=b("Textarea"),v=b("Button");return t.detail?(g(),R("form",Ie,[o("section",we,[o("div",null,[a(C,{type:r(T).NUMERIC,label:"Ordre",modelValue:t.detail.order,"onUpdate:modelValue":e[0]||(e[0]=n=>t.detail.order=n),class:D({"p-invalid":c.value.errors.order})},null,8,["type","modelValue","class"])]),o("div",null,[ke,a(l,{modelValue:t.detail.machineStatusId,"onUpdate:modelValue":e[1]||(e[1]=n=>t.detail.machineStatusId=n),editable:"",options:r(w).machineStatuses,optionValue:"id",optionLabel:"description",class:D(["w-full",{"p-invalid":c.value.errors.machineStatusId}])},null,8,["modelValue","options","class"])]),o("div",null,[ge,a(u,{modelValue:t.detail.isCycleTime,"onUpdate:modelValue":e[2]||(e[2]=n=>t.detail.isCycleTime=n),class:"w-full",binary:!0},null,8,["modelValue"])]),o("div",null,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Temps estimat (min)",modelValue:t.detail.estimatedTime,"onUpdate:modelValue":e[3]||(e[3]=n=>t.detail.estimatedTime=n),class:D({"p-invalid":c.value.errors.estimatedTime})},null,8,["type","modelValue","class"])])]),o("div",Ve,[Te,a(m,{class:"w-full",modelValue:t.detail.comment,"onUpdate:modelValue":e[4]||(e[4]=n=>t.detail.comment=n)},null,8,["modelValue"])]),Ce,o("div",null,[a(v,{label:"Guardar pas",style:{float:"right"},size:"small",onClick:s})])])):P("",!0)}}}),Pe={class:"flex flex-wrap align-items-center justify-content-between gap-2"},De=o("span",{class:"text-xl text-900 font-bold"},"Materials de fabricació",-1),Se=["onClick"],Me=B({__name:"TableWorkorderPhaseBillOfMaterials",props:{workorderPhase:{},billOfMaterials:{}},emits:["add","edit","delete"],setup(V,{emit:f}){const h=V,w=O(),y=z(),d=t=>{var l;if(!y.references)return"";const e=(l=y.references)==null?void 0:l.find(u=>t===u.id);return e?y.getFullName(e):""},c=()=>{const t={id:W(),workOrderPhaseId:h.workorderPhase.id,referenceId:"",quantity:0,width:0,diameter:0,height:0,length:0,thickness:0};f("add",t)},p=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||f("edit",t.data)},s=(t,e)=>{w.require({target:t.currentTarget,message:"Está segur que vol eliminar el material de la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{f("delete",e)}})};return(t,e)=>{const l=b("Button"),u=b("Column"),m=b("DataTable");return g(),S(m,{onRowClick:p,value:t.billOfMaterials,tableStyle:"min-width: 100%"},{header:_(()=>[o("div",Pe,[De,a(l,{icon:r(M).PLUS,rounded:"",raised:"",onClick:c},null,8,["icon"])])]),default:_(()=>[a(u,{header:"Material consum",style:{width:"30%"}},{body:_(v=>[q(F(d(v.data.referenceId)),1)]),_:1}),a(u,{field:"quantity",header:"Consum",style:{width:"15%"}}),a(u,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),a(u,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),a(u,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),a(u,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),a(u,{field:"thickness",header:"Gruix mm",style:{width:"12%"}}),a(u,{style:{width:"10%"}},{body:_(v=>[o("i",{class:D([r(M).TIMES,"grid_delete_column_button"]),onClick:n=>s(n,v.data)},null,10,Se)]),_:1})]),_:1},8,["value"])}}}),Be={key:0},$e={class:"three-columns"},Re={class:"three-columns"},Ue={class:"mt-2"},Ae={class:"mt-2"},Ne={class:"mt-2"},Oe=o("br",null,null,-1),qe=B({__name:"FormWorkorderPhaseBomItem",props:{bomItem:{}},emits:["submit","cancel"],setup(V,{emit:f}){const h=V,w=L(),y=j().shape({referenceId:pe().required("El material de consum és obligatori"),quantity:A().min(1,"La quantitat a consumir ha de ser positiva").required("La quantitat a consumir és obligatoria")}),d=E({result:!1,errors:{}}),c=()=>{const s=new G(y);d.value=s.validate(h.bomItem)},p=async()=>{if(c(),d.value.result)f("submit",h.bomItem);else{let s="";Object.entries(d.value.errors).forEach(t=>{s+=`${t[1].map(e=>e)}.   `}),w.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,t)=>{const e=b("Button");return s.bomItem?(g(),R("form",Be,[o("div",null,[a(fe,{label:"Material",fullName:!0,modelValue:s.bomItem.referenceId,"onUpdate:modelValue":t[0]||(t[0]=l=>s.bomItem.referenceId=l),class:D({"p-invalid":d.value.errors.referenceId})},null,8,["modelValue","class"])]),o("section",$e,[o("div",null,[a(C,{type:r(T).NUMERIC,label:"Quantitat",modelValue:s.bomItem.quantity,"onUpdate:modelValue":t[1]||(t[1]=l=>s.bomItem.quantity=l)},null,8,["type","modelValue"])]),o("div",null,[a(C,{type:r(T).NUMERIC,label:"Amplada (mm)",decimals:2,modelValue:s.bomItem.width,"onUpdate:modelValue":t[2]||(t[2]=l=>s.bomItem.width=l)},null,8,["type","modelValue"])]),o("div",null,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Alçada (mm)",modelValue:s.bomItem.height,"onUpdate:modelValue":t[3]||(t[3]=l=>s.bomItem.height=l)},null,8,["type","modelValue"])])]),o("section",Re,[o("div",Ue,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Longitud (mm)",modelValue:s.bomItem.length,"onUpdate:modelValue":t[4]||(t[4]=l=>s.bomItem.length=l)},null,8,["type","modelValue"])]),o("div",Ae,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Diàmetre (mm)",modelValue:s.bomItem.diameter,"onUpdate:modelValue":t[5]||(t[5]=l=>s.bomItem.diameter=l)},null,8,["type","modelValue"])]),o("div",Ne,[a(C,{type:r(T).NUMERIC,decimals:2,label:"Gruix (mm)",modelValue:s.bomItem.thickness,"onUpdate:modelValue":t[6]||(t[6]=l=>s.bomItem.thickness=l)},null,8,["type","modelValue"])])]),Oe,o("div",null,[a(e,{label:"Guardar material",style:{float:"right"},size:"small",onClick:p})])])):P("",!0)}}}),Fe={key:0,class:"main"},lt=B({__name:"WorkorderPhase",setup(V){const f=se();ie();const h=ne(),w=z(),y=N(),d=be(),{workorder:c,workorderPhase:p}=re(d),s=E(""),t=E(""),e=de({visible:!1,title:"Fase",closable:!0,position:"center",modal:!0});me(async()=>{s.value=f.params.id,t.value=f.params.phaseid,await l();let i="";i="Ordre de fabricació",c.value&&p.value&&(i=`${i} ${c.value.code} - Fase ${p.value.code}`),h.setMenuItem({icon:M.BUILDING,backButtonVisible:!0,title:i}),w.fetchReferencesByModule("purchase"),y.fetchActiveModel()});const l=async()=>{await d.fetchPhaseById(t.value)},u=async i=>{await d.updatePhase(t.value,i)},m=E(k.CREATE),v=E(void 0),n=E(void 0),U=()=>{v.value=void 0,n.value=void 0},x=i=>{m.value=k.CREATE,v.value=i,e.title="Afegir pas de fabricació",e.visible=!0},H=i=>{m.value=k.EDIT,v.value=i,e.title="Modificar pas de fabricació",e.visible=!0},Q=i=>{d.deletePhaseDetail(i.id)},J=async i=>{let I;m.value===k.CREATE?I=d.createPhaseDetail(i):m.value===k.EDIT&&(I=d.updatePhaseDetail(i.id,i)),await I&&(e.visible=!1)},K=i=>{m.value=k.CREATE,n.value=i,e.title="Afegir material",e.visible=!0},X=i=>{m.value=k.EDIT,n.value=i,e.title="Modificar material",e.visible=!0},Y=i=>{d.deletePhaseBomItem(i.id)},Z=async i=>{let I;m.value===k.CREATE?I=d.createPhaseBomItem(i):m.value===k.EDIT&&(I=d.updatePhaseBomItem(i.id,i)),await I&&(e.visible=!1)};return(i,I)=>{const $=b("TabPanel"),ee=b("TabView"),te=b("Dialog");return g(),R(ue,null,[o("header",null,[r(c)&&r(p)?(g(),S(le,{key:0,workorder:r(c),phase:r(p),onSubmit:u},null,8,["workorder","phase"])):P("",!0)]),r(p)?(g(),R("main",Fe,[a(ee,null,{default:_(()=>[a($,{header:"Pasos"},{default:_(()=>[a(ye,{workorderPhase:r(p),details:r(p).details,onAdd:x,onEdit:H,onDelete:Q},null,8,["workorderPhase","details"])]),_:1}),a($,{header:"Materials"},{default:_(()=>[a(Me,{workorderPhase:r(p),billOfMaterials:r(p).billOfMaterials,onAdd:K,onEdit:X,onDelete:Y},null,8,["workorderPhase","billOfMaterials"])]),_:1})]),_:1}),a(te,{visible:e.visible,"onUpdate:visible":I[0]||(I[0]=ae=>e.visible=ae),header:e.title,closable:e.closable,modal:e.modal,onHide:U},{default:_(()=>[v.value?(g(),S(Ee,{key:0,detail:v.value,onSubmit:J},null,8,["detail"])):P("",!0),n.value?(g(),S(qe,{key:1,bomItem:n.value,onSubmit:Z},null,8,["bomItem"])):P("",!0)]),_:1},8,["visible","header","closable","modal"])])):P("",!0)],64)}}});export{lt as default};
