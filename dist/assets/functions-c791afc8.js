import{v as n}from"./v4-a960c1f4.js";const u=t=>{const r=t.split("/");if(r.length===3)return a(parseInt(r[0]),parseInt(r[1]),parseInt(r[2]))},a=(t,r,o)=>{var e=new Date;return e.setDate(t),e.setMonth(r-1),e.setFullYear(o),e},l=(t,r,o)=>{var e=new Date;return e.setDate(e.getDate()+t),e.setMonth(e.getMonth()+r),e.setFullYear(e.getFullYear()+o),e},i=t=>new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:"Europe/Madrid"}).format(new Date(t)),s=t=>{if(t instanceof Date){const r=t.getHours()-t.getTimezoneOffset()/60;return t.setHours(r),t.toISOString()}else return t},D=t=>s(t).split("T")[0],d=(t,r)=>{const o=window.URL.createObjectURL(new Blob([r])),e=document.createElement("a");e.href=o,e.setAttribute("download",t),document.body.appendChild(e),e.click(),document.body.removeChild(e)},m=()=>n();export{D as a,d as b,s as c,l as d,u as e,i as f,m as g};
