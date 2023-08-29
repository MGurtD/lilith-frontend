export const USER_KEY = "timecontrol.user";
export const REPORTS_ENTITY_ID = "22514ad8-7d58-4add-a49a-4396a6e4bbc5";

Date.prototype.toJSON = function () {
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);
  return this.toISOString();
};
