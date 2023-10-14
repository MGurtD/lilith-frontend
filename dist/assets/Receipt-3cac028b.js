import{d as B,j as M,z,o as O,r as F,h as v,a as I,c as E,i as s,k as l,e as o,s as w,y as D,n as T,l as A,p as X,b as H,f as K,m as Z,w as g,J as ee,C as te,D as C,P as L,v as ae,u as le,E as oe,F as k}from"./index-ecb5eec1.js";import{u as j}from"./receipt-17a5a213.js";import{u as se}from"./suppliers-ef02017c.js";import{u as ie}from"./lifecycle-4274f2e8.js";import{c as Y,a as N,F as G,d as ne}from"./form-validator-1d21b93c.js";import{c as re,f as de,b as ue,g as ce}from"./functions-781c12cd.js";import{u as me}from"./masterData-ae795e3d.js";import{u as J}from"./reference-b28c3841.js";import"./index-004550a4.js";import"./base.service-88077886.js";import"./suppliers.service-a167caf7.js";import"./index-9785c663.js";import"./v4-a960c1f4.js";import"./reference.service-65331f94.js";const U=f=>(X("data-v-0e818ff6"),f=f(),H(),f),pe=U(()=>o("br",null,null,-1)),fe={key:0},be={class:"three-columns"},_e={class:"mt-1"},ve={class:"mt-1"},he=U(()=>o("label",{class:"block text-900 mb-2"},"Exercici",-1)),ye={class:"mt-1"},Ve=U(()=>o("label",{class:"block text-900 mb-2"},"Data Albarà",-1)),we={class:"three-columns"},De={class:"mt-1"},ge=U(()=>o("label",{class:"block text-900 mb-2"},"Estat",-1)),Ie={class:"mt-1"},Re=U(()=>o("label",{class:"block text-900 mb-2"},"Proveïdor",-1)),Ce={class:"mt-1"},Ee=B({__name:"FormReceipt",emits:["submit","cancel"],setup(f,{expose:h,emit:b}){const V=j(),m=se(),n=me(),p=ie(),u=M(),{receipt:i}=z(V);O(async()=>{await n.fetchMasterData(),await m.fetchSuppliers(),await p.fetchOneByName("Receipts")});const r=Y().shape({supplierId:N().required("El client es obligatori"),statusId:N().required("L'estat es obligatori"),exerciseId:N().required("L'exercici es obligatori")}),t=F({result:!1,errors:{}}),d=()=>{const _=new G(r);t.value=_.validate(i.value)},y=async()=>{if(d(),t.value.result)i.value.date=re(i.value.date),b("submit",i.value);else{let _="";Object.entries(t.value.errors).forEach(e=>{_+=`${e[1].map(S=>S)}.   `}),u.add({severity:"warn",summary:"Formulari inválid",detail:_,life:5e3})}};return h({submitForm:y}),(_,e)=>{var R;const S=v("Button"),$=v("Dropdown"),x=v("Calendar");return I(),E("div",null,[s(S,{label:"Guardar",size:"small",class:"grid_add_row_button",onClick:y}),pe,l(i)?(I(),E("form",fe,[o("section",be,[o("div",_e,[s(D,{type:l(w).TEXT,label:"Número",id:"number",modelValue:l(i).number,"onUpdate:modelValue":e[0]||(e[0]=a=>l(i).number=a),disabled:""},null,8,["type","modelValue"])]),o("div",ve,[he,s($,{modelValue:l(i).exerciseId,"onUpdate:modelValue":e[1]||(e[1]=a=>l(i).exerciseId=a),editable:"",options:l(n).exercises,optionValue:"id",optionLabel:"name",class:T(["w-full",{"p-invalid":t.value.errors.exerciseId}])},null,8,["modelValue","options","class"])]),o("div",ye,[Ve,s(x,{modelValue:l(i).date,"onUpdate:modelValue":e[2]||(e[2]=a=>l(i).date=a),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),o("section",we,[o("div",De,[ge,s($,{modelValue:l(i).statusId,"onUpdate:modelValue":e[3]||(e[3]=a=>l(i).statusId=a),editable:"",options:(R=l(p).lifecycle)==null?void 0:R.statuses,optionValue:"id",optionLabel:"name",class:T(["w-full",{"p-invalid":t.value.errors.statusId}])},null,8,["modelValue","options","class"])]),o("div",Ie,[Re,s($,{modelValue:l(i).supplierId,"onUpdate:modelValue":e[4]||(e[4]=a=>l(i).supplierId=a),editable:"",options:l(m).suppliers,optionValue:"id",optionLabel:"comercialName",class:T(["w-full",{"p-invalid":t.value.errors.customerId}])},null,8,["modelValue","options","class"])]),o("div",Ce,[s(D,{type:l(w).TEXT,label:"Número Proveïdor",id:"supplierNumber",modelValue:l(i).supplierNumber,"onUpdate:modelValue":e[5]||(e[5]=a=>l(i).supplierNumber=a)},null,8,["type","modelValue"])])])])):A("",!0)])}}});const Se=K(Ee,[["__scopeId","data-v-0e818ff6"]]),$e=["onClick"],ke=B({__name:"TableReceiptDetails",props:{details:{}},emits:["edit","delete"],setup(f,{emit:h}){const b=f,V=n=>{n.originalEvent.target.className.includes("grid_delete_column_button")||h("edit",n.data)},m=(n,p)=>{h("delete",p)};return(n,p)=>{const u=v("Column"),i=v("DataTable");return I(),Z(i,{onRowClick:V,value:b.details,tableStyle:"min-width: 100%",class:"p-datatable-sm"},{header:g(()=>[ee(n.$slots,"header")]),default:g(()=>[s(u,{field:"quantity",header:"Quantitat",style:{width:"10%"}}),s(u,{header:"Referencia",style:{width:"25%"}},{body:g(r=>[te(C(r.data.reference.code)+" ("+C(r.data.reference.version)+") - "+C(r.data.reference.description),1)]),_:1}),s(u,{field:"width",header:"Amplada",style:{width:"10%"}}),s(u,{field:"height",header:"Alçada",style:{width:"10%"}}),s(u,{field:"lenght",header:"Longitud",style:{width:"10%"}}),s(u,{field:"diameter",header:"Diàmetre",style:{width:"10%"}}),s(u,{style:{width:"10%"}},{body:g(r=>[o("i",{class:T([l(L).TIMES,"grid_delete_column_button"]),onClick:t=>m(t,r.data)},null,10,$e)]),_:1})]),_:3},8,["value"])}}}),Te={key:0},Ue={class:"two-columns-7525"},Ne=o("label",{class:"block text-900 mb-2"},"Referència",-1),Fe={key:0,class:"flex align-items-center"},Be={class:"four-columns"},xe={class:"mt-2"},Ae={class:"mt-2"},Le={class:"mt-2"},Me={class:"mt-2"},qe=B({__name:"FormReceiptDetail",props:{detail:{}},emits:["submit","cancel"],setup(f,{emit:h}){const b=f,V=M(),m=J(),n=()=>{b.detail},p=Y().shape({quantity:ne().min(1).required("La quantitat ha de ser superior a 1"),referenceId:N().required("La referencia és obligatoria")}),u=F({result:!1,errors:{}}),i=()=>{const t=new G(p);u.value=t.validate(b.detail)},r=async()=>{if(i(),u.value.result)h("submit",b.detail);else{let t="";Object.entries(u.value.errors).forEach(d=>{t+=`${d[1].map(y=>y)}.   `}),V.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,d)=>{const y=v("Dropdown"),_=v("Button");return t.detail?(I(),E("form",Te,[o("section",Ue,[o("div",null,[Ne,s(y,{modelValue:t.detail.referenceId,"onUpdate:modelValue":d[0]||(d[0]=e=>t.detail.referenceId=e),editable:"",options:l(m).references,optionValue:"id",optionLabel:"description",class:T(["w-full",{"p-invalid":u.value.errors.referenceId}])},{option:g(e=>[e.option?(I(),E("div",Fe,C(e.option.code)+" ("+C(e.option.version)+") - "+C(e.option.description),1)):A("",!0)]),_:1},8,["modelValue","options","class"])]),o("div",null,[s(D,{type:l(w).NUMERIC,label:"Quantitat",modelValue:t.detail.quantity,"onUpdate:modelValue":[d[1]||(d[1]=e=>t.detail.quantity=e),n]},null,8,["type","modelValue"])])]),o("section",Be,[o("div",xe,[s(D,{type:l(w).NUMERIC,label:"Amplada",modelValue:t.detail.width,"onUpdate:modelValue":d[2]||(d[2]=e=>t.detail.width=e)},null,8,["type","modelValue"])]),o("div",Ae,[s(D,{type:l(w).NUMERIC,label:"Alçada",modelValue:t.detail.height,"onUpdate:modelValue":d[3]||(d[3]=e=>t.detail.height=e)},null,8,["type","modelValue"])]),o("div",Le,[s(D,{type:l(w).NUMERIC,label:"Longitud",modelValue:t.detail.lenght,"onUpdate:modelValue":d[4]||(d[4]=e=>t.detail.lenght=e)},null,8,["type","modelValue"])]),o("div",Me,[s(D,{type:l(w).NUMERIC,label:"Diàmetre",modelValue:t.detail.diameter,"onUpdate:modelValue":d[5]||(d[5]=e=>t.detail.diameter=e)},null,8,["type","modelValue"])])]),s(_,{label:"Crear",onClick:r,style:{float:"right"},size:"small",class:"mt-2"})])):A("",!0)}}}),ze={key:0},Oe=o("br",null,null,-1),je={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ye=o("span",{class:"text-xl text-900 font-bold"},"Detall de l'albarà",-1),Ge={key:1},it=B({__name:"Receipt",setup(f){const h=ae(),b=le(),V=J(),m=j(),{receipt:n}=z(m),p=async()=>{var a;await m.fetchReceipt(h.params.id),V.fetchReferences(),n.value.date=de(n.value.date),b.setMenuItem({icon:L.BUILDING,title:`Albarà de recepció ${(a=n.value)==null?void 0:a.number}`,backButtonVisible:!0})};O(async()=>{await p()});const u=M(),i=async()=>{let a=!1,c="";n.value&&(n.value.date=ue(n.value.date),a=await m.updateReceipt(n.value.id,n.value),c="Albarà actualizat correctament",a&&(u.add({severity:"success",summary:c,life:5e3}),await p()))},r=oe({visible:!1,title:"Crear detall",closable:!0,position:"center",modal:!0}),t=F(k.CREATE),d=F({}),y=()=>{t.value=k.CREATE,d.value={id:ce(),receiptId:n.value.id,amount:0,diameter:0,height:0,kilogramPrice:0,lenght:0,quantity:1,thickness:0,totalWeight:0,unitPrice:0,unitWeight:0,width:0,disabled:!1},r.title="Crear detall",r.visible=!0},_=a=>{t.value=k.EDIT,d.value=a,r.title="Modificar detall",r.visible=!0},e=a=>{t.value===k.CREATE?S(a):t.value===k.EDIT&&$(a),r.visible=!1},S=async a=>{const c=await m.createReceiptDetail(a);c.result||R(c)},$=async a=>{const c=await m.updateReceiptDetail(a.id,a);c.result||R(c)},x=async a=>{const c=await m.deleteReceiptDetail(a.id);c.result||R(c)},R=a=>{u.add({severity:"error",summary:a.errors[0],life:1e4})};return(a,c)=>{var q;const P=v("Button"),Q=v("Dialog");return l(n)?(I(),E("main",ze,[s(Se,{onSubmit:i}),Oe,s(ke,{details:(q=l(n))==null?void 0:q.details,onEdit:_,onDelete:x},{header:g(()=>[o("div",je,[Ye,o("div",null,[s(P,{size:"small",icon:l(L).PLUS,rounded:"",onClick:y},null,8,["icon"])])])]),_:1},8,["details"]),s(Q,{visible:r.visible,"onUpdate:visible":c[0]||(c[0]=W=>r.visible=W),header:r.title,closable:r.closable,modal:r.modal},{default:g(()=>[s(qe,{detail:d.value,onSubmit:e},null,8,["detail"])]),_:1},8,["visible","header","closable","modal"])])):(I(),E("main",Ge,"Carregant albarà ..."))}}});export{it as default};