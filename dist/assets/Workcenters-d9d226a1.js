import{d as S,g as N,u as W,j as A,x as E,o as L,P as m,r as q,H as M,h as u,m as R,w as c,a as P,e as r,i as n,k as p,C as _,D as w,n as j}from"./index-61ceac46.js";import{u as H}from"./plantmodel-e5258ecb.js";import{v as U}from"./v4-a960c1f4.js";import"./index-5c7caccd.js";import"./base.service-558553c0.js";const $={class:"flex flex-wrap align-items-center justify-content-between gap-2"},F={class:"datatable-filter"},z={class:"filter-field"},G=r("label",{class:"block text-900 mb-2"},"Tipus",-1),J={class:"filter-field"},K=r("label",{class:"block text-900 mb-2"},"Àrea",-1),O={class:"datatable-buttons"},Q=["onClick"],ae=S({__name:"Workcenters",setup(X){const f=N(),k=W(),v=A(),y=E(),o=H();L(async()=>{await o.fetchWorkcenters(),await o.fetchWorkcenterTypes(),await o.fetchAreas(),k.setMenuItem({icon:m.CALENDAR,title:"Gestió de màquines"})});const s=q({areaId:void 0,workcenterTypeId:void 0}),h=M(()=>{if(!o.workcenters)return[];let t=o.workcenters;return s.value.areaId&&(t=t.filter(e=>e.areaId===s.value.areaId)),s.value.workcenterTypeId&&(t=t.filter(e=>e.workcenterTypeId===s.value.workcenterTypeId)),t}),b=()=>{s.value.areaId=void 0,s.value.workcenterTypeId=void 0},I=t=>{var l;const e=(l=o.areas)==null?void 0:l.find(i=>i.id===t);return e?e.name:""},T=t=>{var l;const e=(l=o.workcenterTypes)==null?void 0:l.find(i=>i.id===t);return e?e.name:""},C=()=>{f.push({path:`/workcenter/${U()}`})},g=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||f.push({path:`/workcenter/${t.data.id}`})},B=(t,e)=>{y.require({target:t.currentTarget,message:`Está segur que vol eliminar la màquina ${e.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await o.deleteWorkcenter(e.id)&&(v.add({severity:"success",summary:"Eliminat",life:3e3}),await o.fetchWorkcenters())}})};return(t,e)=>{const l=u("Dropdown"),i=u("Button"),d=u("Column"),V=u("BooleanColumn"),D=u("DataTable");return P(),R(D,{value:h.value,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",onRowClick:g},{header:c(()=>[r("div",$,[r("div",F,[r("div",z,[G,n(l,{modelValue:s.value.workcenterTypeId,"onUpdate:modelValue":e[0]||(e[0]=a=>s.value.workcenterTypeId=a),editable:"",options:p(o).workcenterTypes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),r("div",J,[K,n(l,{modelValue:s.value.areaId,"onUpdate:modelValue":e[1]||(e[1]=a=>s.value.areaId=a),editable:"",options:p(o).areas,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),r("div",O,[n(i,{class:"datatable-button mr-2",icon:p(m).FILTER_SLASH,rounded:"",raised:"",onClick:b},null,8,["icon"]),n(i,{icon:p(m).PLUS,rounded:"",raised:"",onClick:C},null,8,["icon"])])])]),default:c(()=>[n(d,{field:"name",header:"Nom",style:{width:"20%"}}),n(d,{field:"description",header:"Descripció",style:{width:"40%"}}),n(d,{header:"Tipus",style:{width:"15%"}},{body:c(a=>[_(w(T(a.data.workcenterTypeId)),1)]),_:1}),n(d,{header:"Area",style:{width:"15%"}},{body:c(a=>[_(w(I(a.data.areaId)),1)]),_:1}),n(d,{header:"Desactivat",style:{width:"10%"}},{body:c(a=>[n(V,{value:a.data.disabled},null,8,["value"])]),_:1}),n(d,null,{body:c(a=>[r("i",{class:j([p(m).TIMES,"grid_delete_column_button"]),onClick:x=>B(x,a.data)},null,10,Q)]),_:1})]),_:1},8,["value"])}}});export{ae as default};
