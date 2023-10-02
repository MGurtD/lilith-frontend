import{d as y,j as w,x as C,g as v,u as g,o as x,P as d,h as o,m as b,w as n,k as l,a as B,e as c,i as e}from"./index-d7e0b608.js";import{u as D}from"./paymentMethod-51da1138.js";import{v as M}from"./v4-a960c1f4.js";import"./index-49481bdd.js";import"./base.service-1e1fcad7.js";const k={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=c("span",{class:"text-xl text-900 font-bold"},"Formes de pagament",-1),I=y({__name:"PaymentMethods",setup(S){w(),C();const s=v(),m=g(),i=D();x(async()=>{await i.fetchAll(),m.setMenuItem({icon:d.HASHTAG,title:"Gestió de formes de pagament"})});const r=()=>{s.push({path:`/payment-methods/${M()}`})},u=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||s.push({path:`/payment-methods/${a.data.id}`})};return(a,N)=>{const p=o("Button"),t=o("Column"),h=o("BooleanColumn"),_=o("DataTable");return B(),b(_,{value:l(i).paymentMethods,tableStyle:"min-width: 100%",onRowClick:u},{header:n(()=>[c("div",k,[P,e(p,{icon:l(d).PLUS,rounded:"",raised:"",onClick:r},null,8,["icon"])])]),default:n(()=>[e(t,{field:"name",header:"Nom",style:{width:"20%"}}),e(t,{field:"description",header:"Descripció",style:{width:"20%"}}),e(t,{field:"dueDays",header:"Dies venciment",style:{width:"20%"}}),e(t,{field:"paymentDay",header:"Dia pagament",style:{width:"20%"}}),e(t,{header:"Desactivada",style:{width:"20%"}},{body:n(f=>[e(h,{value:f.data.disabled,showColor:!1},null,8,["value"])]),_:1})]),_:1},8,["value"])}}});export{I as default};
