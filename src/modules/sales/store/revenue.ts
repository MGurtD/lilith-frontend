import { defineStore } from "pinia";
import { Revenue } from "../types";
import RevenueServices from "../services";

export const useRevenueStore = defineStore({
  id: "revenue",
  state: () => ({
    revenue: undefined as Revenue | undefined,
    revenues: undefined as Array<Revenue> | undefined,
  }),
  getters: {},
  actions: {
    async GetByMonthAndYear(month: number, year: number) {
      this.revenue = await RevenueServices.Revenue.GetByMonthAndYear(
        month,
        year
      );
    },
  },
});
