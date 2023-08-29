const o="22514ad8-7d58-4add-a49a-4396a6e4bbc5";Date.prototype.toJSON=function(){const t=this.getHours()-this.getTimezoneOffset()/60;return this.setHours(t),this.toISOString()};export{o as R};
