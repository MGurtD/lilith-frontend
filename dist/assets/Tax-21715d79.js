import{b as g}from"./vue-router-b024814c.js";import{r as T}from"./router-2586516d.js";import{j as _,k,f as x,c as w,e as m,h as c,n as V,l as b,d as B,o as E,u as C,ax as h,M as F,a as N,P as $}from"./index-2bfc80b2.js";import{u as M}from"./tax-4b622ccf.js";import{u as I}from"./usetoast.esm-82b2df9e.js";import{B as R,F as u}from"./component-c8ee66ae.js";import{B as y}from"./BaseInput-95847e6b.js";import{c as U,a as q,d as A,b as D,F as P}from"./form-validator-1a569dfe.js";import"./tax.service-2ace897f.js";import"./base.service-8b4a1a4e.js";import"./runtime-dom.esm-bundler-0884c737.js";import"./_plugin-vue_export-helper-c27b6911.js";const S={key:0},j={class:"two-columns"},z=m("label",{class:"block text-900 mb-2"},"Desactivada",-1),G={class:"mt-2"},L=_({__name:"FormTax",props:{tax:{}},emits:["submit","cancel"],setup(v,{emit:r}){const l=v,d=I(),o=U().shape({name:q().required("El nom és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),percentatge:A().required("La freqüència és obligatoria"),disabled:D().required("El camp deshabilitat és obligatori")}),t=k({result:!1,errors:{}}),p=()=>{const a=new P(o);t.value=a.validate(l.tax)},f=async()=>{if(p(),t.value.result)r("submit",l.tax);else{let a="";Object.entries(t.value.errors).forEach(e=>{a+=`${e[1].map(s=>s)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,e)=>{const s=x("Checkbox"),n=x("Button");return a.tax?(E(),w("form",S,[m("div",j,[c(y,{class:V(["mb-2",{"p-invalid":t.value.errors.name}]),label:"Nom",id:"name",modelValue:a.tax.name,"onUpdate:modelValue":e[0]||(e[0]=i=>a.tax.name=i)},null,8,["modelValue","class"]),c(y,{type:b(R).NUMERIC,label:"Percentatge",id:"percentatge",modelValue:a.tax.percentatge,"onUpdate:modelValue":e[1]||(e[1]=i=>a.tax.percentatge=i),class:V({"p-invalid":t.value.errors.percentatge})},null,8,["type","modelValue","class"])]),m("div",null,[m("div",null,[z,c(s,{modelValue:a.tax.disabled,"onUpdate:modelValue":e[2]||(e[2]=i=>a.tax.disabled=i),class:"w-full",binary:!0},null,8,["modelValue"])])]),m("div",G,[c(n,{label:"Guardar",onClick:f})])])):B("",!0)}}}),se=_({__name:"Tax",setup(v){const r=k(u.EDIT),l=g(),d=C(),o=M(),{tax:t}=h(o),p=async()=>{await o.fetchOne(l.params.id);let e="";t.value?(r.value=u.EDIT,e=`Impost ${t.value.name}`):(r.value=u.CREATE,o.setNew(l.params.id),e="Alta d'impost"),d.setMenuItem({icon:$.BUILDING,backButtonVisible:!0,text:e})};F(async()=>{await p()});const f=I(),a=async()=>{const e=t.value;let s=!1,n="";r.value===u.CREATE?(s=await o.create(e),n="Impost creat correctament"):(s=await o.update(e.id,e),n="Impost actualizat correctament"),s&&(f.add({severity:"success",summary:n,life:5e3}),T.back())};return(e,s)=>b(t)?(E(),N(L,{key:0,tax:b(t),onSubmit:a},null,8,["tax"])):B("",!0)}});export{se as default};
