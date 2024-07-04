import{O as x,a as r,c,e as a,J as w,Q as f,R as O,d as z,j as G,x as U,r as I,E as W,S as R,o as j,h as $,i as h,w as E,k as o,G as S,T as q,V,D as B,P as n,W as _,n as u,l as F,p as J,b as Q,f as Y}from"./index-d7d79c10.js";import{d as H,b as K}from"./functions-e7c8fc70.js";var X={root:"p-toolbar p-component",start:"p-toolbar-group-start p-toolbar-group-left",center:"p-toolbar-group-center",end:"p-toolbar-group-end p-toolbar-group-right"},Z=x.extend({name:"toolbar",classes:X}),ee={name:"BaseToolbar",extends:O,props:{ariaLabelledby:{type:String,default:null}},style:Z,provide:function(){return{$parentInstance:this}}},T={name:"Toolbar",extends:ee,inheritAttrs:!1},te=["aria-labelledby"];function ae(t,l,g,k,d,m){return r(),c("div",f({class:t.cx("root"),role:"toolbar","aria-labelledby":t.ariaLabelledby},t.ptmi("root")),[a("div",f({class:t.cx("start")},t.ptm("start")),[w(t.$slots,"start")],16),a("div",f({class:t.cx("center")},t.ptm("center")),[w(t.$slots,"center")],16),a("div",f({class:t.cx("end")},t.ptm("end")),[w(t.$slots,"end")],16)],16,te)}T.render=ae;const se=t=>(J("data-v-46bbc936"),t=t(),Q(),t),ie={class:"base_input"},oe={class:"file_viewer_title"},le={class:"file-viewer"},ne={class:"file-viewer-item-type"},re=["onClick"],ce=["onClick"],de=["onClick"],pe=se(()=>a("div",{id:"img-container"},null,-1)),ue=z({__name:"FileEntityPicker",props:{title:{},entity:{},id:{},maxFiles:{}},setup(t){const l=t,g=G(),k=U(),d=new V,m=I(void 0),p=W({visible:!1,title:"Detalle de la imagen",closable:!0,position:"center",modal:!0}),D=I(l.id);R(()=>l.id,(e,i)=>{D.value=e,e&&e!==i&&b()});const b=async()=>{m.value=await d.GetEntityFiles(l.entity,D.value)};j(async()=>{setTimeout(()=>{b()},200)});const A=()=>{var e;if(!l.maxFiles)return!0;if(m.value)return((e=m.value)==null?void 0:e.length)<l.maxFiles},L=async()=>{const e=document.createElement("input");e.type="file",e.onchange=async i=>{const v=i.target.files[0];if(!await d.Upload(v,l.entity,l.id)){g.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await b()},e.click()},M=async e=>{var s;p.visible=!0;const i=await d.Download(e),v=new Blob([i],{type:"image/jpeg"}),y=await H(v);(s=document.getElementById("img-container"))==null||s.appendChild(y)},N=async e=>{const i=await d.Download(e);K(e.originalName,i)},P=async e=>{k.require({message:"Està segur que vol eliminar l'arxiu seleccionat",accept:async()=>{var i=await d.Delete(e.id);if(!i){g.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await b()}})};return(e,i)=>{const v=$("Button"),y=$("Dialog");return r(),c(S,null,[a("div",ie,[h(o(T),null,{start:E(()=>[a("p",oe,B(e.title),1)]),end:E(()=>[h(v,{size:"small",disabled:!A(),rounded:"",icon:o(n).UPLOAD,onClick:L},null,8,["disabled","icon"])]),_:1}),a("section",le,[(r(!0),c(S,null,q(m.value,s=>(r(),c("article",{class:"file-viewer-item",key:e.id},[a("div",ne,[s.type===o(_).DOCUMENT?(r(),c("i",{key:0,class:u(s.originalName.endsWith("docx")?o(n).FILE_WORD:o(n).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):F("",!0),s.type===o(_).IMAGE?(r(),c("i",{key:1,class:u(o(n).IMAGE),style:{"font-size":"3.5rem"}},null,2)):F("",!0),a("p",null,B(s.originalName.substring(0,20)),1)]),a("div",{class:u(s.type===o(_).IMAGE?"file-viewer-item-actions-image":"file-viewer-item-actions-file")},[s.type===o(_).IMAGE?(r(),c("div",{key:0,class:"file-viewer-item-action file-viewer-item-action-show",onClick:C=>M(s)},[a("i",{class:u(o(n).EYE),style:{"font-size":"1rem"}},null,2)],8,re)):F("",!0),a("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:C=>N(s)},[a("i",{class:u(o(n).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,ce),a("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:C=>P(s)},[a("i",{class:u(o(n).TIMES)},null,2)],8,de)],2)]))),128))])]),h(y,{visible:p.visible,"onUpdate:visible":i[0]||(i[0]=s=>p.visible=s),header:p.title,closable:p.closable,modal:p.modal},{default:E(()=>[pe]),_:1},8,["visible","header","closable","modal"])],64)}}});const be=Y(ue,[["__scopeId","data-v-46bbc936"]]);export{be as F};