import{v as a}from"./v4-a960c1f4.js";const s=t=>{const r=t.split("/");if(r.length===3)return c(parseInt(r[0]),parseInt(r[1]),parseInt(r[2]))},c=(t,r,o)=>{let e=new Date;return e.setDate(t),e.setMonth(r-1),e.setFullYear(o),e},u=(t,r,o)=>{let e=new Date;return e.setDate(e.getDate()+t),e.setMonth(e.getMonth()+r),e.setFullYear(e.getFullYear()+o),e},i=t=>new Intl.DateTimeFormat("es-ES",{year:"numeric",month:"2-digit",day:"2-digit",timeZone:"Europe/Madrid"}).format(new Date(t)),n=t=>{if(t instanceof Date){const r=t.getHours()-t.getTimezoneOffset()/60;return t.setHours(r),t.toISOString()}else return n(s(t))},D=t=>n(t).split("T")[0],d=(t,r)=>{const o=window.URL.createObjectURL(new Blob([r])),e=document.createElement("a");e.href=o,e.setAttribute("download",t),document.body.appendChild(e),e.click(),document.body.removeChild(e)},m=()=>a();export{D as a,d as b,n as c,u as d,i as f,m as g};