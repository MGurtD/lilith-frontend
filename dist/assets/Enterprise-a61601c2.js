import{b as F}from"./vue-router-ffe4063c.js";import{j as y,k as B,f as v,c as I,e as u,h as m,n as E,d as w,o as C,u as T,ax as M,M as N,l as V,a as D,P as $}from"./index-a2430148.js";import{u as h}from"./usetoast.esm-261cff49.js";import{F as c}from"./component-c8ee66ae.js";import{r as g}from"./router-1341e2bf.js";import{B as _}from"./BaseInput-59304a19.js";import{c as A,a as k,F as R}from"./form-validator-1a569dfe.js";import{u as S}from"./plantmodel-d79aa13d.js";import"./runtime-dom.esm-bundler-ee5f76e0.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./base.service-ac28cfab.js";const U={key:0},x={class:"three-columns"},L=u("label",{class:"block text-900 mb-2"},"Desactivat",-1),P={class:"mt-2"},j=y({__name:"FormEnterprise",props:{enterprise:{}},emits:["submit","cancel"],setup(b,{emit:o}){const n=b,p=h(),t=A().shape({name:k().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:k().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")}),a=B({result:!1,errors:{}}),d=()=>{const s=new R(t);a.value=s.validate(n.enterprise)},f=async()=>{if(d(),a.value.result)o("submit",n.enterprise);else{let s="";Object.entries(a.value.errors).forEach(e=>{s+=`${e[1].map(r=>r)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,e)=>{const r=v("Checkbox"),i=v("Button");return s.enterprise?(C(),I("form",U,[u("div",x,[m(_,{class:E(["mb-2",{"p-invalid":a.value.errors.name}]),label:"Nom",id:"name",modelValue:s.enterprise.name,"onUpdate:modelValue":e[0]||(e[0]=l=>s.enterprise.name=l)},null,8,["modelValue","class"]),m(_,{class:E(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",id:"description",modelValue:s.enterprise.description,"onUpdate:modelValue":e[1]||(e[1]=l=>s.enterprise.description=l)},null,8,["modelValue","class"]),u("div",null,[L,m(r,{modelValue:s.enterprise.disabled,"onUpdate:modelValue":e[2]||(e[2]=l=>s.enterprise.disabled=l),class:"w-full",binary:!0},null,8,["modelValue"])])]),u("div",P,[m(i,{label:"Guardar",class:"mr-2",onClick:f})])])):w("",!0)}}}),Z=y({__name:"Enterprise",setup(b){const o=B(c.EDIT),n=F(),p=T(),t=S(),{enterprise:a}=M(t),d=async()=>{await t.fetchEnterprise(n.params.id);let e="";a.value?(o.value=c.EDIT,e=`Empresa ${a.value.name}`):(o.value=c.CREATE,t.setNewEnterprise(n.params.id),e="Alta d'empresa"),p.setMenuItem({icon:$.BUILDING,backButtonVisible:!0,text:e})};N(async()=>{await d()});const f=h(),s=async()=>{const e=a.value;let r=!1,i="";o.value===c.CREATE?(r=await t.createEnterprise(e),i="Empresa creada correctament"):(r=await t.updateEnterprise(e.id,e),i="Empresa actualizada correctament"),r&&(f.add({severity:"success",summary:i,life:5e3}),g.back())};return(e,r)=>V(a)?(C(),D(j,{key:0,enterprise:V(a),onSubmit:s},null,8,["enterprise"])):w("",!0)}});export{Z as default};
