import{d as y,j as w,x as C,g as v,u as g,o as x,P as l,h as a,m as b,w as n,k as i,a as B,e as c,i as e,y as D}from"./index-948abaa8.js";import{u as M}from"./paymentMethod-b06b2d09.js";const k={class:"flex flex-wrap align-items-center justify-content-between gap-2"},P=c("span",{class:"text-xl text-900 font-bold"},"Formes de pagament",-1),j=y({__name:"PaymentMethods",setup(S){w(),C();const s=v(),m=g(),d=M();x(async()=>{await d.fetchAll(),m.setMenuItem({icon:l.HASHTAG,title:"Gestió de formes de pagament"})});const r=()=>{s.push({path:`/payment-methods/${D()}`})},u=o=>{o.originalEvent.target.className.includes("grid_delete_column_button")||s.push({path:`/payment-methods/${o.data.id}`})};return(o,N)=>{const h=a("Button"),t=a("Column"),p=a("BooleanColumn"),_=a("DataTable");return B(),b(_,{value:i(d).paymentMethods,tableStyle:"min-width: 100%",onRowClick:u},{header:n(()=>[c("div",k,[P,e(h,{icon:i(l).PLUS,rounded:"",raised:"",onClick:r},null,8,["icon"])])]),default:n(()=>[e(t,{field:"name",header:"Nom",style:{width:"20%"}}),e(t,{field:"description",header:"Descripció",style:{width:"20%"}}),e(t,{field:"dueDays",header:"Dies venciment",style:{width:"20%"}}),e(t,{field:"paymentDay",header:"Dia pagament",style:{width:"20%"}}),e(t,{header:"Desactivada",style:{width:"20%"}},{body:n(f=>[e(p,{value:f.data.disabled,showColor:!1},null,8,["value"])]),_:1})]),_:1},8,["value"])}}});export{j as default};