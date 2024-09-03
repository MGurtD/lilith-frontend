import{N as E,d as w,h as F,a as P,m as N,w as p,i as o,e as h,H as k,u as O,E as I,r as B,o as V,P as T,O as v,c as L,k as x,L as R,f as W}from"./index-797fdaef.js";import{P as f,d as H}from"./index-e45ffdc0.js";import{u as J}from"./plantmodel-4b5a051b.js";import{_ as Y}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-394dbdfa.js";const $=E({id:"productionCostDashboard",state:()=>({productionCostDashboardGrouped:void 0}),getters:{},actions:{async fetchGroupedByType(r,e){this.productionCostDashboardGrouped=await f.ProductionCostDashboardService.GetGroupedByMonthAndWorkcenterType(r,e)},async fetchGroupedByWorkcenter(r,e){this.productionCostDashboardGrouped=await f.ProductionCostDashboardService.GetGroupedByMonthAndWorkcenterType(r,e)},async fetchGroupedByOperator(r,e){this.productionCostDashboardGrouped=await f.ProductionCostDashboardService.GroupedByMonthAndOperator(r,e)}}}),j=w({__name:"TableProductionCosts",props:{costs:{}},setup(r){const e=r,m=l=>l.toFixed(2);return(l,b)=>{const n=F("Column"),C=F("DataTable");return P(),N(C,{value:e.costs,tableStyle:"min-width: 100%",paginator:"",rows:18,class:"p-datatable-sm",sortMode:"multiple"},{default:p(()=>[o(n,{field:"year",header:"Any"}),o(n,{field:"month",header:"Mes",sortable:""}),o(n,{field:"workcenterName",header:"Centre de treball",sortable:""}),o(n,{field:"workcenterTypeName",header:"Tipus de centre",sortable:""}),o(n,{field:"totalTime",header:"Temps mensual"},{body:p(u=>[h("span",null,k(m(u.data.totalTime))+" hores",1)]),_:1}),o(n,{field:"totalCost",header:"Cost mensual"},{body:p(u=>[h("span",null,k(u.data.totalCost)+" €",1)]),_:1})]),_:1},8,["value"])}}}),Q={class:"dashboard-filter"},q={class:"dashboard-filter-field"},z={class:"dashboard-container"},K=w({__name:"CostDashboard",setup(r){const e=O(),m=$(),l=J(),b=I(),n=new H("/ProductionCost");B({dates:void 0});const C=()=>{e.cleanExercisePicker()},u=B([]);V(async()=>{e.setMenuItem({icon:T.MONEY_BILL,title:"Dashboard costs producció"}),await l.fetchOperators(),await l.fetchWorkcenterTypes(),await b.fetchActive(),e.exercisePicker.exercise||e.setCurrentYear(),A()});const A=async()=>{if(e.exercisePicker.dates){const s=v(e.exercisePicker.dates[0]),c=v(e.exercisePicker.dates[1]);await m.fetchGroupedByType(s,c),y.value=S(),D.value=g();const t=await n.GetGroupedByMonthAndWorkcenterType(s,c);t&&(u.value=t)}},y=B(),D=B(),S=()=>{const s=l.workcenterTypes.map(a=>a.name),c=["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],t={};m.productionCostDashboardGrouped.forEach(a=>{const i=c[a.month-1];t[i]||(t[i]={}),t[i][a.workcenterTypeName]=a.totalCost});const d=Object.keys(t).sort((a,i)=>parseInt(a)-parseInt(i)),_=s.map((a,i)=>({type:"bar",label:a,backgroundColor:G[i],data:d.map(M=>t[M][a]||0)}));return{labels:d,datasets:_}},g=()=>{const s=getComputedStyle(document.documentElement),c=s.getPropertyValue("--p-text-color"),t=s.getPropertyValue("--p-text-muted-color"),d=s.getPropertyValue("--p-content-border-color");return{maintainAspectRatio:!1,aspectRatio:.8,plugins:{datalabels:{},tooltips:{mode:"index",intersect:!1},legend:{labels:{color:c}}},scales:{x:{stacked:!0,ticks:{color:t},grid:{color:d}},y:{stacked:!0,ticks:{color:t},grid:{color:d}}}}},G=["#FFB3BA","#B3FFBA","#BAE1FF","#FFDFBA","#FFFFBA","#BAFFC9","#FFB3E6","#B3FFFF","#FFBEBA","#D1BAFF","#BAFFC9","#C9BAFF","#FFBAD2","#BAFFD1","#FFC9BA","#B3BAFF","#B3FFA1","#FFD1BA","#FFBAE6","#BAE6FF","#F0BAFF","#FFBACD","#A1FFB3","#FFB3FF","#C2FFBA","#FFBAC2","#BAC2FF","#B3FFD1","#FFB3C9","#C9FFA1","#FFDFD1","#A1C9FF","#D1FFBA","#FFB3C9","#BAC2FF","#FFBACD","#BAFFC2","#D1BAFF","#FFBAF0","#BAFFDA"];return(s,c)=>{const t=F("Button"),d=F("Chart"),_=F("TabPanel"),a=F("TabView");return P(),L(R,null,[h("div",Q,[h("div",q,[o(Y,{exercises:x(b).exercises,onRangeSelected:A},null,8,["exercises"])]),o(t,{class:"grid_add_row_button",icon:x(T).FILTER_SLASH,onClick:C},null,8,["icon"])]),o(a,null,{default:p(()=>[o(_,{header:"Grafics"},{default:p(()=>[h("div",z,[o(d,{type:"bar",data:y.value,options:D.value,class:"w-full h-[70rem]"},null,8,["data","options"])])]),_:1}),o(_,{header:"Data"},{default:p(()=>[o(j,{costs:u.value},null,8,["costs"])]),_:1})]),_:1})],64)}}});const te=W(K,[["__scopeId","data-v-bc71d457"]]);export{te as default};
