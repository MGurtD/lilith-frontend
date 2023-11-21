import{_ as g}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-3d658f8a.js";import{d as P,j as T,u as M,r as C,o as B,P as m,h as f,c as F,i as t,w as n,k as o,a as I,e as c,C as _,D as x}from"./index-9ee31eec.js";import{u as R}from"./stockMovement-7adcc0ca.js";import{u as E}from"./reference-b31f5c29.js";import{u as A}from"./exercise-63354d5d.js";import{d as L,a as y}from"./functions-afe9fe15.js";import"./index-d1c8328b.js";import"./base.service-aa9daa2d.js";import"./reference.service-8d98e13b.js";import"./index-e87db629.js";import"./v4-a960c1f4.js";const N={class:"flex flex-wrap align-items-center justify-content-between gap-2"},V={class:"datatable-filter"},j={class:"filter-field"},z={class:"datatable-buttons"},G="temges.stockMovements.filter",ee=P({__name:"StockMovements",setup(H){const v=T(),s=M(),u=R(),h=E(),l=A(),w=C({exercise:void 0});B(async()=>{s.setMenuItem({icon:m.MAP,title:"Moviments de magatzem"}),await l.fetchAll(),await h.fetchReferences(),k()});const k=()=>{var a;const i=new Date().getFullYear().toString(),r=(a=l.exercises)==null?void 0:a.find(e=>e.name===i);r&&(s.exercisePicker.exercise=r,s.exercisePicker.dates=[new Date(s.exercisePicker.exercise.startDate),new Date(s.exercisePicker.exercise.endDate)])},S=()=>{s.cleanExercisePicker()},p=async()=>{if(s.exercisePicker.dates){const i=y(s.exercisePicker.dates[0]),r=y(s.exercisePicker.dates[1]);await u.GetBetweenDates(i,r),localStorage.setItem(G,JSON.stringify(w.value))}else v.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},D=i=>{var a;const r=(a=h.references)==null?void 0:a.find(e=>e.id===i);return r?r.description:""};return(i,r)=>{const a=f("Button"),e=f("Column"),b=f("DataTable");return I(),F("div",null,[t(b,{class:"p-datatable-sm",tableStyle:"min-width:100%",scrollable:"",scrollHeight:"80vh",sortField:"movementDate",sortOrder:1,value:o(u).stockMovements},{header:n(()=>[c("div",N,[c("div",V,[c("div",j,[t(g,{exercises:o(l).exercises,onRangeSelected:p},null,8,["exercises"])])]),c("div",z,[t(a,{class:"datatable-button mr-2",icon:o(m).FILTER,rounded:"",raised:"",onClick:p},null,8,["icon"]),t(a,{class:"datatable-button mr-2",icon:o(m).FILTER_SLASH,rounded:"",raised:"",onClick:S},null,8,["icon"])])])]),default:n(()=>[t(e,{header:"Data",field:"movementDate",sortable:"",style:{width:"15%"}},{body:n(d=>[_(x(o(L)(d.data.movementDate)),1)]),_:1}),t(e,{header:"Referència",style:{width:"20%"}},{body:n(d=>[_(x(D(d.data.referenceId)),1)]),_:1}),t(e,{field:"width",header:"Ample (x) mm",style:{width:"5%"}}),t(e,{field:"length",header:"Llarg (y) mm",style:{width:"5%"}}),t(e,{field:"height",header:"Alt (z) mm",style:{width:"5%"}}),t(e,{field:"diameter",header:"Diámetre mm",style:{width:"5%"}}),t(e,{field:"thickness",header:"Gruix mm",style:{width:"5%"}}),t(e,{field:"description",header:"Descripció",style:{width:"25%"}}),t(e,{field:"movementType",header:"Tipus de moviment",style:{width:"10%"}}),t(e,{field:"quantity",header:"Quantitat",style:{width:"10%"}})]),_:1},8,["value"])])}}});export{ee as default};
