import{_ as ee}from"./DropdownReference.vue_vue_type_script_setup_true_lang-e5a98945.js";import{c as te,d as B,F as oe}from"./form-validator-9bee509e.js";import{d as K,h as T,a as N,c as F,H as D,l as z,i as r,w as C,a3 as ae,k as a,r as V,K as L,W as le,T as W,o as h,af as se,m as J,e as i,s as c,z as j,G as H,B as ne,j as re,ag as ie,F as X,ad as O,n as x}from"./index-8529e343.js";import{u as Z}from"./reference-4d9dd56a.js";import{u as G}from"./workmaster-236b3b5e.js";import{u as ue}from"./plantmodel-9213c5b9.js";const de={class:"mb-2"},me={key:0,class:"block text-900 mb-2"},ce={key:0,class:"flex align-items-center"},pe=K({__name:"DropdownWorkmasters",props:{label:{},modelValue:{},referenceId:{}},emits:["update:modelValue"],setup(_,{emit:R}){const p=Z(),P=G(),k=d=>{var e;const v=p.getShortNameById(d.referenceId);let f=(e=P.workmasterModes.find(M=>M.id===d.mode))==null?void 0:e.value;return`${v}  (Base = ${d.baseQuantity} )  ${f}`};return(d,v)=>{const f=T("Dropdown");return N(),F("div",de,[d.label.length>0?(N(),F("label",me,D(d.label),1)):z("",!0),r(f,ae({showClear:"",filter:"",options:d.referenceId?a(P).getByReferenceId(d.referenceId):a(P).workmasters,optionValue:"id",optionLabel:k,class:"w-full"},d.$attrs,{"model-value":d.modelValue,onChange:v[0]||(v[0]=e=>R("update:modelValue",e.value))}),{option:C(e=>[e.option?(N(),F("div",ce,D(k(e.option)),1)):z("",!0)]),_:1},16,["options","model-value"])])}}}),ve={class:"flex flex-wrap align-items-center justify-content-between gap-2"},fe=i("span",{class:"text-l text-900"},"Temps total operatiu: ",-1),ye=i("span",{class:"text-l text-900 font-bold"},"Benefici ponderat ",-1),Ce=K({__name:"TableWorkmasterProfit",props:{workMasterId:{},quantity:{}},emits:["updateProfitAverage"],setup(_,{emit:R}){const p=_,P=V([{field:"code",order:1},{field:"order",order:1}]),k=G(),d=ue(),v=V([]),f=V(void 0),e=V(void 0),M=L({}),g=L({}),U=V(0),u=L({}),$=(s,o)=>s.flatMap(t=>t.details.map(n=>{const I=`${t.code}-${n.order}-${t.workcenterTypeId}`;return I in u||(u[I]=t.profitPercentage??0),{id:n.id,code:t.code,order:n.order,workcenterTypeId:t.workcenterTypeId||"",machineStatusId:n.machineStatusId||"",estimatedTime:n.isCycleTime?n.estimatedTime*o:n.estimatedTime,isCycleTime:n.isCycleTime,profitPercentage:t.isExternalWork?0:u[I]}}));le(()=>p.quantity,(s,o)=>{E()});const w=W(()=>$(v.value,p.quantity)),A=W(()=>w.value.reduce((s,o)=>s+o.estimatedTime,0));h(async()=>{await d.fetchWorkcenterTypes(),await d.fetchMachineStatuses(),f.value=d.workcenterTypes||[],e.value=d.machineStatuses||[],w.value.forEach(s=>{const o=q(s);s.workcenterTypeId in M||(M[o]=s.profitPercentage),s.workcenterTypeId in g||(g[o]=s.estimatedTime)}),E()}),se(async()=>{var s;p.workMasterId?(await k.fetchOne(p.workMasterId),v.value=((s=k.workmaster)==null?void 0:s.phases)||[]):v.value=[],E()});const q=s=>`${s.code}-${s.order}-${s.workcenterTypeId}`,b=s=>{var t;const o=(t=f.value)==null?void 0:t.find(n=>n.id===s);return(o==null?void 0:o.name)||"No definit"},Y=s=>{var t;const o=(t=e.value)==null?void 0:t.find(n=>n.id===s);return(o==null?void 0:o.name)||"No definit"},Q=()=>{R("updateProfitAverage",U.value)},y=(s,o)=>{if(typeof o=="number"){const t=q(s);u[t]=o,s.profitPercentage=o,M[t]=o,E()}else console.error("Attempted to set a non-number value for profit percentage:",o)},E=()=>{let s=0,o=0;w.value.forEach(t=>{const n=q(t),I=u[n],m=g[n]??t.estimatedTime;s+=m,o+=m*I}),console.log(o),console.log(s),console.log(Number((o/s).toFixed(2))),U.value=!isNaN(s)&&s>0&&!isNaN(o)?Number((o/s).toFixed(2)):0};return(s,o)=>{const t=T("Column"),n=T("Button"),I=T("DataTable");return N(),J(I,{sortMode:"multiple",multiSortMeta:P.value,value:w.value},{footer:C(()=>[i("div",ve,[fe,r(j,{type:a(c).NUMERIC,minFractionDigits:0,class:"mb-2",id:"totalTime",modelValue:A.value,readonly:"",disabled:""},null,8,["type","modelValue"]),ye,r(j,{type:a(c).NUMERIC,minFractionDigits:2,class:"mb-2",id:"profitAverage",modelValue:U.value,suffix:"%",readonly:""},null,8,["type","modelValue"]),r(n,{onClick:Q,icon:"pi pi-copy",label:"Aplicar"})])]),default:C(()=>[r(t,{field:"code",sortable:"",header:"Fase"}),r(t,{field:"order",sortable:"",header:"Pas"}),r(t,{field:"workcenterTypeId",header:"Màquina"},{body:C(m=>[H(D(b(m.data.workcenterTypeId)),1)]),_:1}),r(t,{field:"machineStatusId",header:"Estat"},{body:C(m=>[H(D(Y(m.data.machineStatusId)),1)]),_:1}),r(t,{field:"estimatedTime",header:"Temps total"}),r(t,{field:"isCycleTime",header:"Temps de cicle"},{body:C(m=>[r(ne,{value:m.data.isCycleTime},null,8,["value"])]),_:1}),r(t,{header:"% de benefici"},{body:C(m=>[r(j,{type:a(c).NUMERIC,minFractionDigits:2,class:"mb-2",id:"profitPercentage",modelValue:m.data.profitPercentage,"onUpdate:modelValue":S=>m.data.profitPercentage=S,onInput:S=>y(m.data,S.value),suffix:"%"},null,8,["type","modelValue","onUpdate:modelValue","onInput"])]),_:1})]),_:1},8,["multiSortMeta","value"])}}}),be={key:0},Ie={class:"three-columns"},Ve={class:"mb-2"},ke={class:"mb-2"},ge={class:"five-columns"},we={class:"five-columns"},Re=K({__name:"FormBudgetOrderDetail",props:{formAction:{},header:{},detail:{},readonly:{type:Boolean}},emits:["submit"],setup(_,{emit:R}){const p=_,P=G(),k=Z(),d=re(),v=o=>{p.detail.profit=o,b(),f.value=0},f=V(0),{detail:e}=ie(p),M=W(()=>p.formAction===X.CREATE?"Afegir":"Modificar");h(()=>{p.formAction===X.EDIT&&$(!0)});const g=V(0),U=()=>{const o=k.references.find(t=>t.id===e.value.referenceId);o?(e.value.description=o.description,g.value=o.price,e.value.unitPrice=o.price,e.value.workMasterId=null,e.value.unitCost=o.lastCost,b()):(g.value=0,e.value.description="",e.value.unitPrice=0,e.value.workMasterId=null,e.value.unitCost=0,e.value.totalCost=0,e.value.amount=0)},u=V({machineCost:0,materialCost:0,operatorCost:0,externalTransportCost:0,externalServiceCost:0}),$=async o=>{if(e.value.workMasterId){const t=await P.getCosts(e.value.workMasterId,e.value.quantity);t.result&&t.content&&(u.value=t.content,o||(e.value.transportCost=u.value.externalTransportCost,e.value.serviceCost=u.value.externalServiceCost),e.value.totalCost=u.value.machineCost+u.value.materialCost+u.value.operatorCost+e.value.transportCost+e.value.serviceCost,e.value.unitCost=e.value.totalCost/e.value.quantity,b())}else U(),e.value.transportCost=0,e.value.serviceCost=0,e.value.totalCost=0},w=W(()=>e.value.workMasterId?u.value.machineCost===0&&u.value.materialCost===0&&u.value.operatorCost===0?e.value.totalCost-e.value.serviceCost-e.value.transportCost:u.value.machineCost+u.value.materialCost+u.value.operatorCost:0),A=()=>{e.value.totalCost=w.value+e.value.serviceCost+e.value.transportCost,e.value.unitCost=e.value.totalCost/e.value.quantity,b()},q=()=>{e.value.quantity||(e.value.quantity=1),e.value.workMasterId&&$(!0),b()},b=()=>{if(e.value.unitPrice=e.value.unitCost,e.value.unitPrice===0){const o=k.references.find(t=>t.id===e.value.referenceId);e.value.unitPrice=(o==null?void 0:o.price)||0}e.value.profit>0&&(e.value.unitPrice*=1+e.value.profit/100),e.value.discount>0&&(e.value.unitPrice*=1-e.value.discount/100),e.value.unitPrice=O.round(e.value.unitPrice,2),e.value.amount=O.round(e.value.unitPrice*e.value.quantity,2)},Y=()=>{e.value.amount=O.round(e.value.unitPrice*e.value.quantity,2)},Q=te().shape({quantity:B().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu"),amount:B().required("El total és obligatori").min(1,"El total ha de ser un número positiu"),profit:B().required("El benefici és obligatori"),discount:B().required("El descompte és obligatori"),unitPrice:B().required("El preu unitari és obligatori")}),y=V({result:!1,errors:{}}),E=()=>{const o=new oe(Q);y.value=o.validate(p.detail)},s=async()=>{if(E(),y.value.result)R("submit",p.detail);else{let o="";Object.entries(y.value.errors).forEach(t=>{o+=`${t[1].map(n=>n)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,t)=>{const n=T("BaseInput"),I=T("Button"),m=T("TabPanel"),S=T("TabView");return N(),J(S,{activeIndex:f.value,"onUpdate:activeIndex":t[22]||(t[22]=l=>f.value=l)},{default:C(()=>[r(m,{header:"Referència"},{default:C(()=>[a(e)?(N(),F("form",be,[i("section",Ie,[i("div",Ve,[r(ee,{label:"Referència",modelValue:a(e).referenceId,"onUpdate:modelValue":[t[0]||(t[0]=l=>a(e).referenceId=l),t[1]||(t[1]=l=>U())],customerId:o.header.customerId,fullName:!0},null,8,["modelValue","customerId"])]),i("div",null,[r(n,{class:"mb-2",label:"Preu",modelValue:g.value,"onUpdate:modelValue":t[2]||(t[2]=l=>g.value=l),type:a(c).CURRENCY,disabled:""},null,8,["modelValue","type"])]),i("div",ke,[r(pe,{label:"Ruta de fabricació",modelValue:a(e).workMasterId,"onUpdate:modelValue":[t[3]||(t[3]=l=>a(e).workMasterId=l),t[4]||(t[4]=l=>$(!1))],referenceId:a(e).referenceId},null,8,["modelValue","referenceId"])])]),i("section",ge,[i("div",null,[r(n,{class:"mb-2",label:"Cost Intern",modelValue:w.value,"onUpdate:modelValue":t[5]||(t[5]=l=>w.value=l),type:a(c).CURRENCY,disabled:""},null,8,["modelValue","type"])]),i("div",null,[r(n,{class:"mb-2",label:"Cost Servei",modelValue:a(e).serviceCost,"onUpdate:modelValue":[t[6]||(t[6]=l=>a(e).serviceCost=l),t[7]||(t[7]=l=>A())],type:a(c).CURRENCY,disabled:a(e).workMasterId===null},null,8,["modelValue","type","disabled"])]),i("div",null,[r(n,{class:"mb-2",label:"Cost Transport",modelValue:a(e).transportCost,"onUpdate:modelValue":[t[8]||(t[8]=l=>a(e).transportCost=l),t[9]||(t[9]=l=>A())],type:a(c).CURRENCY,disabled:a(e).workMasterId===null},null,8,["modelValue","type","disabled"])]),i("div",null,[r(n,{class:"mb-2",label:"Cost Unitari",modelValue:a(e).unitCost,"onUpdate:modelValue":t[10]||(t[10]=l=>a(e).unitCost=l),type:a(c).CURRENCY,disabled:""},null,8,["modelValue","type"])]),i("div",null,[r(n,{class:"mb-2",label:"Cost Total",modelValue:a(e).totalCost,"onUpdate:modelValue":t[11]||(t[11]=l=>a(e).totalCost=l),type:a(c).CURRENCY,disabled:""},null,8,["modelValue","type"])])]),i("section",we,[i("div",null,[r(n,{class:x(["mb-2",{"p-invalid":y.value.errors.quantity}]),label:"Quantitat",modelValue:a(e).quantity,"onUpdate:modelValue":[t[12]||(t[12]=l=>a(e).quantity=l),t[13]||(t[13]=l=>q())],type:a(c).NUMERIC},null,8,["modelValue","type","class"])]),i("div",null,[r(n,{class:x(["mb-2",{"p-invalid":y.value.errors.profit}]),label:"% Benefici",modelValue:a(e).profit,"onUpdate:modelValue":[t[14]||(t[14]=l=>a(e).profit=l),t[15]||(t[15]=l=>b())],type:a(c).NUMERIC},null,8,["modelValue","type","class"])]),i("div",null,[r(n,{class:x(["mb-2",{"p-invalid":y.value.errors.discount}]),label:"% Descompte",modelValue:a(e).discount,"onUpdate:modelValue":[t[16]||(t[16]=l=>a(e).discount=l),t[17]||(t[17]=l=>b())],type:a(c).NUMERIC},null,8,["modelValue","type","class"])]),r(n,{class:"mb-2",label:"Preu Unitari",modelValue:a(e).unitPrice,"onUpdate:modelValue":[t[18]||(t[18]=l=>a(e).unitPrice=l),t[19]||(t[19]=l=>Y())],type:a(c).CURRENCY},null,8,["modelValue","type"]),i("div",null,[r(n,{class:x(["mb-2",{"p-invalid":y.value.errors.amount}]),label:"Total",modelValue:a(e).amount,"onUpdate:modelValue":t[20]||(t[20]=l=>a(e).amount=l),disabled:"",type:a(c).CURRENCY},null,8,["modelValue","type","class"])])]),i("section",null,[i("div",null,[r(n,{class:x(["mb-2",{"p-invalid":y.value.errors.description}]),label:"Descripció",modelValue:a(e).description,"onUpdate:modelValue":t[21]||(t[21]=l=>a(e).description=l),type:a(c).TEXT},null,8,["modelValue","type","class"])])]),r(I,{disabled:o.readonly,label:M.value,onClick:s,style:{float:"right"}},null,8,["disabled","label"])])):z("",!0)]),_:1}),r(m,{header:"Marges"},{default:C(()=>[r(Ce,{workMasterId:a(e).workMasterId,quantity:a(e).quantity,onUpdateProfitAverage:v},null,8,["workMasterId","quantity"])]),_:1})]),_:1},8,["activeIndex"])}}});export{Re as _};
