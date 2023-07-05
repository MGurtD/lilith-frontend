import { defineStore } from "pinia";
import { AuthenticationResponse } from "../types";
import { MenuItem } from "../types/component";
import jwtDecode from "jwt-decode";
import { UserService, User } from "../api/services/user.service";
import { PrimeIcons } from "primevue/api";

const localStorageAuthKey = "temges.authorization";

const applicationMenus = [
  {
    icon: PrimeIcons.HOME,
    text: "Inici",
    route: "/",
  },
  {
    icon: PrimeIcons.CALENDAR,
    text: "Exercicis",
    route: "/exercise",
  },
  {
    icon: PrimeIcons.PERCENTAGE,
    text: "Impostos",
    route: "/taxes",
  },
  {
    icon: PrimeIcons.PAYPAL,
    text: "Formes de pagament",
    route: "/payment-methods",
  },
  {
    icon: PrimeIcons.CART_PLUS,
    text: "Proveïdors",
    route: "/suppliers",
  },
  {
    icon: PrimeIcons.SORT_NUMERIC_DOWN,
    text: "Sèries de factures",
    route: "/purchaseinvoiceserie",
  },
  {
    icon: PrimeIcons.FLAG,
    text: "Estats de factures",
    route: "/purchaseinvoicestatus",
  },
  {
    icon: PrimeIcons.MONEY_BILL,
    text: "Factures de compra",
    route: "/purchaseinvoice",
  },
  {
    icon: PrimeIcons.MONEY_BILL,
    text: "Gestió de factures",
    route: "/purchaseinvoices-by-period",
  },
  {
    icon: PrimeIcons.WALLET,
    text: "Clients",
    route: "/customers",
  },
  {
    icon: PrimeIcons.PRIME,
    text: "Empresa",
    route: "/enterprise",
  },
  {
    icon: PrimeIcons.FLAG,
    text: "Tipus de despesa",
    route: "/expensetype",
  },
  {
    icon: PrimeIcons.USERS,
    text: "Usuaris",
    route: "/users",
  },
  
] as Array<MenuItem>;

export const useStore = defineStore("applicationStore", {
  state: () => {
    return {
      authorization: undefined as AuthenticationResponse | undefined,
      user: undefined as User | undefined,
      isWaiting: false,

      menus: [] as Array<MenuItem>,
      menuCollapsed: false,
      currentMenuItem: {
        text: "Home",
        icon: PrimeIcons.HOME,
      } as MenuItem,
    };
  },
  actions: {
    setMenuItem(menu: MenuItem) {
      this.currentMenuItem = menu;
    },
    setMenusByRole() {
      if (this.user?.role?.name === "manager") {
        this.menus = applicationMenus.filter(
          (m) => m.text === "Gestió de factures" || m.text === "Inici"
        );
      } else {
        this.menus = applicationMenus;
      }
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
        this.setMenusByRole();
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
