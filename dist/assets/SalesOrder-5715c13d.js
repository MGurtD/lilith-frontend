import{d as z,j as Q,z as ae,H as re,r as V,h as g,a as y,c as E,k as a,e as c,i as l,s as U,n as q,l as $,p as we,b as ke,f as Ce,F as T,M as Ne,O as Ve,m as M,N as P,W as Te,K as se,D as j,x as Ee,w as b,C as Y,P as W,G as le,v as $e,g as Be,u as Re,o as he}from"./index-b2ab35ad.js";import{c as te,d as Fe,b as xe,f as L,g as H}from"./functions-79f2dbc4.js";import{u as oe}from"./order-a92cd8de.js";import{u as K}from"./reference-54c75cf5.js";import{u as ne}from"./customers-07acb592.js";import{u as Ue}from"./exercise-4d5ee514.js";import{u as Ae}from"./plantmodel-0a2469ea.js";import{u as ie}from"./lifecycle-aaf20339.js";import{u as Me}from"./tax-cdf53f3a.js";import{c as de,a as G,F as ue,d as qe}from"./form-validator-f8953ae6.js";import{u as ce}from"./deliveryNote-245b86e3.js";import{_ as Le}from"./DropdownReference.vue_vue_type_script_setup_true_lang-72a3771d.js";import{_ as We}from"./FormCreateWorkorder.vue_vue_type_script_setup_true_lang-a8663a89.js";import{u as me}from"./workmaster-2ec1ec08.js";import{u as pe}from"./workorder-4149536c.js";import{_ as Pe}from"./FormReference.vue_vue_type_script_setup_true_lang-ee66cc76.js";import{F as Ge}from"./FileEntityPicker-6b1e22c3.js";import{a as je,b as ze}from"./report.service-e07beeba.js";import{S as Xe}from"./index-404fa648.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./reference.service-53280129.js";import"./base.service-671ed665.js";import"./index-4a6fd04a.js";import"./index-234e8704.js";import"./referenceType-e08e971e.js";import"./file.service-95409e52.js";import"./index-d961652c.js";const X=i=>(we("data-v-a817269d"),i=i(),ke(),i),Ye={key:0},He={class:"four-columns mt-2"},Qe=X(()=>c("label",{class:"block text-900 mb-2"},"Data Alta",-1)),Ke=X(()=>c("label",{class:"block text-900 mb-2"},"Data Entrega",-1)),Je={class:"four-columns mt-2"},Ze=X(()=>c("label",{class:"block text-900 mb-2"},"Estat",-1)),et=X(()=>c("label",{class:"block text-900 mb-2"},"Client",-1)),tt=z({__name:"FormSalesOrder",emits:["submit","cancel"],setup(i,{expose:S,emit:o}){const h=oe(),B=ne(),F=ie(),I=ce(),D=Q(),{salesOrder:t}=ae(h),f=re(()=>I.deliveryNote?I.deliveryNote.number:""),_=de().shape({siteId:G().required("L'origen es obligatori"),customerId:G().required("El client es obligatori"),statusId:G().required("L'estat es obligatori"),exerciseId:G().required("L'exercici es obligatori")}),N=V({result:!1,errors:{}}),r=()=>{const n=new ue(_);N.value=n.validate(t.value)};S({submitForm:async()=>{if(r(),N.value.result)p(),o("submit",t.value);else{let n="";Object.entries(N.value.errors).forEach(e=>{n+=`${e[1].map(C=>C)}.   `}),D.add({severity:"warn",summary:"Formulari inválid",detail:n,life:5e3})}}});const k=()=>{var e;const n=(e=B.customers)==null?void 0:e.find(C=>{var w;return C.id===((w=t.value)==null?void 0:w.customerId)});n&&t.value&&(t.value.customerCode=n.code,t.value.customerComercialName=n.comercialName,t.value.customerTaxName=n.taxName,t.value.customerVatNumber=n.vatNumber,t.value.customerAccountNumber=n.accountNumber)},p=()=>{t.value&&(t.value.salesOrderDate=te(t.value.salesOrderDate),t.value.expectedDate&&(t.value.expectedDate=te(t.value.expectedDate)))};return(n,e)=>{var v;const C=g("BaseInput"),w=g("Calendar"),R=g("Dropdown");return y(),E("div",null,[a(t)?(y(),E("form",Ye,[c("section",He,[c("div",null,[l(C,{type:a(U).TEXT,label:"Num. Comanda",id:"salesOrderNumber",modelValue:a(t).salesOrderNumber,"onUpdate:modelValue":e[0]||(e[0]=m=>a(t).salesOrderNumber=m),disabled:""},null,8,["type","modelValue"])]),c("div",null,[l(C,{type:a(U).TEXT,label:"Num. Pressupost",id:"budgetNumber",modelValue:a(t).budgetNumber,"onUpdate:modelValue":e[1]||(e[1]=m=>a(t).budgetNumber=m),disabled:""},null,8,["type","modelValue"])]),c("div",null,[Qe,l(w,{modelValue:a(t).salesOrderDate,"onUpdate:modelValue":e[2]||(e[2]=m=>a(t).salesOrderDate=m),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),c("div",null,[Ke,l(w,{modelValue:a(t).expectedDate,"onUpdate:modelValue":e[3]||(e[3]=m=>a(t).expectedDate=m),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),c("section",Je,[c("div",null,[Ze,l(R,{modelValue:a(t).statusId,"onUpdate:modelValue":e[4]||(e[4]=m=>a(t).statusId=m),editable:"",options:(v=a(F).lifecycle)==null?void 0:v.statuses,optionValue:"id",optionLabel:"name",class:q(["w-full",{"p-invalid":N.value.errors.statusId}])},null,8,["modelValue","options","class"])]),c("div",null,[et,l(R,{modelValue:a(t).customerId,"onUpdate:modelValue":[e[5]||(e[5]=m=>a(t).customerId=m),e[6]||(e[6]=m=>k())],editable:"",options:a(B).customers,optionValue:"id",optionLabel:"comercialName",class:q(["w-full",{"p-invalid":N.value.errors.customerId}])},null,8,["modelValue","options","class"])]),c("div",null,[l(C,{type:a(U).TEXT,label:"Comanda Client",id:"customerSalesOrderNumber",modelValue:a(t).customerSalesOrderNumber,"onUpdate:modelValue":e[7]||(e[7]=m=>a(t).customerSalesOrderNumber=m)},null,8,["type","modelValue"])]),c("div",null,[l(C,{type:a(U).TEXT,disabled:!0,label:"Albarà Entrega",id:"deliveryNote",modelValue:f.value,"onUpdate:modelValue":e[8]||(e[8]=m=>f.value=m)},null,8,["type","modelValue"])])])])):$("",!0)])}}});const at=Ce(tt,[["__scopeId","data-v-a817269d"]]),rt={key:0},st={class:"mb-2"},lt={class:"two-columns"},ot=z({__name:"FormSalesOrderDetail",props:{formAction:{},salesOrderDetail:{}},emits:["submit"],setup(i,{emit:S}){const o=i,h=K(),B=Q(),F=re(()=>o.formAction===T.CREATE?"Afegir":"Modificar"),I=()=>{const r=h.references.find(u=>u.id===o.salesOrderDetail.referenceId);r&&(o.salesOrderDetail.description=r.description,o.salesOrderDetail.isInvoiced=!1,o.salesOrderDetail.isDelivered=!1,o.salesOrderDetail.unitCost=r==null?void 0:r.cost,o.salesOrderDetail.unitPrice=r==null?void 0:r.price,D())},D=()=>{o.salesOrderDetail.amount=o.salesOrderDetail.unitPrice*o.salesOrderDetail.quantity,o.salesOrderDetail.totalCost=o.salesOrderDetail.unitCost*o.salesOrderDetail.quantity},t=de().shape({quantity:qe().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu")}),f=V({result:!1,errors:{}}),_=()=>{const r=new ue(t);f.value=r.validate(o.salesOrderDetail)},N=async()=>{if(_(),f.value.result)S("submit",o.salesOrderDetail);else{let r="";Object.entries(f.value.errors).forEach(u=>{r+=`${u[1].map(k=>k)}.   `}),B.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,u)=>{const k=g("BaseInput"),p=g("Button");return r.salesOrderDetail?(y(),E("form",rt,[c("div",st,[l(Le,{label:"Referència",modelValue:r.salesOrderDetail.referenceId,"onUpdate:modelValue":[u[0]||(u[0]=n=>r.salesOrderDetail.referenceId=n),u[1]||(u[1]=n=>I())],fullName:!0},null,8,["modelValue"])]),c("section",null,[c("div",null,[l(k,{class:q(["mb-2",{"p-invalid":f.value.errors.description}]),label:"Descripció",modelValue:r.salesOrderDetail.description,"onUpdate:modelValue":u[2]||(u[2]=n=>r.salesOrderDetail.description=n),type:a(U).TEXT},null,8,["modelValue","type","class"])])]),c("section",lt,[c("div",null,[l(k,{class:q(["mb-2",{"p-invalid":f.value.errors.quantity}]),label:"Quantitat",modelValue:r.salesOrderDetail.quantity,"onUpdate:modelValue":[u[3]||(u[3]=n=>r.salesOrderDetail.quantity=n),u[4]||(u[4]=n=>D())],type:a(U).NUMERIC},null,8,["modelValue","type","class"])]),c("div",null,[l(k,{class:q(["mb-2",{"p-invalid":f.value.errors.amount}]),label:"Total",modelValue:r.salesOrderDetail.amount,"onUpdate:modelValue":u[5]||(u[5]=n=>r.salesOrderDetail.amount=n),type:a(U).CURRENCY,disabled:""},null,8,["modelValue","type","class"])])]),l(p,{label:F.value,onClick:N,style:{float:"right"}},null,8,["label"])])):$("",!0)}}});var nt=`
@layer primevue {
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .p-tag-icon,
    .p-tag-value,
    .p-tag-icon.pi {
        line-height: 1.5;
    }

    .p-tag.p-tag-rounded {
        border-radius: 10rem;
    }
}
`,it={root:function(S){var o=S.props;return["p-tag p-component",{"p-tag-info":o.severity==="info","p-tag-success":o.severity==="success","p-tag-warning":o.severity==="warning","p-tag-danger":o.severity==="danger","p-tag-rounded":o.rounded}]},icon:"p-tag-icon",value:"p-tag-value"},dt=Ne.extend({name:"tag",css:nt,classes:it}),ut={name:"BaseTag",extends:Ve,props:{value:null,severity:null,rounded:Boolean,icon:String},style:dt,provide:function(){return{$parentInstance:this}}},ve={name:"Tag",extends:ut};function ct(i,S,o,h,B,F){return y(),E("span",P({class:i.cx("root")},i.ptm("root"),{"data-pc-name":"tag"}),[i.$slots.icon?(y(),M(Te(i.$slots.icon),P({key:0,class:i.cx("icon")},i.ptm("icon")),null,16,["class"])):i.icon?(y(),E("span",P({key:1,class:[i.cx("icon"),i.icon]},i.ptm("icon")),null,16)):$("",!0),i.value||i.$slots.default?se(i.$slots,"default",{key:2},function(){return[c("span",P({class:i.cx("value")},i.ptm("value")),j(i.value),17)]}):$("",!0)],16)}ve.render=ct;const mt={key:0},pt={key:1},vt=["onClick"],ft=z({__name:"TableSalesOrderDetails",props:{salesOrder:{},salesOrderDetails:{}},emits:["edit","delete","createWorkOrder"],setup(i,{emit:S}){const o=i,h=Ee(),B=K(),F=me(),I=pe();var D=void 0;const t=V({closable:!0,modal:!0,title:"Generar ordre de fabricació",visible:!1}),f=V([]),_=V({workMasterId:"",plannedDate:"",plannedQuantity:0,comment:""}),N=p=>{o.salesOrder.deliveryNoteId||p.originalEvent.target.className.includes("grid_delete_column_button")||S("edit",p.data)},r=(p,n)=>{h.require({target:p.currentTarget,message:"Está segur que vol eliminar la referència?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{S("delete",n)}})},u=p=>{f.value=F.getByReferenceId(p.referenceId),_.value.workMasterId="",f.value.length>0&&(_.value.workMasterId=f.value[0].id),_.value.plannedQuantity=p.quantity,_.value.plannedDate=o.salesOrder.expectedDate?Fe(o.salesOrder.expectedDate):"",_.value.comment="",D=p,t.value.visible=!0},k=()=>{const p={workOrderDto:_.value,orderDetail:D};t.value.visible=!1,S("createWorkOrder",p)};return(p,n)=>{const e=g("Column"),C=g("Button"),w=g("DataTable"),R=g("Dialog");return y(),E(le,null,[l(w,{onRowClick:N,value:p.salesOrderDetails,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:b(()=>[se(p.$slots,"header")]),default:b(()=>[l(e,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),l(e,{header:"Referencia",style:{width:"15%"}},{body:b(v=>[Y(j(a(B).getShortNameById(v.data.referenceId)),1)]),_:1}),l(e,{field:"description",header:"Descripció",style:{width:"30%"}}),l(e,{field:"workOrderId",header:"Ordre fabr.",style:{width:"10%"}},{body:b(v=>[a(I).getWorkOrderCodeById(v.data.workOrderId)?(y(),E("div",mt,[l(a(ve),{icon:a(W).CHECK_CIRCLE,severity:"success",value:a(I).getWorkOrderCodeById(v.data.workOrderId)},null,8,["icon","value"])])):(y(),E("div",pt,[l(C,{size:"small",icon:a(W).PLUS_CIRCLE,value:"Generar OF",onClick:m=>u(v.data)},null,8,["icon","onClick"])]))]),_:1}),l(e,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:b(v=>[Y(j(v.data.unitPrice)+" € ",1)]),_:1}),l(e,{field:"amount",header:"Total",style:{width:"10%"}},{body:b(v=>[Y(j(v.data.amount)+" € ",1)]),_:1}),p.salesOrder.deliveryNoteId?$("",!0):(y(),M(e,{key:0,style:{width:"5%"}},{body:b(v=>[v.data.isDelivered?$("",!0):(y(),E("i",{key:0,class:q([a(W).TIMES,"grid_delete_column_button"]),onClick:m=>r(m,v.data)},null,10,vt))]),_:1}))]),_:3},8,["value"]),l(R,{closable:t.value.closable,visible:t.value.visible,"onUpdate:visible":n[0]||(n[0]=v=>t.value.visible=v),header:t.value.title,modal:t.value.modal,style:{width:"50vw"}},{default:b(()=>[l(We,{createWorkOrderDto:_.value,"filtered-work-masters":f.value,onSubmit:k},null,8,["createWorkOrderDto","filtered-work-masters"])]),_:1},8,["closable","visible","header","modal"])],64)}}}),bt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},yt=c("span",{class:"text-l text-900 font-bold"},"Linies de la comanda",-1),Dt="Línia de comanda",Xt=z({__name:"SalesOrder",setup(i){const S=V(),o=V(T.EDIT),h=$e(),B=Be(),F=Re(),I=Q(),D=oe(),t=ne(),f=Ae(),_=Ue(),N=ie(),r=K(),u=ce(),k=me(),p=pe(),n=Me(),{salesOrder:e}=ae(D),C=[{label:"Descarregar",icon:W.FILE_WORD,command:()=>Ie()}],w=V(!1),R=V(T.EDIT),v=V(void 0),m=V(0),fe=async()=>{const d=h.params.id;await D.GetById(d),r.fetchReferencesByModule("sales"),N.fetchOneByName("SalesOrder"),f.fetchSites(),_.fetchAll(),t.fetchCustomers(),n.fetchAll(),p.fetchBySalesOrder(d),k.workmasters||k.fetchAllActives();let s="";e.value&&(o.value=T.EDIT,s=`Comanda ${e.value.salesOrderNumber}`,e.value.salesOrderDate=L(e.value.salesOrderDate),e.value.expectedDate&&(e.value.expectedDate=L(e.value.expectedDate)),e.value.deliveryNoteId?u.GetById(e.value.deliveryNoteId):u.deliveryNote&&(u.deliveryNote=void 0)),F.setMenuItem({icon:W.BUILDING,backButtonVisible:!0,title:s})};he(async()=>{await fe()});const be=()=>{S.value.submitForm()},J=(d,s)=>{r.setNewReference(H()),d===T.CREATE&&(s={id:H(),referenceId:"",quantity:0,unitCost:0,unitPrice:0,totalCost:0,amount:0,salesOrderHeaderId:"",description:"",estimatedDeliveryDate:new Date,isDelivered:!1,isInvoiced:!1}),s.salesOrderHeaderId=e.value.id,v.value=s,R.value=d,w.value=!0},ye=async d=>{let s=!1,O="";s=await D.Update(d.id,d),O=s?"Comanda actualitzada":"Error a l'actualitzar la comanda",I.add({life:5e3,severity:s?"success":"error",summary:O}),s&&B.back()},De=async d=>{R.value===T.CREATE?await D.CreateDetail(d):R.value===T.EDIT&&await D.UpdateDetail(d),w.value=!1,e.value&&(e.value.salesOrderDate=L(e.value.salesOrderDate),e.value.expectedDate&&(e.value.expectedDate=L(e.value.expectedDate)))},Oe=async d=>{o.value===T.EDIT&&await D.DeleteDetail(d);const s=e.value.salesOrderDetails.filter(O=>O.id!==d.id);e.value.salesOrderDetails=s,w.value=!1,e.value.salesOrderDate=L(e.value.salesOrderDate)},ge=async d=>{let s=!1,O="";s=await r.createReference(d),s?O="Referència creada correctament":O="La referència + versió introduïda ja existeix",I.add({severity:s?"success":"warn",summary:O,life:5e3}),s&&(r.setNewReference(H()),m.value=0)},Se=async d=>{const s=await p.create(d.workOrderDto);s.result?(d.orderDetail.workOrderId=s.content.id,await D.UpdateDetail(d.orderDetail)&&(I.add({severity:"success",summary:"Generació OF",detail:`Ordre de fabricació ${s.content.code} generada`}),p.fetchBySalesOrder(e.value.id))):I.add({severity:"error",summary:"Generació OF",detail:"Error al generar la ordre de fabricació"})},Ie=async()=>{var s;const d=await Xe.SalesOrder.GetReportDataById(e.value.id);if(d){const O=`Comanda_${(s=e.value)==null?void 0:s.salesOrderNumber}.docx`,x=await new ze().Download(d,je.Order,O);x?xe(O,x):I.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}};return(d,s)=>{const O=g("SplitButton"),Z=g("Button"),x=g("TabPanel"),ee=g("TabView"),_e=g("Dialog");return y(),E(le,null,[l(O,{label:"Guardar",onClick:be,model:C,size:"small",class:"grid_add_row_button"}),l(at,{class:"mt-3 mb-3",ref_key:"salesOrderForm",ref:S,salesOrder:"salesOrder",onSubmit:ye},null,512),l(ee,null,{default:b(()=>[l(x,{header:"Detall"},{default:b(()=>[a(e)?(y(),M(ft,{key:0,salesOrder:a(e),salesOrderDetails:a(e).salesOrderDetails,onEdit:s[1]||(s[1]=A=>J(a(T).EDIT,A)),onDelete:Oe,onCreateWorkOrder:Se},{header:b(()=>[c("div",bt,[yt,c("section",null,[l(Z,{disabled:a(u).deliveryNote!==void 0,size:"small",label:"Afegir línea",onClick:s[0]||(s[0]=A=>J(a(T).CREATE,{})),class:"mr-2"},null,8,["disabled"])])])]),_:1},8,["salesOrder","salesOrderDetails"])):$("",!0)]),_:1}),l(x,{header:"Fitxers"},{default:b(()=>[a(e)?(y(),M(Ge,{key:0,entity:"SalesOrder",id:a(e).id,title:""},null,8,["id"])):$("",!0)]),_:1})]),_:1}),l(_e,{closable:!0,visible:w.value,"onUpdate:visible":s[3]||(s[3]=A=>w.value=A),header:Dt,modal:!0},{default:b(()=>[l(ee,{activeIndex:m.value,"onUpdate:activeIndex":s[2]||(s[2]=A=>m.value=A)},{default:b(()=>[l(x,{header:"Línea"},{default:b(()=>[v.value?(y(),M(ot,{key:0,formAction:R.value,salesOrderDetail:v.value,onSubmit:De},null,8,["formAction","salesOrderDetail"])):$("",!0)]),_:1}),l(x,{header:"Referencia"},{default:b(()=>[a(r).reference?(y(),M(Pe,{key:0,module:"sales",reference:a(r).reference,onSubmit:ge},null,8,["reference"])):$("",!0)]),_:1})]),_:1},8,["activeIndex"])]),_:1},8,["visible"])],64)}}});export{Xt as default};