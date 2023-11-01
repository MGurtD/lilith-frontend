import{F as B}from"./file.service-64058263.js";import{N as P,a as r,c as i,e as t,L as b,O as p,Q as x,d as N,j as S,x as I,r as L,o as z,h as T,i as g,w,k as o,G as A,R as O,D as h,P as d,n as u,l as k,f as G}from"./index-af1b0c07.js";import{b as M}from"./functions-8d6e0d81.js";var V=`
@layer primevue {
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
}
`,j={root:"p-toolbar p-component",start:"p-toolbar-group-start p-toolbar-group-left",center:"p-toolbar-group-center",end:"p-toolbar-group-end p-toolbar-group-right"},q=P.extend({name:"toolbar",css:V,classes:j}),U={name:"BaseToolbar",extends:x,props:{"aria-labelledby":{type:String,default:null}},style:q,provide:function(){return{$parentInstance:this}}},F={name:"Toolbar",extends:U},Q=["aria-labelledby"];function R(e,l,m,_,c,v){return r(),i("div",p({class:e.cx("root"),role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root"),{"data-pc-name":"toolbar"}),[t("div",p({class:e.cx("start")},e.ptm("start")),[b(e.$slots,"start")],16),t("div",p({class:e.cx("center")},e.ptm("center")),[b(e.$slots,"center")],16),t("div",p({class:e.cx("end")},e.ptm("end")),[b(e.$slots,"end")],16)],16,Q)}F.render=R;const W={class:"base_input"},H={class:"file_viewer_title"},J={class:"file-viewer"},K={class:"file-viewer-item-type"},X={class:"file-viewer-item-actions"},Y=["onClick"],Z=["onClick"],ee=N({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const l=e,m=S(),_=I(),c=new B,v=L(void 0),y=async()=>{v.value=await c.GetEntityFiles(l.entity,l.id)};z(async()=>{await y()});const $=async()=>{const a=document.createElement("input");a.type="file",a.onchange=async s=>{const f=s.target.files[0];if(!await c.Upload(f,l.entity,l.id)){m.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await y()},a.click()},E=async a=>{const s=await c.Download(a);M(a.originalName,s)},C=async a=>{_.require({message:"Està segur que vol eliminar l'arxiu seleccionat",accept:async()=>{var s=await c.Delete(a.id);if(!s){m.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await y()}})};return(a,s)=>{const f=T("Button");return r(),i("div",W,[g(o(F),null,{start:w(()=>[t("p",H,h(a.title),1)]),end:w(()=>[g(f,{size:"small",rounded:"",icon:o(d).UPLOAD,onClick:$},null,8,["icon"])]),_:1}),t("section",J,[(r(!0),i(A,null,O(v.value,n=>(r(),i("article",{class:"file-viewer-item",key:a.id},[t("div",K,[n.type===0?(r(),i("i",{key:0,class:u(o(d).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):k("",!0),n.type===1?(r(),i("i",{key:1,class:u(o(d).IMAGE),style:{"font-size":"3.5rem"}},null,2)):k("",!0),t("p",null,h(n.originalName.substring(0,20)),1)]),t("div",X,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:D=>E(n)},[t("i",{class:u(o(d).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,Y),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:D=>C(n)},[t("i",{class:u(o(d).TIMES)},null,2)],8,Z)])]))),128))])])}}});const ne=G(ee,[["__scopeId","data-v-27999d74"]]);export{ne as F};
