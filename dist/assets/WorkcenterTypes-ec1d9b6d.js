import{d as g,g as b,u as T,j as x,x as B,o as S,P as l,h as s,m as q,w as a,k as r,a as D,e as d,i as e,n as E}from"./index-61ceac46.js";import{u as I}from"./plantmodel-e5258ecb.js";import{v as N}from"./v4-a960c1f4.js";import"./index-5c7caccd.js";import"./base.service-558553c0.js";const M={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=d("span",{class:"text-xl text-900 font-bold"},"Tipus de màquina",-1),R=["onClick"],z=g({__name:"WorkcenterTypes",setup(W){const u=b(),p=T(),_=x(),h=B(),o=I();S(async()=>{await o.fetchWorkcenterTypes(),p.setMenuItem({icon:l.CALENDAR,title:"Gestió de tipus de màquina"})});const f=()=>{u.push({path:`/workcentertype/${N()}`})},y=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||u.push({path:`/workcentertype/${t.data.id}`})},k=(t,c)=>{h.require({target:t.currentTarget,message:`Está segur que vol eliminar l'empresa ${c.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await o.deleteWorkcenterType(c.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await o.fetchWorkcenterTypes())}})};return(t,c)=>{const m=s("Button"),n=s("Column"),w=s("BooleanColumn"),C=s("DataTable");return D(),q(C,{value:r(o).workcenterTypes,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:y},{header:a(()=>[d("div",M,[P,e(m,{icon:r(l).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:a(()=>[e(n,{field:"name",header:"Nom",style:{width:"25%"}}),e(n,{field:"description",header:"Descripció",style:{width:"50%"}}),e(n,{header:"Desactivat",style:{width:"10%"}},{body:a(i=>[e(w,{value:i.data.disabled},null,8,["value"])]),_:1}),e(n,null,{body:a(i=>[d("i",{class:E([r(l).TIMES,"grid_delete_column_button"]),onClick:v=>k(v,i.data)},null,10,R)]),_:1})]),_:1},8,["value"])}}});export{z as default};
