import{d as C,o as y,j as h,z as I,r as E,h as v,k as o,c as F,e as l,i as d,n as w,y as M,l as q,a as S,s as W,F as p,v as D,u as L,m as N,P as R,L as U}from"./index-555c6e5a.js";import{c as g,a as V,d as $,F as A}from"./form-validator-f8953ae6.js";import{u as B}from"./plantmodel-978ee1cf.js";import"./_commonjsHelpers-725317a4.js";import"./index-dda8c344.js";import"./base.service-fff6fc35.js";const P={key:0},z={class:"four-columns"},j=l("label",{class:"block text-900 mb-2"},"Màquina",-1),G=l("label",{class:"block text-900 mb-2"},"Estat de màquina",-1),O=l("label",{class:"block text-900 mb-2"},"Desactivat",-1),Y={class:"mt-2"},H=C({__name:"FormWorkcenterCost",props:{workcentercost:{}},emits:["submit","cancel"],setup(_,{emit:i}){const u=_;y(async()=>{await a.fetchOperatorTypes(),await a.fetchMachineStatuses()});const b=h(),a=B(),{workcentercost:e}=I(a),k=g().shape({workcenterId:V().required("La màquina és obligatoria"),machineStatusId:V().required("L'estat de màquina és obligatori"),cost:$().required("El cost es obligatori")}),n=E({result:!1,errors:{}}),f=()=>{const r=new A(k);n.value=r.validate(u.workcentercost)},s=async()=>{if(f(),n.value.result)i("submit",u.workcentercost);else{let r="";Object.entries(n.value.errors).forEach(t=>{r+=`${t[1].map(m=>m)}.   `}),b.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,t)=>{const m=v("Dropdown"),T=v("Checkbox"),x=v("Button");return o(e)?(S(),F("form",P,[l("section",z,[l("div",null,[j,d(m,{modelValue:o(e).workcenterId,"onUpdate:modelValue":t[0]||(t[0]=c=>o(e).workcenterId=c),editable:"",options:o(a).workcenters,optionValue:"id",optionLabel:"name",class:w(["w-full",{"p-invalid":n.value.errors.WorkcenterId}])},null,8,["modelValue","options","class"])]),l("div",null,[G,d(m,{modelValue:o(e).machineStatusId,"onUpdate:modelValue":t[1]||(t[1]=c=>o(e).machineStatusId=c),editable:"",options:o(a).machineStatuses,optionValue:"id",optionLabel:"name",class:w(["w-full",{"p-invalid":n.value.errors.machineStatusId}])},null,8,["modelValue","options","class"])]),d(M,{class:w(["mb-2 w-full",{"p-invalid":n.value.errors.cost}]),label:"Preu hora",modelValue:o(e).cost,"onUpdate:modelValue":t[2]||(t[2]=c=>o(e).cost=c),type:o(W).CURRENCY},null,8,["modelValue","type","class"]),l("div",null,[O,d(T,{modelValue:o(e).disabled,"onUpdate:modelValue":t[3]||(t[3]=c=>o(e).disabled=c),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("div",Y,[d(x,{label:"Guardar",class:"mr-2",onClick:s})])])):q("",!0)}}}),te=C({__name:"WorkcenterCost",setup(_){const i=E(p.EDIT),u=D(),b=L(),a=B(),{workcentercost:e}=I(a),k=async()=>{await a.fetchWorkcenterCost(u.params.id);let s="";e.value?(i.value=p.EDIT,s="Editar cost per màquina"):(i.value=p.CREATE,a.setNewWorkcenterCost(u.params.id),s="Alta de cost per màquina"),b.setMenuItem({icon:R.BUILDING,backButtonVisible:!0,title:s})};y(async()=>{await k()});const n=h(),f=async()=>{const s=e.value;let r=!1,t="";i.value===p.CREATE?(r=await a.createWorkcenterCost(s),t="Cost per màquina creat correctament"):(r=await a.updateWorkcenterCost(s.id,s),t="Cost per màquina actualizat correctament"),r&&(n.add({severity:"success",summary:t,life:5e3}),U.back())};return(s,r)=>o(e)?(S(),N(H,{key:0,workcentercost:o(e),onSubmit:f},null,8,["workcentercost"])):q("",!0)}});export{te as default};
