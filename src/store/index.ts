import { defineStore } from "pinia";
import { User } from "../types";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
});
