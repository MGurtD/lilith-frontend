import{d as V,o as E,j as h,z as B,r as C,h as v,k as o,c as q,e as d,i as m,n as _,y as T,l as x,a as F,F as u,v as M,u as N,m as D,P as S,L as $}from"./index-61ceac46.js";import{c as g,a as w,F as A}from"./form-validator-f8953ae6.js";import{u as I}from"./plantmodel-e5258ecb.js";import"./_commonjsHelpers-725317a4.js";import"./index-5c7caccd.js";import"./base.service-558553c0.js";const L={key:0},R={class:"three-columns"},U=d("label",{class:"block text-900 mb-2"},"Desactivat",-1),z={class:"mt-2"},P=V({__name:"FormWorkcenterType",props:{workcentertype:{}},emits:["submit","cancel"],setup(b,{emit:l}){const c=b;E(async()=>{await r.fetchWorkcenterTypes()});const p=h(),r=I(),{workcenterType:e}=B(r),y=g().shape({name:w().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:w().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")}),n=C({result:!1,errors:{}}),k=()=>{const s=new A(y);n.value=s.validate(c.workcentertype)},a=async()=>{if(k(),n.value.result)l("submit",c.workcentertype);else{let s="";Object.entries(n.value.errors).forEach(t=>{s+=`${t[1].map(f=>f)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,t)=>{const f=v("Checkbox"),W=v("Button");return o(e)?(F(),q("form",L,[d("section",R,[m(T,{class:_(["mb-2",{"p-invalid":n.value.errors.name}]),label:"Nom",id:"name",modelValue:o(e).name,"onUpdate:modelValue":t[0]||(t[0]=i=>o(e).name=i)},null,8,["modelValue","class"]),m(T,{class:_(["mb-2",{"p-invalid":n.value.errors.description}]),label:"Descripció",id:"description",modelValue:o(e).description,"onUpdate:modelValue":t[1]||(t[1]=i=>o(e).description=i)},null,8,["modelValue","class"]),d("div",null,[U,m(f,{modelValue:o(e).disabled,"onUpdate:modelValue":t[2]||(t[2]=i=>o(e).disabled=i),class:"w-full",binary:!0},null,8,["modelValue"])])]),d("div",z,[m(W,{label:"Guardar",class:"mr-2",onClick:a})])])):x("",!0)}}}),Q=V({__name:"WorkcenterType",setup(b){const l=C(u.EDIT),c=M(),p=N(),r=I(),{workcenterType:e}=B(r),y=async()=>{await r.fetchWorkcenterType(c.params.id);let a="";e.value?(l.value=u.EDIT,a=`Tipus de màquina: ${e.value.name}`):(l.value=u.CREATE,r.setNewWorkcenterType(c.params.id),a="Alta de tipus de màquina"),p.setMenuItem({icon:S.BUILDING,backButtonVisible:!0,title:a})};E(async()=>{await y()});const n=h(),k=async()=>{const a=e.value;let s=!1,t="";l.value===u.CREATE?(s=await r.createWorkcenterType(a),t="Tipus de màquina creat correctament"):(s=await r.updateWorkcenterType(a.id,a),t="Tipus de màquina actualizat correctament"),s&&(n.add({severity:"success",summary:t,life:5e3}),$.back())};return(a,s)=>o(e)?(F(),D(P,{key:0,workcentertype:o(e),onSubmit:k},null,8,["workcentertype"])):x("",!0)}});export{Q as default};
