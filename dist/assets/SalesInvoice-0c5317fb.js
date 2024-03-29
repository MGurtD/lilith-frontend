import{d as q,j as P,r as T,h as y,c as V,e as a,i as n,k as m,D as f,l as k,a as b,x as ne,H as Y,o as j,m as M,w as v,K as re,C as $,n as H,P as F,y as A,s as G,p as ce,b as de,f as ue,v as me,g as ve,u as pe,z as ye,E as K,W as _e,G as fe}from"./index-19723412.js";import{u as be}from"./invoice-b9fa158a.js";import{u as De}from"./customers-f09a89a2.js";import{u as z}from"./masterData-49594a6e.js";import{u as O}from"./lifecycle-ad25beff.js";import{f as R,_ as he,l as Ne,b as Ie,c as Se}from"./functions-79f2dbc4.js";import{c as J,a as Q,d as W,F as we}from"./form-validator-f8953ae6.js";import{u as X}from"./reference-9dcfccff.js";import{u as ge}from"./deliveryNote-c60c63b2.js";import{S as Ce}from"./index-f97c0262.js";import{a as Ve,b as $e}from"./report.service-722df3d8.js";import"./base.service-2e682391.js";import"./index-524ef867.js";import"./reference.service-fb6ab95a.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-ce099dc0.js";import"./file.service-1e9c03ac.js";const Be={key:0},ke={class:"four-columns"},Te={class:"mt-2"},Ee={class:"mt-2"},Fe=a("label",{class:"block text-900 mb-2"},"Data Factura",-1),Re={class:"mt-2"},qe=a("label",{class:"block text-900 mb-2"},"Estat",-1),xe={class:"mt-2"},Ue=a("label",{class:"block text-900 mb-2"},"Métode Pagament",-1),Ae={class:"four-columns"},Me={class:"mt-1"},ze=a("label",{class:"block text-900 mb-2"},"Base",-1),Oe={class:"summary-field"},Le={class:"mt-1"},Ge=a("label",{class:"block text-900 mb-2"},"Impostos",-1),Pe={class:"summary-field"},je={class:"mt-1"},He=a("label",{class:"block text-900 mb-2"},"Total",-1),Ke={class:"summary-field"},Qe=q({__name:"FormSalesInvoice",props:{invoice:{}},emits:["submit","cancel"],setup(D,{emit:g}){P();const d=z(),h=O();return J().shape({invoiceDate:Q().required("La data és obligatoria"),paymentMethodId:Q().required("El métode de pagament és obligatori")}),T({result:!1,errors:{}}),(r,u)=>{var c;const I=y("BaseInput"),N=y("Calendar"),S=y("Dropdown");return r.invoice?(b(),V("form",Be,[a("section",ke,[a("div",Te,[n(I,{modelValue:r.invoice.invoiceNumber,"onUpdate:modelValue":u[0]||(u[0]=e=>r.invoice.invoiceNumber=e),label:"Número",disabled:!0},null,8,["modelValue"])]),a("div",Ee,[Fe,n(N,{modelValue:r.invoice.invoiceDate,"onUpdate:modelValue":u[1]||(u[1]=e=>r.invoice.invoiceDate=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),a("div",Re,[qe,n(S,{modelValue:r.invoice.statusId,"onUpdate:modelValue":u[2]||(u[2]=e=>r.invoice.statusId=e),editable:"",options:(c=m(h).lifecycle)==null?void 0:c.statuses,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),a("div",xe,[Ue,n(S,{modelValue:r.invoice.paymentMethodId,"onUpdate:modelValue":u[3]||(u[3]=e=>r.invoice.paymentMethodId=e),editable:"",options:m(d).paymentMethods,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),a("section",Ae,[a("div",Me,[ze,a("span",Oe,f(r.invoice.baseAmount)+" €",1)]),a("div",Le,[Ge,a("span",Pe,f(r.invoice.taxAmount)+" €",1)]),a("div",je,[He,a("span",Ke,f(r.invoice.netAmount)+" €",1)])])])):k("",!0)}}}),We={class:"vertical-align-middle ml-2 font-bold line-height-3"},Ye=["onClick"],Je={key:0},Xe={key:1},Ze=["onClick"],et=q({__name:"TableInvoiceDetails",props:{details:{},deliveryNotes:{},canDelete:{type:Boolean}},emits:["delete","deleteDeliveryNote"],setup(D,{emit:g}){const d=D,h=ne(),r=O(),u=z(),I=X(),N=Y(()=>{let l=[];if(!d.details)return l;const o=d.details.filter(i=>!i.deliveryNoteDetailId).map(i=>({deliveryNoteId:"",deliveryNoteNumber:"Sense albarà",deliveryNoteDate:"",...i}));o.length>0&&l.push(...o);const s=d.details.filter(i=>i.deliveryNoteDetailId).map(i=>{var w;const t=(w=d.deliveryNotes)==null?void 0:w.find(E=>{var x;return E.id===((x=i.deliveryNoteDetail)==null?void 0:x.deliveryNoteId)});return{deliveryNoteId:t==null?void 0:t.id,deliveryNoteNumber:`Albarà ${t?t.number:"--"}`,deliveryNoteDate:t&&t.deliveryDate?` - ${R(t.deliveryDate)}`:"",...i}});return s.length>0&&l.push(...s),console.log(s,l),he.orderBy(l,i=>i.deliveryNoteNumber)});j(async()=>{await r.fetchOneByName("SalesInvoice")});const S=l=>{var s;const o=(s=u.taxes)==null?void 0:s.find(i=>i.id===l);if(o)return`${o.percentatge} %`},c=(l,o)=>{h.require({message:`Està segur que vol eliminar la línea ${o.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{g("delete",o)}})},e=(l,o)=>{if(!d.deliveryNotes)return;const s=d.deliveryNotes.find(i=>i.id===o.deliveryNoteId);s&&h.require({message:`Està segur que vol treure l'${o.deliveryNoteNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{g("deleteDeliveryNote",s)}})};return(l,o)=>{const s=y("Column"),i=y("DataTable");return b(),M(i,{class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"62vh",sortMode:"multiple",value:N.value,rowGroupMode:"subheader",groupRowsBy:"deliveryNoteNumber"},{header:v(()=>[re(l.$slots,"header")]),groupheader:v(t=>[a("span",We,f(t.data.deliveryNoteNumber),1),$("   "),l.canDelete&&t.data.deliveryNoteNumber!=="Sense albarà"?(b(),V("i",{key:0,class:H([m(F).TIMES,"grid_delete_column_button"]),onClick:w=>e(w,t.data)},null,10,Ye)):k("",!0)]),default:v(()=>[n(s,{header:"Albarà",field:"deliveryNoteNumber",style:{width:"5%"}}),n(s,{header:"",field:"",style:{width:"5%"}}),n(s,{header:"Quantitat",field:"quantity",style:{width:"10%"}}),n(s,{header:"Referència",style:{width:"10%"}},{body:v(t=>[t.data.deliveryNoteDetail?(b(),V("span",Je,f(m(I).getShortNameById(t.data.deliveryNoteDetail.referenceId)),1)):(b(),V("span",Xe,"--"))]),_:1}),n(s,{header:"Descripció",field:"description",style:{width:"40%"}}),n(s,{header:"Preu unitat",field:"unitCost",style:{width:"10%"}},{body:v(t=>[$(f(t.data.unitCost)+" € ",1)]),_:1}),n(s,{header:"IVA",style:{width:"10%"}},{body:v(t=>[$(f(S(t.data.taxId)),1)]),_:1}),n(s,{header:"Total",field:"totalCost",style:{width:"10%"}},{body:v(t=>[$(f(t.data.amount)+" € ",1)]),_:1}),n(s,{style:{width:"10%"}},{body:v(t=>[t.data.deliveryNoteDetailId?k("",!0):(b(),V("i",{key:0,class:H([m(F).TIMES,"grid_delete_column_button"]),onClick:w=>c(w,t.data)},null,10,Ze))]),_:1})]),_:3},8,["value"])}}}),tt={key:0},ot={class:"two-columns-7525"},at={class:"mt-2"},it={class:"mt-2"},lt=a("label",{class:"block text-900 mb-2"},"Impost",-1),st={class:"three-columns"},nt={class:"mt-2"},rt={class:"mt-2"},ct={class:"mt-2"},dt=q({__name:"FormSalesInvoiceDetail",props:{invoiceDetail:{}},emits:["submit","cancel"],setup(D,{emit:g}){const d=D,h=P(),r=z(),u=()=>{const e=d.invoiceDetail;e.quantity&&e.quantity>0&&e.unitPrice&&e.unitPrice>0&&(d.invoiceDetail.unitCost=e.unitPrice,d.invoiceDetail.amount=Ne.round(e.quantity*e.unitPrice,2),d.invoiceDetail.totalCost=d.invoiceDetail.amount)},I=J().shape({quantity:W().min(1).required("La quantitat ha de ser superior a 1"),unitPrice:W().min(.01).required("El preu unitat és obligatori")}),N=T({result:!1,errors:{}}),S=()=>{const e=new we(I);N.value=e.validate(d.invoiceDetail)},c=async()=>{if(S(),N.value.result)g("submit",d.invoiceDetail);else{let e="";Object.entries(N.value.errors).forEach(l=>{e+=`${l[1].map(o=>o)}.   `}),h.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,l)=>{const o=y("Dropdown"),s=y("Button");return e.invoiceDetail?(b(),V("form",tt,[a("section",ot,[a("div",at,[n(A,{label:"Descripció",modelValue:e.invoiceDetail.description,"onUpdate:modelValue":l[0]||(l[0]=i=>e.invoiceDetail.description=i)},null,8,["modelValue"])]),a("div",it,[lt,n(o,{modelValue:e.invoiceDetail.taxId,"onUpdate:modelValue":l[1]||(l[1]=i=>e.invoiceDetail.taxId=i),editable:"",options:m(r).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),a("section",st,[a("div",nt,[n(A,{type:m(G).NUMERIC,label:"Quantitat",modelValue:e.invoiceDetail.quantity,"onUpdate:modelValue":[l[2]||(l[2]=i=>e.invoiceDetail.quantity=i),u]},null,8,["type","modelValue"])]),a("div",rt,[n(A,{type:m(G).CURRENCY,label:"Preu Unitat","model-value":e.invoiceDetail.unitPrice,"onUpdate:modelValue":[l[3]||(l[3]=i=>e.invoiceDetail.unitPrice=i),u]},null,8,["type","model-value"])]),a("div",ct,[n(A,{type:m(G).CURRENCY,label:"Total","model-value":e.invoiceDetail.amount,"onUpdate:modelValue":l[4]||(l[4]=i=>e.invoiceDetail.amount=i),disabled:""},null,8,["type","model-value"])])]),n(s,{label:"Crear",onClick:c,style:{float:"right"},size:"small",class:"mt-2"})])):k("",!0)}}}),ut=D=>(ce("data-v-1516f95e"),D=D(),de(),D),mt={class:"selector-filter"},vt={class:"selector-filter-field"},pt=ut(()=>a("label",{for:""},"Buscar",-1)),yt={class:"selector-filter-button"},_t={class:"flex align-items-center gap-2"},ft=q({__name:"SelectorDeliveryNotes",props:{deliveryNotes:{},headerVisible:{type:Boolean}},emits:["selected"],setup(D,{emit:g}){const d=D;j(()=>{h.fetchOneByName("DeliveryNote")});const h=O(),r=T([]),u=T(""),I=Y(()=>{var c=[];return d.deliveryNotes&&(c=d.deliveryNotes.filter(e=>e.number.toString().includes(u.value))),c}),N=c=>{var l;const e=(l=h.lifecycle)==null?void 0:l.statuses.find(o=>o.id===c);return e?e.name:""},S=()=>{r.value.length!==0&&g("selected",r.value)};return(c,e)=>{const l=y("InputText"),o=y("Button"),s=y("Column"),i=y("DataTable");return b(),M(i,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:I.value,selectionMode:"multiple",selection:r.value,"onUpdate:selection":e[1]||(e[1]=t=>r.value=t)},{header:v(()=>[a("header",mt,[a("div",vt,[pt,$("   "),n(l,{style:{width:"150px",height:"35px"},modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=t=>u.value=t),size:"small"},null,8,["modelValue"])]),a("div",yt,[n(o,{onClick:S,size:"small",icon:m(F).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:v(t=>[a("div",_t,[a("b",null,"Albarà d'entrega "+f(t.data.salesOrderNumber)+" - "+f(m(R)(t.data.salesOrderDate)),1)])]),default:v(()=>[n(s,{header:"Número",field:"number",style:{width:"10%"}}),n(s,{header:"Estat",field:"status",style:{width:"10%"}},{body:v(t=>[$(f(N(t.data.statusId)),1)]),_:1}),n(s,{header:"Data Entrega",field:"deliveryDate",style:{width:"10%"}},{body:v(t=>[$(f(t.data.deliveryDate?m(R)(t.data.deliveryDate):""),1)]),_:1})]),_:1},8,["value","selection"])}}});const bt=ue(ft,[["__scopeId","data-v-1516f95e"]]),Dt={key:0},ht={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Nt=a("span",{class:"text-xl text-900 font-bold"},"Detall de la factura",-1),zt=q({__name:"SalesInvoice",setup(D){const g=[{label:"Descarregar",icon:F.FILE_WORD,command:()=>Z()}],d=me(),h=ve(),r=pe(),u=P(),I=z(),N=De(),S=O(),c=be(),e=ge(),l=X(),{invoice:o}=ye(c),s={Free:0,FromDeliveryNote:1},i=T(0),t=K({visible:!1,title:"",closable:!0,position:"center",modal:!0}),w=T("");j(async()=>{w.value=d.params.id,I.fetchMasterData(),N.fetchCustomers(),await l.fetchReferencesByModule("sales"),await E(),r.setMenuItem({icon:F.WALLET,title:`Factura de venta ${o.value.invoiceNumber} - ${o.value.customerComercialName}`,backButtonVisible:!0})});const E=async()=>{S.fetchOneByName("SalesInvoice"),await c.GetById(w.value),await e.GetByInvoiceId(w.value),o.value&&(o.value.invoiceDate=R(o.value.invoiceDate))},x=async()=>{o.value&&(o.value.invoiceDate=Se(o.value.invoiceDate),await c.Update(o.value)&&h.back())},Z=async()=>{var _;const p=await Ce.SalesInvoice.GetReportDataById(o.value.id);if(p){const C=`Factura_${(_=o.value)==null?void 0:_.invoiceNumber}.docx`,U=await new $e().Download(p,Ve.Invoice,C);U?Ie(C,U):u.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},ee=async()=>{o.value&&(await e.GetToInvoice(o.value.customerId),i.value=s.FromDeliveryNote,t.title="Selector d'albarans d'entrega",t.visible=!0)},te=async p=>{for(let _=0;_<p.length;_++){const C=p[_];await c.AddDeliveryNote(o.value.id,C)}t.visible=!1,E()},oe=async p=>{await c.RemoveDeliveryNote(o.value.id,p),E()},B=K({}),ae=()=>{var p;if(i.value=s.Free,o.value){B.salesInvoiceId=o.value.id,B.quantity=1,B.description="",B.totalCost=0;const _=(p=I.taxes)==null?void 0:p.find(C=>C.percentatge===21);_&&(B.taxId=_.id),t.title="Introducció de línea lliure",t.visible=!0}},ie=async()=>{await c.CreateInvoiceDetail(B),t.visible=!1},le=async p=>{await c.DeleteInvoiceDetail(p),c.invoice.invoiceDate=R(c.invoice.invoiceDate)};return(p,_)=>{const C=y("SplitButton"),L=y("Button"),U=y("Dialog");return b(),V(fe,null,[n(C,{label:"Guardar",onClick:x,model:g,size:"small",class:"grid_add_row_button"}),m(o)?(b(),V("main",Dt,[n(Qe,{class:"mt-3 mr-3",invoice:m(o)},null,8,["invoice"]),n(et,{class:"mt-3",canDelete:!0,details:m(o).salesInvoiceDetails,deliveryNotes:m(e).deliveryNotes,onDeleteDeliveryNote:oe,onDelete:le},{header:v(()=>[a("div",ht,[Nt,a("div",null,[n(L,{size:"small",label:"Afegir albarà",onClick:ee}),$("    "),n(L,{size:"small",label:"Afegir linia lliure",onClick:ae})])])]),_:1},8,["details","deliveryNotes"])])):k("",!0),n(U,{visible:t.visible,"onUpdate:visible":_[0]||(_[0]=se=>t.visible=se),header:t.title,closable:t.closable,modal:t.modal,style:_e({width:i.value===s.Free?"50vw":"60vw"}),maximizable:i.value===s.FromDeliveryNote},{default:v(()=>[i.value===s.Free?(b(),M(dt,{key:0,invoiceDetail:B,onSubmit:ie},null,8,["invoiceDetail"])):k("",!0),i.value===s.FromDeliveryNote?(b(),M(bt,{key:1,headerVisible:!0,deliveryNotes:m(e).invoiceableDeliveryNotes,onSelected:te},{header:v(()=>[]),_:1},8,["deliveryNotes"])):k("",!0)]),_:1},8,["visible","header","closable","modal","style","maximizable"])],64)}}});export{zt as default};
