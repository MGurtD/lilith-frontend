import{d as p,u as x,h as a,c as u,i as n,k as s,L as k,a as P}from"./index-948abaa8.js";const V=p({__name:"ExerciseDatePicker",props:{exercises:{}},emits:["rangeSelected"],setup(D,{emit:c}){const e=x(),i=()=>{e.exercisePicker.exercise&&(e.exercisePicker.dates=[new Date(e.exercisePicker.exercise.startDate),new Date(e.exercisePicker.exercise.endDate)],t())},t=()=>c("rangeSelected",e.exercisePicker.dates);return(l,r)=>{const d=a("Dropdown"),m=a("Calendar");return P(),u(k,null,[n(d,{modelValue:s(e).exercisePicker.exercise,"onUpdate:modelValue":r[0]||(r[0]=o=>s(e).exercisePicker.exercise=o),options:l.exercises,optionLabel:"name",placeholder:"Any",onChange:i},null,8,["modelValue","options"]),n(m,{placeholder:"Període",modelValue:s(e).exercisePicker.dates,"onUpdate:modelValue":r[1]||(r[1]=o=>s(e).exercisePicker.dates=o),selectionMode:"range",dateFormat:"dd/mm/yy",onDateSelect:t},null,8,["modelValue"])],64)}}});export{V as _};
