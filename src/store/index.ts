import { defineStore } from "pinia";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      isLoggedIn: false,
    };
  },
});
