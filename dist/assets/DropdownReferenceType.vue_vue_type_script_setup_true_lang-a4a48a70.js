import{u as d}from"./referenceType-ba97c33d.js";import{d as m,h as c,c as t,D as l,l as s,i as u,w as f,Q as _,k as b,a as n}from"./index-64fee6e6.js";const h={class:"mb-2"},w={key:0,class:"block text-900 mb-2"},y={key:0,class:"flex align-items-center"},C=m({__name:"DropdownReferenceType",props:{label:{},modelValue:{}},emits:["update:modelValue"],setup(V,{emit:r}){const i=d();return(o,a)=>{const p=c("Dropdown");return n(),t("div",h,[o.label.length>0?(n(),t("label",w,l(o.label),1)):s("",!0),u(p,_({showClear:"",filter:"","filter-fields":["name","description"],editable:"",options:b(i).referenceTypes,placeholder:"Selecciona...",optionValue:"id",optionLabel:e=>e.name+" - "+e.description,class:"w-full"},o.$attrs,{"model-value":o.modelValue,onChange:a[0]||(a[0]=e=>r("update:modelValue",e.value))}),{option:f(e=>[e.option?(n(),t("div",y,l(`${e.option.name} - ${e.option.description}`),1)):s("",!0)]),_:1},16,["options","optionLabel","model-value"])])}}});export{C as _};
