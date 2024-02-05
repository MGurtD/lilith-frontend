import{d as b,z as V,j as S,r as B,h as _,k as n,a as E,c as F,i as f,n as T,e as I,l as C,F as c,g as N,v as g,u as h,o as x,m as R,P as $}from"./index-30e64f83.js";import{u as k}from"./suppliers-3d5dcf5e.js";import{c as A,a as y,F as D}from"./form-validator-497b2185.js";import"./suppliers.service-fcae855c.js";import"./base.service-3e1c705c.js";const M={key:0},z={class:"mt-2"},L=b({__name:"FormSupplierType",emits:["submit"],setup(w,{emit:i}){const u=k(),{supplierType:a}=V(u),p=S(),o=A().shape({name:y().required("El nom és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),description:y().required("La descripció és obligatori").max(250,"La descripció no pot superar els 250 carácters")}),s=B({result:!1,errors:{}}),m=()=>{const r=new D(o);s.value=r.validate(a.value)},d=async()=>{if(m(),s.value.result)i("submit",a.value);else{let r="";Object.entries(s.value.errors).forEach(e=>{r+=`${e[1].map(t=>t)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,e)=>{const t=_("BaseInput"),l=_("Button");return n(a)?(E(),F("form",M,[f(t,{class:T(["mb-2",{"p-invalid":s.value.errors.name}]),label:"Nom",id:"name",modelValue:n(a).name,"onUpdate:modelValue":e[0]||(e[0]=v=>n(a).name=v)},null,8,["modelValue","class"]),f(t,{class:T(["mb-2",{"p-invalid":s.value.errors.description}]),label:"Descripció",id:"description",modelValue:n(a).description,"onUpdate:modelValue":e[1]||(e[1]=v=>n(a).description=v)},null,8,["modelValue","class"]),I("div",z,[f(l,{label:"Guardar",class:"mr-2",onClick:d})])])):C("",!0)}}}),O=b({__name:"SupplierType",setup(w){const i=B(c.EDIT),u=N(),a=g(),p=h(),o=k(),{supplierType:s}=V(o),m=async()=>{await o.fetchSupplierType(a.params.id);let e="";s.value?(i.value=c.EDIT,e=`Tipus de proveïdor ${s.value.name}`):(i.value=c.CREATE,o.setNewSupplierType(a.params.id),e="Alta de tipus de proveïdor"),p.setMenuItem({icon:$.BUILDING,backButtonVisible:!0,title:e})};x(async()=>{await m()});const d=S(),r=async()=>{const e=s.value;let t=!1,l="";i.value===c.CREATE?(t=await o.createSupplierType(e),l="Tipus de proveïdor creat correctament"):(t=await o.updateSupplierType(e.id,e),l="Tipus de proveïdor actualizat correctament"),t&&(d.add({severity:"success",summary:l,life:5e3}),u.back())};return(e,t)=>(E(),R(L,{onSubmit:r}))}});export{O as default};
