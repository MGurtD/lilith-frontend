import { defineStore } from "pinia";
import { AuthenticationResponse } from "../types";
import { MenuItem } from "../types/component";
import jwtDecode from "jwt-decode";
import { UserService, User } from "../api/services/user.service";
import { PrimeIcons } from "primevue/api";

const localStorageAuthKey = "temges.authorization";

const applicationMenus = [
  {
    icon: PrimeIcons.COG,
    title: "General",
    href: "",
    child: [
      {
        icon: PrimeIcons.CALENDAR,
        title: "Exercicis",
        href: "/exercise",
      },
      {
        icon: PrimeIcons.PERCENTAGE,
        title: "Impostos",
        href: "/taxes",
      },
      {
        icon: PrimeIcons.PAYPAL,
        title: "Formes de pagament",
        href: "/payment-methods",
      },
      {
        icon: PrimeIcons.USERS,
        title: "Usuaris",
        href: "/users",
      },
    ],
  },
  {
    icon: PrimeIcons.CART_PLUS,
    title: "Compres",
    href: "",
    child: [
      {
        icon: PrimeIcons.SORT_NUMERIC_DOWN,
        title: "Sèries de factures",
        href: "/purchaseinvoiceserie",
      },
      {
        icon: PrimeIcons.FLAG,
        title: "Estats de factures",
        href: "/purchaseinvoicestatus",
      },
      {
        icon: PrimeIcons.BOOKMARK,
        title: "Proveïdors",
        href: "/suppliers",
      },
      {
        icon: PrimeIcons.MONEY_BILL,
        title: "Factures de compra",
        href: "/purchaseinvoice",
      },
      {
        icon: PrimeIcons.MONEY_BILL,
        title: "Gestió de factures",
        href: "/purchaseinvoices-by-period",
      },
      {
        icon: PrimeIcons.CHART_PIE,
        title: "Dashboard",
        href: "/purchase-dashboard",
      },
    ],
  },
  {
    icon: PrimeIcons.CALCULATOR,
    title: "Despeses",
    href: "",
    child: [
      {
        icon: PrimeIcons.BUILDING,
        title: "Tipus de despesa",
        href: "/expensetype",
      },
      {
        icon: PrimeIcons.WALLET,
        title: "Despeses",
        href: "/expense",
      },
    ],
  },
  {
    icon: PrimeIcons.MONEY_BILL,
    title: "Ventes",
    href: "",
    child: [
      {
        icon: PrimeIcons.BUILDING,
        title: "Clients",
        href: "/customers",
      },
    ],
  },
  {
    icon: PrimeIcons.CHART_BAR,
    title: "Producció",
    href: "",
    child: [
      {
        icon: PrimeIcons.BUILDING,
        title: "Empresa",
        href: "/enterprise",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Local",
        href: "/site",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Area",
        href: "/area",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Tipus de línea",
        href: "/workcentertype",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Línea",
        href: "/workcenter",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Màquina",
        href: "/unit",
      },
    ],
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
        title: "Home",
        icon: PrimeIcons.HOME,
      } as MenuItem,
    };
  },
  getters: {
    userMenus: (state): Array<MenuItem> => {
      if (state.user?.role?.name === "manager") {
        return applicationMenus.filter(
          (m) => m.title === "Gestió de factures" || m.title === "Inici"
        );
      } else {
        return applicationMenus;
      }
    },
  },
  actions: {
    setMenuItem(menu: MenuItem) {
      this.currentMenuItem = menu;
    },
    setMenusByRole() {
      if (this.user?.role?.name === "manager") {
        this.menus = applicationMenus.filter(
          (m) => m.title === "Gestió de factures" || m.title === "Inici"
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
