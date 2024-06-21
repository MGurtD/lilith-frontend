import{d as M,r as V,K as L,h as D,a as w,m as $,w as _,e as r,C as T,i as o,k as m,P as E,D as O,p as J,b as Q,f as W,j as X,c as F,n as x,y as A,l as R,s as re,x as ae,J as ie,F as K,v as de,g as ne,u as ce,z as ue,o as me,G as ve}from"./index-8f350042.js";import{f as q,c as pe,d as H,b as fe}from"./functions-2e154ea4.js";import{u as Y}from"./customers-df5c0a64.js";import{u as Z}from"./lifecycle-22cc0d3c.js";import{u as ye}from"./masterData-febae284.js";import{c as be,a as k,F as _e}from"./form-validator-f8953ae6.js";import{L as he}from"./LinkReference-190183a1.js";import{u as Ne}from"./reference-a84866df.js";import{u as De}from"./plantmodel-ce1cde64.js";import{u as Se}from"./deliveryNote-77ccb535.js";import{u as Ie}from"./order-f620a3e3.js";import{S as we}from"./index-c26d6ff2.js";import{a as ge,b as Ve}from"./report.service-e9562af0.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./base.service-642755fa.js";import"./index-9bb1cbdb.js";import"./reference.service-7e50bcf5.js";import"./index-d6682b3e.js";import"./index-80538e05.js";import"./file.service-2d005604.js";const Oe=v=>(J("data-v-8f6728d6"),v=v(),Q(),v),Ce={class:"selector-filter"},Te={class:"selector-filter-field"},Be=Oe(()=>r("label",{for:""},"Buscar",-1)),ke={class:"selector-filter-button"},xe={class:"flex align-items-center gap-2"},$e=M({__name:"SelectorOrders",props:{orders:{},headerVisible:{type:Boolean}},emits:["selected"],setup(v,{emit:I}){const p=v,c=V([]),h=V(""),g=L(()=>{if(h.value==="")return p.orders||[];var a=[];return p.orders&&(a=p.orders.filter(e=>e.number.includes(h.value)||e.customerNumber.includes(h.value))),a}),d=()=>{if(c.value.length===0)return;const a=c.value;I("selected",a)};return(a,e)=>{const b=D("InputText"),s=D("Button"),f=D("Column"),i=D("DataTable");return w(),$(i,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:g.value,selectionMode:"multiple",selection:c.value,"onUpdate:selection":e[1]||(e[1]=t=>c.value=t)},{header:_(()=>[r("header",Ce,[r("div",Te,[Be,T("   "),o(b,{style:{width:"150px",height:"35px"},modelValue:h.value,"onUpdate:modelValue":e[0]||(e[0]=t=>h.value=t),size:"small"},null,8,["modelValue"])]),r("div",ke,[o(s,{onClick:d,size:"small",icon:m(E).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:_(t=>[r("div",xe,[r("b",null,"Comanda "+O(t.data.number)+" - "+O(m(q)(t.data.date)),1)])]),default:_(()=>[o(f,{selectionMode:"multiple",style:{width:"3%"}}),o(f,{header:"Número",field:"number",style:{width:"10%"}}),o(f,{header:"Número client",field:"customerNumber",style:{width:"20%"}}),o(f,{header:"Data",field:"date",style:{width:"10%"}},{body:_(t=>[T(O(m(q)(t.data.date)),1)]),_:1})]),_:1},8,["value","selection"])}}});const Ee=W($e,[["__scopeId","data-v-8f6728d6"]]),z=v=>(J("data-v-146cd7fb"),v=v(),Q(),v),Fe={key:0},Re={class:"three-columns"},Me={class:"mt-1"},Le=z(()=>r("label",{class:"block text-900 mb-2"},"Exercici",-1)),Ue={class:"mt-1"},Ae={class:"mt-1"},qe=z(()=>r("label",{class:"block text-900 mb-2"},"Client",-1)),ze={class:"three-columns"},Ge={class:"mt-2"},je=z(()=>r("label",{class:"block text-900 mb-2"},"Estat",-1)),Pe={class:"mt-2"},Ke={class:"mt-2"},He=M({__name:"FormDeliveryNote",props:{deliveryNote:{}},emits:["submit","cancel"],setup(v,{expose:I,emit:p}){const c=v,h=Y(),g=ye(),d=Z(),a=X(),e=L(()=>c.deliveryNote&&c.deliveryNote.salesInvoice?c.deliveryNote.salesInvoice.invoiceNumber:""),b=be().shape({siteId:k().required("L'origen es obligatori"),customerId:k().required("El client es obligatori"),statusId:k().required("L'estat es obligatori"),exerciseId:k().required("L'exercici es obligatori")}),s=V({result:!1,errors:{}}),f=()=>{const t=new _e(b);s.value=t.validate(c.deliveryNote)};return I({submitForm:async()=>{if(f(),s.value.result)c.deliveryNote.deliveryDate&&(c.deliveryNote.deliveryDate=pe(c.deliveryNote.deliveryDate)),p("submit",c.deliveryNote);else{let t="";Object.entries(s.value.errors).forEach(u=>{t+=`${u[1].map(N=>N)}.   `}),a.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}}}),(t,u)=>{var C;const N=D("Dropdown");return w(),F("div",null,[t.deliveryNote?(w(),F("form",Fe,[r("section",Re,[r("div",Me,[Le,o(N,{modelValue:t.deliveryNote.exerciseId,"onUpdate:modelValue":u[0]||(u[0]=y=>t.deliveryNote.exerciseId=y),editable:"",options:m(g).exercises,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":s.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),r("div",Ue,[o(A,{type:m(re).TEXT,label:"Número Albarà",id:"salesOrderNumber",modelValue:t.deliveryNote.number,"onUpdate:modelValue":u[1]||(u[1]=y=>t.deliveryNote.number=y),disabled:""},null,8,["type","modelValue"])]),r("div",Ae,[qe,o(N,{modelValue:t.deliveryNote.customerId,"onUpdate:modelValue":u[2]||(u[2]=y=>t.deliveryNote.customerId=y),editable:"",options:m(h).customers,optionValue:"id",optionLabel:"comercialName",class:x(["w-full",{"p-invalid":s.value.errors.customerId}])},null,8,["modelValue","options","class"])])]),r("section",ze,[r("div",Ge,[je,o(N,{modelValue:t.deliveryNote.statusId,"onUpdate:modelValue":u[3]||(u[3]=y=>t.deliveryNote.statusId=y),editable:"",options:(C=m(d).lifecycle)==null?void 0:C.statuses,optionValue:"id",optionLabel:"name",class:x(["w-full",{"p-invalid":s.value.errors.statusId}])},null,8,["modelValue","options","class"])]),r("div",Pe,[o(A,{modelValue:t.deliveryNote.deliveryDate,"onUpdate:modelValue":u[4]||(u[4]=y=>t.deliveryNote.deliveryDate=y),label:"Data Entrega",disabled:!0},null,8,["modelValue"])]),r("div",Ke,[o(A,{modelValue:e.value,"onUpdate:modelValue":u[5]||(u[5]=y=>e.value=y),label:"Número de factura",disabled:!0},null,8,["modelValue"])])])])):R("",!0)])}}});const Je=W(He,[["__scopeId","data-v-146cd7fb"]]),Qe={class:"vertical-align-middle ml-2 font-bold line-height-3"},We=["onClick"],Xe=M({__name:"TableDeliveryNoteDetails",props:{orders:{},canDelete:{type:Boolean}},emits:["delete"],setup(v,{emit:I}){const p=v,c=L(()=>{if(!p.orders)return[];let d=[];for(let a=0;a<p.orders.length;a++){if(!p.orders[a].salesOrderDetails)continue;const e=p.orders[a];e.salesOrderDetails.forEach(b=>{d.push({salesOrderId:e.id,salesOrderNumber:e.number,salesOrderDate:e.date,customerNumber:e.customerNumber,...b})})}return d}),h=ae(),g=(d,a)=>{var b;if(!p.orders)return;const e=(b=p.orders)==null?void 0:b.find(s=>s.id===a.salesOrderId);e&&h.require({target:d.currentTarget,message:`Está segur que vol desassignar la comanda ${e.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{I("delete",e)}})};return(d,a)=>{const e=D("Column"),b=D("DataTable");return w(),$(b,{value:c.value,tableStyle:"min-width: 100%",class:"p-datatable-sm",rowGroupMode:"subheader",groupRowsBy:"salesOrderNumber",sortMode:"multiple",sortOrder:1},{header:_(()=>[ie(d.$slots,"header")]),groupheader:_(s=>[r("span",Qe,"Comanda "+O(s.data.salesOrderNumber)+" (Núm. Client: "+O(s.data.customerNumber)+")",1),T("   "),d.canDelete?(w(),F("i",{key:0,class:x([m(E).TIMES,"grid_delete_column_button"]),onClick:f=>g(f,s.data)},null,10,We)):R("",!0)]),default:_(()=>[o(e,{field:"salesOrderNumber",header:"Comanda",style:{width:"5%"}}),o(e,{field:"",header:"",style:{width:"5%"}}),o(e,{field:"quantity",header:"Quantitat",style:{width:"5%"}}),o(e,{header:"Referència",field:"reference.code",sortable:"",style:{width:"10%"}},{body:_(s=>[o(he,{id:s.data.referenceId},null,8,["id"])]),_:1}),o(e,{field:"description",header:"Descripció",style:{width:"30%"}}),o(e,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:_(s=>[T(O(m(H)(s.data.unitPrice)),1)]),_:1}),o(e,{field:"amount",header:"Total",style:{width:"10%"}},{body:_(s=>[T(O(m(H)(s.data.amount)),1)]),_:1})]),_:3},8,["value"])}}}),Ye={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ze=r("span",{class:"text-l text-900 font-bold"},"Linies de l'albarà",-1),et="Selector de comandes",St=M({__name:"DeliveryNote",setup(v){const I=V(),p=V(K.EDIT),c=de(),h=ne(),g=ce(),d=Se(),a=Ie(),e=Y(),b=De(),s=Ne(),f=Z(),{deliveryNote:i}=ue(d),t=[{label:"Descarregar",icon:E.FILE_WORD,command:()=>u()}],u=async()=>{var l;const n=await we.DeliveryNote.GetReportDataById(i.value.id);if(n){const S=`AlbaraEntrega_${(l=i.value)==null?void 0:l.number}.docx`,B=await new Ve().Download(n,ge.DeliveryNote,S);B?fe(S,B):G.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},N=V(!1),C=V(""),y=L(()=>{if(!f.lifecycle||!f.lifecycle.statuses||i.value&&i.value.salesInvoiceId&&i.value.salesInvoiceId!==null)return!1;const n=f.lifecycle.statuses.find(l=>l.name==="Entregat");return n?n.id!==C.value:!1}),U=async()=>{const n=c.params.id;await d.GetById(n),C.value=d.deliveryNote.statusId,await a.GetByDeliveryNote(n),s.fetchReferencesByModule("sales"),b.fetchSites(),e.customers||e.fetchCustomers(),f.lifecycle||f.fetchOneByName("DeliveryNote");let l="";i.value&&(p.value=K.EDIT,l=`Albarà d'entrega ${i.value.number}`,i.value.deliveryDate&&(i.value.deliveryDate=q(i.value.deliveryDate))),g.setMenuItem({icon:E.BUILDING,backButtonVisible:!0,title:l})};me(async()=>{await U()});const ee=()=>{I.value.submitForm()},G=X(),te=async n=>{let l=!1,S="";l=await d.Update(n.id,n),S=l?"Albarà actualitzat":"Error al actualitzar l'albarà",G.add({life:5e3,severity:l?"success":"error",summary:S}),l&&h.back()},oe=async()=>{i.value&&await a.GetToDeliver(i.value.customerId),N.value=!0},se=async n=>{for(let l=0;l<n.length;l++){const S=n[l];await d.AddOrder(i.value.id,S)}N.value=!1,U()},le=async n=>{await d.DeleteOrder(i.value.id,n),U()};return(n,l)=>{const S=D("SplitButton"),j=D("Button"),B=D("Dialog");return w(),F(ve,null,[o(S,{label:"Guardar",onClick:ee,model:t,size:"small",class:"grid_add_row_button"}),m(i)?(w(),$(Je,{key:0,class:"mt-3 mb-3",ref_key:"deliveryNoteForm",ref:I,deliveryNote:m(i),onSubmit:te},null,8,["deliveryNote"])):R("",!0),m(i)?(w(),$(Xe,{key:1,orders:m(a).salesOrders,canDelete:y.value,onDelete:le},{header:_(()=>[r("div",Ye,[Ze,r("div",null,[o(j,{disabled:!y.value,size:"small",label:"Afegir comanda",onClick:l[0]||(l[0]=P=>oe())},null,8,["disabled"])])])]),_:1},8,["orders","canDelete"])):R("",!0),o(B,{closable:!0,visible:N.value,"onUpdate:visible":l[1]||(l[1]=P=>N.value=P),header:et,modal:!0,style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:_(()=>[o(Ee,{orders:m(a).salesOrdersToDeliver,onSelected:se},null,8,["orders"])]),_:1},8,["visible"])],64)}}});export{St as default};
