import { PrimeIcons } from "primevue/api";
import { Role } from "../types";

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
        icon: PrimeIcons.MONEY_BILL,
        title: "Factures",
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
        href: "/referencia",
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
        title: "Tipus de màquina",
        href: "/workcentertype",
      },
      {
        icon: PrimeIcons.BUILDING,
        title: "Màquina",
        href: "/workcenter",
      },
      {
        icon: PrimeIcons.EURO,
        title: "Costs per màquina",
        href: "/workcentercost",
      },
      {
        icon: PrimeIcons.DATABASE,
        title: "Estats de màquina",
        href: "/machinestatus",
      },

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
      {
        icon: PrimeIcons.MONEY_BILL,
        title: "Costs per tipus d'operari",
        href: "/operatorcost",
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
    ],
  },
];

export const getMenusByRole = (role: Role) => {
  if (role && role.name === "manager") {
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
