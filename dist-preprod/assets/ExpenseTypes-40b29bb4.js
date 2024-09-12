import{d as g,g as v,u as E,o as b,P as c,x as k,j as B,h as o,m as S,w as a,k as l,a as I,e as d,i as e,n as D,y as N}from"./index-948abaa8.js";import{u as j}from"./expense-eac994e0.js";import"./index-76940908.js";import"./suppliers.service-0e59a7bd.js";const q={class:"flex flex-wrap align-items-center justify-content-between gap-2"},M=d("span",{class:"text-xl text-900 font-bold"},"Tipus de despesa",-1),P=["onClick"],z=g({__name:"ExpenseTypes",setup(G){const p=v(),m=E(),s=j();b(async()=>{await s.fetchExpenseTypes(),m.setMenuItem({icon:c.FLAG,title:"Gestió de tipus de despesa"})});const _=()=>{p.push({path:`/expensetype/${N()}`})},h=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||p.push({path:`/expensetype/${t.data.id}`})},y=k(),f=B(),x=(t,r)=>{y.require({target:t.currentTarget,message:"Està segur que vol eliminar el tipus de despesa?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await s.deleteExpenseType(r.id)&&(f.add({severity:"success",summary:"Eliminada",life:3e3}),await s.fetchExpenseTypes())}})};return(t,r)=>{const u=o("Button"),n=o("Column"),C=o("BooleanColumn"),w=o("DataTable");return I(),S(w,{value:l(s).expenseTypes,tableStyle:"min-width: 100%",onRowClick:h},{header:a(()=>[d("div",q,[M,e(u,{icon:l(c).PLUS,rounded:"",raised:"",onClick:_},null,8,["icon"])])]),default:a(()=>[e(n,{field:"name",header:"Nom",style:{width:"20%"}}),e(n,{field:"description",header:"Descripció",style:{width:"50%"}}),e(n,{header:"Desactivada",style:{width:"20%"}},{body:a(i=>[e(C,{value:i.data.disabled,showColor:!1},null,8,["value"])]),_:1}),e(n,{style:{width:"10%"}},{body:a(i=>[d("i",{class:D([l(c).TIMES,"grid_delete_column_button"]),onClick:T=>x(T,i.data)},null,10,P)]),_:1})]),_:1},8,["value"])}}});export{z as default};
