import{d as C,g as D,u as b,o as v,P as l,h as s,m as B,w as a,k as n,a as g,e as p,i as e,C as d,D as u}from"./index-19723412.js";import{u as S}from"./exercise-d549878b.js";import{f as m}from"./functions-79f2dbc4.js";import{v as k}from"./v4-a960c1f4.js";import"./index-524ef867.js";import"./base.service-2e682391.js";import"./reference.service-fb6ab95a.js";import"./_commonjsHelpers-725317a4.js";const E={class:"flex flex-wrap align-items-center justify-content-between gap-2"},N=p("span",{class:"text-xl text-900 font-bold"},"Exercicis",-1),j=C({__name:"Exercises",setup(T){const r=D(),_=b(),c=S();v(async()=>{await c.fetchAll(),_.setMenuItem({icon:l.HASHTAG,title:"Gestió d'exercicis"})});const h=()=>{r.push({path:`/exercise/${k()}`})},f=i=>{i.originalEvent.target.className.includes("grid_delete_column_button")||r.push({path:`/exercise/${i.data.id}`})};return(i,A)=>{const x=s("Button"),t=s("Column"),w=s("BooleanColumn"),y=s("DataTable");return g(),B(y,{value:n(c).exercises,tableStyle:"min-width: 100%",onRowClick:f},{header:a(()=>[p("div",E,[N,e(x,{icon:n(l).PLUS,rounded:"",raised:"",onClick:h},null,8,["icon"])])]),default:a(()=>[e(t,{field:"name",header:"Nom",style:{width:"15%"}}),e(t,{field:"description",header:"Descripció",style:{width:"25%"}}),e(t,{header:"Data d'inici",style:{width:"20%"}},{body:a(o=>[d(u(n(m)(o.data.startDate)),1)]),_:1}),e(t,{header:"Dia de fi",style:{width:"20%"}},{body:a(o=>[d(u(n(m)(o.data.endDate)),1)]),_:1}),e(t,{header:"Desactivat",style:{width:"10%"}},{body:a(o=>[e(w,{value:o.data.disabled,showColor:!1},null,8,["value"])]),_:1})]),_:1},8,["value"])}}});export{j as default};
