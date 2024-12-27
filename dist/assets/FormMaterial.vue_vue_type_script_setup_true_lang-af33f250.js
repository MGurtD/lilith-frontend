import{d as g,r as U,o as E,h as V,c as v,e,i as a,k as m,z as I,L,a as p,s as k,j as F,m as C,l as $}from"./index-3259d18c.js";import{_ as N,a as S}from"./DropdownReferenceType.vue_vue_type_script_setup_true_lang-197dd23f.js";import{u as w}from"./tax-42893cd6.js";import{u as A}from"./reference-1e4fc38c.js";import{E as T}from"./index-15b73d09.js";import{u as D}from"./plantmodel-b960b490.js";import{R as b}from"./index-7cbe1881.js";import{a as f,c as h,d as R,F as q}from"./form-validator-74a9b5a3.js";const B={class:"three-columns"},x={class:"mt-1"},M={class:"mt-1"},O=e("label",{class:"block text-900 mb-2"},"Format",-1),P={class:"mt-1"},Y=e("label",{class:"block text-900 mb-2"},"Impost",-1),j={class:"three-columns"},z={class:"mt-1"},G=e("label",{class:"block text-900 mb-2"},"Desactivada",-1),H=g({__name:"FormReferenceMaterial",props:{reference:{}},setup(_){const n=_,i=w(),t=A(),r=U(),u=async()=>{const l=await T.Receipt.GetByReferenceId(n.reference.id);l&&(l==null?void 0:l.length)>0?r.value=!0:r.value=!1};return E(()=>{u()}),(l,s)=>{const o=V("Dropdown"),c=V("Checkbox");return p(),v(L,null,[e("section",B,[e("div",x,[a(N,{label:"Tipus de material",modelValue:n.reference.referenceTypeId,"onUpdate:modelValue":s[0]||(s[0]=d=>n.reference.referenceTypeId=d)},null,8,["modelValue"])]),e("div",M,[O,a(o,{modelValue:n.reference.referenceFormatId,"onUpdate:modelValue":s[1]||(s[1]=d=>n.reference.referenceFormatId=d),editable:"",options:m(t).referenceFormats,optionValue:"id",optionLabel:"description",class:"w-full"},null,8,["modelValue","options"])]),e("div",P,[Y,a(o,{modelValue:n.reference.taxId,"onUpdate:modelValue":s[2]||(s[2]=d=>n.reference.taxId=d),editable:"",options:m(i).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),e("section",j,[e("div",z,[a(I,{type:m(k).CURRENCY,label:"Últim cost",id:"lastCost",modelValue:l.reference.lastCost,"onUpdate:modelValue":s[3]||(s[3]=d=>l.reference.lastCost=d),disabled:r.value},null,8,["type","modelValue","disabled"])]),e("div",null,[G,a(c,{modelValue:l.reference.disabled,"onUpdate:modelValue":s[4]||(s[4]=d=>l.reference.disabled=d),binary:!0},null,8,["modelValue"])])])],64)}}}),J={class:"three-columns"},K={class:"mt-1"},Q=e("label",{class:"block text-900 mb-2"},"Impost",-1),W={class:"mt-1"},X=e("label",{class:"block text-900 mb-2"},"Àrea de producció",-1),Z=g({__name:"FormReferenceTool",props:{reference:{}},setup(_){const n=w(),i=D();return E(async()=>{n.taxes||await n.fetchAll(),await i.fetchAreas()}),(t,r)=>{const u=V("Dropdown");return p(),v("section",J,[e("div",K,[Q,a(u,{modelValue:t.reference.taxId,"onUpdate:modelValue":r[0]||(r[0]=l=>t.reference.taxId=l),editable:"",options:m(n).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),e("div",W,[X,a(u,{modelValue:t.reference.areaId,"onUpdate:modelValue":r[1]||(r[1]=l=>t.reference.areaId=l),editable:"",options:m(i).areas,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])])}}}),ee={class:"four-columns"},oe={class:"mt-1"},re={class:"mt-1"},se={class:"mt-1"},te=e("label",{class:"block text-900 mb-2"},"Impost",-1),le=e("label",{class:"block text-900 mb-2"},"Desactivada",-1),ae=g({__name:"FormReferenceService",props:{reference:{}},emits:["submit","cancel"],setup(_,{emit:n}){const i=w();return E(async()=>{i.taxes||await i.fetchAll()}),(t,r)=>{const u=V("Dropdown"),l=V("Checkbox");return p(),v("section",ee,[e("div",oe,[a(I,{type:m(k).CURRENCY,label:"Preu servei",modelValue:t.reference.price,"onUpdate:modelValue":r[0]||(r[0]=s=>t.reference.price=s)},null,8,["type","modelValue"])]),e("div",re,[a(I,{type:m(k).CURRENCY,label:"Preu transport",modelValue:t.reference.transportAmount,"onUpdate:modelValue":r[1]||(r[1]=s=>t.reference.transportAmount=s)},null,8,["type","modelValue"])]),e("div",se,[te,a(u,{modelValue:t.reference.taxId,"onUpdate:modelValue":r[2]||(r[2]=s=>t.reference.taxId=s),editable:"",options:m(i).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),e("div",null,[le,a(l,{modelValue:t.reference.disabled,"onUpdate:modelValue":r[3]||(r[3]=s=>t.reference.disabled=s),binary:!0},null,8,["modelValue"])])])}}}),ne=e("br",null,null,-1),ie={key:0},de={class:"three-columns"},ce={class:"mt-1"},me={class:"mt-1"},ue={class:"mt-1"},$e=g({__name:"FormMaterial",props:{reference:{}},emits:["submit"],setup(_,{emit:n}){const i=_,t=F(),r={code:f().required("El codi és obligatoria").max(50,"El codi no pot superar els 50 carácters"),description:f().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")},u=U({result:!1,errors:{}}),l=()=>{let o={};i.reference.categoryName===b.MATERIAL?o=h().shape({...r,taxId:f().required("L'IVA és obligatori"),referenceTypeId:f().required("El tipus de referència és obligatori"),referenceFormatId:f().required("El format és obligatori")}):i.reference.categoryName===b.SERVICE?o=h().shape({...r,price:R().required("El preu és obligatori"),transportAmount:R().required("El preu de transport és obligatori")}):i.reference.categoryName===b.TOOL&&(o=h().shape({...r,areaId:f().required("L'àrea és obligatoria"),taxId:f().required("L'IVA és obligatori")}));const c=new q(o);u.value=c.validate(i.reference)},s=async()=>{if(l(),u.value.result)n("submit",i.reference);else{let o="";Object.entries(u.value.errors).forEach(c=>{o+=`${c[1].map(d=>d)}.   `}),t.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,c)=>{const d=V("Button");return p(),v(L,null,[e("div",null,[a(d,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:s}),ne]),o.reference?(p(),v("form",ie,[e("section",de,[e("div",ce,[a(I,{class:"mb-2",label:"Codi",id:"code",modelValue:o.reference.code,"onUpdate:modelValue":c[0]||(c[0]=y=>o.reference.code=y)},null,8,["modelValue"])]),e("div",me,[a(I,{class:"mb-2",label:"Descripció",id:"description",modelValue:o.reference.description,"onUpdate:modelValue":c[1]||(c[1]=y=>o.reference.description=y)},null,8,["modelValue"])]),e("div",ue,[a(S,{label:"Categoria",modelValue:o.reference.categoryName,"onUpdate:modelValue":c[2]||(c[2]=y=>o.reference.categoryName=y),disabled:""},null,8,["modelValue"])])]),o.reference.categoryName===m(b).MATERIAL?(p(),C(H,{key:0,reference:o.reference},null,8,["reference"])):$("",!0),o.reference.categoryName===m(b).TOOL?(p(),C(Z,{key:1,reference:o.reference},null,8,["reference"])):$("",!0),o.reference.categoryName===m(b).SERVICE?(p(),C(ae,{key:2,reference:o.reference},null,8,["reference"])):$("",!0)])):$("",!0)],64)}}});export{$e as _};