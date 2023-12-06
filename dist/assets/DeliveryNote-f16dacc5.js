import{d as U,r as V,H as M,h as D,a as w,m as B,w as h,e as s,C as T,i as l,k as v,P as z,D as O,p as q,b as j,f as H,j as K,c as $,n as x,y as L,l as E,s as te,K as se,F as G,v as le,g as oe,u as ae,z as re,o as ie,G as de}from"./index-357c9d4c.js";import{f as F,c as ne}from"./functions-afe9fe15.js";import{u as P}from"./customers-fff5daf9.js";import{u as Q}from"./lifecycle-1e4e7269.js";import{u as ue}from"./masterData-e8e1356d.js";import{c as ce,a as k,F as me}from"./form-validator-9d0a56f8.js";import{u as ve}from"./reference-35a8c4f2.js";import{u as pe}from"./plantmodel-ce44b43b.js";import{u as fe}from"./deliveryNote-b4efa973.js";import{u as ye}from"./order-cd8a2250.js";import"./v4-a960c1f4.js";import"./base.service-d0780977.js";import"./index-44203410.js";import"./reference.service-387fdae1.js";import"./index-6fe49fa3.js";import"./index-876c29fd.js";const be=m=>(q("data-v-1baead78"),m=m(),j(),m),_e={class:"selector-filter"},he={class:"selector-filter-field"},Ne=be(()=>s("label",{for:""},"Buscar",-1)),De={class:"selector-filter-button"},Se={class:"flex align-items-center gap-2"},Ie=U({__name:"SelectorOrders",props:{orders:{},headerVisible:{type:Boolean}},emits:["selected"],setup(m,{emit:S}){const p=m,d=V([]),N=V(""),y=M(()=>{var t=[];return p.orders&&(t=p.orders.filter(o=>o.salesOrderNumber.toString().includes(N.value)||o.customerSalesOrderNumber.includes(N.value))),t}),a=()=>{if(d.value.length===0)return;const t=d.value;S("selected",t)};return(t,o)=>{const u=D("InputText"),b=D("Button"),_=D("Column"),r=D("DataTable");return w(),B(r,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:y.value,selectionMode:"multiple",selection:d.value,"onUpdate:selection":o[1]||(o[1]=e=>d.value=e)},{header:h(()=>[s("header",_e,[s("div",he,[Ne,T("   "),l(u,{style:{width:"150px",height:"35px"},modelValue:N.value,"onUpdate:modelValue":o[0]||(o[0]=e=>N.value=e),size:"small"},null,8,["modelValue"])]),s("div",De,[l(b,{onClick:a,size:"small",icon:v(z).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:h(e=>[s("div",Se,[s("b",null,"Comanda "+O(e.data.salesOrderNumber)+" - "+O(v(F)(e.data.salesOrderDate)),1)])]),default:h(()=>[l(_,{header:"Número",field:"salesOrderNumber",style:{width:"10%"}}),l(_,{header:"Número client",field:"customerSalesOrderNumber",style:{width:"20%"}}),l(_,{header:"Data",field:"salesOrderDate",style:{width:"10%"}},{body:h(e=>[T(O(v(F)(e.data.salesOrderDate)),1)]),_:1})]),_:1},8,["value","selection"])}}});const Oe=H(Ie,[["__scopeId","data-v-1baead78"]]),R=m=>(q("data-v-146cd7fb"),m=m(),j(),m),we={key:0},ge={class:"three-columns"},Ve={class:"mt-1"},Ce=R(()=>s("label",{class:"block text-900 mb-2"},"Exercici",-1)),Te={class:"mt-1"},ke={class:"mt-1"},xe=R(()=>s("label",{class:"block text-900 mb-2"},"Client",-1)),Be={class:"three-columns"},$e={class:"mt-2"},Ee=R(()=>s("label",{class:"block text-900 mb-2"},"Estat",-1)),Fe={class:"mt-2"},Ue={class:"mt-2"},Me=U({__name:"FormDeliveryNote",props:{deliveryNote:{}},emits:["submit","cancel"],setup(m,{expose:S,emit:p}){const d=m,N=P(),y=ue(),a=Q(),t=K(),o=M(()=>d.deliveryNote&&d.deliveryNote.salesInvoice?d.deliveryNote.salesInvoice.invoiceNumber:""),u=ce().shape({siteId:k().required("L'origen es obligatori"),customerId:k().required("El client es obligatori"),statusId:k().required("L'estat es obligatori"),exerciseId:k().required("L'exercici es obligatori")}),b=V({result:!1,errors:{}}),_=()=>{const e=new me(u);b.value=e.validate(d.deliveryNote)};return S({submitForm:async()=>{if(_(),b.value.result)d.deliveryNote.deliveryDate&&(d.deliveryNote.deliveryDate=ne(d.deliveryNote.deliveryDate)),p("submit",d.deliveryNote);else{let e="";Object.entries(b.value.errors).forEach(n=>{e+=`${n[1].map(I=>I)}.   `}),t.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}}}),(e,n)=>{var C;const I=D("Dropdown");return w(),$("div",null,[e.deliveryNote?(w(),$("form",we,[s("section",ge,[s("div",Ve,[Ce,l(I,{modelValue:e.deliveryNote.exerciseId,"onUpdate:modelValue":n[0]||(n[0]=f=>e.deliveryNote.exerciseId=f),editable:"",options:v(y).exercises,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":b.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),s("div",Te,[l(L,{type:v(te).TEXT,label:"Número Albarà",id:"salesOrderNumber",modelValue:e.deliveryNote.number,"onUpdate:modelValue":n[1]||(n[1]=f=>e.deliveryNote.number=f),disabled:""},null,8,["type","modelValue"])]),s("div",ke,[xe,l(I,{modelValue:e.deliveryNote.customerId,"onUpdate:modelValue":n[2]||(n[2]=f=>e.deliveryNote.customerId=f),editable:"",options:v(N).customers,optionValue:"id",optionLabel:"comercialName",class:x(["w-full",{"p-invalid":b.value.errors.customerId}])},null,8,["modelValue","options","class"])])]),s("section",Be,[s("div",$e,[Ee,l(I,{modelValue:e.deliveryNote.statusId,"onUpdate:modelValue":n[3]||(n[3]=f=>e.deliveryNote.statusId=f),editable:"",options:(C=v(a).lifecycle)==null?void 0:C.statuses,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":b.value.errors.statusId}])},null,8,["modelValue","options","class"])]),s("div",Fe,[l(L,{modelValue:e.deliveryNote.deliveryDate,"onUpdate:modelValue":n[4]||(n[4]=f=>e.deliveryNote.deliveryDate=f),label:"Data Entrega",disabled:!0},null,8,["modelValue"])]),s("div",Ue,[l(L,{modelValue:o.value,"onUpdate:modelValue":n[5]||(n[5]=f=>o.value=f),label:"Número de factura",disabled:!0},null,8,["modelValue"])])])])):E("",!0)])}}});const Le=H(Me,[["__scopeId","data-v-146cd7fb"]]),ze={class:"vertical-align-middle ml-2 font-bold line-height-3"},Re=["onClick"],Ae=U({__name:"TableDeliveryNoteDetails",props:{orders:{},canDelete:{type:Boolean}},emits:["delete"],setup(m,{emit:S}){const p=m,d=M(()=>{if(!p.orders)return[];let y=[];for(let a=0;a<p.orders.length;a++){if(!p.orders[a].salesOrderDetails)continue;const t=p.orders[a];t.salesOrderDetails.forEach(o=>{y.push({salesOrderId:t.id,salesOrderNumber:t.salesOrderNumber,salesOrderDate:t.salesOrderDate,...o})})}return y}),N=(y,a)=>{var o;if(!p.orders)return;const t=(o=p.orders)==null?void 0:o.find(u=>u.id===a.salesOrderId);t&&S("delete",t)};return(y,a)=>{const t=D("Column"),o=D("DataTable");return w(),B(o,{value:d.value,tableStyle:"min-width: 100%",class:"p-datatable-sm",rowGroupMode:"subheader",groupRowsBy:"salesOrderNumber"},{header:h(()=>[se(y.$slots,"header")]),groupheader:h(u=>[s("span",ze,"Comanda "+O(u.data.salesOrderNumber)+" ("+O(u.data.customerOrderNumber)+") "+O(v(F)(u.data.salesOrderDate)),1),T("   "),y.canDelete?(w(),$("i",{key:0,class:x([v(z).TIMES,"grid_delete_column_button"]),onClick:b=>N(b,u.data)},null,10,Re)):E("",!0)]),default:h(()=>[l(t,{field:"salesOrderNumber",header:"Comanda",style:{width:"5%"}}),l(t,{field:"",header:"",style:{width:"5%"}}),l(t,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),l(t,{field:"description",header:"Descripció",style:{width:"25%"}}),l(t,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:h(u=>[T(O(u.data.unitPrice)+" € ",1)]),_:1}),l(t,{field:"amount",header:"Total",style:{width:"10%"}},{body:h(u=>[T(O(u.data.amount)+" € ",1)]),_:1})]),_:3},8,["value"])}}}),Ge={class:"flex flex-wrap align-items-center justify-content-between gap-2"},qe=s("span",{class:"text-l text-900 font-bold"},"Linies de l'albarà",-1),je="Selector de comandes",it=U({__name:"DeliveryNote",setup(m){const S=V(),p=V(G.EDIT),d=le(),N=oe(),y=ae(),a=fe(),t=ye(),o=P(),u=pe(),b=ve(),_=Q(),{deliveryNote:r}=re(a),e=V(!1),n=V(""),I=M(()=>{if(!_.lifecycle||!_.lifecycle.statuses||r.value&&r.value.salesInvoiceId&&r.value.salesInvoiceId!==null)return!1;const c=_.lifecycle.statuses.find(i=>i.name==="Entregat");return c?c.id!==n.value:!1}),C=async()=>{const c=d.params.id;await a.GetById(c),n.value=a.deliveryNote.statusId,await t.GetByDeliveryNote(c),b.fetchReferencesByModule("sales"),u.fetchSites(),o.customers||o.fetchCustomers(),_.lifecycle||_.fetchOneByName("DeliveryNote");let i="";r.value&&(p.value=G.EDIT,i=`Albarà d'entrega ${r.value.number}`,r.value.deliveryDate&&(r.value.deliveryDate=F(r.value.deliveryDate))),y.setMenuItem({icon:z.BUILDING,backButtonVisible:!0,title:i})};ie(async()=>{await C()});const f=()=>{S.value.submitForm()},J=K(),X=async c=>{let i=!1,g="";i=await a.Update(c.id,c),g=i?"Albarà actualitzat":"Error al actualitzar l'albarà",J.add({life:5e3,severity:i?"success":"error",summary:g}),i&&N.back()},W=async()=>{r.value&&await t.GetToDeliver(r.value.customerId),e.value=!0},Y=async c=>{for(let i=0;i<c.length;i++){const g=c[i];await a.AddOrder(r.value.id,g)}e.value=!1,C()},Z=async c=>{await a.DeleteOrder(r.value.id,c),C()};return(c,i)=>{const g=D("Button"),ee=D("Dialog");return w(),$(de,null,[l(g,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:f}),v(r)?(w(),B(Le,{key:0,class:"mt-3 mb-3",ref_key:"deliveryNoteForm",ref:S,deliveryNote:v(r),onSubmit:X},null,8,["deliveryNote"])):E("",!0),v(r)?(w(),B(Ae,{key:1,orders:v(t).salesOrders,canDelete:I.value,onDelete:Z},{header:h(()=>[s("div",Ge,[qe,s("div",null,[l(g,{disabled:!I.value,size:"small",label:"Afegir comanda",onClick:i[0]||(i[0]=A=>W())},null,8,["disabled"])])])]),_:1},8,["orders","canDelete"])):E("",!0),l(ee,{closable:!0,visible:e.value,"onUpdate:visible":i[1]||(i[1]=A=>e.value=A),header:je,modal:!0,style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:h(()=>[l(Oe,{orders:v(t).salesOrdersToDeliver,onSelected:Y},null,8,["orders"])]),_:1},8,["visible"])],64)}}});export{it as default};