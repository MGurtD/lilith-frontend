import{c as w,d as C,a as c,F as M}from"./form-validator-7fd5796d.js";import{d as _,j as B,o as h,r as I,h as d,a as F,c as N,e as a,i as s,k as p,s as $,z as L,l as g}from"./index-797fdaef.js";import{u as q}from"./reference-0fda136f.js";import{u as Q}from"./workmaster-cc8a262d.js";const S={key:0},U=a("label",{class:"block text-900 mb-2"},"Ruta",-1),T={class:"mt-2"},E=a("label",{class:"block text-900 mb-2"},"Data Prevista",-1),R={class:"mt-2"},j=a("label",{class:"block text-900 mb-2"},"Comentari Fabriació",-1),A=a("br",null,null,-1),J=_({__name:"FormCreateWorkorder",props:{createWorkOrderDto:{},filteredWorkMasters:{}},emits:["submit","cancel"],setup(f,{emit:k}){const u=f,l=Q(),b=q(),v=B();h(()=>{l.workmasters||l.fetchAllActives()});const D=e=>{var n;const t=b.getShortNameById(e.referenceId);let r=(n=l.workmasterModes.find(m=>m.id===e.mode))==null?void 0:n.value;return`${t}  (Base = ${e.baseQuantity} )  ${r}`},V=w().shape({plannedQuantity:C().min(1,"La quantitat ha de ser superior a 0").required("La quanitat és obligatoria"),workMasterId:c().required("La ruta de fabricació és obligatoria"),plannedDate:c().required("La data prevista és obligatoria")}),i=I({result:!1,errors:{}}),W=()=>{const e=new M(V);i.value=e.validate(u.createWorkOrderDto)},y=async()=>{if(W(),i.value.result)k("submit",u.createWorkOrderDto);else{let e="";Object.entries(i.value.errors).forEach(t=>{e+=`${t[1].map(r=>r)}.   `}),v.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,t)=>{const r=d("Dropdown"),n=d("Calendar"),m=d("Textarea"),O=d("Button");return e.createWorkOrderDto?(F(),N("form",S,[a("div",null,[U,s(r,{modelValue:e.createWorkOrderDto.workMasterId,"onUpdate:modelValue":t[0]||(t[0]=o=>e.createWorkOrderDto.workMasterId=o),filter:"",editable:"",options:e.filteredWorkMasters?e.filteredWorkMasters:p(l).workmasters,optionValue:"id",optionLabel:D,class:"w-full"},null,8,["modelValue","options"])]),a("div",T,[s(L,{class:"mb-2 w-full",label:"Quantitat",modelValue:e.createWorkOrderDto.plannedQuantity,"onUpdate:modelValue":t[1]||(t[1]=o=>e.createWorkOrderDto.plannedQuantity=o),type:p($).NUMERIC},null,8,["modelValue","type"])]),a("div",null,[E,s(n,{modelValue:e.createWorkOrderDto.plannedDate,"onUpdate:modelValue":t[2]||(t[2]=o=>e.createWorkOrderDto.plannedDate=o),dateFormat:"dd/mm/yy",class:"mt-2"},null,8,["modelValue"])]),a("div",R,[j,s(m,{class:"w-full",modelValue:e.createWorkOrderDto.comment,"onUpdate:modelValue":t[3]||(t[3]=o=>e.createWorkOrderDto.comment=o)},null,8,["modelValue"])]),A,a("div",null,[s(O,{label:"Crear",style:{float:"right"},onClick:y})])])):g("",!0)}}});export{J as _};
