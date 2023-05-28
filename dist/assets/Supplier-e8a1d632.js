import{d as q,D as M,E as B,g as F,r as S,j as V,l,a as y,c as $,e as n,k as t,n as p,G as _,v as U,h as j,H as g,x as w,P as k,w as N,I as O,t as P,F as z,A as H,u as J,o as K}from"./index-552a33ea.js";import{u as D}from"./suppliers-cc9c8c89.js";import{c as A,a as b,F as L,b as R}from"./form-validator-58b9052d.js";import{v as Q}from"./v4-a960c1f4.js";const W={key:0},X={class:"three-columns"},Y=n("label",{class:"block text-900 mb-2"},"Tipus Proveïdor",-1),Z={class:"three-columns mb-2"},ee=n("label",{class:"block text-900 mb-2"},"País",-1),ae=n("label",{class:"block text-900 mb-2"},"Província",-1),le=n("label",{class:"block text-900 mb-2"},"Municipi",-1),oe={class:"three-columns mb-2"},te=n("label",{class:"block text-900 mb-2"},"Observacions",-1),se={class:"mt-2"},ne=q({__name:"FormSupplier",emits:["submit"],setup(I,{emit:f}){const C=M(),h=D(),{supplier:a}=B(h),m=F(),v=A().shape({comercialName:b().required("El nom comercial és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),taxName:b().required("El nom fiscal és obligatori"),region:b().required("La província és obligatoria"),city:b().required("El municipi és obligatori"),postalCode:b().required("El codi postal és obligatori"),address:b().required("La direcció és obligatoria"),phone:b().required("El telèfon és obligatori"),supplierTypeId:b().required("El tipus de proveïdor és obligatori")}),u=S({result:!1,errors:{}}),E=()=>{a.value.address=""},s=()=>{const r=new L(v);u.value=r.validate(a.value)},i=async()=>{if(s(),u.value.result)f("submit",a.value);else{let r="";Object.entries(u.value.errors).forEach(e=>{r+=`${e[1].map(d=>d)}.   `}),m.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}};return(r,e)=>{const d=V("Dropdown"),o=V("Textarea"),T=V("Button");return l(a)?(y(),$("form",W,[n("section",X,[t(_,{name:"comercialName",class:p(["mb-2",{"p-invalid":u.value.errors.comercialName}]),label:"Nom Comercial",id:"comercialName",modelValue:l(a).comercialName,"onUpdate:modelValue":e[0]||(e[0]=c=>l(a).comercialName=c)},null,8,["modelValue","class"]),t(_,{class:p(["mb-2",{"p-invalid":u.value.errors.taxName}]),label:"Nom Fiscal",id:"taxName",modelValue:l(a).taxName,"onUpdate:modelValue":e[1]||(e[1]=c=>l(a).taxName=c)},null,8,["modelValue","class"]),n("div",null,[Y,t(d,{modelValue:l(a).supplierTypeId,"onUpdate:modelValue":e[2]||(e[2]=c=>l(a).supplierTypeId=c),editable:"",options:l(h).supplierTypes,optionValue:"id",optionLabel:"name",class:p(["w-full",{"p-invalid":u.value.errors.supplierTypeId}])},null,8,["modelValue","options","class"])])]),n("section",Z,[n("div",null,[ee,t(d,{modelValue:l(a).country,"onUpdate:modelValue":e[3]||(e[3]=c=>l(a).country=c),editable:"",options:["Espanya"],class:p(["w-full",{"p-invalid":u.value.errors.country}])},null,8,["modelValue","class"])]),n("div",null,[ae,t(d,{modelValue:l(a).region,"onUpdate:modelValue":e[4]||(e[4]=c=>l(a).region=c),editable:"",options:l(C).regions,optionValue:"nm",optionLabel:"nm",onChange:E,class:p(["w-full",{"p-invalid":u.value.errors.region}])},null,8,["modelValue","options","class"])]),n("div",null,[le,t(d,{modelValue:l(a).city,"onUpdate:modelValue":e[5]||(e[5]=c=>l(a).city=c),editable:"",options:l(C).getTownsByRegionName(l(a).region),optionValue:"nm",optionLabel:"nm",class:p(["w-full",{"p-invalid":u.value.errors.city}])},null,8,["modelValue","options","class"])])]),n("section",oe,[t(_,{label:"Codi Postal",id:"postalCode",modelValue:l(a).postalCode,"onUpdate:modelValue":e[6]||(e[6]=c=>l(a).postalCode=c),class:p({"p-invalid":u.value.errors.postalCode})},null,8,["modelValue","class"]),t(_,{label:"Direcció",id:"address",modelValue:l(a).address,"onUpdate:modelValue":e[7]||(e[7]=c=>l(a).address=c),class:p({"p-invalid":u.value.errors.address})},null,8,["modelValue","class"]),t(_,{label:"Telèfon",id:"phone",modelValue:l(a).phone,"onUpdate:modelValue":e[8]||(e[8]=c=>l(a).phone=c),class:p({"p-invalid":u.value.errors.phone})},null,8,["modelValue","class"])]),n("div",null,[te,t(o,{modelValue:l(a).observations,"onUpdate:modelValue":e[9]||(e[9]=c=>l(a).observations=c),class:"w-full"},null,8,["modelValue"])]),n("div",se,[t(T,{label:"Guardar",class:"mr-2",onClick:i})])])):U("",!0)}}}),re={key:0},ie={class:"three-columns"},ce={class:"three-columns"},ue=n("label",{class:"block text-900 mb-2"},"Predeterminat",-1),de=n("label",{class:"block text-900 mb-2"},"Observacions",-1),me={class:"mt-2"},pe=q({__name:"FormSupplierContact",props:{contact:{}},emits:["submit","cancel"],setup(I,{emit:f}){const C=I,h=F(),a=A().shape({firstName:b().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),lastName:b().required("Els cognoms són obligatoris").max(250,"Els cognoms no poden superar els 250 carácters"),charge:b(),email:b().required("El correu és obligatori").email("Correu electrònic invàlid"),phone:b().required("El telèfon és obligatori").max(15,"Ha superat la longitud màxima del telèfon"),phoneExtension:b(),observations:b(),disabled:R().required(),default:R().required()}),m=S({result:!1,errors:{}}),v=()=>{const s=new L(a);m.value=s.validate(C.contact)},u=async()=>{if(v(),m.value.result)f("submit",C.contact);else{let s="";Object.entries(m.value.errors).forEach(i=>{s+=`${i[1].map(r=>r)}.   `}),h.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}},E=()=>{f("cancel")};return(s,i)=>{const r=V("Checkbox"),e=V("Textarea"),d=V("Button");return s.contact?(y(),$("form",re,[n("section",ie,[t(_,{label:"Nom",id:"firstName",modelValue:s.contact.firstName,"onUpdate:modelValue":i[0]||(i[0]=o=>s.contact.firstName=o),class:p(["mb-2",{"p-invalid":m.value.errors.firstName}])},null,8,["modelValue","class"]),t(_,{label:"Cognoms",id:"lastName",modelValue:s.contact.lastName,"onUpdate:modelValue":i[1]||(i[1]=o=>s.contact.lastName=o),class:p(["mb-2",{"p-invalid":m.value.errors.lastName}])},null,8,["modelValue","class"]),t(_,{label:"Càrrec",id:"charge",modelValue:s.contact.charge,"onUpdate:modelValue":i[2]||(i[2]=o=>s.contact.charge=o),class:p(["mb-2",{"p-invalid":m.value.errors.charge}])},null,8,["modelValue","class"])]),n("section",ce,[t(_,{class:p(["mb-2",{"p-invalid":m.value.errors.email}]),label:"Correu electrònic",id:"email",modelValue:s.contact.email,"onUpdate:modelValue":i[3]||(i[3]=o=>s.contact.email=o)},null,8,["modelValue","class"]),t(_,{class:p(["mb-2",{"p-invalid":m.value.errors.phone}]),label:"Telèfon",id:"phone",modelValue:s.contact.phone,"onUpdate:modelValue":i[4]||(i[4]=o=>s.contact.phone=o)},null,8,["modelValue","class"]),n("div",null,[ue,t(r,{modelValue:s.contact.default,"onUpdate:modelValue":i[5]||(i[5]=o=>s.contact.default=o),class:"w-full",binary:!0},null,8,["modelValue"])])]),n("div",null,[de,t(e,{modelValue:s.contact.observations,"onUpdate:modelValue":i[6]||(i[6]=o=>s.contact.observations=o),class:"w-full"},null,8,["modelValue"])]),n("div",me,[t(d,{label:"Guardar",class:"mr-2",onClick:u}),t(d,{label:"Cancelar",severity:"secondary",class:"mr-2",onClick:E})])])):U("",!0)}}}),ve={key:2},be=["onClick"],fe=q({__name:"SupplierContacts",emits:["create","update","delete"],setup(I,{emit:f}){const C=j(),h=D(),{supplier:a}=B(h),m=S(g.CREATE),v=S(void 0),u=()=>{var r;v.value={supplierId:(r=a.value)==null?void 0:r.id,id:Q(),firstName:"",lastName:"",email:"",phone:"",phoneExtension:"",charge:"",disabled:!1,default:!1,observations:""},m.value=g.CREATE},E=r=>{r.originalEvent.target.className.includes("grid_delete_column_button")||(v.value=r.data,m.value=g.EDIT)},s=()=>{const r=v.value;m.value===g.CREATE?f("create",r):f("update",r),v.value=void 0},i=(r,e)=>{C.require({target:r.currentTarget,message:"Está segur que vol eliminar el contacte?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{f("delete",e)}})};return(r,e)=>{var c;const d=V("Button"),o=V("Column"),T=V("DataTable");return y(),$(z,null,[v.value?U("",!0):(y(),w(d,{key:0,icon:l(k).PLUS,class:"grid_add_row_button",rounded:"",onClick:u},null,8,["icon"])),v.value?(y(),w(pe,{key:1,contact:v.value,onSubmit:s,onCancel:e[0]||(e[0]=()=>v.value=void 0)},null,8,["contact"])):(y(),$("div",ve,[(c=l(a))!=null&&c.contacts?(y(),w(T,{key:0,value:l(a).contacts,tableStyle:"min-width: 100%",onRowClick:E},{default:N(()=>[t(o,{header:"Nom",style:{width:"25%"}},{body:N(x=>[O(P(x.data.firstName)+" "+P(x.data.lastName),1)]),_:1}),t(o,{header:"Càrrec",field:"charge",style:{width:"25%"}}),t(o,{header:"Correu",field:"email",style:{width:"25%"}}),t(o,{header:"Telèfon",field:"phone",style:{width:"25%"}}),t(o,null,{body:N(x=>[n("i",{class:p([l(k).TIMES,"grid_delete_column_button"]),onClick:G=>i(G,x.data)},null,10,be)]),_:1})]),_:1},8,["value"])):U("",!0)]))],64)}}}),Ve=n("span",null,"Proveïdor",-1),Ce=n("span",null,"Contactes",-1),Ne=q({__name:"Supplier",setup(I){const f=S(g.EDIT),C=H(),h=J(),a=D(),{supplier:m}=B(a),v=async()=>{await a.fetchSupplier(C.params.id),a.fetchSupplierTypes();let e="";m.value?(f.value=g.EDIT,e=`Proveïdor ${m.value.comercialName}`):(f.value=g.CREATE,a.setNewSupplier(C.params.id),e="Alta de proveïdor"),h.setMenuItem({icon:k.BUILDING,text:e,backButtonVisible:!0})};K(async()=>{await v()});const u=F(),E=async()=>{const e=m.value;let d=!1,o="";f.value===g.CREATE?(d=await a.createSupplier(e),o="Proveïdor creat correctament"):(d=await a.updateSupplier(e.id,e),o="Proveïdor actualizat correctament"),d&&(u.add({severity:"success",summary:o,life:5e3}),await v())},s=async e=>{await a.addContactToSupplier(e)&&u.add({severity:"success",summary:"Contacte afegit",life:5e3})},i=async e=>{await a.updateContactFromSupplier(e)&&u.add({severity:"success",summary:"Contacte actualizat",life:5e3})},r=async e=>{await a.removeContactFromSupplier(e)&&u.add({severity:"success",summary:"Contacte eliminat",life:5e3})};return(e,d)=>{const o=V("TabPanel"),T=V("TabView");return y(),w(T,null,{default:N(()=>[t(o,null,{header:N(()=>[n("i",{class:p([l(k).BUILDING,"mr-2"])},null,2),Ve]),default:N(()=>[t(ne,{onSubmit:E})]),_:1}),f.value===l(g).EDIT?(y(),w(o,{key:0},{header:N(()=>[n("i",{class:p([l(k).USERS,"mr-2"])},null,2),Ce]),default:N(()=>[t(fe,{onCreate:s,onUpdate:i,onDelete:r})]),_:1})):U("",!0)]),_:1})}}});export{Ne as default};
