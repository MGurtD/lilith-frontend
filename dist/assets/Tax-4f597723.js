import{d as _,j as g,r as k,h as x,c as T,e as i,i as u,n as V,y,k as v,l as E,a as I,s as w,F as d,u as B,v as C,g as h,z as F,o as N,m as $,P as R}from"./index-d7e0b608.js";import{u as M}from"./tax-4e0346ff.js";import{c as U,a as q,d as A,b as D,F as z}from"./form-validator-788c4f60.js";import"./index-49481bdd.js";import"./base.service-1e1fcad7.js";const P={key:0},S={class:"two-columns"},j=i("label",{class:"block text-900 mb-2"},"Desactivada",-1),G={class:"mt-2"},L=_({__name:"FormTax",props:{tax:{}},emits:["submit","cancel"],setup(f,{emit:n}){const c=f,m=g(),p=U().shape({name:q().required("El nom és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),percentatge:A().required("La freqüència és obligatoria"),disabled:D().required("El camp deshabilitat és obligatori")}),t=k({result:!1,errors:{}}),l=()=>{const e=new z(p);t.value=e.validate(c.tax)},b=async()=>{if(l(),t.value.result)n("submit",c.tax);else{let e="";Object.entries(t.value.errors).forEach(s=>{e+=`${s[1].map(a=>a)}.   `}),m.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,s)=>{const a=x("Checkbox"),r=x("Button");return e.tax?(I(),T("form",P,[i("div",S,[u(y,{class:V(["mb-2",{"p-invalid":t.value.errors.name}]),label:"Nom",id:"name",modelValue:e.tax.name,"onUpdate:modelValue":s[0]||(s[0]=o=>e.tax.name=o)},null,8,["modelValue","class"]),u(y,{type:v(w).NUMERIC,label:"Percentatge",id:"percentatge",modelValue:e.tax.percentatge,"onUpdate:modelValue":s[1]||(s[1]=o=>e.tax.percentatge=o),class:V({"p-invalid":t.value.errors.percentatge})},null,8,["type","modelValue","class"])]),i("div",null,[i("div",null,[j,u(a,{modelValue:e.tax.disabled,"onUpdate:modelValue":s[2]||(s[2]=o=>e.tax.disabled=o),class:"w-full",binary:!0},null,8,["modelValue"])])]),i("div",G,[u(r,{label:"Guardar",onClick:b})])])):E("",!0)}}}),W=_({__name:"Tax",setup(f){const n=k(d.EDIT),c=B(),m=C(),p=h(),t=M(),{tax:l}=F(t),b=async()=>{await t.fetchOne(m.params.id);let a="";l.value?(n.value=d.EDIT,a=`Impost ${l.value.name}`):(n.value=d.CREATE,t.setNew(m.params.id),a="Alta d'impost"),c.setMenuItem({icon:R.BUILDING,backButtonVisible:!0,title:a})};N(async()=>{await b()});const e=g(),s=async()=>{const a=l.value;let r=!1,o="";n.value===d.CREATE?(r=await t.create(a),o="Impost creat correctament"):(r=await t.update(a.id,a),o="Impost actualizat correctament"),r&&(e.add({severity:"success",summary:o,life:5e3}),p.back())};return(a,r)=>v(l)?(I(),$(L,{key:0,tax:v(l),onSubmit:s},null,8,["tax"])):E("",!0)}});export{W as default};
