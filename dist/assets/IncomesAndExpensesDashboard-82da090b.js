import{ac as I,t as A,d as F,u as M,E as V,r as i,o as G,P as B,O as S,h as d,c as N,e as b,i as a,k as y,w as u,L as O,a as L,G as $,H,I as J,f as Y}from"./index-40c5ef33.js";import{_ as Q}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-4fa33fdf.js";import{E as j}from"./index-5e1e719e.js";import"./suppliers.service-3db6483c.js";class q extends I{async GetBetweenDates(n,p){const h=`${this.resource}/consolidated?startTime=${n}&endTime=${p}`,m=await A.get(h);if(m.status===200)return m.data}}const z={class:"dashboard-filter"},K={class:"dashboard-filter-field"},R={class:"dashboard-container"},U=F({__name:"IncomesAndExpensesDashboard",setup(k){const n=M(),p=V(),h=new q("/income"),m=i({dates:void 0,consolidatedBy:void 0}),E=()=>{n.cleanExercisePicker(),m.value.consolidatedBy=""},v=i([]),D=i([]);G(async()=>{n.setMenuItem({icon:B.MONEY_BILL,title:"Dashboard comparatiu flux de caixa"}),await p.fetchActive(),n.exercisePicker.exercise||n.setCurrentYear(),x()});const x=async()=>{if(_.value=[],n.exercisePicker.dates){const o=S(n.exercisePicker.dates[0]),s=S(n.exercisePicker.dates[1]);var t,r;t=await h.GetBetweenDates(o,s),r=await j.Expense.getConsolidated(o,s,"",""),t&&(v.value=t),r&&(D.value=r),g.value=T(),C.value=P()}},g=i(),C=i(),_=i([]),T=()=>{const t=["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],r={},o={};v.value.forEach(e=>{const l=t[new Date(e.date).getMonth()];r[l]=(r[l]||0)+e.amount,_.value.push({date:e.date,type:e.type,detail:e.typeDetail,description:e.description,total:e.amount})});const s=t;D.value.forEach(e=>{const l=t[new Date(e.paymentDate).getMonth()];o[l]=(o[l]||0)+e.amount,_.value.push({date:e.paymentDate,type:e.type,detail:e.typeDetail,description:e.description,total:e.amount})});const f={type:"line",label:"Ingressos",borderColor:"#B3FFBA",backgroundColor:"#B3FFBA",data:s.map(e=>r[e]||0),fill:!1},c={type:"line",label:"Despeses",borderColor:"#ff336f",backgroundColor:"#ff336f",data:s.map(e=>o[e]||0),fill:!1};return{labels:s,datasets:[f,c]}},P=()=>{const t=getComputedStyle(document.documentElement),r=t.getPropertyValue("--p-text-color"),o=t.getPropertyValue("--p-text-muted-color"),s=t.getPropertyValue("--p-content-border-color");return{maintainAspectRatio:!1,aspectRatio:.8,plugins:{datalabels:{},tooltips:{mode:"index",intersect:!1},legend:{labels:{color:r}}},scales:{x:{stacked:!0,ticks:{color:o},grid:{color:s}},y:{stacked:!0,ticks:{color:o},grid:{color:s}}}}};return(t,r)=>{const o=d("Button"),s=d("Chart"),f=d("TabPanel"),c=d("Column"),w=d("DataTable"),e=d("TabView");return L(),N(O,null,[b("div",z,[b("div",K,[a(Q,{exercises:y(p).exercises,onRangeSelected:x},null,8,["exercises"])]),a(o,{class:"grid_add_row_button",icon:y(B).FILTER_SLASH,onClick:E},null,8,["icon"])]),a(e,null,{default:u(()=>[a(f,{header:"Grafics"},{default:u(()=>[b("div",R,[a(s,{type:"line",data:g.value,options:C.value,class:"w-full h-[70rem]"},null,8,["data","options"])])]),_:1}),a(f,{header:"Data"},{default:u(()=>[a(w,{value:_.value,class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",paginator:"",sortField:"date",sortOrder:1,rows:12},{default:u(()=>[a(c,{field:"date",header:"Data",style:{width:"15%"},sortable:""},{body:u(l=>[$(H(y(J)(l.data.date)),1)]),_:1}),a(c,{header:"Tipus",field:"type"}),a(c,{header:"Detall",field:"detail"}),a(c,{header:"Descripció",field:"description"}),a(c,{header:"Total",field:"total"})]),_:1},8,["value"])]),_:1})]),_:1})],64)}}});const te=Y(U,[["__scopeId","data-v-31a572e2"]]);export{te as default};
