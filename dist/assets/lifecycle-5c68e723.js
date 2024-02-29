import{J as n,r as l}from"./index-555c6e5a.js";import{S as c}from"./index-8611458c.js";const y=n({id:"lifecycle",state:()=>({lifecycle:l(void 0),lifecycles:l(void 0)}),getters:{transitions:t=>{const e=[];return t.lifecycle&&t.lifecycle.statuses.forEach(i=>{i.transitions&&e.push(...i.transitions)}),e},getStatusName:t=>e=>{if(!e)return"";let i="";if(t.lifecycle&&t.lifecycle.statuses){const s=t.lifecycle.statuses.find(a=>a.id===e);s&&(i=s.name)}return i}},actions:{setNew(t){this.lifecycle={id:t,name:"",description:"",disabled:!1,statuses:[]}},async getStatusNameById(t,e){const i=await c.Lifecycle.getByName(t);if(i&&i.statuses.length>0){const s=i.statuses.find(a=>a.id===e);return s?s.name:""}return""},async fetchAll(){this.lifecycles=await c.Lifecycle.getAll()},async fetchOne(t){this.lifecycle=await c.Lifecycle.getById(t)},async fetchOneByName(t){this.lifecycle=await c.Lifecycle.getByName(t)},async create(t){const e=await c.Lifecycle.create(t);return e&&await this.fetchAll(),e},async update(t,e){const i=await c.Lifecycle.update(t,e);return i&&await this.fetchAll(),i},async delete(t){const e=await c.Lifecycle.delete(t);return e&&await this.fetchAll(),e},async createStatus(t){const e=await c.Lifecycle.createStatus(t);return e&&await this.fetchOne(this.lifecycle.id),e},async updateStatus(t,e){const i=await c.Lifecycle.updateStatus(e);return i&&await this.fetchOne(this.lifecycle.id),i},async deleteStatus(t){const e=await c.Lifecycle.deleteStatus(t);return e&&await this.fetchOne(this.lifecycle.id),e},async createTransition(t){const e=await c.Lifecycle.createTransition(t);return e&&await this.fetchOne(this.lifecycle.id),e},async updateTransition(t,e){const i=await c.Lifecycle.updateTransition(e);return i&&await this.fetchOne(this.lifecycle.id),i},async deleteTransition(t){const e=await c.Lifecycle.deleteTransition(t);return e&&await this.fetchOne(this.lifecycle.id),e}}});export{y as u};
