import { defineStore } from "pinia";
import { AuthenticationResponse } from "../types";
import { MenuItem } from "../types/component";
import jwtDecode from "jwt-decode";
import { UserService, User } from "../api/services/user.service";
import { PrimeIcons } from "primevue/api";
import { bool } from "yup";

const localStorageAuthKey = "temges.authorization";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      authorization: undefined as AuthenticationResponse | undefined,
      user: undefined as User | undefined,
      currentMenuItem: {
        text: "Home",
        icon: PrimeIcons.HOME,
      } as MenuItem,
      menuCollapsed: false,

      isWaiting: false,
    };
  },
  actions: {
    setMenuItem(menu: MenuItem) {
      this.currentMenuItem = menu;
    },
    async getAuthorization() {
      if (this.authorization !== undefined) {
        return this.authorization;
      }
      const lsValue = localStorage.getItem(localStorageAuthKey);
      if (lsValue !== null) {
        await this.setAuthorization(JSON.parse(lsValue));
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
    removeAuthorization() {
      this.authorization = undefined;
      localStorage.removeItem(localStorageAuthKey);
    },
  },
});

export interface JwtDecoded {
  jti: string;
  id: string;
  sub: string;
}

export interface Backend {
  isWaitingResponse: boolean;
  isOnError: boolean;
}
