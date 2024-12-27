import{d as Q,j as ee,C as te,V as re,r as h,h as _,a as f,c as V,k as r,e as u,i as o,s as z,n as H,l as E,D as K,p as we,b as Ie,f as ae,x as Se,o as oe,w as n,Q as Ce,H as C,R as $,P as Y,G as x,m as G,L as se,ah as ge,F as g,v as he,g as Ne,u as Te,E as xe,Y as Ee,I as Z,J as Ve}from"./index-3259d18c.js";import{u as le}from"./order-450160ef.js";import{u as de}from"./reference-1e4fc38c.js";import{u as ie}from"./customers-2780a7e1.js";import{u as Be}from"./plantmodel-b960b490.js";import{u as ne}from"./lifecycle-5421a50b.js";import{u as Fe}from"./tax-42893cd6.js";import{c as We,a as j,F as $e}from"./form-validator-74a9b5a3.js";import{u as ue}from"./deliveryNote-e0146cd7.js";import{u as ce}from"./budget-520069bf.js";import{_ as Re}from"./FormBudgetOrderDetail.vue_vue_type_script_setup_true_lang-0cba3bfb.js";import{L as Le}from"./LinkReference-f291bcdc.js";import{_ as Me}from"./FormCreateWorkorder.vue_vue_type_script_setup_true_lang-92c7b56b.js";import{u as me}from"./workmaster-dd0e5417.js";import{u as fe}from"./workorder-3c5a1034.js";import{F as Ae}from"./FileEntityPicker-1574eb75.js";import{a as Ue,b as qe}from"./report.service-c143d578.js";import{S as Ge}from"./index-fd01ab84.js";import"./index-1f526e6a.js";import"./DropdownReference.vue_vue_type_script_setup_true_lang-4d725b8f.js";const X=B=>(we("data-v-9ef3c9d3"),B=B(),Ie(),B),Pe={key:0},ze={class:"four-columns mt-2"},je=X(()=>u("label",{class:"block text-900 mb-2"},"Client",-1)),Ye=X(()=>u("label",{class:"block text-900 mb-2"},"Estat",-1)),Xe={class:"four-columns mt-2"},He=X(()=>u("label",{class:"block text-900 mb-2"},"Data Alta",-1)),Qe=X(()=>u("label",{class:"block text-900 mb-2"},"Data Entrega",-1)),Je=Q({__name:"FormSalesOrder",emits:["submit","cancel"],setup(B,{expose:I,emit:v}){const M=le(),F=ie(),k=ne(),D=ue(),p=ce(),O=ee(),{salesOrder:a}=te(M),y=re(()=>D.deliveryNote?D.deliveryNote.number:""),W=We().shape({siteId:j().required("L'origen es obligatori"),customerId:j().required("El client es obligatori"),statusId:j().required("L'estat es obligatori"),exerciseId:j().required("L'exercici es obligatori")}),S=h({result:!1,errors:{}}),N=()=>{const c=new $e(W);S.value=c.validate(a.value)};I({submitForm:async()=>{if(N(),S.value.result)U(),v("submit",a.value);else{let c="";Object.entries(S.value.errors).forEach(e=>{c+=`${e[1].map(i=>i)}.   `}),O.add({severity:"warn",summary:"Formulari inválid",detail:c,life:5e3})}}});const T=()=>{var e;const c=(e=F.customers)==null?void 0:e.find(i=>{var d;return i.id===((d=a.value)==null?void 0:d.customerId)});c&&a.value&&(a.value.customerCode=c.code,a.value.customerComercialName=c.comercialName,a.value.customerTaxName=c.taxName,a.value.customerVatNumber=c.vatNumber,a.value.customerAccountNumber=c.accountNumber)},U=()=>{a.value&&(a.value.date=K(a.value.date),a.value.expectedDate&&(a.value.expectedDate=K(a.value.expectedDate)))};return(c,e)=>{var w,R;const i=_("BaseInput"),d=_("Dropdown"),m=_("Calendar");return f(),V("div",null,[r(a)?(f(),V("form",Pe,[u("section",ze,[u("div",null,[o(i,{type:r(z).TEXT,label:"Num. Comanda",id:"salesOrderNumber",modelValue:r(a).number,"onUpdate:modelValue":e[0]||(e[0]=t=>r(a).number=t),disabled:""},null,8,["type","modelValue"])]),u("div",null,[je,o(d,{modelValue:r(a).customerId,"onUpdate:modelValue":[e[1]||(e[1]=t=>r(a).customerId=t),e[2]||(e[2]=t=>T())],editable:"",options:r(F).customers,optionValue:"id",optionLabel:"comercialName",class:H(["w-full",{"p-invalid":S.value.errors.customerId}])},null,8,["modelValue","options","class"])]),u("div",null,[o(i,{type:r(z).TEXT,label:"Comanda Client",id:"customerSalesOrderNumber",modelValue:r(a).customerNumber,"onUpdate:modelValue":e[3]||(e[3]=t=>r(a).customerNumber=t)},null,8,["type","modelValue"])]),u("div",null,[Ye,o(d,{modelValue:r(a).statusId,"onUpdate:modelValue":e[4]||(e[4]=t=>r(a).statusId=t),editable:"",options:(w=r(k).lifecycle)==null?void 0:w.statuses,optionValue:"id",optionLabel:"name",class:H(["w-full",{"p-invalid":S.value.errors.statusId}])},null,8,["modelValue","options","class"])])]),u("section",Xe,[u("div",null,[He,o(m,{modelValue:r(a).date,"onUpdate:modelValue":e[5]||(e[5]=t=>r(a).date=t),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),u("div",null,[Qe,o(m,{modelValue:r(a).expectedDate,"onUpdate:modelValue":e[6]||(e[6]=t=>r(a).expectedDate=t),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),u("div",null,[o(i,{type:r(z).TEXT,label:"Num. Pressupost",id:"budgetNumber",disabled:"",value:(R=r(p).budget)==null?void 0:R.number},null,8,["type","value"])]),u("div",null,[o(i,{type:r(z).TEXT,disabled:!0,label:"Albarà Entrega",id:"deliveryNote",modelValue:y.value,"onUpdate:modelValue":e[7]||(e[7]=t=>y.value=t)},null,8,["type","modelValue"])])])])):E("",!0)])}}});const Ke=ae(Je,[["__scopeId","data-v-9ef3c9d3"]]),Ze={key:0},et={key:1},tt=["onClick"],rt={class:"total"},at={class:"total-text"},ot=Q({__name:"TableSalesOrderDetails",props:{salesOrder:{},salesOrderDetails:{},secondaryLifecycle:{},workorders:{}},emits:["edit","delete","createWorkOrder","openWorkOrder"],setup(B,{emit:I}){const v=B,M=Se();de();const F=me(),k=fe(),D=re(()=>v.salesOrderDetails?v.salesOrderDetails.reduce((e,i)=>e+i.amount,0):0);oe(async()=>{k.fetchBySalesOrder(v.salesOrder.id)});var p=void 0;const O=h({closable:!0,modal:!0,title:"Generar ordre de fabricació",visible:!1}),a=h([]),y=h({workMasterId:"",plannedDate:"",plannedQuantity:0,comment:""}),W=e=>{v.salesOrder.deliveryNoteId||e.originalEvent.target.className.includes("grid_delete_column_button")||I("edit",e.data)},S=(e,i)=>{M.require({target:e.currentTarget,message:"Está segur que vol eliminar la referència?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{I("delete",i)}})},N=e=>{if(!e.workOrderId)return 0;const i=k.getWorkOrderCost(e.workOrderId);return i===0?0:i/e.quantity},A=e=>{a.value=F.getByReferenceId(e.referenceId),y.value.workMasterId="",a.value.length>0&&(y.value.workMasterId=a.value[0].id),y.value.plannedQuantity=e.quantity,y.value.plannedDate=v.salesOrder.expectedDate?ge(v.salesOrder.expectedDate):"",y.value.comment="",p=e,O.value.visible=!0},T=e=>{var d;if(!e)return"contrast";const i=k.getWorkOrderStatusById(e);if(i){const m=(d=v.secondaryLifecycle)==null?void 0:d.statuses.find(w=>w.id===i);if(m)return m.color}return"contrast"},U=e=>{I("openWorkOrder",e)},c=()=>{const e={workOrderDto:y.value,orderDetail:p};O.value.visible=!1,I("createWorkOrder",e)};return(e,i)=>{const d=_("Column"),m=_("Button"),w=_("DataTable"),R=_("Dialog");return f(),V(se,null,[o(w,{onRowClick:W,value:e.salesOrderDetails,tableStyle:"min-width: 100%",class:"p-datatable-sm",selectionMode:"single",dataKey:"id",sortMode:"single",sortField:"reference.code",sortOrder:1},{header:n(()=>[Ce(e.$slots,"header",{},void 0,!0)]),footer:n(()=>[u("div",rt,[u("span",at,"Total "+C(r($)(D.value)),1)])]),default:n(()=>[o(d,{field:"quantity",header:"Un.",style:{width:"3%"}}),o(d,{header:"Referencia",field:"reference.code",sortable:"",style:{width:"15%"}},{body:n(t=>[o(Le,{id:t.data.referenceId},null,8,["id"])]),_:1}),o(d,{field:"description",header:"Descripció",style:{width:"25%"}}),o(d,{field:"workOrderId",header:"Ordre fabr.",style:{width:"8%"}},{body:n(t=>[r(k).getWorkOrderCodeById(t.data.workOrderId)?(f(),V("div",Ze,[o(m,{size:"small",severity:T(t.data.workOrderId),label:r(k).getWorkOrderCodeById(t.data.workOrderId),onClick:L=>U(t.data.workOrderId)},null,8,["severity","label","onClick"])])):(f(),V("div",et,[o(m,{disabled:e.salesOrder.deliveryNoteId!==null,size:"small",icon:r(Y).PLUS_CIRCLE,value:"Generar OF",onClick:L=>A(t.data)},null,8,["disabled","icon","onClick"])]))]),_:1}),o(d,{field:"unitCost",header:"Cost un. teo.",style:{width:"8%"}},{body:n(t=>[x(C(r($)(t.data.unitCost)),1)]),_:1}),o(d,{field:"totalCost",header:"Cost teòric",style:{width:"8%"}},{body:n(t=>[x(C(r($)(t.data.totalCost)),1)]),_:1}),o(d,{header:"Cost un. r.",style:{width:"8%"}},{body:n(t=>[x(C(r($)(N(t.data))),1)]),_:1}),o(d,{header:"Cost real",style:{width:"6%"}},{body:n(t=>[x(C(r($)(r(k).getWorkOrderCost(t.data.workOrderId))),1)]),_:1}),o(d,{field:"discount",header:"% Bene.",style:{width:"6%"}},{body:n(t=>[x(C(t.data.profit)+" % ",1)]),_:1}),o(d,{field:"profit",header:"% Desc.",style:{width:"6%"}},{body:n(t=>[x(C(t.data.discount)+" % ",1)]),_:1}),o(d,{header:"Preu un.",style:{width:"6%"}},{body:n(t=>[x(C(r($)(t.data.unitPrice)),1)]),_:1}),o(d,{field:"amount",header:"Total",style:{width:"6%"}},{body:n(t=>[x(C(r($)(t.data.amount)),1)]),_:1}),e.salesOrder.deliveryNoteId?E("",!0):(f(),G(d,{key:0,style:{width:"5%"}},{body:n(t=>[!t.data.isDelivered&&!t.data.workOrderId?(f(),V("i",{key:0,class:H([r(Y).TIMES,"grid_delete_column_button"]),onClick:L=>S(L,t.data)},null,10,tt)):E("",!0)]),_:1}))]),_:3},8,["value"]),o(R,{closable:O.value.closable,visible:O.value.visible,"onUpdate:visible":i[0]||(i[0]=t=>O.value.visible=t),header:O.value.title,modal:O.value.modal,style:{width:"50vw"}},{default:n(()=>[o(Me,{createWorkOrderDto:y.value,"filtered-work-masters":a.value,onSubmit:c},null,8,["createWorkOrderDto","filtered-work-masters"])]),_:1},8,["closable","visible","header","modal"])],64)}}});const st=ae(ot,[["__scopeId","data-v-fdf45e2d"]]),lt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},dt=u("span",{class:"text-l text-900 font-bold"},"Linies de la comanda",-1),it={key:0},nt="Línia de comanda",xt=Q({__name:"SalesOrder",setup(B){const I=h(),v=h(g.EDIT),M=he(),F=Ne(),k=Te(),D=ee(),p=le(),O=ie(),a=Be(),y=xe(),W=ne(),S=de(),N=ue(),A=me(),T=fe(),U=Fe(),c=ce(),{salesOrder:e}=te(p),i=[{label:"Descarregar",icon:Y.FILE_WORD,command:()=>Oe()}],d=h(!1),m=h(g.EDIT),w=h(void 0),R=async()=>{const s=M.params.id;await p.GetById(s),S.fetchReferencesByModule("sales"),W.fetchOneByName("SalesOrder"),W.fetchSecondaryByName("WorkOrder"),a.fetchSites(),y.fetchAll(),O.fetchCustomers(),U.fetchAll(),T.fetchBySalesOrder(s),A.workmasters||A.fetchAllActives();let l="";e.value&&(v.value=g.EDIT,l=`Comanda ${e.value.number}`,e.value.date=Z(e.value.date),e.value.expectedDate&&(e.value.expectedDate=Z(e.value.expectedDate)),e.value.deliveryNoteId?N.GetById(e.value.deliveryNoteId):N.deliveryNote&&(N.deliveryNote=void 0),e.value.budgetId?await c.GetById(e.value.budgetId):c.budget=void 0),k.setMenuItem({icon:Y.BUILDING,backButtonVisible:!0,title:l})};oe(async()=>{await R()});const t=()=>{I.value.submitForm()},L=(s,l)=>{s===g.CREATE&&(l={id:Ve(),referenceId:"",quantity:1,profit:0,productionProfit:0,materialProfit:25,externalProfit:25,discount:0,unitCost:0,serviceCost:0,transportCost:0,productionCost:0,materialCost:0,unitPrice:0,totalCost:0,amount:0,salesOrderHeaderId:"",lastCost:0,workMasterCost:0,description:"",estimatedDeliveryDate:new Date,isDelivered:!1,isInvoiced:!1,workMasterId:null,workOrderId:null}),l.salesOrderHeaderId=e.value.id,w.value=Object.assign({},l),m.value=s,d.value=!0},ve=async s=>{if(!s.date)return D.add({severity:"error",summary:"Error al crear la comanda ",detail:"La data no pot estar buida",life:5e3}),!1;let l=!1,b="";l=await p.Update(s.id,s),b=l?"Comanda actualitzada":"Error a l'actualitzar la comanda",D.add({life:5e3,severity:l?"success":"error",summary:b}),l&&F.back()},pe=async s=>{if(s=s,m.value===g.CREATE)await p.CreateDetail(s);else if(m.value===g.EDIT){await p.UpdateDetail(s);const l=e.value.salesOrderDetails.findIndex(b=>b.id===s.id);e.value.salesOrderDetails[l]=s}d.value=!1},ye=async s=>{v.value===g.EDIT&&await p.DeleteDetail(s);const l=e.value.salesOrderDetails.filter(b=>b.id!==s.id);e.value.salesOrderDetails=l,d.value=!1},be=async s=>{const l=await T.create(s.workOrderDto);l.result?(s.orderDetail.workOrderId=l.content.id,await p.UpdateDetail(s.orderDetail)&&(D.add({severity:"success",summary:"Generació OF",detail:`Ordre de fabricació ${l.content.code} generada`,life:5e3}),T.fetchBySalesOrder(e.value.id))):D.add({severity:"error",summary:"Generació OF",detail:"Error al generar la ordre de fabricació",life:5e3})},_e=s=>{F.push({path:`/workorder/${s}`})},Oe=async()=>{var l;const s=await Ge.SalesOrder.GetReportDataById(e.value.id);if(s){const b=`Comanda_${(l=e.value)==null?void 0:l.number}.docx`,q=await new qe().Download(s,Ue.Order,b);q?Ee(b,q):D.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}};return(s,l)=>{const b=_("SplitButton"),J=_("Button"),q=_("TabPanel"),ke=_("TabView"),De=_("Dialog");return f(),V(se,null,[o(b,{label:"Guardar",onClick:t,model:i,size:"small",class:"grid_add_row_button"}),o(Ke,{class:"mt-3 mb-3",ref_key:"salesOrderForm",ref:I,salesOrder:"salesOrder",onSubmit:ve},null,512),o(ke,null,{default:n(()=>[o(q,{header:"Detall"},{default:n(()=>[r(e)?(f(),G(st,{key:0,salesOrder:r(e),salesOrderDetails:r(e).salesOrderDetails,secondaryLifecycle:r(W).secondaryLifecycle,workorders:r(T).workorders,onEdit:l[1]||(l[1]=P=>L(r(g).EDIT,P)),onDelete:ye,onCreateWorkOrder:be,onOpenWorkOrder:_e},{header:n(()=>[u("div",lt,[dt,r(N).deliveryNote?E("",!0):(f(),V("section",it,[o(J,{size:"small",label:"Afegir línea",onClick:l[0]||(l[0]=P=>L(r(g).CREATE,{})),class:"mr-2"})]))])]),_:1},8,["salesOrder","salesOrderDetails","secondaryLifecycle","workorders"])):E("",!0)]),_:1}),o(q,{header:"Fitxers"},{default:n(()=>[r(e)?(f(),G(Ae,{key:0,entity:"SalesOrder",id:r(e).id,title:""},null,8,["id"])):E("",!0)]),_:1})]),_:1}),r(e)?(f(),G(De,{key:0,style:{width:"100%"},maximizable:!0,closable:!0,visible:d.value,"onUpdate:visible":l[2]||(l[2]=P=>d.value=P),header:nt,modal:!0},{default:n(()=>[w.value?(f(),G(Re,{key:0,formAction:m.value,header:r(e),detail:w.value,onSubmit:pe},null,8,["formAction","header","detail"])):E("",!0)]),_:1},8,["visible"])):E("",!0)],64)}}});export{xt as default};