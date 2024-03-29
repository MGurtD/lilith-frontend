import{u as B}from"./lifecycle-ad25beff.js";import{d as W,h,c as p,e as l,D as c,i as r,w as C,N as D,k,a as u,l as _,j as L,H as F,r as S,y as w,n as b,s as N}from"./index-19723412.js";import{c as q,a as T,F as M}from"./form-validator-f8953ae6.js";import{u as j}from"./plantmodel-1a358cab.js";const x={class:"mb-2"},z={class:"block text-900 mb-2"},R={key:0,class:"flex align-items-center"},G={key:1},H={key:0,class:"flex align-items-center"},O=W({__name:"DropdownLifecycle",props:{label:{},modelValue:{}},emits:["update:modelValue"],setup(I,{emit:f}){const a=B();return(i,d)=>{var m;const V=h("Dropdown");return u(),p("div",x,[l("label",z,c(i.label),1),r(V,D({showClear:"",editable:"",options:(m=k(a).lifecycle)==null?void 0:m.statuses,placeholder:"Selecciona...",optionValue:"id",optionLabel:"name",class:"w-full"},i.$attrs,{"model-value":i.modelValue,onChange:d[0]||(d[0]=t=>f("update:modelValue",t.value))}),{value:C(t=>[t.value?(u(),p("div",R,c(t.value.name),1)):(u(),p("span",G,c(t.placeholder),1))]),option:C(t=>[t.option?(u(),p("div",H,c(t.option.name),1)):_("",!0)]),_:1},16,["options","model-value"])])}}}),Y={key:0},A=l("br",null,null,-1),J={class:"three-columns mb-2"},K={class:"three-columns mb-2"},P=l("label",{class:"block text-900 mb-2"},"Tipus de màquina",-1),Q=l("label",{class:"block text-900 mb-2"},"Màquina preferida",-1),X=l("label",{class:"block text-900 mb-2"},"Tipus d'operari",-1),Z={class:"three-columns mb-2"},ee=l("label",{class:"block text-900 mt-1 mb-1"},"Externa",-1),te=W({__name:"FormWorkorderPhase",props:{workorder:{},phase:{}},emits:["submit","cancel"],setup(I,{emit:f}){const a=I,i=L(),d=j(),V=F(()=>a.phase.workcenterTypeId?d.getWorkcentersByTypeId(a.phase.workcenterTypeId):[]),m=()=>{a.phase.preferredWorkcenterId=null},t=()=>{a.phase.isExternalWork&&(a.phase.operatorTypeId=null,a.phase.workcenterTypeId=null,a.phase.preferredWorkcenterId=null)},g=q().shape({code:T().required("El codi és obligatori"),statusId:T().required("L'estat és obligatori")}),n=S({result:!1,errors:{}}),E=()=>{const e=new M(g);n.value=e.validate(a.phase)},U=async()=>{if(E(),n.value.result)a.phase.preferredWorkcenterId===""&&(a.phase.preferredWorkcenterId=null),f("submit",a.phase);else{let e="";Object.entries(n.value.errors).forEach(o=>{e+=`${o[1].map(v=>v)}.   `}),i.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,o)=>{const v=h("Button"),y=h("Dropdown"),$=h("Checkbox");return e.phase?(u(),p("form",Y,[l("div",null,[r(v,{label:"Guardar Fase",class:"grid_add_row_button",size:"small",onClick:U}),A]),l("section",J,[l("div",null,[r(w,{label:"Codi de la fase",modelValue:e.phase.code,"onUpdate:modelValue":o[0]||(o[0]=s=>e.phase.code=s)},null,8,["modelValue"])]),l("div",null,[r(w,{label:"Descripció",modelValue:e.phase.description,"onUpdate:modelValue":o[1]||(o[1]=s=>e.phase.description=s)},null,8,["modelValue"])]),l("div",null,[r(O,{label:"Estat",modelValue:e.phase.statusId,"onUpdate:modelValue":o[2]||(o[2]=s=>e.phase.statusId=s),class:b({"p-invalid":n.value.errors.statusId})},null,8,["modelValue","class"])])]),l("section",K,[l("div",null,[P,r(y,{modelValue:e.phase.workcenterTypeId,"onUpdate:modelValue":o[3]||(o[3]=s=>e.phase.workcenterTypeId=s),editable:"",options:k(d).workcenterTypes,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":n.value.errors.workcenterTypeId}]),onChange:m},null,8,["modelValue","options","class"])]),l("div",null,[Q,r(y,{modelValue:e.phase.preferredWorkcenterId,"onUpdate:modelValue":o[4]||(o[4]=s=>e.phase.preferredWorkcenterId=s),editable:"",options:V.value,optionValue:"id",optionLabel:"description",class:"w-full"},null,8,["modelValue","options"])]),l("div",null,[X,r(y,{modelValue:e.phase.operatorTypeId,"onUpdate:modelValue":o[5]||(o[5]=s=>e.phase.operatorTypeId=s),editable:"",options:k(d).operatorTypes,optionValue:"id",optionLabel:"description",class:b(["w-full",{"p-invalid":n.value.errors.operatorTypeId}])},null,8,["modelValue","options","class"])])]),l("section",Z,[l("div",null,[ee,r($,{modelValue:e.phase.isExternalWork,"onUpdate:modelValue":o[6]||(o[6]=s=>e.phase.isExternalWork=s),class:"w-full",binary:!0,onChange:t},null,8,["modelValue"])]),l("div",null,[r(w,{type:k(N).CURRENCY,label:"Cost extern",modelValue:e.phase.externalWorkCost,"onUpdate:modelValue":o[7]||(o[7]=s=>e.phase.externalWorkCost=s),disabled:!e.phase.isExternalWork,class:b({"p-invalid":n.value.errors.externalWorkCost})},null,8,["type","modelValue","disabled","class"])])])])):_("",!0)}}});export{O as _,te as a};
