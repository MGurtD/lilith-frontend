import{d as U,j as _,r as y,h as f,a as N,c as A,e as a,i,k as m,n as I,s as V,y as C,l as M,J as T}from"./index-555c6e5a.js";import{u as $}from"./plantmodel-978ee1cf.js";import{u as R}from"./workorder-b497e7ed.js";import{c as j,a as P,d as q,F as G}from"./form-validator-f8953ae6.js";import{d}from"./index-dda8c344.js";const L={key:0},z={class:"three-columns mt-2"},H=a("label",{class:"block text-900 mb-2"},"Operari",-1),J=a("label",{class:"block text-900 mb-2"},"Màquina",-1),Q=a("label",{class:"block text-900 mb-2"},"Data Tíquet",-1),K={class:"mt-2"},X=a("label",{class:"block text-900 mb-2"},"Ordre Fabricació | Fase | Activitat",-1),Y={class:"two-columns mt-2"},Z=a("br",null,null,-1),x={class:"flex-right"},le=U({__name:"FormProductionPart",props:{productionPart:{},avoidWorkOrderRefresh:{type:Boolean}},emits:["submit","cancel"],setup(r,{emit:l}){const s=r,w=_(),v=$(),k=R(),n=y(void 0),D=()=>{n.value.value&&(s.productionPart.workOrderId=n.value.value.workOrderId,s.productionPart.workOrderPhaseId=n.value.value.workOrderPhaseId,s.productionPart.workOrderPhaseDetailId=n.value.value.workOrderPhaseDetailId)},B=j().shape({operatorId:P().required("Escull un operari"),workCenterId:P().required("Escull una màquina"),workOrderId:P().required("Escull una ordre de fabricació"),workOrderPhaseId:P().required("Escull una fase"),workOrderPhaseDetailId:P().required("Escull una activitat"),quantity:q().required("Has d'introduir una quantitat entera (pot ser 0)").integer(),time:q().required("Has d'introduir el temps i ha de ser major que 0").moreThan(0)}),u=y({result:!1,errors:{}}),W=()=>{const t=new G(B);u.value=t.validate(s.productionPart)},E=async t=>{s.avoidWorkOrderRefresh||(n.value=void 0,await k.fetchByWorkcenterId(t))},F=async()=>{if(W(),u.value.result)l("submit",s.productionPart);else{let t="";Object.entries(u.value.errors).forEach(o=>{t+=`${o[1].map(c=>c)}.   `}),w.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,o)=>{var h,O,b;const c=f("Dropdown"),g=f("Calendar"),S=f("Button");return t.productionPart?(N(),A("form",L,[a("section",z,[a("div",null,[H,i(c,{modelValue:t.productionPart.operatorId,"onUpdate:modelValue":o[0]||(o[0]=e=>t.productionPart.operatorId=e),editable:"",filter:!0,options:(h=m(v).operators)==null?void 0:h.sort((e,p)=>e.surname.localeCompare(p.surname)).map(e=>({value:e.id,label:e.name+" "+e.surname})),optionValue:"value",optionLabel:"label",class:I(["w-full",{"p-invalid":u.value.errors.operatorid}])},null,8,["modelValue","options","class"])]),a("div",null,[J,i(c,{modelValue:t.productionPart.workcenterId,"onUpdate:modelValue":o[1]||(o[1]=e=>t.productionPart.workcenterId=e),editable:"",filter:!0,options:(O=m(v).workcenters)==null?void 0:O.sort((e,p)=>e.description.localeCompare(p.description)),optionValue:"id",optionLabel:"description",class:"w-full",onChange:o[2]||(o[2]=e=>E(t.productionPart.workcenterId))},null,8,["modelValue","options"])]),a("div",null,[Q,i(g,{modelValue:t.productionPart.date,"onUpdate:modelValue":o[3]||(o[3]=e=>t.productionPart.date=e),dateFormat:"dd/mm/yy"},null,8,["modelValue"])])]),a("section",K,[a("div",null,[X,i(c,{modelValue:n.value,"onUpdate:modelValue":o[4]||(o[4]=e=>n.value=e),editable:"",filter:!0,options:(b=m(k).detailedWorkOrders)==null?void 0:b.sort((e,p)=>e.workOrderCode.localeCompare(p.workOrderCode)).map(e=>({label:e.workOrderCode+"  ("+e.referenceDescription+") - "+e.workOrderPhaseCode+"  ("+e.workOrderPhaseDescription+") | "+e.machineStatusDescription,value:e})),optionLabel:"label",class:I(["w-full",{"p-invalid":u.value.errors.workOrderId}]),onChange:D},null,8,["modelValue","options","class"])])]),a("section",Y,[a("div",null,[i(C,{type:m(V).NUMERIC,label:"Quantitat",id:"quantity",modelValue:t.productionPart.quantity,"onUpdate:modelValue":o[5]||(o[5]=e=>t.productionPart.quantity=e)},null,8,["type","modelValue"])]),a("div",null,[i(C,{type:m(V).NUMERIC,label:"Temps (minuts)",id:"time",modelValue:t.productionPart.time,"onUpdate:modelValue":o[6]||(o[6]=e=>t.productionPart.time=e)},null,8,["type","modelValue"])])]),Z,a("div",x,[i(S,{label:"Guardar",size:"small",onClick:F})])])):M("",!0)}}}),se=T({id:"productionParts",state:()=>({productionPart:void 0,productionParts:void 0}),getters:{},actions:{setNew(r){this.productionPart={id:r,date:new Date,workcenterId:"",operatorId:"",workOrderId:"",workOrderPhaseId:"",workOrderPhaseDetailId:"",quantity:0,time:0}},async fetchAll(){this.productionParts=await d.ProductionPart.getAll()},async fetchByWorkOrderId(r){this.productionParts=await d.ProductionPart.GetByWorkOrderId(r)},async fetchOne(r){this.productionPart=await d.ProductionPart.getById(r)},async fetchFiltered(r,l,s,w,v){this.productionParts=await d.ProductionPart.GetBetweenDates(r,l,s,w,v)},async create(r){const l=await d.ProductionPart.create(r);return l&&await this.fetchOne(r.id),l},async delete(r){const l=await d.ProductionPart.delete(r);return l&&await this.fetchAll(),l},async update(r,l){const s=await d.ProductionPart.update(r,l);return s&&await this.fetchAll(),s}}});export{le as _,se as u};
