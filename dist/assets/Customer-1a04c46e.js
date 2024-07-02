import{d as A,z as F,j as S,r as U,h as v,k as r,a as _,c as q,e as l,i as s,n as m,l as $,H as W,y as P,x as j,F as h,m as T,P as I,w as N,G as O,C as J,D as G,v as K,u as Q,o as X}from"./index-8f350042.js";import{u as M}from"./customers-df5c0a64.js";import{c as x,a as V,F as L,b as D}from"./form-validator-f8953ae6.js";import{u as z}from"./masterData-febae284.js";import{v as H}from"./v4-a960c1f4.js";import"./base.service-642755fa.js";import"./_commonjsHelpers-725317a4.js";import"./index-9bb1cbdb.js";import"./reference.service-7e50bcf5.js";const Y={key:0},Z={class:"three-columns"},ee=l("label",{class:"block text-900 mb-2"},"Tipus Client",-1),ae={class:"two-columns mb-2"},oe={class:"two-columns mb-2"},se=l("label",{class:"block text-900 mb-2"},"Forma de pagament",-1),le=l("label",{class:"block text-900 mb-2"},"Observacions",-1),te={class:"mt-2"},ne=A({__name:"FormCustomer",emits:["submit"],setup(B,{emit:b}){const y=M(),E=z(),{customer:i}=F(y),n=S(),t=x().shape({comercialName:V().required("El nom comercial és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),taxName:V().required("El nom fiscal és obligatori"),vatNumber:V().required("El CIF és obligatori"),accountNumber:V().required("El número de compte es obligatori")}),p=U({result:!1,errors:{}}),C=()=>{const o=new L(t);p.value=o.validate(i.value)},u=async()=>{if(C(),p.value.result)b("submit",i.value);else{let o="";Object.entries(p.value.errors).forEach(e=>{o+=`${e[1].map(c=>c)}.   `}),n.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,e)=>{const c=v("BaseInput"),g=v("Dropdown"),d=v("Textarea"),k=v("Button");return r(i)?(_(),q("form",Y,[l("section",Z,[s(c,{name:"comercialName",class:m(["mb-2",{"p-invalid":p.value.errors.comercialName}]),label:"Nom Comercial",id:"comercialName",modelValue:r(i).comercialName,"onUpdate:modelValue":e[0]||(e[0]=a=>r(i).comercialName=a)},null,8,["modelValue","class"]),s(c,{class:m(["mb-2",{"p-invalid":p.value.errors.taxName}]),label:"Nom Fiscal",id:"taxName",modelValue:r(i).taxName,"onUpdate:modelValue":e[1]||(e[1]=a=>r(i).taxName=a)},null,8,["modelValue","class"]),l("div",null,[ee,s(g,{modelValue:r(i).customerTypeId,"onUpdate:modelValue":e[2]||(e[2]=a=>r(i).customerTypeId=a),editable:"",options:r(y).customerTypes,optionValue:"id",optionLabel:"name",class:m(["w-full",{"p-invalid":p.value.errors.supplierTypeId}])},null,8,["modelValue","options","class"])])]),l("section",ae,[s(c,{name:"vatNumber",class:m(["mb-2",{"p-invalid":p.value.errors.vatNumber}]),label:"CIF",id:"vatNumber",modelValue:r(i).vatNumber,"onUpdate:modelValue":e[3]||(e[3]=a=>r(i).vatNumber=a)},null,8,["modelValue","class"]),s(c,{name:"web",class:m(["mb-2",{"p-invalid":p.value.errors.web}]),label:"Web",id:"web",modelValue:r(i).web,"onUpdate:modelValue":e[4]||(e[4]=a=>r(i).web=a)},null,8,["modelValue","class"])]),l("section",oe,[s(c,{name:"accountNumber",class:m(["mb-2",{"p-invalid":p.value.errors.accountNumber}]),label:"Número de compte",id:"accountNumber",modelValue:r(i).accountNumber,"onUpdate:modelValue":e[5]||(e[5]=a=>r(i).accountNumber=a)},null,8,["modelValue","class"]),l("div",null,[se,s(g,{modelValue:r(i).paymentMethodId,"onUpdate:modelValue":e[6]||(e[6]=a=>r(i).paymentMethodId=a),editable:"",options:r(E).paymentMethods,optionValue:"id",optionLabel:"name",class:m(["w-full",{"p-invalid":p.value.errors.paymentMethodId}])},null,8,["modelValue","options","class"])])]),l("div",null,[le,s(d,{modelValue:r(i).observations,"onUpdate:modelValue":e[7]||(e[7]=a=>r(i).observations=a),class:"w-full"},null,8,["modelValue"])]),l("div",te,[s(k,{label:"Guardar",class:"mr-2",onClick:u})])])):$("",!0)}}}),re={key:0},ie={class:"three-columns"},de=l("label",{class:"block text-900 mb-2"},"Principal",-1),ue=l("label",{class:"block text-900 mb-2"},"Desactivada",-1),ce={class:"three-columns mb-2"},me=l("label",{class:"block text-900 mb-2"},"País",-1),pe=l("label",{class:"block text-900 mb-2"},"Província",-1),be=l("label",{class:"block text-900 mb-2"},"Municipi",-1),ve={class:"three-columns mb-2"},fe=l("label",{class:"block text-900 mb-2"},"Observacions",-1),Ce={class:"mt-2"},ye=A({__name:"FormCustomerAddress",props:{address:{}},emits:["submit","cancel"],setup(B,{emit:b}){const y=B,E=W(),i=S(),n=x().shape({name:V().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),country:V().required("El país és obligatori"),region:V().required("La província és obligatoria"),city:V().required("El municipi és obligatori"),postalCode:V().required("El codi postal és obligatori"),address:V().required("La direcció és obligatoria"),main:D().required(),disabled:D().required()}),t=U({result:!1,errors:{}}),p=()=>{const o=y.address;o.address=""},C=()=>{const o=new L(n);t.value=o.validate(y.address)},u=async()=>{if(C(),t.value.result)b("submit",y.address);else{let o="";Object.entries(t.value.errors).forEach(e=>{o+=`${e[1].map(c=>c)}.   `}),i.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,e)=>{const c=v("Checkbox"),g=v("Dropdown"),d=v("Textarea"),k=v("Button");return o.address?(_(),q("form",re,[l("section",ie,[s(P,{id:"name",class:m(["mb-2",{"p-invalid":t.value.errors.name}]),label:"Nom",modelValue:o.address.name,"onUpdate:modelValue":e[0]||(e[0]=a=>o.address.name=a)},null,8,["modelValue","class"]),l("div",null,[de,s(c,{modelValue:o.address.main,"onUpdate:modelValue":e[1]||(e[1]=a=>o.address.main=a),class:"w-full",binary:!0},null,8,["modelValue"])]),l("div",null,[ue,s(c,{modelValue:o.address.disabled,"onUpdate:modelValue":e[2]||(e[2]=a=>o.address.disabled=a),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("section",ce,[l("div",null,[me,s(g,{modelValue:o.address.country,"onUpdate:modelValue":e[3]||(e[3]=a=>o.address.country=a),editable:"",options:["Espanya"],class:m(["w-full",{"p-invalid":t.value.errors.country}])},null,8,["modelValue","class"])]),l("div",null,[pe,s(g,{modelValue:o.address.region,"onUpdate:modelValue":e[4]||(e[4]=a=>o.address.region=a),editable:"",options:r(E).regions,optionValue:"nm",optionLabel:"nm",onChange:p,class:m(["w-full",{"p-invalid":t.value.errors.region}])},null,8,["modelValue","options","class"])]),l("div",null,[be,s(g,{modelValue:o.address.city,"onUpdate:modelValue":e[5]||(e[5]=a=>o.address.city=a),editable:"",options:r(E).getTownsByRegionName(o.address.region),optionValue:"nm",optionLabel:"nm",class:m(["w-full",{"p-invalid":t.value.errors.city}])},null,8,["modelValue","options","class"])])]),l("section",ve,[s(P,{label:"Codi Postal",id:"postalCode",modelValue:o.address.postalCode,"onUpdate:modelValue":e[6]||(e[6]=a=>o.address.postalCode=a),class:m({"p-invalid":t.value.errors.postalCode})},null,8,["modelValue","class"]),s(P,{label:"Direcció",id:"address",modelValue:o.address.address,"onUpdate:modelValue":e[7]||(e[7]=a=>o.address.address=a),class:m({"p-invalid":t.value.errors.address})},null,8,["modelValue","class"])]),l("div",null,[fe,s(d,{modelValue:o.address.observations,"onUpdate:modelValue":e[8]||(e[8]=a=>o.address.observations=a),class:"w-full"},null,8,["modelValue"])]),l("div",Ce,[s(k,{label:"Guardar",class:"mr-2",onClick:u})])])):$("",!0)}}}),Ve={key:2},_e=["onClick"],ge=A({__name:"TableCustomerAddresses",emits:["create","update","delete"],setup(B,{emit:b}){const y=j(),E=M(),{customer:i}=F(E),n=U(h.CREATE),t=U(void 0),p=()=>{var e;t.value={customerId:(e=i.value)==null?void 0:e.id,id:H(),name:"",country:"",region:"",city:"",postalCode:"",address:"",main:!1,disabled:!1,observations:""},n.value=h.CREATE},C=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||(t.value=e.data,n.value=h.EDIT)},u=()=>{const e=t.value;n.value===h.CREATE?b("create",e):b("update",e),t.value=void 0},o=(e,c)=>{y.require({target:e.currentTarget,message:"Está segur que vol eliminar l'adreça?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{b("delete",c)}})};return(e,c)=>{var f;const g=v("Button"),d=v("Column"),k=v("BooleanColumn"),a=v("DataTable");return _(),q(O,null,[t.value?$("",!0):(_(),T(g,{key:0,icon:r(I).PLUS,class:"grid_add_row_button",rounded:"",onClick:p},null,8,["icon"])),t.value?(_(),T(ye,{key:1,address:t.value,onSubmit:u,onCancel:c[0]||(c[0]=()=>t.value=void 0)},null,8,["address"])):(_(),q("div",Ve,[(f=r(i))!=null&&f.address?(_(),T(a,{key:0,value:r(i).address,tableStyle:"min-width: 100%",onRowClick:C},{default:N(()=>[s(d,{header:"Nom",field:"name",style:{width:"25%"}}),s(d,{header:"Província",field:"region",style:{width:"25%"}}),s(d,{header:"Municipi",field:"city",style:{width:"25%"}}),s(d,{header:"Codi Postal",field:"postalCode",style:{width:"25%"}}),s(d,{header:"Principal"},{body:N(w=>[s(k,{value:w.data.main,"show-color":!1},null,8,["value"])]),_:1}),s(d,null,{body:N(w=>[l("i",{class:m([r(I).TIMES,"grid_delete_column_button"]),onClick:R=>o(R,w.data)},null,10,_e)]),_:1})]),_:1},8,["value"])):$("",!0)]))],64)}}}),he={key:0},we={class:"three-columns"},Ne={class:"four-columns"},Ee=l("label",{class:"block text-900 mb-2"},"Predeterminat",-1),ke={class:"mt-2"},Te=A({__name:"FormCustomerContact",props:{contact:{}},emits:["submit","cancel"],setup(B,{emit:b}){const y=B,E=S(),i=x().shape({firstName:V().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),lastName:V().required("Els cognoms són obligatoris").max(250,"Els cognoms no poden superar els 250 carácters"),charge:V(),email:V().required("El correu és obligatori").email("Correu electrònic invàlid"),phoneNumber:V().required("El telèfon és obligatori").max(15,"Ha superat la longitud màxima del telèfon"),extension:V().required("L'extensió del telèfon és obligatoria"),disabled:D().required(),main:D().required()}),n=U({result:!1,errors:{}}),t=()=>{const u=new L(i);n.value=u.validate(y.contact)},p=async()=>{if(t(),n.value.result)b("submit",y.contact);else{let u="";Object.entries(n.value.errors).forEach(o=>{u+=`${o[1].map(e=>e)}.   `}),E.add({severity:"warn",summary:"Formulari inválid",detail:u,life:5e3})}},C=()=>{b("cancel")};return(u,o)=>{const e=v("BaseInput"),c=v("Checkbox"),g=v("Button");return u.contact?(_(),q("form",he,[l("section",we,[s(e,{label:"Nom",id:"firstName",modelValue:u.contact.firstName,"onUpdate:modelValue":o[0]||(o[0]=d=>u.contact.firstName=d),class:m(["mb-2",{"p-invalid":n.value.errors.firstName}])},null,8,["modelValue","class"]),s(e,{label:"Cognoms",id:"lastName",modelValue:u.contact.lastName,"onUpdate:modelValue":o[1]||(o[1]=d=>u.contact.lastName=d),class:m(["mb-2",{"p-invalid":n.value.errors.lastName}])},null,8,["modelValue","class"]),s(e,{label:"Càrrec",id:"charge",modelValue:u.contact.charge,"onUpdate:modelValue":o[2]||(o[2]=d=>u.contact.charge=d),class:m(["mb-2",{"p-invalid":n.value.errors.charge}])},null,8,["modelValue","class"])]),l("section",Ne,[s(e,{class:m(["mb-2",{"p-invalid":n.value.errors.email}]),label:"Correu electrònic",id:"email",modelValue:u.contact.email,"onUpdate:modelValue":o[3]||(o[3]=d=>u.contact.email=d)},null,8,["modelValue","class"]),s(e,{class:m(["mb-2",{"p-invalid":n.value.errors.extension}]),label:"Extensió",id:"extension",modelValue:u.contact.extension,"onUpdate:modelValue":o[4]||(o[4]=d=>u.contact.extension=d)},null,8,["modelValue","class"]),s(e,{class:m(["mb-2",{"p-invalid":n.value.errors.phone}]),label:"Telèfon",id:"phone",modelValue:u.contact.phoneNumber,"onUpdate:modelValue":o[5]||(o[5]=d=>u.contact.phoneNumber=d)},null,8,["modelValue","class"]),l("div",null,[Ee,s(c,{modelValue:u.contact.main,"onUpdate:modelValue":o[6]||(o[6]=d=>u.contact.main=d),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("div",ke,[s(g,{label:"Guardar",class:"mr-2",onClick:p}),s(g,{label:"Cancelar",severity:"secondary",class:"mr-2",onClick:C})])])):$("",!0)}}}),$e={key:2},Ie=["onClick"],Ue=A({__name:"TableCustomerContacts",emits:["create","update","delete"],setup(B,{emit:b}){const y=j(),E=M(),{customer:i}=F(E),n=U(h.CREATE),t=U(void 0),p=()=>{var e;t.value={customerId:(e=i.value)==null?void 0:e.id,id:H(),charge:"",email:"",firstName:"",lastName:"",disabled:!1,main:!1,phoneNumber:""},n.value=h.CREATE},C=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||(t.value=e.data,n.value=h.EDIT)},u=()=>{const e=t.value;n.value===h.CREATE?b("create",e):b("update",e),t.value=void 0},o=(e,c)=>{y.require({target:e.currentTarget,message:"Está segur que vol eliminar el contacte?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:()=>{b("delete",c)}})};return(e,c)=>{var a;const g=v("Button"),d=v("Column"),k=v("DataTable");return _(),q(O,null,[t.value?$("",!0):(_(),T(g,{key:0,icon:r(I).PLUS,class:"grid_add_row_button",rounded:"",onClick:p},null,8,["icon"])),t.value?(_(),T(Te,{key:1,contact:t.value,onSubmit:u,onCancel:c[0]||(c[0]=()=>t.value=void 0)},null,8,["contact"])):(_(),q("div",$e,[(a=r(i))!=null&&a.contacts?(_(),T(k,{key:0,value:r(i).contacts,tableStyle:"min-width: 100%",onRowClick:C},{default:N(()=>[s(d,{header:"Nom",style:{width:"25%"}},{body:N(f=>[J(G(f.data.firstName)+" "+G(f.data.lastName),1)]),_:1}),s(d,{header:"Càrrec",field:"charge",style:{width:"25%"}}),s(d,{header:"Correu",field:"email",style:{width:"25%"}}),s(d,{header:"Ext.",field:"extension",style:{width:"5%"}}),s(d,{header:"Telèfon",field:"phoneNumber",style:{width:"20%"}}),s(d,null,{body:N(f=>[l("i",{class:m([r(I).TIMES,"grid_delete_column_button"]),onClick:w=>o(w,f.data)},null,10,Ie)]),_:1})]),_:1},8,["value"])):$("",!0)]))],64)}}}),Be=l("span",null,"Client",-1),qe=l("span",null,"Contactes",-1),Ae=l("span",null,"Adreces",-1),je=A({__name:"Customer",setup(B){const b=U(h.EDIT),y=K(),E=Q(),i=z(),n=M(),{customer:t}=F(n),p=async()=>{await n.fetchCustomer(y.params.id),n.fetchCustomerTypes(),i.fetchMasterData();let a="";t.value?(b.value=h.EDIT,a=`Client ${t.value.comercialName}`):(b.value=h.CREATE,n.setNewCustomer(y.params.id),a="Alta de client"),E.setMenuItem({icon:I.BUILDING,title:a,backButtonVisible:!0})};X(async()=>{await p()});const C=S(),u=async()=>{const a=t.value;let f=!1,w="";b.value===h.CREATE?(f=await n.createCustomer(a),w="Client creat correctament"):(f=await n.updateCustomer(a.id,a),w="Client actualizat correctament"),f&&(C.add({severity:"success",summary:w,life:5e3}),await p())},o=async a=>{await n.addContactToCustomer(a)&&C.add({severity:"success",summary:"Contacte afegit",life:5e3})},e=async a=>{await n.updateContactFromCustomer(a)&&C.add({severity:"success",summary:"Contacte actualizat",life:5e3})},c=async a=>{await n.removeContactFromCustomer(a)&&C.add({severity:"success",summary:"Contacte eliminat",life:5e3})},g=async a=>{await n.addAddressToCustomer(a)&&C.add({severity:"success",summary:"Adreça afegida",life:5e3})},d=async a=>{await n.updateAddressFromCustomer(a)&&C.add({severity:"success",summary:"Adreça actualizada",life:5e3})},k=async a=>{await n.removeAddressFromCustomer(a)&&C.add({severity:"success",summary:"Adreça eliminada",life:5e3})};return(a,f)=>{const w=v("TabPanel"),R=v("TabView");return _(),T(R,null,{default:N(()=>[s(w,null,{header:N(()=>[l("i",{class:m([r(I).WALLET,"mr-2"])},null,2),Be]),default:N(()=>[s(ne,{onSubmit:u})]),_:1}),b.value===r(h).EDIT?(_(),T(w,{key:0},{header:N(()=>[l("i",{class:m([r(I).USERS,"mr-2"])},null,2),qe]),default:N(()=>[s(Ue,{onCreate:o,onUpdate:e,onDelete:c})]),_:1})):$("",!0),b.value===r(h).EDIT?(_(),T(w,{key:1},{header:N(()=>[l("i",{class:m([r(I).ENVELOPE,"mr-2"])},null,2),Ae]),default:N(()=>[s(ge,{onCreate:g,onUpdate:d,onDelete:k})]),_:1})):$("",!0)]),_:1})}}});export{je as default};
