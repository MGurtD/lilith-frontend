import{d as k,r as p,F as s,v as f,u as _,z as v,o as w,j as M,h as I,k as u,m as T,l as W,P as y,I as E,a as b}from"./index-9ee31eec.js";import{u as C}from"./plantmodel-0c53976d.js";import"./base.service-aa9daa2d.js";const R=k({__name:"Workcenter",setup(F){const n=p(s.EDIT),c=f(),i=_(),t=C(),{workcenter:a}=v(t),m=async()=>{await t.fetchWorkcenter(c.params.id);let e="";a.value?(n.value=s.EDIT,e=`Màquina: ${a.value.name}`):(n.value=s.CREATE,t.setNewWorkcenter(c.params.id),e="Alta de màquina"),i.setMenuItem({icon:y.BUILDING,backButtonVisible:!0,title:e})};w(async()=>{await m()});const l=M(),d=async()=>{const e=a.value;let r=!1,o="";n.value===s.CREATE?(r=await t.createWorkcenter(e),o="Màquina creada correctament"):(r=await t.updateWorkcenter(e.id,e),o="Màquina actualizada correctament"),r&&(l.add({severity:"success",summary:o,life:5e3}),E.back())};return(e,r)=>{const o=I("FormWorkcenter");return u(a)?(b(),T(o,{key:0,workcenter:u(a),onSubmit:d},null,8,["workcenter"])):W("",!0)}}});export{R as default};