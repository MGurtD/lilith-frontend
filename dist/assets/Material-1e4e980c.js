import{_}from"./FormMaterial.vue_vue_type_script_setup_true_lang-55527f15.js";import{d as R,r as i,F as o,v as M,g as w,u as E,C as T,o as k,j as y,k as u,m as I,l as b,P as C,a as x}from"./index-0165ef2a.js";import{u as A}from"./reference-3a204a36.js";import"./form-validator-29ed56b4.js";import"./tax-d88f1d3d.js";import"./referenceType-8cab534f.js";import"./DropdownReferenceType.vue_vue_type_script_setup_true_lang-6664b682.js";const h=R({__name:"Material",setup(B){const c=i(o.EDIT),l=M(),m=w(),f=E(),r=A(),{reference:a}=T(r),n=i(""),d=async()=>{await r.fetchReference(n.value);let e="";a.value?(c.value=o.EDIT,e=`Material ${a.value.code} - ${a.value.description}`):(c.value=o.CREATE,r.setNewReference(n.value),e="Alta de material"),f.setMenuItem({icon:C.BUILDING,backButtonVisible:!0,title:e})};k(async()=>{n.value=l.params.id,await d()});const p=y(),v=async()=>{const e=a.value;let t=!1,s="";c.value===o.CREATE?(t=await r.createReference(e),t?s="Material creat correctament":s="El material ja existeix"):(t=await r.updateReference(e.id,e),s="Material actualizada correctament"),p.add({severity:t?"success":"warn",summary:s,life:5e3}),t&&m.back()};return(e,t)=>u(a)?(x(),I(_,{key:0,reference:u(a),onSubmit:v},null,8,["reference"])):b("",!0)}});export{h as default};