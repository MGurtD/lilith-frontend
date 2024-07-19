import{d as H,j as G,R as de,r as F,h as P,a as D,c as x,e,i as o,k as s,n as $,s as R,z as N,l as W,K,x as ne,w as c,P as L,G as O,H as I,m as M,L as X,J as Y,Q as ie,ai as ue,v as ce,g as me,u as pe,C as ke,o as fe,I as we,D as be,$ as Q,p as he,b as _e,f as ve}from"./index-abfce291.js";import{u as A}from"./plantmodel-fca63037.js";import{u as Z}from"./workorder-c41ade65.js";import{c as ee,a as q,d as j,F as te}from"./form-validator-012be6a9.js";import{_ as ye}from"./DropdownReference.vue_vue_type_script_setup_true_lang-b229b9db.js";import{u as J}from"./lifecycle-5d58652b.js";import{_ as Pe}from"./DropdownLifecycle.vue_vue_type_script_setup_true_lang-10e06abb.js";import{_ as Ie}from"./FormWorkorderPhase.vue_vue_type_script_setup_true_lang-fe873358.js";import{u as oe}from"./productionpart-d50962f8.js";import{u as Te}from"./reference-cfffd00c.js";import"./index-0d9d6b22.js";const Oe={key:0},Ce={class:"mt-2"},Ve=e("label",{class:"block text-900 mb-2"},"Fase | Activitat",-1),ge={class:"three-columns mt-2"},De=e("label",{class:"block text-900 mb-2"},"Operari",-1),$e=e("label",{class:"block text-900 mb-2"},"Màquina",-1),Se=e("label",{class:"block text-900 mb-2"},"Data Tíquet",-1),qe={class:"three-columns mt-2"},We=e("br",null,null,-1),Be={class:"flex-right"},Ue=H({__name:"FormWorkOrderProductionPart",props:{productionPart:{},avoidWorkOrderRefresh:{type:Boolean}},emits:["submit","cancel"],setup(C,{emit:V}){const v=C,y=G(),g=A(),w=Z(),_=de(()=>{var p,u,k;if(!v.productionPart.workOrderPhaseId)return[];const i=(u=(p=w.workorder)==null?void 0:p.phases)==null?void 0:u.find(h=>h.id===v.productionPart.workOrderPhaseId);return i?(k=g.workcenters)==null?void 0:k.filter(h=>h.workcenterTypeId===i.workcenterTypeId):g.workcenters}),n=F(void 0),r=()=>{n.value.value&&(v.productionPart.workOrderId=n.value.value.workOrderId,v.productionPart.workOrderPhaseId=n.value.value.workOrderPhaseId,v.productionPart.workOrderPhaseDetailId=n.value.value.workOrderPhaseDetailId)},l=ee().shape({operatorId:q().required("Escull un operari"),workcenterId:q().required("Escull una màquina"),workOrderId:q().required("Escull una ordre de fabricació"),workOrderPhaseId:q().required("Escull una fase"),workOrderPhaseDetailId:q().required("Escull una activitat"),quantity:j().required("Has d'introduir una quantitat entera (pot ser 0)").integer(),workcenterTime:j().required("Has d'introduir el temps de màquina i ha de ser major que 0").moreThan(0)}),t=F({result:!1,errors:{}}),b=()=>{const i=new te(l);t.value=i.validate(v.productionPart)},T=async i=>{v.avoidWorkOrderRefresh||(n.value=void 0,await w.fetchByWorkcenterId(i))},m=async()=>{if(b(),t.value.result)V("submit",v.productionPart);else{let i="";Object.entries(t.value.errors).forEach(p=>{i+=`${p[1].map(u=>u)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:i,life:5e3})}};return(i,p)=>{var f,B,U;const u=P("Dropdown"),k=P("Calendar"),h=P("Button");return i.productionPart?(D(),x("form",Oe,[e("section",Ce,[e("div",null,[Ve,o(u,{modelValue:n.value,"onUpdate:modelValue":p[0]||(p[0]=d=>n.value=d),editable:"",filter:!0,options:(f=s(w).detailedWorkOrders)==null?void 0:f.sort((d,a)=>d.workOrderCode.localeCompare(a.workOrderCode)).map(d=>({label:"Fase "+d.workOrderPhaseCode+"  ("+d.workOrderPhaseDescription+") | "+d.machineStatusDescription,value:d})),optionLabel:"label",class:$(["w-full",{"p-invalid":t.value.errors.workOrderId}]),onChange:r},null,8,["modelValue","options","class"])])]),e("section",ge,[e("div",null,[De,o(u,{modelValue:i.productionPart.operatorId,"onUpdate:modelValue":p[1]||(p[1]=d=>i.productionPart.operatorId=d),editable:"",filter:!0,options:(B=s(g).operators)==null?void 0:B.sort((d,a)=>d.surname.localeCompare(a.surname)).map(d=>({value:d.id,label:d.name+" "+d.surname})),optionValue:"value",optionLabel:"label",class:$(["w-full",{"p-invalid":t.value.errors.operatorid}])},null,8,["modelValue","options","class"])]),e("div",null,[$e,o(u,{modelValue:i.productionPart.workcenterId,"onUpdate:modelValue":p[2]||(p[2]=d=>i.productionPart.workcenterId=d),editable:"",filter:!0,options:(U=_.value)==null?void 0:U.sort((d,a)=>d.description.localeCompare(a.description)),optionValue:"id",optionLabel:"description",class:"w-full",onChange:p[3]||(p[3]=d=>T(i.productionPart.workcenterId))},null,8,["modelValue","options"])]),e("div",null,[Se,o(k,{modelValue:i.productionPart.date,"onUpdate:modelValue":p[4]||(p[4]=d=>i.productionPart.date=d),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),e("section",qe,[e("div",null,[o(N,{type:s(R).NUMERIC,label:"Quantitat",id:"quantity",modelValue:i.productionPart.quantity,"onUpdate:modelValue":p[5]||(p[5]=d=>i.productionPart.quantity=d)},null,8,["type","modelValue"])]),e("div",null,[o(N,{type:s(R).NUMERIC,label:"Temps total operari (minuts)",id:"time",modelValue:i.productionPart.operatorTime,"onUpdate:modelValue":p[6]||(p[6]=d=>i.productionPart.operatorTime=d)},null,8,["type","modelValue"])]),e("div",null,[o(N,{type:s(R).NUMERIC,label:"Temps total centre de treball (minuts)",id:"time",modelValue:i.productionPart.workcenterTime,"onUpdate:modelValue":p[7]||(p[7]=d=>i.productionPart.workcenterTime=d)},null,8,["type","modelValue"])])]),We,e("div",Be,[o(h,{label:"Guardar",size:"small",onClick:m})])])):W("",!0)}}}),Ee={key:0},Me=e("br",null,null,-1),Ne={class:"four-columns"},Fe=e("label",{class:"block text-900 mb-2"},"Data Prevista",-1),Re={class:"four-columns"},Le=e("label",{class:"block text-900 mb-2"},"Data Inici",-1),He=e("label",{class:"block text-900 mb-2"},"Data Fi",-1),Qe=e("label",{class:"block text-900 mb-2"},"Comentari Fabricació",-1),je=H({__name:"FormWorkorder",props:{workorder:{}},emits:["submit","cancel"],setup(C,{emit:V}){const v=C;J();const y=G(),g=ee().shape({plannedQuantity:j().min(1,"La quantitat ha de ser superior a 0").required("La quanitat és obligatoria"),referenceId:q().required("La referència és obligatoria"),order:j().required("L'ordre és obligatori"),plannedDate:q().required("La data prevista és obligatoria")}),w=F({result:!1,errors:{}}),_=()=>{const r=new te(g);w.value=r.validate(v.workorder)},n=async()=>{if(_(),w.value.result)V("submit",v.workorder);else{let r="";Object.entries(w.value.errors).forEach(l=>{r+=`${l[1].map(t=>t)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,l)=>{const t=P("Button"),b=P("Calendar"),T=P("Textarea");return r.workorder?(D(),x("form",Ee,[e("div",null,[o(t,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:n}),Me]),e("section",Ne,[e("div",null,[o(N,{label:"Codi",modelValue:r.workorder.code,"onUpdate:modelValue":l[0]||(l[0]=m=>r.workorder.code=m),disabled:""},null,8,["modelValue"])]),e("div",null,[o(ye,{label:"Referència",modelValue:r.workorder.referenceId,"onUpdate:modelValue":l[1]||(l[1]=m=>r.workorder.referenceId=m),fullName:!0,disabled:""},null,8,["modelValue"])]),e("div",null,[o(N,{type:s(R).NUMERIC,label:"Quantitat",modelValue:r.workorder.plannedQuantity,"onUpdate:modelValue":l[2]||(l[2]=m=>r.workorder.plannedQuantity=m),class:$({"p-invalid":w.value.errors.plannedQuantity})},null,8,["type","modelValue","class"])]),e("div",null,[Fe,o(b,{modelValue:r.workorder.plannedDate,"onUpdate:modelValue":l[3]||(l[3]=m=>r.workorder.plannedDate=m),dateFormat:"dd/mm/yy",class:$(["mt-2",{"p-invalid":w.value.errors.plannedDate}])},null,8,["modelValue","class"])])]),e("section",Re,[e("div",null,[o(Pe,{label:"Estat",modelValue:r.workorder.statusId,"onUpdate:modelValue":l[4]||(l[4]=m=>r.workorder.statusId=m),class:$({"p-invalid":w.value.errors.statusId})},null,8,["modelValue","class"])]),e("div",null,[Le,o(b,{modelValue:r.workorder.startTime,"onUpdate:modelValue":l[5]||(l[5]=m=>r.workorder.startTime=m),dateFormat:"dd/mm/yy",class:"mt-2"},null,8,["modelValue"])]),e("div",null,[He,o(b,{modelValue:r.workorder.endTime,"onUpdate:modelValue":l[6]||(l[6]=m=>r.workorder.endTime=m),dateFormat:"dd/mm/yy",class:"mt-2"},null,8,["modelValue"])]),e("div",null,[o(N,{type:s(R).NUMERIC,label:"Prioritat",modelValue:r.workorder.order,"onUpdate:modelValue":l[7]||(l[7]=m=>r.workorder.order=m),class:$({"p-invalid":w.value.errors.plannedorderQuantity})},null,8,["type","modelValue","class"])])]),e("div",null,[Qe,o(T,{class:"w-full",modelValue:r.workorder.comment,"onUpdate:modelValue":l[8]||(l[8]=m=>r.workorder.comment=m)},null,8,["modelValue"])])])):W("",!0)}}}),xe={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ae=e("span",{class:"text-xl text-900 font-bold"},"Fases",-1),ze=["onClick"],Ge=H({__name:"TableWorkorderPhases",props:{workorder:{},workorderPhases:{}},emits:["add","edit","delete"],setup(C,{emit:V}){const v=C,y=K({visible:!1,title:"Nova fase",closable:!0,position:"center",modal:!0}),g=ne(),w=A(),_=J(),n=u=>{var h;if(!w.workcenterTypes)return"";const k=(h=w.workcenterTypes)==null?void 0:h.find(f=>u===f.id);return k?k.name:""},r=u=>{var h;if(!w.workcenters)return"";const k=(h=w.workcenters)==null?void 0:h.find(f=>u===f.id);return k?k.name:""},l=u=>{var h;if(!w.operatorTypes)return"";const k=(h=w.operatorTypes)==null?void 0:h.find(f=>u===f.id);return k?k.name:""},t=u=>{var h;if(!_.lifecycle||!_.lifecycle.statuses)return"";const k=(h=_.lifecycle.statuses)==null?void 0:h.find(f=>u===f.id);return k?k.name:""},b=F({}),T=()=>{b.value={id:Y(),workOrderId:v.workorder.id,disabled:!1,code:((v.workorder.phases.length+1)*10).toString(),description:"",operatorTypeId:null,workcenterTypeId:null,preferredWorkcenterId:null,isExternalWork:!1,externalWorkCost:0,statusId:"",startTime:null,endTime:null,workOrderPhaseDetails:[],workOrderPhaseBillOfMaterials:[]},y.visible=!0},m=u=>{y.visible=!1,V("add",u)},i=u=>{u.originalEvent.target.className.includes("grid_delete_column_button")||V("edit",u.data)},p=(u,k)=>{g.require({target:u.currentTarget,message:"Está segur que vol eliminar la fase?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{V("delete",k)}})};return(u,k)=>{const h=P("Button"),f=P("Column"),B=P("BooleanColumn"),U=P("DataTable"),d=P("Dialog");return D(),x(X,null,[o(U,{onRowClick:i,value:u.workorderPhases,tableStyle:"min-width: 100%","sort-field":"code","sort-order":1},{header:c(()=>[e("div",xe,[Ae,o(h,{icon:s(L).PLUS,rounded:"",raised:"",onClick:T},null,8,["icon"])])]),default:c(()=>[o(f,{field:"code",header:"Codi",sortable:"",style:{width:"10%"}}),o(f,{field:"description",header:"Descripció",style:{width:"15%"}}),o(f,{header:"Tipus de màquina",style:{width:"15%"}},{body:c(a=>[O(I(n(a.data.workcenterTypeId)),1)]),_:1}),o(f,{header:"Màquina preferida",style:{width:"15%"}},{body:c(a=>[O(I(r(a.data.preferredWorkcenterId)),1)]),_:1}),o(f,{header:"Tipus d'operari",style:{width:"15%"}},{body:c(a=>[O(I(l(a.data.operatorTypeId)),1)]),_:1}),o(f,{header:"Estat",style:{width:"15%"}},{body:c(a=>[O(I(t(a.data.statusId)),1)]),_:1}),o(f,{header:"Extern",style:{width:"5%"}},{body:c(a=>[o(B,{value:a.data.isExternalWork},null,8,["value"])]),_:1}),o(f,{style:{width:"5%"}},{body:c(a=>[e("i",{class:$([s(L).TIMES,"grid_delete_column_button"]),onClick:E=>p(E,a.data)},null,10,ze)]),_:1})]),_:1},8,["value"]),o(d,{visible:y.visible,"onUpdate:visible":k[0]||(k[0]=a=>y.visible=a),header:y.title,closable:y.closable,modal:y.modal},{default:c(()=>[b.value?(D(),M(Ie,{key:0,workorder:u.workorder,phase:b.value,onSubmit:m},null,8,["workorder","phase"])):W("",!0)]),_:1},8,["visible","header","closable","modal"])],64)}}}),Je=["onClick"],Ke=H({__name:"TableProductionParts",emits:["delete"],setup(C,{emit:V}){const v=oe(),y=A(),g=_=>{if(!_)return"";if(_.workOrderPhase&&_.workOrderPhaseDetail){const n=y.getMachineStatusNameById(_.workOrderPhaseDetail.machineStatusId);return`(${_.workOrderPhase.code}) ${_.workOrderPhase.description} - ${n}`}},w=(_,n)=>{_.stopPropagation(),V("delete",n)};return(_,n)=>{const r=P("Column"),l=P("DataTable");return D(),M(l,{value:s(v).productionParts,class:"p-datatable-sm",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"40vh"},{header:c(()=>[ie(_.$slots,"header")]),empty:c(()=>[O(" No s'han trobat tiquets. ")]),loading:c(()=>[O(" Carregant tiquets. Si us plau espera. ")]),default:c(()=>[o(r,{field:"operatorId",header:"Operari",style:{width:"20%"}},{body:c(t=>[O(I(s(y).getOperatorNameById(t.data.operatorId)),1)]),_:1}),o(r,{field:"workcenterId",header:"Màquina",style:{width:"20%"}},{body:c(t=>[O(I(s(y).getWorkcenterNameById(t.data.workcenterId)),1)]),_:1}),o(r,{field:"workOrderPhaseId",header:"Fase/Estat",style:{width:"25%"}},{body:c(t=>[O(I(g(t.data)),1)]),_:1}),o(r,{field:"date",header:"Data",style:{width:"10%"}},{body:c(t=>[O(I(s(ue)(t.data.date)),1)]),_:1}),o(r,{field:"quantity",header:"Quantitat",style:{width:"7.5%"}}),o(r,{field:"operatorTime",header:"Temps operari",style:{width:"10%"}},{body:c(t=>[O(I(t.data.operatorTime)+" min. ",1)]),_:1}),o(r,{field:"workcenterTime",header:"Temps màquina",style:{width:"10%"}},{body:c(t=>[O(I(t.data.workcenterTime)+" min. ",1)]),_:1}),o(r,{style:{width:"5%"}},{body:c(t=>[e("i",{class:$([s(L).TIMES,"grid_delete_column_button"]),onClick:b=>w(b,t.data)},null,10,Je)]),_:1})]),_:3},8,["value"])}}}),S=C=>(he("data-v-43dd669f"),C=C(),_e(),C),Xe={class:"main"},Ye={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Ze=S(()=>e("span",{class:"text-xl text-900 font-bold"},"Hores",-1)),et={class:"four-columns"},tt={class:"mt-1"},ot=S(()=>e("label",{class:"block text-900 mb-2"},"Cost Operari",-1)),rt={class:"summary-field"},at={class:"mt-1"},st=S(()=>e("label",{class:"block text-900 mb-2"},"Cost Máquina",-1)),lt={class:"summary-field"},dt={class:"mt-1"},nt=S(()=>e("label",{class:"block text-900 mb-2"},"Cost Material",-1)),it={class:"summary-field"},ut={class:"mt-1"},ct=S(()=>e("label",{class:"block text-900 mb-2"},"Cost Total",-1)),mt={class:"summary-field"},pt={class:"four-columns mt-4"},kt={class:"mt-1"},ft=S(()=>e("label",{class:"block text-900 mb-2"},"Temps Operari",-1)),wt={class:"summary-field"},bt={class:"mt-1"},ht=S(()=>e("label",{class:"block text-900 mb-2"},"Temps Màquina",-1)),_t={class:"summary-field"},vt=S(()=>e("div",{class:"mt-1"},null,-1)),yt=H({__name:"Workorder",setup(C){const V=ce(),v=me(),y=pe(),g=G(),w=J(),_=Te(),n=Z(),r=A(),l=oe(),{workorder:t}=ke(n),b=F(""),T=K({visible:!1,title:"Crear tíquet de producció",closable:!0,position:"center",modal:!0});fe(async()=>{b.value=V.params.id,n.detailedWorkOrders=void 0,await i();let a="";a="Ordre de fabricació",t.value&&(a=`${a} ${t.value.code}`),y.setMenuItem({icon:L.BUILDING,backButtonVisible:!0,title:a})});const m=async()=>{await n.fetchOne(b.value),n.workorder&&(n.workorder.plannedDate=we(n.workorder.plannedDate))},i=async()=>{_.fetchReferencesByModule("sales"),r.fetchActiveModel(),w.fetchOneByName("WorkOrder"),l.fetchByWorkOrderId(b.value),await m()},p=async a=>{n.workorder&&(n.workorder.plannedDate=be(n.workorder.plannedDate)),await n.update(b.value,a)&&await i()},u=async a=>{await n.createPhase(a)?v.push({path:`/workorder/${b.value}/phase/${a.id}`}):g.add({severity:"error",summary:"Error al crear la fase",detail:"Revisi el log per a més informació",life:1e4})},k=a=>{v.push({path:`/workorder/${b.value}/phase/${a.id}`})},h=async a=>{await n.deletePhase(a.id)},f=F({}),B=()=>{f.value={id:Y(),workOrderId:b.value,workOrderPhaseId:"",workOrderPhaseDetailId:"",operatorId:"",workcenterId:"",operatorTime:0,workcenterTime:0,quantity:0,date:new Date,machineHourCost:0,operatorHourCost:0},t.value&&n.fetchByWorkOrderId(t.value.id),T.visible=!0},U=async()=>{T.visible=!1,await l.create(f.value)&&(l.fetchByWorkOrderId(b.value),m())},d=async a=>{await l.delete(a.id),l.fetchByWorkOrderId(b.value),m()};return(a,E)=>{const z=P("TabPanel"),re=P("Button"),ae=P("TabView"),se=P("Dialog");return D(),x(X,null,[e("header",null,[s(t)?(D(),M(je,{key:0,workorder:s(t),onSubmit:p},null,8,["workorder"])):W("",!0)]),e("main",Xe,[o(ae,null,{default:c(()=>[o(z,{header:"Fases"},{default:c(()=>[s(t)&&s(t).phases?(D(),M(Ge,{key:0,workorder:s(t),workorderPhases:s(t).phases,onAdd:u,onEdit:k,onDelete:h},null,8,["workorder","workorderPhases"])):W("",!0)]),_:1}),o(z,{header:"Hores"},{default:c(()=>[s(l).productionParts?(D(),M(Ke,{key:0,productionParts:s(l).productionParts,onDelete:d},{header:c(()=>[e("div",Ye,[Ze,o(re,{icon:s(L).PLUS,rounded:"",raised:"",onClick:B},null,8,["icon"])])]),_:1},8,["productionParts"])):W("",!0)]),_:1}),s(t)?(D(),M(z,{key:0,header:"Costs"},{default:c(()=>[e("section",et,[e("div",tt,[ot,e("span",rt,I(s(Q)(s(t).operatorCost)),1)]),e("div",at,[st,e("span",lt,I(s(Q)(s(t).machineCost)),1)]),e("div",dt,[nt,e("span",it,I(s(Q)(s(t).materialCost)),1)]),e("div",ut,[ct,e("span",mt,I(s(Q)(s(t).machineCost+s(t).materialCost+s(t).operatorCost)),1)])]),e("section",pt,[e("div",kt,[ft,e("span",wt,I(s(t).operatorTime)+" mins.",1)]),e("div",bt,[ht,e("span",_t,I(s(t).machineTime)+" mins.",1)]),vt])]),_:1})):W("",!0)]),_:1})]),o(se,{visible:T.visible,"onUpdate:visible":E[0]||(E[0]=le=>T.visible=le),header:T.title,closable:T.closable,modal:T.modal},{default:c(()=>[o(Ue,{productionPart:f.value,"avoid-work-order-refresh":!0,onSubmit:U},null,8,["productionPart"])]),_:1},8,["visible","header","closable","modal"])],64)}}});const Wt=ve(yt,[["__scopeId","data-v-43dd669f"]]);export{Wt as default};
