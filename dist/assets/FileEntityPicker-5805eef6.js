import{F as D}from"./file.service-541037dc.js";import{N as B,a as r,c as i,e as t,L as b,O as u,Q as P,d as N,j as S,r as I,o as L,h as x,i as _,w as g,k as o,G as z,R as T,D as w,P as d,n as m,l as h,f as A}from"./index-3e5d5186.js";import{b as O}from"./functions-8d6e0d81.js";var G=`
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
`,M={root:"p-toolbar p-component",start:"p-toolbar-group-start p-toolbar-group-left",center:"p-toolbar-group-center",end:"p-toolbar-group-end p-toolbar-group-right"},V=B.extend({name:"toolbar",css:G,classes:M}),j={name:"BaseToolbar",extends:P,props:{"aria-labelledby":{type:String,default:null}},style:V,provide:function(){return{$parentInstance:this}}},k={name:"Toolbar",extends:j},U=["aria-labelledby"];function Q(e,l,v,c,y,p){return r(),i("div",u({class:e.cx("root"),role:"toolbar","aria-labelledby":e.ariaLabelledby},e.ptm("root"),{"data-pc-name":"toolbar"}),[t("div",u({class:e.cx("start")},e.ptm("start")),[b(e.$slots,"start")],16),t("div",u({class:e.cx("center")},e.ptm("center")),[b(e.$slots,"center")],16),t("div",u({class:e.cx("end")},e.ptm("end")),[b(e.$slots,"end")],16)],16,U)}k.render=Q;const R={class:"base_input"},W={class:"file_viewer_title"},q={class:"file-viewer"},H={class:"file-viewer-item-type"},J={class:"file-viewer-item-actions"},K=["onClick"],X=["onClick"],Y=N({__name:"FileEntityPicker",props:{title:{},entity:{},id:{}},setup(e){const l=e,v=S(),c=new D,y=I(void 0),p=async()=>{y.value=await c.GetEntityFiles(l.entity,l.id)};L(async()=>{await p()});const F=async()=>{const a=document.createElement("input");a.type="file",a.onchange=async n=>{const f=n.target.files[0];if(!await c.Upload(f,l.entity,l.id)){v.add({severity:"error",detail:"Error al carregar l'arxiu"});return}await p()},a.click()},$=async a=>{const n=await c.Download(a);O(a.originalName,n)},E=async a=>{var n=await c.Delete(a.id);if(!n){v.add({severity:"error",detail:"Error al eliminar l'arxiu"});return}await p()};return(a,n)=>{const f=x("Button");return r(),i("div",R,[_(o(k),null,{start:g(()=>[t("p",W,w(a.title),1)]),end:g(()=>[_(f,{size:"small",rounded:"",icon:o(d).UPLOAD,onClick:F},null,8,["icon"])]),_:1}),t("section",q,[(r(!0),i(z,null,T(y.value,s=>(r(),i("article",{class:"file-viewer-item",key:a.id},[t("div",H,[s.type===0?(r(),i("i",{key:0,class:m(o(d).FILE_PDF),style:{"font-size":"3.5rem"}},null,2)):h("",!0),s.type===1?(r(),i("i",{key:1,class:m(o(d).IMAGE),style:{"font-size":"3.5rem"}},null,2)):h("",!0),t("p",null,w(s.originalName.substring(0,20)),1)]),t("div",J,[t("div",{class:"file-viewer-item-action file-viewer-item-action-download",onClick:C=>$(s)},[t("i",{class:m(o(d).DOWNLOAD),style:{"font-size":"1rem"}},null,2)],8,K),t("div",{class:"file-viewer-item-action file-viewer-item-action-delete",onClick:C=>E(s)},[t("i",{class:m(o(d).TIMES)},null,2)],8,X)])]))),128))])])}}});const ae=A(Y,[["__scopeId","data-v-df1224ae"]]);export{ae as F};
