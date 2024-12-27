import{_ as H}from"./FormCreatePurchaseDocument.vue_vue_type_script_setup_true_lang-903b9276.js";import{_ as Y}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-b78d4484.js";import{d as A,j as z,x as G,g as J,u as K,E as Q,r as C,K as W,o as X,P as p,O as D,h as f,c as N,e as c,i as s,w as n,k as i,L as Z,a as P,G as g,H as w,I as ee,n as te,l as se,J as ae}from"./index-3259d18c.js";import{u as ie}from"./order-a19cd42b.js";import{u as re}from"./suppliers-18e88513.js";import{u as oe}from"./lifecycle-5421a50b.js";import"./form-validator-74a9b5a3.js";import"./index-15b73d09.js";import"./suppliers.service-9d62a9c5.js";const le={class:"flex flex-wrap align-items-center justify-content-between gap-2"},ne={class:"datatable-filter"},ce={class:"filter-field"},de={class:"filter-field"},ue=c("label",{class:"block text-900 mb-2"},"Proveïdor",-1),me={class:"datatable-buttons"},pe=["onClick"],Ie=A({__name:"Orders",setup(fe){const S=z(),E=G(),I=J(),o=K(),y=re(),x=Q(),_=oe(),d=ie(),b=C({supplierId:void 0,exercise:void 0}),u=W({visible:!1,title:"Crear comanda",closable:!0,position:"center",modal:!0});X(async()=>{o.setMenuItem({icon:p.MONEY_BILL,title:"Comandes de compra"}),y.fetchSuppliers(),await x.fetchActive(),await _.fetchOneByName("PurchaseOrder"),B(),await v()});const B=()=>{var r;const t=new Date().getFullYear().toString(),e=(r=x.exercises)==null?void 0:r.find(l=>l.name===t);e&&(o.exercisePicker.exercise=e,o.exercisePicker.dates=[new Date(o.exercisePicker.exercise.startDate),new Date(o.exercisePicker.exercise.endDate)])},T=()=>{o.cleanExercisePicker(),b.value.supplierId=void 0},v=async()=>{if(o.exercisePicker.dates){const t=D(o.exercisePicker.dates[0]),e=D(o.exercisePicker.dates[1]);await d.fetchFiltered(t,e,b.value.supplierId)}else S.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},L=t=>{var r;const e=(r=y.suppliers)==null?void 0:r.find(l=>l.id===t);return e?e.comercialName:""},F=t=>{if(_.lifecycle){const e=_.lifecycle.statuses.find(r=>r.id===t);if(e)return e.name}return""},V=()=>{h.value=q(),u.visible=!0},h=C({}),q=()=>({id:ae(),supplierId:"",exerciseId:"",date:new Date}),O=async()=>{await d.create(h.value)&&I.push({path:`/purchase-orders/${h.value.id}`})},R=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||I.push({path:`/purchase-orders/${t.data.id}`})},M=(t,e)=>{E.require({target:t.currentTarget,message:`Està segur que vol eliminar la comanda ${e.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await d.delete(e.id)&&(S.add({severity:"success",summary:"Eliminat",life:3e3}),await v())}})};return(t,e)=>{const r=f("Dropdown"),l=f("Button"),m=f("Column"),$=f("DataTable"),U=f("Dialog");return P(),N(Z,null,[c("div",null,[s($,{class:"p-datatable-sm small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",paginator:i(d).orders&&i(d).orders.length>20,rows:20,value:i(d).orders,onRowClick:R},{header:n(()=>[c("div",le,[c("div",ne,[c("div",ce,[s(Y,{exercises:i(x).exercises,onRangeSelected:v},null,8,["exercises"])]),c("div",de,[ue,s(r,{modelValue:b.value.supplierId,"onUpdate:modelValue":e[0]||(e[0]=a=>b.value.supplierId=a),editable:"",options:i(y).suppliers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),c("div",me,[s(l,{class:"datatable-button mr-2",icon:i(p).FILTER,rounded:"",raised:"",onClick:v},null,8,["icon"]),s(l,{class:"datatable-button mr-2",icon:i(p).FILTER_SLASH,rounded:"",raised:"",onClick:T},null,8,["icon"]),s(l,{icon:i(p).PLUS,rounded:"",raised:"",onClick:V},null,8,["icon"])])])]),default:n(()=>[s(m,{field:"number",header:"Número",sortable:!0,style:{width:"10%"}}),s(m,{header:"Data",field:"date",sortable:"",style:{width:"10%"}},{body:n(a=>[g(w(i(ee)(a.data.date)),1)]),_:1}),s(m,{header:"Proveïdor",style:{width:"15%"}},{body:n(a=>[g(w(L(a.data.supplierId)),1)]),_:1}),s(m,{header:"Estat",style:{width:"15%"}},{body:n(a=>[g(w(F(a.data.statusId)),1)]),_:1}),s(m,{style:{width:"5%"}},{body:n(a=>{var k;return[((k=i(_).lifecycle)==null?void 0:k.initialStatusId)===a.data.statusId?(P(),N("i",{key:0,class:te([i(p).TIMES,"grid_delete_column_button"]),onClick:j=>M(j,a.data)},null,10,pe)):se("",!0)]}),_:1})]),_:1},8,["paginator","value"])]),s(U,{visible:u.visible,"onUpdate:visible":e[1]||(e[1]=a=>u.visible=a),header:u.title,closable:u.closable,modal:u.modal},{default:n(()=>[s(H,{"create-request":h.value,onSubmit:O},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{Ie as default};