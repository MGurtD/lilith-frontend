import{d as b,g as k,u as x,j as B,x as S,o as M,P as l,h as n,m as q,w as o,k as u,a as E,e as d,i as e,n as D}from"./index-d7e0b608.js";import{u as I}from"./plantmodel-1a4fb1ac.js";import{v as N}from"./v4-a960c1f4.js";import"./base.service-1e1fcad7.js";const T={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=d("span",{class:"text-xl text-900 font-bold"},"Estats de màquina",-1),R=["onClick"],z=b({__name:"machinestatuses",setup(j){const r=k(),p=x(),a=I(),_=B(),h=S();M(async()=>{await a.fetchMachineStatuses(),p.setMenuItem({icon:l.CALENDAR,title:"Gestió d'estats de màquina"})});const f=()=>{r.push({path:`/machinestatus/${N()}`})},C=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||r.push({path:`/machinestatus/${t.data.id}`})},v=(t,i)=>{h.require({target:t.currentTarget,message:`Está segur que vol eliminar l'estat de màquina ${i.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteMachineStatus(i.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchMachineStatuses())}})};return(t,i)=>{const m=n("Button"),s=n("Column"),w=n("BooleanColumn"),g=n("DataTable");return E(),q(g,{value:u(a).machineStatuses,tableStyle:"min-width: 100%",onRowClick:C},{header:o(()=>[d("div",T,[P,e(m,{icon:u(l).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:o(()=>[e(s,{field:"name",header:"Nom",style:{width:"25%"}}),e(s,{field:"description",header:"Descripció",style:{width:"50%"}}),e(s,{header:"Desactivat",style:{width:"10%"}},{body:o(c=>[e(w,{value:c.data.disabled},null,8,["value"])]),_:1}),e(s,null,{body:o(c=>[d("i",{class:D([u(l).TIMES,"grid_delete_column_button"]),onClick:y=>v(y,c.data)},null,10,R)]),_:1})]),_:1},8,["value"])}}});export{z as default};
