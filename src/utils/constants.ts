export const USER_KEY = "timecontrol.user";

Date.prototype.toJSON = function () {
  const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
  this.setHours(hoursDiff);
  return this.toISOString();
};
