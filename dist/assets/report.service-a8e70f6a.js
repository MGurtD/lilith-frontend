var p=Object.defineProperty;var d=(e,s,t)=>s in e?p(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var l=(e,s,t)=>(d(e,typeof s!="symbol"?s+"":s,t),t);import{ad as f,ae as a,V as g}from"./index-abfce291.js";const m="http://91.134.91.36:5010",i=f.create({baseURL:m,timeout:5e3,headers:{"Content-Type":"application/json"},validateStatus:function(e){return e<500}});i.interceptors.request.use(function(e){const s=a();return s.isWaiting=!0,e},function(e){return Promise.reject(e)});i.interceptors.response.use(function(e){const s=a();return s.isWaiting=!1,e},function(e){const s=a();return s.isWaiting=!1,s.setError("Error de comunicació amb el servei de reports"),h(e),Promise.reject(e)});function h(e){e.response?(console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers)):e.request?console.log(e.request):console.log("Error",e.message),console.log(e)}const b="Reports",v="22514ad8-7d58-4add-a49a-4396a6e4bbc5";var w=(e=>(e.Budget="Budget",e.Order="SalesOrder",e.DeliveryNote="DeliveryNote",e.Invoice="SalesInvoice",e))(w||{});class N{constructor(){l(this,"apiClient");this.apiClient=i}async Download(s,t,c){const o=await g.File.GetEntityFiles(b,v);if(!o||o.length===0)throw new Error("No hi ha informes disponibles. Carrega'ls a la ruta /reports");console.log(o);const n=o.find(u=>u.originalName.includes(t));if(!n)throw new Error(`L'informe ${t} no existeix. Carrega'l amb aquest nom a la ruta /reports`);console.log(n);let r=await this.apiClient.post("/download",{data:s,reportName:n.path,fileName:c},{responseType:"blob"});if(r.status===200)return r.data}}export{v as R,w as a,N as b};
