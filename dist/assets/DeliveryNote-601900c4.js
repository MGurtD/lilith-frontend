import{d as M,r as V,H as L,h as D,a as w,m as $,w as _,e as i,C as T,i as a,k as v,P as E,D as I,p as P,b as Q,f as J,j as W,c as F,n as k,y as q,l as R,s as re,x as le,K as ie,F as K,v as de,g as ne,u as ce,z as ue,o as me,G as ve}from"./index-61ceac46.js";import{f as U,c as pe,b as fe}from"./functions-4d7ada1d.js";import{u as X}from"./customers-9f789090.js";import{u as Y}from"./lifecycle-89ce980f.js";import{u as ye}from"./masterData-0b784b11.js";import{c as be,a as x,F as _e}from"./form-validator-f8953ae6.js";import{u as Z}from"./reference-d9f5317f.js";import{u as he}from"./plantmodel-e5258ecb.js";import{u as Ne}from"./deliveryNote-7b22002f.js";import{u as De}from"./order-d4bbdc8b.js";import{S as Se}from"./index-dbe80950.js";import{a as Ie,b as ge}from"./report.service-7648470c.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./base.service-558553c0.js";import"./index-f0d98432.js";import"./reference.service-bac3a278.js";import"./index-5c7caccd.js";import"./index-837c88ed.js";import"./file.service-f079e75c.js";const we=p=>(P("data-v-1baead78"),p=p(),Q(),p),Oe={class:"selector-filter"},Ve={class:"selector-filter-field"},Te=we(()=>i("label",{for:""},"Buscar",-1)),Ce={class:"selector-filter-button"},Be={class:"flex align-items-center gap-2"},xe=M({__name:"SelectorOrders",props:{orders:{},headerVisible:{type:Boolean}},emits:["selected"],setup(p,{emit:g}){const y=p,c=V([]),h=V(""),O=L(()=>{var d=[];return y.orders&&(d=y.orders.filter(r=>r.salesOrderNumber.toString().includes(h.value)||r.customerSalesOrderNumber.includes(h.value))),d}),b=()=>{if(c.value.length===0)return;const d=c.value;g("selected",d)};return(d,r)=>{const s=D("InputText"),u=D("Button"),t=D("Column"),o=D("DataTable");return w(),$(o,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",metaKeySelection:!1,value:O.value,selectionMode:"multiple",selection:c.value,"onUpdate:selection":r[1]||(r[1]=e=>c.value=e)},{header:_(()=>[i("header",Oe,[i("div",Ve,[Te,T("   "),a(s,{style:{width:"150px",height:"35px"},modelValue:h.value,"onUpdate:modelValue":r[0]||(r[0]=e=>h.value=e),size:"small"},null,8,["modelValue"])]),i("div",Ce,[a(u,{onClick:b,size:"small",icon:v(E).CHECK_SQUARE},null,8,["icon"])])])]),groupheader:_(e=>[i("div",Be,[i("b",null,"Comanda "+I(e.data.salesOrderNumber)+" - "+I(v(U)(e.data.salesOrderDate)),1)])]),default:_(()=>[a(t,{header:"Número",field:"salesOrderNumber",style:{width:"10%"}}),a(t,{header:"Número client",field:"customerSalesOrderNumber",style:{width:"20%"}}),a(t,{header:"Data",field:"salesOrderDate",style:{width:"10%"}},{body:_(e=>[T(I(v(U)(e.data.salesOrderDate)),1)]),_:1})]),_:1},8,["value","selection"])}}});const ke=J(xe,[["__scopeId","data-v-1baead78"]]),z=p=>(P("data-v-146cd7fb"),p=p(),Q(),p),$e={key:0},Ee={class:"three-columns"},Fe={class:"mt-1"},Re=z(()=>i("label",{class:"block text-900 mb-2"},"Exercici",-1)),Ue={class:"mt-1"},Me={class:"mt-1"},Le=z(()=>i("label",{class:"block text-900 mb-2"},"Client",-1)),Ae={class:"three-columns"},qe={class:"mt-2"},ze=z(()=>i("label",{class:"block text-900 mb-2"},"Estat",-1)),Ge={class:"mt-2"},je={class:"mt-2"},He=M({__name:"FormDeliveryNote",props:{deliveryNote:{}},emits:["submit","cancel"],setup(p,{expose:g,emit:y}){const c=p,h=X(),O=ye(),b=Y(),d=W(),r=L(()=>c.deliveryNote&&c.deliveryNote.salesInvoice?c.deliveryNote.salesInvoice.invoiceNumber:""),s=be().shape({siteId:x().required("L'origen es obligatori"),customerId:x().required("El client es obligatori"),statusId:x().required("L'estat es obligatori"),exerciseId:x().required("L'exercici es obligatori")}),u=V({result:!1,errors:{}}),t=()=>{const e=new _e(s);u.value=e.validate(c.deliveryNote)};return g({submitForm:async()=>{if(t(),u.value.result)c.deliveryNote.deliveryDate&&(c.deliveryNote.deliveryDate=pe(c.deliveryNote.deliveryDate)),y("submit",c.deliveryNote);else{let e="";Object.entries(u.value.errors).forEach(m=>{e+=`${m[1].map(N=>N)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}}}),(e,m)=>{var C;const N=D("Dropdown");return w(),F("div",null,[e.deliveryNote?(w(),F("form",$e,[i("section",Ee,[i("div",Fe,[Re,a(N,{modelValue:e.deliveryNote.exerciseId,"onUpdate:modelValue":m[0]||(m[0]=f=>e.deliveryNote.exerciseId=f),editable:"",options:v(O).exercises,optionValue:"id",optionLabel:"name",class:k(["w-full",{"p-invalid":u.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),i("div",Ue,[a(q,{type:v(re).TEXT,label:"Número Albarà",id:"salesOrderNumber",modelValue:e.deliveryNote.number,"onUpdate:modelValue":m[1]||(m[1]=f=>e.deliveryNote.number=f),disabled:""},null,8,["type","modelValue"])]),i("div",Me,[Le,a(N,{modelValue:e.deliveryNote.customerId,"onUpdate:modelValue":m[2]||(m[2]=f=>e.deliveryNote.customerId=f),editable:"",options:v(h).customers,optionValue:"id",optionLabel:"comercialName",class:k(["w-full",{"p-invalid":u.value.errors.customerId}])},null,8,["modelValue","options","class"])])]),i("section",Ae,[i("div",qe,[ze,a(N,{modelValue:e.deliveryNote.statusId,"onUpdate:modelValue":m[3]||(m[3]=f=>e.deliveryNote.statusId=f),editable:"",options:(C=v(b).lifecycle)==null?void 0:C.statuses,optionValue:"id",optionLabel:"name",class:k(["w-full",{"p-invalid":u.value.errors.statusId}])},null,8,["modelValue","options","class"])]),i("div",Ge,[a(q,{modelValue:e.deliveryNote.deliveryDate,"onUpdate:modelValue":m[4]||(m[4]=f=>e.deliveryNote.deliveryDate=f),label:"Data Entrega",disabled:!0},null,8,["modelValue"])]),i("div",je,[a(q,{modelValue:r.value,"onUpdate:modelValue":m[5]||(m[5]=f=>r.value=f),label:"Número de factura",disabled:!0},null,8,["modelValue"])])])])):R("",!0)])}}});const Ke=J(He,[["__scopeId","data-v-146cd7fb"]]),Pe={class:"vertical-align-middle ml-2 font-bold line-height-3"},Qe=["onClick"],Je=M({__name:"TableDeliveryNoteDetails",props:{orders:{},canDelete:{type:Boolean}},emits:["delete"],setup(p,{emit:g}){const y=p,c=Z(),h=L(()=>{if(!y.orders)return[];let d=[];for(let r=0;r<y.orders.length;r++){if(!y.orders[r].salesOrderDetails)continue;const s=y.orders[r];s.salesOrderDetails.forEach(u=>{d.push({salesOrderId:s.id,salesOrderNumber:s.salesOrderNumber,salesOrderDate:s.salesOrderDate,...u})})}return d}),O=le(),b=(d,r)=>{var u;if(!y.orders)return;const s=(u=y.orders)==null?void 0:u.find(t=>t.id===r.salesOrderId);s&&O.require({target:d.currentTarget,message:`Está segur que vol desassignar la comanda ${s.salesOrderNumber}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{g("delete",s)}})};return(d,r)=>{const s=D("Column"),u=D("DataTable");return w(),$(u,{value:h.value,tableStyle:"min-width: 100%",class:"p-datatable-sm",rowGroupMode:"subheader",groupRowsBy:"salesOrderNumber"},{header:_(()=>[ie(d.$slots,"header")]),groupheader:_(t=>[i("span",Pe,"Comanda "+I(t.data.salesOrderNumber)+" ("+I(t.data.customerOrderNumber)+") "+I(v(U)(t.data.salesOrderDate)),1),T("   "),d.canDelete?(w(),F("i",{key:0,class:k([v(E).TIMES,"grid_delete_column_button"]),onClick:o=>b(o,t.data)},null,10,Qe)):R("",!0)]),default:_(()=>[a(s,{field:"salesOrderNumber",header:"Comanda",style:{width:"5%"}}),a(s,{field:"",header:"",style:{width:"5%"}}),a(s,{field:"quantity",header:"Quantitat",style:{width:"5%"}}),a(s,{header:"Referència",style:{width:"10%"}},{body:_(t=>[T(I(v(c).getShortName(t.data.reference)),1)]),_:1}),a(s,{field:"description",header:"Descripció",style:{width:"30%"}}),a(s,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:_(t=>[T(I(t.data.unitPrice)+" € ",1)]),_:1}),a(s,{field:"amount",header:"Total",style:{width:"10%"}},{body:_(t=>[T(I(t.data.amount)+" € ",1)]),_:1})]),_:3},8,["value"])}}}),We={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Xe=i("span",{class:"text-l text-900 font-bold"},"Linies de l'albarà",-1),Ye="Selector de comandes",ht=M({__name:"DeliveryNote",setup(p){const g=V(),y=V(K.EDIT),c=de(),h=ne(),O=ce(),b=Ne(),d=De(),r=X(),s=he(),u=Z(),t=Y(),{deliveryNote:o}=ue(b),e=[{label:"Descarregar",icon:E.FILE_WORD,command:()=>m()}],m=async()=>{var l;const n=await Se.DeliveryNote.GetReportDataById(o.value.id);if(n){const S=`AlbaraEntrega_${(l=o.value)==null?void 0:l.number}.docx`,B=await new ge().Download(n,Ie.DeliveryNote,S);B?fe(S,B):G.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla de la comanda"})}},N=V(!1),C=V(""),f=L(()=>{if(!t.lifecycle||!t.lifecycle.statuses||o.value&&o.value.salesInvoiceId&&o.value.salesInvoiceId!==null)return!1;const n=t.lifecycle.statuses.find(l=>l.name==="Entregat");return n?n.id!==C.value:!1}),A=async()=>{const n=c.params.id;await b.GetById(n),C.value=b.deliveryNote.statusId,await d.GetByDeliveryNote(n),u.fetchReferencesByModule("sales"),s.fetchSites(),r.customers||r.fetchCustomers(),t.lifecycle||t.fetchOneByName("DeliveryNote");let l="";o.value&&(y.value=K.EDIT,l=`Albarà d'entrega ${o.value.number}`,o.value.deliveryDate&&(o.value.deliveryDate=U(o.value.deliveryDate))),O.setMenuItem({icon:E.BUILDING,backButtonVisible:!0,title:l})};me(async()=>{await A()});const ee=()=>{g.value.submitForm()},G=W(),te=async n=>{let l=!1,S="";l=await b.Update(n.id,n),S=l?"Albarà actualitzat":"Error al actualitzar l'albarà",G.add({life:5e3,severity:l?"success":"error",summary:S}),l&&h.back()},se=async()=>{o.value&&await d.GetToDeliver(o.value.customerId),N.value=!0},oe=async n=>{for(let l=0;l<n.length;l++){const S=n[l];await b.AddOrder(o.value.id,S)}N.value=!1,A()},ae=async n=>{await b.DeleteOrder(o.value.id,n),A()};return(n,l)=>{const S=D("SplitButton"),j=D("Button"),B=D("Dialog");return w(),F(ve,null,[a(S,{label:"Guardar",onClick:ee,model:e,size:"small",class:"grid_add_row_button"}),v(o)?(w(),$(Ke,{key:0,class:"mt-3 mb-3",ref_key:"deliveryNoteForm",ref:g,deliveryNote:v(o),onSubmit:te},null,8,["deliveryNote"])):R("",!0),v(o)?(w(),$(Je,{key:1,orders:v(d).salesOrders,canDelete:f.value,onDelete:ae},{header:_(()=>[i("div",We,[Xe,i("div",null,[a(j,{disabled:!f.value,size:"small",label:"Afegir comanda",onClick:l[0]||(l[0]=H=>se())},null,8,["disabled"])])])]),_:1},8,["orders","canDelete"])):R("",!0),a(B,{closable:!0,visible:N.value,"onUpdate:visible":l[1]||(l[1]=H=>N.value=H),header:Ye,modal:!0,style:{width:"50rem"},breakpoints:{"1199px":"75vw","575px":"90vw"}},{default:_(()=>[a(ke,{orders:v(d).salesOrdersToDeliver,onSelected:oe},null,8,["orders"])]),_:1},8,["visible"])],64)}}});export{ht as default};
