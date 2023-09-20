import { defineStore } from "pinia";
import { AuthenticationResponse, Role, User } from "../types";
import { MenuItem } from "../types/component";
import jwtDecode from "jwt-decode";
import { UserService } from "../api/services/user.service";
import { PrimeIcons } from "primevue/api";
import { ref } from "vue";
import { getMenusByRole } from "./menus";
import { Exercise } from "../modules/shared/types";

const localStorageAuthKey = "temges.authorization";

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      authorization: undefined as AuthenticationResponse | undefined,
      user: undefined as User | undefined,
      isWaiting: false,
      menus: ref([] as Array<any>),
      menuCollapsed: false,
      currentMenuItem: {
        title: "Home",
        icon: PrimeIcons.HOME,
      } as MenuItem,
      exercisePicker: {
        exercise: undefined as Exercise | undefined,
        dates: undefined as Array<Date> | undefined,
      },
    };
  },
  actions: {
    cleanExercisePicker() {
      this.exercisePicker.exercise = undefined;
      this.exercisePicker.dates = undefined;
    },
    setMenuItem(menu: MenuItem) {
      this.currentMenuItem = menu;
    },
    setMenusByRole(user: User) {
      this.menus = getMenusByRole(user.role as Role);
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
        if (this.user) this.setMenusByRole(this.user);
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
