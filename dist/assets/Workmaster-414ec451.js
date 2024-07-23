import{_ as U}from"./DropdownReference.vue_vue_type_script_setup_true_lang-b229b9db.js";import{c as L,d as j,a as z,F as A}from"./form-validator-012be6a9.js";import{d as W,j as D,R as Q,r as x,h as y,c as E,e as t,i as l,G as B,k as c,z as G,H as b,l as P,a as I,s as H,$ as T,K as J,x as K,w,L as R,P as S,n as X,m as V,J as Y,v as Z,g as ee,u as te,C as se,o as ae,f as oe}from"./index-abfce291.js";import{u as N}from"./plantmodel-fca63037.js";import{_ as re}from"./FormWorkmasterPhase.vue_vue_type_script_setup_true_lang-400f5084.js";import{u as le}from"./reference-cfffd00c.js";import{u as ne}from"./workmaster-6913f10d.js";import"./index-0d9d6b22.js";const ie={key:0},ce={class:"grid_add_row_button"},de=t("br",null,null,-1),ue={class:"four-columns"},me=t("label",{class:"block text-900 mb-2"},"Desactivat",-1),pe={class:"five-columns"},_e={class:"mt-1"},fe=t("label",{class:"block text-900 mb-2"},"Cost Operari:",-1),ke={class:"summary-field"},he={class:"mt-1"},we=t("label",{class:"block text-900 mb-2"},"Cost Màquina:",-1),be={class:"summary-field"},ye={class:"mt-1"},ve=t("label",{class:"block text-900 mb-2"},"Cost Material:",-1),Ce={class:"summary-field"},ge={class:"mt-1"},Te=t("label",{class:"block text-900 mb-2"},"Cost Extern:",-1),Ie={class:"summary-field"},$e={class:"mt-1"},Me=t("label",{class:"block text-900 mb-2"},"Cost Total:",-1),Be={class:"summary-field"},Pe=W({__name:"FormWorkmaster",props:{workmaster:{}},emits:["submit","calculateCost","cancel"],setup(M,{emit:h}){const d=M,m=D(),v=Q(()=>d.workmaster.operatorCost+d.workmaster.machineCost+d.workmaster.materialCost+d.workmaster.externalCost),_=L().shape({baseQuantity:j().min(1,"La quantitat base ha de ser superior a 0").required("La quanitat base és obligatoria"),referenceId:z().required("La referència és obligatoria")}),r=x({result:!1,errors:{}}),C=()=>{const s=new A(_);r.value=s.validate(d.workmaster)},p=async()=>{if(C(),r.value.result)h("submit",d.workmaster);else{let s="";Object.entries(r.value.errors).forEach(i=>{s+=`${i[1].map(k=>k)}.   `}),m.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}},u=()=>{if(C(),r.value.result)h("calculateCost",d.workmaster);else{let s="";Object.entries(r.value.errors).forEach(i=>{s+=`${i[1].map(k=>k)}.   `}),m.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,i)=>{const k=y("Button"),$=y("Checkbox");return s.workmaster?(I(),E("form",ie,[t("div",ce,[l(k,{label:"Calcular Cost",size:"small",onClick:u}),B("   "),l(k,{label:"Guardar",size:"small",onClick:p}),de]),t("section",ue,[t("div",null,[l(U,{label:"Referència",modelValue:s.workmaster.referenceId,"onUpdate:modelValue":i[0]||(i[0]=a=>s.workmaster.referenceId=a),fullName:!0},null,8,["modelValue"])]),t("div",null,[l(G,{type:c(H).NUMERIC,label:"Quantitat Base",decimals:2,modelValue:s.workmaster.baseQuantity,"onUpdate:modelValue":i[1]||(i[1]=a=>s.workmaster.baseQuantity=a)},null,8,["type","modelValue"])]),t("div",null,[me,l($,{modelValue:s.workmaster.disabled,"onUpdate:modelValue":i[2]||(i[2]=a=>s.workmaster.disabled=a),class:"w-full",binary:!0},null,8,["modelValue"])])]),t("section",pe,[t("div",_e,[fe,t("span",ke,b(c(T)(s.workmaster.operatorCost)),1)]),t("div",he,[we,t("span",be,b(c(T)(s.workmaster.machineCost)),1)]),t("div",ye,[ve,t("span",Ce,b(c(T)(s.workmaster.materialCost)),1)]),t("div",ge,[Te,t("span",Ie,b(c(T)(s.workmaster.externalCost)),1)]),t("div",$e,[Me,t("span",Be,b(c(T)(v.value)),1)])])])):P("",!0)}}}),Se={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ve=t("span",{class:"text-xl text-900 font-bold"},"Fases de la ruta",-1),We=["onClick"],xe=W({__name:"TableWorkmasterPhases",props:{workmaster:{},workmasterPhases:{}},emits:["add","edit","delete"],setup(M,{emit:h}){const d=M,m=J({visible:!1,title:"Nova fase",closable:!0,position:"center",modal:!0}),v=K(),_=N(),r=a=>{var e;if(!_.workcenterTypes)return"";const n=(e=_.workcenterTypes)==null?void 0:e.find(o=>a===o.id);return n?n.name:""},C=a=>{var e;if(!_.workcenters)return"";const n=(e=_.workcenters)==null?void 0:e.find(o=>a===o.id);return n?n.name:""},p=a=>{var e;if(!_.operatorTypes)return"";const n=(e=_.operatorTypes)==null?void 0:e.find(o=>a===o.id);return n?n.name:""},u=x({}),s=()=>{u.value={id:Y(),workMasterId:d.workmaster.id,disabled:!1,code:((d.workmaster.phases.length+1)*10).toString(),description:"",operatorTypeId:null,workcenterTypeId:null,preferredWorkcenterId:null,isExternalWork:!1,externalWorkCost:0,workmasterPhaseDetails:[],workmasterPhaseBillOfMaterials:[]},m.visible=!0},i=a=>{m.visible=!1,h("add",a)},k=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||h("edit",a.data)},$=(a,n)=>{v.require({target:a.currentTarget,message:"Está segur que vol eliminar la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{h("delete",n)}})};return(a,n)=>{const e=y("Button"),o=y("Column"),g=y("BooleanColumn"),q=y("DataTable"),F=y("Dialog");return I(),E(R,null,[l(q,{onRowClick:k,value:a.workmasterPhases,tableStyle:"min-width: 100%","sort-field":"code","sort-order":1},{header:w(()=>[t("div",Se,[Ve,l(e,{icon:c(S).PLUS,rounded:"",raised:"",onClick:s},null,8,["icon"])])]),default:w(()=>[l(o,{field:"code",header:"Codi",sortable:"",style:{width:"10%"}}),l(o,{field:"description",header:"Descripció",style:{width:"20%"}}),l(o,{header:"Tipus de màquina",style:{width:"15%"}},{body:w(f=>[B(b(r(f.data.workcenterTypeId)),1)]),_:1}),l(o,{header:"Màquina preferida",style:{width:"15%"}},{body:w(f=>[B(b(C(f.data.preferredWorkcenterId)),1)]),_:1}),l(o,{header:"Tipus d'operari",style:{width:"15%"}},{body:w(f=>[B(b(p(f.data.operatorTypeId)),1)]),_:1}),l(o,{header:"Extern",style:{width:"10%"}},{body:w(f=>[l(g,{value:f.data.isExternalWork},null,8,["value"])]),_:1}),l(o,{style:{width:"10%"}},{body:w(f=>[t("i",{class:X([c(S).TIMES,"grid_delete_column_button"]),onClick:O=>$(O,f.data)},null,10,We)]),_:1})]),_:1},8,["value"]),l(F,{visible:m.visible,"onUpdate:visible":n[0]||(n[0]=f=>m.visible=f),header:m.title,closable:m.closable,modal:m.modal},{default:w(()=>[u.value?(I(),V(re,{key:0,workmaster:a.workmaster,phase:u.value,onSubmit:i},null,8,["workmaster","phase"])):P("",!0)]),_:1},8,["visible","header","closable","modal"])],64)}}}),Ee={class:"main"},De=W({__name:"Workmaster",setup(M){const h=Z(),d=ee(),m=te(),v=D(),_=le(),r=ne(),C=N(),{workmaster:p}=se(r),u=x("");ae(async()=>{u.value=h.params.id,await s();let e="";e="Ruta de fabricació",p.value&&(e=`${e} ${_.getFullName(p.value.reference)}`),m.setMenuItem({icon:S.BUILDING,backButtonVisible:!0,title:e})});const s=async()=>{await _.fetchReferencesByModule("sales"),await r.fetchOne(u.value),C.fetchActiveModel()},i=async e=>{await r.update(u.value,e)&&await s()},k=async e=>{const o=await r.update(u.value,e),g=await r.calculate(e.id);o&&g.result?(v.add({severity:"success",summary:"Cálcul de cost",detail:`${T(g.content)}`,life:1e4}),await r.fetchOne(u.value)):v.add({severity:"warn",summary:"Cálcul de cost",detail:g.errors.length>0?g.errors[0]:"Errors detectats durant el cálcul",life:1e4})},$=async e=>{await r.createPhase(e)&&d.push({path:`/workmaster/${u.value}/phase/${e.id}`})},a=e=>{d.push({path:`/workmaster/${u.value}/phase/${e.id}`})},n=async e=>{await r.deletePhase(e.id)};return(e,o)=>(I(),E(R,null,[t("header",null,[c(p)?(I(),V(Pe,{key:0,workmaster:c(p),onCalculateCost:k,onSubmit:i},null,8,["workmaster"])):P("",!0)]),t("main",Ee,[c(p)&&c(p).phases?(I(),V(xe,{key:0,workmaster:c(p),workmasterPhases:c(p).phases,onAdd:$,onEdit:a,onDelete:n},null,8,["workmaster","workmasterPhases"])):P("",!0)])],64))}});const ze=oe(De,[["__scopeId","data-v-18fd07fe"]]);export{ze as default};
