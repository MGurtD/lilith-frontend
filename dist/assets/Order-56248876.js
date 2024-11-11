import{d as L,E as Y,j as z,C as H,r as V,h as w,k as l,a as C,c as T,e as n,i as a,s as N,z as P,n as M,l as A,D as De,p as we,b as Ie,f as Z,g as ee,v as te,X as ae,o as se,S as oe,m as re,w as y,Q as Re,H as x,G as O,I as X,R as J,P as U,u as Se,x as Ve,K as ge,F as k,Y as Ce,J as K}from"./index-680c2dac.js";import{u as j}from"./order-e1db5560.js";import{u as le}from"./suppliers-f26af1b7.js";import{_ as ie}from"./DropdownLifecycle.vue_vue_type_script_setup_true_lang-0211d77e.js";import{c as ne,a as q,F as de,d as Ee}from"./form-validator-f475731c.js";import{L as xe}from"./LinkReference-3359a8c0.js";import{u as ce}from"./reference-cbf10e17.js";import{_ as Oe}from"./DropdownReference.vue_vue_type_script_setup_true_lang-55cc54cf.js";import{E as ue}from"./index-1969dab7.js";import{R as ke}from"./index-7cbe1881.js";import{u as Te}from"./lifecycle-74e688d4.js";import{u as $e}from"./referenceType-142e0758.js";import{a as Fe,b as Be}from"./report.service-2f632b56.js";import"./suppliers.service-1f2a04fe.js";const G=D=>(we("data-v-aed0ba68"),D=D(),Ie(),D),Ne={key:0},Pe={class:"three-columns"},Ue={class:"mt-1"},qe={class:"mt-1"},Le=G(()=>n("label",{class:"block text-900 mb-2"},"Exercici",-1)),Ae={class:"mt-1"},Qe=G(()=>n("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),Me={class:"three-columns"},ze={class:"mt-1"},je={class:"mt-1"},Ge=G(()=>n("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),We=L({__name:"FormOrder",emits:["submit","cancel"],setup(D,{expose:I,emit:m}){const g=j(),R=le(),_=Y(),b=z(),{order:u}=H(g),v=ne().shape({supplierId:q().required("El client es obligatori"),statusId:q().required("L'estat es obligatori"),exerciseId:q().required("L'exercici es obligatori")}),f=V({result:!1,errors:{}}),S=()=>{const e=new de(v);f.value=e.validate(u.value)};return I({submitForm:async()=>{if(S(),f.value.result)u.value.date=De(u.value.date),m("submit",u.value);else{let e="";Object.entries(f.value.errors).forEach(c=>{e+=`${c[1].map(i=>i)}.   `}),b.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}}}),(e,c)=>{const i=w("Dropdown"),s=w("Calendar");return l(u)?(C(),T("form",Ne,[n("section",Pe,[n("div",Ue,[a(P,{type:l(N).TEXT,label:"Número",id:"number",modelValue:l(u).number,"onUpdate:modelValue":c[0]||(c[0]=o=>l(u).number=o),disabled:""},null,8,["type","modelValue"])]),n("div",qe,[Le,a(i,{modelValue:l(u).exerciseId,"onUpdate:modelValue":c[1]||(c[1]=o=>l(u).exerciseId=o),editable:"",options:l(_).exercises,optionValue:"id",optionLabel:"name",class:M(["w-full",{"p-invalid":f.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),n("div",Ae,[Qe,a(s,{modelValue:l(u).date,"onUpdate:modelValue":c[2]||(c[2]=o=>l(u).date=o),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),n("section",Me,[n("div",ze,[a(ie,{label:"Estat",name:"PurchaseOrder",modelValue:l(u).statusId,"onUpdate:modelValue":c[3]||(c[3]=o=>l(u).statusId=o)},null,8,["modelValue"])]),n("div",je,[Ge,a(i,{modelValue:l(u).supplierId,"onUpdate:modelValue":c[4]||(c[4]=o=>l(u).supplierId=o),editable:"",options:l(R).suppliers,optionValue:"id",optionLabel:"comercialName",class:M(["w-full",{"p-invalid":f.value.errors.customerId}])},null,8,["modelValue","options","class"])])])])):A("",!0)}}});const Xe=Z(We,[["__scopeId","data-v-aed0ba68"]]),Je=["onClick"],Ke={class:"expanded-details"},Ye=["onClick"],He=L({__name:"TableOrderDetails",props:{details:{}},emits:["edit","delete"],setup(D,{emit:I}){const m=D,g=ee(),R=te(),_=j(),b=V(void 0),u=V({}),v=V([]);ce(),ae(()=>{var i;return(i=m.details)==null?void 0:i.length},async i=>{i&&await f()}),se(async()=>{await _.getReceptions(R.params.id),_.receptions&&(await f(),b.value=await oe.Lifecycle.getByName("PurchaseOrderDetail"))});const f=async()=>{var i;v.value=((i=m.details)==null?void 0:i.map(s=>{var o;return{...s,receptions:(o=_.receptions)==null?void 0:o.filter(E=>E.purchaseOrderDetailId===s.id)}}))||[]},S=i=>{if(!b.value)return"";const s=b.value.statuses.find(o=>o.id===i);return s?s.name:""},t=i=>{try{i.originalEvent.target.className.includes("grid_delete_column_button")||I("edit",i.data)}catch{}},e=(i,s)=>{I("delete",s)},c=i=>{const s=`/receipts/${i}`;g.push(s)};return(i,s)=>{const o=w("Column"),E=w("DataTable");return C(),re(E,{onRowClick:t,value:v.value,tableStyle:"min-width: 100%",class:"p-datatable-sm","sort-mode":"single","sort-field":"reference.code","sort-order":1,dataKey:"id",expandedRows:u.value,"onUpdate:expandedRows":s[0]||(s[0]=r=>u.value=r)},{header:y(()=>[Re(i.$slots,"header",{},void 0,!0)]),expansion:y(({data:r})=>[n("div",Ke,[a(E,{value:r.receptions},{default:y(()=>[a(o,{field:"receiptDetail.receipt.number",header:"Albarà"},{body:y(({data:h})=>[n("span",{class:"link",onClick:$=>c(h.receiptDetail.receipt.id)},x(h.receiptDetail.receipt.number),9,Ye)]),_:2},1024),a(o,{field:"quantity",header:"Quantitat"}),a(o,{field:"createdOn",header:"Data"},{body:y(({data:h})=>[O(x(l(X)(h.createdOn)),1)]),_:2},1024),a(o,{field:"user",header:"Usuari"})]),_:2},1032,["value"])])]),default:y(()=>[a(o,{expander:"",style:{width:"2%"}}),a(o,{field:"quantity",header:"Quantitat",style:{width:"5%"}}),a(o,{field:"receivedQuantity",header:"Q. Rebuda",style:{width:"6%"}}),a(o,{field:"reference.code",sortable:"",header:"Referència",style:{width:"20%"}},{body:y(({data:r})=>[a(xe,{id:r.referenceId,category:r.reference.categoryName,fullName:!0},null,8,["id","category"])]),_:1}),a(o,{field:"description",header:"Descripció",style:{width:"25%"}}),a(o,{field:"statusId",header:"Estat",style:{width:"7.5%"}},{body:y(({data:r})=>[O(x(S(r.statusId)),1)]),_:1}),a(o,{field:"expectedReceiptDate",header:"Data Recepció",style:{width:"7.5%"}},{body:y(({data:r})=>[O(x(l(X)(r.expectedReceiptDate)),1)]),_:1}),a(o,{field:"unitPrice",header:"Preu Un.",style:{width:"5%"}},{body:y(({data:r})=>[O(x(l(J)(r.unitPrice)),1)]),_:1}),a(o,{field:"amount",header:"Preu",style:{width:"5%"}},{body:y(({data:r})=>[O(x(l(J)(r.amount)),1)]),_:1}),a(o,{style:{width:"5%"}},{body:y(({data:r})=>[r.receivedQuantity===0?(C(),T("i",{key:0,class:M([l(U).TIMES,"grid_delete_column_button"]),onClick:h=>e(h,r)},null,10,Je)):A("",!0)]),_:1})]),_:3},8,["value","expandedRows"])}}});const Ze=Z(He,[["__scopeId","data-v-ce42cd3d"]]),et={key:0},tt={class:"three-columns"},at=n("label",{class:"block text-900 mb-2"},"Data prevista",-1),st={class:"three-columns mt-2"},ot=L({__name:"FormOrderDetail",props:{detail:{},order:{}},emits:["submit","cancel"],setup(D,{emit:I}){const m=D,g=z(),R=ne().shape({quantity:Ee().min(1).required("La quantitat ha de ser superior a 1"),referenceId:q().required("La referencia és obligatoria")}),_=V({result:!1,errors:{}}),b=()=>{const t=new de(R);_.value=t.validate(m.detail)};ae(()=>m.detail.quantity,async t=>{t&&f()});const u=async t=>{if(!(t==null||m.order.supplierId=="")){var e=await ue.Supplier.getSupplierReferenceBySupplierIdAndReferenceId(m.order.supplierId,t);if(e)m.detail.unitPrice=e.supplierPrice,m.detail.expectedReceiptDate=v(e.supplyDays),m.detail.description=e.supplierDescription;else{const c=await oe.Reference.getById(t);c&&(m.detail.unitPrice=c.price,m.detail.description=c.description)}f()}};function v(t){let e=new Date;return e.setDate(e.getDate()+t),e}const f=()=>{m.detail.amount=m.detail.quantity*m.detail.unitPrice},S=async()=>{if(b(),_.value.result)I("submit",m.detail);else{let t="";Object.entries(_.value.errors).forEach(e=>{t+=`${e[1].map(c=>c)}.   `}),g.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const c=w("Calendar"),i=w("Button");return t.detail?(C(),T("form",et,[n("section",tt,[n("div",null,[a(Oe,{label:"Referència de compra",modelValue:t.detail.referenceId,"onUpdate:modelValue":[e[0]||(e[0]=s=>t.detail.referenceId=s),u],fullName:!0,disabled:t.detail.receivedQuantity>0},null,8,["modelValue","disabled"])]),n("div",null,[a(ie,{label:"Estat",name:"PurchaseOrderDetail",modelValue:t.detail.statusId,"onUpdate:modelValue":e[1]||(e[1]=s=>t.detail.statusId=s)},null,8,["modelValue"])]),n("div",null,[at,a(c,{label:"Data prevista",modelValue:t.detail.expectedReceiptDate,"onUpdate:modelValue":e[2]||(e[2]=s=>t.detail.expectedReceiptDate=s),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),n("section",null,[n("div",null,[a(P,{type:l(N).TEXT,label:"Descripció",id:"description",modelValue:t.detail.description,"onUpdate:modelValue":e[3]||(e[3]=s=>t.detail.description=s)},null,8,["type","modelValue"])])]),n("section",st,[n("div",null,[a(P,{disabled:t.detail.receivedQuantity>0,type:l(N).NUMERIC,label:"Quantitat",modelValue:t.detail.quantity,"onUpdate:modelValue":e[4]||(e[4]=s=>t.detail.quantity=s),onInput:f},null,8,["disabled","type","modelValue"])]),n("div",null,[a(P,{type:l(N).CURRENCY,label:"Preu",modelValue:t.detail.amount,"onUpdate:modelValue":e[5]||(e[5]=s=>t.detail.amount=s),disabled:t.detail.receivedQuantity>0},null,8,["type","modelValue","disabled"])])]),a(i,{label:"Crear",onClick:S,style:{float:"right"},size:"small",class:"mt-2"})])):A("",!0)}}}),rt={key:0},lt=n("br",null,null,-1),it={class:"flex flex-wrap align-items-center justify-content-between gap-2"},nt=n("span",{class:"text-xl text-900 font-bold"},"Detall de la comanda",-1),dt={key:1},St=L({__name:"Order",setup(D){const I=ee(),m=te(),g=Se(),R=V(),_=Ve(),b=ce(),u=$e(),v=j(),f=le(),S=Y(),t=Te(),{order:e}=H(v),c=[{label:"Descarregar",icon:U.FILE_WORD,command:()=>_e()}],i=async()=>{var d;await v.fetchOne(m.params.id),t.lifecycle||t.fetchOneByName("PurchaseOrder"),S.exercises||S.fetchActive(),f.suppliers||f.fetchSuppliers(),u.referenceTypes||u.fetchActive(),(!b.references||b.module!=="purchase")&&b.fetchReferencesByModule("purchase"),g.setMenuItem({icon:U.BUILDING,title:`Comanda de compra ${(d=e.value)==null?void 0:d.number}`,backButtonVisible:!0})};se(async()=>{await i()});const s=z(),o=async()=>{var p;if(!((p=e.value)!=null&&p.date))return s.add({severity:"error",summary:"Error al crear la comanda ",detail:"La data no pot estar buida",life:5e3}),!1;R.value.submitForm()},E=async()=>{let d=!1,p="";e.value&&(d=await v.update(e.value.id,e.value),p="Comanda actualizada correctament",d&&(s.add({severity:"success",summary:p,life:5e3}),I.back()))},r=ge({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0}),h=V(k.CREATE),$=V({}),me=()=>{h.value=k.CREATE,$.value={id:K(),purchaseOrderId:e.value.id,amount:0,unitPrice:0,quantity:0,receivedQuantity:0,referenceId:"",statusId:"",expectedReceiptDate:null,workOrderPhaseId:null,disabled:!1},r.title="Crear línia",r.visible=!0},pe=d=>{h.value=k.EDIT,$.value=d,b.setNewReference(K(),ke.MATERIAL),r.title="Modificar línia",r.visible=!0},fe=async d=>{h.value===k.CREATE?await ve(d):h.value===k.EDIT&&await ye(d),r.visible=!1,await v.fetchOne(m.params.id)},ve=async d=>{const p=await v.createDetail(d);p.result||Q(p)},ye=async d=>{const p=await v.updateDetail(d.id,d);p.result||Q(p)},be=async d=>{_.require({message:"Está segur que vols la línia?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{const p=await v.deleteDetail(d.id,d);p.result||Q(p)}})},Q=d=>{s.add({severity:"error",summary:d.errors[0],life:1e4,closable:!0})},_e=async()=>{var p;const d=await ue.Order.GetReportDataById(e.value.id);if(d){const F=`ComandaCompra_${(p=e.value)==null?void 0:p.number}.docx`,B=await new Be().Download(d,Fe.PurchaseOrder,F);B?Ce(F,B):s.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}};return(d,p)=>{const F=w("SplitButton"),W=w("Button"),B=w("Dialog");return l(e)?(C(),T("main",rt,[a(F,{label:"Guardar",onClick:o,model:c,size:"small",class:"grid_add_row_button"}),a(Xe,{class:"pt-3",ref_key:"orderForm",ref:R,onSubmit:E},null,512),lt,l(e).details?(C(),re(Ze,{key:0,details:l(e).details,onEdit:pe,onDelete:be},{header:y(()=>[n("div",it,[nt,n("div",null,[a(W,{size:"small",icon:l(U).PLUS,rounded:"",onClick:me},null,8,["icon"])])])]),_:1},8,["details"])):A("",!0),a(B,{visible:r.visible,"onUpdate:visible":p[0]||(p[0]=he=>r.visible=he),header:r.title,closable:r.closable,modal:r.modal},{default:y(()=>[a(ot,{detail:$.value,order:l(e),onSubmit:fe},null,8,["detail","order"])]),_:1},8,["visible","header","closable","modal"])])):(C(),T("main",dt,"Carregant comanda ..."))}}});export{St as default};
