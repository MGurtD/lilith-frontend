import{d as E,o as y,j as C,z as M,r as w,h as _,k as t,c as T,e as i,i as m,n as h,y as k,l as x,a as B,F as d,v as N,u as g,m as D,P,L as U}from"./index-8f350042.js";import{c as $,a as S,F as A}from"./form-validator-f8953ae6.js";import{u as F}from"./plantmodel-ce1cde64.js";import"./_commonjsHelpers-725317a4.js";import"./index-d6682b3e.js";import"./base.service-642755fa.js";const L={key:0},R={class:"four-columns"},z=i("label",{class:"block text-900 mb-2"},"Color",-1),j=i("label",{class:"block text-900 mb-2"},"Desactivat",-1),G={class:"mt-2"},O=E({__name:"FormMachineStatus",props:{machineStatus:{}},emits:["submit","cancel"],setup(V,{emit:c}){const u=V;y(async()=>{await l.fetchMachineStatuses()});const p=C(),l=F(),{machineStatus:e}=M(l),b=$().shape({name:S().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:S().required("La descripció és obligatoria").max(250,"La descripció pot superar els 250 carácters"),color:S().required("El color es obligatori")}),r=w({result:!1,errors:{}}),v=()=>{const o=new A(b);r.value=o.validate(u.machineStatus)},s=async()=>{if(v(),r.value.result)c("submit",u.machineStatus);else{let o="";Object.entries(r.value.errors).forEach(a=>{o+=`${a[1].map(f=>f)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,a)=>{const f=_("ColorPicker"),q=_("Checkbox"),I=_("Button");return t(e)?(B(),T("form",L,[i("section",R,[m(k,{class:h(["mb-2",{"p-invalid":r.value.errors.name}]),label:"Nom",id:"name",modelValue:t(e).name,"onUpdate:modelValue":a[0]||(a[0]=n=>t(e).name=n)},null,8,["modelValue","class"]),m(k,{class:h(["mb-2",{"p-invalid":r.value.errors.description}]),label:"Descripció",id:"description",modelValue:t(e).description,"onUpdate:modelValue":a[1]||(a[1]=n=>t(e).description=n)},null,8,["modelValue","class"]),i("div",null,[z,m(f,{modelValue:t(e).color,"onUpdate:modelValue":a[2]||(a[2]=n=>t(e).color=n),class:h(["mb-2",{"p-invalid":r.value.errors.color}]),label:"Color",id:"color"},null,8,["modelValue","class"])]),i("div",null,[j,m(q,{modelValue:t(e).disabled,"onUpdate:modelValue":a[3]||(a[3]=n=>t(e).disabled=n),class:"w-full",binary:!0},null,8,["modelValue"])])]),i("div",G,[m(I,{label:"Guardar",class:"mr-2",onClick:s})])])):x("",!0)}}}),Y=E({__name:"MachineStatus",setup(V){const c=w(d.EDIT),u=N(),p=g(),l=F(),{machineStatus:e}=M(l),b=async()=>{await l.fetchMachineStatus(u.params.id);let s="";e.value?(c.value=d.EDIT,s=`Estat de màquina ${e.value.name}`):(c.value=d.CREATE,l.setNewMachineStatus(u.params.id),s="Alta d'estat de màquina"),p.setMenuItem({icon:P.BUILDING,backButtonVisible:!0,title:s})};y(async()=>{await b()});const r=C(),v=async()=>{const s=e.value;let o=!1,a="";c.value===d.CREATE?(o=await l.createMachineStatus(s),a="Estat de màquina creat correctament"):(o=await l.updateMachineStatus(s.id,s),a="Estat de màquina actualizat correctament"),o&&(r.add({severity:"success",summary:a,life:5e3}),U.back())};return(s,o)=>t(e)?(B(),D(O,{key:0,machineStatus:t(e),onSubmit:v},null,8,["machineStatus"])):x("",!0)}});export{Y as default};
