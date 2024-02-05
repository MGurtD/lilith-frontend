import{d as E,o as x,j as N,I as F,z as S,r as U,h as w,k as e,c as M,e as t,i as n,n as i,y as m,l as I,a as L,F as y,v as D,u as P,m as R,P as A,L as $}from"./index-30e64f83.js";import{u as h}from"./plantmodel-23537ae7.js";import{c as q,a as C,F as z}from"./form-validator-497b2185.js";import"./index-b8eb6b9a.js";import"./base.service-3e1c705c.js";const G={key:0},j={class:"three-columns"},O={class:"three-columns"},W=t("label",{class:"block text-900 mb-2"},"País",-1),H=t("label",{class:"block text-900 mb-2"},"Província",-1),J=t("label",{class:"block text-900 mb-2"},"Municipi",-1),K={class:"three-columns mb-2"},Q={class:"three-columns"},X=t("label",{class:"block text-900 mb-2"},"Empresa",-1),Y=t("label",{class:"block text-900 mb-2"},"Desactivat",-1),Z={class:"mt-2"},ee=E({__name:"FormSite",props:{site:{}},emits:["submit","cancel"],setup(k,{emit:b}){const v=k;x(async()=>{await u.fetchEnterprises()});const _=N(),d=F(),u=h(),{site:l}=S(u),g=q().shape({name:C().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:C().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),enterpriseId:C().required("L'empresa es obligatoria")}),o=U({result:!1,errors:{}}),r=()=>{const f=new z(g);o.value=f.validate(v.site)},c=()=>{l.value.address=""},V=async()=>{if(r(),o.value.result)b("submit",v.site);else{let f="";Object.entries(o.value.errors).forEach(s=>{f+=`${s[1].map(p=>p)}.   `}),_.add({severity:"warn",summary:"Formulari inválid",detail:f,life:5e3})}};return(f,s)=>{const p=w("Dropdown"),T=w("Checkbox"),B=w("Button");return e(l)?(L(),M("form",G,[t("section",j,[n(m,{class:i(["mb-2",{"p-invalid":o.value.errors.name}]),label:"Nom",id:"name",modelValue:e(l).name,"onUpdate:modelValue":s[0]||(s[0]=a=>e(l).name=a)},null,8,["modelValue","class"]),n(m,{class:i(["mb-2",{"p-invalid":o.value.errors.description}]),label:"Descripció",id:"description",modelValue:e(l).description,"onUpdate:modelValue":s[1]||(s[1]=a=>e(l).description=a)},null,8,["modelValue","class"]),n(m,{label:"CIF",id:"vatNumber",modelValue:e(l).vatNumber,"onUpdate:modelValue":s[2]||(s[2]=a=>e(l).vatNumber=a),class:i({"p-invalid":o.value.errors.vatNumber})},null,8,["modelValue","class"])]),t("section",O,[t("div",null,[W,n(p,{modelValue:e(l).country,"onUpdate:modelValue":s[3]||(s[3]=a=>e(l).country=a),editable:"",options:["Espanya"],class:i(["w-full",{"p-invalid":o.value.errors.country}])},null,8,["modelValue","class"])]),t("div",null,[H,n(p,{modelValue:e(l).region,"onUpdate:modelValue":s[4]||(s[4]=a=>e(l).region=a),editable:"",options:e(d).regions,optionValue:"nm",optionLabel:"nm",onChange:c,class:i(["w-full",{"p-invalid":o.value.errors.region}])},null,8,["modelValue","options","class"])]),t("div",null,[J,n(p,{modelValue:e(l).city,"onUpdate:modelValue":s[5]||(s[5]=a=>e(l).city=a),editable:"",options:e(d).getTownsByRegionName(e(l).region),optionValue:"nm",optionLabel:"nm",class:i(["w-full",{"p-invalid":o.value.errors.city}])},null,8,["modelValue","options","class"])])]),t("section",K,[n(m,{label:"Codi Postal",id:"postalCode",modelValue:e(l).postalCode,"onUpdate:modelValue":s[6]||(s[6]=a=>e(l).postalCode=a),class:i({"p-invalid":o.value.errors.postalCode})},null,8,["modelValue","class"]),n(m,{label:"Direcció",id:"address",modelValue:e(l).address,"onUpdate:modelValue":s[7]||(s[7]=a=>e(l).address=a),class:i({"p-invalid":o.value.errors.address})},null,8,["modelValue","class"]),n(m,{label:"Telèfon",id:"phone",modelValue:e(l).phoneNumber,"onUpdate:modelValue":s[8]||(s[8]=a=>e(l).phoneNumber=a),class:i({"p-invalid":o.value.errors.phone})},null,8,["modelValue","class"])]),t("section",Q,[n(m,{label:"E-Mail",id:"email",modelValue:e(l).email,"onUpdate:modelValue":s[9]||(s[9]=a=>e(l).email=a),class:i({"p-invalid":o.value.errors.email})},null,8,["modelValue","class"]),t("div",null,[X,n(p,{modelValue:e(l).enterpriseId,"onUpdate:modelValue":s[10]||(s[10]=a=>e(l).enterpriseId=a),editable:"",options:e(u).enterprises,optionValue:"id",optionLabel:"name",class:i(["w-full",{"p-invalid":o.value.errors.enterpriseId}])},null,8,["modelValue","options","class"])]),t("div",null,[Y,n(T,{modelValue:e(l).disabled,"onUpdate:modelValue":s[11]||(s[11]=a=>e(l).disabled=a),class:"w-full",binary:!0},null,8,["modelValue"])])]),t("div",Z,[n(B,{label:"Guardar",class:"mr-2",onClick:V})])])):I("",!0)}}}),ne=E({__name:"Site",setup(k){const b=U(y.EDIT),v=D(),_=P(),d=h(),{site:u}=S(d),l=async()=>{await d.fetchSite(v.params.id);let r="";u.value?(b.value=y.EDIT,r="Modificació de locals"):(b.value=y.CREATE,d.setNewSite(v.params.id),r="Alta de locals"),_.setMenuItem({icon:A.WALLET,backButtonVisible:!0,title:r})};x(async()=>{await l()});const g=N(),o=async()=>{const r=u.value;let c=!1,V="";b.value===y.CREATE?(c=await d.createSite(r),V="Local registrat correctament"):(c=await d.updateSite(r.id,r),V="Local actualitzat correctament"),c&&(g.add({severity:"success",summary:V,life:5e3}),$.back())};return(r,c)=>e(u)?(L(),R(ee,{key:0,site:e(u),onSubmit:o},null,8,["site"])):I("",!0)}});export{ne as default};
