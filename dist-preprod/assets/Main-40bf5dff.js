import{d as v,j as N,r as $,h as I,a as c,c as d,e,i as S,k as i,P as u,p as g,b as x,_ as V,f as O,L as b,a5 as y,H as C,m as k,w as h,n as f,am as L,l as P,u as T,an as W,o as A}from"./index-948abaa8.js";import{u as w}from"./plantmodel-b703603a.js";import"./index-861125e3.js";const E=t=>(g("data-v-32a28529"),t=t(),x(),t),G={class:"shoopfloor__main"},U=E(()=>e("div",{class:"shoopfloor__icons"},[e("img",{src:V,alt:"Logo Temges",class:"home__logo"})],-1)),z=v({__name:"OperatorClockIn",emits:["submit"],setup(t,{emit:s}){const _=w(),l=N(),o=$(""),n=()=>{var a;const r=(a=_.operators)==null?void 0:a.find(m=>m.code===o.value);r?s("submit",r):l.add({severity:"error",summary:"Operari/a inexistent",detail:"Introdueix un codi d'operari/a vàlid"})};return(r,a)=>{const m=I("InputText"),M=I("Button");return c(),d("main",G,[e("section",null,[U,S(m,{class:"touch__input",modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=B=>o.value=B),placeholder:"Introdueix el codi d'operari/a",label:"Nom"},null,8,["modelValue"]),S(M,{icon:i(u).SIGN_IN,rounded:"",size:"large",label:"Entrar",onClick:n},null,8,["icon"])])])}}});const D=O(z,[["__scopeId","data-v-32a28529"]]),p=t=>(g("data-v-4b9b3479"),t=t(),x(),t),H={class:""},R={key:0},j={class:"area__header"},F=p(()=>e("i",{class:"pi pi-chevron-down area__header__icon"},null,-1)),K={class:"area__workcenters"},q=p(()=>e("div",{class:"workcenter__color"},null,-1)),J={class:"workcenter__name"},Q={class:"workcenter__field"},X={class:"workcenter__field__icon"},Y=p(()=>e("span",{class:"workcenter__field__value"},"24009",-1)),Z=p(()=>e("div",{class:"workcenter__field"},[e("span",{class:"workcenter__field__icon"},[e("i",{class:"pi pi-barcode"})]),e("span",{class:"workcenter__field__value"},"5760P - Rectificació")],-1)),ee={class:"workcenter__field"},oe={class:"workcenter__field__icon"},te=p(()=>e("span",{class:"workcenter__field__value"},"01:30:52",-1)),se={class:"workcenter__field"},ne={class:"workcenter__field__icon"},re=p(()=>e("span",{class:"workcenter__field__value"},"2",-1)),ae=v({__name:"WorkcenterSelector",setup(t){const s=w(),_=o=>s.workcenters?s.workcenters.filter(n=>n.areaId===o).length>0:!1,l=o=>s.workcenters?s.workcenters.filter(n=>n.areaId===o):[];return(o,n)=>(c(),d("main",H,[(c(!0),d(b,null,y(i(s).areas,r=>(c(),d("div",{key:r.id},[_(r.id)?(c(),d("div",R,[e("header",j,[e("span",null,C(r.name),1),F]),e("section",K,[(c(!0),d(b,null,y(l(r.id),a=>(c(),k(i(L),{key:a.id,class:"workcenter",onClick:()=>o.$router.push(`/workcenter-detail/${a.id}`)},{header:h(()=>[q]),title:h(()=>[e("span",J,C(a.description.substring(0,25)),1)]),content:h(()=>[e("div",Q,[e("span",X,[e("i",{class:f(i(u).COG)},null,2)]),Y]),Z,e("div",ee,[e("span",oe,[e("i",{class:f(i(u).CLOCK)},null,2)]),te]),e("div",se,[e("span",ne,[e("i",{class:f(i(u).USERS)},null,2)]),re])]),_:2},1032,["onClick"]))),128))])])):P("",!0)]))),128))]))}});const ce=O(ae,[["__scopeId","data-v-4b9b3479"]]),de=v({__name:"Main",setup(t){const s=T(),_=W(),l=w();A(async()=>{await l.fetchOperators(),s.setMenuItem({icon:u.BUILDING,title:"Operativa de planta"}),await _.getOperator(),_.operator&&l.fetchActiveModel()});const o=async n=>{_.setOperator(n),l.fetchActiveModel()};return(n,r)=>i(_).operator?(c(),k(ce,{key:1})):(c(),k(D,{key:0,onSubmit:o}))}});export{de as default};
