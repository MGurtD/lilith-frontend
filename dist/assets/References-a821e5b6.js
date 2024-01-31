import{d as E,r as P,H as w,h as C,m as a,w as d,a as c,e as h,i,y as j,k as B,P as x,l as u,D,C as A,n as H,p as U,b as z,f as $,g as K,v as L,u as G,x as J,j as O,o as Q}from"./index-53820b8d.js";import{u as F}from"./reference-4195502c.js";import{u as M}from"./referenceType-6e3bcdf3.js";import{v as W}from"./v4-a960c1f4.js";import"./reference.service-f83d13c3.js";import"./base.service-80f81d45.js";import"./index-6d4d46b9.js";const X=m=>(U("data-v-9870572c"),m=m(),z(),m),Y={class:"references-header"},Z={class:"references-filter"},ee=X(()=>h("label",null,"Codi",-1)),te=["onClick"],se=E({__name:"TableReferences",props:{module:{},references:{}},emits:["add","edit","delete"],setup(m,{emit:_}){const p=m,v=M(),T=F(),l=P({code:""}),y=w(()=>p.module==="sales"),f=w(()=>p.module==="purchase");w(()=>p.module==="production");const n=w(()=>p.references?l.value.code.length>0?p.references.filter(e=>e.code.includes(l.value.code)):T.references:[]),b=()=>{_("add")},g=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||_("edit",e.data)},I=(e,r)=>{_("delete",r)},S=e=>{const r=v.getReferenceTypeById(e);return r?r.density:0},k=e=>{var R;const r=(R=T.referenceFormats)==null?void 0:R.find(s=>s.id===e);return r?r.description:""},t=e=>{const r=v.getReferenceTypeById(e);return r?r.description:""};return(e,r)=>{const R=C("Button"),s=C("Column"),V=C("BooleanColumn"),N=C("DataTable");return c(),a(N,{value:n.value,tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",onRowClick:g},{header:d(()=>[h("div",Y,[h("div",Z,[ee,i(j,{modelValue:l.value.code,"onUpdate:modelValue":r[0]||(r[0]=o=>l.value.code=o)},null,8,["modelValue"])]),i(R,{style:{float:"right"},icon:B(x).PLUS,rounded:"",raised:"",onClick:b},null,8,["icon"])])]),default:d(()=>[i(s,{field:"code",header:"Codi",style:{width:"15%"}}),i(s,{field:"description",header:"Descripció",style:{width:"35%"}}),y.value?(c(),a(s,{key:0,field:"version",header:"Versió",style:{width:"10%"}})):u("",!0),y.value?(c(),a(s,{key:1,field:"cost",header:"Cost",style:{width:"20%"}})):u("",!0),y.value?(c(),a(s,{key:2,field:"price",header:"Preu",style:{width:"20%"}})):u("",!0),y.value?(c(),a(s,{key:3,header:"Servei",style:{width:"10%"}},{body:d(o=>[i(V,{value:o.data.isService},null,8,["value"])]),_:1})):u("",!0),f.value?(c(),a(s,{key:4,field:"referenceTypeId",header:"Tipus",style:{width:"15%"}},{body:d(o=>[h("span",null,D(t(o.data.referenceTypeId)),1)]),_:1})):u("",!0),f.value?(c(),a(s,{key:5,header:"Densitat (mm)",style:{width:"10%"}},{body:d(o=>[A(D(S(o.data.referenceTypeId)),1)]),_:1})):u("",!0),f.value?(c(),a(s,{key:6,field:"referenceFormatId",header:"Format",style:{width:"10%"}},{body:d(o=>[h("span",null,D(k(o.data.referenceFormatId)),1)]),_:1})):u("",!0),f.value?(c(),a(s,{key:7,field:"lastPurchaseCost",header:"Última Compra",style:{width:"10%"}})):u("",!0),i(s,{header:"Desc.",style:{width:"10%"}},{body:d(o=>[i(V,{value:o.data.disabled},null,8,["value"])]),_:1}),i(s,{style:{width:"10%"}},{body:d(o=>[h("i",{class:H([B(x).TIMES,"grid_delete_column_button"]),onClick:q=>I(q,o.data)},null,10,te)]),_:1})]),_:1},8,["value"])}}});const re=$(se,[["__scopeId","data-v-9870572c"]]),oe=E({__name:"References",setup(m){const _=K(),p=L(),v=G(),T=M(),l=F(),y=J(),f=O(),n=P("");Q(async()=>{n.value=p.params.module,await l.fetchReferencesByModule(n.value),T.fetchAll();let t="";n.value==="sales"?t="Referencies de venta":n.value==="purchase"?t="Materies primeres":n.value==="production"&&(t="Referencies de producció"),v.setMenuItem({icon:x.TICKET,title:t})});const b=()=>{_.push({path:`/reference/${n.value}/${W()}`})},g=t=>{_.push({path:`/reference/${n.value}/${t.id}`})},I=t=>{y.require({message:`Está segur que vol eliminar el material ${t.description}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{const e=await l.deleteReference(t.id);console.log(e),e.result?k():S(e)}})},S=t=>{f.add({severity:"error",summary:t.errors[0],life:3e3,closable:!0})},k=()=>{f.add({severity:"success",summary:"Eliminat",life:3e3})};return(t,e)=>(c(),a(re,{module:n.value,references:B(l).references,onAdd:b,onEdit:g,onDelete:I},null,8,["module","references"]))}});const pe=$(oe,[["__scopeId","data-v-210c3064"]]);export{pe as default};
