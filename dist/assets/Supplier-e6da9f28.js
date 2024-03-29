import{d as F,I as G,z as B,j as $,o as R,r as I,h as y,k as o,a as g,c as q,e as t,i as l,n as p,l as S,x as j,F as N,m as w,P as k,w as E,C as z,D as M,G as O,v as H,u as J}from"./index-19723412.js";import{u as D}from"./suppliers-15aaba45.js";import{c as L,a as b,F as A,b as P}from"./form-validator-f8953ae6.js";import{u as K}from"./paymentMethod-00b54fe8.js";import{v as Q}from"./v4-a960c1f4.js";import"./suppliers.service-a33ef70d.js";import"./base.service-2e682391.js";import"./_commonjsHelpers-725317a4.js";import"./index-524ef867.js";import"./reference.service-fb6ab95a.js";const W={key:0},X={class:"three-columns"},Y={class:"three-columns mb-2"},Z=t("label",{class:"block text-900 mb-2"},"País",-1),ee=t("label",{class:"block text-900 mb-2"},"Província",-1),ae=t("label",{class:"block text-900 mb-2"},"Municipi",-1),oe={class:"three-columns mb-2"},le={class:"three-columns"},te=t("label",{class:"block text-900 mb-2"},"Forma de pagament",-1),se=t("label",{class:"block text-900 mb-2"},"Tipus Proveïdor",-1),ne=t("label",{class:"block text-900 mb-2"},"Observacions",-1),re={class:"mt-2"},ie=F({__name:"FormSupplier",emits:["submit"],setup(U,{emit:V}){const C=G(),h=D(),v=K(),{supplier:e}=B(h),f=$();R(async()=>{await v.fetchAll()});const _=L().shape({comercialName:b().required("El nom comercial és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),vatNumber:b().required("El CIF és obligatori").max(15,"El CIF no pot superar els 15 carácters"),taxName:b().required("El nom fiscal és obligatori"),region:b().required("La província és obligatoria"),city:b().required("El municipi és obligatori"),postalCode:b().required("El codi postal és obligatori"),address:b().required("La direcció és obligatoria"),phone:b().required("El telèfon és obligatori"),accountNumber:b().required("El número de compte és obligatori").max(35,"El número de compte no pot superar el 35 dígits"),supplierTypeId:b().required("El tipus de proveïdor és obligatori"),paymentMethodId:b().required("La forma de pagament és obligatoria")}),m=I({result:!1,errors:{}}),r=()=>{e.value.address=""},c=()=>{const s=new A(_);m.value=s.validate(e.value)},u=async()=>{if(c(),m.value.result)V("submit",e.value);else{let s="";Object.entries(m.value.errors).forEach(a=>{s+=`${a[1].map(i=>i)}.   `}),f.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,a)=>{const i=y("BaseInput"),d=y("Dropdown"),x=y("Textarea"),T=y("Button");return o(e)?(g(),q("form",W,[t("section",X,[l(i,{name:"comercialName",class:p(["mb-2",{"p-invalid":m.value.errors.comercialName}]),label:"Nom Comercial",id:"comercialName",modelValue:o(e).comercialName,"onUpdate:modelValue":a[0]||(a[0]=n=>o(e).comercialName=n)},null,8,["modelValue","class"]),l(i,{class:p(["mb-2",{"p-invalid":m.value.errors.taxName}]),label:"Nom Fiscal",id:"taxName",modelValue:o(e).taxName,"onUpdate:modelValue":a[1]||(a[1]=n=>o(e).taxName=n)},null,8,["modelValue","class"]),l(i,{label:"CIF",id:"vatNumber",modelValue:o(e).vatNumber,"onUpdate:modelValue":a[2]||(a[2]=n=>o(e).vatNumber=n),class:p({"p-invalid":m.value.errors.vatNumber})},null,8,["modelValue","class"])]),t("section",Y,[t("div",null,[Z,l(d,{modelValue:o(e).country,"onUpdate:modelValue":a[3]||(a[3]=n=>o(e).country=n),editable:"",options:["Espanya"],class:p(["w-full",{"p-invalid":m.value.errors.country}])},null,8,["modelValue","class"])]),t("div",null,[ee,l(d,{modelValue:o(e).region,"onUpdate:modelValue":a[4]||(a[4]=n=>o(e).region=n),editable:"",options:o(C).regions,optionValue:"nm",optionLabel:"nm",onChange:r,class:p(["w-full",{"p-invalid":m.value.errors.region}])},null,8,["modelValue","options","class"])]),t("div",null,[ae,l(d,{modelValue:o(e).city,"onUpdate:modelValue":a[5]||(a[5]=n=>o(e).city=n),editable:"",options:o(C).getTownsByRegionName(o(e).region),optionValue:"nm",optionLabel:"nm",class:p(["w-full",{"p-invalid":m.value.errors.city}])},null,8,["modelValue","options","class"])])]),t("section",oe,[l(i,{label:"Codi Postal",id:"postalCode",modelValue:o(e).postalCode,"onUpdate:modelValue":a[6]||(a[6]=n=>o(e).postalCode=n),class:p({"p-invalid":m.value.errors.postalCode})},null,8,["modelValue","class"]),l(i,{label:"Direcció",id:"address",modelValue:o(e).address,"onUpdate:modelValue":a[7]||(a[7]=n=>o(e).address=n),class:p({"p-invalid":m.value.errors.address})},null,8,["modelValue","class"]),l(i,{label:"Telèfon",id:"phone",modelValue:o(e).phone,"onUpdate:modelValue":a[8]||(a[8]=n=>o(e).phone=n),class:p({"p-invalid":m.value.errors.phone})},null,8,["modelValue","class"])]),t("section",le,[t("div",null,[te,l(d,{modelValue:o(e).paymentMethodId,"onUpdate:modelValue":a[9]||(a[9]=n=>o(e).paymentMethodId=n),editable:"",options:o(v).paymentMethods,optionValue:"id",optionLabel:"name",class:p(["w-full",{"p-invalid":m.value.errors.paymentMethodId}])},null,8,["modelValue","options","class"])]),l(i,{label:"Número de compte",id:"accountNumber",modelValue:o(e).accountNumber,"onUpdate:modelValue":a[10]||(a[10]=n=>o(e).accountNumber=n),class:p({"p-invalid":m.value.errors.accountNumber})},null,8,["modelValue","class"]),t("div",null,[se,l(d,{modelValue:o(e).supplierTypeId,"onUpdate:modelValue":a[11]||(a[11]=n=>o(e).supplierTypeId=n),editable:"",options:o(h).supplierTypes,optionValue:"id",optionLabel:"name",class:p(["w-full",{"p-invalid":m.value.errors.supplierTypeId}])},null,8,["modelValue","options","class"])])]),t("div",null,[ne,l(x,{modelValue:o(e).observations,"onUpdate:modelValue":a[12]||(a[12]=n=>o(e).observations=n),class:"w-full"},null,8,["modelValue"])]),t("div",re,[l(T,{label:"Guardar",class:"mr-2",onClick:u})])])):S("",!0)}}}),ue={key:0},de={class:"three-columns"},ce={class:"three-columns"},me=t("label",{class:"block text-900 mb-2"},"Predeterminat",-1),pe=t("label",{class:"block text-900 mb-2"},"Observacions",-1),ve={class:"mt-2"},be=F({__name:"FormSupplierContact",props:{contact:{}},emits:["submit","cancel"],setup(U,{emit:V}){const C=U,h=$(),v=L().shape({firstName:b().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),lastName:b().required("Els cognoms són obligatoris").max(250,"Els cognoms no poden superar els 250 carácters"),charge:b(),email:b().required("El correu és obligatori").email("Correu electrònic invàlid"),phone:b().required("El telèfon és obligatori").max(15,"Ha superat la longitud màxima del telèfon"),phoneExtension:b(),observations:b(),disabled:P().required(),default:P().required()}),e=I({result:!1,errors:{}}),f=()=>{const r=new A(v);e.value=r.validate(C.contact)},_=async()=>{if(f(),e.value.result)V("submit",C.contact);else{let r="";Object.entries(e.value.errors).forEach(c=>{r+=`${c[1].map(u=>u)}.   `}),h.add({severity:"warn",summary:"Formulari inválid",detail:r,life:5e3})}},m=()=>{V("cancel")};return(r,c)=>{const u=y("BaseInput"),s=y("Checkbox"),a=y("Textarea"),i=y("Button");return r.contact?(g(),q("form",ue,[t("section",de,[l(u,{label:"Nom",id:"firstName",modelValue:r.contact.firstName,"onUpdate:modelValue":c[0]||(c[0]=d=>r.contact.firstName=d),class:p(["mb-2",{"p-invalid":e.value.errors.firstName}])},null,8,["modelValue","class"]),l(u,{label:"Cognoms",id:"lastName",modelValue:r.contact.lastName,"onUpdate:modelValue":c[1]||(c[1]=d=>r.contact.lastName=d),class:p(["mb-2",{"p-invalid":e.value.errors.lastName}])},null,8,["modelValue","class"]),l(u,{label:"Càrrec",id:"charge",modelValue:r.contact.charge,"onUpdate:modelValue":c[2]||(c[2]=d=>r.contact.charge=d),class:p(["mb-2",{"p-invalid":e.value.errors.charge}])},null,8,["modelValue","class"])]),t("section",ce,[l(u,{class:p(["mb-2",{"p-invalid":e.value.errors.email}]),label:"Correu electrònic",id:"email",modelValue:r.contact.email,"onUpdate:modelValue":c[3]||(c[3]=d=>r.contact.email=d)},null,8,["modelValue","class"]),l(u,{class:p(["mb-2",{"p-invalid":e.value.errors.phone}]),label:"Telèfon",id:"phone",modelValue:r.contact.phone,"onUpdate:modelValue":c[4]||(c[4]=d=>r.contact.phone=d)},null,8,["modelValue","class"]),t("div",null,[me,l(s,{modelValue:r.contact.default,"onUpdate:modelValue":c[5]||(c[5]=d=>r.contact.default=d),class:"w-full",binary:!0},null,8,["modelValue"])])]),t("div",null,[pe,l(a,{modelValue:r.contact.observations,"onUpdate:modelValue":c[6]||(c[6]=d=>r.contact.observations=d),class:"w-full"},null,8,["modelValue"])]),t("div",ve,[l(i,{label:"Guardar",class:"mr-2",onClick:_}),l(i,{label:"Cancelar",severity:"secondary",class:"mr-2",onClick:m})])])):S("",!0)}}}),fe={key:2},Ve=["onClick"],ye=F({__name:"TableSupplierContacts",emits:["create","update","delete"],setup(U,{emit:V}){const C=j(),h=D(),{supplier:v}=B(h),e=I(N.CREATE),f=I(void 0),_=()=>{var u;f.value={supplierId:(u=v.value)==null?void 0:u.id,id:Q(),firstName:"",lastName:"",email:"",phone:"",phoneExtension:"",charge:"",disabled:!1,default:!1,observations:""},e.value=N.CREATE},m=u=>{u.originalEvent.target.className.includes("grid_delete_column_button")||(f.value=u.data,e.value=N.EDIT)},r=()=>{const u=f.value;e.value===N.CREATE?V("create",u):V("update",u),f.value=void 0},c=(u,s)=>{C.require({target:u.currentTarget,message:"Está segur que vol eliminar el contacte?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{V("delete",s)}})};return(u,s)=>{var x;const a=y("Button"),i=y("Column"),d=y("DataTable");return g(),q(O,null,[f.value?S("",!0):(g(),w(a,{key:0,icon:o(k).PLUS,class:"grid_add_row_button",rounded:"",onClick:_},null,8,["icon"])),f.value?(g(),w(be,{key:1,contact:f.value,onSubmit:r,onCancel:s[0]||(s[0]=()=>f.value=void 0)},null,8,["contact"])):(g(),q("div",fe,[(x=o(v))!=null&&x.contacts?(g(),w(d,{key:0,value:o(v).contacts,tableStyle:"min-width: 100%",onRowClick:m},{default:E(()=>[l(i,{header:"Nom",style:{width:"25%"}},{body:E(T=>[z(M(T.data.firstName)+" "+M(T.data.lastName),1)]),_:1}),l(i,{header:"Càrrec",field:"charge",style:{width:"25%"}}),l(i,{header:"Correu",field:"email",style:{width:"25%"}}),l(i,{header:"Telèfon",field:"phone",style:{width:"25%"}}),l(i,null,{body:E(T=>[t("i",{class:p([o(k).TIMES,"grid_delete_column_button"]),onClick:n=>c(n,T.data)},null,10,Ve)]),_:1})]),_:1},8,["value"])):S("",!0)]))],64)}}}),Ce=t("span",null,"Proveïdor",-1),_e=t("span",null,"Contactes",-1),xe=F({__name:"Supplier",setup(U){const V=I(N.EDIT),C=H(),h=J(),v=D(),{supplier:e}=B(v),f=async()=>{await v.fetchSupplier(C.params.id),v.fetchSupplierTypes();let s="";e.value?(V.value=N.EDIT,s=`Proveïdor ${e.value.comercialName}`):(V.value=N.CREATE,v.setNewSupplier(C.params.id),s="Alta de proveïdor"),h.setMenuItem({icon:k.BUILDING,title:s,backButtonVisible:!0})};R(async()=>{await f()});const _=$(),m=async()=>{const s=e.value;let a=!1,i="";V.value===N.CREATE?(a=await v.createSupplier(s),i="Proveïdor creat correctament"):(a=await v.updateSupplier(s.id,s),i="Proveïdor actualizat correctament"),a&&(_.add({severity:"success",summary:i,life:5e3}),await f())},r=async s=>{await v.addContactToSupplier(s)&&_.add({severity:"success",summary:"Contacte afegit",life:5e3})},c=async s=>{await v.updateContactFromSupplier(s)&&_.add({severity:"success",summary:"Contacte actualizat",life:5e3})},u=async s=>{await v.removeContactFromSupplier(s)&&_.add({severity:"success",summary:"Contacte eliminat",life:5e3})};return(s,a)=>{const i=y("TabPanel"),d=y("TabView");return g(),w(d,null,{default:E(()=>[l(i,null,{header:E(()=>[t("i",{class:p([o(k).BUILDING,"mr-2"])},null,2),Ce]),default:E(()=>[l(ie,{onSubmit:m})]),_:1}),V.value===o(N).EDIT?(g(),w(i,{key:0},{header:E(()=>[t("i",{class:p([o(k).USERS,"mr-2"])},null,2),_e]),default:E(()=>[l(ye,{onCreate:r,onUpdate:c,onDelete:u})]),_:1})):S("",!0)]),_:1})}}});export{xe as default};
