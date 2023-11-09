import { PrimeIcons } from "primevue/api";
import { Role, User } from "../types";

const header = {
  header: "TEMGES",
  hiddenOnCollapse: true,
};

export const applicationMenus = [
  header,
  {
    icon: PrimeIcons.COG,
    title: "General",
    href: "",
    child: [
      {
        icon: PrimeIcons.USERS,
        title: "Usuaris",
        href: "/users",
      },
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
        icon: PrimeIcons.SORT_NUMERIC_DOWN,
        title: "Sèries de factures",
        href: "/purchaseinvoiceserie",
      },
      {
        icon: PrimeIcons.REFRESH,
        title: "Cicles de vida",
        href: "/lifecycle",
      },
    ],
  },
  {
    icon: PrimeIcons.CART_PLUS,
    title: "Compres",
    href: "",
    child: [
      {
        icon: PrimeIcons.BOOKMARK,
        title: "Proveïdors",
        href: "/suppliers",
      },
      {
        icon: PrimeIcons.TICKET,
        title: "Materials",
        child: [
          {
            icon: PrimeIcons.PALETTE,
            title: "Tipus de materials",
            href: "/referencetype",
          },
          {
            icon: PrimeIcons.TICKET,
            title: "Materies primeres",
            href: "/reference/purchase",
          },
        ],
      },
      {
        icon: PrimeIcons.TRUCK,
        title: "Albarans de recepció",
        href: "/receipts",
      },
      {
        icon: PrimeIcons.MONEY_BILL,
        title: "Factures",
        child: [
          {
            icon: PrimeIcons.FLAG,
            title: "Estats de factures",
            href: "/purchaseinvoicestatus",
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
        ],
      },
      {
        icon: PrimeIcons.WALLET,
        title: "Despeses",
        child: [
          {
            icon: PrimeIcons.TAG,
            title: "Tipus de despesa",
            href: "/expensetype",
          },
          {
            icon: PrimeIcons.WALLET,
            title: "Declaració de despeses",
            href: "/expense",
          },
        ],
      },

      {
        icon: PrimeIcons.CHART_PIE,
        title: "Dashboard",
        href: "/expense-dashboard",
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
      {
        icon: PrimeIcons.TICKET,
        title: "Referències",
        href: "/reference/sales",
      },
      {
        icon: PrimeIcons.APPLE,
        title: "Comandes",
        href: "/salesorder",
      },
      {
        icon: PrimeIcons.WALLET,
        title: "Factures",
        href: "/sales-invoice",
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
        title: "Model de planta",
        child: [
          {
            icon: PrimeIcons.BUILDING,
            title: "Empresa",
            href: "/enterprise",
          },
          {
            icon: PrimeIcons.BUILDING,
            title: "Locals",
            href: "/site",
          },
          {
            icon: PrimeIcons.BUILDING,
            title: "Arees",
            href: "/area",
          },
          {
            icon: PrimeIcons.BUILDING,
            title: "Tipus de màquines",
            href: "/workcentertype",
          },
          {
            icon: PrimeIcons.BUILDING,
            title: "Màquines",
            href: "/workcenter",
          },
        ],
      },
      {
        icon: PrimeIcons.DATABASE,
        title: "Estats de màquina",
        href: "/machinestatus",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Costs de màquina",
        href: "/workcentercost",
      },
      {
        icon: PrimeIcons.USERS,
        title: "Operaris",
        child: [
          {
            icon: PrimeIcons.USERS,
            title: "Tipus d'operari",
            href: "/operatortype",
          },
          {
            icon: PrimeIcons.USER,
            title: "Operaris",
            href: "/operator",
          },
        ],
      },
      {
        icon: PrimeIcons.WALLET,
        title: "Costs",
        child: [
          {
            icon: PrimeIcons.BUILDING,
            title: "Per màquina",
            href: "/workcentercost",
          },          
        ],
      },
    ],
  },
  {
    icon: PrimeIcons.BOX,
    title: "Magatzem",
    href: "",
    child: [
      {
        icon: PrimeIcons.BOX,
        title: "Magatzem",
        href: "/warehouse",
      },
      {
        icon: PrimeIcons.WRENCH,
        title: "Estocs",
        href: "/stocks",
      },
      {
        icon: PrimeIcons.MAP,
        title: "Moviments de magatzem",
        href: "/stockmovement",
      },
      {
        icon: PrimeIcons.MAP,
        title: "Inventari",
        href: "/inventory",
      },
    ],
  },
];

export const getMenusByRole = (user: User) => {
  if (user && user.username === "gestoria") {
    return [
      header,
      {
        icon: PrimeIcons.MONEY_BILL,
        title: "Gestió de factures",
        href: "/purchaseinvoices-by-period",
      },
    ];
  } else {
    return applicationMenus;
  }
};
