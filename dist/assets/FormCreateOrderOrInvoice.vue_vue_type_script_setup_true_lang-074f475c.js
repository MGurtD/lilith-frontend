import{u as h}from"./customers-5e8cc374.js";import{u as C}from"./masterData-609dcbb7.js";import{d as k,j as I,r as w,h as i,a as D,c as S,e as o,i as l,k as c}from"./index-d7e0b608.js";import{c as x,a as d,F as B}from"./form-validator-788c4f60.js";import{c as E}from"./functions-13b40d42.js";const F={class:"mt-2"},N=o("label",{class:"block text-900 mb-2"},"Client",-1),O={class:"mt-2"},g=o("label",{class:"block text-900 mb-2"},"Exercici",-1),y={class:"mt-2"},L=o("label",{class:"block text-900 mb-2"},"Data",-1),T={class:"mt-2"},A=k({__name:"FormCreateOrderOrInvoice",props:{createRequest:{}},emits:["submit"],setup(m,{emit:u}){const a=m,p=I(),b=C(),f=h(),V=x().shape({exerciseId:d().required("L'exercici és obligatori"),customerId:d().required("El client és obligatori")}),n=w({result:!1,errors:{}}),_=()=>{const e=new B(V);n.value=e.validate(a.createRequest)},v=()=>{if(_(),n.value.result)a.createRequest.date=E(a.createRequest.date),u("submit",a.createRequest);else{let e="";Object.entries(n.value.errors).forEach(t=>{e+=`${t[1].map(r=>r)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,t)=>{const r=i("Dropdown"),q=i("Calendar"),R=i("Button");return D(),S("form",null,[o("div",F,[N,l(r,{class:"w-full",modelValue:e.createRequest.customerId,"onUpdate:modelValue":t[0]||(t[0]=s=>e.createRequest.customerId=s),editable:"",options:c(f).customers,optionValue:"id",optionLabel:"comercialName"},null,8,["modelValue","options"])]),o("div",O,[g,l(r,{class:"w-full",modelValue:e.createRequest.exerciseId,"onUpdate:modelValue":t[1]||(t[1]=s=>e.createRequest.exerciseId=s),editable:"",options:c(b).exercises,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])]),o("div",y,[L,l(q,{modelValue:e.createRequest.date,"onUpdate:modelValue":t[2]||(t[2]=s=>e.createRequest.date=s)},null,8,["modelValue"])]),o("footer",T,[l(R,{label:"Crear",onClick:v,style:{float:"right"}})])])}}});export{A as _};
