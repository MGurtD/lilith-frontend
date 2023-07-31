import{d as w,j as B,z as F,r as h,h as N,k as s,c as U,e as r,i as u,n as C,y as m,m as I,l as V,a as R,s as k,F as p,v as g,u as x,o as A,P as M,J as P}from"./index-7e4c2741.js";import{c as S,a as f,F as $}from"./form-validator-5a5505d1.js";import{F as q}from"./FileEntityPicker-b82d8886.js";import{u as T}from"./reference-3675cce7.js";import"./file.service-f597bc32.js";import"./functions-fa75c0c2.js";import"./v4-a960c1f4.js";import"./base.service-64a7477a.js";const D={key:0},z={class:"two-columns"},L={class:"mt-1"},j={class:"mt-1"},G={class:"two-columns"},Y={class:"mt-1"},J={class:"mt-1"},O=r("br",null,null,-1),H={class:"mt-2"},K=w({__name:"FormReference",props:{reference:{}},emits:["submit","cancel"],setup(E,{emit:n}){const d=E,v=B(),l=T(),{reference:e}=F(l),_=S().shape({code:f().required("El codi és obligatori").max(50,"El codi no pot superar els 50 carácters"),description:f().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),cost:f().required("El cost es obligatori"),price:f().required("El preu es obligatori")}),c=h({result:!1,errors:{}}),b=()=>{const a=new $(_);c.value=a.validate(d.reference)},o=async()=>{if(b(),c.value.result)n("submit",d.reference);else{let a="";Object.entries(c.value.errors).forEach(t=>{a+=`${t[1].map(y=>y)}.   `}),v.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,t)=>{const y=N("Button");return s(e)?(R(),U("form",D,[r("section",z,[r("div",L,[u(m,{class:C(["mb-2",{"p-invalid":c.value.errors.code}]),label:"Codi",id:"code",modelValue:s(e).code,"onUpdate:modelValue":t[0]||(t[0]=i=>s(e).code=i)},null,8,["modelValue","class"])]),r("div",j,[u(m,{class:C(["mb-2",{"p-invalid":c.value.errors.description}]),label:"Descripció",id:"description",modelValue:s(e).description,"onUpdate:modelValue":t[1]||(t[1]=i=>s(e).description=i)},null,8,["modelValue","class"])])]),r("section",G,[r("div",Y,[u(m,{type:s(k).CURRENCY,label:"Cost",id:"cost",modelValue:s(e).cost,"onUpdate:modelValue":t[2]||(t[2]=i=>s(e).cost=i)},null,8,["type","modelValue"])]),r("div",J,[u(m,{type:s(k).CURRENCY,label:"Preu",id:"price",modelValue:s(e).price,"onUpdate:modelValue":t[3]||(t[3]=i=>s(e).price=i)},null,8,["type","modelValue"])])]),r("section",null,[O,s(e)?(R(),I(q,{key:0,title:"Planos",entity:"referenceMaps",id:s(e).id},null,8,["id"])):V("",!0)]),r("div",H,[u(y,{label:"Guardar",class:"mr-2",onClick:o})])])):V("",!0)}}}),ae=w({__name:"reference",setup(E){const n=h(p.EDIT),d=g(),v=x(),l=T(),{reference:e}=F(l),_=async()=>{await l.fetchReference(d.params.id);let o="";e.value?(n.value=p.EDIT,o=`Area ${e.value.description}`):(n.value=p.CREATE,l.setNewReference(d.params.id),o="Alta de referència"),v.setMenuItem({icon:M.BUILDING,backButtonVisible:!0,title:o})};A(async()=>{await _()});const c=B(),b=async()=>{const o=e.value;let a=!1,t="";n.value===p.CREATE?(a=await l.createReference(o),t="Referència creada correctament"):(a=await l.updateReference(o.id,o),t="Referència actualizada correctament"),a&&(c.add({severity:"success",summary:t,life:5e3}),P.back())};return(o,a)=>s(e)?(R(),I(K,{key:0,reference:s(e),onSubmit:b},null,8,["reference"])):V("",!0)}});export{ae as default};
