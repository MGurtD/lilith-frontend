import{d as z,x as de,h as f,a as _,m as N,w as m,Q as ue,i as l,G as C,H as h,k as e,R as F,c as R,n as j,P as U,l as k,j as K,C as Q,r as V,e as p,s as q,D as H,p as ce,b as me,f as pe,F as v,v as fe,g as be,u as ve,E as _e,o as ye,X as ge,L as De,J as we}from"./index-feaddf7a.js";import{u as Se}from"./reference-df7bd263.js";import{u as Y}from"./customers-ea915896.js";import{u as Ce}from"./plantmodel-69a487e1.js";import{u as Z}from"./lifecycle-81a129dd.js";import{u as he}from"./tax-8e3a9a0b.js";import{a as Ie,b as Ee}from"./report.service-bffa4baf.js";import{S as Te}from"./index-c017e3e4.js";import{u as Be}from"./workmaster-af83aa93.js";import{u as X}from"./budget-107faaa0.js";import{L as Ve}from"./LinkReference-b2da8e44.js";import{c as ke,a as G,F as xe}from"./form-validator-06627164.js";import{_ as Fe}from"./FormBudgetOrderDetail.vue_vue_type_script_setup_true_lang-5aee884a.js";import{u as Re}from"./order-4bf812e4.js";import"./index-8496155a.js";import"./DropdownReference.vue_vue_type_script_setup_true_lang-196f74c7.js";const Ae=["onClick"],Le=z({__name:"TableBudgetDetails",props:{budget:{},details:{}},emits:["edit","delete"],setup(I,{emit:g}){const E=de(),T=X(),B=n=>{n.originalEvent.target.className.includes("grid_delete_column_button")||g("edit",n.data)},x=(n,t)=>{E.require({target:n.currentTarget,message:"Está segur que vol eliminar la línea?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{g("delete",t)}})};return(n,t)=>{const u=f("Column"),b=f("DataTable");return _(),N(b,{onRowClick:B,value:n.details,tableStyle:"min-width: 100%",class:"p-datatable-sm",sortMode:"single",sortField:"reference.code",selectionMode:"single",dataKey:"id",sortOrder:1},{header:m(()=>[ue(n.$slots,"header")]),default:m(()=>[l(u,{field:"quantity",header:"Un.",style:{width:"3%"}}),l(u,{header:"Referencia",field:"reference.code",sortable:"",style:{width:"15%"}},{body:m(s=>[l(Ve,{id:s.data.referenceId},null,8,["id"])]),_:1}),l(u,{field:"description",header:"Descripció",style:{width:"25%"}}),l(u,{header:"Cost intern",style:{width:"10%"}},{body:m(s=>[C(h(e(F)(s.data.totalCost-s.data.serviceCost-s.data.transportCost)),1)]),_:1}),l(u,{header:"Cost extern",style:{width:"10%"}},{body:m(s=>[C(h(e(F)(s.data.serviceCost+s.data.transportCost)),1)]),_:1}),l(u,{field:"totalCost",header:"Cost total",style:{width:"10%"}},{body:m(s=>[C(h(e(F)(s.data.totalCost)),1)]),_:1}),l(u,{field:"profit",header:"Benefici",style:{width:"10%"}},{body:m(s=>[C(h(s.data.profit)+" % ",1)]),_:1}),l(u,{field:"discount",header:"Descompte",style:{width:"10%"}},{body:m(s=>[C(h(s.data.discount)+" % ",1)]),_:1}),l(u,{field:"unitPrice",header:"Preu un.",style:{width:"10%"}},{body:m(s=>[C(h(e(F)(s.data.unitPrice)),1)]),_:1}),l(u,{field:"amount",header:"Total",style:{width:"10%"}},{body:m(s=>[C(h(e(F)(s.data.amount)),1)]),_:1}),l(u,{style:{width:"5%"}},{body:m(s=>[e(T).order===void 0?(_(),R("i",{key:0,class:j([e(U).TIMES,"grid_delete_column_button"]),onClick:A=>x(A,s.data)},null,10,Ae)):k("",!0)]),_:1})]),_:3},8,["value"])}}}),O=I=>(ce("data-v-9af11046"),I=I(),me(),I),$e={key:0},Me={class:"four-columns mt-2"},Ne=O(()=>p("label",{class:"block text-900 mb-2"},"Data Alta",-1)),Ue=O(()=>p("label",{class:"block text-900 mb-2"},"Data Acceptació",-1)),Oe={class:"three-columns mt-2"},Pe=O(()=>p("label",{class:"block text-900 mb-2"},"Estat",-1)),qe=O(()=>p("label",{class:"block text-900 mb-2"},"Client",-1)),Ge=z({__name:"FormBudget",emits:["submit","cancel"],setup(I,{expose:g,emit:E}){const T=X(),B=Y(),x=Z(),n=K(),{budget:t}=Q(T),u=ke().shape({customerId:G().required("El client es obligatori"),statusId:G().required("L'estat es obligatori"),exerciseId:G().required("L'exercici es obligatori")}),b=V({result:!1,errors:{}}),s=()=>{const D=new xe(u);b.value=D.validate(t.value)};g({submitForm:async()=>{if(s(),b.value.result)P(),E("submit",t.value);else{let D="";Object.entries(b.value.errors).forEach(i=>{D+=`${i[1].map(w=>w)}.   `}),n.add({severity:"warn",summary:"Formulari inválid",detail:D,life:5e3})}}});const P=()=>{t.value&&(t.value.date=H(t.value.date),t.value.acceptanceDate&&(t.value.acceptanceDate=H(t.value.acceptanceDate)))};return(D,i)=>{var y,S;const w=f("BaseInput"),r=f("Calendar"),L=f("Dropdown");return _(),R("div",null,[e(t)?(_(),R("form",$e,[p("section",Me,[p("div",null,[l(w,{type:e(q).TEXT,label:"Pressupost",id:"number",modelValue:e(t).number,"onUpdate:modelValue":i[0]||(i[0]=c=>e(t).number=c),disabled:""},null,8,["type","modelValue"])]),p("div",null,[Ne,l(r,{modelValue:e(t).date,"onUpdate:modelValue":i[1]||(i[1]=c=>e(t).date=c),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),p("div",null,[Ue,l(r,{modelValue:e(t).acceptanceDate,"onUpdate:modelValue":i[2]||(i[2]=c=>e(t).acceptanceDate=c),dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),p("div",null,[l(w,{type:e(q).TEXT,disabled:!0,label:"Comanda",value:(y=e(T).order)==null?void 0:y.number},null,8,["type","value"])])]),p("section",Oe,[p("div",null,[Pe,l(L,{modelValue:e(t).statusId,"onUpdate:modelValue":i[3]||(i[3]=c=>e(t).statusId=c),editable:"",options:(S=e(x).lifecycle)==null?void 0:S.statuses,optionValue:"id",optionLabel:"name",class:j(["w-full",{"p-invalid":b.value.errors.statusId}])},null,8,["modelValue","options","class"])]),p("div",null,[qe,l(L,{modelValue:e(t).customerId,"onUpdate:modelValue":i[4]||(i[4]=c=>e(t).customerId=c),editable:"",options:e(B).customers,optionValue:"id",optionLabel:"comercialName",class:j(["w-full",{"p-invalid":b.value.errors.customerId}])},null,8,["modelValue","options","class"])]),p("div",null,[l(w,{type:e(q).NUMERIC,label:"Dies entrega",id:"deliveryDays",modelValue:e(t).deliveryDays,"onUpdate:modelValue":i[5]||(i[5]=c=>e(t).deliveryDays=c)},null,8,["type","modelValue"])])])])):k("",!0)])}}});const je=pe(Ge,[["__scopeId","data-v-9af11046"]]),ze={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Xe=p("span",{class:"text-l text-900 font-bold"},"Linies del pressupost",-1),Je={key:0},We="Línia del pressupost",ct=z({__name:"Budget",setup(I){const g=V(v.EDIT),E=V(),T=fe(),B=be(),x=ve(),n=K(),t=X(),u=Y(),b=Ce(),s=_e(),A=Z(),P=Se(),D=Be(),i=he(),w=Re(),{budget:r}=Q(t),L=[{label:"Descarregar",icon:U.FILE_WORD,command:()=>re()},{label:"Crear comanda",icon:U.FLAG_FILL,command:()=>le()}],y=V(!1),S=V(v.EDIT),c=V(void 0),ee=async()=>{const o=T.params.id;await t.GetById(o),await t.GetAssociatedSalesOrders(o),P.fetchReferencesByModule("sales"),D.fetchAllActives(),A.fetchOneByName("Budget"),b.fetchSites(),s.fetchAll(),u.fetchCustomers(),i.fetchAll();let a="";r.value&&(g.value=v.EDIT,a=`Pressupost ${r.value.number}`),x.setMenuItem({icon:U.BUILDING,backButtonVisible:!0,title:a})};ye(async()=>{await ee()});const te=()=>{var a;if(!((a=r.value)!=null&&a.date))return n.add({severity:"error",summary:"Error al crear la comanda ",detail:"La data no pot estar buida",life:5e3}),!1;E.value.submitForm()},J=(o,a)=>{o===v.CREATE&&(a={id:we(),referenceId:"",workMasterId:null,profit:0,discount:0,quantity:1,unitCost:0,unitPrice:0,serviceCost:0,transportCost:0,totalCost:0,amount:0,budgetId:r.value.id,description:""}),c.value=Object.assign({},a),S.value=o,y.value=!0},ae=async o=>{let a=!1,d="";a=await t.Update(o.id,o),d=a?"Pressupost actualitzat correctament":"Error a l'actualitzar el pressupost",n.add({life:5e3,severity:a?"success":"error",summary:d}),a&&B.back()},oe=async o=>{if(o=o,S.value===v.CREATE)await t.CreateDetail(o);else if(S.value===v.EDIT){await t.UpdateDetail(o);const a=r.value.details.findIndex(d=>d.id===o.id);r.value.details[a]=o}y.value=!1},se=async o=>{g.value===v.EDIT&&await t.DeleteDetail(o);const a=r.value.details.filter(d=>d.id!==o.id);r.value.details=a,y.value=!1},le=async()=>{var o,a;if(t.order){n.add({severity:"warn",summary:"Aquest pressupost ja té una comanda associada",life:5e3});return}if(r.value){const d=await w.CreateFromBudget(r.value);d.result?(n.add({severity:"success",summary:`Comanda ${(o=d.content)==null?void 0:o.number} creada correctament`,life:5e3}),B.push(`/salesorder/${(a=d.content)==null?void 0:a.id}`)):n.add({severity:"error",summary:"Error al crear la comanda ",detail:d.errors[0],life:5e3})}},re=async()=>{var a;const o=await Te.Budget.GetReportDataById(r.value.id);if(o){const d=`Pressupost_${(a=r.value)==null?void 0:a.number}.docx`,$=await new Ee().Download(o,Ie.Budget,d);$?ge(d,$):n.add({severity:"warn",summary:"Error",detail:"No s'ha pugut generar fulla del pressupost"})}};return(o,a)=>{const d=f("SplitButton"),W=f("Button"),$=f("TabPanel"),ne=f("TabView"),ie=f("Dialog");return _(),R(De,null,[l(d,{label:"Guardar",onClick:te,model:L,size:"small",class:"grid_add_row_button"}),l(je,{class:"mt-3 mb-3",ref_key:"budgetForm",ref:E,onSubmit:ae},null,512),l(ne,null,{default:m(()=>[l($,{header:"Detall"},{default:m(()=>[e(r)&&e(r).details?(_(),N(Le,{key:0,budget:e(r),details:e(r).details,onEdit:a[1]||(a[1]=M=>J(e(v).EDIT,M)),onDelete:se},{header:m(()=>[p("div",ze,[Xe,e(t).order?k("",!0):(_(),R("section",Je,[l(W,{size:"small",label:"Afegir línea",onClick:a[0]||(a[0]=M=>J(e(v).CREATE,{})),class:"mr-2"})]))])]),_:1},8,["budget","details"])):k("",!0)]),_:1})]),_:1}),e(r)?(_(),N(ie,{key:0,closable:!0,style:{width:"80%"},visible:y.value,"onUpdate:visible":a[2]||(a[2]=M=>y.value=M),header:We,modal:!0},{default:m(()=>[e(r)&&c.value?(_(),N(Fe,{key:0,formAction:S.value,header:e(r),detail:c.value,readonly:!1,onSubmit:oe},null,8,["formAction","header","detail"])):k("",!0)]),_:1},8,["visible"])):k("",!0)],64)}}});export{ct as default};
