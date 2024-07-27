import{d as _,j as k,r as y,h as f,c as P,e as d,i as u,n as S,z as I,l as C,a as E,F as m,g as w,v as B,u as F,C as T,o as N,k as b,m as g,P as D}from"./index-abfce291.js";import{u as R}from"./purchaseInvoiceSeries-0d49dafc.js";import{c as $,a as V,F as A}from"./form-validator-012be6a9.js";import"./index-d2d270c9.js";import"./suppliers.service-121dff3b.js";const M={key:0},U={class:"three-columns"},z=d("label",{class:"block text-900 mb-2"},"Desactivada",-1),j={class:"mt-2"},q=_({__name:"FormPurchaseInvoiceSerie",props:{purchaseInvoiceSerie:{}},emits:["submit","cancel"],setup(h,{emit:c}){const n=h,l=k(),p=$().shape({name:V().required("El nom de la sèrie és obligatori").max(50,"El nom de la sèrie no pot superar els 50 caràcters"),description:V().required("La descripció de la sèrie és obligatòria").max(250,"La descripció de la sèrie no pot superar els 50 caràcters")}),s=y({result:!1,errors:{}}),i=()=>{const e=new A(p);s.value=e.validate(n.purchaseInvoiceSerie)},v=async()=>{if(i(),s.value.result)c("submit",n.purchaseInvoiceSerie);else{let e="";Object.entries(s.value.errors).forEach(r=>{e+=`${r[1].map(a=>a)}.   `}),l.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,r)=>{const a=f("Checkbox"),t=f("Button");return e.purchaseInvoiceSerie?(E(),P("form",M,[d("div",U,[u(I,{name:"name",class:S(["mb-2",{"p-invalid":s.value.errors.name}]),label:"Nom de la sèrie",id:"name",modelValue:e.purchaseInvoiceSerie.name,"onUpdate:modelValue":r[0]||(r[0]=o=>e.purchaseInvoiceSerie.name=o)},null,8,["modelValue","class"]),u(I,{name:"description",class:S(["mb-2",{"p-invalid":s.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.purchaseInvoiceSerie.description,"onUpdate:modelValue":r[1]||(r[1]=o=>e.purchaseInvoiceSerie.description=o)},null,8,["modelValue","class"]),d("div",null,[z,u(a,{modelValue:e.purchaseInvoiceSerie.disabled,"onUpdate:modelValue":r[2]||(r[2]=o=>e.purchaseInvoiceSerie.disabled=o),class:"w-full",binary:!0},null,8,["modelValue"])])]),d("div",j,[u(t,{label:"Guardar",class:"mr-2",onClick:v})])])):C("",!0)}}}),J=_({__name:"PurchaseInvoiceSerie",setup(h){const c=y(m.EDIT),n=w(),l=B(),p=F(),s=R(),{purchaseInvoiceSerie:i}=T(s),v=async()=>{await s.fetchPurchaseInvoiceSerie(l.params.id);let a="";i.value?(c.value=m.EDIT,a=`Sèrie de facturació: ${i.value.name}`):(c.value=m.CREATE,s.setNewPurchaseInvoiceSerie(l.params.id),a="Alta de sèrie de facturació"),p.setMenuItem({icon:D.POUND,backButtonVisible:!0,title:a})};N(async()=>{await v()});const e=k(),r=async()=>{const a=i.value;let t=!1,o="";c.value===m.CREATE?(t=await s.createPurchaseInvoiceSerie(a),o="Sèrie de facturació creada correctament"):(t=await s.updatePurchaseInvoiceSerie(a.id,a),o="Sèrie de facturació actualizada correctament"),t&&(e.add({severity:"success",summary:o,life:5e3}),n.back())};return(a,t)=>b(i)?(E(),g(q,{key:0,purchaseInvoiceSerie:b(i),onSubmit:r},null,8,["purchaseInvoiceSerie"])):C("",!0)}});export{J as default};
