import{d as q,E as H,j,C as Y,r as g,h as w,k as i,a as C,c as T,e as d,i as a,s as Q,z as M,n as z,l as L,D as he,p as De,b as we,f as Z,g as ee,v as te,W as ae,o as se,S as oe,m as re,w as b,Q as Ie,H as x,G as k,I as O,R as K,P as N,u as Re,x as Se,K as ge,F as $,X as Ve,J as X}from"./index-77e4d88f.js";import{u as G}from"./order-6e47cb95.js";import{u as le}from"./suppliers-a660c695.js";import{_ as ie}from"./DropdownLifecycle.vue_vue_type_script_setup_true_lang-fed816e8.js";import{c as ne,a as U,F as de,d as Ce}from"./form-validator-7d52d458.js";import{L as Ee}from"./LinkReference-e33c2ce4.js";import{_ as xe}from"./DropdownReference.vue_vue_type_script_setup_true_lang-0438611f.js";import{E as ce}from"./index-4faf08dc.js";import{R as Oe}from"./index-7cbe1881.js";import{u as ke}from"./reference-62579076.js";import{u as $e}from"./lifecycle-7ace1220.js";import{u as Te}from"./referenceType-ba4b4e99.js";import{a as Fe,b as Pe}from"./report.service-a471bae1.js";import"./suppliers.service-05c90099.js";const W=D=>(De("data-v-aed0ba68"),D=D(),we(),D),Be={key:0},Ne={class:"three-columns"},Ue={class:"mt-1"},qe={class:"mt-1"},Le=W(()=>d("label",{class:"block text-900 mb-2"},"Exercici",-1)),Ae={class:"mt-1"},Qe=W(()=>d("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),Me={class:"three-columns"},ze={class:"mt-1"},je={class:"mt-1"},Ge=W(()=>d("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),We=q({__name:"FormOrder",emits:["submit","cancel"],setup(D,{expose:I,emit:p}){const V=G(),R=le(),_=H(),y=j(),{order:c}=Y(V),v=ne().shape({supplierId:U().required("El client es obligatori"),statusId:U().required("L'estat es obligatori"),exerciseId:U().required("L'exercici es obligatori")}),f=g({result:!1,errors:{}}),S=()=>{const e=new de(v);f.value=e.validate(c.value)};return I({submitForm:async()=>{if(S(),f.value.result)c.value.date=he(c.value.date),p("submit",c.value);else{let e="";Object.entries(f.value.errors).forEach(u=>{e+=`${u[1].map(l=>l)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}}}),(e,u)=>{const l=w("Dropdown"),s=w("Calendar");return i(c)?(C(),T("form",Be,[d("section",Ne,[d("div",Ue,[a(M,{type:i(Q).TEXT,label:"Número",id:"number",modelValue:i(c).number,"onUpdate:modelValue":u[0]||(u[0]=o=>i(c).number=o),disabled:""},null,8,["type","modelValue"])]),d("div",qe,[Le,a(l,{modelValue:i(c).exerciseId,"onUpdate:modelValue":u[1]||(u[1]=o=>i(c).exerciseId=o),editable:"",options:i(_).exercises,optionValue:"id",optionLabel:"name",class:z(["w-full",{"p-invalid":f.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),d("div",Ae,[Qe,a(s,{modelValue:i(c).date,"onUpdate:modelValue":u[2]||(u[2]=o=>i(c).date=o),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),d("section",Me,[d("div",ze,[a(ie,{label:"Estat",name:"PurchaseOrder",modelValue:i(c).statusId,"onUpdate:modelValue":u[3]||(u[3]=o=>i(c).statusId=o)},null,8,["modelValue"])]),d("div",je,[Ge,a(l,{modelValue:i(c).supplierId,"onUpdate:modelValue":u[4]||(u[4]=o=>i(c).supplierId=o),editable:"",options:i(R).suppliers,optionValue:"id",optionLabel:"comercialName",class:z(["w-full",{"p-invalid":f.value.errors.customerId}])},null,8,["modelValue","options","class"])])])])):L("",!0)}}});const Je=Z(We,[["__scopeId","data-v-aed0ba68"]]),Ke=["onClick"],Xe={class:"expanded-details"},He=["onClick"],Ye=q({__name:"TableOrderDetails",props:{details:{}},emits:["edit","delete"],setup(D,{emit:I}){const p=D,V=ee(),R=te(),_=G(),y=g(void 0),c=g({}),v=g([]);ae(()=>{var l;return(l=p.details)==null?void 0:l.length},async l=>{l&&await f()}),se(async()=>{await _.getReceptions(R.params.id),_.receptions&&(await f(),y.value=await oe.Lifecycle.getByName("PurchaseOrderDetail"))});const f=async()=>{var l;v.value=((l=p.details)==null?void 0:l.map(s=>{var o;return{...s,receptions:(o=_.receptions)==null?void 0:o.filter(E=>E.purchaseOrderDetailId===s.id)}}))||[]},S=l=>{if(!y.value)return"";const s=y.value.statuses.find(o=>o.id===l);return s?s.name:""},t=l=>{try{l.originalEvent.target.className.includes("grid_delete_column_button")||I("edit",l.data)}catch{}},e=(l,s)=>{I("delete",s)},u=l=>{const s=`/receipts/${l}`;V.push(s)};return(l,s)=>{const o=w("Column"),E=w("DataTable");return C(),re(E,{onRowClick:t,value:v.value,tableStyle:"min-width: 100%",class:"p-datatable-sm","sort-mode":"single","sort-field":"reference.code","sort-order":1,dataKey:"id",expandedRows:c.value,"onUpdate:expandedRows":s[0]||(s[0]=r=>c.value=r)},{header:b(()=>[Ie(l.$slots,"header",{},void 0,!0)]),expansion:b(({data:r})=>[d("div",Xe,[a(E,{value:r.receptions},{default:b(()=>[a(o,{field:"receiptDetail.receipt.number",header:"Albarà"},{body:b(({data:h})=>[d("span",{class:"link",onClick:F=>u(h.receiptDetail.receipt.id)},x(h.receiptDetail.receipt.number),9,He)]),_:2},1024),a(o,{field:"quantity",header:"Quantitat"}),a(o,{field:"createdOn",header:"Data"},{body:b(({data:h})=>[k(x(i(O)(h.createdOn)),1)]),_:2},1024),a(o,{field:"user",header:"Usuari"})]),_:2},1032,["value"])])]),default:b(()=>[a(o,{expander:"",style:{width:"2%"}}),a(o,{field:"quantity",header:"Quantitat",style:{width:"5%"}}),a(o,{field:"receivedQuantity",header:"Q. Rebuda",style:{width:"6%"}}),a(o,{field:"reference.code",sortable:"",header:"Material",style:{width:"40%"}},{body:b(({data:r})=>[a(Ee,{id:r.referenceId,category:r.reference.categoryName,fullName:!0},null,8,["id","category"])]),_:1}),a(o,{field:"statusId",header:"Estat",style:{width:"7.5%"}},{body:b(({data:r})=>[k(x(S(r.statusId)),1)]),_:1}),a(o,{field:"expectedReceiptDate",header:"Data Recepció",style:{width:"7.5%"}},{body:b(({data:r})=>[k(x(i(O)(r.expectedReceiptDate)),1)]),_:1}),a(o,{field:"unitPrice",header:"Preu Un.",style:{width:"5%"}},{body:b(({data:r})=>[k(x(i(K)(r.unitPrice)),1)]),_:1}),a(o,{field:"amount",header:"Preu",style:{width:"5%"}},{body:b(({data:r})=>[k(x(i(K)(r.amount)),1)]),_:1}),a(o,{style:{width:"5%"}},{body:b(({data:r})=>[r.receivedQuantity===0?(C(),T("i",{key:0,class:z([i(N).TIMES,"grid_delete_column_button"]),onClick:h=>e(h,r)},null,10,Ke)):L("",!0)]),_:1})]),_:3},8,["value","expandedRows"])}}});const Ze=Z(Ye,[["__scopeId","data-v-fdb86bda"]]),et={key:0},tt={class:"three-columns"},at=d("label",{class:"block text-900 mb-2"},"Data prevista",-1),st={class:"three-columns mt-2"},ot=q({__name:"FormOrderDetail",props:{detail:{},order:{}},emits:["submit","cancel"],setup(D,{emit:I}){const p=D,V=j(),R=ne().shape({quantity:Ce().min(1).required("La quantitat ha de ser superior a 1"),referenceId:U().required("La referencia és obligatoria")}),_=g({result:!1,errors:{}}),y=()=>{const t=new de(R);_.value=t.validate(p.detail)};ae(()=>p.detail.quantity,async t=>{t&&f()});const c=async t=>{if(!(t==null||p.order.supplierId=="")){var e=await ce.Supplier.getSupplierReferenceBySupplierIdAndReferenceId(p.order.supplierId,t);if(e)p.detail.unitPrice=e.supplierPrice,p.detail.expectedReceiptDate=v(e.supplyDays);else{const u=await oe.Reference.getById(t);u&&(p.detail.unitPrice=u.price)}f()}};function v(t){let e=new Date;return e.setDate(e.getDate()+t),e}const f=()=>{p.detail.amount=p.detail.quantity*p.detail.unitPrice},S=async()=>{if(y(),_.value.result)I("submit",p.detail);else{let t="";Object.entries(_.value.errors).forEach(e=>{t+=`${e[1].map(u=>u)}.   `}),V.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const u=w("Calendar"),l=w("Button");return t.detail?(C(),T("form",et,[d("section",tt,[d("div",null,[a(xe,{label:"Material",modelValue:t.detail.referenceId,"onUpdate:modelValue":[e[0]||(e[0]=s=>t.detail.referenceId=s),c],fullName:!0,disabled:t.detail.receivedQuantity>0},null,8,["modelValue","disabled"])]),d("div",null,[a(ie,{label:"Estat",name:"PurchaseOrderDetail",modelValue:t.detail.statusId,"onUpdate:modelValue":e[1]||(e[1]=s=>t.detail.statusId=s)},null,8,["modelValue"])]),d("div",null,[at,a(u,{label:"Data prevista",modelValue:t.detail.expectedReceiptDate,"onUpdate:modelValue":e[2]||(e[2]=s=>t.detail.expectedReceiptDate=s),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),d("section",st,[d("div",null,[a(M,{disabled:t.detail.receivedQuantity>0,type:i(Q).NUMERIC,label:"Quantitat",modelValue:t.detail.quantity,"onUpdate:modelValue":e[3]||(e[3]=s=>t.detail.quantity=s),onInput:f},null,8,["disabled","type","modelValue"])]),d("div",null,[a(M,{type:i(Q).CURRENCY,label:"Preu",modelValue:t.detail.amount,"onUpdate:modelValue":e[4]||(e[4]=s=>t.detail.amount=s),disabled:t.detail.receivedQuantity>0},null,8,["type","modelValue","disabled"])])]),a(l,{label:"Crear",onClick:S,style:{float:"right"},size:"small",class:"mt-2"})])):L("",!0)}}}),rt={key:0},lt=d("br",null,null,-1),it={class:"flex flex-wrap align-items-center justify-content-between gap-2"},nt=d("span",{class:"text-xl text-900 font-bold"},"Detall de la comanda",-1),dt={key:1},St=q({__name:"Order",setup(D){const I=ee(),p=te(),V=Re(),R=g(),_=Se(),y=ke(),c=Te(),v=G(),f=le(),S=H(),t=$e(),{order:e}=Y(v),u=[{label:"Descarregar",icon:N.FILE_WORD,command:()=>ye()}],l=async()=>{var n;await v.fetchOne(p.params.id),t.lifecycle||t.fetchOneByName("PurchaseOrder"),S.exercises||S.fetchActive(),f.suppliers||f.fetchSuppliers(),c.referenceTypes||c.fetchActive(),(!y.references||y.module!=="purchase")&&y.fetchReferencesByModule("purchase"),e.value&&(e.value.date=O(e.value.date)),V.setMenuItem({icon:N.BUILDING,title:`Comanda de compra ${(n=e.value)==null?void 0:n.number}`,backButtonVisible:!0})};se(async()=>{await l()});const s=j(),o=async()=>{var m;if(!((m=e.value)!=null&&m.date))return s.add({severity:"error",summary:"Error al crear la comanda ",detail:"La data no pot estar buida",life:5e3}),!1;R.value.submitForm()},E=async()=>{let n=!1,m="";e.value&&(n=await v.update(e.value.id,e.value),m="Comanda actualizada correctament",n&&(s.add({severity:"success",summary:m,life:5e3}),I.back()))},r=ge({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0}),h=g($.CREATE),F=g({}),ue=()=>{h.value=$.CREATE,F.value={id:X(),purchaseOrderId:e.value.id,amount:0,unitPrice:0,quantity:0,receivedQuantity:0,referenceId:"",statusId:"",expectedReceiptDate:null,workOrderPhaseId:null,disabled:!1},r.title="Crear línia",r.visible=!0},me=n=>{h.value=$.EDIT,F.value=n,y.setNewReference(X(),Oe.MATERIAL),r.title="Modificar línia",r.visible=!0},pe=async n=>{var m;h.value===$.CREATE?await fe(n):h.value===$.EDIT&&await ve(n),r.visible=!1,await v.fetchOne(p.params.id),console.log((m=e.value)==null?void 0:m.details)},fe=async n=>{const m=await v.createDetail(n);e.value.date=O(e.value.date),m.result||A(m)},ve=async n=>{const m=await v.updateDetail(n.id,n);e.value.date=O(e.value.date),m.result||A(m)},be=async n=>{_.require({message:"Está segur que vols la línia?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{const m=await v.deleteDetail(n.id);e.value.date=O(e.value.date),m.result||A(m)}})},A=n=>{s.add({severity:"error",summary:n.errors[0],life:1e4,closable:!0})},ye=async()=>{var m;const n=await ce.Order.GetReportDataById(e.value.id);if(n){const P=`ComandaCompra_${(m=e.value)==null?void 0:m.number}.docx`,B=await new Pe().Download(n,Fe.PurchaseOrder,P);B?Ve(P,B):s.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}};return(n,m)=>{const P=w("SplitButton"),J=w("Button"),B=w("Dialog");return i(e)?(C(),T("main",rt,[a(P,{label:"Guardar",onClick:o,model:u,size:"small",class:"grid_add_row_button"}),a(Je,{class:"pt-3",ref_key:"orderForm",ref:R,onSubmit:E},null,512),lt,i(e).details?(C(),re(Ze,{key:0,details:i(e).details,onEdit:me,onDelete:be},{header:b(()=>[d("div",it,[nt,d("div",null,[a(J,{size:"small",icon:i(N).PLUS,rounded:"",onClick:ue},null,8,["icon"])])])]),_:1},8,["details"])):L("",!0),a(B,{visible:r.visible,"onUpdate:visible":m[0]||(m[0]=_e=>r.visible=_e),header:r.title,closable:r.closable,modal:r.modal},{default:b(()=>[a(ot,{detail:F.value,order:i(e),onSubmit:pe},null,8,["detail","order"])]),_:1},8,["visible","header","closable","modal"])])):(C(),T("main",dt,"Carregant comanda ..."))}}});export{St as default};