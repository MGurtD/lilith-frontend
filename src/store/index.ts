import { defineStore } from "pinia";
import { MenuItem } from "../types";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      isLoggedIn: false,
      authorization: {
        token: "",
        refreshToken: "",
      },
      currentMenuItem: {
        text: "",
        icon: "",
      } as MenuItem,
    };
  },
  actions: {
    setMenuItem(menu: MenuItem) {
      this.currentMenuItem = menu;
    },
  },
});
