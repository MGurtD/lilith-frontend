import{d as $,h as y,m as h,w as V,a as E,e as u,i as p,k as f,P as A,c as D,n as k,l as g,C as H,D as J,j as R,r as S,y as x,F as T,g as K,v as Q,u as W,z as X,E as Y,o as Z,G as tt,f as et}from"./index-f764b8b4.js";import{g as U}from"./functions-c791afc8.js";import{c as F,a as B,F as M}from"./form-validator-2ae99928.js";import{u as st}from"./lifecycle-d84f32ea.js";import"./v4-a960c1f4.js";import"./index-7bda243d.js";import"./base.service-ff0cada2.js";const at={class:"flex flex-wrap align-items-center justify-content-between gap-2"},ot=u("span",{class:"text-xl text-900 font-bold"},"Estats",-1),nt=["onClick"],it=$({__name:"TableStatuses",props:{lifecycleId:{},statuses:{},transitions:{}},emits:["add","edit","delete"],setup(w,{emit:m}){const d=w,c=i=>{let t=!1;return d.transitions&&(t=d.transitions.filter(e=>e.statusId===i.id||e.statusToId===i.id).length>0),t},b=()=>{const i={id:U(),lifecycleId:d.lifecycleId,name:"",disabled:!1,transitions:[]};m("add",i)},s=i=>{i.originalEvent.target.className.includes("grid_delete_column_button")||m("edit",i.data)},n=(i,t)=>{m("delete",t)};return(i,t)=>{const e=y("Button"),r=y("Column"),l=y("DataTable");return E(),h(l,{onRowClick:s,value:d.statuses,tableStyle:"min-width: 100%"},{header:V(()=>[u("div",at,[ot,p(e,{icon:f(A).PLUS,rounded:"",raised:"",onClick:b},null,8,["icon"])])]),default:V(()=>[p(r,{field:"name",header:"Nom",style:{width:"75%"}}),p(r,{style:{width:"25%"}},{body:V(_=>[c(_.data)?g("",!0):(E(),D("i",{key:0,class:k([f(A).TIMES,"grid_delete_column_button"]),onClick:v=>n(v,_.data)},null,10,nt))]),_:1})]),_:1},8,["value"])}}}),lt={class:"flex flex-wrap align-items-center justify-content-between gap-2"},rt=u("span",{class:"text-xl text-900 font-bold"},"Transicions",-1),dt=["onClick"],ut=$({__name:"TableStatusTransitions",props:{statuses:{},transitions:{}},emits:["add","edit","delete"],setup(w,{emit:m}){const d=w,c=i=>{var r,l;const t=(r=d.statuses)==null?void 0:r.find(_=>_.id===i.statusId),e=(l=d.statuses)==null?void 0:l.find(_=>_.id===i.statusToId);return t&&e?`${t.name} > ${e.name}`:""},b=()=>{const i={id:U(),statusId:"",statusToId:"",name:""};m("add",i)},s=i=>{i.originalEvent.target.className.includes("grid_delete_column_button")||m("edit",i.data)},n=(i,t)=>{m("delete",t)};return(i,t)=>{const e=y("Button"),r=y("Column"),l=y("DataTable");return E(),h(l,{onRowClick:s,value:d.transitions,tableStyle:"min-width: 100%"},{header:V(()=>[u("div",lt,[rt,p(e,{icon:f(A).PLUS,rounded:"",raised:"",onClick:b},null,8,["icon"])])]),default:V(()=>[p(r,{field:"name",header:"Nom",style:{width:"25%"}}),p(r,{header:"Transició",style:{width:"50%"}},{body:V(_=>[H(J(c(_.data)),1)]),_:1}),p(r,{style:{width:"25%"}},{body:V(_=>[u("i",{class:k([f(A).TIMES,"grid_delete_column_button"]),onClick:v=>n(v,_.data)},null,10,dt)]),_:1})]),_:1},8,["value"])}}}),ct={key:0},mt={class:"three-columns"},pt=u("label",{class:"block text-900 mb-2"},"Estat inicial",-1),ft=$({__name:"FormLifecycle",props:{lifecycle:{}},emits:["submit","cancel"],setup(w,{emit:m}){R(),F().shape({name:B().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:B().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")});const d=S({result:!1,errors:{}});return(c,b)=>{const s=y("Dropdown");return c.lifecycle?(E(),D("form",ct,[u("section",mt,[p(x,{class:k(["mb-2",{"p-invalid":d.value.errors.name}]),label:"Nom",id:"name",modelValue:c.lifecycle.name,"onUpdate:modelValue":b[0]||(b[0]=n=>c.lifecycle.name=n)},null,8,["modelValue","class"]),p(x,{class:k(["mb-2",{"p-invalid":d.value.errors.description}]),label:"Descripció",id:"description",modelValue:c.lifecycle.description,"onUpdate:modelValue":b[1]||(b[1]=n=>c.lifecycle.description=n)},null,8,["modelValue","class"]),u("div",null,[pt,p(s,{class:"w-full",modelValue:c.lifecycle.initialStatusId,"onUpdate:modelValue":b[2]||(b[2]=n=>c.lifecycle.initialStatusId=n),editable:"",options:c.lifecycle.statuses,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])])])])):g("",!0)}}}),_t={class:"two-columns"},bt={class:"mb-4"},vt=u("label",{class:"block text-900 mb-2"},"Deshabilitat",-1),yt=$({__name:"FormStatus",props:{formAction:{},status:{}},emits:["submit"],setup(w,{emit:m}){const d=w,c=R(),b=F().shape({name:B().required("El nom és obligatori")}),s=S({result:!1,errors:{}}),n=()=>{const t=new M(b);s.value=t.validate(d.status)},i=async()=>{if(n(),s.value.result)m("submit",d.status);else{let t="";Object.entries(s.value.errors).forEach(e=>{t+=`${e[1].map(r=>r)}.   `}),c.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const r=y("BaseInput"),l=y("Checkbox"),_=y("Button");return E(),D("form",null,[u("section",_t,[p(r,{class:k(["mb-2",{"p-invalid":s.value.errors.baseAmount}]),label:"Nom",modelValue:t.status.name,"onUpdate:modelValue":e[0]||(e[0]=v=>t.status.name=v)},null,8,["modelValue","class"]),u("div",bt,[vt,p(l,{modelValue:t.status.disabled,"onUpdate:modelValue":e[1]||(e[1]=v=>t.status.disabled=v),binary:!0},null,8,["modelValue"])])]),p(_,{label:"Confirmar",onClick:i,style:{float:"right"}})])}}}),Tt={class:"two-columns"},Et=u("label",{class:"block text-900 mb-2"},"Origen",-1),wt={class:"mb-4"},It=u("label",{class:"block text-900 mb-2"},"Destí",-1),Ct=$({__name:"FormStatusTransition",props:{formAction:{},transition:{},statuses:{}},emits:["submit"],setup(w,{emit:m}){const d=w,c=R(),b=F().shape({name:B().required("El nom és obligatori")}),s=S({result:!1,errors:{}}),n=()=>{const t=new M(b);s.value=t.validate(d.transition)},i=async()=>{if(d.transition.statusId===d.transition.statusToId){c.add({severity:"warn",summary:"Formulari inválid",detail:"Els estats d'origen i destí han de ser diferents",life:5e3});return}if(n(),s.value.result)m("submit",d.transition);else{let t="";Object.entries(s.value.errors).forEach(e=>{t+=`${e[1].map(r=>r)}.   `}),c.add({severity:"warn",summary:"Formulari inválid",detail:t,life:5e3})}};return(t,e)=>{const r=y("BaseInput"),l=y("Dropdown"),_=y("Button");return E(),D("form",null,[p(r,{class:k(["mb-2",{"p-invalid":s.value.errors.name}]),label:"Nom",modelValue:t.transition.name,"onUpdate:modelValue":e[0]||(e[0]=v=>t.transition.name=v)},null,8,["modelValue","class"]),u("section",Tt,[u("div",null,[Et,p(l,{modelValue:t.transition.statusId,"onUpdate:modelValue":e[1]||(e[1]=v=>t.transition.statusId=v),editable:"",options:t.statuses,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])]),u("div",wt,[It,p(l,{modelValue:t.transition.statusToId,"onUpdate:modelValue":e[2]||(e[2]=v=>t.transition.statusToId=v),editable:"",options:t.statuses,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])])]),p(_,{label:"Confirmar",onClick:i,style:{float:"right"}})])}}}),Vt={class:"container"},ht={class:"section_lifecycle mt-5"},gt={class:"section_status"},St={class:"section_status_list"},kt={class:"section_statustransition_list"},$t=$({__name:"Lifecycle",setup(w){const m=S(T.EDIT),d=K(),c=Q(),b=W(),s=st(),{lifecycle:n,transitions:i}=X(s),t=S(T.CREATE),e=S(void 0),r=S(void 0),l=Y({visible:!1,title:"",closable:!0,position:"bottom",modal:!0}),_=async()=>{await s.fetchOne(c.params.id);let a="";n.value?(m.value=T.EDIT,a=`Cicle de vida ${n.value.name}`):(m.value=T.CREATE,s.setNew(c.params.id),a="Alta cicle de vida"),b.setMenuItem({icon:A.REFRESH,backButtonVisible:!0,title:a})};Z(async()=>{await _()});const v=(a,o)=>{m.value!==T.CREATE&&(t.value=a,e.value=o,r.value=void 0,l.visible=!0,l.title="Introducció d'estats")},j=async a=>{if(i.value.find(C=>C.statusId===a.id||C.statusToId===a.id)){N.add({severity:"warn",summary:"Estat dependent",detail:`L'estat ${a.name} forma part d'una transició`,life:5e3});return}await s.deleteStatus(a.id)},O=async a=>{let o;t.value==T.CREATE?o=s.createStatus(a):o=s.updateStatus(a.id,a),l.visible=!await o},L=(a,o)=>{m.value!==T.CREATE&&(t.value=a,e.value=void 0,r.value=o,l.visible=!0,l.title="Introducció de transicions")},q=async a=>await s.deleteTransition(a.id),z=async a=>{let o;t.value==T.CREATE?o=s.createTransition(a):o=s.updateTransition(a.id,a),l.visible=!await o},N=R(),P=async()=>{const a=n.value;let o=!1,C="";m.value===T.CREATE?(o=await s.create(a),C="Cicle de vida creat correctament"):(o=await s.update(a.id,a),C="Cicle de vida actualizat correctament"),o&&(N.add({severity:"success",summary:C,life:5e3}),m.value===T.EDIT?d.back():await _())};return(a,o)=>{const C=y("Button"),G=y("Dialog");return E(),D(tt,null,[u("main",Vt,[p(C,{label:"Guardar",class:"grid_add_row_button",onClick:P}),u("section",ht,[f(n)?(E(),h(ft,{key:0,lifecycle:f(n)},null,8,["lifecycle"])):g("",!0)]),u("section",gt,[u("div",St,[f(n)?(E(),h(it,{key:0,"lifecycle-id":f(n).id,statuses:f(n).statuses,transitions:f(s).transitions,onAdd:o[0]||(o[0]=I=>v(f(T).CREATE,I)),onEdit:o[1]||(o[1]=I=>v(f(T).EDIT,I)),onDelete:j},null,8,["lifecycle-id","statuses","transitions"])):g("",!0)]),u("div",kt,[f(n)?(E(),h(ut,{key:0,statuses:f(n).statuses,transitions:f(s).transitions,onAdd:o[2]||(o[2]=I=>L(f(T).CREATE,I)),onEdit:o[3]||(o[3]=I=>L(f(T).EDIT,I)),onDelete:q},null,8,["statuses","transitions"])):g("",!0)])])]),p(G,{visible:l.visible,"onUpdate:visible":o[4]||(o[4]=I=>l.visible=I),header:l.title,closable:l.closable,modal:l.modal},{default:V(()=>[e.value?(E(),h(yt,{key:0,status:e.value,formAction:t.value,onSubmit:O},null,8,["status","formAction"])):g("",!0),r.value?(E(),h(Ct,{key:1,transition:r.value,statuses:f(n).statuses,formAction:t.value,onSubmit:z},null,8,["transition","statuses","formAction"])):g("",!0)]),_:1},8,["visible","header","closable","modal"])],64)}}});const xt=et($t,[["__scopeId","data-v-4fed7321"]]);export{xt as default};
