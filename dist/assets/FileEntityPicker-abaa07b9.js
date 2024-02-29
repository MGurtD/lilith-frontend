import{F as x}from"./file.service-c1ecde0d.js";import{M as B,a as i,c as l,e as t,K as b,N as p,O as N,d as P,j as I,x as L,r as S,o as z,h as O,i as g,w,k as n,G as T,Q as A,D as h,P as r,n as u,l as k,f as M}from"./index-555c6e5a.js";import{b as G}from"./functions-79f2dbc4.js";var V=`
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
`,W={root:"p-toolbar p-component",start:"p-toolbar-group-start p-toolbar-group-left",center:"p-toolbar-group-center",end:"p-toolbar-group-end p-toolbar-group-right"},j=B.extend({name:"toolbar",css:V,classes:W}),q={name:"BaseToolbar",extends:N,props:{ariaLabelledby:{type:String,default:null}},style:j,provide:function(){return{$parentInstance:this}}},F={name:"Toolbar",extends:q},U=["aria-labelledby"];function K(e,c,m,_,d,v){return i(),l("div",p({class:e.cx("root"),role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root"),{"data-pc-name":"toolbar"}),[t("div",p({class:e.cx("start")},e.ptm("start")),[b(e.$slots,"start")],16),t("div",p({class:e.cx("center")},e.ptm("center")),[b(e.$slots,"center")],16),t("div",p({class:e.cx("end")},e.ptm("end")),[b(e.$slots,"end")],16)],16,U)}F.render=K;const Q={class:"base_input"},R={class:"file_viewer_title"},H={class:"file-viewer"},J={class:"file-viewer-item-type"},X={class:"file-viewer-item-actions"},Y=["onClick"],Z=["onClick"],ee=P({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const c=e,m=I(),_=L(),d=new x,v=S(void 0),y=async()=>{v.value=await d.GetEntityFiles(c.entity,c.id)};z(async()=>{await y()});const E=async()=>{const a=document.createElement("input");a.type="file",a.onchange=async o=>{const f=o.target.files[0];if(!await d.Upload(f,c.entity,c.id)){m.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await y()},a.click()},$=async a=>{const o=await d.Download(a);G(a.originalName,o)},C=async a=>{_.require({message:"Està segur que vol eliminar l'arxiu seleccionat",accept:async()=>{var o=await d.Delete(a.id);if(!o){m.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await y()}})};return(a,o)=>{const f=O("Button");return i(),l("div",Q,[g(n(F),null,{start:w(()=>[t("p",R,h(a.title),1)]),end:w(()=>[g(f,{size:"small",rounded:"",icon:n(r).UPLOAD,onClick:E},null,8,["icon"])]),_:1}),t("section",H,[(i(!0),l(T,null,A(v.value,s=>(i(),l("article",{class:"file-viewer-item",key:a.id},[t("div",J,[s.type===0?(i(),l("i",{key:0,class:u(s.originalName.endsWith("docx")?n(r).FILE_WORD:n(r).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):k("",!0),s.type===1?(i(),l("i",{key:1,class:u(n(r).IMAGE),style:{"font-size":"3.5rem"}},null,2)):k("",!0),t("p",null,h(s.originalName.substring(0,20)),1)]),t("div",X,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:D=>$(s)},[t("i",{class:u(n(r).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,Y),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:D=>C(s)},[t("i",{class:u(n(r).TIMES)},null,2)],8,Z)])]))),128))])])}}});const ne=M(ee,[["__scopeId","data-v-5c7d0e4a"]]);export{ne as F};
