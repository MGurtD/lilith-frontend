import{d as T,g,u as E,o as b,P as c,x as k,j as B,h as n,m as S,w as a,k as l,a as I,e as d,i as e,n as D}from"./index-d7e0b608.js";import{u as N}from"./expense-9db481de.js";import{v as j}from"./v4-a960c1f4.js";import"./index-0f6d2d18.js";import"./base.service-1e1fcad7.js";import"./suppliers.service-175cce9d.js";const q={class:"flex flex-wrap align-items-center justify-content-between gap-2"},M=d("span",{class:"text-xl text-900 font-bold"},"Tipus de despesa",-1),P=["onClick"],F=T({__name:"ExpenseTypes",setup(G){const p=g(),m=E(),s=N();b(async()=>{await s.fetchExpenseTypes(),m.setMenuItem({icon:c.FLAG,title:"Gestió de tipus de despesa"})});const _=()=>{p.push({path:`/expensetype/${j()}`})},h=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||p.push({path:`/expensetype/${t.data.id}`})},f=k(),x=B(),y=(t,r)=>{f.require({target:t.currentTarget,message:"Està segur que vol eliminar el tipus de despesa?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await s.deleteExpenseType(r.id)&&(x.add({severity:"success",summary:"Eliminada",life:3e3}),await s.fetchExpenses())}})};return(t,r)=>{const u=n("Button"),o=n("Column"),C=n("BooleanColumn"),w=n("DataTable");return I(),S(w,{value:l(s).expenseTypes,tableStyle:"min-width: 100%",onRowClick:h},{header:a(()=>[d("div",q,[M,e(u,{icon:l(c).PLUS,rounded:"",raised:"",onClick:_},null,8,["icon"])])]),default:a(()=>[e(o,{field:"name",header:"Nom",style:{width:"20%"}}),e(o,{field:"description",header:"Descripció",style:{width:"50%"}}),e(o,{header:"Desactivada",style:{width:"20%"}},{body:a(i=>[e(C,{value:i.data.disabled,showColor:!1},null,8,["value"])]),_:1}),e(o,{style:{width:"10%"}},{body:a(i=>[d("i",{class:D([l(c).TIMES,"grid_delete_column_button"]),onClick:v=>y(v,i.data)},null,10,P)]),_:1})]),_:1},8,["value"])}}});export{F as default};
