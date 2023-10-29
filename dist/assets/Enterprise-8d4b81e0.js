import{d as y,j as w,r as B,h as f,c as F,e as u,i as c,n as E,y as V,l as C,a as h,F as m,v as I,u as T,z as N,o as D,k as _,m as M,P as $,I as g}from"./index-70c82e0d.js";import{c as A,a as k,F as R}from"./form-validator-a9accb8c.js";import{u as S}from"./plantmodel-299ff652.js";import"./base.service-c65b9c29.js";const U={key:0},z={class:"three-columns"},L=u("label",{class:"block text-900 mb-2"},"Desactivat",-1),P={class:"mt-2"},j=y({__name:"FormEnterprise",props:{enterprise:{}},emits:["submit","cancel"],setup(b,{emit:o}){const n=b,d=w(),r=A().shape({name:k().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:k().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")}),a=B({result:!1,errors:{}}),p=()=>{const s=new R(r);a.value=s.validate(n.enterprise)},v=async()=>{if(p(),a.value.result)o("submit",n.enterprise);else{let s="";Object.entries(a.value.errors).forEach(e=>{s+=`${e[1].map(t=>t)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,e)=>{const t=f("Checkbox"),l=f("Button");return s.enterprise?(h(),F("form",U,[u("div",z,[c(V,{class:E(["mb-2",{"p-invalid":a.value.errors.name}]),label:"Nom",id:"name",modelValue:s.enterprise.name,"onUpdate:modelValue":e[0]||(e[0]=i=>s.enterprise.name=i)},null,8,["modelValue","class"]),c(V,{class:E(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",id:"description",modelValue:s.enterprise.description,"onUpdate:modelValue":e[1]||(e[1]=i=>s.enterprise.description=i)},null,8,["modelValue","class"]),u("div",null,[L,c(t,{modelValue:s.enterprise.disabled,"onUpdate:modelValue":e[2]||(e[2]=i=>s.enterprise.disabled=i),class:"w-full",binary:!0},null,8,["modelValue"])])]),u("div",P,[c(l,{label:"Guardar",class:"mr-2",onClick:v})])])):C("",!0)}}}),H=y({__name:"Enterprise",setup(b){const o=B(m.EDIT),n=I(),d=T(),r=S(),{enterprise:a}=N(r),p=async()=>{await r.fetchEnterprise(n.params.id);let e="";a.value?(o.value=m.EDIT,e=`Empresa ${a.value.name}`):(o.value=m.CREATE,r.setNewEnterprise(n.params.id),e="Alta d'empresa"),d.setMenuItem({icon:$.BUILDING,backButtonVisible:!0,title:e})};D(async()=>{await p()});const v=w(),s=async()=>{const e=a.value;let t=!1,l="";o.value===m.CREATE?(t=await r.createEnterprise(e),l="Empresa creada correctament"):(t=await r.updateEnterprise(e.id,e),l="Empresa actualizada correctament"),t&&(v.add({severity:"success",summary:l,life:5e3}),g.back())};return(e,t)=>_(a)?(h(),M(j,{key:0,enterprise:_(a),onSubmit:s},null,8,["enterprise"])):C("",!0)}});export{H as default};