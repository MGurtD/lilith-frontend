import{d as x,j as Q,r as R,h as b,c as $,e as o,i as n,k as m,H as S,l as V,a as h,R as L,x as pe,V as K,o as W,m as M,w as y,Q as ye,n as Z,P as T,G as B,I as O,ad as fe,z as A,s as P,a1 as be,p as _e,b as De,f as he,v as Ie,g as Ne,u as we,C as Se,K as ee,Y as ge,ai as Ce,L as $e,D as Ve}from"./index-40c5ef33.js";import{u as ke}from"./invoice-5e7d6511.js";import{u as Be}from"./customers-e5cc267b.js";import{u as j}from"./lifecycle-d45e6b06.js";import{u as ae}from"./tax-29e8fa32.js";import{u as Re}from"./deliveryNote-15f359eb.js";import{u as ie}from"./reference-00b1433c.js";import{c as J,a as te,d as Y,F as oe}from"./form-validator-dd91bd90.js";import{u as le}from"./masterData-f14240ef.js";import{L as qe}from"./LinkReference-3223c329.js";import{S as Fe}from"./index-4cada0d1.js";import{a as Ee,b as Te}from"./report.service-fa355f8a.js";const xe={key:0},Ue={class:"four-columns"},Ae={class:"mt-2"},Le={class:"mt-2"},Me=o("label",{class:"block text-900 mb-2"},"Data Factura",-1),Oe={class:"mt-2"},ze=o("label",{class:"block text-900 mb-2"},"Estat",-1),Ge={class:"mt-2"},Pe=o("label",{class:"block text-900 mb-2"},"Métode Pagament",-1),Qe={class:"four-columns"},je={class:"mt-1"},He=o("label",{class:"block text-900 mb-2"},"Base",-1),Ye={class:"summary-field"},Ke={class:"mt-1"},We=o("label",{class:"block text-900 mb-2"},"Impostos",-1),Je={class:"summary-field"},Xe={class:"mt-1"},Ze=o("label",{class:"block text-900 mb-2"},"Total",-1),et={class:"summary-field"},tt=x({__name:"FormSalesInvoice",props:{invoice:{}},emits:["submit","cancel"],setup(I,{emit:w}){Q();const r=le(),f=j();return J().shape({invoiceDate:te().required("La data és obligatoria"),paymentMethodId:te().required("El métode de pagament és obligatori")}),R({result:!1,errors:{}}),(d,u)=>{var c;const _=b("BaseInput"),D=b("Calendar"),v=b("Dropdown");return d.invoice?(h(),$("form",xe,[o("section",Ue,[o("div",Ae,[n(_,{modelValue:d.invoice.invoiceNumber,"onUpdate:modelValue":u[0]||(u[0]=e=>d.invoice.invoiceNumber=e),label:"Número",disabled:!0},null,8,["modelValue"])]),o("div",Le,[Me,n(D,{modelValue:d.invoice.invoiceDate,"onUpdate:modelValue":u[1]||(u[1]=e=>d.invoice.invoiceDate=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),o("div",Oe,[ze,n(v,{modelValue:d.invoice.statusId,"onUpdate:modelValue":u[2]||(u[2]=e=>d.invoice.statusId=e),editable:"",options:(c=m(f).lifecycle)==null?void 0:c.statuses,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),o("div",Ge,[Pe,n(v,{modelValue:d.invoice.paymentMethodId,"onUpdate:modelValue":u[3]||(u[3]=e=>d.invoice.paymentMethodId=e),editable:"",options:m(r).paymentMethods,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",Qe,[o("div",je,[He,o("span",Ye,S(m(L)(d.invoice.baseAmount)),1)]),o("div",Ke,[We,o("span",Je,S(m(L)(d.invoice.taxAmount)),1)]),o("div",Xe,[Ze,o("span",et,S(m(L)(d.invoice.netAmount)),1)])])])):V("",!0)}}}),at=["onClick"],it={class:"vertical-align-middle ml-2 font-bold line-height-3"},ot={key:0},lt={key:1},st=["onClick"],nt=x({__name:"TableInvoiceDetails",props:{details:{},deliveryNotes:{},canDelete:{type:Boolean}},emits:["delete","deleteDeliveryNote"],setup(I,{emit:w}){const r=I,f=pe(),d=j(),u=ae(),_=ie(),D=K(()=>{let l=[];if(!r.details)return l;const a=r.details.filter(i=>!i.deliveryNoteDetailId).map(i=>({deliveryNoteId:"",deliveryNoteNumber:"Sense albarà",deliveryNoteDate:"",...i}));a.length>0&&l.push(...a);const s=r.details.filter(i=>i.deliveryNoteDetailId).map(i=>{var q;const t=(q=r.deliveryNotes)==null?void 0:q.find(F=>{var E;return F.id===((E=i.deliveryNoteDetail)==null?void 0:E.deliveryNoteId)}),g=t&&t.deliveryDate?`Entregat ${O(t.deliveryDate)}`:"No entregat";if(_.references){const F=_.references.find(E=>{var z;return E.id===((z=i.deliveryNoteDetail)==null?void 0:z.referenceId)});F&&(i.reference=F)}return{deliveryNoteId:t==null?void 0:t.id,deliveryNoteNumber:`Albarà ${t?`${t.number} - ${g}`:"--"}`,deliveryNoteDate:t&&t.deliveryDate?` - ${O(t.deliveryDate)}`:"",...i}});return s.length>0&&l.push(...s),console.log(s,l),fe.orderBy(l,i=>[i.deliveryNoteNumber,i.description])});W(async()=>{await d.fetchOneByName("SalesInvoice")});const v=l=>{var s;const a=(s=u.taxes)==null?void 0:s.find(i=>i.id===l);if(a)return`${a.name}`},c=(l,a)=>{f.require({message:`Està segur que vol eliminar la línea ${a.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("delete",a)}})},e=(l,a)=>{if(!r.deliveryNotes)return;const s=r.deliveryNotes.find(i=>i.id===a.deliveryNoteId);s&&f.require({message:`Està segur que vol treure l'${a.deliveryNoteNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("deleteDeliveryNote",s)}})};return(l,a)=>{const s=b("Column"),i=b("DataTable");return h(),M(i,{class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"62vh",value:D.value,rowGroupMode:"subheader",groupRowsBy:"deliveryNoteNumber"},{header:y(()=>[ye(l.$slots,"header")]),groupheader:y(t=>[l.canDelete&&t.data.deliveryNoteNumber!=="Sense albarà"?(h(),$("i",{key:0,class:Z([m(T).TIMES,"grid_delete_column_button"]),onClick:g=>e(g,t.data)},null,10,at)):V("",!0),B("   "),o("span",it,S(t.data.deliveryNoteNumber),1)]),default:y(()=>[n(s,{header:"Albarà",field:"deliveryNoteNumber",style:{width:"5%"}}),n(s,{header:"",field:"",style:{width:"2%"}}),n(s,{header:"Quantitat",field:"quantity",style:{width:"10%"}}),n(s,{header:"Referència",field:"reference.code",style:{width:"15%"}},{body:y(t=>[t.data.deliveryNoteDetail?(h(),$("span",ot,[n(qe,{id:t.data.deliveryNoteDetail.referenceId},null,8,["id"])])):(h(),$("span",lt,"--"))]),_:1}),n(s,{header:"Descripció",field:"description",style:{width:"40%"}}),n(s,{header:"Preu unitat",style:{width:"10%"}},{body:y(t=>[B(S(m(L)(t.data.unitPrice)),1)]),_:1}),n(s,{header:"Impost",style:{width:"10%"}},{body:y(t=>[B(S(v(t.data.taxId)),1)]),_:1}),n(s,{header:"Total",field:"totalCost",style:{width:"10%"}},{body:y(t=>[B(S(m(L)(t.data.amount)),1)]),_:1}),n(s,{style:{width:"10%"}},{body:y(t=>[!t.data.deliveryNoteDetailId&&l.canDelete?(h(),$("i",{key:0,class:Z([m(T).TIMES,"grid_delete_column_button"]),onClick:g=>c(g,t.data)},null,10,st)):V("",!0)]),_:1})]),_:3},8,["value"])}}}),rt={key:0},ct={class:"two-columns-7525"},dt={class:"mt-2"},ut={class:"mt-2"},mt=o("label",{class:"block text-900 mb-2"},"Impost",-1),vt={class:"three-columns"},pt={class:"mt-2"},yt={class:"mt-2"},ft={class:"mt-2"},bt=x({__name:"FormSalesInvoiceDetail",props:{invoiceDetail:{}},emits:["submit","cancel"],setup(I,{emit:w}){const r=I,f=Q(),d=le(),u=()=>{const e=r.invoiceDetail;e.quantity&&e.quantity>0&&e.unitPrice&&(r.invoiceDetail.unitCost=e.unitPrice,r.invoiceDetail.amount=be.round(e.quantity*e.unitPrice,2),r.invoiceDetail.totalCost=r.invoiceDetail.amount)},_=J().shape({quantity:Y().min(1).required("La quantitat ha de ser superior a 1"),unitPrice:Y().required("El preu unitat és obligatori")}),D=R({result:!1,errors:{}}),v=()=>{const e=new oe(_);D.value=e.validate(r.invoiceDetail)},c=async()=>{if(v(),D.value.result)w("submit",r.invoiceDetail);else{let e="";Object.entries(D.value.errors).forEach(l=>{e+=`${l[1].map(a=>a)}.   `}),f.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,l)=>{const a=b("Dropdown"),s=b("Button");return e.invoiceDetail?(h(),$("form",rt,[o("section",ct,[o("div",dt,[n(A,{label:"Descripció",modelValue:e.invoiceDetail.description,"onUpdate:modelValue":l[0]||(l[0]=i=>e.invoiceDetail.description=i)},null,8,["modelValue"])]),o("div",ut,[mt,n(a,{modelValue:e.invoiceDetail.taxId,"onUpdate:modelValue":l[1]||(l[1]=i=>e.invoiceDetail.taxId=i),editable:"",options:m(d).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",vt,[o("div",pt,[n(A,{type:m(P).NUMERIC,label:"Quantitat",modelValue:e.invoiceDetail.quantity,"onUpdate:modelValue":[l[2]||(l[2]=i=>e.invoiceDetail.quantity=i),u]},null,8,["type","modelValue"])]),o("div",yt,[n(A,{type:m(P).CURRENCY,label:"Preu Unitat","model-value":e.invoiceDetail.unitPrice,"onUpdate:modelValue":[l[3]||(l[3]=i=>e.invoiceDetail.unitPrice=i),u]},null,8,["type","model-value"])]),o("div",ft,[n(A,{type:m(P).CURRENCY,label:"Total","model-value":e.invoiceDetail.amount,"onUpdate:modelValue":l[4]||(l[4]=i=>e.invoiceDetail.amount=i),disabled:""},null,8,["type","model-value"])])]),n(s,{label:"Crear",onClick:c,style:{float:"right"},size:"small",class:"mt-2"})])):V("",!0)}}}),_t={key:0},Dt={class:"mt-2"},ht=x({__name:"FormRectificativeInvoice",props:{rectificativeInvoice:{},maximumQuantity:{}},emits:["submit","cancel"],setup(I,{emit:w}){const r=I,f=Q(),d=J().shape({quantity:Y().min(1,"La quantitat ha de ser superior a 1").required("La quanitat és obligatoria")}),u=R({result:!1,errors:{}}),_=()=>{const v=new oe(d);u.value=v.validate(r.rectificativeInvoice)},D=async()=>{if(_(),u.value.result){if(r.rectificativeInvoice.quantity>r.maximumQuantity){f.add({severity:"warn",summary:"Formulari invàlid",detail:"La quanitat introduïda no pot ser superior a la quantitat de la factura",life:5e3});return}w("submit",r.rectificativeInvoice)}else{let v="";Object.entries(u.value.errors).forEach(c=>{v+=`${c[1].map(e=>e)}.   `}),f.add({severity:"warn",summary:"Formulari invàlid",detail:v,life:5e3})}};return(v,c)=>{const e=b("Button");return v.rectificativeInvoice?(h(),$("form",_t,[o("section",null,[o("div",Dt,[n(A,{label:"Import a facturar sense IVA",modelValue:v.rectificativeInvoice.quantity,"onUpdate:modelValue":c[0]||(c[0]=l=>v.rectificativeInvoice.quantity=l),decimals:2,type:m(P).CURRENCY},null,8,["modelValue","type"])])]),n(e,{label:"Crear",onClick:D,style:{float:"right"},size:"small",class:"mt-2"})])):V("",!0)}}}),It=I=>(_e("data-v-1516f95e"),I=I(),De(),I),Nt={class:"selector-filter"},wt={class:"selector-filter-field"},St=It(()=>o("label",{for:""},"Buscar",-1)),gt={class:"selector-filter-button"},Ct={class:"flex align-items-center gap-2"},$t=x({__name:"SelectorDeliveryNotes",props:{deliveryNotes:{},headerVisible:{type:Boolean}},emits:["selected"],setup(I,{emit:w}){const r=I;W(()=>{f.fetchOneByName("DeliveryNote")});const f=j(),d=R([]),u=R(""),_=K(()=>{var c=[];return r.deliveryNotes&&(c=r.deliveryNotes.filter(e=>e.number.toString().includes(u.value))),c}),D=c=>{var l;const e=(l=f.lifecycle)==null?void 0:l.statuses.find(a=>a.id===c);return e?e.name:""},v=()=>{d.value.length!==0&&w("selected",d.value)};return(c,e)=>{const l=b("InputText"),a=b("Button"),s=b("Column"),i=b("DataTable");return h(),M(i,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:_.value,selectionMode:"multiple",selection:d.value,"onUpdate:selection":e[1]||(e[1]=t=>d.value=t)},{header:y(()=>[o("header",Nt,[o("div",wt,[St,B("   "),n(l,{style:{width:"150px",height:"35px"},modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=t=>u.value=t),size:"small"},null,8,["modelValue"])]),o("div",gt,[n(a,{onClick:v,size:"small",icon:m(T).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:y(t=>[o("div",Ct,[o("b",null,"Albarà d'entrega "+S(t.data.salesOrderNumber)+" - "+S(m(O)(t.data.salesOrderDate)),1)])]),default:y(()=>[n(s,{header:"Número",field:"number",style:{width:"10%"}}),n(s,{header:"Estat",field:"status",style:{width:"10%"}},{body:y(t=>[B(S(D(t.data.statusId)),1)]),_:1}),n(s,{header:"Data Entrega",field:"deliveryDate",style:{width:"10%"}},{body:y(t=>[B(S(t.data.deliveryDate?m(O)(t.data.deliveryDate):""),1)]),_:1})]),_:1},8,["value","selection"])}}});const Vt=he($t,[["__scopeId","data-v-1516f95e"]]),kt={key:0},Bt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Rt=o("span",{class:"text-xl text-900 font-bold"},"Detall de la factura",-1),Pt=x({__name:"SalesInvoice",setup(I){const w=[{label:"Descarregar",icon:T.FILE_WORD,command:()=>E()},{label:"Rectificativa",icon:T.FILE_IMPORT,command:()=>ue()}],r=Ie(),f=Ne(),d=we(),u=Q(),_=ae(),D=Be(),v=j(),c=ke(),e=Re(),l=ie(),{invoice:a}=Se(c),s={Free:0,FromDeliveryNote:1,Rectificative:2},i=R(0),t=ee({visible:!1,title:"",closable:!0,position:"center",modal:!0}),g=R("");W(async()=>{g.value=r.params.id,_.taxes||await _.fetchAll(),D.customers||await D.fetchCustomers(),await l.fetchReferencesByModule("sales"),await v.fetchOneByName("SalesInvoice"),await c.GetById(g.value),await e.GetByInvoiceId(g.value),a.value&&(a.value.invoiceDate=O(a.value.invoiceDate)),d.setMenuItem({icon:T.WALLET,title:`Factura de venta ${a.value.invoiceNumber} - ${a.value.customerComercialName}`,backButtonVisible:!0})});const q=K(()=>a.value!==void 0&&a.value.parentSalesInvoiceId===null),F=async()=>{a.value&&(a.value.invoiceDate=Ve(a.value.invoiceDate),await c.Update(a.value)&&f.back())},E=async()=>{var N;const p=await Fe.SalesInvoice.GetReportDataById(a.value.id);if(p){const k=`Factura_${(N=a.value)==null?void 0:N.invoiceNumber}.docx`,G=await new Te().Download(p,Ee.Invoice,k);G?ge(k,G):u.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},z=async()=>{a.value&&(await e.GetToInvoice(a.value.customerId),i.value=s.FromDeliveryNote,t.title="Selector d'albarans d'entrega",t.visible=!0)},se=async p=>{for(let N=0;N<p.length;N++){const k=p[N];await c.AddDeliveryNote(a.value.id,k)}t.visible=!1,X()},ne=async p=>{await c.RemoveDeliveryNote(a.value.id,p),X()},X=async()=>{v.fetchOneByName("SalesInvoice"),await e.GetByInvoiceId(g.value)},C=ee({}),re=()=>{var p;if(i.value=s.Free,a.value){C.salesInvoiceId=a.value.id,C.quantity=1,C.description="",C.unitPrice=0,C.amount=0,C.totalCost=0;const N=(p=_.taxes)==null?void 0:p.find(k=>k.percentatge===21);N&&(C.taxId=N.id),t.title="Introducció de línea lliure",t.visible=!0}},ce=async()=>{await c.CreateInvoiceDetail(C),t.visible=!1},de=async p=>{await c.DeleteInvoiceDetail(p)},U=R(void 0),ue=()=>{U.value={id:a.value.id,quantity:0},t.visible=!0,t.title="Crear factura rectificativa",i.value=s.Rectificative},me=async()=>{if(U.value){const p=await c.CreateRectificative(U.value);p&&p.result&&p.content?(u.add({summary:"Factura rectificativa",detail:`Creada correctament amb el número ${p.content.invoiceNumber}`,severity:"success",life:1e4}),f.back()):u.add({summary:"Factura rectificativa",detail:"Error en la creació de la factura",severity:"error",life:1e4})}};return(p,N)=>{const k=b("SplitButton"),H=b("Button"),G=b("Dialog");return h(),$($e,null,[n(k,{label:"Guardar",onClick:F,model:w,size:"small",class:"grid_add_row_button"}),m(a)?(h(),$("main",kt,[n(tt,{class:"mt-3 mr-3",invoice:m(a)},null,8,["invoice"]),n(nt,{class:"mt-3",canDelete:q.value,details:m(a).salesInvoiceDetails,deliveryNotes:m(e).deliveryNotes,onDeleteDeliveryNote:ne,onDelete:de},{header:y(()=>[o("div",Bt,[Rt,o("div",null,[n(H,{size:"small",label:"Afegir albarà",onClick:z,disabled:!q.value},null,8,["disabled"]),B("    "),n(H,{size:"small",label:"Afegir linia lliure",onClick:re,disabled:!q.value},null,8,["disabled"])])])]),_:1},8,["canDelete","details","deliveryNotes"])])):V("",!0),n(G,{visible:t.visible,"onUpdate:visible":N[0]||(N[0]=ve=>t.visible=ve),header:t.title,closable:t.closable,modal:t.modal,style:Ce({width:i.value===s.Rectificative?"20vw":i.value===s.Free?"50vw":"60vw"}),maximizable:i.value===s.FromDeliveryNote},{default:y(()=>[i.value===s.Free?(h(),M(bt,{key:0,invoiceDetail:C,onSubmit:ce},null,8,["invoiceDetail"])):V("",!0),i.value===s.FromDeliveryNote?(h(),M(Vt,{key:1,headerVisible:!0,deliveryNotes:m(e).invoiceableDeliveryNotes,onSelected:se},{header:y(()=>[]),_:1},8,["deliveryNotes"])):V("",!0),m(a)&&i.value===s.Rectificative&&U.value?(h(),M(ht,{key:2,"rectificative-invoice":U.value,"maximum-quantity":m(a).baseAmount,onSubmit:me},null,8,["rectificative-invoice","maximum-quantity"])):V("",!0)]),_:1},8,["visible","header","closable","modal","style","maximizable"])],64)}}});export{Pt as default};
