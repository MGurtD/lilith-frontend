import{d as q,j as G,z as X,o as H,r as N,h as y,a as I,c as C,i as l,k as t,e as o,s as g,y as S,n as U,l as x,p as ie,b as ne,f as re,m as J,w as h,L as de,C as ce,D as k,P,v as ue,u as me,H as pe,E as fe,F as T,I as ve}from"./index-70c82e0d.js";import{u as K}from"./receipt-3eaba3ef.js";import{u as be}from"./suppliers-943c2710.js";import{u as Y}from"./lifecycle-62967f91.js";import{c as Z,a as A,F as ee,d as _e}from"./form-validator-a9accb8c.js";import{c as ye,f as L,g as M}from"./functions-8d6e0d81.js";import{u as he}from"./masterData-a81ea1fb.js";import{u as te}from"./reference-54a3cecc.js";import{_ as we}from"./FormReference.vue_vue_type_script_setup_true_lang-24f291f4.js";import"./index-47bd9de7.js";import"./base.service-c65b9c29.js";import"./suppliers.service-ca312c5e.js";import"./index-be7f1ff3.js";import"./reference.service-1c3138d7.js";import"./v4-a960c1f4.js";import"./FileEntityPicker-233fcd50.js";import"./file.service-abbe2e5e.js";import"./tax-1c26ae20.js";const B=w=>(ie("data-v-0e818ff6"),w=w(),ne(),w),Ve=B(()=>o("br",null,null,-1)),Ie={key:0},Re={class:"three-columns"},De={class:"mt-1"},ge={class:"mt-1"},Se=B(()=>o("label",{class:"block text-900 mb-2"},"Exercici",-1)),Ce={class:"mt-1"},ke=B(()=>o("label",{class:"block text-900 mb-2"},"Data Albarà",-1)),Ee={class:"three-columns"},$e={class:"mt-1"},Te=B(()=>o("label",{class:"block text-900 mb-2"},"Estat",-1)),Ne={class:"mt-1"},Ue=B(()=>o("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),xe={class:"mt-1"},Be=q({__name:"FormReceipt",emits:["submit","cancel"],setup(w,{expose:R,emit:V}){const f=K(),v=be(),m=he(),i=Y(),d=G(),{receipt:r}=X(f);H(async()=>{await m.fetchMasterData(),await v.fetchSuppliers(),await i.fetchOneByName("Receipts")});const p=Z().shape({supplierId:A().required("El client es obligatori"),statusId:A().required("L'estat es obligatori"),exerciseId:A().required("L'exercici es obligatori")}),a=N({result:!1,errors:{}}),c=()=>{const _=new ee(p);a.value=_.validate(r.value)},u=async()=>{if(c(),a.value.result)r.value.date=ye(r.value.date),V("submit",r.value);else{let _="";Object.entries(a.value.errors).forEach(e=>{_+=`${e[1].map(E=>E)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:_,life:5e3})}};return R({submitForm:u}),(_,e)=>{var F;const E=y("Button"),$=y("Dropdown"),z=y("Calendar");return I(),C("div",null,[l(E,{label:"Guardar",size:"small",class:"grid_add_row_button",onClick:u}),Ve,t(r)?(I(),C("form",Ie,[o("section",Re,[o("div",De,[l(S,{type:t(g).TEXT,label:"Número",id:"number",modelValue:t(r).number,"onUpdate:modelValue":e[0]||(e[0]=b=>t(r).number=b),disabled:""},null,8,["type","modelValue"])]),o("div",ge,[Se,l($,{modelValue:t(r).exerciseId,"onUpdate:modelValue":e[1]||(e[1]=b=>t(r).exerciseId=b),editable:"",options:t(m).exercises,optionValue:"id",optionLabel:"name",class:U(["w-full",{"p-invalid":a.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),o("div",Ce,[ke,l(z,{modelValue:t(r).date,"onUpdate:modelValue":e[2]||(e[2]=b=>t(r).date=b),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),o("section",Ee,[o("div",$e,[Te,l($,{modelValue:t(r).statusId,"onUpdate:modelValue":e[3]||(e[3]=b=>t(r).statusId=b),editable:"",options:(F=t(i).lifecycle)==null?void 0:F.statuses,optionValue:"id",optionLabel:"name",class:U(["w-full",{"p-invalid":a.value.errors.statusId}])},null,8,["modelValue","options","class"])]),o("div",Ne,[Ue,l($,{modelValue:t(r).supplierId,"onUpdate:modelValue":e[4]||(e[4]=b=>t(r).supplierId=b),editable:"",options:t(v).suppliers,optionValue:"id",optionLabel:"comercialName",class:U(["w-full",{"p-invalid":a.value.errors.customerId}])},null,8,["modelValue","options","class"])]),o("div",xe,[l(S,{type:t(g).TEXT,label:"Número Proveïdor",id:"supplierNumber",modelValue:t(r).supplierNumber,"onUpdate:modelValue":e[5]||(e[5]=b=>t(r).supplierNumber=b)},null,8,["type","modelValue"])])])])):x("",!0)])}}});const Fe=re(Be,[["__scopeId","data-v-0e818ff6"]]),Le=["onClick"],Me=q({__name:"TableReceiptDetails",props:{details:{}},emits:["edit","delete"],setup(w,{emit:R}){const V=w,f=m=>{m.originalEvent.target.className.includes("grid_delete_column_button")||R("edit",m.data)},v=(m,i)=>{R("delete",i)};return(m,i)=>{const d=y("Column"),r=y("DataTable");return I(),J(r,{onRowClick:f,value:V.details,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:h(()=>[de(m.$slots,"header")]),default:h(()=>[l(d,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),l(d,{header:"Material",style:{width:"25%"}},{body:h(p=>[ce(k(p.data.reference.code)+" ("+k(p.data.reference.version)+") - "+k(p.data.reference.description),1)]),_:1}),l(d,{field:"width",header:"Amplada",style:{width:"10%"}}),l(d,{field:"height",header:"Alçada",style:{width:"10%"}}),l(d,{field:"lenght",header:"Longitud",style:{width:"10%"}}),l(d,{field:"diameter",header:"Diàmetre",style:{width:"10%"}}),l(d,{style:{width:"10%"}},{body:h(p=>[p.data.stockMovementId===null?(I(),C("i",{key:0,class:U([t(P).TIMES,"grid_delete_column_button"]),onClick:a=>v(a,p.data)},null,10,Le)):x("",!0)]),_:1})]),_:3},8,["value"])}}}),Ae={key:0},qe={class:"two-columns-7525"},ze=o("label",{class:"block text-900 mb-2"},"Material",-1),Oe={key:0,class:"flex align-items-center"},je={class:"four-columns"},Pe={class:"mt-2"},Ge={class:"mt-2"},Qe={class:"mt-2"},We={class:"mt-2"},Xe=q({__name:"FormReceiptDetail",props:{detail:{}},emits:["submit","cancel"],setup(w,{emit:R}){const V=w,f=G(),v=te(),m=()=>{V.detail},i=Z().shape({quantity:_e().min(1).required("La quantitat ha de ser superior a 1"),referenceId:A().required("La referencia és obligatoria")}),d=N({result:!1,errors:{}}),r=()=>{const a=new ee(i);d.value=a.validate(V.detail)},p=async()=>{if(r(),d.value.result)R("submit",V.detail);else{let a="";Object.entries(d.value.errors).forEach(c=>{a+=`${c[1].map(u=>u)}.   `}),f.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,c)=>{const u=y("Dropdown"),_=y("Button");return a.detail?(I(),C("form",Ae,[o("section",qe,[o("div",null,[ze,l(u,{modelValue:a.detail.referenceId,"onUpdate:modelValue":c[0]||(c[0]=e=>a.detail.referenceId=e),editable:"",options:t(v).references,optionValue:"id",optionLabel:"description",class:U(["w-full",{"p-invalid":d.value.errors.referenceId}])},{option:h(e=>[e.option?(I(),C("div",Oe,k(e.option.code)+" ("+k(e.option.version)+") - "+k(e.option.description),1)):x("",!0)]),_:1},8,["modelValue","options","class"])]),o("div",null,[l(S,{type:t(g).NUMERIC,label:"Quantitat",modelValue:a.detail.quantity,"onUpdate:modelValue":[c[1]||(c[1]=e=>a.detail.quantity=e),m]},null,8,["type","modelValue"])])]),o("section",je,[o("div",Pe,[l(S,{type:t(g).NUMERIC,label:"Amplada",decimals:2,modelValue:a.detail.width,"onUpdate:modelValue":c[2]||(c[2]=e=>a.detail.width=e)},null,8,["type","modelValue"])]),o("div",Ge,[l(S,{type:t(g).NUMERIC,decimals:2,label:"Alçada",modelValue:a.detail.height,"onUpdate:modelValue":c[3]||(c[3]=e=>a.detail.height=e)},null,8,["type","modelValue"])]),o("div",Qe,[l(S,{type:t(g).NUMERIC,decimals:2,label:"Longitud",modelValue:a.detail.lenght,"onUpdate:modelValue":c[4]||(c[4]=e=>a.detail.lenght=e)},null,8,["type","modelValue"])]),o("div",We,[l(S,{type:t(g).NUMERIC,decimals:2,label:"Diàmetre",modelValue:a.detail.diameter,"onUpdate:modelValue":c[5]||(c[5]=e=>a.detail.diameter=e)},null,8,["type","modelValue"])])]),l(_,{label:"Crear",onClick:p,style:{float:"right"},size:"small",class:"mt-2"})])):x("",!0)}}}),He={key:0},Je=o("br",null,null,-1),Ke={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ye=o("span",{class:"text-xl text-900 font-bold"},"Detall de l'albarà",-1),Ze={key:1},yt=q({__name:"Receipt",setup(w){const R=ue(),V=me(),f=te(),v=K(),m=Y(),{receipt:i}=X(v),d=N(0),r=async()=>{var s;await v.fetchReceipt(R.params.id),m.fetchOneByName("Receipts"),f.fetchReferencesByModule("purchase"),i.value&&(i.value.date=L(i.value.date)),V.setMenuItem({icon:P.BUILDING,title:`Albarà de recepció ${(s=i.value)==null?void 0:s.number}`,backButtonVisible:!0})};H(async()=>{await r()});const p=G(),a=pe(()=>{var n;if(!m.lifecycle)return!1;const s=m.lifecycle.statuses.find(D=>D.name==="Recepcionat");return s?((n=i.value)==null?void 0:n.statusId)===s.id:!1}),c=async()=>{let s=!1,n="";i.value&&(s=await v.updateReceipt(i.value.id,i.value),n="Albarà actualizat correctament",s&&(p.add({severity:"success",summary:n,life:5e3}),ve.back()))},u=fe({visible:!1,title:"Linea",closable:!0,position:"center",modal:!0}),_=N(T.CREATE),e=N({}),E=()=>{_.value=T.CREATE,e.value={id:M(),receiptId:i.value.id,amount:0,diameter:0,height:0,kilogramPrice:0,lenght:0,quantity:1,thickness:0,totalWeight:0,unitPrice:0,unitWeight:0,width:0,disabled:!1},f.setNewReference(M()),u.title="Crear línia",u.visible=!0},$=s=>{_.value=T.EDIT,e.value=s,f.setNewReference(M()),u.title="Modificar línia",u.visible=!0},z=s=>{_.value===T.CREATE?F(s):_.value===T.EDIT&&b(s),u.visible=!1},F=async s=>{const n=await v.createReceiptDetail(s);i.value.date=L(i.value.date),n.result||O(n)},b=async s=>{const n=await v.updateReceiptDetail(s.id,s);i.value.date=L(i.value.date),n.result||O(n)},ae=async s=>{const n=await v.deleteReceiptDetail(s.id);i.value.date=L(i.value.date),n.result||O(n)},O=s=>{p.add({severity:"error",summary:s.errors[0],life:1e4,closable:!0})},le=async s=>{let n=!1,D="";n=await f.createReference(s),n?D="Referència creada correctament":D="La referència + versió introduïda ja existeix",p.add({severity:n?"success":"warn",summary:D,life:5e3}),n&&(e.value.referenceId=s.id,d.value=0,f.setNewReference(M()))};return(s,n)=>{var W;const D=y("Button"),Q=y("TabPanel"),se=y("TabView"),oe=y("Dialog");return t(i)?(I(),C("main",He,[l(Fe,{onSubmit:c}),Je,l(Me,{details:(W=t(i))==null?void 0:W.details,onEdit:$,onDelete:ae},{header:h(()=>[o("div",Ke,[Ye,o("div",null,[l(D,{size:"small",icon:t(P).PLUS,rounded:"",disabled:a.value,onClick:E},null,8,["icon","disabled"])])])]),_:1},8,["details"]),l(oe,{visible:u.visible,"onUpdate:visible":n[1]||(n[1]=j=>u.visible=j),header:u.title,closable:u.closable,modal:u.modal},{default:h(()=>[l(se,{activeIndex:d.value,"onUpdate:activeIndex":n[0]||(n[0]=j=>d.value=j)},{default:h(()=>[l(Q,{header:"Línea"},{default:h(()=>[l(Xe,{detail:e.value,onSubmit:z},null,8,["detail"])]),_:1}),l(Q,{header:"Referencia"},{default:h(()=>[t(f).reference?(I(),J(we,{key:0,module:"purchase",reference:t(f).reference,onSubmit:le},null,8,["reference"])):x("",!0)]),_:1})]),_:1},8,["activeIndex"])]),_:1},8,["visible","header","closable","modal"])])):(I(),C("main",Ze,"Carregant albarà ..."))}}});export{yt as default};