import{j as f,u as x,M as C,P as l,f as e,c as v,h as t,l as c,w as r,F as w,o as b}from"./index-2bfc80b2.js";import{u as g}from"./vue-router-b024814c.js";import{u as B}from"./tax-4b622ccf.js";import{v as y}from"./v4-a960c1f4.js";import"./tax.service-2ace897f.js";import"./base.service-8b4a1a4e.js";const E=f({__name:"Taxes",setup(S){const n=g(),u=x(),s=B();C(async()=>{await s.fetchAll(),u.setMenuItem({icon:l.HASHTAG,text:"Gestió d'impostos"})});const i=()=>{n.push({path:`/tax/${y()}`})},m=o=>{o.originalEvent.target.className.includes("grid_delete_column_button")||n.push({path:`/tax/${o.data.id}`})};return(o,k)=>{const d=e("Button"),a=e("Column"),_=e("BooleanColumn"),p=e("DataTable");return b(),v(w,null,[t(d,{icon:c(l).PLUS,class:"grid_add_row_button",rounded:"",onClick:i},null,8,["icon"]),t(p,{value:c(s).taxes,tableStyle:"min-width: 100%",onRowClick:m},{default:r(()=>[t(a,{field:"name",header:"Nom",style:{width:"33%"}}),t(a,{field:"percentatge",header:"% Percentatge",style:{width:"33%"}}),t(a,{header:"Desactivada",style:{width:"33%"}},{body:r(h=>[t(_,{value:h.data.disabled},null,8,["value"])]),_:1})]),_:1},8,["value"])],64)}}});export{E as default};
