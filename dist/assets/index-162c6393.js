import{B as e}from"./base.service-ed93fa00.js";let r=class extends e{async Create(s){const n=`${this.resource}`;return(await this.apiClient.post(n,s)).status===200}async GetBetweenDates(s,n){const c=`${this.resource}?startTime=${s}&endTime=${n}`,o=await this.apiClient.get(c);if(o.status===200)return o.data}};class a extends e{}class i extends e{}class S extends e{}const m={Warehouse:new a("/Warehouse"),ReferenceType:new i("/ReferenceType"),Stock:new S("/Stock"),StockMovementService:new r("/StockMovement")};export{m as S};
