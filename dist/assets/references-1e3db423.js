import{d as w,g as C,u as v,o as y,P as c,h as o,m as B,w as a,k as i,a as b,e as l,i as e}from"./index-f764b8b4.js";import{u as x}from"./reference-b0a41771.js";import{v as g}from"./v4-a960c1f4.js";import"./reference.service-1719d346.js";import"./base.service-ff0cada2.js";const k={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=l("span",{class:"text-xl text-900 font-bold"},"Referències",-1),T=w({__name:"references",setup(R){const s=C(),d=v(),r=x();y(async()=>{await r.fetchReferences(),d.setMenuItem({icon:c.SHOPPING_BAG,title:"Gestió de referencies"})});const u=()=>{s.push({path:`/referencia/${g()}`})},f=n=>{n.originalEvent.target.className.includes("grid_delete_column_button")||s.push({path:`/referencia/${n.data.id}`})};return(n,S)=>{const m=o("Button"),t=o("Column"),p=o("BooleanColumn"),_=o("DataTable");return b(),B(_,{value:i(r).references,tableStyle:"min-width: 100%",onRowClick:f},{header:a(()=>[l("div",k,[P,e(m,{icon:i(c).PLUS,rounded:"",raised:"",onClick:u},null,8,["icon"])])]),default:a(()=>[e(t,{field:"code",header:"Codi",style:{width:"15%"}}),e(t,{field:"description",header:"Descripció",style:{width:"35%"}}),e(t,{field:"cost",header:"Cost",style:{width:"20%"}}),e(t,{field:"price",header:"Preu",style:{width:"20%"}}),e(t,{header:"Desactivada",style:{width:"10%"}},{body:a(h=>[e(p,{value:h.data.disabled},null,8,["value"])]),_:1})]),_:1},8,["value"])}}});export{T as default};
