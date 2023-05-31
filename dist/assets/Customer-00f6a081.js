import{b as z}from"./vue-router-c71b0622.js";import{j as q,aw as S,k as I,f as C,l as i,o as _,c as A,e as l,h as s,n as b,d as $,a as T,P as U,w as N,F as x,a0 as W,t as j,u as H,M as J}from"./index-0e14a554.js";import{u as M}from"./customers-bca4d3e0.js";import{u as P}from"./usetoast.esm-2dfabc60.js";import{F as w}from"./component-45e7825d.js";import{B as E}from"./BaseInput-9aa79c5a.js";import{c as R,a as g,F as L,d as D}from"./form-validator-88e54800.js";import{u as K}from"./paymentMethod-328a547e.js";import{u as Q}from"./geography-384161c0.js";import{u as G}from"./useconfirm.esm-6f798407.js";import{B as X}from"./BooleanColumn-e0156731.js";import{v as O}from"./v4-a960c1f4.js";import"./base.service-431caa23.js";import"./_plugin-vue_export-helper-c27b6911.js";const Y={key:0},Z={class:"three-columns"},ee=l("label",{class:"block text-900 mb-2"},"Tipus Client",-1),ae={class:"two-columns mb-2"},oe={class:"two-columns mb-2"},se=l("label",{class:"block text-900 mb-2"},"Forma de pagament",-1),te=l("label",{class:"block text-900 mb-2"},"Observacions",-1),le={class:"mt-2"},ne=q({__name:"FormCustomer",emits:["submit"],setup(F,{emit:v}){const y=M(),h=K(),{customer:o}=S(y);S(h);const c=P(),n=R().shape({comercialName:g().required("El nom comercial és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),taxName:g().required("El nom fiscal és obligatori"),vatNumber:g().required("El CIF és obligatori"),accountNumber:g().required("El número de compte es obligatori")}),u=I({result:!1,errors:{}}),k=()=>{const a=new L(n);u.value=a.validate(o.value)},d=async()=>{if(k(),u.value.result)v("submit",o.value);else{let a="";Object.entries(u.value.errors).forEach(e=>{a+=`${e[1].map(m=>m)}.   `}),c.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,e)=>{const m=C("Dropdown"),p=C("Textarea"),f=C("Button");return i(o)?(_(),A("form",Y,[l("section",Z,[s(E,{name:"comercialName",class:b(["mb-2",{"p-invalid":u.value.errors.comercialName}]),label:"Nom Comercial",id:"comercialName",modelValue:i(o).comercialName,"onUpdate:modelValue":e[0]||(e[0]=t=>i(o).comercialName=t)},null,8,["modelValue","class"]),s(E,{class:b(["mb-2",{"p-invalid":u.value.errors.taxName}]),label:"Nom Fiscal",id:"taxName",modelValue:i(o).taxName,"onUpdate:modelValue":e[1]||(e[1]=t=>i(o).taxName=t)},null,8,["modelValue","class"]),l("div",null,[ee,s(m,{modelValue:i(o).customerTypeId,"onUpdate:modelValue":e[2]||(e[2]=t=>i(o).customerTypeId=t),editable:"",options:i(y).customerTypes,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":u.value.errors.supplierTypeId}])},null,8,["modelValue","options","class"])])]),l("section",ae,[s(E,{name:"vatNumber",class:b(["mb-2",{"p-invalid":u.value.errors.vatNumber}]),label:"CIF",id:"vatNumber",modelValue:i(o).vatNumber,"onUpdate:modelValue":e[3]||(e[3]=t=>i(o).vatNumber=t)},null,8,["modelValue","class"]),s(E,{name:"web",class:b(["mb-2",{"p-invalid":u.value.errors.web}]),label:"Web",id:"web",modelValue:i(o).web,"onUpdate:modelValue":e[4]||(e[4]=t=>i(o).web=t)},null,8,["modelValue","class"])]),l("section",oe,[s(E,{name:"accountNumber",class:b(["mb-2",{"p-invalid":u.value.errors.accountNumber}]),label:"Número de compte",id:"accountNumber",modelValue:i(o).accountNumber,"onUpdate:modelValue":e[5]||(e[5]=t=>i(o).accountNumber=t)},null,8,["modelValue","class"]),l("div",null,[se,s(m,{modelValue:i(o).paymentMethodId,"onUpdate:modelValue":e[6]||(e[6]=t=>i(o).paymentMethodId=t),editable:"",options:i(h).paymentMethods,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":u.value.errors.paymentMethodId}])},null,8,["modelValue","options","class"])])]),l("div",null,[te,s(p,{modelValue:i(o).observations,"onUpdate:modelValue":e[7]||(e[7]=t=>i(o).observations=t),class:"w-full"},null,8,["modelValue"])]),l("div",le,[s(f,{label:"Guardar",class:"mr-2",onClick:d})])])):$("",!0)}}}),re={key:0},ie={class:"three-columns"},de=l("label",{class:"block text-900 mb-2"},"Principal",-1),ue=l("label",{class:"block text-900 mb-2"},"Desactivada",-1),ce={class:"three-columns mb-2"},me=l("label",{class:"block text-900 mb-2"},"País",-1),pe=l("label",{class:"block text-900 mb-2"},"Província",-1),be=l("label",{class:"block text-900 mb-2"},"Municipi",-1),ve={class:"three-columns mb-2"},fe=l("label",{class:"block text-900 mb-2"},"Observacions",-1),Ce={class:"mt-2"},ye=q({__name:"FormCustomerAddress",props:{address:{}},emits:["submit","cancel"],setup(F,{emit:v}){const y=F,h=Q(),o=P(),c=R().shape({name:g().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),country:g().required("El país és obligatori"),region:g().required("La província és obligatoria"),city:g().required("El municipi és obligatori"),postalCode:g().required("El codi postal és obligatori"),address:g().required("La direcció és obligatoria"),default:D().required(),disabled:D().required()}),n=I({result:!1,errors:{}}),u=()=>{const a=y.address;a.address=""},k=()=>{const a=new L(c);n.value=a.validate(y.address)},d=async()=>{if(k(),n.value.result)v("submit",y.address);else{let a="";Object.entries(n.value.errors).forEach(e=>{a+=`${e[1].map(m=>m)}.   `}),o.add({severity:"warn",summary:"Formulari inválid",detail:a,life:5e3})}};return(a,e)=>{const m=C("Checkbox"),p=C("Dropdown"),f=C("Textarea"),t=C("Button");return a.address?(_(),A("form",re,[l("section",ie,[s(E,{id:"name",class:b(["mb-2",{"p-invalid":n.value.errors.name}]),label:"Nom",modelValue:a.address.name,"onUpdate:modelValue":e[0]||(e[0]=r=>a.address.name=r)},null,8,["modelValue","class"]),l("div",null,[de,s(m,{modelValue:a.address.default,"onUpdate:modelValue":e[1]||(e[1]=r=>a.address.default=r),class:"w-full",binary:!0},null,8,["modelValue"])]),l("div",null,[ue,s(m,{modelValue:a.address.disabled,"onUpdate:modelValue":e[2]||(e[2]=r=>a.address.disabled=r),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("section",ce,[l("div",null,[me,s(p,{modelValue:a.address.country,"onUpdate:modelValue":e[3]||(e[3]=r=>a.address.country=r),editable:"",options:["Espanya"],class:b(["w-full",{"p-invalid":n.value.errors.country}])},null,8,["modelValue","class"])]),l("div",null,[pe,s(p,{modelValue:a.address.region,"onUpdate:modelValue":e[4]||(e[4]=r=>a.address.region=r),editable:"",options:i(h).regions,optionValue:"nm",optionLabel:"nm",onChange:u,class:b(["w-full",{"p-invalid":n.value.errors.region}])},null,8,["modelValue","options","class"])]),l("div",null,[be,s(p,{modelValue:a.address.city,"onUpdate:modelValue":e[5]||(e[5]=r=>a.address.city=r),editable:"",options:i(h).getTownsByRegionName(a.address.region),optionValue:"nm",optionLabel:"nm",class:b(["w-full",{"p-invalid":n.value.errors.city}])},null,8,["modelValue","options","class"])])]),l("section",ve,[s(E,{label:"Codi Postal",id:"postalCode",modelValue:a.address.postalCode,"onUpdate:modelValue":e[6]||(e[6]=r=>a.address.postalCode=r),class:b({"p-invalid":n.value.errors.postalCode})},null,8,["modelValue","class"]),s(E,{label:"Direcció",id:"address",modelValue:a.address.address,"onUpdate:modelValue":e[7]||(e[7]=r=>a.address.address=r),class:b({"p-invalid":n.value.errors.address})},null,8,["modelValue","class"])]),l("div",null,[fe,s(f,{modelValue:a.address.observations,"onUpdate:modelValue":e[8]||(e[8]=r=>a.address.observations=r),class:"w-full"},null,8,["modelValue"])]),l("div",Ce,[s(t,{label:"Guardar",class:"mr-2",onClick:d})])])):$("",!0)}}}),Ve={key:2},_e=["onClick"],ge=q({__name:"CustomerAddresses",emits:["create","update","delete"],setup(F,{emit:v}){const y=G(),h=M(),{customer:o}=S(h),c=I(w.CREATE),n=I(void 0),u=()=>{var e;n.value={customerId:(e=o.value)==null?void 0:e.id,id:O(),name:"",country:"",region:"",city:"",postalCode:"",address:"",default:!1,disabled:!1,observations:""},c.value=w.CREATE},k=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||(n.value=e.data,c.value=w.EDIT)},d=()=>{const e=n.value;c.value===w.CREATE?v("create",e):v("update",e),n.value=void 0},a=(e,m)=>{y.require({target:e.currentTarget,message:"Está segur que vol eliminar l'adreça?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{v("delete",m)}})};return(e,m)=>{var r;const p=C("Button"),f=C("Column"),t=C("DataTable");return _(),A(x,null,[n.value?$("",!0):(_(),T(p,{key:0,icon:i(U).PLUS,class:"grid_add_row_button",rounded:"",onClick:u},null,8,["icon"])),n.value?(_(),T(ye,{key:1,address:n.value,onSubmit:d,onCancel:m[0]||(m[0]=()=>n.value=void 0)},null,8,["address"])):(_(),A("div",Ve,[(r=i(o))!=null&&r.address?(_(),T(t,{key:0,value:i(o).address,tableStyle:"min-width: 100%",onRowClick:k},{default:N(()=>[s(f,{header:"Nom",field:"name",style:{width:"25%"}}),s(f,{header:"Província",field:"region",style:{width:"25%"}}),s(f,{header:"Municipi",field:"city",style:{width:"25%"}}),s(f,{header:"Codi Postal",field:"postalCode",style:{width:"25%"}}),s(f,{header:"Principal"},{body:N(V=>[s(X,{value:V.data.default,"show-color":!0},null,8,["value"])]),_:1}),s(f,null,{body:N(V=>[l("i",{class:b([i(U).TIMES,"grid_delete_column_button"]),onClick:B=>a(B,V.data)},null,10,_e)]),_:1})]),_:1},8,["value"])):$("",!0)]))],64)}}}),we={key:0},he={class:"three-columns"},Ne={class:"three-columns"},Ee=l("label",{class:"block text-900 mb-2"},"Predeterminat",-1),ke={class:"mt-2"},Te=q({__name:"FormCustomerContact",props:{contact:{}},emits:["submit","cancel"],setup(F,{emit:v}){const y=F,h=P(),o=R().shape({firstName:g().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),lastName:g().required("Els cognoms són obligatoris").max(250,"Els cognoms no poden superar els 250 carácters"),charge:g(),email:g().required("El correu és obligatori").email("Correu electrònic invàlid"),phoneNumber:g().required("El telèfon és obligatori").max(15,"Ha superat la longitud màxima del telèfon"),disabled:D().required(),mainContact:D().required()}),c=I({result:!1,errors:{}}),n=()=>{const d=new L(o);c.value=d.validate(y.contact)},u=async()=>{if(n(),c.value.result)v("submit",y.contact);else{let d="";Object.entries(c.value.errors).forEach(a=>{d+=`${a[1].map(e=>e)}.   `}),h.add({severity:"warn",summary:"Formulari inválid",detail:d,life:5e3})}},k=()=>{v("cancel")};return(d,a)=>{const e=C("Checkbox"),m=C("Button");return d.contact?(_(),A("form",we,[l("section",he,[s(E,{label:"Nom",id:"firstName",modelValue:d.contact.firstName,"onUpdate:modelValue":a[0]||(a[0]=p=>d.contact.firstName=p),class:b(["mb-2",{"p-invalid":c.value.errors.firstName}])},null,8,["modelValue","class"]),s(E,{label:"Cognoms",id:"lastName",modelValue:d.contact.lastName,"onUpdate:modelValue":a[1]||(a[1]=p=>d.contact.lastName=p),class:b(["mb-2",{"p-invalid":c.value.errors.lastName}])},null,8,["modelValue","class"]),s(E,{label:"Càrrec",id:"charge",modelValue:d.contact.charge,"onUpdate:modelValue":a[2]||(a[2]=p=>d.contact.charge=p),class:b(["mb-2",{"p-invalid":c.value.errors.charge}])},null,8,["modelValue","class"])]),l("section",Ne,[s(E,{class:b(["mb-2",{"p-invalid":c.value.errors.email}]),label:"Correu electrònic",id:"email",modelValue:d.contact.email,"onUpdate:modelValue":a[3]||(a[3]=p=>d.contact.email=p)},null,8,["modelValue","class"]),s(E,{class:b(["mb-2",{"p-invalid":c.value.errors.phone}]),label:"Telèfon",id:"phone",modelValue:d.contact.phoneNumber,"onUpdate:modelValue":a[4]||(a[4]=p=>d.contact.phoneNumber=p)},null,8,["modelValue","class"]),l("div",null,[Ee,s(e,{modelValue:d.contact.mainContact,"onUpdate:modelValue":a[5]||(a[5]=p=>d.contact.mainContact=p),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("div",ke,[s(m,{label:"Guardar",class:"mr-2",onClick:u}),s(m,{label:"Cancelar",severity:"secondary",class:"mr-2",onClick:k})])])):$("",!0)}}}),$e={key:2},Ue=["onClick"],Ie=q({__name:"CustomerContacts",emits:["create","update","delete"],setup(F,{emit:v}){const y=G(),h=M(),{customer:o}=S(h),c=I(w.CREATE),n=I(void 0),u=()=>{var e;n.value={customerId:(e=o.value)==null?void 0:e.id,id:O(),charge:"",email:"",firstName:"",lastName:"",disabled:!1,mainContact:!1,phoneNumber:""},c.value=w.CREATE},k=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||(n.value=e.data,c.value=w.EDIT)},d=()=>{const e=n.value;c.value===w.CREATE?v("create",e):v("update",e),n.value=void 0},a=(e,m)=>{y.require({target:e.currentTarget,message:"Está segur que vol eliminar el contacte?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{v("delete",m)}})};return(e,m)=>{var r;const p=C("Button"),f=C("Column"),t=C("DataTable");return _(),A(x,null,[n.value?$("",!0):(_(),T(p,{key:0,icon:i(U).PLUS,class:"grid_add_row_button",rounded:"",onClick:u},null,8,["icon"])),n.value?(_(),T(Te,{key:1,contact:n.value,onSubmit:d,onCancel:m[0]||(m[0]=()=>n.value=void 0)},null,8,["contact"])):(_(),A("div",$e,[(r=i(o))!=null&&r.contacts?(_(),T(t,{key:0,value:i(o).contacts,tableStyle:"min-width: 100%",onRowClick:k},{default:N(()=>[s(f,{header:"Nom",style:{width:"25%"}},{body:N(V=>[W(j(V.data.firstName)+" "+j(V.data.lastName),1)]),_:1}),s(f,{header:"Càrrec",field:"charge",style:{width:"25%"}}),s(f,{header:"Correu",field:"email",style:{width:"25%"}}),s(f,{header:"Telèfon",field:"phoneNumber",style:{width:"25%"}}),s(f,null,{body:N(V=>[l("i",{class:b([i(U).TIMES,"grid_delete_column_button"]),onClick:B=>a(B,V.data)},null,10,Ue)]),_:1})]),_:1},8,["value"])):$("",!0)]))],64)}}}),Fe=l("span",null,"Client",-1),Ae=l("span",null,"Contactes",-1),qe=l("span",null,"Adreces",-1),Je=q({__name:"Customer",setup(F){const v=I(w.EDIT),y=z(),h=H(),o=M(),{customer:c}=S(o),n=async()=>{await o.fetchCustomer(y.params.id),await o.fetchCustomerTypes();let t="";c.value?(v.value=w.EDIT,t=`Client ${c.value.comercialName}`):(v.value=w.CREATE,o.setNewCustomer(y.params.id),t="Alta de client"),h.setMenuItem({icon:U.BUILDING,text:t,backButtonVisible:!0})};J(async()=>{await n()});const u=P(),k=async()=>{const t=c.value;let r=!1,V="";v.value===w.CREATE?(r=await o.createCustomer(t),V="Client creat correctament"):(r=await o.updateCustomer(t.id,t),V="Client actualizat correctament"),r&&(u.add({severity:"success",summary:V,life:5e3}),await n())},d=async t=>{await o.addContactToCustomer(t)&&u.add({severity:"success",summary:"Contacte afegit",life:5e3})},a=async t=>{await o.updateContactFromCustomer(t)&&u.add({severity:"success",summary:"Contacte actualizat",life:5e3})},e=async t=>{await o.removeContactFromCustomer(t)&&u.add({severity:"success",summary:"Contacte eliminat",life:5e3})},m=async t=>{await o.addAddressToCustomer(t)&&u.add({severity:"success",summary:"Adreça afegida",life:5e3})},p=async t=>{await o.updateAddressFromCustomer(t)&&u.add({severity:"success",summary:"Adreça actualizada",life:5e3})},f=async t=>{await o.removeAddressFromCustomer(t)&&u.add({severity:"success",summary:"Adreça eliminada",life:5e3})};return(t,r)=>{const V=C("TabPanel"),B=C("TabView");return _(),T(B,null,{default:N(()=>[s(V,null,{header:N(()=>[l("i",{class:b([i(U).WALLET,"mr-2"])},null,2),Fe]),default:N(()=>[s(ne,{onSubmit:k})]),_:1}),v.value===i(w).EDIT?(_(),T(V,{key:0},{header:N(()=>[l("i",{class:b([i(U).USERS,"mr-2"])},null,2),Ae]),default:N(()=>[s(Ie,{onCreate:d,onUpdate:a,onDelete:e})]),_:1})):$("",!0),v.value===i(w).EDIT?(_(),T(V,{key:1},{header:N(()=>[l("i",{class:b([i(U).ENVELOPE,"mr-2"])},null,2),qe]),default:N(()=>[s(ge,{onCreate:m,onUpdate:p,onDelete:f})]),_:1})):$("",!0)]),_:1})}}});export{Je as default};