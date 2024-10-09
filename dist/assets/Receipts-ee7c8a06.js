import{_ as j}from"./FormCreatePurchaseDocument.vue_vue_type_script_setup_true_lang-8a9893fc.js";import{_ as H}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-ea172d41.js";import{d as Y,j as z,x as G,g as J,u as K,E as Q,r as C,K as W,o as X,P as m,O as R,h as f,c as D,e as n,i as s,w as c,k as o,L as Z,a as N,G as w,H as g,I as ee,n as te,l as se,J as ae}from"./index-77e4d88f.js";import{u as ie}from"./receipt-3252b3d3.js";import{u as re}from"./suppliers-a660c695.js";import{u as oe}from"./lifecycle-7ace1220.js";import"./form-validator-7d52d458.js";import"./index-4faf08dc.js";import"./suppliers.service-05c90099.js";const le={class:"flex flex-wrap align-items-center justify-content-between gap-2"},ce={class:"datatable-filter"},ne={class:"filter-field"},de={class:"filter-field"},ue=n("label",{class:"block text-900 mb-2"},"Proveïdor",-1),pe={class:"datatable-buttons"},me=["onClick"],Ie=Y({__name:"Receipts",setup(fe){const S=z(),E=G(),I=J(),r=K(),_=oe(),p=ie(),y=re(),x=Q(),b=C({supplierId:void 0,exercise:void 0}),d=W({visible:!1,title:"Crear albarà",closable:!0,position:"center",modal:!0});X(async()=>{r.setMenuItem({icon:m.MONEY_BILL,title:"Albarans de compra"}),y.fetchSuppliers(),_.fetchOneByName("Receipts"),await x.fetchActive(),await p.fetchReceipts(),P(),await v()});const P=()=>{var i;const t=new Date().getFullYear().toString(),e=(i=x.exercises)==null?void 0:i.find(l=>l.name===t);e&&(r.exercisePicker.exercise=e,r.exercisePicker.dates=[new Date(r.exercisePicker.exercise.startDate),new Date(r.exercisePicker.exercise.endDate)])},B=()=>{r.cleanExercisePicker(),b.value.supplierId=void 0},v=async()=>{if(r.exercisePicker.dates){const t=R(r.exercisePicker.dates[0]),e=R(r.exercisePicker.dates[1]);await p.fetchFiltered(t,e,b.value.supplierId)}else S.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},T=t=>{var i;const e=(i=y.suppliers)==null?void 0:i.find(l=>l.id===t);return e?e.comercialName:""},L=t=>{if(_.lifecycle){const e=_.lifecycle.statuses.find(i=>i.id===t);if(e)return e.name}return""},F=()=>{h.value=V(),d.visible=!0},h=C({}),V=()=>({id:ae(),supplierId:"",exerciseId:"",date:new Date}),q=async()=>{await p.createReceipt(h.value)&&I.push({path:`/receipts/${h.value.id}`})},M=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||I.push({path:`/receipts/${t.data.id}`})},$=(t,e)=>{E.require({target:t.currentTarget,message:`Està segur que vol eliminar l'albarà ${e.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await p.deleteReceipt(e.id)&&(S.add({severity:"success",summary:"Eliminat",life:3e3}),await v())}})};return(t,e)=>{const i=f("Dropdown"),l=f("Button"),u=f("Column"),A=f("DataTable"),O=f("Dialog");return N(),D(Z,null,[n("div",null,[s(A,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",sortMode:"multiple",value:o(p).receipts,onRowClick:M},{header:c(()=>[n("div",le,[n("div",ce,[n("div",ne,[s(H,{exercises:o(x).exercises,onRangeSelected:v},null,8,["exercises"])]),n("div",de,[ue,s(i,{modelValue:b.value.supplierId,"onUpdate:modelValue":e[0]||(e[0]=a=>b.value.supplierId=a),editable:"",options:o(y).suppliers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),n("div",pe,[s(l,{class:"datatable-button mr-2",icon:o(m).FILTER,rounded:"",raised:"",onClick:v},null,8,["icon"]),s(l,{class:"datatable-button mr-2",icon:o(m).FILTER_SLASH,rounded:"",raised:"",onClick:B},null,8,["icon"]),s(l,{icon:o(m).PLUS,rounded:"",raised:"",onClick:F},null,8,["icon"])])])]),default:c(()=>[s(u,{field:"number",header:"Número",sortable:!0,style:{width:"10%"}}),s(u,{header:"Data",field:"date",sortable:"",style:{width:"10%"}},{body:c(a=>[w(g(o(ee)(a.data.date)),1)]),_:1}),s(u,{header:"Proveïdor",style:{width:"15%"}},{body:c(a=>[w(g(T(a.data.supplierId)),1)]),_:1}),s(u,{header:"Número Albarà",style:{width:"15%"},field:"supplierNumber"}),s(u,{header:"Estat",style:{width:"15%"}},{body:c(a=>[w(g(L(a.data.statusId)),1)]),_:1}),s(u,{style:{width:"5%"}},{body:c(a=>{var k;return[((k=o(_).lifecycle)==null?void 0:k.initialStatusId)===a.data.statusId?(N(),D("i",{key:0,class:te([o(m).TIMES,"grid_delete_column_button"]),onClick:U=>$(U,a.data)},null,10,me)):se("",!0)]}),_:1})]),_:1},8,["value"])]),s(O,{visible:d.visible,"onUpdate:visible":e[1]||(e[1]=a=>d.visible=a),header:d.title,closable:d.closable,modal:d.modal},{default:c(()=>[s(j,{"create-request":h.value,onSubmit:q},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{Ie as default};