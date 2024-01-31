import{d as A,o as E,j as I,z as x,r as B,h as _,k as s,c as L,e as i,i as m,n as V,y,l as C,a as h,F as u,v as N,u as S,m as g,P as M,L as U}from"./index-61ceac46.js";import{c as $,a as w,F as R}from"./form-validator-f8953ae6.js";import{u as F}from"./plantmodel-e5258ecb.js";import"./_commonjsHelpers-725317a4.js";import"./index-5c7caccd.js";import"./base.service-558553c0.js";const q={key:0},z={class:"two-columns"},P={class:"two-columns"},j=i("label",{class:"block text-900 mb-2"},"Local",-1),G=i("label",{class:"block text-900 mb-2"},"Desactivat",-1),O={class:"mt-2"},H=A({__name:"FormArea",props:{area:{}},emits:["submit","cancel"],setup(k,{emit:c}){const d=k;E(async()=>{await l.fetchSites()});const p=I(),l=F(),{area:e}=x(l),b=$().shape({name:w().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:w().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),siteId:w().required("El local es obligatori")}),r=B({result:!1,errors:{}}),v=()=>{const o=new R(b);r.value=o.validate(d.area)},t=async()=>{if(v(),r.value.result)c("submit",d.area);else{let o="";Object.entries(r.value.errors).forEach(a=>{o+=`${a[1].map(f=>f)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,a)=>{const f=_("Dropdown"),D=_("Checkbox"),T=_("Button");return s(e)?(h(),L("form",q,[i("section",z,[m(y,{class:V(["mb-2",{"p-invalid":r.value.errors.name}]),label:"Nom",id:"name",modelValue:s(e).name,"onUpdate:modelValue":a[0]||(a[0]=n=>s(e).name=n)},null,8,["modelValue","class"]),m(y,{class:V(["mb-2",{"p-invalid":r.value.errors.description}]),label:"Descripció",id:"description",modelValue:s(e).description,"onUpdate:modelValue":a[1]||(a[1]=n=>s(e).description=n)},null,8,["modelValue","class"])]),i("section",P,[i("div",null,[j,m(f,{modelValue:s(e).siteId,"onUpdate:modelValue":a[2]||(a[2]=n=>s(e).siteId=n),editable:"",options:s(l).sites,optionValue:"id",optionLabel:"name",class:V(["w-full",{"p-invalid":r.value.errors.siteId}])},null,8,["modelValue","options","class"])]),i("div",null,[G,m(D,{modelValue:s(e).disabled,"onUpdate:modelValue":a[3]||(a[3]=n=>s(e).disabled=n),class:"w-full",binary:!0},null,8,["modelValue"])])]),i("div",O,[m(T,{label:"Guardar",class:"mr-2",onClick:t})])])):C("",!0)}}}),Z=A({__name:"Area",setup(k){const c=B(u.EDIT),d=N(),p=S(),l=F(),{area:e}=x(l),b=async()=>{await l.fetchArea(d.params.id);let t="";e.value?(c.value=u.EDIT,t=`Area ${e.value.name}`):(c.value=u.CREATE,l.setNewArea(d.params.id),t="Alta d'area"),p.setMenuItem({icon:M.BUILDING,backButtonVisible:!0,title:t})};E(async()=>{await b()});const r=I(),v=async()=>{const t=e.value;let o=!1,a="";c.value===u.CREATE?(o=await l.createArea(t),a="Area creada correctament"):(o=await l.updateArea(t.id,t),a="Area actualizada correctament"),o&&(r.add({severity:"success",summary:a,life:5e3}),U.back())};return(t,o)=>s(e)?(h(),g(H,{key:0,area:s(e),onSubmit:v},null,8,["area"])):C("",!0)}});export{Z as default};
