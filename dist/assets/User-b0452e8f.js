var M=Object.defineProperty;var O=(r,a,o)=>a in r?M(r,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[a]=o;var U=(r,a,o)=>(O(r,typeof a!="symbol"?a+"":a,o),o);import{d as P,r as p,j as A,h as k,c as I,e as d,i,n as _,k as B,l as E,m as N,q,p as D,b as G,a as w,s as $,f as z,t as T,g as j,v as L,u as W,o as H,P as J,U as K,A as Q}from"./index-abfce291.js";import{c as X,a as S,b as Y,F as Z}from"./form-validator-012be6a9.js";const R=r=>(D("data-v-3b557c1a"),r=r(),G(),r),x=["onSubmit"],ee={class:"two-columns"},se=R(()=>d("label",{class:"block text-900 mb-2"},"Rol",-1)),ae={class:"two-columns"},oe={key:0,class:"form-user-changepassword"},re=R(()=>d("label",{class:"block mb-2",style:{color:"#fff"}},"...",-1)),te={class:"mt-2"},le=P({__name:"FormUser",props:{roles:{},user:{}},emits:["submit","change-password"],setup(r,{emit:a}){const o=r,v=p(!1),l=p(""),u=p(""),V=A(),g=X().shape({username:S().required("El correu és obligatori").max(250,"El nom d'usuari no pot superar els 250 carácters"),firstName:S().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),lastName:S().required("Els cognoms són obligatoris").max(250,"Els cognoms no poden superar els 250 carácters"),disabled:Y().required()}),n=p({result:!1,errors:{}}),b=()=>{const s=new Z(g);n.value=s.validate(o.user)},h=s=>{const e=o.user;e.disabled=s,C()},C=async()=>{if(b(),n.value.result)a("submit",o.user);else{let s="";Object.entries(n.value.errors).forEach(e=>{s+=`${e[1].map(c=>c)}.   `}),V.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}},m=()=>{v.value=!0},y=()=>{var e;if(!(l.value.length>4==u.value.length>4&&l.value===u.value)){V.add({severity:"warn",summary:"Contrasenya invàlida",detail:"Les contrasenyes han de coincidir i contenir més de 4 caràcters"});return}a("change-password",{username:(e=o.user)==null?void 0:e.username,password:l.value})};return(s,e)=>{const c=k("BaseInput"),F=k("Dropdown"),f=k("Button");return s.user?(w(),I("form",{key:0,onSubmit:q(C,["prevent"])},[d("section",ee,[i(c,{id:"username",class:_(["mb-2",{"p-invalid":n.value.errors.email}]),label:"Nom d'usuari",modelValue:s.user.username,"onUpdate:modelValue":e[0]||(e[0]=t=>s.user.username=t),disabled:"true"},null,8,["modelValue","class"]),d("div",null,[se,i(F,{modelValue:s.user.roleId,"onUpdate:modelValue":e[1]||(e[1]=t=>s.user.roleId=t),editable:"",options:s.roles,optionValue:"id",optionLabel:"name",class:_(["w-full",{"p-invalid":n.value.errors.city}])},null,8,["modelValue","options","class"])])]),d("section",ae,[i(c,{id:"firstName",class:_(["mb-2",{"p-invalid":n.value.errors.firstName}]),label:"Nom",modelValue:s.user.firstName,"onUpdate:modelValue":e[2]||(e[2]=t=>s.user.firstName=t)},null,8,["modelValue","class"]),i(c,{id:"lastName",class:_(["mb-2",{"p-invalid":n.value.errors.lastName}]),label:"Cognoms",modelValue:s.user.lastName,"onUpdate:modelValue":e[3]||(e[3]=t=>s.user.lastName=t)},null,8,["modelValue","class"])]),v.value===!0?(w(),I("section",oe,[i(c,{type:B($).PASSWORD,id:"passwordOne",class:"mb-2 w-full",label:"Contrasenya",modelValue:l.value,"onUpdate:modelValue":e[4]||(e[4]=t=>l.value=t)},null,8,["type","modelValue"]),i(c,{type:B($).PASSWORD,id:"passwordTwo",class:"mb-2",label:"Repetir contrasenya",modelValue:u.value,"onUpdate:modelValue":e[5]||(e[5]=t=>u.value=t)},null,8,["type","modelValue"]),d("div",null,[re,i(f,{label:"Modificar",class:"mr-2",onClick:y})])])):E("",!0),d("div",te,[i(f,{type:"submit",label:"Guardar",class:"mr-2"}),s.user.disabled?(w(),N(f,{key:0,severity:"success",label:"Activar",class:"mr-2",onClick:e[6]||(e[6]=t=>h(!1))})):(w(),N(f,{key:1,label:"Desactivar",severity:"danger",class:"mr-2",onClick:e[7]||(e[7]=t=>h(!0))})),i(f,{severity:"secondary",label:"Canviar contrasenya",class:"mr-2",onClick:m})])],40,x)):E("",!0)}}});const ne=z(le,[["__scopeId","data-v-3b557c1a"]]);class ie{constructor(){U(this,"apiClient");U(this,"resource");this.apiClient=T,this.resource="/role"}async GetAll(){try{let a=await this.apiClient.get(this.resource);if(a.status===200)return a.data}catch{}}async GetById(a){try{let o=await this.apiClient.get(`${this.resource}/${a}`);if(o.status===200)return o.data}catch{}}}const me=P({__name:"User",setup(r){const a=j(),o=L(),v=W(),l=p(void 0),u=p(),V=new ie,g=new K,n=async()=>{l.value=await g.GetById(o.params.id),u.value=await V.GetAll(),l.value&&v.setMenuItem({icon:J.USER,title:`Usuari ${l.value.username}`,backButtonVisible:!0})};H(async()=>{await n()});const b=A(),h=async()=>{const m=l.value;let y="Usuari actualizat correctament";await g.Update(m)&&(b.add({severity:"success",summary:y,life:5e3}),a.back())},C=async m=>{await new Q().ChangePassword(m)?b.add({severity:"success",summary:"Canvi de contrasenya",detail:"Contrasenya actualitzada",life:1e4}):b.add({severity:"error",summary:"Canvi de contrasenya",detail:"Error al actualitzar contrasenya",life:1e4})};return(m,y)=>(w(),N(ne,{roles:u.value,user:l.value,onChangePassword:C,onSubmit:h},null,8,["roles","user"]))}});export{me as default};
