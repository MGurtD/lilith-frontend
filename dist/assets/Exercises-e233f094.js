import{d as C,g as D,u as b,o as v,P as l,h as s,m as B,w as a,k as n,a as g,e as p,i as e,C as d,D as u}from"./index-30e64f83.js";import{u as S}from"./exercise-da493b80.js";import{f as m}from"./functions-20418450.js";import{v as k}from"./v4-a960c1f4.js";import"./index-cb69ecf9.js";import"./base.service-3e1c705c.js";import"./reference.service-385b31b8.js";const E={class:"flex flex-wrap align-items-center justify-content-between gap-2"},N=p("span",{class:"text-xl text-900 font-bold"},"Exercicis",-1),$=C({__name:"Exercises",setup(T){const c=D(),_=b(),r=S();v(async()=>{await r.fetchAll(),_.setMenuItem({icon:l.HASHTAG,title:"Gestió d'exercicis"})});const h=()=>{c.push({path:`/exercise/${k()}`})},f=i=>{i.originalEvent.target.className.includes("grid_delete_column_button")||c.push({path:`/exercise/${i.data.id}`})};return(i,A)=>{const x=s("Button"),t=s("Column"),w=s("BooleanColumn"),y=s("DataTable");return g(),B(y,{value:n(r).exercises,tableStyle:"min-width: 100%",onRowClick:f},{header:a(()=>[p("div",E,[N,e(x,{icon:n(l).PLUS,rounded:"",raised:"",onClick:h},null,8,["icon"])])]),default:a(()=>[e(t,{field:"name",header:"Nom",style:{width:"15%"}}),e(t,{field:"description",header:"Descripció",style:{width:"25%"}}),e(t,{header:"Data d'inici",style:{width:"20%"}},{body:a(o=>[d(u(n(m)(o.data.startDate)),1)]),_:1}),e(t,{header:"Dia de fi",style:{width:"20%"}},{body:a(o=>[d(u(n(m)(o.data.endDate)),1)]),_:1}),e(t,{header:"Desactivat",style:{width:"10%"}},{body:a(o=>[e(w,{value:o.data.disabled,showColor:!1},null,8,["value"])]),_:1})]),_:1},8,["value"])}}});export{$ as default};
