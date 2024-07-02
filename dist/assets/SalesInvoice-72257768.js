import{d as x,j as P,r as T,h as y,c as C,e as a,i as l,k as u,D as N,l as k,a as f,x as re,K as W,o as j,m as M,w as v,J as ce,C as V,n as H,P as F,y as A,s as G,p as de,b as ue,f as me,v as ve,g as pe,u as ye,z as _e,E as K,X as fe,G as be}from"./index-8f350042.js";import{u as De}from"./invoice-960d25dc.js";import{u as he}from"./customers-df5c0a64.js";import{u as z}from"./masterData-febae284.js";import{u as L}from"./lifecycle-22cc0d3c.js";import{d as E,f as q,_ as Ne,l as Ie,b as we,c as Se}from"./functions-2e154ea4.js";import{c as Y,a as Q,d as J,F as ge}from"./form-validator-f8953ae6.js";import{L as Ce}from"./LinkReference-190183a1.js";import{u as X}from"./reference-a84866df.js";import{u as Ve}from"./deliveryNote-77ccb535.js";import{S as $e}from"./index-c26d6ff2.js";import{a as ke,b as Be}from"./report.service-e9562af0.js";import"./base.service-642755fa.js";import"./index-9bb1cbdb.js";import"./reference.service-7e50bcf5.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-80538e05.js";import"./file.service-2d005604.js";const Te={key:0},Re={class:"four-columns"},Ee={class:"mt-2"},Fe={class:"mt-2"},qe=a("label",{class:"block text-900 mb-2"},"Data Factura",-1),xe={class:"mt-2"},Ue=a("label",{class:"block text-900 mb-2"},"Estat",-1),Ae={class:"mt-2"},Me=a("label",{class:"block text-900 mb-2"},"Métode Pagament",-1),ze={class:"four-columns"},Le={class:"mt-1"},Oe=a("label",{class:"block text-900 mb-2"},"Base",-1),Ge={class:"summary-field"},Pe={class:"mt-1"},je=a("label",{class:"block text-900 mb-2"},"Impostos",-1),He={class:"summary-field"},Ke={class:"mt-1"},Qe=a("label",{class:"block text-900 mb-2"},"Total",-1),Je={class:"summary-field"},We=x({__name:"FormSalesInvoice",props:{invoice:{}},emits:["submit","cancel"],setup(b,{emit:S}){P();const d=z(),D=L();return Y().shape({invoiceDate:Q().required("La data és obligatoria"),paymentMethodId:Q().required("El métode de pagament és obligatori")}),T({result:!1,errors:{}}),(r,m)=>{var c;const I=y("BaseInput"),h=y("Calendar"),w=y("Dropdown");return r.invoice?(f(),C("form",Te,[a("section",Re,[a("div",Ee,[l(I,{modelValue:r.invoice.invoiceNumber,"onUpdate:modelValue":m[0]||(m[0]=e=>r.invoice.invoiceNumber=e),label:"Número",disabled:!0},null,8,["modelValue"])]),a("div",Fe,[qe,l(h,{modelValue:r.invoice.invoiceDate,"onUpdate:modelValue":m[1]||(m[1]=e=>r.invoice.invoiceDate=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),a("div",xe,[Ue,l(w,{modelValue:r.invoice.statusId,"onUpdate:modelValue":m[2]||(m[2]=e=>r.invoice.statusId=e),editable:"",options:(c=u(D).lifecycle)==null?void 0:c.statuses,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])]),a("div",Ae,[Me,l(w,{modelValue:r.invoice.paymentMethodId,"onUpdate:modelValue":m[3]||(m[3]=e=>r.invoice.paymentMethodId=e),editable:"",options:u(d).paymentMethods,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),a("section",ze,[a("div",Le,[Oe,a("span",Ge,N(u(E)(r.invoice.baseAmount)),1)]),a("div",Pe,[je,a("span",He,N(u(E)(r.invoice.taxAmount)),1)]),a("div",Ke,[Qe,a("span",Je,N(u(E)(r.invoice.netAmount)),1)])])])):k("",!0)}}}),Ye={class:"vertical-align-middle ml-2 font-bold line-height-3"},Xe=["onClick"],Ze={key:0},et={key:1},tt=["onClick"],ot=x({__name:"TableInvoiceDetails",props:{details:{},deliveryNotes:{},canDelete:{type:Boolean}},emits:["delete","deleteDeliveryNote"],setup(b,{emit:S}){const d=b,D=re(),r=L(),m=z();X();const I=W(()=>{let e=[];if(!d.details)return e;const i=d.details.filter(n=>!n.deliveryNoteDetailId).map(n=>({deliveryNoteId:"",deliveryNoteNumber:"Sense albarà",deliveryNoteDate:"",...n}));i.length>0&&e.push(...i);const t=d.details.filter(n=>n.deliveryNoteDetailId).map(n=>{var s;const o=(s=d.deliveryNotes)==null?void 0:s.find(R=>{var B;return R.id===((B=n.deliveryNoteDetail)==null?void 0:B.deliveryNoteId)});return{deliveryNoteId:o==null?void 0:o.id,deliveryNoteNumber:`Albarà ${o?o.number:"--"}`,deliveryNoteDate:o&&o.deliveryDate?` - ${q(o.deliveryDate)}`:"",...n}});return t.length>0&&e.push(...t),console.log(t,e),Ne.orderBy(e,n=>n.deliveryNoteNumber)});j(async()=>{await r.fetchOneByName("SalesInvoice")});const h=e=>{var t;const i=(t=m.taxes)==null?void 0:t.find(n=>n.id===e);if(i)return`${i.percentatge} %`},w=(e,i)=>{D.require({message:`Està segur que vol eliminar la línea ${i.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{S("delete",i)}})},c=(e,i)=>{if(!d.deliveryNotes)return;const t=d.deliveryNotes.find(n=>n.id===i.deliveryNoteId);t&&D.require({message:`Està segur que vol treure l'${i.deliveryNoteNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{S("deleteDeliveryNote",t)}})};return(e,i)=>{const t=y("Column"),n=y("DataTable");return f(),M(n,{class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"62vh",sortMode:"multiple",value:I.value,rowGroupMode:"subheader",groupRowsBy:"deliveryNoteNumber"},{header:v(()=>[ce(e.$slots,"header")]),groupheader:v(o=>[a("span",Ye,N(o.data.deliveryNoteNumber),1),V("   "),e.canDelete&&o.data.deliveryNoteNumber!=="Sense albarà"?(f(),C("i",{key:0,class:H([u(F).TIMES,"grid_delete_column_button"]),onClick:s=>c(s,o.data)},null,10,Xe)):k("",!0)]),default:v(()=>[l(t,{header:"Albarà",field:"deliveryNoteNumber",style:{width:"5%"}}),l(t,{header:"",field:"",style:{width:"5%"}}),l(t,{header:"Quantitat",field:"quantity",style:{width:"10%"}}),l(t,{header:"Referència",style:{width:"10%"}},{body:v(o=>[o.data.deliveryNoteDetail?(f(),C("span",Ze,[l(Ce,{id:o.data.deliveryNoteDetail.referenceId},null,8,["id"])])):(f(),C("span",et,"--"))]),_:1}),l(t,{header:"Descripció",field:"description",style:{width:"40%"}}),l(t,{header:"Preu unitat",field:"unitCost",style:{width:"10%"}},{body:v(o=>[V(N(u(E)(o.data.unitCost)),1)]),_:1}),l(t,{header:"IVA",style:{width:"10%"}},{body:v(o=>[V(N(h(o.data.taxId)),1)]),_:1}),l(t,{header:"Total",field:"totalCost",style:{width:"10%"}},{body:v(o=>[V(N(u(E)(o.data.amount)),1)]),_:1}),l(t,{style:{width:"10%"}},{body:v(o=>[o.data.deliveryNoteDetailId?k("",!0):(f(),C("i",{key:0,class:H([u(F).TIMES,"grid_delete_column_button"]),onClick:s=>w(s,o.data)},null,10,tt))]),_:1})]),_:3},8,["value"])}}}),at={key:0},it={class:"two-columns-7525"},lt={class:"mt-2"},st={class:"mt-2"},nt=a("label",{class:"block text-900 mb-2"},"Impost",-1),rt={class:"three-columns"},ct={class:"mt-2"},dt={class:"mt-2"},ut={class:"mt-2"},mt=x({__name:"FormSalesInvoiceDetail",props:{invoiceDetail:{}},emits:["submit","cancel"],setup(b,{emit:S}){const d=b,D=P(),r=z(),m=()=>{const e=d.invoiceDetail;e.quantity&&e.quantity>0&&e.unitPrice&&e.unitPrice>0&&(d.invoiceDetail.unitCost=e.unitPrice,d.invoiceDetail.amount=Ie.round(e.quantity*e.unitPrice,2),d.invoiceDetail.totalCost=d.invoiceDetail.amount)},I=Y().shape({quantity:J().min(1).required("La quantitat ha de ser superior a 1"),unitPrice:J().min(.01).required("El preu unitat és obligatori")}),h=T({result:!1,errors:{}}),w=()=>{const e=new ge(I);h.value=e.validate(d.invoiceDetail)},c=async()=>{if(w(),h.value.result)S("submit",d.invoiceDetail);else{let e="";Object.entries(h.value.errors).forEach(i=>{e+=`${i[1].map(t=>t)}.   `}),D.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,i)=>{const t=y("Dropdown"),n=y("Button");return e.invoiceDetail?(f(),C("form",at,[a("section",it,[a("div",lt,[l(A,{label:"Descripció",modelValue:e.invoiceDetail.description,"onUpdate:modelValue":i[0]||(i[0]=o=>e.invoiceDetail.description=o)},null,8,["modelValue"])]),a("div",st,[nt,l(t,{modelValue:e.invoiceDetail.taxId,"onUpdate:modelValue":i[1]||(i[1]=o=>e.invoiceDetail.taxId=o),editable:"",options:u(r).taxes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),a("section",rt,[a("div",ct,[l(A,{type:u(G).NUMERIC,label:"Quantitat",modelValue:e.invoiceDetail.quantity,"onUpdate:modelValue":[i[2]||(i[2]=o=>e.invoiceDetail.quantity=o),m]},null,8,["type","modelValue"])]),a("div",dt,[l(A,{type:u(G).CURRENCY,label:"Preu Unitat","model-value":e.invoiceDetail.unitPrice,"onUpdate:modelValue":[i[3]||(i[3]=o=>e.invoiceDetail.unitPrice=o),m]},null,8,["type","model-value"])]),a("div",ut,[l(A,{type:u(G).CURRENCY,label:"Total","model-value":e.invoiceDetail.amount,"onUpdate:modelValue":i[4]||(i[4]=o=>e.invoiceDetail.amount=o),disabled:""},null,8,["type","model-value"])])]),l(n,{label:"Crear",onClick:c,style:{float:"right"},size:"small",class:"mt-2"})])):k("",!0)}}}),vt=b=>(de("data-v-1516f95e"),b=b(),ue(),b),pt={class:"selector-filter"},yt={class:"selector-filter-field"},_t=vt(()=>a("label",{for:""},"Buscar",-1)),ft={class:"selector-filter-button"},bt={class:"flex align-items-center gap-2"},Dt=x({__name:"SelectorDeliveryNotes",props:{deliveryNotes:{},headerVisible:{type:Boolean}},emits:["selected"],setup(b,{emit:S}){const d=b;j(()=>{D.fetchOneByName("DeliveryNote")});const D=L(),r=T([]),m=T(""),I=W(()=>{var c=[];return d.deliveryNotes&&(c=d.deliveryNotes.filter(e=>e.number.toString().includes(m.value))),c}),h=c=>{var i;const e=(i=D.lifecycle)==null?void 0:i.statuses.find(t=>t.id===c);return e?e.name:""},w=()=>{r.value.length!==0&&S("selected",r.value)};return(c,e)=>{const i=y("InputText"),t=y("Button"),n=y("Column"),o=y("DataTable");return f(),M(o,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:I.value,selectionMode:"multiple",selection:r.value,"onUpdate:selection":e[1]||(e[1]=s=>r.value=s)},{header:v(()=>[a("header",pt,[a("div",yt,[_t,V("   "),l(i,{style:{width:"150px",height:"35px"},modelValue:m.value,"onUpdate:modelValue":e[0]||(e[0]=s=>m.value=s),size:"small"},null,8,["modelValue"])]),a("div",ft,[l(t,{onClick:w,size:"small",icon:u(F).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:v(s=>[a("div",bt,[a("b",null,"Albarà d'entrega "+N(s.data.salesOrderNumber)+" - "+N(u(q)(s.data.salesOrderDate)),1)])]),default:v(()=>[l(n,{header:"Número",field:"number",style:{width:"10%"}}),l(n,{header:"Estat",field:"status",style:{width:"10%"}},{body:v(s=>[V(N(h(s.data.statusId)),1)]),_:1}),l(n,{header:"Data Entrega",field:"deliveryDate",style:{width:"10%"}},{body:v(s=>[V(N(s.data.deliveryDate?u(q)(s.data.deliveryDate):""),1)]),_:1})]),_:1},8,["value","selection"])}}});const ht=me(Dt,[["__scopeId","data-v-1516f95e"]]),Nt={key:0},It={class:"flex flex-wrap align-items-center justify-content-between gap-2"},wt=a("span",{class:"text-xl text-900 font-bold"},"Detall de la factura",-1),Gt=x({__name:"SalesInvoice",setup(b){const S=[{label:"Descarregar",icon:F.FILE_WORD,command:()=>ee()}],d=ve(),D=pe(),r=ye(),m=P(),I=z(),h=he(),w=L(),c=De(),e=Ve(),i=X(),{invoice:t}=_e(c),n={Free:0,FromDeliveryNote:1},o=T(0),s=K({visible:!1,title:"",closable:!0,position:"center",modal:!0}),R=T("");j(async()=>{R.value=d.params.id,I.fetchMasterData(),h.fetchCustomers(),await i.fetchReferencesByModule("sales"),await B(),r.setMenuItem({icon:F.WALLET,title:`Factura de venta ${t.value.invoiceNumber} - ${t.value.customerComercialName}`,backButtonVisible:!0})});const B=async()=>{w.fetchOneByName("SalesInvoice"),await c.GetById(R.value),await e.GetByInvoiceId(R.value),t.value&&(t.value.invoiceDate=q(t.value.invoiceDate))},Z=async()=>{t.value&&(t.value.invoiceDate=Se(t.value.invoiceDate),await c.Update(t.value)&&D.back())},ee=async()=>{var _;const p=await $e.SalesInvoice.GetReportDataById(t.value.id);if(p){const g=`Factura_${(_=t.value)==null?void 0:_.invoiceNumber}.docx`,U=await new Be().Download(p,ke.Invoice,g);U?we(g,U):m.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},te=async()=>{t.value&&(await e.GetToInvoice(t.value.customerId),o.value=n.FromDeliveryNote,s.title="Selector d'albarans d'entrega",s.visible=!0)},oe=async p=>{for(let _=0;_<p.length;_++){const g=p[_];await c.AddDeliveryNote(t.value.id,g)}s.visible=!1,B()},ae=async p=>{await c.RemoveDeliveryNote(t.value.id,p),B()},$=K({}),ie=()=>{var p;if(o.value=n.Free,t.value){$.salesInvoiceId=t.value.id,$.quantity=1,$.description="",$.totalCost=0;const _=(p=I.taxes)==null?void 0:p.find(g=>g.percentatge===21);_&&($.taxId=_.id),s.title="Introducció de línea lliure",s.visible=!0}},le=async()=>{await c.CreateInvoiceDetail($),s.visible=!1},se=async p=>{await c.DeleteInvoiceDetail(p),c.invoice.invoiceDate=q(c.invoice.invoiceDate)};return(p,_)=>{const g=y("SplitButton"),O=y("Button"),U=y("Dialog");return f(),C(be,null,[l(g,{label:"Guardar",onClick:Z,model:S,size:"small",class:"grid_add_row_button"}),u(t)?(f(),C("main",Nt,[l(We,{class:"mt-3 mr-3",invoice:u(t)},null,8,["invoice"]),l(ot,{class:"mt-3",canDelete:!0,details:u(t).salesInvoiceDetails,deliveryNotes:u(e).deliveryNotes,onDeleteDeliveryNote:ae,onDelete:se},{header:v(()=>[a("div",It,[wt,a("div",null,[l(O,{size:"small",label:"Afegir albarà",onClick:te}),V("    "),l(O,{size:"small",label:"Afegir linia lliure",onClick:ie})])])]),_:1},8,["details","deliveryNotes"])])):k("",!0),l(U,{visible:s.visible,"onUpdate:visible":_[0]||(_[0]=ne=>s.visible=ne),header:s.title,closable:s.closable,modal:s.modal,style:fe({width:o.value===n.Free?"50vw":"60vw"}),maximizable:o.value===n.FromDeliveryNote},{default:v(()=>[o.value===n.Free?(f(),M(mt,{key:0,invoiceDetail:$,onSubmit:le},null,8,["invoiceDetail"])):k("",!0),o.value===n.FromDeliveryNote?(f(),M(ht,{key:1,headerVisible:!0,deliveryNotes:u(e).invoiceableDeliveryNotes,onSelected:oe},{header:v(()=>[]),_:1},8,["deliveryNotes"])):k("",!0)]),_:1},8,["visible","header","closable","modal","style","maximizable"])],64)}}});export{Gt as default};
