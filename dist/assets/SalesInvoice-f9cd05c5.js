import{d as U,j as Q,r as B,h as b,c as C,e as o,i as n,k as m,H as S,l as $,a as _,R as M,x as ve,T as W,o as J,m as z,w as y,Q as pe,n as Z,P as T,G as R,I as x,ad as ye,z as L,s as G,a0 as fe,p as be,b as _e,f as De,v as he,g as Ne,u as Ie,C as we,K as ee,X as Se,ai as ge,L as Ce,D as $e}from"./index-8529e343.js";import{u as Ve}from"./invoice-dbfed93e.js";import{u as ke}from"./customers-22f796ee.js";import{u as j}from"./masterData-9fbe04cf.js";import{u as H}from"./lifecycle-5f73524a.js";import{c as X,a as te,d as Y,F as ae}from"./form-validator-9bee509e.js";import{L as Re}from"./LinkReference-d1f36b4e.js";import{u as ie}from"./reference-4d9dd56a.js";import{u as Be}from"./deliveryNote-22c6204d.js";import{S as qe}from"./index-02e2a02a.js";import{a as Fe,b as Ee}from"./report.service-6b90f343.js";const Te={key:0},xe={class:"four-columns"},Ue={class:"mt-2"},Ae={class:"mt-2"},Le=o("label",{class:"block text-900 mb-2"},"Data Factura",-1),Me={class:"mt-2"},ze=o("label",{class:"block text-900 mb-2"},"Estat",-1),Oe={class:"mt-2"},Pe=o("label",{class:"block text-900 mb-2"},"Métode Pagament",-1),Ge={class:"four-columns"},Qe={class:"mt-1"},je=o("label",{class:"block text-900 mb-2"},"Base",-1),He={class:"summary-field"},Ke={class:"mt-1"},Ye=o("label",{class:"block text-900 mb-2"},"Impostos",-1),We={class:"summary-field"},Je={class:"mt-1"},Xe=o("label",{class:"block text-900 mb-2"},"Total",-1),Ze={class:"summary-field"},et=U({__name:"FormSalesInvoice",props:{invoice:{}},emits:["submit","cancel"],setup(D,{emit:w}){Q();const c=j(),f=H();return X().shape({invoiceDate:te().required("La data és obligatoria"),paymentMethodId:te().required("El métode de pagament és obligatori")}),B({result:!1,errors:{}}),(d,u)=>{var r;const h=b("BaseInput"),N=b("Calendar"),v=b("Dropdown");return d.invoice?(_(),C("form",Te,[o("section",xe,[o("div",Ue,[n(h,{modelValue:d.invoice.invoiceNumber,"onUpdate:modelValue":u[0]||(u[0]=e=>d.invoice.invoiceNumber=e),label:"Número",disabled:!0},null,8,["modelValue"])]),o("div",Ae,[Le,n(N,{modelValue:d.invoice.invoiceDate,"onUpdate:modelValue":u[1]||(u[1]=e=>d.invoice.invoiceDate=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),o("div",Me,[ze,n(v,{modelValue:d.invoice.statusId,"onUpdate:modelValue":u[2]||(u[2]=e=>d.invoice.statusId=e),editable:"",options:(r=m(f).lifecycle)==null?void 0:r.statuses,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),o("div",Oe,[Pe,n(v,{modelValue:d.invoice.paymentMethodId,"onUpdate:modelValue":u[3]||(u[3]=e=>d.invoice.paymentMethodId=e),editable:"",options:m(c).paymentMethods,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",Ge,[o("div",Qe,[je,o("span",He,S(m(M)(d.invoice.baseAmount)),1)]),o("div",Ke,[Ye,o("span",We,S(m(M)(d.invoice.taxAmount)),1)]),o("div",Je,[Xe,o("span",Ze,S(m(M)(d.invoice.netAmount)),1)])])])):$("",!0)}}}),tt=["onClick"],at={class:"vertical-align-middle ml-2 font-bold line-height-3"},it={key:0},ot={key:1},lt=["onClick"],st=U({__name:"TableInvoiceDetails",props:{details:{},deliveryNotes:{},canDelete:{type:Boolean}},emits:["delete","deleteDeliveryNote"],setup(D,{emit:w}){const c=D,f=ve(),d=H(),u=j(),h=ie(),N=W(()=>{let l=[];if(!c.details)return l;const a=c.details.filter(i=>!i.deliveryNoteDetailId).map(i=>({deliveryNoteId:"",deliveryNoteNumber:"Sense albarà",deliveryNoteDate:"",...i}));a.length>0&&l.push(...a);const s=c.details.filter(i=>i.deliveryNoteDetailId).map(i=>{var F;const t=(F=c.deliveryNotes)==null?void 0:F.find(V=>{var E;return V.id===((E=i.deliveryNoteDetail)==null?void 0:E.deliveryNoteId)}),g=t&&t.deliveryDate?`Entregat ${x(t.deliveryDate)}`:"No entregat";if(h.references){const V=h.references.find(E=>{var O;return E.id===((O=i.deliveryNoteDetail)==null?void 0:O.referenceId)});V&&(i.reference=V)}return{deliveryNoteId:t==null?void 0:t.id,deliveryNoteNumber:`Albarà ${t?`${t.number} - ${g}`:"--"}`,deliveryNoteDate:t&&t.deliveryDate?` - ${x(t.deliveryDate)}`:"",...i}});return s.length>0&&l.push(...s),console.log(s,l),ye.orderBy(l,i=>[i.deliveryNoteNumber,i.description])});J(async()=>{await d.fetchOneByName("SalesInvoice")});const v=l=>{var s;const a=(s=u.taxes)==null?void 0:s.find(i=>i.id===l);if(a)return`${a.name}`},r=(l,a)=>{f.require({message:`Està segur que vol eliminar la línea ${a.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("delete",a)}})},e=(l,a)=>{if(!c.deliveryNotes)return;const s=c.deliveryNotes.find(i=>i.id===a.deliveryNoteId);s&&f.require({message:`Està segur que vol treure l'${a.deliveryNoteNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("deleteDeliveryNote",s)}})};return(l,a)=>{const s=b("Column"),i=b("DataTable");return _(),z(i,{class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"62vh",value:N.value,rowGroupMode:"subheader",groupRowsBy:"deliveryNoteNumber"},{header:y(()=>[pe(l.$slots,"header")]),groupheader:y(t=>[l.canDelete&&t.data.deliveryNoteNumber!=="Sense albarà"?(_(),C("i",{key:0,class:Z([m(T).TIMES,"grid_delete_column_button"]),onClick:g=>e(g,t.data)},null,10,tt)):$("",!0),R("   "),o("span",at,S(t.data.deliveryNoteNumber),1)]),default:y(()=>[n(s,{header:"Albarà",field:"deliveryNoteNumber",style:{width:"5%"}}),n(s,{header:"",field:"",style:{width:"2%"}}),n(s,{header:"Quantitat",field:"quantity",style:{width:"10%"}}),n(s,{header:"Referència",field:"reference.code",style:{width:"15%"}},{body:y(t=>[t.data.deliveryNoteDetail?(_(),C("span",it,[n(Re,{id:t.data.deliveryNoteDetail.referenceId},null,8,["id"])])):(_(),C("span",ot,"--"))]),_:1}),n(s,{header:"Descripció",field:"description",style:{width:"40%"}}),n(s,{header:"Preu unitat",style:{width:"10%"}},{body:y(t=>[R(S(m(M)(t.data.unitPrice)),1)]),_:1}),n(s,{header:"Impost",style:{width:"10%"}},{body:y(t=>[R(S(v(t.data.taxId)),1)]),_:1}),n(s,{header:"Total",field:"totalCost",style:{width:"10%"}},{body:y(t=>[R(S(m(M)(t.data.amount)),1)]),_:1}),n(s,{style:{width:"10%"}},{body:y(t=>[!t.data.deliveryNoteDetailId&&l.canDelete?(_(),C("i",{key:0,class:Z([m(T).TIMES,"grid_delete_column_button"]),onClick:g=>r(g,t.data)},null,10,lt)):$("",!0)]),_:1})]),_:3},8,["value"])}}}),nt={key:0},rt={class:"two-columns-7525"},ct={class:"mt-2"},dt={class:"mt-2"},ut=o("label",{class:"block text-900 mb-2"},"Impost",-1),mt={class:"three-columns"},vt={class:"mt-2"},pt={class:"mt-2"},yt={class:"mt-2"},ft=U({__name:"FormSalesInvoiceDetail",props:{invoiceDetail:{}},emits:["submit","cancel"],setup(D,{emit:w}){const c=D,f=Q(),d=j(),u=()=>{const e=c.invoiceDetail;e.quantity&&e.quantity>0&&e.unitPrice&&e.unitPrice>0&&(c.invoiceDetail.unitCost=e.unitPrice,c.invoiceDetail.amount=fe.round(e.quantity*e.unitPrice,2),c.invoiceDetail.totalCost=c.invoiceDetail.amount)},h=X().shape({quantity:Y().min(1).required("La quantitat ha de ser superior a 1"),unitPrice:Y().min(.01).required("El preu unitat és obligatori")}),N=B({result:!1,errors:{}}),v=()=>{const e=new ae(h);N.value=e.validate(c.invoiceDetail)},r=async()=>{if(v(),N.value.result)w("submit",c.invoiceDetail);else{let e="";Object.entries(N.value.errors).forEach(l=>{e+=`${l[1].map(a=>a)}.   `}),f.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,l)=>{const a=b("Dropdown"),s=b("Button");return e.invoiceDetail?(_(),C("form",nt,[o("section",rt,[o("div",ct,[n(L,{label:"Descripció",modelValue:e.invoiceDetail.description,"onUpdate:modelValue":l[0]||(l[0]=i=>e.invoiceDetail.description=i)},null,8,["modelValue"])]),o("div",dt,[ut,n(a,{modelValue:e.invoiceDetail.taxId,"onUpdate:modelValue":l[1]||(l[1]=i=>e.invoiceDetail.taxId=i),editable:"",options:m(d).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",mt,[o("div",vt,[n(L,{type:m(G).NUMERIC,label:"Quantitat",modelValue:e.invoiceDetail.quantity,"onUpdate:modelValue":[l[2]||(l[2]=i=>e.invoiceDetail.quantity=i),u]},null,8,["type","modelValue"])]),o("div",pt,[n(L,{type:m(G).CURRENCY,label:"Preu Unitat","model-value":e.invoiceDetail.unitPrice,"onUpdate:modelValue":[l[3]||(l[3]=i=>e.invoiceDetail.unitPrice=i),u]},null,8,["type","model-value"])]),o("div",yt,[n(L,{type:m(G).CURRENCY,label:"Total","model-value":e.invoiceDetail.amount,"onUpdate:modelValue":l[4]||(l[4]=i=>e.invoiceDetail.amount=i),disabled:""},null,8,["type","model-value"])])]),n(s,{label:"Crear",onClick:r,style:{float:"right"},size:"small",class:"mt-2"})])):$("",!0)}}}),bt={key:0},_t={class:"mt-2"},Dt=U({__name:"FormRectificativeInvoice",props:{rectificativeInvoice:{},maximumQuantity:{}},emits:["submit","cancel"],setup(D,{emit:w}){const c=D,f=Q(),d=X().shape({quantity:Y().min(1,"La quantitat ha de ser superior a 1").required("La quanitat és obligatoria")}),u=B({result:!1,errors:{}}),h=()=>{const v=new ae(d);u.value=v.validate(c.rectificativeInvoice)},N=async()=>{if(h(),u.value.result){if(c.rectificativeInvoice.quantity>c.maximumQuantity){f.add({severity:"warn",summary:"Formulari invàlid",detail:"La quanitat introduïda no pot ser superior a la quantitat de la factura",life:5e3});return}w("submit",c.rectificativeInvoice)}else{let v="";Object.entries(u.value.errors).forEach(r=>{v+=`${r[1].map(e=>e)}.   `}),f.add({severity:"warn",summary:"Formulari invàlid",detail:v,life:5e3})}};return(v,r)=>{const e=b("Button");return v.rectificativeInvoice?(_(),C("form",bt,[o("section",null,[o("div",_t,[n(L,{label:"Import a facturar sense IVA",modelValue:v.rectificativeInvoice.quantity,"onUpdate:modelValue":r[0]||(r[0]=l=>v.rectificativeInvoice.quantity=l),decimals:2,type:m(G).CURRENCY},null,8,["modelValue","type"])])]),n(e,{label:"Crear",onClick:N,style:{float:"right"},size:"small",class:"mt-2"})])):$("",!0)}}}),ht=D=>(be("data-v-1516f95e"),D=D(),_e(),D),Nt={class:"selector-filter"},It={class:"selector-filter-field"},wt=ht(()=>o("label",{for:""},"Buscar",-1)),St={class:"selector-filter-button"},gt={class:"flex align-items-center gap-2"},Ct=U({__name:"SelectorDeliveryNotes",props:{deliveryNotes:{},headerVisible:{type:Boolean}},emits:["selected"],setup(D,{emit:w}){const c=D;J(()=>{f.fetchOneByName("DeliveryNote")});const f=H(),d=B([]),u=B(""),h=W(()=>{var r=[];return c.deliveryNotes&&(r=c.deliveryNotes.filter(e=>e.number.toString().includes(u.value))),r}),N=r=>{var l;const e=(l=f.lifecycle)==null?void 0:l.statuses.find(a=>a.id===r);return e?e.name:""},v=()=>{d.value.length!==0&&w("selected",d.value)};return(r,e)=>{const l=b("InputText"),a=b("Button"),s=b("Column"),i=b("DataTable");return _(),z(i,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:h.value,selectionMode:"multiple",selection:d.value,"onUpdate:selection":e[1]||(e[1]=t=>d.value=t)},{header:y(()=>[o("header",Nt,[o("div",It,[wt,R("   "),n(l,{style:{width:"150px",height:"35px"},modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=t=>u.value=t),size:"small"},null,8,["modelValue"])]),o("div",St,[n(a,{onClick:v,size:"small",icon:m(T).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:y(t=>[o("div",gt,[o("b",null,"Albarà d'entrega "+S(t.data.salesOrderNumber)+" - "+S(m(x)(t.data.salesOrderDate)),1)])]),default:y(()=>[n(s,{header:"Número",field:"number",style:{width:"10%"}}),n(s,{header:"Estat",field:"status",style:{width:"10%"}},{body:y(t=>[R(S(N(t.data.statusId)),1)]),_:1}),n(s,{header:"Data Entrega",field:"deliveryDate",style:{width:"10%"}},{body:y(t=>[R(S(t.data.deliveryDate?m(x)(t.data.deliveryDate):""),1)]),_:1})]),_:1},8,["value","selection"])}}});const $t=De(Ct,[["__scopeId","data-v-1516f95e"]]),Vt={key:0},kt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Rt=o("span",{class:"text-xl text-900 font-bold"},"Detall de la factura",-1),Ot=U({__name:"SalesInvoice",setup(D){const w=[{label:"Descarregar",icon:T.FILE_WORD,command:()=>O()},{label:"Rectificativa",icon:T.FILE_IMPORT,command:()=>de()}],c=he(),f=Ne(),d=Ie(),u=Q(),h=j(),N=ke(),v=H(),r=Ve(),e=Be(),l=ie(),{invoice:a}=we(r),s={Free:0,FromDeliveryNote:1,Rectificative:2},i=B(0),t=ee({visible:!1,title:"",closable:!0,position:"center",modal:!0}),g=B("");J(async()=>{g.value=c.params.id,h.fetchMasterData(),N.fetchCustomers(),await l.fetchReferencesByModule("sales"),await F(),d.setMenuItem({icon:T.WALLET,title:`Factura de venta ${a.value.invoiceNumber} - ${a.value.customerComercialName}`,backButtonVisible:!0})});const F=async()=>{v.fetchOneByName("SalesInvoice"),await r.GetById(g.value),await e.GetByInvoiceId(g.value),a.value&&(a.value.invoiceDate=x(a.value.invoiceDate))},V=W(()=>a.value!==void 0&&a.value.parentSalesInvoiceId===null),E=async()=>{a.value&&(a.value.invoiceDate=$e(a.value.invoiceDate),await r.Update(a.value)&&f.back())},O=async()=>{var I;const p=await qe.SalesInvoice.GetReportDataById(a.value.id);if(p){const k=`Factura_${(I=a.value)==null?void 0:I.invoiceNumber}.docx`,P=await new Ee().Download(p,Fe.Invoice,k);P?Se(k,P):u.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},oe=async()=>{a.value&&(await e.GetToInvoice(a.value.customerId),i.value=s.FromDeliveryNote,t.title="Selector d'albarans d'entrega",t.visible=!0)},le=async p=>{for(let I=0;I<p.length;I++){const k=p[I];await r.AddDeliveryNote(a.value.id,k)}t.visible=!1,F()},se=async p=>{await r.RemoveDeliveryNote(a.value.id,p),F()},q=ee({}),ne=()=>{var p;if(i.value=s.Free,a.value){q.salesInvoiceId=a.value.id,q.quantity=1,q.description="",q.totalCost=0;const I=(p=h.taxes)==null?void 0:p.find(k=>k.percentatge===21);I&&(q.taxId=I.id),t.title="Introducció de línea lliure",t.visible=!0}},re=async()=>{await r.CreateInvoiceDetail(q),t.visible=!1},ce=async p=>{await r.DeleteInvoiceDetail(p),r.invoice.invoiceDate=x(r.invoice.invoiceDate)},A=B(void 0),de=()=>{A.value={id:a.value.id,quantity:0},t.visible=!0,t.title="Crear factura rectificativa",i.value=s.Rectificative},ue=async()=>{if(A.value){const p=await r.CreateRectificative(A.value);p&&p.result&&p.content?(u.add({summary:"Factura rectificativa",detail:`Creada correctament amb el número ${p.content.invoiceNumber}`,severity:"success",life:1e4}),f.back()):u.add({summary:"Factura rectificativa",detail:"Error en la creació de la factura",severity:"error",life:1e4})}};return(p,I)=>{const k=b("SplitButton"),K=b("Button"),P=b("Dialog");return _(),C(Ce,null,[n(k,{label:"Guardar",onClick:E,model:w,size:"small",class:"grid_add_row_button"}),m(a)?(_(),C("main",Vt,[n(et,{class:"mt-3 mr-3",invoice:m(a)},null,8,["invoice"]),n(st,{class:"mt-3",canDelete:V.value,details:m(a).salesInvoiceDetails,deliveryNotes:m(e).deliveryNotes,onDeleteDeliveryNote:se,onDelete:ce},{header:y(()=>[o("div",kt,[Rt,o("div",null,[n(K,{size:"small",label:"Afegir albarà",onClick:oe,disabled:!V.value},null,8,["disabled"]),R("    "),n(K,{size:"small",label:"Afegir linia lliure",onClick:ne,disabled:!V.value},null,8,["disabled"])])])]),_:1},8,["canDelete","details","deliveryNotes"])])):$("",!0),n(P,{visible:t.visible,"onUpdate:visible":I[0]||(I[0]=me=>t.visible=me),header:t.title,closable:t.closable,modal:t.modal,style:ge({width:i.value===s.Rectificative?"20vw":i.value===s.Free?"50vw":"60vw"}),maximizable:i.value===s.FromDeliveryNote},{default:y(()=>[i.value===s.Free?(_(),z(ft,{key:0,invoiceDetail:q,onSubmit:re},null,8,["invoiceDetail"])):$("",!0),i.value===s.FromDeliveryNote?(_(),z($t,{key:1,headerVisible:!0,deliveryNotes:m(e).invoiceableDeliveryNotes,onSelected:le},{header:y(()=>[]),_:1},8,["deliveryNotes"])):$("",!0),m(a)&&i.value===s.Rectificative&&A.value?(_(),z(Dt,{key:2,"rectificative-invoice":A.value,"maximum-quantity":m(a).baseAmount,onSubmit:ue},null,8,["rectificative-invoice","maximum-quantity"])):$("",!0)]),_:1},8,["visible","header","closable","modal","style","maximizable"])],64)}}});export{Ot as default};
