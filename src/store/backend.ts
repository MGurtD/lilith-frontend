import { defineStore } from "pinia";

export const useApiStore = defineStore("apiStore", {
  state: () => {
    return {
      isOnError: false,
      isWaiting: false,
      lastError: undefined as undefined | Date,
    };
  },
  actions: {
    setError(message: string) {
      this.isOnError = true;

      let hasToShowError = !this.lastError;
      const now = new Date();
      if (this.lastError) {
        const diff = (now.getTime() - this.lastError.getTime()) / 1000;
        if (diff > 5) hasToShowError = true;
      }

      this.lastError = now;
      if (hasToShowError) alert(message);
    },
  },
});
