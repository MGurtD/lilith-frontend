import{F as D}from"./file.service-6dec06ed.js";import{Q as B,a as c,c as d,e as t,R as _,S as y,d as N,j as P,r as S,o as T,h as x,i as g,w as b,k as r,H as z,T as A,D as h,P as u,n as f,l as w,f as I}from"./index-521883f7.js";import{c as L}from"./functions-fa75c0c2.js";var k={name:"Toolbar",extends:B,props:{"aria-labelledby":{type:String,default:null}}};const j=["aria-labelledby"];function M(e,o,p,n,a,m){return c(),d("div",y({class:"p-toolbar p-component",role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root")),[t("div",y({class:"p-toolbar-group-start p-toolbar-group-left"},e.ptm("start")),[_(e.$slots,"start")],16),t("div",y({class:"p-toolbar-group-center"},e.ptm("center")),[_(e.$slots,"center")],16),t("div",y({class:"p-toolbar-group-end p-toolbar-group-right"},e.ptm("end")),[_(e.$slots,"end")],16)],16,j)}function O(e,o){o===void 0&&(o={});var p=o.insertAt;if(!(!e||typeof document>"u")){var n=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css",p==="top"&&n.firstChild?n.insertBefore(a,n.firstChild):n.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}var V=`
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
`;O(V);k.render=M;const G={class:"base_input"},U={class:"file-viewer"},H={class:"file-viewer-item-type"},Q={class:"file-viewer-item-actions"},R=["onClick"],W=["onClick"],q=N({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const o=e,p=P(),n=new D,a=S(void 0),m=async()=>{a.value=await n.GetEntityFiles(o.entity,o.id)};T(async()=>{await m()});const C=async()=>{const s=document.createElement("input");s.type="file",s.onchange=async i=>{const v=i.target.files[0];if(!await n.Upload(v,o.entity,o.id)){p.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await m()},s.click()},F=async s=>{const i=await n.Download(s);L(s.originalName,i)},E=async s=>{var i=await n.Delete(s.id);if(!i){p.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await m()};return(s,i)=>{const v=x("Button");return c(),d("div",G,[g(r(k),null,{start:b(()=>[t("h4",null,h(s.title),1)]),end:b(()=>[g(v,{size:"small",rounded:"",icon:r(u).UPLOAD,onClick:C},null,8,["icon"])]),_:1}),t("section",U,[(c(!0),d(z,null,A(a.value,l=>(c(),d("article",{class:"file-viewer-item",key:s.id},[t("div",H,[l.type===0?(c(),d("i",{key:0,class:f(r(u).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):w("",!0),l.type===1?(c(),d("i",{key:1,class:f(r(u).IMAGE),style:{"font-size":"3.5rem"}},null,2)):w("",!0),t("p",null,h(l.originalName.substring(0,20)),1)]),t("div",Q,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:$=>F(l)},[t("i",{class:f(r(u).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,R),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:$=>E(l)},[t("i",{class:f(r(u).TIMES)},null,2)],8,W)])]))),128))])])}}});const Y=I(q,[["__scopeId","data-v-dd7a228d"]]);export{Y as F};
