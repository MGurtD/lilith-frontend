var o=Object.defineProperty;var p=(a,t,e)=>t in a?o(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var r=(a,t,e)=>(p(a,typeof t!="symbol"?t+"":t,e),e);import{t as l}from"./index-19723412.js";class c{constructor(){r(this,"apiClient");r(this,"resource");this.apiClient=l,this.resource="/File"}async GetEntityFiles(t,e){let s=await this.apiClient.get(`${this.resource}?entity=${t}&entityId=${e}`);if(s.status===200)return s.data}async Download(t){let e=await this.apiClient.post(`${this.resource}/Download`,t,{responseType:"blob"});if(e.status===200)return e.data}async DownloadReport(t,e){let s=await this.apiClient.post("Report/Download",{file:t,parameters:e},{responseType:"blob"});if(s.status===200)return s.data}async Upload(t,e,s){const i=new FormData;i.append("entity",e),i.append("id",s),i.append("file",t);let n=await this.apiClient.post(`${this.resource}/Upload`,i,{headers:{"Content-Type":"multipart/form-data"}});if(n.status===200)return n.data}async Delete(t){return(await this.apiClient.delete(`${this.resource}/${t}`)).status===200}}export{c as F};
