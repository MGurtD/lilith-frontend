import { defineStore } from "pinia";
import { AuthenticationResponse, MenuItem } from "../types";
import jwtDecode from "jwt-decode";
import { UserService, User } from "../api/services/user.service";

const localStorageAuthKey = "temges.authorization";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      isLoggedIn: true,
      authorization: null as AuthenticationResponse | null,
      user: null as User | null,
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
    getAuthorization() {
      if (this.authorization === null) {
        const lsValue = localStorage.getItem(localStorageAuthKey);
        if (lsValue === null) {
          return null;
        } else {
          this.authorization = JSON.parse(lsValue);
          return this.authorization;
        }
      } else {
        return this.authorization;
      }
    },
    async setAuthorization(response: AuthenticationResponse) {
      this.authorization = response;
      localStorage.setItem(localStorageAuthKey, JSON.stringify(response));

      const jwtDecoded = jwtDecode(this.authorization.token) as JwtDecoded;
      if (jwtDecoded.id) {
        const service = new UserService();
        this.user = await service.GetById(jwtDecoded.id);
      }
    },
  },
});

export interface JwtDecoded {
  jti: string;
  id: string;
  sub: string;
}
