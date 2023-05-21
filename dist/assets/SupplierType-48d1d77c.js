import{d as _,s as b,b as V,r as S,g as k,i as n,a as B,c as C,h as v,n as f,j as F,q as I,y as x,u as N,o as g,v as h,P as A,A as $}from"./index-837a167a.js";import{u as E}from"./suppliers-e7a00c36.js";import{c as D,a as y,B as T,F as M,d as u}from"./form-validator-d88aa2f6.js";const R={key:0},q={class:"mt-2"},L=_({__name:"FormSupplierType",emits:["submit"],setup(w,{emit:i}){const c=E(),{supplierType:s}=b(c),t=V(),l=D().shape({name:y().required("El nom és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),description:y().required("La descripció és obligatori").max(250,"La descripció no pot superar els 250 carácters")}),o=S({result:!1,errors:{}}),p=()=>{const e=new M(l);o.value=e.validate(s.value)},m=async()=>{if(p(),o.value.result)i("submit",s.value);else{let e="";Object.entries(o.value.errors).forEach(a=>{e+=`${a[1].map(r=>r)}.   `}),t.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,a)=>{const r=k("Button");return n(s)?(B(),C("form",R,[v(T,{class:f(["mb-2",{"p-invalid":o.value.errors.name}]),label:"Nom",id:"name",modelValue:n(s).name,"onUpdate:modelValue":a[0]||(a[0]=d=>n(s).name=d)},null,8,["modelValue","class"]),v(T,{class:f(["mb-2",{"p-invalid":o.value.errors.description}]),label:"Descripció",id:"description",modelValue:n(s).description,"onUpdate:modelValue":a[1]||(a[1]=d=>n(s).description=d)},null,8,["modelValue","class"]),F("div",q,[v(r,{label:"Guardar",class:"mr-2",onClick:m})])])):I("",!0)}}}),G=_({__name:"SupplierType",setup(w){const i=S(u.EDIT),c=x(),s=N(),t=E(),{supplierType:l}=b(t),o=async()=>{await t.fetchSupplierType(c.params.id);let e="";l.value?(i.value=u.EDIT,e=`Tipus de proveïdor ${l.value.name}`):(i.value=u.CREATE,t.setNewSupplierType(c.params.id),e="Alta de tipus de proveïdor"),s.setMenuItem({icon:A.BUILDING,backButtonVisible:!0,text:e})};g(async()=>{await o()});const p=V(),m=async()=>{const e=l.value;let a=!1,r="";i.value===u.CREATE?(a=await t.createSupplierType(e),r="Tipus de proveïdor creat correctament"):(a=await t.updateSupplierType(e.id,e),r="Tipus de proveïdor actualizat correctament"),a&&(p.add({severity:"success",summary:r,life:5e3}),$.back())};return(e,a)=>(B(),h(L,{onSubmit:m}))}});export{G as default};
