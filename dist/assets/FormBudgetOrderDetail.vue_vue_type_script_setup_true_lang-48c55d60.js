import{_ as T}from"./DropdownReference.vue_vue_type_script_setup_true_lang-5313a810.js";import{c as A,d as v,F as Q}from"./form-validator-f8953ae6.js";import{d as E,h as k,a as y,c as V,D as g,l as w,i as s,w as Y,k as n,Q as L,j as W,K as j,r as q,e as o,s as u,n as f,F as O}from"./index-8f350042.js";import{u as B}from"./reference-a84866df.js";import{u as N}from"./workmaster-4839646e.js";const z={class:"mb-2"},K={key:0,class:"block text-900 mb-2"},X={key:0,class:"flex align-items-center"},G=E({__name:"DropdownWorkmasters",props:{label:{},modelValue:{},referenceId:{}},emits:["update:modelValue"],setup(U,{emit:C}){const e=B(),c=N();return(r,b)=>{const I=k("Dropdown");return y(),V("div",z,[r.label.length>0?(y(),V("label",K,g(r.label),1)):w("",!0),s(I,L({showClear:"",filter:"",options:r.referenceId?n(c).getByReferenceId(r.referenceId):n(c).workmasters,optionValue:"id",optionLabel:i=>n(e).getShortNameById(i.referenceId)+" (Base = "+i.baseQuantity+")",class:"w-full"},r.$attrs,{"model-value":r.modelValue,onChange:b[0]||(b[0]=i=>C("update:modelValue",i.value))}),{option:Y(i=>[i.option?(y(),V("div",X,g(n(e).getShortNameById(i.option.referenceId)+" (Base = "+i.option.baseQuantity+" )"),1)):w("",!0)]),_:1},16,["options","optionLabel","model-value"])])}}}),H={key:0},J={class:"two-columns-7525"},Z={class:"mb-2"},h={class:"three-columns"},_={class:"mb-2"},x={class:"five-columns"},ie=E({__name:"FormBudgetOrderDetail",props:{formAction:{},header:{},detail:{}},emits:["submit"],setup(U,{emit:C}){const e=U,c=N(),r=B(),b=W(),I=j(()=>e.formAction===O.CREATE?"Afegir":"Modificar"),i=q(0),R=()=>{const t=r.references.find(l=>l.id===e.detail.referenceId);t?(e.detail.description=t.description,i.value=t.price,e.detail.unitPrice=t.price,e.detail.workMasterId=null,e.detail.unitCost=t.lastCost,p()):(i.value=0,e.detail.description="",e.detail.unitPrice=0,e.detail.workMasterId=null,e.detail.unitCost=0,e.detail.totalCost=0,e.detail.amount=0)},$=async()=>{if(e.detail.workMasterId){const t=await c.calculate(e.detail.workMasterId,e.detail.quantity);e.detail.unitCost=t.content/e.detail.quantity,e.detail.totalCost=t.content,p()}else R(),e.detail.totalCost=0},M=()=>{e.detail.workMasterId&&(e.detail.totalCost=e.detail.unitCost*e.detail.quantity),p()},p=()=>{e.detail.profit>0?e.detail.amount=e.detail.unitCost*e.detail.quantity*(1+e.detail.profit/100):e.detail.amount=e.detail.unitCost*e.detail.quantity,e.detail.discount>0&&(e.detail.amount=e.detail.amount*(1-e.detail.discount/100));const t=r.references.find(l=>l.id===e.detail.referenceId);e.detail.amount>0&&e.detail.quantity>0?e.detail.unitPrice=e.detail.amount/e.detail.quantity:e.detail.unitPrice=(t==null?void 0:t.price)||0},S=A().shape({quantity:v().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu"),amount:v().required("El total és obligatori").min(1,"El total ha de ser un número positiu"),profit:v().required("El benefici és obligatori"),discount:v().required("El descompte és obligatori")}),m=q({result:!1,errors:{}}),D=()=>{const t=new Q(S);m.value=t.validate(e.detail)},P=async()=>{if(D(),m.value.result)C("submit",e.detail);else{let t="";Object.entries(m.value.errors).forEach(l=>{t+=`${l[1].map(d=>d)}.   `}),b.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,l)=>{const d=k("BaseInput"),F=k("Button");return t.detail?(y(),V("form",H,[o("section",J,[o("div",Z,[s(T,{label:"Referència",modelValue:t.detail.referenceId,"onUpdate:modelValue":[l[0]||(l[0]=a=>t.detail.referenceId=a),l[1]||(l[1]=a=>R())],customerId:t.header.customerId,fullName:!0},null,8,["modelValue","customerId"])]),o("div",null,[s(d,{class:"mb-2",label:"Preu",modelValue:i.value,"onUpdate:modelValue":l[2]||(l[2]=a=>i.value=a),type:n(u).CURRENCY,disabled:""},null,8,["modelValue","type"])])]),o("section",h,[o("div",_,[s(G,{label:"Ruta de fabricació",modelValue:t.detail.workMasterId,"onUpdate:modelValue":[l[3]||(l[3]=a=>t.detail.workMasterId=a),l[4]||(l[4]=a=>$())],referenceId:t.detail.referenceId},null,8,["modelValue","referenceId"])]),o("div",null,[s(d,{class:"mb-2",label:"Cost Unitari",modelValue:t.detail.unitCost,"onUpdate:modelValue":l[5]||(l[5]=a=>t.detail.unitCost=a),type:n(u).CURRENCY,disabled:""},null,8,["modelValue","type"])]),o("div",null,[s(d,{class:"mb-2",label:"Cost Total",modelValue:t.detail.totalCost,"onUpdate:modelValue":l[6]||(l[6]=a=>t.detail.totalCost=a),type:n(u).CURRENCY,disabled:""},null,8,["modelValue","type"])])]),o("section",x,[o("div",null,[s(d,{class:f(["mb-2",{"p-invalid":m.value.errors.quantity}]),label:"Quantitat",modelValue:t.detail.quantity,"onUpdate:modelValue":[l[7]||(l[7]=a=>t.detail.quantity=a),l[8]||(l[8]=a=>M())],type:n(u).NUMERIC},null,8,["modelValue","type","class"])]),o("div",null,[s(d,{class:f(["mb-2",{"p-invalid":m.value.errors.profit}]),label:"% Benefici",modelValue:t.detail.profit,"onUpdate:modelValue":[l[9]||(l[9]=a=>t.detail.profit=a),l[10]||(l[10]=a=>p())],type:n(u).NUMERIC},null,8,["modelValue","type","class"])]),o("div",null,[s(d,{class:f(["mb-2",{"p-invalid":m.value.errors.discount}]),label:"% Descompte",modelValue:t.detail.discount,"onUpdate:modelValue":[l[11]||(l[11]=a=>t.detail.discount=a),l[12]||(l[12]=a=>p())],type:n(u).NUMERIC},null,8,["modelValue","type","class"])]),s(d,{class:"mb-2",label:"Preu Unitari",modelValue:t.detail.unitPrice,"onUpdate:modelValue":l[13]||(l[13]=a=>t.detail.unitPrice=a),type:n(u).CURRENCY,disabled:""},null,8,["modelValue","type"]),o("div",null,[s(d,{class:f(["mb-2",{"p-invalid":m.value.errors.amount}]),label:"Total",modelValue:t.detail.amount,"onUpdate:modelValue":l[14]||(l[14]=a=>t.detail.amount=a),type:n(u).CURRENCY},null,8,["modelValue","type","class"])])]),o("section",null,[o("div",null,[s(d,{class:f(["mb-2",{"p-invalid":m.value.errors.description}]),label:"Descripció",modelValue:t.detail.description,"onUpdate:modelValue":l[15]||(l[15]=a=>t.detail.description=a),type:n(u).TEXT},null,8,["modelValue","type","class"])])]),s(F,{label:I.value,onClick:P,style:{float:"right"}},null,8,["label"])])):w("",!0)}}});export{ie as _};
