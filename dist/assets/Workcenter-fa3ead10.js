import{F as L}from"./FileEntityPicker-2cb33368.js";import{d as E,j as x,C as g,r as F,h as I,k as e,c as q,e as a,i as c,n as b,z as T,l as C,a as y,F as k,v as S,u as D,o as U,m as W,L as N,P as $,V as A}from"./index-709c40c8.js";import{c as P,a as f,F as R}from"./form-validator-6d089293.js";import{u as B}from"./plantmodel-06593ba6.js";import{u as z}from"./shift-1c766d99.js";import"./index-5492b314.js";const j={key:0},G={class:"grid_add_row_button"},O={class:"three-columns mb-2"},H=a("label",{class:"block text-900 mb-2"},"Desactivat",-1),J={class:"three-columns"},K=a("label",{class:"block text-900 mb-2"},"Tipus",-1),Q=a("label",{class:"block text-900 mb-2"},"Area",-1),X=a("label",{class:"block text-900 mb-2"},"Torn",-1),Y=E({__name:"FormWorkcenter",props:{workcenter:{}},emits:["submit","cancel"],setup(h,{emit:p}){const u=h,v=x(),n=B(),d=z(),{workcenter:o}=g(n),V=P().shape({name:f().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:f().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),workcenterTypeId:f().required("El tipus es obligatori"),areaId:f().required("L'area es obligatoria"),shiftId:f().required("El torn es obligatori")}),l=F({result:!1,errors:{}}),r=()=>{const i=new R(V);l.value=i.validate(u.workcenter)},m=async()=>{if(r(),l.value.result)p("submit",u.workcenter);else{let i="";Object.entries(l.value.errors).forEach(t=>{i+=`${t[1].map(_=>_)}.   `}),v.add({severity:"warn",summary:"Formulari inválid",detail:i,life:5e3})}};return(i,t)=>{const _=I("Button"),M=I("Checkbox"),w=I("Dropdown");return e(o)?(y(),q("form",j,[a("div",G,[c(_,{label:"Guardar",style:{float:"right"},onClick:m})]),a("section",O,[c(T,{label:"Nom",id:"name",modelValue:e(o).name,"onUpdate:modelValue":t[0]||(t[0]=s=>e(o).name=s),class:b({"p-invalid":l.value.errors.name})},null,8,["modelValue","class"]),c(T,{label:"Descripció",id:"description",modelValue:e(o).description,"onUpdate:modelValue":t[1]||(t[1]=s=>e(o).description=s),class:b({"p-invalid":l.value.errors.description})},null,8,["modelValue","class"]),a("div",null,[H,c(M,{modelValue:e(o).disabled,"onUpdate:modelValue":t[2]||(t[2]=s=>e(o).disabled=s),class:"w-full",binary:!0},null,8,["modelValue"])])]),a("section",J,[a("div",null,[K,c(w,{modelValue:e(o).workcenterTypeId,"onUpdate:modelValue":t[3]||(t[3]=s=>e(o).workcenterTypeId=s),editable:"",options:e(n).workcenterTypes,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":l.value.errors.workcenterTypeId}])},null,8,["modelValue","options","class"])]),a("div",null,[Q,c(w,{modelValue:e(o).areaId,"onUpdate:modelValue":t[4]||(t[4]=s=>e(o).areaId=s),editable:"",options:e(n).areas,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":l.value.errors.areaId}])},null,8,["modelValue","options","class"])]),a("div",null,[X,c(w,{modelValue:e(o).shiftId,"onUpdate:modelValue":t[5]||(t[5]=s=>e(o).shiftId=s),editable:"",options:e(d).shifts,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":l.value.errors.shiftId}])},null,8,["modelValue","options","class"])])])])):C("",!0)}}}),Z={class:"mt-4"},re=E({__name:"Workcenter",setup(h){const p=F(k.EDIT),u=S(),v=D(),n=B(),{workcenter:d}=g(n),o=async()=>{await n.fetchWorkcenter(u.params.id);let r="";d.value?(p.value=k.EDIT,r=`Màquina: ${d.value.name}`):(p.value=k.CREATE,n.setNewWorkcenter(u.params.id),r="Alta de màquina"),v.setMenuItem({icon:$.BUILDING,backButtonVisible:!0,title:r})};U(async()=>{await o()});const V=x(),l=async()=>{const r=d.value;let m=!1,i="";p.value===k.CREATE?(m=await n.createWorkcenter(r),i="Màquina creada correctament"):(m=await n.updateWorkcenter(r.id,r),i="Màquina actualizada correctament"),m&&(V.add({severity:"success",summary:i,life:5e3}),A.back())};return(r,m)=>(y(),q(N,null,[e(d)?(y(),W(Y,{key:0,workcenter:e(d),onSubmit:l},null,8,["workcenter"])):C("",!0),a("section",Z,[c(L,{title:"Imatge de la màquina",entity:"WorkcenterPicture","max-files":1,id:e(u).params.id},null,8,["id"])])],64))}});export{re as default};