import{d as y,r as i,F as s,v as S,g as w,u as k,z as x,o as A,j as E,k as l,m as I,l as b,P as h,a as B}from"./index-555c6e5a.js";import{_ as C}from"./FormReference.vue_vue_type_script_setup_true_lang-8bc68c41.js";import{u as M}from"./reference-82dd30df.js";import{u as g}from"./tax-1261d85d.js";import{u as D}from"./referenceType-3c510c98.js";import"./form-validator-f8953ae6.js";import"./_commonjsHelpers-725317a4.js";import"./FileEntityPicker-abaa07b9.js";import"./file.service-c1ecde0d.js";import"./functions-79f2dbc4.js";import"./v4-a960c1f4.js";import"./reference.service-fdfd63b3.js";import"./base.service-fff6fc35.js";import"./index-8611458c.js";const Q=y({__name:"Reference",setup(F){const c=i(s.EDIT),u=S(),f=w(),p=k(),d=g(),r=M(),R=D(),{reference:a}=x(r),n=i(""),m=i(""),v=async()=>{await r.fetchReference(n.value),d.fetchAll(),R.fetchAll();let e="";a.value?(c.value=s.EDIT,e=`Referència ${a.value.description}`):(c.value=s.CREATE,r.setNewReference(n.value),e="Alta de referència"),p.setMenuItem({icon:h.BUILDING,backButtonVisible:!0,title:e})};A(async()=>{n.value=u.params.id,m.value=u.params.module,await v()});const _=E(),T=async()=>{const e=a.value;let t=!1,o="";c.value===s.CREATE?(t=await r.createReference(e),t?o="Referència creada correctament":o="La referència + versió introduïda ja existeix"):(t=await r.updateReference(e.id,e),o="Referència actualizada correctament"),_.add({severity:t?"success":"warn",summary:o,life:5e3}),t&&f.back()};return(e,t)=>l(a)?(B(),I(C,{key:0,module:m.value,reference:l(a),onSubmit:T},null,8,["module","reference"])):b("",!0)}});export{Q as default};
