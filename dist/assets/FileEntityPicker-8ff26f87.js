import{F as D}from"./file.service-e1e5760a.js";import{Q as B,a as c,c as d,e as t,J as _,R as y,d as N,j as P,r as S,o as x,h as z,i as g,w as b,k as r,G as A,S as I,D as h,P as u,n as f,l as w,f as T}from"./index-ecb5eec1.js";import{d as L}from"./functions-781c12cd.js";var k={name:"Toolbar",extends:B,props:{"aria-labelledby":{type:String,default:null}}};const j=["aria-labelledby"];function G(e,o,p,a,n,m){return c(),d("div",y({class:"p-toolbar p-component",role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root")),[t("div",y({class:"p-toolbar-group-start p-toolbar-group-left"},e.ptm("start")),[_(e.$slots,"start")],16),t("div",y({class:"p-toolbar-group-center"},e.ptm("center")),[_(e.$slots,"center")],16),t("div",y({class:"p-toolbar-group-end p-toolbar-group-right"},e.ptm("end")),[_(e.$slots,"end")],16)],16,j)}function M(e,o){o===void 0&&(o={});var p=o.insertAt;if(!(!e||typeof document>"u")){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",p==="top"&&a.firstChild?a.insertBefore(n,a.firstChild):a.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var O=`
.p-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
.p-toolbar-group-start,
.p-toolbar-group-center,
.p-toolbar-group-end {
    display: flex;
    align-items: center;
}
.p-toolbar-group-left,
.p-toolbar-group-right {
    display: flex;
    align-items: center;
}
`;M(O);k.render=G;const V={class:"base_input"},U={class:"file_viewer_title"},J={class:"file-viewer"},Q={class:"file-viewer-item-type"},R={class:"file-viewer-item-actions"},W=["onClick"],q=["onClick"],H=N({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const o=e,p=P(),a=new D,n=S(void 0),m=async()=>{n.value=await a.GetEntityFiles(o.entity,o.id)};x(async()=>{await m()});const C=async()=>{const s=document.createElement("input");s.type="file",s.onchange=async i=>{const v=i.target.files[0];if(!await a.Upload(v,o.entity,o.id)){p.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await m()},s.click()},F=async s=>{const i=await a.Download(s);L(s.originalName,i)},E=async s=>{var i=await a.Delete(s.id);if(!i){p.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await m()};return(s,i)=>{const v=z("Button");return c(),d("div",V,[g(r(k),null,{start:b(()=>[t("p",U,h(s.title),1)]),end:b(()=>[g(v,{size:"small",rounded:"",icon:r(u).UPLOAD,onClick:C},null,8,["icon"])]),_:1}),t("section",J,[(c(!0),d(A,null,I(n.value,l=>(c(),d("article",{class:"file-viewer-item",key:s.id},[t("div",Q,[l.type===0?(c(),d("i",{key:0,class:f(r(u).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):w("",!0),l.type===1?(c(),d("i",{key:1,class:f(r(u).IMAGE),style:{"font-size":"3.5rem"}},null,2)):w("",!0),t("p",null,h(l.originalName.substring(0,20)),1)]),t("div",R,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:$=>F(l)},[t("i",{class:f(r(u).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,W),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:$=>E(l)},[t("i",{class:f(r(u).TIMES)},null,2)],8,q)])]))),128))])])}}});const Z=T(H,[["__scopeId","data-v-df1224ae"]]);export{Z as F};
