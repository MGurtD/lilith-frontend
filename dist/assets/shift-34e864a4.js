import{I as a,r as s}from"./index-8f350042.js";import{d as e}from"./index-d6682b3e.js";const r=a({id:"shift",state:()=>({shift:s(void 0),shifts:s(void 0),shiftdetail:s(void 0),shiftdetails:s(void 0)}),getters:{},actions:{setNewShift(t){this.shift={id:t,name:"",disabled:!1,details:[]}},setNewShiftDetail(t){this.shiftdetail={id:t,startTime:"00:00:00",endTime:"23:59:59",isProductiveTime:!0,shiftId:""}},async fetchAllShifts(){this.shifts=await e.ShiftService.getAll()},async createShift(t){const i=await e.ShiftService.create(t);return i&&await this.fetchAllShifts(),i},async updateShift(t){const i=await e.ShiftService.update(t.id,t);return i&&await this.fetchAllShifts(),i},async deleteShift(t){const i=await e.ShiftService.delete(t);return i&&await this.fetchAllShifts(),i},async fetchShiftDetailsByShiftId(t){this.shiftdetails=await e.ShiftService.getDetailsByshiftId(t)},async createDetail(t){const i=await e.ShiftService.createDetail(t);return i&&await this.fetchAllShifts(),i},async updateDetail(t){const i=await e.ShiftService.updateDetail(t);return i&&await this.fetchAllShifts(),i},async deleteDetail(t){const i=await e.ShiftService.deleteDetail(t);return i&&await this.fetchAllShifts(),i}}});export{r as u};
