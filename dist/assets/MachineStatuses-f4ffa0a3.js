import{d as y,g as S,u as k,j as x,x as B,o as M,P as l,h as o,m as q,w as n,k as r,a as E,e as u,i as e,n as D}from"./index-555c6e5a.js";import{u as I}from"./plantmodel-978ee1cf.js";import{v as N}from"./v4-a960c1f4.js";import"./index-dda8c344.js";import"./base.service-fff6fc35.js";const T={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=u("span",{class:"text-xl text-900 font-bold"},"Estats de màquina",-1),R=["onClick"],G=y({__name:"MachineStatuses",setup(j){const d=S(),p=k(),a=I(),_=x(),h=B();M(async()=>{await a.fetchMachineStatuses(),p.setMenuItem({icon:l.CALENDAR,title:"Gestió d'estats de màquina"})});const f=()=>{d.push({path:`/machinestatus/${N()}`})},C=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/machinestatus/${t.data.id}`})},v=(t,i)=>{h.require({target:t.currentTarget,message:`Está segur que vol eliminar l'estat de màquina ${i.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteMachineStatus(i.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchMachineStatuses())}})};return(t,i)=>{const m=o("Button"),s=o("Column"),g=o("BooleanColumn"),w=o("DataTable");return E(),q(w,{value:r(a).machineStatuses,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:C},{header:n(()=>[u("div",T,[P,e(m,{icon:r(l).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:n(()=>[e(s,{field:"name",header:"Nom",style:{width:"25%"}}),e(s,{field:"description",header:"Descripció",style:{width:"50%"}}),e(s,{header:"Desactivat",style:{width:"10%"}},{body:n(c=>[e(g,{value:c.data.disabled},null,8,["value"])]),_:1}),e(s,null,{body:n(c=>[u("i",{class:D([r(l).TIMES,"grid_delete_column_button"]),onClick:b=>v(b,c.data)},null,10,R)]),_:1})]),_:1},8,["value"])}}});export{G as default};
