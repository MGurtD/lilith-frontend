import{d as b,g as k,u as x,j as B,x as A,o as S,P as i,h as s,m as D,w as n,k as r,a as E,e as d,i as e,n as I,y as N}from"./index-abfce291.js";import{u as T}from"./plantmodel-fca63037.js";import"./index-0d9d6b22.js";const M={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=d("span",{class:"text-xl text-900 font-bold"},"Area",-1),R=["onClick"],V=b({__name:"Areas",setup(j){const u=k(),p=x(),_=B(),h=A(),a=T();S(async()=>{await a.fetchAreas(),p.setMenuItem({icon:i.CALENDAR,title:"Gestió d'arees"})});const f=()=>{u.push({path:`/area/${N()}`})},C=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||u.push({path:`/area/${t.data.id}`})},g=(t,c)=>{h.require({target:t.currentTarget,message:`Está segur que vol eliminar l'area ${c.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteArea(c.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchAreas())}})};return(t,c)=>{const m=s("Button"),o=s("Column"),v=s("BooleanColumn"),w=s("DataTable");return E(),D(w,{value:r(a).areas,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:C},{header:n(()=>[d("div",M,[P,e(m,{icon:r(i).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:n(()=>[e(o,{field:"name",header:"Nom",style:{width:"25%"}}),e(o,{field:"description",header:"Descripció",style:{width:"50%"}}),e(o,{header:"Desactivada",style:{width:"10%"}},{body:n(l=>[e(v,{value:l.data.disabled},null,8,["value"])]),_:1}),e(o,null,{body:n(l=>[d("i",{class:I([r(i).TIMES,"grid_delete_column_button"]),onClick:y=>g(y,l.data)},null,10,R)]),_:1})]),_:1},8,["value"])}}});export{V as default};
