import { defineStore } from "pinia";
import { ProductionCostDashboardGrouped } from "../types";
import services from "../services";

export const useProductionCostDashboardStore = defineStore({
  id: "productionCostDashboard",
  state: () => ({
    productionCostDashboardGroupedByType: undefined as
      | Array<ProductionCostDashboardGrouped>
      | undefined,
    productionCostDashboardGroupedByWorkcenter: undefined as
      | Array<ProductionCostDashboardGrouped>
      | undefined,
  }),
  getters: {},
  actions: {
    async fetchGroupedByType(startTime: string, endTime: string) {
      this.productionCostDashboardGroupedByType =
        await services.ProductionCostDashboardService.GetGroupedByMonthAndWorkcenterType(
          startTime,
          endTime
        );
    },
    async fetchGroupedByWorkcenter(startTime: string, endTime: string) {
      this.productionCostDashboardGroupedByWorkcenter =
        await services.ProductionCostDashboardService.GetGroupedByMonthAndWorkcenterType(
          startTime,
          endTime
        );
    },
  },
});
