import { defineStore } from "pinia";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      user: null as null,
    };
  },
});
