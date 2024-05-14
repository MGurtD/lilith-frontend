import{d as S,j as V,r as $,h as I,a as n,c as d,e,i as g,k as _,P as u,p as x,b as C,_ as G,f as N,G as y,R as O,D as b,m as v,w as f,n as h,Y as L,l as P,J as T,u as W,o as D}from"./index-3b8fad0b.js";import{u as w}from"./plantmodel-4f98e0d8.js";import"./index-60183c2e.js";import"./base.service-95f208f7.js";const E=o=>(x("data-v-32a28529"),o=o(),C(),o),J={class:"shoopfloor__main"},R=E(()=>e("div",{class:"shoopfloor__icons"},[e("img",{src:G,alt:"Logo Temges",class:"home__logo"})],-1)),U=S({__name:"OperatorClockIn",emits:["submit"],setup(o,{emit:s}){const l=w(),i=V(),t=$(""),r=()=>{var c;const a=(c=l.operators)==null?void 0:c.find(m=>m.code===t.value);a?s("submit",a):i.add({severity:"error",summary:"Operari/a inexistent",detail:"Introdueix un codi d'operari/a vàlid"})};return(a,c)=>{const m=I("InputText"),B=I("Button");return n(),d("main",J,[e("section",null,[R,g(m,{class:"touch__input",modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=M=>t.value=M),placeholder:"Introdueix el codi d'operari/a",label:"Nom"},null,8,["modelValue"]),g(B,{icon:_(u).SIGN_IN,rounded:"",size:"large",label:"Entrar",onClick:r},null,8,["icon"])])])}}});const z=N(U,[["__scopeId","data-v-32a28529"]]),p=o=>(x("data-v-bbf91f79"),o=o(),C(),o),A={class:""},K={key:0},j={class:"area__header"},F=p(()=>e("i",{class:"pi pi-chevron-down area__header__icon"},null,-1)),H={class:"area__workcenters"},Y=p(()=>e("div",{class:"workcenter__color"},null,-1)),q={class:"workcenter__name"},Q={class:"workcenter__field"},X={class:"workcenter__field__icon"},Z=p(()=>e("span",{class:"workcenter__field__value"},"24009",-1)),ee=p(()=>e("div",{class:"workcenter__field"},[e("span",{class:"workcenter__field__icon"},[e("i",{class:"pi pi-barcode"})]),e("span",{class:"workcenter__field__value"},"5760P - Rectificació")],-1)),oe={class:"workcenter__field"},te={class:"workcenter__field__icon"},se=p(()=>e("span",{class:"workcenter__field__value"},"01:30:52",-1)),re={class:"workcenter__field"},ae={class:"workcenter__field__icon"},ne=p(()=>e("span",{class:"workcenter__field__value"},"2",-1)),ce=S({__name:"WorkcenterSelector",setup(o){const s=w(),l=t=>s.workcenters?s.workcenters.filter(r=>r.areaId===t).length>0:!1,i=t=>s.workcenters?s.workcenters.filter(r=>r.areaId===t):[];return(t,r)=>(n(),d("main",A,[(n(!0),d(y,null,O(_(s).areas,a=>(n(),d("div",{key:a.id},[l(a.id)?(n(),d("div",K,[e("header",j,[e("span",null,b(a.name),1),F]),e("section",H,[(n(!0),d(y,null,O(i(a.id),c=>(n(),v(_(L),{key:c.id,class:"workcenter"},{header:f(()=>[Y]),title:f(()=>[e("span",q,b(c.description.substring(0,25)),1)]),content:f(()=>[e("div",Q,[e("span",X,[e("i",{class:h(_(u).COG)},null,2)]),Z]),ee,e("div",oe,[e("span",te,[e("i",{class:h(_(u).CLOCK)},null,2)]),se]),e("div",re,[e("span",ae,[e("i",{class:h(_(u).USERS)},null,2)]),ne])]),_:2},1024))),128))])])):P("",!0)]))),128))]))}});const _e=N(ce,[["__scopeId","data-v-bbf91f79"]]),k="temges.operator",le=T("shopfloorStore",{state:()=>({operator:void 0}),actions:{async getOperator(){if(this.operator!==void 0)return this.operator;const o=localStorage.getItem(k);if(o!==null)return await this.setOperator(JSON.parse(o)),this.operator},async setOperator(o){this.operator=o,localStorage.setItem(k,JSON.stringify(o))},removeOperator(){this.operator=void 0,localStorage.removeItem(k)}}}),me=S({__name:"Main",setup(o){const s=W(),l=le(),i=w();D(async()=>{s.setMenuItem({icon:u.BUILDING,title:"Operativa de planta"}),i.fetchOperators()});const t=async r=>{l.setOperator(r),i.fetchActiveModel()};return(r,a)=>_(l).operator?(n(),v(_e,{key:1})):(n(),v(z,{key:0,onSubmit:t}))}});export{me as default};