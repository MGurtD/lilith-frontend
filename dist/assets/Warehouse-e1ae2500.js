import{d as x,j as U,o as B,r as I,h as f,a as g,c as D,e as n,i as s,n as V,y as $,l as T,E as O,x as H,F as v,w as k,G as A,k as a,P as S,m as F,z as R,u as J,v as K,g as Q}from"./index-8f350042.js";import{u as z}from"./warehouse-def799da.js";import{g as X}from"./functions-2e154ea4.js";import{c as N,a as L,F as q}from"./form-validator-f8953ae6.js";import{u as M}from"./plantmodel-ce1cde64.js";import"./index-e27054ea.js";import"./base.service-642755fa.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-d6682b3e.js";const Y={key:0},Z={class:"three-columns"},ee=n("label",{class:"block text-900 mb-2"},"Desactivat",-1),oe={class:"pt-4"},ae=x({__name:"FormLocation",props:{location:{}},emits:["submit","cancel"],setup(E,{emit:b}){const _=E,r=U(),h=M();B(async()=>{await h.fetchSites()});const l=N().shape({name:L().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:L().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")}),o=I({result:!1,errors:{}}),w=()=>{const t=new q(l);o.value=t.validate(_.location)},c=async()=>{if(w(),o.value.result)b("submit",_.location);else{let t="";Object.entries(o.value.errors).forEach(u=>{t+=`${u[1].map(p=>p)}.   `}),r.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,u)=>{const p=f("Checkbox"),i=f("Button");return t.location?(g(),D("form",Y,[n("section",Z,[s($,{class:V(["mb-2",{"p-invalid":o.value.errors.name}]),label:"Nom",id:"name",modelValue:t.location.name,"onUpdate:modelValue":u[0]||(u[0]=e=>t.location.name=e)},null,8,["modelValue","class"]),s($,{class:V(["mb-2",{"p-invalid":o.value.errors.description}]),label:"Descripció",id:"description",modelValue:t.location.description,"onUpdate:modelValue":u[1]||(u[1]=e=>t.location.description=e)},null,8,["modelValue","class"]),n("div",null,[ee,s(p,{modelValue:t.location.disabled,"onUpdate:modelValue":u[2]||(u[2]=e=>t.location.disabled=e),class:"w-full",binary:!0},null,8,["modelValue"])])]),n("div",oe,[s(i,{label:"Guardar",size:"small",style:{float:"right"},onClick:c})])])):T("",!0)}}}),te={class:"flex flex-wrap align-items-center justify-content-between gap-2"},se=n("span",{class:"text-xl text-900 font-bold"},"Ubicacions",-1),le=["onClick"],ie=x({__name:"TableLocations",props:{warehouse:{},locations:{}},emits:["add","edit","delete"],setup(E,{emit:b}){const _=E,r=O({visible:!1,title:"Ubicació",closable:!0,position:"center",modal:!0}),h=H(),l=I(void 0),o=I(v.CREATE),w=()=>{t(v.CREATE,{id:X(),warehouseId:_.warehouse.id,disabled:!1,name:"",description:""})},c=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||t(v.EDIT,e.data)},t=(e,d)=>{o.value=e,l.value=d,r.visible=!0,r.title=e===v.CREATE?"Crear ubicació":"Actualitzar"},u=e=>{o.value===v.CREATE?b("add",e):o.value===v.EDIT&&b("edit",e),r.visible=!1},p=()=>{l.value=void 0},i=(e,d)=>{h.require({target:e.currentTarget,message:`Está segur que vol eliminar la ubicació '${d.name}'?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{b("delete",d)}})};return(e,d)=>{const y=f("Button"),m=f("Column"),W=f("BooleanColumn"),j=f("DataTable"),G=f("Dialog");return g(),D(A,null,[n("main",null,[s(j,{onRowClick:c,value:e.locations,tableStyle:"min-width: 100%"},{header:k(()=>[n("div",te,[se,s(y,{icon:a(S).PLUS,rounded:"",raised:"",onClick:w},null,8,["icon"])])]),default:k(()=>[s(m,{field:"name",header:"Nom",style:{width:"25%"}}),s(m,{field:"description",header:"Descripció",style:{width:"60%"}}),s(m,{header:"Desactivada",style:{width:"10%"}},{body:k(C=>[s(W,{value:C.data.disabled},null,8,["value"])]),_:1}),s(m,{style:{width:"10%"}},{body:k(C=>[n("i",{class:V([a(S).TIMES,"grid_delete_column_button"]),onClick:P=>i(P,C.data)},null,10,le)]),_:1})]),_:1},8,["value"])]),s(G,{visible:r.visible,"onUpdate:visible":d[0]||(d[0]=C=>r.visible=C),header:r.title,closable:r.closable,modal:r.modal,onHide:p},{default:k(()=>[l.value?(g(),F(ae,{key:0,location:l.value,onSubmit:u},null,8,["location"])):T("",!0)]),_:1},8,["visible","header","closable","modal"])],64)}}}),ne={key:0},re={class:"pb-4"},ce={class:"two-columns"},de={class:"three-columns"},ue=n("label",{class:"block text-900 mb-2"},"Local",-1),me=n("label",{class:"block text-900 mb-2"},"Ubicació predeterminada",-1),pe=n("label",{class:"block text-900 mb-2"},"Desactivat",-1),be=x({__name:"FormWarehouse",props:{warehouse:{}},emits:["submit","cancel"],setup(E,{emit:b}){const _=E,r=U(),h=z(),l=M(),{warehouse:o}=R(h);B(async()=>{await l.fetchSites()});const w=N().shape({name:L().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:L().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),siteId:L().required("El local es obligatori")}),c=I({result:!1,errors:{}}),t=()=>{const p=new q(w);c.value=p.validate(_.warehouse)},u=async()=>{if(t(),c.value.result)b("submit",_.warehouse);else{let p="";Object.entries(c.value.errors).forEach(i=>{p+=`${i[1].map(e=>e)}.   `}),r.add({severity:"warn",summary:"Formulari inválid",detail:p,life:5e3})}};return(p,i)=>{const e=f("Button"),d=f("Dropdown"),y=f("Checkbox");return a(o)?(g(),D("form",ne,[n("div",re,[s(e,{label:"Guardar",size:"small",class:"grid_add_row_button",onClick:u})]),n("section",ce,[s($,{class:V(["mb-2",{"p-invalid":c.value.errors.name}]),label:"Nom",id:"name",modelValue:a(o).name,"onUpdate:modelValue":i[0]||(i[0]=m=>a(o).name=m)},null,8,["modelValue","class"]),s($,{class:V(["mb-2",{"p-invalid":c.value.errors.description}]),label:"Descripció",id:"description",modelValue:a(o).description,"onUpdate:modelValue":i[1]||(i[1]=m=>a(o).description=m)},null,8,["modelValue","class"])]),n("section",de,[n("div",null,[ue,s(d,{modelValue:a(o).siteId,"onUpdate:modelValue":i[2]||(i[2]=m=>a(o).siteId=m),editable:"",options:a(l).sites,optionValue:"id",optionLabel:"name",class:V(["w-full",{"p-invalid":c.value.errors.siteId}])},null,8,["modelValue","options","class"])]),n("div",null,[me,s(d,{modelValue:a(o).defaultLocationId,"onUpdate:modelValue":i[3]||(i[3]=m=>a(o).defaultLocationId=m),editable:"",options:a(o).locations,optionValue:"id",optionLabel:"name",class:V(["w-full",{"p-invalid":c.value.errors.defaultLocationId}])},null,8,["modelValue","options","class"])]),n("div",null,[pe,s(y,{modelValue:a(o).disabled,"onUpdate:modelValue":i[4]||(i[4]=m=>a(o).disabled=m),class:"w-full",binary:!0},null,8,["modelValue"])])])])):T("",!0)}}}),ve={key:0,class:"mt-5"},Le=x({__name:"Warehouse",setup(E){const b=I(v.EDIT),_=J(),r=K(),h=Q(),l=z(),{warehouse:o}=R(l),w=async()=>{await l.fetchWarehouse(r.params.id);let e="";o.value?(b.value=v.EDIT,e=`Magatzem ${o.value.name}`):(b.value=v.CREATE,l.setNewWarehouse(r.params.id),e="Alta de magatzem"),_.setMenuItem({icon:S.BUILDING,backButtonVisible:!0,title:e})};B(async()=>{await w()});const c=U(),t=async()=>{const e=o.value;let d=!1,y="";if(b.value===v.CREATE)e.defaultLocationId=null,d=await l.createWarehouse(e),y="Magatzem creat correctament";else{if(!e.defaultLocationId){c.add({severity:"warn",summary:"Seleccioni una ubicació per defecte",life:5e3});return}d=await l.updateWarehouse(e.id,e),y="Magatzem actualizat correctament"}d&&(c.add({severity:"success",summary:y,life:5e3}),b.value===v.EDIT&&h.back())},u=e=>{l.createLocation(e)},p=e=>{l.updateLocation(e.id,e)},i=e=>{if(o.value&&e.id===o.value.defaultLocationId){c.add({severity:"warn",summary:"Ubicació amb dependencies",detail:"La ubicació que intenta eliminar és la ubicació per defecte del magatzem",life:6e3});return}l.deleteLocation(e.id)};return(e,d)=>(g(),D(A,null,[n("header",null,[a(o)?(g(),F(be,{key:0,warehouse:a(o),onSubmit:t},null,8,["warehouse"])):T("",!0)]),a(o)?(g(),D("section",ve,[s(ie,{warehouse:a(o),locations:a(o).locations,onAdd:u,onEdit:p,onDelete:i},null,8,["warehouse","locations"])])):T("",!0)],64))}});export{Le as default};
