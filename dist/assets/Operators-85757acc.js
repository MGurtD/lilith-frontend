import{d as b,g as k,u as x,j as B,x as N,o as I,P as l,h as n,m as S,w as i,k as c,a as E,e as d,i as e,n as O}from"./index-0c51ec9c.js";import{u as T}from"./plantmodel-f7819718.js";import{v as D}from"./v4-a960c1f4.js";import"./index-3b48b213.js";import"./base.service-ebedc193.js";const M={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=d("span",{class:"text-xl text-900 font-bold"},"Operaris",-1),R=["onClick"],z=b({__name:"Operators",setup($){const u=k(),p=x(),a=T(),_=B(),h=N();I(async()=>{await a.fetchOperators(),p.setMenuItem({icon:l.CALENDAR,title:"Gestió d'operaris"})});const f=()=>{u.push({path:`/operator/${D()}`})},C=o=>{o.originalEvent.target.className.includes("grid_delete_column_button")||u.push({path:`/operator/${o.data.id}`})},w=(o,s)=>{h.require({target:o.currentTarget,message:`Está segur que vol eliminar l'operari ${s.surname}, ${s.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteOperator(s.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchOperators())}})};return(o,s)=>{const m=n("Button"),t=n("Column"),v=n("BooleanColumn"),y=n("DataTable");return E(),S(y,{value:c(a).operators,tableStyle:"min-width: 100%",onRowClick:C},{header:i(()=>[d("div",M,[P,e(m,{icon:c(l).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:i(()=>[e(t,{field:"code",header:"Codi",style:{width:"20%"}}),e(t,{field:"surname",header:"Cognom",style:{width:"25%"}}),e(t,{field:"name",header:"Nom",style:{width:"25%"}}),e(t,{field:"vatNumber",header:"NIF",style:{width:"20%"}}),e(t,{header:"Desactivat",style:{width:"10%"}},{body:i(r=>[e(v,{value:r.data.disabled},null,8,["value"])]),_:1}),e(t,null,{body:i(r=>[d("i",{class:O([c(l).TIMES,"grid_delete_column_button"]),onClick:g=>w(g,r.data)},null,10,R)]),_:1})]),_:1},8,["value"])}}});export{z as default};