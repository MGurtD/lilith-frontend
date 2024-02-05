import{F as N}from"./file.service-9c85962b.js";import{N as x,a as d,c as p,e as a,K as g,O as m,d as B,j as P,x as I,r as S,o as z,h as A,i as b,w as h,k as r,G as L,Q as T,D as w,P as c,n as y,l as C,f as O}from"./index-30e64f83.js";import{b as j}from"./functions-20418450.js";var k={name:"Toolbar",extends:x,props:{"aria-labelledby":{type:String,default:null}}};const G=["aria-labelledby"];function M(e,s,u,i,t,f){return d(),p("div",m({class:"p-toolbar p-component",role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root")),[a("div",m({class:"p-toolbar-group-start p-toolbar-group-left"},e.ptm("start")),[g(e.$slots,"start")],16),a("div",m({class:"p-toolbar-group-center"},e.ptm("center")),[g(e.$slots,"center")],16),a("div",m({class:"p-toolbar-group-end p-toolbar-group-right"},e.ptm("end")),[g(e.$slots,"end")],16)],16,G)}function V(e,s){s===void 0&&(s={});var u=s.insertAt;if(!(!e||typeof document>"u")){var i=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",u==="top"&&i.firstChild?i.insertBefore(t,i.firstChild):i.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var W=`
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
`;V(W);k.render=M;const q={class:"base_input"},U={class:"file_viewer_title"},K={class:"file-viewer"},Q={class:"file-viewer-item-type"},R={class:"file-viewer-item-actions"},H=["onClick"],J=["onClick"],X=B({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const s=e,u=P(),i=I(),t=new N,f=S(void 0),v=async()=>{f.value=await t.GetEntityFiles(s.entity,s.id)};z(async()=>{await v()});const E=async()=>{const n=document.createElement("input");n.type="file",n.onchange=async l=>{const _=l.target.files[0];if(!await t.Upload(_,s.entity,s.id)){u.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await v()},n.click()},F=async n=>{const l=await t.Download(n);j(n.originalName,l)},D=async n=>{i.require({message:"Està segur que vol eliminar l'arxiu seleccionat",accept:async()=>{var l=await t.Delete(n.id);if(!l){u.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await v()}})};return(n,l)=>{const _=A("Button");return d(),p("div",q,[b(r(k),null,{start:h(()=>[a("p",U,w(n.title),1)]),end:h(()=>[b(_,{size:"small",rounded:"",icon:r(c).UPLOAD,onClick:E},null,8,["icon"])]),_:1}),a("section",K,[(d(!0),p(L,null,T(f.value,o=>(d(),p("article",{class:"file-viewer-item",key:n.id},[a("div",Q,[o.type===0?(d(),p("i",{key:0,class:y(o.originalName.endsWith("docx")?r(c).FILE_WORD:r(c).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):C("",!0),o.type===1?(d(),p("i",{key:1,class:y(r(c).IMAGE),style:{"font-size":"3.5rem"}},null,2)):C("",!0),a("p",null,w(o.originalName.substring(0,20)),1)]),a("div",R,[a("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:$=>F(o)},[a("i",{class:y(r(c).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,H),a("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:$=>D(o)},[a("i",{class:y(r(c).TIMES)},null,2)],8,J)])]))),128))])])}}});const te=O(X,[["__scopeId","data-v-5c7d0e4a"]]);export{te as F};
