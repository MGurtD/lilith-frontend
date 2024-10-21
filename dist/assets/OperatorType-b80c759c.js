import{d as C,o as E,j as w,C as B,r as x,h as _,k as t,c as M,e as m,i as u,n as y,z as V,l as F,a as O,F as p,v as N,u as $,m as g,P as D,V as S}from"./index-d6370003.js";import{c as U,a as k,d as A,F as R}from"./form-validator-76860c5e.js";import{u as h}from"./plantmodel-07cd1012.js";import"./index-882a7cd4.js";const q={key:0},z={class:"four-columns"},L=m("label",{class:"block text-900 mb-2"},"Desactivat",-1),P={class:"mt-2"},j=C({__name:"FormOperatorType",props:{operatortype:{}},emits:["submit","cancel"],setup(T,{emit:i}){const c=T;E(async()=>{await r.fetchOperatorTypes()});const d=w(),r=h(),{operatorType:e}=B(r),b=U().shape({name:k().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:k().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),cost:A().required("El cost es obligatori").min(0)}),l=x({result:!1,errors:{}}),f=()=>{const s=new R(b);l.value=s.validate(c.operatortype)},o=async()=>{if(f(),l.value.result)i("submit",c.operatortype);else{let s="";Object.entries(l.value.errors).forEach(a=>{s+=`${a[1].map(v=>v)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,a)=>{const v=_("Checkbox"),I=_("Button");return t(e)?(O(),M("form",q,[m("section",z,[u(V,{class:y(["mb-2",{"p-invalid":l.value.errors.name}]),label:"Nom",id:"name",modelValue:t(e).name,"onUpdate:modelValue":a[0]||(a[0]=n=>t(e).name=n)},null,8,["modelValue","class"]),u(V,{class:y(["mb-2",{"p-invalid":l.value.errors.description}]),label:"Descripció",id:"description",modelValue:t(e).description,"onUpdate:modelValue":a[1]||(a[1]=n=>t(e).description=n)},null,8,["modelValue","class"]),u(V,{class:y(["mb-2",{"p-invalid":l.value.errors.cost}]),label:"Cost/h",id:"cost",modelValue:t(e).cost,"onUpdate:modelValue":a[2]||(a[2]=n=>t(e).cost=n)},null,8,["modelValue","class"]),m("div",null,[L,u(v,{modelValue:t(e).disabled,"onUpdate:modelValue":a[3]||(a[3]=n=>t(e).disabled=n),class:"w-full",binary:!0},null,8,["modelValue"])])]),m("div",P,[u(I,{label:"Guardar",class:"mr-2",onClick:o})])])):F("",!0)}}}),Q=C({__name:"OperatorType",setup(T){const i=x(p.EDIT),c=N(),d=$(),r=h(),{operatorType:e}=B(r),b=async()=>{await r.fetchOperatorType(c.params.id);let o="";e.value?(i.value=p.EDIT,o=`Tipus d'operari: ${e.value.name}`):(i.value=p.CREATE,r.setNewOperatorType(c.params.id),o="Alta de tipus d' operari"),d.setMenuItem({icon:D.BUILDING,backButtonVisible:!0,title:o})};E(async()=>{await b()});const l=w(),f=async()=>{const o=e.value;let s=!1,a="";i.value===p.CREATE?(s=await r.createOperatorType(o),a="Tipus d'operari creat correctament"):(s=await r.updateOperatorType(o.id,o),a="Tipus d'operari actualizat correctament"),s&&(l.add({severity:"success",summary:a,life:5e3}),S.back())};return(o,s)=>t(e)?(O(),g(j,{key:0,operatortype:t(e),onSubmit:f},null,8,["operatortype"])):F("",!0)}});export{Q as default};