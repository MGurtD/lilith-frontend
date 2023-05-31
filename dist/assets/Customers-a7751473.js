import{j as B,k as q,u as A,M as $,P as u,f as d,c as M,h as e,l as i,w as s,F as P,o as F,e as c,n as p,t as H}from"./index-0e14a554.js";import{u as V}from"./usetoast.esm-2dfabc60.js";import{u as j}from"./useconfirm.esm-6f798407.js";import{u as D}from"./customers-bca4d3e0.js";import{u as R}from"./vue-router-c71b0622.js";import{v}from"./v4-a960c1f4.js";import"./base.service-431caa23.js";const G=c("span",null,"Clients",-1),L=["onClick"],U=c("span",null,"Tipus de client",-1),z=["onClick"],ee=B({__name:"Customers",setup(K){const _=q(0),f=V(),C=j(),m=R(),w=A(),l=D();$(async()=>{await l.fetchCustomers(),await l.fetchCustomerTypes(),w.setMenuItem({text:"Clients",icon:u.HASHTAG})});const g=t=>{var r;const o=(r=l.customerTypes)==null?void 0:r.find(a=>a.id===t);if(o)return o.name},I=(t,o)=>{C.require({target:t.currentTarget,message:`Está segur que vol eliminar el client ${o.comercialName}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await l.deleteCustomer(o.id)&&(f.add({severity:"success",summary:"Eliminat",life:3e3}),await l.fetchCustomers())}})},k=(t,o)=>{C.require({target:t.currentTarget,message:`Está segur que vol eliminar el tipus de client ${o.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await l.deleteCustomerType(o.id)&&(f.add({severity:"success",summary:"Eliminat",life:3e3}),await l.fetchCustomerTypes())}})},N=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||m.push({path:`/customers/${t.data.id}`})},S=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||m.push({path:`/customer-types/${t.data.id}`})},x=()=>{_.value===0?m.push({path:`/customers/${v()}`}):m.push({path:`/customer-types/${v()}`})};return(t,o)=>{const r=d("Button"),a=d("Column"),y=d("BooleanColumn"),b=d("DataTable"),T=d("TabPanel"),E=d("TabView");return F(),M(P,null,[e(r,{icon:i(u).PLUS,class:"grid_add_row_button",rounded:"",onClick:x},null,8,["icon"]),e(E,{activeIndex:_.value,"onUpdate:activeIndex":o[0]||(o[0]=n=>_.value=n)},{default:s(()=>[e(T,null,{header:s(()=>[c("i",{class:p([i(u).LINK,"mr-2"])},null,2),G]),default:s(()=>[e(b,{value:i(l).customers,tableStyle:"min-width: 100%",onRowClick:N},{default:s(()=>[e(a,{field:"comercialName",header:"Nom comercial",sortable:"",style:{width:"20%"}}),e(a,{field:"taxName",header:"Nom Fiscal",style:{width:"20%"}}),e(a,{field:"vatNumber",header:"CIF",style:{width:"20%"}}),e(a,{header:"Tipus",style:{width:"20%"}},{body:s(n=>[c("span",null,H(g(n.data.customerTypeId)),1)]),_:1}),e(a,{header:"Actiu",sortable:"",style:{width:"20%"}},{body:s(n=>[e(y,{value:!n.data.disabled,showColor:!0},null,8,["value"])]),_:1}),e(a,null,{body:s(n=>[c("i",{class:p([i(u).TIMES,"grid_delete_column_button"]),onClick:h=>I(h,n.data)},null,10,L)]),_:1})]),_:1},8,["value"])]),_:1}),e(T,null,{header:s(()=>[c("i",{class:p([i(u).HASHTAG,"mr-2"])},null,2),U]),default:s(()=>[e(b,{value:i(l).customerTypes,tableStyle:"min-width: 100%",onRowClick:S},{default:s(()=>[e(a,{field:"name",header:"Nom",style:{width:"50%"}}),e(a,{header:"Actiu",sortable:"",style:{width:"50%"}},{body:s(n=>[e(y,{value:!n.data.disabled,showColor:!0},null,8,["value"])]),_:1}),e(a,null,{body:s(n=>[c("i",{class:p([i(u).TIMES,"grid_delete_column_button"]),onClick:h=>k(h,n.data)},null,10,z)]),_:1})]),_:1},8,["value"])]),_:1})]),_:1},8,["activeIndex"])],64)}}});export{ee as default};