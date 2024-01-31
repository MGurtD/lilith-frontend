import{d as z,j as J,z as ae,H as re,r as C,h as S,a as b,c as V,k as t,e as m,i as o,s as x,y as W,n as U,l as T,p as Ce,b as Ne,f as Ve,F as N,M as Te,O as Ee,m as L,N as P,W as $e,K as se,D as j,x as Re,w as f,C as H,P as M,G as le,v as Be,g as he,u as Fe,o as xe}from"./index-53820b8d.js";import{c as Ue,b as Ae,f as Q,g as K}from"./functions-4d7ada1d.js";import{u as oe}from"./order-65f74f41.js";import{u as Y}from"./reference-4195502c.js";import{u as ne}from"./customers-f737ba72.js";import{u as ie}from"./exercise-fcd703c2.js";import{u as de}from"./plantmodel-884a3b96.js";import{u as ue}from"./lifecycle-3c6f7322.js";import{u as qe}from"./tax-fc0c76b8.js";import{c as ce,a as G,F as me,d as Le}from"./form-validator-f8953ae6.js";import{u as pe}from"./deliveryNote-90936014.js";import{_ as Me}from"./DropdownReference.vue_vue_type_script_setup_true_lang-897cb77b.js";import{_ as We}from"./FormCreateWorkorder.vue_vue_type_script_setup_true_lang-a83b1564.js";import{u as ve}from"./workmaster-b78e0c53.js";import{u as fe}from"./workorder-6d2bed68.js";import{_ as Pe}from"./FormReference.vue_vue_type_script_setup_true_lang-8a2987f3.js";import{F as Ge}from"./FileEntityPicker-ced8a212.js";import{a as je,b as ze}from"./report.service-e0f20fa7.js";import{S as Xe}from"./index-ea5d03be.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./reference.service-f83d13c3.js";import"./base.service-80f81d45.js";import"./index-6d4d46b9.js";import"./index-a03cc526.js";import"./referenceType-6e3bcdf3.js";import"./file.service-a28e4e6a.js";import"./index-1c47a2ff.js";const X=d=>(Ce("data-v-869804a6"),d=d(),Ne(),d),He={key:0},Qe={class:"four-columns mt-2"},Ke=X(()=>m("label",{class:"block text-900 mb-2"},"Exercici",-1)),Je=X(()=>m("label",{class:"block text-900 mb-2"},"Data Comanda",-1)),Ye={class:"four-columns mt-2"},Ze=X(()=>m("label",{class:"block text-900 mb-2"},"Estat",-1)),et=X(()=>m("label",{class:"block text-900 mb-2"},"Client",-1)),tt=z({__name:"FormSalesOrder",emits:["submit","cancel"],setup(d,{expose:D,emit:n}){const R=oe(),E=ne();de();const B=ie(),I=ue(),v=pe(),g=J(),{salesOrder:a}=ae(R),y=re(()=>v.deliveryNote?v.deliveryNote.number:""),h=ce().shape({siteId:G().required("L'origen es obligatori"),customerId:G().required("El client es obligatori"),statusId:G().required("L'estat es obligatori"),exerciseId:G().required("L'exercici es obligatori")}),r=C({result:!1,errors:{}}),u=()=>{const i=new me(h);r.value=i.validate(a.value)};D({submitForm:async()=>{if(u(),r.value.result)a.value.salesOrderDate=Ue(a.value.salesOrderDate),n("submit",a.value);else{let i="";Object.entries(r.value.errors).forEach(e=>{i+=`${e[1].map(k=>k)}.   `}),g.add({severity:"warn",summary:"Formulari inválid",detail:i,life:5e3})}}});const p=()=>{var e;const i=(e=E.customers)==null?void 0:e.find(k=>{var w;return k.id===((w=a.value)==null?void 0:w.customerId)});i&&a.value&&(a.value.customerCode=i.code,a.value.customerComercialName=i.comercialName,a.value.customerTaxName=i.taxName,a.value.customerVatNumber=i.vatNumber,a.value.customerAccountNumber=i.accountNumber),console.log(a.value)};return(i,e)=>{var $;const k=S("Dropdown"),w=S("Calendar");return b(),V("div",null,[t(a)?(b(),V("form",He,[m("section",Qe,[m("div",null,[o(W,{type:t(x).TEXT,label:"Num. Comanda",id:"salesOrderNumber",modelValue:t(a).salesOrderNumber,"onUpdate:modelValue":e[0]||(e[0]=s=>t(a).salesOrderNumber=s),disabled:""},null,8,["type","modelValue"])]),m("div",null,[o(W,{type:t(x).TEXT,label:"Num. Pressupost",id:"budgetNumber",modelValue:t(a).budgetNumber,"onUpdate:modelValue":e[1]||(e[1]=s=>t(a).budgetNumber=s),disabled:""},null,8,["type","modelValue"])]),m("div",null,[Ke,o(k,{modelValue:t(a).exerciseId,"onUpdate:modelValue":e[2]||(e[2]=s=>t(a).exerciseId=s),editable:"",options:t(B).exercises,optionValue:"id",optionLabel:"name",class:U(["w-full",{"p-invalid":r.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),m("div",null,[Je,o(w,{modelValue:t(a).salesOrderDate,"onUpdate:modelValue":e[3]||(e[3]=s=>t(a).salesOrderDate=s),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),m("section",Ye,[m("div",null,[Ze,o(k,{modelValue:t(a).statusId,"onUpdate:modelValue":e[4]||(e[4]=s=>t(a).statusId=s),editable:"",options:($=t(I).lifecycle)==null?void 0:$.statuses,optionValue:"id",optionLabel:"name",class:U(["w-full",{"p-invalid":r.value.errors.statusId}])},null,8,["modelValue","options","class"])]),m("div",null,[et,o(k,{modelValue:t(a).customerId,"onUpdate:modelValue":[e[5]||(e[5]=s=>t(a).customerId=s),e[6]||(e[6]=s=>p())],editable:"",options:t(E).customers,optionValue:"id",optionLabel:"comercialName",class:U(["w-full",{"p-invalid":r.value.errors.customerId}])},null,8,["modelValue","options","class"])]),m("div",null,[o(W,{type:t(x).TEXT,label:"Comanda Client",id:"customerSalesOrderNumber",modelValue:t(a).customerSalesOrderNumber,"onUpdate:modelValue":e[7]||(e[7]=s=>t(a).customerSalesOrderNumber=s)},null,8,["type","modelValue"])]),m("div",null,[o(W,{type:t(x).TEXT,disabled:!0,label:"Albarà Entrega",id:"deliveryNote",modelValue:y.value,"onUpdate:modelValue":e[8]||(e[8]=s=>y.value=s)},null,8,["type","modelValue"])])])])):T("",!0)])}}});const at=Ve(tt,[["__scopeId","data-v-869804a6"]]),rt={key:0},st={class:"mb-2"},lt={class:"two-columns"},ot=z({__name:"FormSalesOrderDetail",props:{formAction:{},salesOrderDetail:{}},emits:["submit"],setup(d,{emit:D}){const n=d,R=Y(),E=J(),B=re(()=>n.formAction===N.CREATE?"Afegir":"Modificar"),I=()=>{const r=R.references.find(u=>u.id===n.salesOrderDetail.referenceId);r&&(n.salesOrderDetail.description=r.description,n.salesOrderDetail.isInvoiced=!1,n.salesOrderDetail.isDelivered=!1,n.salesOrderDetail.unitCost=r==null?void 0:r.cost,n.salesOrderDetail.unitPrice=r==null?void 0:r.price,v())},v=()=>{n.salesOrderDetail.amount=n.salesOrderDetail.unitPrice*n.salesOrderDetail.quantity,n.salesOrderDetail.totalCost=n.salesOrderDetail.unitCost*n.salesOrderDetail.quantity},g=ce().shape({quantity:Le().required("La quantitat és obligatoria").min(1,"La quantitat ha de ser un número positiu")}),a=C({result:!1,errors:{}}),y=()=>{const r=new me(g);a.value=r.validate(n.salesOrderDetail)},h=async()=>{if(y(),a.value.result)D("submit",n.salesOrderDetail);else{let r="";Object.entries(a.value.errors).forEach(u=>{r+=`${u[1].map(_=>_)}.   `}),E.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,u)=>{const _=S("BaseInput"),p=S("Button");return r.salesOrderDetail?(b(),V("form",rt,[m("div",st,[o(Me,{label:"Referència",modelValue:r.salesOrderDetail.referenceId,"onUpdate:modelValue":[u[0]||(u[0]=i=>r.salesOrderDetail.referenceId=i),u[1]||(u[1]=i=>I())],fullName:!0},null,8,["modelValue"])]),m("section",null,[m("div",null,[o(_,{class:U(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",modelValue:r.salesOrderDetail.description,"onUpdate:modelValue":u[2]||(u[2]=i=>r.salesOrderDetail.description=i),type:t(x).TEXT},null,8,["modelValue","type","class"])])]),m("section",lt,[m("div",null,[o(_,{class:U(["mb-2",{"p-invalid":a.value.errors.quantity}]),label:"Quantitat",modelValue:r.salesOrderDetail.quantity,"onUpdate:modelValue":[u[3]||(u[3]=i=>r.salesOrderDetail.quantity=i),u[4]||(u[4]=i=>v())],type:t(x).NUMERIC},null,8,["modelValue","type","class"])]),m("div",null,[o(_,{class:U(["mb-2",{"p-invalid":a.value.errors.amount}]),label:"Total",modelValue:r.salesOrderDetail.amount,"onUpdate:modelValue":u[5]||(u[5]=i=>r.salesOrderDetail.amount=i),type:t(x).CURRENCY,disabled:""},null,8,["modelValue","type","class"])])]),o(p,{label:B.value,onClick:h,style:{float:"right"}},null,8,["label"])])):T("",!0)}}});var nt=`
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
`,it={root:function(D){var n=D.props;return["p-tag p-component",{"p-tag-info":n.severity==="info","p-tag-success":n.severity==="success","p-tag-warning":n.severity==="warning","p-tag-danger":n.severity==="danger","p-tag-rounded":n.rounded}]},icon:"p-tag-icon",value:"p-tag-value"},dt=Te.extend({name:"tag",css:nt,classes:it}),ut={name:"BaseTag",extends:Ee,props:{value:null,severity:null,rounded:Boolean,icon:String},style:dt,provide:function(){return{$parentInstance:this}}},be={name:"Tag",extends:ut};function ct(d,D,n,R,E,B){return b(),V("span",P({class:d.cx("root")},d.ptm("root"),{"data-pc-name":"tag"}),[d.$slots.icon?(b(),L($e(d.$slots.icon),P({key:0,class:d.cx("icon")},d.ptm("icon")),null,16,["class"])):d.icon?(b(),V("span",P({key:1,class:[d.cx("icon"),d.icon]},d.ptm("icon")),null,16)):T("",!0),d.value||d.$slots.default?se(d.$slots,"default",{key:2},function(){return[m("span",P({class:d.cx("value")},d.ptm("value")),j(d.value),17)]}):T("",!0)],16)}be.render=ct;const mt={key:0},pt={key:1},vt=["onClick"],ft=z({__name:"TableSalesOrderDetails",props:{salesOrder:{},salesOrderDetails:{}},emits:["edit","delete","createWorkOrder"],setup(d,{emit:D}){const n=d,R=Re(),E=Y(),B=ve(),I=fe();var v=void 0;const g=C({closable:!0,modal:!0,title:"Generar ordre de fabricació",visible:!1}),a=C([]),y=C({workMasterId:"",plannedDate:"",plannedQuantity:0,comment:""}),h=p=>{n.salesOrder.deliveryNoteId||p.originalEvent.target.className.includes("grid_delete_column_button")||D("edit",p.data)},r=(p,i)=>{R.require({target:p.currentTarget,message:"Está segur que vol eliminar la referència?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{D("delete",i)}})},u=p=>{a.value=B.getByReferenceId(p.referenceId),y.value.workMasterId="",a.value.length>0&&(y.value.workMasterId=a.value[0].id),y.value.plannedQuantity=p.quantity,y.value.plannedDate="",y.value.comment="",v=p,g.value.visible=!0},_=()=>{const p={workOrderDto:y.value,orderDetail:v};g.value.visible=!1,D("createWorkOrder",p)};return(p,i)=>{const e=S("Column"),k=S("Button"),w=S("DataTable"),$=S("Dialog");return b(),V(le,null,[o(w,{onRowClick:h,value:p.salesOrderDetails,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:f(()=>[se(p.$slots,"header")]),default:f(()=>[o(e,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),o(e,{header:"Referencia",style:{width:"15%"}},{body:f(s=>[H(j(t(E).getShortNameById(s.data.referenceId)),1)]),_:1}),o(e,{field:"description",header:"Descripció",style:{width:"30%"}}),o(e,{field:"workOrderId",header:"Ordre fabr.",style:{width:"10%"}},{body:f(s=>[t(I).getWorkOrderCodeById(s.data.workOrderId)?(b(),V("div",mt,[o(t(be),{icon:t(M).CHECK_CIRCLE,severity:"success",value:t(I).getWorkOrderCodeById(s.data.workOrderId)},null,8,["icon","value"])])):(b(),V("div",pt,[o(k,{size:"small",icon:t(M).PLUS_CIRCLE,value:"Generar OF",onClick:A=>u(s.data)},null,8,["icon","onClick"])]))]),_:1}),o(e,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:f(s=>[H(j(s.data.unitPrice)+" € ",1)]),_:1}),o(e,{field:"amount",header:"Total",style:{width:"10%"}},{body:f(s=>[H(j(s.data.amount)+" € ",1)]),_:1}),p.salesOrder.deliveryNoteId?T("",!0):(b(),L(e,{key:0,style:{width:"5%"}},{body:f(s=>[s.data.isDelivered?T("",!0):(b(),V("i",{key:0,class:U([t(M).TIMES,"grid_delete_column_button"]),onClick:A=>r(A,s.data)},null,10,vt))]),_:1}))]),_:3},8,["value"]),o($,{closable:g.value.closable,visible:g.value.visible,"onUpdate:visible":i[0]||(i[0]=s=>g.value.visible=s),header:g.value.title,modal:g.value.modal,style:{width:"50vw"}},{default:f(()=>[o(We,{createWorkOrderDto:y.value,"filtered-work-masters":a.value,onSubmit:_},null,8,["createWorkOrderDto","filtered-work-masters"])]),_:1},8,["closable","visible","header","modal"])],64)}}}),bt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},yt=m("span",{class:"text-l text-900 font-bold"},"Linies de la comanda",-1),Ot="Línia de comanda",Xt=z({__name:"SalesOrder",setup(d){const D=C(),n=C(N.EDIT),R=Be(),E=he(),B=Fe(),I=J(),v=oe(),g=ne(),a=de(),y=ie(),h=ue(),r=Y(),u=pe(),_=ve(),p=fe(),i=qe(),{salesOrder:e}=ae(v),k=[{label:"Descarregar",icon:M.FILE_WORD,command:()=>_e()}],w=C(!1),$=C(N.EDIT),s=C(void 0),A=C(0),ye=async()=>{const c=R.params.id;await v.GetById(c),r.fetchReferencesByModule("sales"),h.fetchOneByName("SalesOrder"),a.fetchSites(),y.fetchAll(),g.fetchCustomers(),i.fetchAll(),p.fetchBySalesOrder(c),_.workmasters||_.fetchAllActives();let l="";e.value&&(n.value=N.EDIT,l=`Comanda ${e.value.salesOrderNumber}`,e.value.salesOrderDate=Q(e.value.salesOrderDate),e.value.deliveryNoteId?u.GetById(e.value.deliveryNoteId):u.deliveryNote&&(u.deliveryNote=void 0)),B.setMenuItem({icon:M.BUILDING,backButtonVisible:!0,title:l})};xe(async()=>{await ye()});const Oe=()=>{D.value.submitForm()},Z=(c,l)=>{r.setNewReference(K()),c===N.CREATE&&(l={id:K(),referenceId:"",quantity:0,unitCost:0,unitPrice:0,totalCost:0,amount:0,salesOrderHeaderId:"",description:"",estimatedDeliveryDate:new Date,isDelivered:!1,isInvoiced:!1}),l.salesOrderHeaderId=e.value.id,s.value=l,$.value=c,w.value=!0},De=async c=>{let l=!1,O="";l=await v.Update(c.id,c),O=l?"Comanda actualitzada":"Error a l'actualitzar la comanda",I.add({life:5e3,severity:l?"success":"error",summary:O}),l&&E.back()},ge=async c=>{$.value===N.CREATE?await v.CreateDetail(c):$.value===N.EDIT&&await v.UpdateDetail(c),w.value=!1,e.value.salesOrderDate=Q(e.value.salesOrderDate)},Se=async c=>{n.value===N.EDIT&&await v.DeleteDetail(c);const l=e.value.salesOrderDetails.filter(O=>O.id!==c.id);e.value.salesOrderDetails=l,w.value=!1,e.value.salesOrderDate=Q(e.value.salesOrderDate)},Ie=async c=>{let l=!1,O="";l=await r.createReference(c),l?O="Referència creada correctament":O="La referència + versió introduïda ja existeix",I.add({severity:l?"success":"warn",summary:O,life:5e3}),l&&(r.setNewReference(K()),A.value=0)},we=async c=>{const l=await p.create(c.workOrderDto);l.result?(c.orderDetail.workOrderId=l.content.id,await v.UpdateDetail(c.orderDetail)&&(I.add({severity:"success",summary:"Generació OF",detail:`Ordre de fabricació ${l.content.code} generada`}),p.fetchBySalesOrder(e.value.id))):I.add({severity:"error",summary:"Generació OF",detail:"Error al generar la ordre de fabricació"})},_e=async()=>{var l;const c=await Xe.SalesOrder.GetReportDataById(e.value.id);if(c){const O=`Comanda_${(l=e.value)==null?void 0:l.salesOrderNumber}.docx`,F=await new ze().Download(c,je.Order,O);F?Ae(O,F):I.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}};return(c,l)=>{const O=S("SplitButton"),ee=S("Button"),F=S("TabPanel"),te=S("TabView"),ke=S("Dialog");return b(),V(le,null,[o(O,{label:"Guardar",onClick:Oe,model:k,size:"small",class:"grid_add_row_button"}),o(at,{class:"mt-3 mb-3",ref_key:"salesOrderForm",ref:D,salesOrder:"salesOrder",onSubmit:De},null,512),o(te,null,{default:f(()=>[o(F,{header:"Detall"},{default:f(()=>[t(e)?(b(),L(ft,{key:0,salesOrder:t(e),salesOrderDetails:t(e).salesOrderDetails,onEdit:l[1]||(l[1]=q=>Z(t(N).EDIT,q)),onDelete:Se,onCreateWorkOrder:we},{header:f(()=>[m("div",bt,[yt,m("section",null,[o(ee,{disabled:t(u).deliveryNote!==void 0,size:"small",label:"Afegir línea",onClick:l[0]||(l[0]=q=>Z(t(N).CREATE,{})),class:"mr-2"},null,8,["disabled"])])])]),_:1},8,["salesOrder","salesOrderDetails"])):T("",!0)]),_:1}),o(F,{header:"Fitxers"},{default:f(()=>[t(e)?(b(),L(Ge,{key:0,entity:"SalesOrder",id:t(e).id,title:""},null,8,["id"])):T("",!0)]),_:1})]),_:1}),o(ke,{closable:!0,visible:w.value,"onUpdate:visible":l[3]||(l[3]=q=>w.value=q),header:Ot,modal:!0},{default:f(()=>[o(te,{activeIndex:A.value,"onUpdate:activeIndex":l[2]||(l[2]=q=>A.value=q)},{default:f(()=>[o(F,{header:"Línea"},{default:f(()=>[s.value?(b(),L(ot,{key:0,formAction:$.value,salesOrderDetail:s.value,onSubmit:ge},null,8,["formAction","salesOrderDetail"])):T("",!0)]),_:1}),o(F,{header:"Referencia"},{default:f(()=>[t(r).reference?(b(),L(Pe,{key:0,module:"sales",reference:t(r).reference,onSubmit:Ie},null,8,["reference"])):T("",!0)]),_:1})]),_:1},8,["activeIndex"])]),_:1},8,["visible"])],64)}}});export{Xt as default};