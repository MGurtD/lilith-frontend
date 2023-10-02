import{d as E,r as P,j as q,x as B,g as H,u as $,o as D,P as p,h as u,c as A,i as e,k as n,w as l,G as M,a as V,e as r,n as m,D as j}from"./index-d7e0b608.js";import{u as F}from"./suppliers-010e09f6.js";import{v as S}from"./v4-a960c1f4.js";import"./suppliers.service-175cce9d.js";import"./base.service-1e1fcad7.js";const G=r("span",null,"Proveïdors",-1),R=["onClick"],L=r("span",null,"Tipus de Proveïdor",-1),U=["onClick"],X=E({__name:"Suppliers",setup(z){const _=P(0),f=q(),y=B(),d=H(),g=$(),a=F();D(async()=>{await a.fetchSuppliers(),await a.fetchSupplierTypes(),g.setMenuItem({icon:p.HASHTAG,title:"Proveïdors"})});const b=t=>{var c;const s=(c=a.supplierTypes)==null?void 0:c.find(i=>i.id===t);if(s)return s.name},w=()=>{_.value===0?d.push({path:`/suppliers/${S()}`}):d.push({path:`/supplier-types/${S()}`})},C=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/suppliers/${t.data.id}`})},I=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/supplier-types/${t.data.id}`})},k=(t,s)=>{y.require({target:t.currentTarget,message:`Está segur que vol eliminar el proveïdor ${s.comercialName}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteSupplier(s.id)&&(f.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchSuppliers())}})},N=(t,s)=>{y.require({target:t.currentTarget,message:`Está segur que vol eliminar el tipus de proveïdor ${s.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await a.deleteSupplierType(s.id)&&(f.add({severity:"success",summary:"Eliminat",life:3e3}),await a.fetchSupplierTypes())}})};return(t,s)=>{const c=u("Button"),i=u("Column"),v=u("DataTable"),T=u("TabPanel"),x=u("TabView");return V(),A(M,null,[e(c,{icon:n(p).PLUS,class:"grid_add_row_button",rounded:"",onClick:w},null,8,["icon"]),e(x,{activeIndex:_.value,"onUpdate:activeIndex":s[0]||(s[0]=o=>_.value=o)},{default:l(()=>[e(T,null,{header:l(()=>[r("i",{class:m([n(p).LINK,"mr-2"])},null,2),G]),default:l(()=>[e(v,{value:n(a).suppliers,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:C},{default:l(()=>[e(i,{field:"comercialName",header:"Nom Comercial",style:{width:"20%"}}),e(i,{field:"taxName",header:"Nom Fiscal",style:{width:"20%"}}),e(i,{field:"vatNumber",header:"CIF",style:{width:"20%"}}),e(i,{field:"phone",header:"Telèfon",style:{width:"20%"}}),e(i,{header:"Tipus",style:{width:"20%"}},{body:l(o=>[r("span",null,j(b(o.data.supplierTypeId)),1)]),_:1}),e(i,null,{body:l(o=>[r("i",{class:m([n(p).TIMES,"grid_delete_column_button"]),onClick:h=>k(h,o.data)},null,10,R)]),_:1})]),_:1},8,["value"])]),_:1}),e(T,null,{header:l(()=>[r("i",{class:m([n(p).HASHTAG,"mr-2"])},null,2),L]),default:l(()=>[e(v,{value:n(a).supplierTypes,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:I},{default:l(()=>[e(i,{field:"name",header:"Nom",style:{width:"50%"}}),e(i,{field:"description",header:"Descripció",style:{width:"50%"}}),e(i,null,{body:l(o=>[r("i",{class:m([n(p).TIMES,"grid_delete_column_button"]),onClick:h=>N(h,o.data)},null,10,U)]),_:1})]),_:1},8,["value"])]),_:1})]),_:1},8,["activeIndex"])],64)}}});export{X as default};
