import{d as j,j as H,z as Y,r as h,h as I,a as O,c as U,k as a,e as r,i as l,n as x,s as q,y as J,l as k,p as de,b as ue,f as ce,H as me,w as p,D,F as w,m as L,L as pe,C as G,P as K,v as fe,g as ve,u as be,o as _e,G as ye}from"./index-42358d85.js";import{c as De,f as Oe,g as P}from"./functions-8d6e0d81.js";import{u as W}from"./salesOrder-05162b8a.js";import{u as X}from"./reference-71261d6f.js";import{u as Z}from"./customers-de1225b1.js";import{u as ee}from"./exercise-64670ae8.js";import{u as te}from"./plantmodel-2a0cd3fa.js";import{u as se}from"./lifecycle-5725cb00.js";import{c as ae,a as z,F as le,d as Ie}from"./form-validator-fe04ca9d.js";import{_ as Se}from"./FormReference.vue_vue_type_script_setup_true_lang-b94208bb.js";import{F as Ve}from"./FileEntityPicker-509b32a0.js";import"./v4-a960c1f4.js";import"./index-4e9414b0.js";import"./base.service-ed93fa00.js";import"./reference.service-e0cdda03.js";import"./index-b0b545c9.js";import"./tax-c1da6457.js";import"./file.service-aae8471e.js";const A=g=>(de("data-v-8b0fe509"),g=g(),ue(),g),Ce={key:0},we={class:"four-columns"},ge={class:"mt-1"},Te=A(()=>r("label",{class:"block text-900 mb-2"},"Exercici",-1)),xe={class:"mt-1"},Ee={class:"mt-1"},Ne=A(()=>r("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),he={class:"mt-1"},ke=A(()=>r("label",{class:"block text-900 mb-2"},"Estat",-1)),$e={class:"three-columns"},Re={class:"mt-1"},Fe=A(()=>r("label",{class:"block text-900 mb-2"},"Origen",-1)),Ue={class:"mt-1"},Be=A(()=>r("label",{class:"block text-900 mb-2"},"Client",-1)),Le={class:"mt-1"},qe=j({__name:"FormSalesOrder",emits:["submit","cancel"],setup(g,{expose:T,emit:d}){const E=W(),N=Z(),b=te(),f=ee(),v=se();X();const $=H(),{salesOrder:e}=Y(E),R=ae().shape({siteId:z().required("L'origen es obligatori"),customerId:z().required("El client es obligatori"),statusId:z().required("L'estat es obligatori"),exerciseId:z().required("L'exercici es obligatori")}),m=h({result:!1,errors:{}}),s=()=>{const o=new le(R);m.value=o.validate(e.value)};T({submitForm:async()=>{if(s(),m.value.result)e.value.salesOrderDate=De(e.value.salesOrderDate),d("submit",e.value);else{let o="";Object.entries(m.value.errors).forEach(t=>{o+=`${t[1].map(_=>_)}.   `}),$.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}}});const S=()=>{var t;const o=(t=N.customers)==null?void 0:t.find(_=>{var C;return _.id===((C=e.value)==null?void 0:C.customerId)});o&&e.value&&(e.value.customerCode=o.code,e.value.customerComercialName=o.comercialName,e.value.customerTaxName=o.taxName,e.value.customerVatNumber=o.vatNumber,e.value.customerAccountNumber=o.accountNumber),console.log(e.value)},V=()=>{var t;const o=(t=b.sites)==null?void 0:t.find(_=>{var C;return _.id===((C=e.value)==null?void 0:C.siteId)});o&&e.value&&(e.value.name=o.name,e.value.address=o.address,e.value.city=o.city,e.value.postalCode=o.postalCode,e.value.region=o.region,e.value.country=o.country,e.value.vatNumber=o.vatNumber)};return(o,t)=>{var B;const _=I("Dropdown"),C=I("Calendar");return O(),U("div",null,[a(e)?(O(),U("form",Ce,[r("section",we,[r("div",ge,[Te,l(_,{modelValue:a(e).exerciseId,"onUpdate:modelValue":t[0]||(t[0]=c=>a(e).exerciseId=c),editable:"",options:a(f).exercises,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":m.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),r("div",xe,[l(J,{type:a(q).TEXT,label:"Num. Comanda",id:"salesOrderNumber",modelValue:a(e).salesOrderNumber,"onUpdate:modelValue":t[1]||(t[1]=c=>a(e).salesOrderNumber=c),disabled:""},null,8,["type","modelValue"])]),r("div",Ee,[Ne,l(C,{modelValue:a(e).salesOrderDate,"onUpdate:modelValue":t[2]||(t[2]=c=>a(e).salesOrderDate=c),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),r("div",he,[ke,l(_,{modelValue:a(e).statusId,"onUpdate:modelValue":t[3]||(t[3]=c=>a(e).statusId=c),editable:"",options:(B=a(v).lifecycle)==null?void 0:B.statuses,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":m.value.errors.statusId}])},null,8,["modelValue","options","class"])])]),r("section",$e,[r("div",Re,[Fe,l(_,{modelValue:a(e).siteId,"onUpdate:modelValue":[t[4]||(t[4]=c=>a(e).siteId=c),t[5]||(t[5]=c=>V())],editable:"",options:a(b).sites,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":m.value.errors.siteId}])},null,8,["modelValue","options","class"])]),r("div",Ue,[Be,l(_,{modelValue:a(e).customerId,"onUpdate:modelValue":[t[6]||(t[6]=c=>a(e).customerId=c),t[7]||(t[7]=c=>S())],editable:"",options:a(N).customers,optionValue:"id",optionLabel:"comercialName",class:x(["w-full",{"p-invalid":m.value.errors.customerId}])},null,8,["modelValue","options","class"])]),r("div",Le,[l(J,{type:a(q).TEXT,label:"Comanda Client",id:"customerSalesOrderNumber",modelValue:a(e).customerSalesOrderNumber,"onUpdate:modelValue":t[8]||(t[8]=c=>a(e).customerSalesOrderNumber=c)},null,8,["type","modelValue"])])])])):k("",!0)])}}});const Ae=ce(qe,[["__scopeId","data-v-8b0fe509"]]),Me={key:0},ze={class:"mb-2"},je=r("label",{class:"block text-900 mb-2"},"Referència",-1),Ge={key:0,class:"flex align-items-center"},Pe={key:0,class:"flex align-items-center"},He={class:"two-columns"},Xe=j({__name:"FormSalesOrderReference",props:{formAction:{},salesOrderDetail:{}},emits:["submit"],setup(g,{emit:T}){const d=g,E=X(),N=H(),b=me(()=>d.formAction===w.CREATE?"Afegir":"Modificar"),f=()=>{const s=E.references.find(n=>n.id===d.salesOrderDetail.referenceId);s&&(d.salesOrderDetail.description=`${s.code} (${s.version}) - ${s.description}`,d.salesOrderDetail.isInvoiced=!1,d.salesOrderDetail.isServed=!1,d.salesOrderDetail.unitCost=s==null?void 0:s.cost,d.salesOrderDetail.unitPrice=s==null?void 0:s.price,v())},v=()=>{d.salesOrderDetail.amount=d.salesOrderDetail.unitPrice*d.salesOrderDetail.quantity,d.salesOrderDetail.totalCost=d.salesOrderDetail.unitCost*d.salesOrderDetail.quantity},$=ae().shape({quantity:Ie().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu")}),e=h({result:!1,errors:{}}),R=()=>{const s=new le($);e.value=s.validate(d.salesOrderDetail)},m=async()=>{if(R(),e.value.result)T("submit",d.salesOrderDetail);else{let s="";Object.entries(e.value.errors).forEach(n=>{s+=`${n[1].map(S=>S)}.   `}),N.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,n)=>{const S=I("Dropdown"),V=I("BaseInput"),o=I("Button");return s.salesOrderDetail?(O(),U("form",Me,[r("div",ze,[je,l(S,{modelValue:s.salesOrderDetail.referenceId,"onUpdate:modelValue":[n[0]||(n[0]=t=>s.salesOrderDetail.referenceId=t),n[1]||(n[1]=t=>f())],editable:"",options:a(E).references,optionValue:"id",optionLabel:"description",class:x(["w-full",{"p-invalid":e.value.errors.referenceId}])},{value:p(t=>[t.value?(O(),U("div",Ge,D(t.value.code)+" ("+D(t.value.version)+") - "+D(t.value.description),1)):k("",!0)]),option:p(t=>[t.option?(O(),U("div",Pe,D(t.option.code)+" ("+D(t.option.version)+") - "+D(t.option.description),1)):k("",!0)]),_:1},8,["modelValue","options","class"])]),r("section",He,[r("div",null,[l(V,{class:x(["mb-2",{"p-invalid":e.value.errors.quantity}]),label:"Quantitat",modelValue:s.salesOrderDetail.quantity,"onUpdate:modelValue":[n[2]||(n[2]=t=>s.salesOrderDetail.quantity=t),n[3]||(n[3]=t=>v())],type:a(q).NUMERIC},null,8,["modelValue","type","class"])]),r("div",null,[l(V,{class:x(["mb-2",{"p-invalid":e.value.errors.amount}]),label:"Total",modelValue:s.salesOrderDetail.amount,"onUpdate:modelValue":n[4]||(n[4]=t=>s.salesOrderDetail.amount=t),type:a(q).CURRENCY,disabled:""},null,8,["modelValue","type","class"])])]),r("section",null,[r("div",null,[l(V,{class:x(["mb-2",{"p-invalid":e.value.errors.description}]),label:"Descripció línea",modelValue:s.salesOrderDetail.description,"onUpdate:modelValue":n[5]||(n[5]=t=>s.salesOrderDetail.description=t),type:a(q).TEXT},null,8,["modelValue","type","class"])])]),l(o,{label:b.value,onClick:m,style:{float:"right"}},null,8,["label"])])):k("",!0)}}}),Qe=["onClick"],Je=j({__name:"TableSalesOrderDetails",props:{salesOrderDetails:{}},emits:["edit","delete"],setup(g,{emit:T}){const d=g,E=b=>{b.originalEvent.target.className.includes("grid_delete_column_button")||T("edit",b.data)},N=(b,f)=>{T("delete",f)};return(b,f)=>{const v=I("Column"),$=I("DataTable");return O(),L($,{onRowClick:E,value:d.salesOrderDetails,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:p(()=>[pe(b.$slots,"header")]),default:p(()=>[l(v,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),l(v,{header:"Referencia",style:{width:"25%"}},{body:p(e=>[G(D(e.data.reference.code)+" ("+D(e.data.reference.version)+") - "+D(e.data.reference.description),1)]),_:1}),l(v,{field:"description",header:"Descripció",style:{width:"25%"}}),l(v,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:p(e=>[G(D(e.data.unitPrice)+" € ",1)]),_:1}),l(v,{field:"amount",header:"Total",style:{width:"10%"}},{body:p(e=>[G(D(e.data.amount)+" € ",1)]),_:1}),l(v,{style:{width:"10%"}},{body:p(e=>[r("i",{class:x([a(K).TIMES,"grid_delete_column_button"]),onClick:R=>N(R,e.data)},null,10,Qe)]),_:1})]),_:3},8,["value"])}}}),Ye={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ke=r("span",{class:"text-l text-900 font-bold"},"Linies de la comanda",-1),We="Línia de comanda",_t=j({__name:"SalesOrder",setup(g){const T=h(),d=h(w.EDIT),E=fe(),N=ve(),b=be(),f=W(),v=Z(),$=te(),e=ee(),R=se(),m=X(),{salesOrder:s}=Y(f),n=h(!1),S=h(w.EDIT),V=h(void 0),o=h(0),t=async()=>{await f.GetById(E.params.id),m.fetchReferencesByModule("sales"),R.fetchOneByName("SalesOrder"),$.fetchSites(),e.fetchAll(),v.fetchCustomers();let u="";s.value&&(d.value=w.EDIT,u=`Comanda ${s.value.salesOrderNumber}`,s.value.salesOrderDate=Oe(s.value.salesOrderDate)),b.setMenuItem({icon:K.BUILDING,backButtonVisible:!0,title:u})};_e(async()=>{await t()});const _=()=>{T.value.submitForm()},C=(u,i)=>{u===w.CREATE&&(i={id:P(),referenceId:"",quantity:0,unitCost:0,unitPrice:0,totalCost:0,amount:0,salesOrderHeaderId:"",description:"",estimatedDeliveryDate:new Date,isServerd:!1,isInvoiced:!1},m.setNewReference(P())),i.salesOrderHeaderId=s.value.id,V.value=i,S.value=u,n.value=!0},B=H(),c=async u=>{let i=!1,y="";i=await f.Update(u.id,u),y=i?"Comanda actualitzada":"Error a l'actualitzar la comanda",B.add({life:5e3,severity:i?"success":"error",summary:y}),i&&N.back()},oe=async u=>{S.value===w.CREATE?await f.CreateDetail(u):S.value===w.EDIT&&await f.UpdateDetail(u),n.value=!1},re=async u=>{d.value===w.EDIT&&await f.DeleteDetail(u);const i=s.value.salesOrderDetails.filter(y=>y.id!==u.id);s.value.salesOrderDetails=i,n.value=!1},ie=async u=>{let i=!1,y="";i=await m.createReference(u),i?y="Referència creada correctament":y="La referència + versió introduïda ja existeix",B.add({severity:i?"success":"warn",summary:y,life:5e3}),i&&(V.value.referenceId=u.id,o.value=0,m.setNewReference(P()))};return(u,i)=>{const y=I("Button"),M=I("TabPanel"),Q=I("TabView"),ne=I("Dialog");return O(),U(ye,null,[l(y,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:_}),l(Ae,{class:"mt-3 mb-3",ref_key:"salesOrderForm",ref:T,salesOrder:"salesOrder",onSubmit:c},null,512),l(Q,null,{default:p(()=>[l(M,{header:"Detall"},{default:p(()=>[a(s)?(O(),L(Je,{key:0,salesOrderDetails:a(s).salesOrderDetails,onEdit:i[1]||(i[1]=F=>C(a(w).EDIT,F)),onDelete:re},{header:p(()=>[r("div",Ye,[Ke,r("div",null,[l(y,{size:"small",label:"Afegir línea",onClick:i[0]||(i[0]=F=>C(a(w).CREATE,{}))})])])]),_:1},8,["salesOrderDetails"])):k("",!0)]),_:1}),l(M,{header:"Fitxers"},{default:p(()=>[a(s)?(O(),L(Ve,{key:0,entity:"SalesOrder",id:a(s).id,title:""},null,8,["id"])):k("",!0)]),_:1})]),_:1}),l(ne,{closable:!0,visible:n.value,"onUpdate:visible":i[3]||(i[3]=F=>n.value=F),header:We,modal:!0},{default:p(()=>[l(Q,{activeIndex:o.value,"onUpdate:activeIndex":i[2]||(i[2]=F=>o.value=F)},{default:p(()=>[l(M,{header:"Línea"},{default:p(()=>[V.value?(O(),L(Xe,{key:0,formAction:S.value,salesOrderDetail:V.value,onSubmit:oe},null,8,["formAction","salesOrderDetail"])):k("",!0)]),_:1}),l(M,{header:"Referencia"},{default:p(()=>[a(m).reference?(O(),L(Se,{key:0,module:"sales",reference:a(m).reference,onSubmit:ie},null,8,["reference"])):k("",!0)]),_:1})]),_:1},8,["activeIndex"])]),_:1},8,["visible"])],64)}}});export{_t as default};
