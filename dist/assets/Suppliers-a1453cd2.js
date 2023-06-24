import{j as E,k as P,u as q,M as B,P as p,f as u,c as $,h as e,l as n,w as a,F as M,o as A,e as r,n as m,t as D}from"./index-2bfc80b2.js";import{u as F}from"./usetoast.esm-82b2df9e.js";import{u as H}from"./useconfirm.esm-4982caff.js";import{u as V}from"./suppliers-48d539e5.js";import{u as j}from"./vue-router-b024814c.js";import{v as S}from"./v4-a960c1f4.js";import"./base.service-8b4a1a4e.js";const R=r("span",null,"Proveïdors",-1),G=["onClick"],L=r("span",null,"Tipus de Proveïdor",-1),U=["onClick"],Z=E({__name:"Suppliers",setup(z){const _=P(0),h=F(),y=H(),d=j(),g=q(),l=V();B(async()=>{await l.fetchSuppliers(),await l.fetchSupplierTypes(),g.setMenuItem({icon:p.HASHTAG,text:"Proveïdors"})});const w=t=>{var c;const i=(c=l.supplierTypes)==null?void 0:c.find(s=>s.id===t);if(i)return i.name},b=()=>{_.value===0?d.push({path:`/suppliers/${S()}`}):d.push({path:`/supplier-types/${S()}`})},C=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/suppliers/${t.data.id}`})},I=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/supplier-types/${t.data.id}`})},k=(t,i)=>{y.require({target:t.currentTarget,message:`Está segur que vol eliminar el proveïdor ${i.comercialName}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await l.deleteSupplier(i.id)&&(h.add({severity:"success",summary:"Eliminat",life:3e3}),await l.fetchSuppliers())}})},N=(t,i)=>{y.require({target:t.currentTarget,message:`Está segur que vol eliminar el tipus de proveïdor ${i.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await l.deleteSupplierType(i.id)&&(h.add({severity:"success",summary:"Eliminat",life:3e3}),await l.fetchSupplierTypes())}})};return(t,i)=>{const c=u("Button"),s=u("Column"),T=u("DataTable"),v=u("TabPanel"),x=u("TabView");return A(),$(M,null,[e(c,{icon:n(p).PLUS,class:"grid_add_row_button",rounded:"",onClick:b},null,8,["icon"]),e(x,{activeIndex:_.value,"onUpdate:activeIndex":i[0]||(i[0]=o=>_.value=o)},{default:a(()=>[e(v,null,{header:a(()=>[r("i",{class:m([n(p).LINK,"mr-2"])},null,2),R]),default:a(()=>[e(T,{value:n(l).suppliers,tableStyle:"min-width: 100%",onRowClick:C},{default:a(()=>[e(s,{field:"comercialName",header:"Nom Comercial",style:{width:"20%"}}),e(s,{field:"taxName",header:"Nom Fiscal",style:{width:"20%"}}),e(s,{field:"vatNumber",header:"CIF",style:{width:"20%"}}),e(s,{field:"phone",header:"Telèfon",style:{width:"20%"}}),e(s,{header:"Tipus",style:{width:"20%"}},{body:a(o=>[r("span",null,D(w(o.data.supplierTypeId)),1)]),_:1}),e(s,null,{body:a(o=>[r("i",{class:m([n(p).TIMES,"grid_delete_column_button"]),onClick:f=>k(f,o.data)},null,10,G)]),_:1})]),_:1},8,["value"])]),_:1}),e(v,null,{header:a(()=>[r("i",{class:m([n(p).HASHTAG,"mr-2"])},null,2),L]),default:a(()=>[e(T,{value:n(l).supplierTypes,tableStyle:"min-width: 100%",onRowClick:I},{default:a(()=>[e(s,{field:"name",header:"Nom",style:{width:"50%"}}),e(s,{field:"description",header:"Descripció",style:{width:"50%"}}),e(s,null,{body:a(o=>[r("i",{class:m([n(p).TIMES,"grid_delete_column_button"]),onClick:f=>N(f,o.data)},null,10,U)]),_:1})]),_:1},8,["value"])]),_:1})]),_:1},8,["activeIndex"])],64)}}});export{Z as default};
