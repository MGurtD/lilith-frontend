import{d as w,g as T,u as B,j as k,x,o as R,P as l,h as n,m as S,w as a,k as r,a as D,e as d,i as e,n as I,y as E}from"./index-948abaa8.js";import{u as N}from"./referenceType-c49cdfdc.js";const j={class:"flex flex-wrap align-items-center justify-content-between gap-2"},q=d("span",{class:"text-xl text-900 font-bold"},"Tipus de matèries primes",-1),M=["onClick"],V=w({__name:"ReferenceTypes",setup(P){const u=T(),p=B(),_=k(),f=x(),o=N();R(async()=>{await o.fetchAll(),p.setMenuItem({icon:l.BOX,title:"Gestió de tipus de materials"})});const h=()=>{u.push({path:`/referencetype/${E()}`})},y=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||u.push({path:`/referencetype/${t.data.id}`})},C=(t,i)=>{f.require({target:t.currentTarget,message:`Está segur que vol eliminar el tipus de materials ${i.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await o.deleteReferenceType(i.id)&&(_.add({severity:"success",summary:"Eliminat",life:3e3}),await o.fetchAll())}})};return(t,i)=>{const m=n("Button"),s=n("Column"),b=n("BooleanColumn"),g=n("DataTable");return D(),S(g,{value:r(o).referenceTypes,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh","sort-mode":"single","sort-field":"name","sort-order":1,onRowClick:y},{header:a(()=>[d("div",j,[q,e(m,{icon:r(l).PLUS,rounded:"",raised:"",onClick:h},null,8,["icon"])])]),default:a(()=>[e(s,{field:"name",sortable:"",header:"Nom",style:{width:"25%"}}),e(s,{field:"description",sortable:"",header:"Descripció",style:{width:"40%"}}),e(s,{field:"density",header:"Densitat (cm/m3)",style:{width:"15%"}}),e(s,{header:"Desactivada",style:{width:"10%"}},{body:a(c=>[e(b,{value:c.data.disabled},null,8,["value"])]),_:1}),e(s,null,{body:a(c=>[d("i",{class:I([r(l).TIMES,"grid_delete_column_button"]),onClick:v=>C(v,c.data)},null,10,M)]),_:1})]),_:1},8,["value"])}}});export{V as default};
