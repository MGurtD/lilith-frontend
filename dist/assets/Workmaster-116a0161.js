import{_ as U}from"./DropdownReference.vue_vue_type_script_setup_true_lang-1c10b529.js";import{c as O,d as j,a as L,F as z}from"./form-validator-497b2185.js";import{d as V,j as E,r as W,h,c as M,e as d,i as r,C as I,k as _,y as A,l as $,a as v,s as Q,E as G,x as H,w as b,G as D,P,D as B,n as J,m as S,v as K,g as X,u as Y,z as Z,o as ee,f as te}from"./index-30e64f83.js";import{g as ae}from"./functions-20418450.js";import{u as x}from"./plantmodel-23537ae7.js";import{_ as se}from"./FormWorkmasterPhase.vue_vue_type_script_setup_true_lang-da6a2c9e.js";import{u as re}from"./reference-e2691777.js";import{u as oe}from"./workmaster-3ee45dce.js";import"./v4-a960c1f4.js";import"./index-b8eb6b9a.js";import"./base.service-3e1c705c.js";import"./reference.service-385b31b8.js";const ne={key:0},le={class:"grid_add_row_button"},ie=d("br",null,null,-1),ce={class:"three-columns"},de=d("label",{class:"block text-900 mb-2"},"Desactivat",-1),ue=V({__name:"FormWorkmaster",props:{workmaster:{}},emits:["submit","calculateCost","cancel"],setup(T,{emit:w}){const f=T,i=E(),y=O().shape({baseQuantity:j().min(1,"La quantitat base ha de ser superior a 0").required("La quanitat base és obligatoria"),referenceId:L().required("La referència és obligatoria")}),o=W({result:!1,errors:{}}),u=()=>{const t=new z(y);o.value=t.validate(f.workmaster)},C=async()=>{if(u(),o.value.result)w("submit",f.workmaster);else{let t="";Object.entries(o.value.errors).forEach(n=>{t+=`${n[1].map(p=>p)}.   `}),i.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}},c=()=>{if(u(),o.value.result)w("calculateCost",f.workmaster);else{let t="";Object.entries(o.value.errors).forEach(n=>{t+=`${n[1].map(p=>p)}.   `}),i.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,n)=>{const p=h("Button"),g=h("Checkbox");return t.workmaster?(v(),M("form",ne,[d("div",le,[r(p,{label:"Calcular Cost",size:"small",onClick:c}),I("   "),r(p,{label:"Guardar",size:"small",onClick:C}),ie]),d("section",ce,[d("div",null,[r(U,{label:"Referència",modelValue:t.workmaster.referenceId,"onUpdate:modelValue":n[0]||(n[0]=k=>t.workmaster.referenceId=k),fullName:!0},null,8,["modelValue"])]),d("div",null,[r(A,{type:_(Q).NUMERIC,label:"Quantitat Base",decimals:2,modelValue:t.workmaster.baseQuantity,"onUpdate:modelValue":n[1]||(n[1]=k=>t.workmaster.baseQuantity=k)},null,8,["type","modelValue"])]),d("div",null,[de,r(g,{modelValue:t.workmaster.disabled,"onUpdate:modelValue":n[2]||(n[2]=k=>t.workmaster.disabled=k),class:"w-full",binary:!0},null,8,["modelValue"])])])])):$("",!0)}}}),me={class:"flex flex-wrap align-items-center justify-content-between gap-2"},pe=d("span",{class:"text-xl text-900 font-bold"},"Fases de la ruta",-1),fe=["onClick"],ke=V({__name:"TableWorkmasterPhases",props:{workmaster:{},workmasterPhases:{}},emits:["add","edit","delete"],setup(T,{emit:w}){const f=T,i=G({visible:!1,title:"Nova fase",closable:!0,position:"center",modal:!0}),y=H(),o=x(),u=s=>{var e;if(!o.workcenterTypes)return"";const l=(e=o.workcenterTypes)==null?void 0:e.find(a=>s===a.id);return l?l.name:""},C=s=>{var e;if(!o.workcenters)return"";const l=(e=o.workcenters)==null?void 0:e.find(a=>s===a.id);return l?l.name:""},c=s=>{var e;if(!o.operatorTypes)return"";const l=(e=o.operatorTypes)==null?void 0:e.find(a=>s===a.id);return l?l.name:""},t=W({}),n=()=>{t.value={id:ae(),workMasterId:f.workmaster.id,disabled:!1,code:((f.workmaster.phases.length+1)*10).toString(),description:"",operatorTypeId:null,workcenterTypeId:null,preferredWorkcenterId:null,isExternalWork:!1,externalWorkCost:0,workmasterPhaseDetails:[],workmasterPhaseBillOfMaterials:[]},i.visible=!0},p=s=>{i.visible=!1,w("add",s)},g=s=>{s.originalEvent.target.className.includes("grid_delete_column_button")||w("edit",s.data)},k=(s,l)=>{y.require({target:s.currentTarget,message:"Está segur que vol eliminar la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{w("delete",l)}})};return(s,l)=>{const e=h("Button"),a=h("Column"),N=h("BooleanColumn"),R=h("DataTable"),q=h("Dialog");return v(),M(D,null,[r(R,{onRowClick:g,value:s.workmasterPhases,tableStyle:"min-width: 100%"},{header:b(()=>[d("div",me,[pe,r(e,{icon:_(P).PLUS,rounded:"",raised:"",onClick:n},null,8,["icon"])])]),default:b(()=>[r(a,{field:"code",header:"Codi",style:{width:"10%"}}),r(a,{field:"description",header:"Descripció",style:{width:"20%"}}),r(a,{header:"Tipus de màquina",style:{width:"15%"}},{body:b(m=>[I(B(u(m.data.workcenterTypeId)),1)]),_:1}),r(a,{header:"Màquina preferida",style:{width:"15%"}},{body:b(m=>[I(B(C(m.data.preferredWorkcenterId)),1)]),_:1}),r(a,{header:"Tipus d'operari",style:{width:"15%"}},{body:b(m=>[I(B(c(m.data.operatorTypeId)),1)]),_:1}),r(a,{header:"Extern",style:{width:"10%"}},{body:b(m=>[r(N,{value:m.data.isExternalWork},null,8,["value"])]),_:1}),r(a,{style:{width:"10%"}},{body:b(m=>[d("i",{class:J([_(P).TIMES,"grid_delete_column_button"]),onClick:F=>k(F,m.data)},null,10,fe)]),_:1})]),_:1},8,["value"]),r(q,{visible:i.visible,"onUpdate:visible":l[0]||(l[0]=m=>i.visible=m),header:i.title,closable:i.closable,modal:i.modal},{default:b(()=>[t.value?(v(),S(se,{key:0,workmaster:s.workmaster,phase:t.value,onSubmit:p},null,8,["workmaster","phase"])):$("",!0)]),_:1},8,["visible","header","closable","modal"])],64)}}}),_e={class:"main"},we=V({__name:"Workmaster",setup(T){const w=K(),f=X(),i=Y(),y=E(),o=re(),u=oe(),C=x(),{workmaster:c}=Z(u),t=W("");ee(async()=>{t.value=w.params.id,await n();let e="";e="Ruta de fabricació",c.value&&(e=`${e} ${o.getFullName(c.value.reference)}`),i.setMenuItem({icon:P.BUILDING,backButtonVisible:!0,title:e})});const n=async()=>{await o.fetchReferencesByModule("sales"),await u.fetchOne(t.value),C.fetchActiveModel()},p=async e=>{await u.update(t.value,e)&&await n()},g=async e=>{const a=await u.calculate(e.id);a.result?y.add({severity:"success",summary:"Cálcul de cost",detail:`${a.content} €`}):y.add({severity:"warn",summary:"Cálcul de cost",detail:a.errors.length>0?a.errors[0]:"Errors detectats durant el cálcul",life:1e4})},k=async e=>{await u.createPhase(e)&&f.push({path:`/workmaster/${t.value}/phase/${e.id}`})},s=e=>{f.push({path:`/workmaster/${t.value}/phase/${e.id}`})},l=async e=>{await u.deletePhase(e.id)};return(e,a)=>(v(),M(D,null,[d("header",null,[_(c)?(v(),S(ue,{key:0,workmaster:_(c),onCalculateCost:g,onSubmit:p},null,8,["workmaster"])):$("",!0)]),d("main",_e,[_(c)&&_(c).phases?(v(),S(ke,{key:0,workmaster:_(c),workmasterPhases:_(c).phases,onAdd:k,onEdit:s,onDelete:l},null,8,["workmaster","workmasterPhases"])):$("",!0)])],64))}});const Ve=te(we,[["__scopeId","data-v-b77b9b04"]]);export{Ve as default};
