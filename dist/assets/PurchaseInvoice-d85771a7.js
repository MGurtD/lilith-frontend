import{d as H,z as ee,o as Q,r as M,j as X,h as y,a as B,c as q,k as t,e as n,i as l,y as j,n as $,s as O,D as k,l as z,p as ie,b as ue,f as ce,J as te,F as x,m as G,w as f,P as W,C as L,v as de,g as me,u as pe,G as ve}from"./index-d7e0b608.js";import{a as oe,u as J}from"./purchaseInvoices-555c9cf4.js";import{c as ae,g as se,f as Ie}from"./functions-13b40d42.js";import{F as be}from"./FileEntityPicker-e2d982a8.js";import{c as ne,a as Z,F as le,d as fe}from"./form-validator-788c4f60.js";import{l as K}from"./lodash-fe4783af.js";import"./index-49481bdd.js";import"./base.service-1e1fcad7.js";import"./index-0f6d2d18.js";import"./suppliers.service-175cce9d.js";import"./v4-a960c1f4.js";import"./file.service-a02a6282.js";const U=C=>(ie("data-v-e2301218"),C=C(),ue(),C),_e={key:0},he={class:"four-columns"},Ae=U(()=>n("label",{class:"block text-900 mb-2"},"Exercici",-1)),xe=U(()=>n("label",{class:"block text-900 mb-2"},"Sèrie",-1)),ye=U(()=>n("label",{class:"block text-900 mb-2"},"Estat",-1)),De={class:"four-columns"},Ve={class:"mt-1"},ge=U(()=>n("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),Te={class:"mt-1"},we={class:"mt-1"},Ee=U(()=>n("label",{class:"block text-900 mb-2"},"Data Factura",-1)),Fe={class:"mt-1"},Ce=U(()=>n("label",{class:"block text-900 mb-2"},"Forma de pagament",-1)),Pe={class:"four-columns"},Se={class:"mt-1"},ke={class:"mt-1"},Ue={class:"mt-1"},Ne={class:"four-columns"},Re={class:"mt-1"},Be=U(()=>n("label",{class:"block text-900 mb-2"},"Base",-1)),Me={class:"summary-field"},$e={class:"mt-1"},Le=U(()=>n("label",{class:"block text-900 mb-2"},"Impostos",-1)),Oe={class:"summary-field"},Ye={class:"mt-1"},je=U(()=>n("label",{class:"block text-900 mb-2"},"Total",-1)),ze={class:"summary-field"},Ge=H({__name:"FormPurchaseInvoice",emits:["submit","cancel"],setup(C,{expose:T,emit:v}){const V=oe(),g=J(),{purchaseInvoice:e}=ee(V);Q(()=>{setTimeout(()=>{e.value&&e.value.purchaseInvoiceImports.length>0&&(e.value.taxAmount=h())},500)});const E=ne().shape({exerciceId:Z().required("L'exercici es obligatori"),supplierId:Z().required("El proveïdor es obligatori")}),p=M({result:!1,errors:{}}),s=()=>{const d=new le(E);p.value=d.validate(e.value)},D=()=>{var d;return((d=e.value)==null?void 0:d.purchaseInvoiceImports.length)===0?(a.add({severity:"warn",summary:"Formulari inválid",detail:"Ha d'introduir els imports de factura",life:5e3}),!1):!0};let I=!1;Q(()=>{setTimeout(()=>{I=!0},500)});const a=X(),c=async()=>{if(s(),p.value.result){if(!D())return;v("submit",e.value)}else{let d="";Object.entries(p.value.errors).forEach(o=>{d+=`${o[1].map(b=>b)}.   `}),a.add({severity:"warn",summary:"Formulari inválid",detail:d,life:5e3})}},m=()=>{var o;const d=(o=g.masterData.suppliers)==null?void 0:o.find(b=>{var F;return b.id===((F=e.value)==null?void 0:F.supplierId)});d&&(e.value.paymentMethodId=d.paymentMethodId,_())},_=async()=>{if(I){if(e.value){let d=0,o=0,b=0,F=0,r=0,i=0,u=0,A=0,w=0,P=0;d=Y(),F=h(),e.value.transportAmount&&(o=parseFloat(e.value.transportAmount.toFixed(2))),e.value.discountPercentage&&(u=parseFloat(e.value.discountPercentage.toFixed(2))),e.value.extraTaxPercentatge&&(w=e.value.extraTaxPercentatge),b=(d+o)*1,P=b*(w/100),A=b+F*1-P*1,i=A*(1*u)/100,r=parseFloat((A-i).toFixed(2)),e.value.baseAmount=d,e.value.transportAmount=o,e.value.subtotal=b,e.value.taxAmount=F,e.value.grossAmount=A,e.value.netAmount=r,e.value.discountPercentage=u,e.value.discountAmount=i,e.value.extraTaxPercentatge=w,e.value.extraTaxAmount=P;const N=Object.assign({},e.value);N.purchaseInvoiceDate=ae(N.purchaseInvoiceDate),e.value.purchaseInvoiceDueDates=await V.GetDueDates(N)}console.log("calcAmounts",e.value)}},Y=()=>{let d=0;return e.value&&e.value.purchaseInvoiceImports.forEach(o=>d+=o.baseAmount),d},h=()=>{let d=0;return e.value&&e.value.purchaseInvoiceImports.forEach(o=>d+=o.taxAmount),d};return T({submitForm:c,calcAmounts:_}),(d,o)=>{const b=y("Dropdown"),F=y("Calendar");return B(),q("div",null,[t(e)?(B(),q("form",_e,[n("section",he,[l(j,{label:"Num. Fra. Intern",id:"number",modelValue:t(e).number,"onUpdate:modelValue":o[0]||(o[0]=r=>t(e).number=r),disabled:""},null,8,["modelValue"]),n("div",null,[Ae,l(b,{modelValue:t(e).exerciceId,"onUpdate:modelValue":o[1]||(o[1]=r=>t(e).exerciceId=r),editable:"",options:t(g).masterData.exercises,optionValue:"id",optionLabel:"name",class:$(["w-full",{"p-invalid":p.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),n("div",null,[xe,l(b,{modelValue:t(e).purchaseInvoiceSerieId,"onUpdate:modelValue":o[2]||(o[2]=r=>t(e).purchaseInvoiceSerieId=r),editable:"",options:t(g).masterData.series,optionValue:"id",optionLabel:"name",class:$(["w-full",{"p-invalid":p.value.errors.purchaseInvoiceSerieId}])},null,8,["modelValue","options","class"])]),n("div",null,[ye,l(b,{modelValue:t(e).purchaseInvoiceStatusId,"onUpdate:modelValue":o[3]||(o[3]=r=>t(e).purchaseInvoiceStatusId=r),editable:"",options:t(g).masterData.statuses,optionValue:"id",optionLabel:"name",class:$(["w-full",{"p-invalid":p.value.errors.purchaseInvoiceStatusId}])},null,8,["modelValue","options","class"])])]),n("section",De,[n("div",Ve,[ge,l(b,{modelValue:t(e).supplierId,"onUpdate:modelValue":o[4]||(o[4]=r=>t(e).supplierId=r),editable:"",options:t(g).masterData.suppliers,optionValue:"id",optionLabel:"comercialName",onChange:m,class:$(["w-full",{"p-invalid":p.value.errors.supplierId}])},null,8,["modelValue","options","class"])]),n("div",Te,[l(j,{label:"Num. Fra. Proveïdor",id:"supplierNumber",modelValue:t(e).supplierNumber,"onUpdate:modelValue":o[5]||(o[5]=r=>t(e).supplierNumber=r)},null,8,["modelValue"])]),n("div",we,[Ee,l(F,{id:"purchaseInvoiceDate",modelValue:t(e).purchaseInvoiceDate,"onUpdate:modelValue":o[6]||(o[6]=r=>t(e).purchaseInvoiceDate=r),onDateSelect:o[7]||(o[7]=r=>_())},null,8,["modelValue"])]),n("div",Fe,[Ce,l(b,{modelValue:t(e).paymentMethodId,"onUpdate:modelValue":[o[8]||(o[8]=r=>t(e).paymentMethodId=r),o[9]||(o[9]=r=>_())],editable:"",options:t(g).masterData.paymentMethods,optionValue:"id",optionLabel:"name",class:$(["w-full",{"p-invalid":p.value.errors.paymentmethod}])},null,8,["modelValue","options","class"])])]),n("section",Pe,[n("div",Se,[l(j,{type:t(O).CURRENCY,label:"Ports",id:"transportAmount",modelValue:t(e).transportAmount,"onUpdate:modelValue":[o[10]||(o[10]=r=>t(e).transportAmount=r),o[11]||(o[11]=r=>_())]},null,8,["type","modelValue"])]),n("div",ke,[l(j,{type:t(O).NUMERIC,label:"% IRPF",id:"extraTaxPercentatge",modelValue:t(e).extraTaxPercentatge,"onUpdate:modelValue":[o[12]||(o[12]=r=>t(e).extraTaxPercentatge=r),o[13]||(o[13]=r=>_())]},null,8,["type","modelValue"])]),n("div",Ue,[l(j,{type:t(O).NUMERIC,label:"% Dto.",id:"discountPercentage",modelValue:t(e).discountPercentage,"onUpdate:modelValue":[o[14]||(o[14]=r=>t(e).discountPercentage=r),o[15]||(o[15]=r=>_())]},null,8,["type","modelValue"])])]),n("section",Ne,[n("div",Re,[Be,n("span",Me,k(t(e).baseAmount)+" €",1)]),n("div",$e,[Le,n("span",Oe,k(t(e).taxAmount)+" €",1)]),n("div",Ye,[je,n("span",ze,k(t(e).netAmount)+" €",1)])])])):z("",!0)])}}});const qe=ce(Ge,[["__scopeId","data-v-e2301218"]]),He={key:0},Je={class:"two-columns"},Ke=n("label",{class:"block text-900 mb-2"},"IVA",-1),Qe={class:"two-columns"},We=H({__name:"FormPurchaseInvoiceImport",props:{formAction:{},invoiceImport:{}},emits:["submit"],setup(C,{emit:T}){const v=C,V=J(),g=X(),e=te(()=>v.formAction===x.CREATE?"Afegir":"Modificar"),E=()=>{const a=V.masterData.taxes.find(c=>c.id===v.invoiceImport.taxId);if(a&&K.isNumber(v.invoiceImport.baseAmount)){const c=v.invoiceImport.baseAmount,m=c/100*a.percentatge,_=c+m;v.invoiceImport.baseAmount=c,v.invoiceImport.taxAmount=K.round(m,2),v.invoiceImport.netAmount=K.round(_,2)}},p=ne().shape({baseAmount:fe().required("L'import base és obligatori").min(1,"L'import base ha de ser un número positiu")}),s=M({result:!1,errors:{}}),D=()=>{const a=new le(p);s.value=a.validate(v.invoiceImport)},I=async()=>{if(D(),s.value.result)T("submit",v.invoiceImport);else{let a="";Object.entries(s.value.errors).forEach(c=>{a+=`${c[1].map(m=>m)}.   `}),g.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,c)=>{const m=y("BaseInput"),_=y("Dropdown"),Y=y("Button");return a.invoiceImport?(B(),q("form",He,[n("section",Je,[l(m,{class:$(["mb-2",{"p-invalid":s.value.errors.baseAmount}]),label:"Import Base",modelValue:a.invoiceImport.baseAmount,"onUpdate:modelValue":[c[0]||(c[0]=h=>a.invoiceImport.baseAmount=h),c[1]||(c[1]=h=>E())],type:t(O).CURRENCY},null,8,["modelValue","type","class"]),n("div",null,[Ke,l(_,{modelValue:a.invoiceImport.taxId,"onUpdate:modelValue":[c[2]||(c[2]=h=>a.invoiceImport.taxId=h),c[3]||(c[3]=h=>E())],editable:"",options:t(V).masterData.taxes,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])])]),n("section",Qe,[l(m,{class:"mb-2",label:"Import Impost",modelValue:a.invoiceImport.taxAmount,"onUpdate:modelValue":c[4]||(c[4]=h=>a.invoiceImport.taxAmount=h),type:t(O).CURRENCY,disabled:""},null,8,["modelValue","type"]),l(m,{class:"mb-2",label:"Total",modelValue:a.invoiceImport.netAmount,"onUpdate:modelValue":c[5]||(c[5]=h=>a.invoiceImport.netAmount=h),type:t(O).CURRENCY,disabled:""},null,8,["modelValue","type"])]),l(Y,{label:e.value,onClick:I,style:{float:"right"}},null,8,["label"])])):z("",!0)}}}),Xe=["onClick"],Ze=H({__name:"TablePurchaseInvoiceImports",props:{purchaseInvoiceImports:{}},emits:["add","edit","delete"],setup(C,{emit:T}){const v=C,V=J(),g=s=>{var I;const D=(I=V.masterData.taxes)==null?void 0:I.find(a=>a.id===s);if(D)return D.percentatge},e=()=>{var I;const s=(I=V.masterData.taxes)==null?void 0:I.find(a=>a.name.includes("21")),D={id:se(),baseAmount:null,taxId:s?s.id:"",taxAmount:0,netAmount:0,purchaseInvoiceId:""};T("add",D)},E=s=>{s.originalEvent.target.className.includes("grid_delete_column_button")||T("edit",s.data)},p=(s,D)=>{T("delete",D)};return(s,D)=>{const I=y("Button"),a=y("Column"),c=y("DataTable");return B(),G(c,{onRowClick:E,value:v.purchaseInvoiceImports,tableStyle:"min-width: 100%"},{default:f(()=>[l(I,{onClick:e,rounded:"",icon:t(W).PLUS,class:"grid_add_row_button",style:{"margin-right":"1.5rem"}},null,8,["icon"]),l(a,{field:"baseAmount",header:"Base",style:{width:"25%"}},{body:f(m=>[L(k(m.data.baseAmount)+" € ",1)]),_:1}),l(a,{field:"taxId",header:"% IVA",style:{width:"25%"}},{body:f(m=>[L(k(g(m.data.taxId)),1)]),_:1}),l(a,{field:"taxAmount",header:"Cuota IVA",style:{width:"25%"}},{body:f(m=>[L(k(m.data.taxAmount)+" € ",1)]),_:1}),l(a,{field:"netAmount",header:"Total",style:{width:"25%"}},{body:f(m=>[L(k(m.data.netAmount)+" € ",1)]),_:1}),l(a,{style:{width:"10%"}},{body:f(m=>[n("i",{class:$([t(W).TIMES,"grid_delete_column_button"]),onClick:_=>p(_,m.data)},null,10,Xe)]),_:1})]),_:1},8,["value"])}}}),mt=H({__name:"PurchaseInvoice",setup(C){const T=M(),v=M(x.EDIT),V=de(),g=me(),e=pe(),E=J(),p=oe(),{purchaseInvoice:s}=ee(p),D=te(()=>a.value===x.CREATE?"Introducció import":"Modificació import"),I=M(!1),a=M(x.EDIT),c=M(void 0),m=async()=>{let i="";await p.GetById(V.params.id),s.value?(v.value=x.EDIT,i=`Factura de compra: ${s.value.number}`,s.value.purchaseInvoiceDate=new Date(s.value.purchaseInvoiceDate)):(v.value=x.CREATE,p.setNewPurchaseInvoice(V.params.id),i="Alta de factures de compra",_()),e.setMenuItem({icon:W.POUND,backButtonVisible:!0,title:i})},_=()=>{var i,u,A;if(s.value){const w=(i=E.masterData.exercises)==null?void 0:i.find(R=>R.name===new Date().getFullYear().toString());w&&(s.value.exerciceId=w.id);const P=(u=E.masterData.series)==null?void 0:u.find(R=>R.name==="Nacional");P&&(s.value.purchaseInvoiceSerieId=P.id);const N=(A=E.masterData.statuses)==null?void 0:A.find(R=>R.name==="Nova");N&&(s.value.purchaseInvoiceStatusId=N.id)}};Q(async()=>{await m()});const Y=()=>{T.value.submitForm()},h=(i,u)=>{i===x.CREATE&&(u.id=se()),u.purchaseInvoiceId=s.value.id,c.value=u,a.value=i,I.value=!0},d=X(),o=async i=>{let u=!1,A="";i.purchaseInvoiceDate=ae(i.purchaseInvoiceDate),console.log(i.purchaseInvoiceDate),v.value===x.CREATE?(u=await p.Create(i),A=u?"Factura creada":"Error al crear la factura"):(u=await p.Update(i),A=u?"Factura actualizada":"Error al actualizar la factura"),d.add({life:5e3,severity:u?"success":"error",summary:A}),u&&g.back()},b=async i=>{var u;a.value===x.CREATE?(v.value===x.EDIT&&await p.CreateInvoiceImport(i),(u=s.value)==null||u.purchaseInvoiceImports.push(i)):a.value===x.EDIT&&v.value===x.EDIT&&await p.UpdateInvoiceImport(i),r()},F=async i=>{v.value===x.EDIT&&await p.DeleteInvoiceImport(i);const u=s.value.purchaseInvoiceImports.filter(A=>A.id!==i.id);s.value.purchaseInvoiceImports=u,r()},r=()=>{T.value.calcAmounts(),I.value=!1};return(i,u)=>{const A=y("Button"),w=y("TabPanel"),P=y("Column"),N=y("DataTable"),R=y("TabView"),re=y("Dialog");return B(),q(ve,null,[l(A,{label:"Guardar",class:"grid_add_row_button",onClick:Y}),l(R,null,{default:f(()=>[t(s)?(B(),G(w,{key:0,header:"Factura"},{default:f(()=>[l(qe,{ref_key:"purchaseInvoiceForm",ref:T,purchaseInvoice:t(s),onSubmit:o},null,8,["purchaseInvoice"]),l(R,null,{default:f(()=>[l(w,{header:"Imports"},{default:f(()=>[l(Ze,{"purchase-invoice-imports":t(s).purchaseInvoiceImports,onAdd:u[0]||(u[0]=S=>h(t(x).CREATE,S)),onEdit:u[1]||(u[1]=S=>h(t(x).EDIT,S)),onDelete:F},null,8,["purchase-invoice-imports"])]),_:1}),l(w,{header:"Venciments"},{default:f(()=>[l(N,{value:t(s).purchaseInvoiceDueDates,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"40vh",sortField:"dueDate",sortOrder:1},{default:f(()=>[l(P,{field:"dueDate",header:"Venciment",style:{width:"50%"},sortable:""},{body:f(S=>[L(k(t(Ie)(S.data.dueDate)),1)]),_:1}),l(P,{field:"amount",header:"Import",style:{width:"50%"}},{body:f(S=>[L(k(S.data.amount)+" € ",1)]),_:1})]),_:1},8,["value"])]),_:1})]),_:1})]),_:1})):z("",!0),l(w,{header:"Fitxers"},{default:f(()=>[t(s)?(B(),G(be,{key:0,title:"Factures",entity:"PurchaseInvoice",id:t(V).params.id},null,8,["id"])):z("",!0)]),_:1})]),_:1}),c.value?(B(),G(re,{key:0,closable:!0,visible:I.value,"onUpdate:visible":u[2]||(u[2]=S=>I.value=S),header:D.value,position:"bottom"},{default:f(()=>[l(We,{formAction:a.value,invoiceImport:c.value,onSubmit:b},null,8,["formAction","invoiceImport"])]),_:1},8,["visible","header"])):z("",!0)],64)}}});export{mt as default};
