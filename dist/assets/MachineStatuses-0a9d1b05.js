import{d as g,g as S,u as k,j as x,x as B,o as M,P as d,h as i,m as q,w as s,k as u,a as E,e as r,i as e,n as T,y as D}from"./index-abfce291.js";import{u as I}from"./plantmodel-fca63037.js";import"./index-0d9d6b22.js";const N={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=r("span",{class:"text-xl text-900 font-bold"},"Estats de màquina",-1),A=["onClick"],V=g({__name:"MachineStatuses",setup(R){const m=S(),p=k(),l=I(),_=x(),f=B();M(async()=>{await l.fetchMachineStatuses(),p.setMenuItem({icon:d.CALENDAR,title:"Gestió d'estats de màquina"})});const v=()=>{m.push({path:`/machinestatus/${D()}`})},y=o=>{o.originalEvent.target.className.includes("grid_delete_column_button")||m.push({path:`/machinestatus/${o.data.id}`})},w=(o,c)=>{f.require({target:o.currentTarget,message:`Está segur que vol eliminar l'estat de màquina ${c.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await l.deleteMachineStatus(c.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await l.fetchMachineStatuses())}})};return(o,c)=>{const h=i("Button"),a=i("Column"),n=i("BooleanColumn"),b=i("DataTable");return E(),q(b,{value:u(l).machineStatuses,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:y},{header:s(()=>[r("div",N,[P,e(h,{icon:u(d).PLUS,rounded:"",raised:"",onClick:v},null,8,["icon"])])]),default:s(()=>[e(a,{field:"name",header:"Nom",style:{width:"25%"}}),e(a,{field:"description",header:"Descripció",style:{width:"40%"}}),e(a,{header:"Aturada",style:{width:"2%"}},{body:s(t=>[e(n,{value:t.data.stoped},null,8,["value"])]),_:1}),e(a,{header:"Operaris",style:{width:"2%"}},{body:s(t=>[e(n,{value:t.data.operatorsAllowed},null,8,["value"])]),_:1}),e(a,{header:"Tancada",style:{width:"2%"}},{body:s(t=>[e(n,{value:t.data.closed},null,8,["value"])]),_:1}),e(a,{header:"Preferit",style:{width:"2%"}},{body:s(t=>[e(n,{value:t.data.preferred},null,8,["value"])]),_:1}),e(a,{header:"Desactivat",style:{width:"2%"}},{body:s(t=>[e(n,{value:t.data.disabled},null,8,["value"])]),_:1}),e(a,null,{body:s(t=>[r("i",{class:T([u(d).TIMES,"grid_delete_column_button"]),onClick:C=>w(C,t.data)},null,10,A)]),_:1})]),_:1},8,["value"])}}});export{V as default};
