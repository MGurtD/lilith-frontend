import{N as r}from"./index-0c51ec9c.js";import{B as a}from"./base.service-ebedc193.js";class o extends a{async addContact(s){let e=!1;try{const t=await this.apiClient.post(`${this.resource}/Contact`,s);(t.status===200||t.status===201)&&(e=!0)}catch(t){r(t)}return e}async updateContact(s){let e=!1;try{const t=await this.apiClient.put(`${this.resource}/Contact/${s.id}`,s);(t.status===200||t.status===201)&&(e=!0)}catch(t){r(t)}return e}async removeContact(s){let e=!1;try{const t=await this.apiClient.delete(`${this.resource}/Contact/${s}`);(t.status===200||t.status===201)&&(e=!0)}catch(t){r(t)}return e}}class u extends a{}export{o as S,u as a};