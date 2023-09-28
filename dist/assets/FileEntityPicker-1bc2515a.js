import{F as D}from"./file.service-b9108070.js";import{O as B,a as c,c as d,e as t,Q as _,R as y,d as N,j as P,r as S,o as x,h as z,i as b,w as g,k as r,G as A,S as I,D as h,P as u,n as f,l as w,f as T}from"./index-975a47bd.js";import{b as L}from"./functions-13b40d42.js";var k={name:"Toolbar",extends:B,props:{"aria-labelledby":{type:String,default:null}}};const O=["aria-labelledby"];function j(e,o,p,n,a,m){return c(),d("div",y({class:"p-toolbar p-component",role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root")),[t("div",y({class:"p-toolbar-group-start p-toolbar-group-left"},e.ptm("start")),[_(e.$slots,"start")],16),t("div",y({class:"p-toolbar-group-center"},e.ptm("center")),[_(e.$slots,"center")],16),t("div",y({class:"p-toolbar-group-end p-toolbar-group-right"},e.ptm("end")),[_(e.$slots,"end")],16)],16,O)}function G(e,o){o===void 0&&(o={});var p=o.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",p==="top"&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var M=`
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
`;G(M);k.render=j;const V={class:"base_input"},U={class:"file_viewer_title"},Q={class:"file-viewer"},R={class:"file-viewer-item-type"},W={class:"file-viewer-item-actions"},q=["onClick"],H=["onClick"],J=N({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const o=e,p=P(),n=new D,a=S(void 0),m=async()=>{a.value=await n.GetEntityFiles(o.entity,o.id)};x(async()=>{await m()});const C=async()=>{const s=document.createElement("input");s.type="file",s.onchange=async i=>{const v=i.target.files[0];if(!await n.Upload(v,o.entity,o.id)){p.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await m()},s.click()},F=async s=>{const i=await n.Download(s);L(s.originalName,i)},E=async s=>{var i=await n.Delete(s.id);if(!i){p.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await m()};return(s,i)=>{const v=z("Button");return c(),d("div",V,[b(r(k),null,{start:g(()=>[t("p",U,h(s.title),1)]),end:g(()=>[b(v,{size:"small",rounded:"",icon:r(u).UPLOAD,onClick:C},null,8,["icon"])]),_:1}),t("section",Q,[(c(!0),d(A,null,I(a.value,l=>(c(),d("article",{class:"file-viewer-item",key:s.id},[t("div",R,[l.type===0?(c(),d("i",{key:0,class:f(r(u).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):w("",!0),l.type===1?(c(),d("i",{key:1,class:f(r(u).IMAGE),style:{"font-size":"3.5rem"}},null,2)):w("",!0),t("p",null,h(l.originalName.substring(0,20)),1)]),t("div",W,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:$=>F(l)},[t("i",{class:f(r(u).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,q),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:$=>E(l)},[t("i",{class:f(r(u).TIMES)},null,2)],8,H)])]))),128))])])}}});const Z=T(J,[["__scopeId","data-v-b83fcd11"]]);export{Z as F};
