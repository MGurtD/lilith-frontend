import{d as m,u as h,o as f,P as u,h as r,m as p,w as s,k as l,a as _,i as t,G as w,H as y,e as n}from"./index-37657aa9.js";import{u as x}from"./stock-37bab95a.js";import{u as S}from"./reference-5cf3b7a5.js";import"./index-bd537ef6.js";const g=n("div",{class:"flex flex-wrap align-items-center justify-content-between gap-2"},[n("span",{class:"text-xl text-900 font-bold"},"Estocs")],-1),N=m({__name:"Stocks",setup(k){const i=h(),a=x(),o=S();return f(async()=>{await a.fetchStocks(),await o.fetchReferences(),i.setMenuItem({icon:u.BOX,title:"Gestió de magatzems"})}),(b,v)=>{const e=r("Column"),c=r("DataTable");return _(),p(c,{value:l(a).stocks,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh"},{header:s(()=>[g]),default:s(()=>[t(e,{header:"Producte",style:{width:"28%"}},{body:s(d=>[w(y(l(o).getFullNameById(d.data.referenceId)),1)]),_:1}),t(e,{field:"quantity",header:"Uds.",style:{width:"12%"}}),t(e,{field:"width",header:"Ample (x) mm",style:{width:"12%"}}),t(e,{field:"length",header:"Llarg (y) mm",style:{width:"12%"}}),t(e,{field:"height",header:"Alt (z) mm",style:{width:"12%"}}),t(e,{field:"diameter",header:"Diàmetre mm",style:{width:"12%"}}),t(e,{field:"thickness",header:"Gruix mm",style:{width:"12%"}})]),_:1},8,["value"])}}});export{N as default};