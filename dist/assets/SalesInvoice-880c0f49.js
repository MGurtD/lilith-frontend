import{d as T,j as Q,r as R,h as b,c as C,e as o,i as n,k as m,H as g,l as $,a as _,R as A,x as ve,T as W,o as J,m as L,w as y,Q as pe,n as Z,P as E,G as B,I as M,ad as ye,z as U,s as P,a0 as fe,p as be,b as _e,f as De,v as he,g as Ie,u as Ne,C as we,K as ee,X as Se,ai as ge,L as Ce,D as $e}from"./index-77e4d88f.js";import{u as Ve}from"./invoice-09426dba.js";import{u as ke}from"./customers-5603f6e7.js";import{u as j}from"./masterData-12cde164.js";import{u as H}from"./lifecycle-7ace1220.js";import{c as X,a as te,d as Y,F as ae}from"./form-validator-7d52d458.js";import{L as Be}from"./LinkReference-e33c2ce4.js";import{u as ie}from"./reference-62579076.js";import{u as Re}from"./deliveryNote-5edfb0c1.js";import{S as qe}from"./index-c5381636.js";import{a as Fe,b as Ee}from"./report.service-a471bae1.js";const Te={key:0},xe={class:"four-columns"},Ue={class:"mt-2"},Ae={class:"mt-2"},Le=o("label",{class:"block text-900 mb-2"},"Data Factura",-1),Me={class:"mt-2"},ze=o("label",{class:"block text-900 mb-2"},"Estat",-1),Oe={class:"mt-2"},Ge=o("label",{class:"block text-900 mb-2"},"Métode Pagament",-1),Pe={class:"four-columns"},Qe={class:"mt-1"},je=o("label",{class:"block text-900 mb-2"},"Base",-1),He={class:"summary-field"},Ke={class:"mt-1"},Ye=o("label",{class:"block text-900 mb-2"},"Impostos",-1),We={class:"summary-field"},Je={class:"mt-1"},Xe=o("label",{class:"block text-900 mb-2"},"Total",-1),Ze={class:"summary-field"},et=T({__name:"FormSalesInvoice",props:{invoice:{}},emits:["submit","cancel"],setup(D,{emit:w}){Q();const r=j(),f=H();return X().shape({invoiceDate:te().required("La data és obligatoria"),paymentMethodId:te().required("El métode de pagament és obligatori")}),R({result:!1,errors:{}}),(d,u)=>{var c;const h=b("BaseInput"),I=b("Calendar"),v=b("Dropdown");return d.invoice?(_(),C("form",Te,[o("section",xe,[o("div",Ue,[n(h,{modelValue:d.invoice.invoiceNumber,"onUpdate:modelValue":u[0]||(u[0]=e=>d.invoice.invoiceNumber=e),label:"Número",disabled:!0},null,8,["modelValue"])]),o("div",Ae,[Le,n(I,{modelValue:d.invoice.invoiceDate,"onUpdate:modelValue":u[1]||(u[1]=e=>d.invoice.invoiceDate=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),o("div",Me,[ze,n(v,{modelValue:d.invoice.statusId,"onUpdate:modelValue":u[2]||(u[2]=e=>d.invoice.statusId=e),editable:"",options:(c=m(f).lifecycle)==null?void 0:c.statuses,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),o("div",Oe,[Ge,n(v,{modelValue:d.invoice.paymentMethodId,"onUpdate:modelValue":u[3]||(u[3]=e=>d.invoice.paymentMethodId=e),editable:"",options:m(r).paymentMethods,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",Pe,[o("div",Qe,[je,o("span",He,g(m(A)(d.invoice.baseAmount)),1)]),o("div",Ke,[Ye,o("span",We,g(m(A)(d.invoice.taxAmount)),1)]),o("div",Je,[Xe,o("span",Ze,g(m(A)(d.invoice.netAmount)),1)])])])):$("",!0)}}}),tt=["onClick"],at={class:"vertical-align-middle ml-2 font-bold line-height-3"},it={key:0},ot={key:1},lt=["onClick"],st=T({__name:"TableInvoiceDetails",props:{details:{},deliveryNotes:{},canDelete:{type:Boolean}},emits:["delete","deleteDeliveryNote"],setup(D,{emit:w}){const r=D,f=ve(),d=H(),u=j(),h=ie(),I=W(()=>{let l=[];if(!r.details)return l;const a=r.details.filter(i=>!i.deliveryNoteDetailId).map(i=>({deliveryNoteId:"",deliveryNoteNumber:"Sense albarà",deliveryNoteDate:"",...i}));a.length>0&&l.push(...a);const s=r.details.filter(i=>i.deliveryNoteDetailId).map(i=>{var z;const t=(z=r.deliveryNotes)==null?void 0:z.find(V=>{var F;return V.id===((F=i.deliveryNoteDetail)==null?void 0:F.deliveryNoteId)}),S=t&&t.deliveryDate?`Entregat ${M(t.deliveryDate)}`:"No entregat";if(h.references){const V=h.references.find(F=>{var O;return F.id===((O=i.deliveryNoteDetail)==null?void 0:O.referenceId)});V&&(i.reference=V)}return{deliveryNoteId:t==null?void 0:t.id,deliveryNoteNumber:`Albarà ${t?`${t.number} - ${S}`:"--"}`,deliveryNoteDate:t&&t.deliveryDate?` - ${M(t.deliveryDate)}`:"",...i}});return s.length>0&&l.push(...s),console.log(s,l),ye.orderBy(l,i=>[i.deliveryNoteNumber,i.description])});J(async()=>{await d.fetchOneByName("SalesInvoice")});const v=l=>{var s;const a=(s=u.taxes)==null?void 0:s.find(i=>i.id===l);if(a)return`${a.name}`},c=(l,a)=>{f.require({message:`Està segur que vol eliminar la línea ${a.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("delete",a)}})},e=(l,a)=>{if(!r.deliveryNotes)return;const s=r.deliveryNotes.find(i=>i.id===a.deliveryNoteId);s&&f.require({message:`Està segur que vol treure l'${a.deliveryNoteNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{w("deleteDeliveryNote",s)}})};return(l,a)=>{const s=b("Column"),i=b("DataTable");return _(),L(i,{class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"62vh",value:I.value,rowGroupMode:"subheader",groupRowsBy:"deliveryNoteNumber"},{header:y(()=>[pe(l.$slots,"header")]),groupheader:y(t=>[l.canDelete&&t.data.deliveryNoteNumber!=="Sense albarà"?(_(),C("i",{key:0,class:Z([m(E).TIMES,"grid_delete_column_button"]),onClick:S=>e(S,t.data)},null,10,tt)):$("",!0),B("   "),o("span",at,g(t.data.deliveryNoteNumber),1)]),default:y(()=>[n(s,{header:"Albarà",field:"deliveryNoteNumber",style:{width:"5%"}}),n(s,{header:"",field:"",style:{width:"2%"}}),n(s,{header:"Quantitat",field:"quantity",style:{width:"10%"}}),n(s,{header:"Referència",field:"reference.code",style:{width:"15%"}},{body:y(t=>[t.data.deliveryNoteDetail?(_(),C("span",it,[n(Be,{id:t.data.deliveryNoteDetail.referenceId},null,8,["id"])])):(_(),C("span",ot,"--"))]),_:1}),n(s,{header:"Descripció",field:"description",style:{width:"40%"}}),n(s,{header:"Preu unitat",style:{width:"10%"}},{body:y(t=>[B(g(m(A)(t.data.unitPrice)),1)]),_:1}),n(s,{header:"Impost",style:{width:"10%"}},{body:y(t=>[B(g(v(t.data.taxId)),1)]),_:1}),n(s,{header:"Total",field:"totalCost",style:{width:"10%"}},{body:y(t=>[B(g(m(A)(t.data.amount)),1)]),_:1}),n(s,{style:{width:"10%"}},{body:y(t=>[!t.data.deliveryNoteDetailId&&l.canDelete?(_(),C("i",{key:0,class:Z([m(E).TIMES,"grid_delete_column_button"]),onClick:S=>c(S,t.data)},null,10,lt)):$("",!0)]),_:1})]),_:3},8,["value"])}}}),nt={key:0},rt={class:"two-columns-7525"},ct={class:"mt-2"},dt={class:"mt-2"},ut=o("label",{class:"block text-900 mb-2"},"Impost",-1),mt={class:"three-columns"},vt={class:"mt-2"},pt={class:"mt-2"},yt={class:"mt-2"},ft=T({__name:"FormSalesInvoiceDetail",props:{invoiceDetail:{}},emits:["submit","cancel"],setup(D,{emit:w}){const r=D,f=Q(),d=j(),u=()=>{const e=r.invoiceDetail;e.quantity&&e.quantity>0&&e.unitPrice&&e.unitPrice>0&&(r.invoiceDetail.unitCost=e.unitPrice,r.invoiceDetail.amount=fe.round(e.quantity*e.unitPrice,2),r.invoiceDetail.totalCost=r.invoiceDetail.amount)},h=X().shape({quantity:Y().min(1).required("La quantitat ha de ser superior a 1"),unitPrice:Y().min(.01).required("El preu unitat és obligatori")}),I=R({result:!1,errors:{}}),v=()=>{const e=new ae(h);I.value=e.validate(r.invoiceDetail)},c=async()=>{if(v(),I.value.result)w("submit",r.invoiceDetail);else{let e="";Object.entries(I.value.errors).forEach(l=>{e+=`${l[1].map(a=>a)}.   `}),f.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,l)=>{const a=b("Dropdown"),s=b("Button");return e.invoiceDetail?(_(),C("form",nt,[o("section",rt,[o("div",ct,[n(U,{label:"Descripció",modelValue:e.invoiceDetail.description,"onUpdate:modelValue":l[0]||(l[0]=i=>e.invoiceDetail.description=i)},null,8,["modelValue"])]),o("div",dt,[ut,n(a,{modelValue:e.invoiceDetail.taxId,"onUpdate:modelValue":l[1]||(l[1]=i=>e.invoiceDetail.taxId=i),editable:"",options:m(d).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),o("section",mt,[o("div",vt,[n(U,{type:m(P).NUMERIC,label:"Quantitat",modelValue:e.invoiceDetail.quantity,"onUpdate:modelValue":[l[2]||(l[2]=i=>e.invoiceDetail.quantity=i),u]},null,8,["type","modelValue"])]),o("div",pt,[n(U,{type:m(P).CURRENCY,label:"Preu Unitat","model-value":e.invoiceDetail.unitPrice,"onUpdate:modelValue":[l[3]||(l[3]=i=>e.invoiceDetail.unitPrice=i),u]},null,8,["type","model-value"])]),o("div",yt,[n(U,{type:m(P).CURRENCY,label:"Total","model-value":e.invoiceDetail.amount,"onUpdate:modelValue":l[4]||(l[4]=i=>e.invoiceDetail.amount=i),disabled:""},null,8,["type","model-value"])])]),n(s,{label:"Crear",onClick:c,style:{float:"right"},size:"small",class:"mt-2"})])):$("",!0)}}}),bt={key:0},_t={class:"mt-2"},Dt=T({__name:"FormRectificativeInvoice",props:{rectificativeInvoice:{},maximumQuantity:{}},emits:["submit","cancel"],setup(D,{emit:w}){const r=D,f=Q(),d=X().shape({quantity:Y().min(1,"La quantitat ha de ser superior a 1").required("La quanitat és obligatoria")}),u=R({result:!1,errors:{}}),h=()=>{const v=new ae(d);u.value=v.validate(r.rectificativeInvoice)},I=async()=>{if(h(),u.value.result){if(r.rectificativeInvoice.quantity>r.maximumQuantity){f.add({severity:"warn",summary:"Formulari invàlid",detail:"La quanitat introduïda no pot ser superior a la quantitat de la factura",life:5e3});return}w("submit",r.rectificativeInvoice)}else{let v="";Object.entries(u.value.errors).forEach(c=>{v+=`${c[1].map(e=>e)}.   `}),f.add({severity:"warn",summary:"Formulari invàlid",detail:v,life:5e3})}};return(v,c)=>{const e=b("Button");return v.rectificativeInvoice?(_(),C("form",bt,[o("section",null,[o("div",_t,[n(U,{label:"Import a facturar sense IVA",modelValue:v.rectificativeInvoice.quantity,"onUpdate:modelValue":c[0]||(c[0]=l=>v.rectificativeInvoice.quantity=l),decimals:2,type:m(P).CURRENCY},null,8,["modelValue","type"])])]),n(e,{label:"Crear",onClick:I,style:{float:"right"},size:"small",class:"mt-2"})])):$("",!0)}}}),ht=D=>(be("data-v-1516f95e"),D=D(),_e(),D),It={class:"selector-filter"},Nt={class:"selector-filter-field"},wt=ht(()=>o("label",{for:""},"Buscar",-1)),St={class:"selector-filter-button"},gt={class:"flex align-items-center gap-2"},Ct=T({__name:"SelectorDeliveryNotes",props:{deliveryNotes:{},headerVisible:{type:Boolean}},emits:["selected"],setup(D,{emit:w}){const r=D;J(()=>{f.fetchOneByName("DeliveryNote")});const f=H(),d=R([]),u=R(""),h=W(()=>{var c=[];return r.deliveryNotes&&(c=r.deliveryNotes.filter(e=>e.number.toString().includes(u.value))),c}),I=c=>{var l;const e=(l=f.lifecycle)==null?void 0:l.statuses.find(a=>a.id===c);return e?e.name:""},v=()=>{d.value.length!==0&&w("selected",d.value)};return(c,e)=>{const l=b("InputText"),a=b("Button"),s=b("Column"),i=b("DataTable");return _(),L(i,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:h.value,selectionMode:"multiple",selection:d.value,"onUpdate:selection":e[1]||(e[1]=t=>d.value=t)},{header:y(()=>[o("header",It,[o("div",Nt,[wt,B("   "),n(l,{style:{width:"150px",height:"35px"},modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=t=>u.value=t),size:"small"},null,8,["modelValue"])]),o("div",St,[n(a,{onClick:v,size:"small",icon:m(E).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:y(t=>[o("div",gt,[o("b",null,"Albarà d'entrega "+g(t.data.salesOrderNumber)+" - "+g(m(M)(t.data.salesOrderDate)),1)])]),default:y(()=>[n(s,{header:"Número",field:"number",style:{width:"10%"}}),n(s,{header:"Estat",field:"status",style:{width:"10%"}},{body:y(t=>[B(g(I(t.data.statusId)),1)]),_:1}),n(s,{header:"Data Entrega",field:"deliveryDate",style:{width:"10%"}},{body:y(t=>[B(g(t.data.deliveryDate?m(M)(t.data.deliveryDate):""),1)]),_:1})]),_:1},8,["value","selection"])}}});const $t=De(Ct,[["__scopeId","data-v-1516f95e"]]),Vt={key:0},kt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Bt=o("span",{class:"text-xl text-900 font-bold"},"Detall de la factura",-1),Ot=T({__name:"SalesInvoice",setup(D){const w=[{label:"Descarregar",icon:E.FILE_WORD,command:()=>O()},{label:"Rectificativa",icon:E.FILE_IMPORT,command:()=>de()}],r=he(),f=Ie(),d=Ne(),u=Q(),h=j(),I=ke(),v=H(),c=Ve(),e=Re(),l=ie(),{invoice:a}=we(c),s={Free:0,FromDeliveryNote:1,Rectificative:2},i=R(0),t=ee({visible:!1,title:"",closable:!0,position:"center",modal:!0}),S=R("");J(async()=>{S.value=r.params.id,h.fetchMasterData(),I.fetchCustomers(),await l.fetchReferencesByModule("sales"),await z(),d.setMenuItem({icon:E.WALLET,title:`Factura de venta ${a.value.invoiceNumber} - ${a.value.customerComercialName}`,backButtonVisible:!0})});const z=async()=>{v.fetchOneByName("SalesInvoice"),await c.GetById(S.value),await e.GetByInvoiceId(S.value),a.value&&(a.value.invoiceDate=M(a.value.invoiceDate))},V=W(()=>a.value!==void 0&&a.value.parentSalesInvoiceId===null),F=async()=>{a.value&&(a.value.invoiceDate=$e(a.value.invoiceDate),await c.Update(a.value)&&f.back())},O=async()=>{var N;const p=await qe.SalesInvoice.GetReportDataById(a.value.id);if(p){const k=`Factura_${(N=a.value)==null?void 0:N.invoiceNumber}.docx`,G=await new Ee().Download(p,Fe.Invoice,k);G?Se(k,G):u.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},oe=async()=>{a.value&&(await e.GetToInvoice(a.value.customerId),i.value=s.FromDeliveryNote,t.title="Selector d'albarans d'entrega",t.visible=!0)},le=async p=>{for(let N=0;N<p.length;N++){const k=p[N];await c.AddDeliveryNote(a.value.id,k)}t.visible=!1,await e.GetByInvoiceId(S.value)},se=async p=>{await c.RemoveDeliveryNote(a.value.id,p),await e.GetByInvoiceId(S.value)},q=ee({}),ne=()=>{var p;if(i.value=s.Free,a.value){q.salesInvoiceId=a.value.id,q.quantity=1,q.description="",q.totalCost=0;const N=(p=h.taxes)==null?void 0:p.find(k=>k.percentatge===21);N&&(q.taxId=N.id),t.title="Introducció de línea lliure",t.visible=!0}},re=async()=>{await c.CreateInvoiceDetail(q),t.visible=!1},ce=async p=>{await c.DeleteInvoiceDetail(p)},x=R(void 0),de=()=>{x.value={id:a.value.id,quantity:0},t.visible=!0,t.title="Crear factura rectificativa",i.value=s.Rectificative},ue=async()=>{if(x.value){const p=await c.CreateRectificative(x.value);p&&p.result&&p.content?(u.add({summary:"Factura rectificativa",detail:`Creada correctament amb el número ${p.content.invoiceNumber}`,severity:"success",life:1e4}),f.back()):u.add({summary:"Factura rectificativa",detail:"Error en la creació de la factura",severity:"error",life:1e4})}};return(p,N)=>{const k=b("SplitButton"),K=b("Button"),G=b("Dialog");return _(),C(Ce,null,[n(k,{label:"Guardar",onClick:F,model:w,size:"small",class:"grid_add_row_button"}),m(a)?(_(),C("main",Vt,[n(et,{class:"mt-3 mr-3",invoice:m(a)},null,8,["invoice"]),n(st,{class:"mt-3",canDelete:V.value,details:m(a).salesInvoiceDetails,deliveryNotes:m(e).deliveryNotes,onDeleteDeliveryNote:se,onDelete:ce},{header:y(()=>[o("div",kt,[Bt,o("div",null,[n(K,{size:"small",label:"Afegir albarà",onClick:oe,disabled:!V.value},null,8,["disabled"]),B("    "),n(K,{size:"small",label:"Afegir linia lliure",onClick:ne,disabled:!V.value},null,8,["disabled"])])])]),_:1},8,["canDelete","details","deliveryNotes"])])):$("",!0),n(G,{visible:t.visible,"onUpdate:visible":N[0]||(N[0]=me=>t.visible=me),header:t.title,closable:t.closable,modal:t.modal,style:ge({width:i.value===s.Rectificative?"20vw":i.value===s.Free?"50vw":"60vw"}),maximizable:i.value===s.FromDeliveryNote},{default:y(()=>[i.value===s.Free?(_(),L(ft,{key:0,invoiceDetail:q,onSubmit:re},null,8,["invoiceDetail"])):$("",!0),i.value===s.FromDeliveryNote?(_(),L($t,{key:1,headerVisible:!0,deliveryNotes:m(e).invoiceableDeliveryNotes,onSelected:le},{header:y(()=>[]),_:1},8,["deliveryNotes"])):$("",!0),m(a)&&i.value===s.Rectificative&&x.value?(_(),L(Dt,{key:2,"rectificative-invoice":x.value,"maximum-quantity":m(a).baseAmount,onSubmit:ue},null,8,["rectificative-invoice","maximum-quantity"])):$("",!0)]),_:1},8,["visible","header","closable","modal","style","maximizable"])],64)}}});export{Ot as default};