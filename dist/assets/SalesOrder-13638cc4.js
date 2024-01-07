import{d as M,j as K,z as te,H as ae,r as T,h as O,a as _,c as A,k as a,e as d,i as l,s as F,y as L,n as B,l as E,p as ye,b as De,f as Oe,F as S,x as _e,m as U,w as v,K as Se,C as G,D as X,P as J,v as Ie,g as Ne,u as Ve,o as we,G as Ce}from"./index-5e079de4.js";import{c as ge,b as Te,f as H,g as Q}from"./functions-4d7ada1d.js";import{u as se}from"./order-5782b627.js";import{u as W}from"./reference-04677b7a.js";import{u as le}from"./customers-da1fe2b5.js";import{u as re}from"./exercise-0a2e3c1a.js";import{u as oe}from"./plantmodel-b5c92e3c.js";import{u as ie}from"./lifecycle-96c17531.js";import{u as Ee}from"./tax-01085720.js";import{c as ne,a as P,F as de,d as Re}from"./form-validator-f8953ae6.js";import{u as ue}from"./deliveryNote-131e31de.js";import{_ as xe}from"./DropdownReference.vue_vue_type_script_setup_true_lang-38920d2f.js";import{_ as ke}from"./FormReference.vue_vue_type_script_setup_true_lang-621636f0.js";import{F as Fe}from"./FileEntityPicker-ba06e5e4.js";import{a as Be,b as $e}from"./report.service-ff653d95.js";import{S as he}from"./index-6f300706.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./reference.service-7ecaa2ca.js";import"./base.service-4c53d7ae.js";import"./index-ed9bf005.js";import"./index-807fa16d.js";import"./referenceType-bfe55a74.js";import"./file.service-72511415.js";import"./index-43108a6a.js";const j=I=>(ye("data-v-869804a6"),I=I(),De(),I),Ue={key:0},qe={class:"four-columns mt-2"},Ae=j(()=>d("label",{class:"block text-900 mb-2"},"Exercici",-1)),Le=j(()=>d("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),Pe={class:"four-columns mt-2"},Me=j(()=>d("label",{class:"block text-900 mb-2"},"Estat",-1)),je=j(()=>d("label",{class:"block text-900 mb-2"},"Client",-1)),ze=M({__name:"FormSalesOrder",emits:["submit","cancel"],setup(I,{expose:N,emit:n}){const R=se(),V=le();oe();const x=re(),y=ie(),f=ue(),w=K(),{salesOrder:e}=te(R),C=ae(()=>f.deliveryNote?f.deliveryNote.number:""),c=ne().shape({siteId:P().required("L'origen es obligatori"),customerId:P().required("El client es obligatori"),statusId:P().required("L'estat es obligatori"),exerciseId:P().required("L'exercici es obligatori")}),t=T({result:!1,errors:{}}),m=()=>{const i=new de(c);t.value=i.validate(e.value)};N({submitForm:async()=>{if(m(),t.value.result)e.value.salesOrderDate=ge(e.value.salesOrderDate),n("submit",e.value);else{let i="";Object.entries(t.value.errors).forEach(s=>{i+=`${s[1].map(D=>D)}.   `}),w.add({severity:"warn",summary:"Formulari inválid",detail:i,life:5e3})}}});const q=()=>{var s;const i=(s=V.customers)==null?void 0:s.find(D=>{var g;return D.id===((g=e.value)==null?void 0:g.customerId)});i&&e.value&&(e.value.customerCode=i.code,e.value.customerComercialName=i.comercialName,e.value.customerTaxName=i.taxName,e.value.customerVatNumber=i.vatNumber,e.value.customerAccountNumber=i.accountNumber),console.log(e.value)};return(i,s)=>{var $;const D=O("Dropdown"),g=O("Calendar");return _(),A("div",null,[a(e)?(_(),A("form",Ue,[d("section",qe,[d("div",null,[l(L,{type:a(F).TEXT,label:"Num. Comanda",id:"salesOrderNumber",modelValue:a(e).salesOrderNumber,"onUpdate:modelValue":s[0]||(s[0]=p=>a(e).salesOrderNumber=p),disabled:""},null,8,["type","modelValue"])]),d("div",null,[l(L,{type:a(F).TEXT,label:"Num. Pressupost",id:"budgetNumber",modelValue:a(e).budgetNumber,"onUpdate:modelValue":s[1]||(s[1]=p=>a(e).budgetNumber=p),disabled:""},null,8,["type","modelValue"])]),d("div",null,[Ae,l(D,{modelValue:a(e).exerciseId,"onUpdate:modelValue":s[2]||(s[2]=p=>a(e).exerciseId=p),editable:"",options:a(x).exercises,optionValue:"id",optionLabel:"name",class:B(["w-full",{"p-invalid":t.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),d("div",null,[Le,l(g,{modelValue:a(e).salesOrderDate,"onUpdate:modelValue":s[3]||(s[3]=p=>a(e).salesOrderDate=p),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),d("section",Pe,[d("div",null,[Me,l(D,{modelValue:a(e).statusId,"onUpdate:modelValue":s[4]||(s[4]=p=>a(e).statusId=p),editable:"",options:($=a(y).lifecycle)==null?void 0:$.statuses,optionValue:"id",optionLabel:"name",class:B(["w-full",{"p-invalid":t.value.errors.statusId}])},null,8,["modelValue","options","class"])]),d("div",null,[je,l(D,{modelValue:a(e).customerId,"onUpdate:modelValue":[s[5]||(s[5]=p=>a(e).customerId=p),s[6]||(s[6]=p=>q())],editable:"",options:a(V).customers,optionValue:"id",optionLabel:"comercialName",class:B(["w-full",{"p-invalid":t.value.errors.customerId}])},null,8,["modelValue","options","class"])]),d("div",null,[l(L,{type:a(F).TEXT,label:"Comanda Client",id:"customerSalesOrderNumber",modelValue:a(e).customerSalesOrderNumber,"onUpdate:modelValue":s[7]||(s[7]=p=>a(e).customerSalesOrderNumber=p)},null,8,["type","modelValue"])]),d("div",null,[l(L,{type:a(F).TEXT,disabled:!0,label:"Albarà Entrega",id:"deliveryNote",modelValue:C.value,"onUpdate:modelValue":s[8]||(s[8]=p=>C.value=p)},null,8,["type","modelValue"])])])])):E("",!0)])}}});const Ge=Oe(ze,[["__scopeId","data-v-869804a6"]]),Xe={key:0},He={class:"mb-2"},Qe={class:"two-columns"},Je=M({__name:"FormSalesOrderDetail",props:{formAction:{},salesOrderDetail:{}},emits:["submit"],setup(I,{emit:N}){const n=I,R=W(),V=K(),x=ae(()=>n.formAction===S.CREATE?"Afegir":"Modificar"),y=()=>{const t=R.references.find(m=>m.id===n.salesOrderDetail.referenceId);t&&(n.salesOrderDetail.description=t.description,n.salesOrderDetail.isInvoiced=!1,n.salesOrderDetail.isDelivered=!1,n.salesOrderDetail.unitCost=t==null?void 0:t.cost,n.salesOrderDetail.unitPrice=t==null?void 0:t.price,f())},f=()=>{n.salesOrderDetail.amount=n.salesOrderDetail.unitPrice*n.salesOrderDetail.quantity,n.salesOrderDetail.totalCost=n.salesOrderDetail.unitCost*n.salesOrderDetail.quantity},w=ne().shape({quantity:Re().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu")}),e=T({result:!1,errors:{}}),C=()=>{const t=new de(w);e.value=t.validate(n.salesOrderDetail)},c=async()=>{if(C(),e.value.result)N("submit",n.salesOrderDetail);else{let t="";Object.entries(e.value.errors).forEach(m=>{t+=`${m[1].map(r=>r)}.   `}),V.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,m)=>{const r=O("BaseInput"),q=O("Button");return t.salesOrderDetail?(_(),A("form",Xe,[d("div",He,[l(xe,{label:"Referència",modelValue:t.salesOrderDetail.referenceId,"onUpdate:modelValue":[m[0]||(m[0]=i=>t.salesOrderDetail.referenceId=i),m[1]||(m[1]=i=>y())],fullName:!0},null,8,["modelValue"])]),d("section",null,[d("div",null,[l(r,{class:B(["mb-2",{"p-invalid":e.value.errors.description}]),label:"Descripció",modelValue:t.salesOrderDetail.description,"onUpdate:modelValue":m[2]||(m[2]=i=>t.salesOrderDetail.description=i),type:a(F).TEXT},null,8,["modelValue","type","class"])])]),d("section",Qe,[d("div",null,[l(r,{class:B(["mb-2",{"p-invalid":e.value.errors.quantity}]),label:"Quantitat",modelValue:t.salesOrderDetail.quantity,"onUpdate:modelValue":[m[3]||(m[3]=i=>t.salesOrderDetail.quantity=i),m[4]||(m[4]=i=>f())],type:a(F).NUMERIC},null,8,["modelValue","type","class"])]),d("div",null,[l(r,{class:B(["mb-2",{"p-invalid":e.value.errors.amount}]),label:"Total",modelValue:t.salesOrderDetail.amount,"onUpdate:modelValue":m[5]||(m[5]=i=>t.salesOrderDetail.amount=i),type:a(F).CURRENCY,disabled:""},null,8,["modelValue","type","class"])])]),l(q,{label:x.value,onClick:c,style:{float:"right"}},null,8,["label"])])):E("",!0)}}}),Ke=["onClick"],We=M({__name:"TableSalesOrderDetails",props:{salesOrder:{},salesOrderDetails:{}},emits:["edit","delete"],setup(I,{emit:N}){const n=I,R=_e(),V=W(),x=f=>{n.salesOrder.deliveryNoteId||f.originalEvent.target.className.includes("grid_delete_column_button")||N("edit",f.data)},y=(f,w)=>{R.require({target:f.currentTarget,message:"Está segur que vol eliminar la referència?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{N("delete",w)}})};return(f,w)=>{const e=O("Column"),C=O("DataTable");return _(),U(C,{onRowClick:x,value:n.salesOrderDetails,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:v(()=>[Se(f.$slots,"header")]),default:v(()=>[l(e,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),l(e,{header:"Referencia",style:{width:"15%"}},{body:v(c=>[G(X(a(V).getShortNameById(c.data.referenceId)),1)]),_:1}),l(e,{field:"description",header:"Descripció",style:{width:"40%"}}),l(e,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:v(c=>[G(X(c.data.unitPrice)+" € ",1)]),_:1}),l(e,{field:"amount",header:"Total",style:{width:"10%"}},{body:v(c=>[G(X(c.data.amount)+" € ",1)]),_:1}),f.salesOrder.deliveryNoteId?E("",!0):(_(),U(e,{key:0,style:{width:"10%"}},{body:v(c=>[c.data.isDelivered?E("",!0):(_(),A("i",{key:0,class:B([a(J).TIMES,"grid_delete_column_button"]),onClick:t=>y(t,c.data)},null,10,Ke))]),_:1}))]),_:3},8,["value"])}}}),Ye={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ze=d("span",{class:"text-l text-900 font-bold"},"Linies de la comanda",-1),et="Línia de comanda",Ct=M({__name:"SalesOrder",setup(I){const N=T(),n=T(S.EDIT),R=Ie(),V=Ne(),x=Ve(),y=se(),f=le(),w=oe(),e=re(),C=ie(),c=W(),t=ue(),m=Ee(),{salesOrder:r}=te(y),q=[{label:"Descarregar",icon:J.FILE_WORD,command:()=>i()}],i=async()=>{var o;const u=await he.SalesOrder.GetReportDataById(r.value.id);if(u){const b=`Comanda_${(o=r.value)==null?void 0:o.salesOrderNumber}.docx`,k=await new $e().Download(u,Be.Order,b);k?Te(b,k):z.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},s=T(!1),D=T(S.EDIT),g=T(void 0),$=T(0),p=async()=>{await y.GetById(R.params.id),c.fetchReferencesByModule("sales"),C.fetchOneByName("SalesOrder"),w.fetchSites(),e.fetchAll(),f.fetchCustomers(),m.fetchAll();let u="";r.value&&(n.value=S.EDIT,u=`Comanda ${r.value.salesOrderNumber}`,r.value.salesOrderDate=H(r.value.salesOrderDate),r.value.deliveryNoteId?t.GetById(r.value.deliveryNoteId):t.deliveryNote&&(t.deliveryNote=void 0)),x.setMenuItem({icon:J.BUILDING,backButtonVisible:!0,title:u})};we(async()=>{await p()});const me=()=>{N.value.submitForm()},Y=(u,o)=>{c.setNewReference(Q()),u===S.CREATE&&(o={id:Q(),referenceId:"",quantity:0,unitCost:0,unitPrice:0,totalCost:0,amount:0,salesOrderHeaderId:"",description:"",estimatedDeliveryDate:new Date,isDelivered:!1,isInvoiced:!1}),o.salesOrderHeaderId=r.value.id,g.value=o,D.value=u,s.value=!0},z=K(),ce=async u=>{let o=!1,b="";o=await y.Update(u.id,u),b=o?"Comanda actualitzada":"Error a l'actualitzar la comanda",z.add({life:5e3,severity:o?"success":"error",summary:b}),o&&V.back()},pe=async u=>{D.value===S.CREATE?await y.CreateDetail(u):D.value===S.EDIT&&await y.UpdateDetail(u),s.value=!1,r.value.salesOrderDate=H(r.value.salesOrderDate)},fe=async u=>{n.value===S.EDIT&&await y.DeleteDetail(u);const o=r.value.salesOrderDetails.filter(b=>b.id!==u.id);r.value.salesOrderDetails=o,s.value=!1,r.value.salesOrderDate=H(r.value.salesOrderDate)},ve=async u=>{let o=!1,b="";o=await c.createReference(u),o?b="Referència creada correctament":b="La referència + versió introduïda ja existeix",z.add({severity:o?"success":"warn",summary:b,life:5e3}),o&&(c.setNewReference(Q()),$.value=0)};return(u,o)=>{const b=O("SplitButton"),Z=O("Button"),k=O("TabPanel"),ee=O("TabView"),be=O("Dialog");return _(),A(Ce,null,[l(b,{label:"Guardar",onClick:me,model:q,size:"small",class:"grid_add_row_button"}),l(Ge,{class:"mt-3 mb-3",ref_key:"salesOrderForm",ref:N,salesOrder:"salesOrder",onSubmit:ce},null,512),l(ee,null,{default:v(()=>[l(k,{header:"Detall"},{default:v(()=>[a(r)?(_(),U(We,{key:0,salesOrder:a(r),salesOrderDetails:a(r).salesOrderDetails,onEdit:o[1]||(o[1]=h=>Y(a(S).EDIT,h)),onDelete:fe},{header:v(()=>[d("div",Ye,[Ze,d("div",null,[l(Z,{disabled:a(t).deliveryNote!==void 0,size:"small",label:"Afegir línea",onClick:o[0]||(o[0]=h=>Y(a(S).CREATE,{}))},null,8,["disabled"])])])]),_:1},8,["salesOrder","salesOrderDetails"])):E("",!0)]),_:1}),l(k,{header:"Fitxers"},{default:v(()=>[a(r)?(_(),U(Fe,{key:0,entity:"SalesOrder",id:a(r).id,title:""},null,8,["id"])):E("",!0)]),_:1})]),_:1}),l(be,{closable:!0,visible:s.value,"onUpdate:visible":o[3]||(o[3]=h=>s.value=h),header:et,modal:!0},{default:v(()=>[l(ee,{activeIndex:$.value,"onUpdate:activeIndex":o[2]||(o[2]=h=>$.value=h)},{default:v(()=>[l(k,{header:"Línea"},{default:v(()=>[g.value?(_(),U(Je,{key:0,formAction:D.value,salesOrderDetail:g.value,onSubmit:pe},null,8,["formAction","salesOrderDetail"])):E("",!0)]),_:1}),l(k,{header:"Referencia"},{default:v(()=>[a(c).reference?(_(),U(ke,{key:0,module:"sales",reference:a(c).reference,onSubmit:ve},null,8,["reference"])):E("",!0)]),_:1})]),_:1},8,["activeIndex"])]),_:1},8,["visible"])],64)}}});export{Ct as default};