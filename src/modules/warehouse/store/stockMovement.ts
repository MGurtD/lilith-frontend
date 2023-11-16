import { defineStore } from "pinia";
import { StockMovement } from "../types";
import StockMovementService from "../services";

export const useStockMovementStore = defineStore({
  id: "stockMovement",
  state: () => ({
    stockMovement: undefined as StockMovement | undefined,
    stockMovements: undefined as Array<StockMovement> | undefined,
  }),
  getters: {},
  actions: {
    async Create(createRequest: StockMovement) {
      const created =
        StockMovementService.StockMovementService.Create(createRequest);
      return created;
    },
    async GetBetweenDates(startTime: string, endTime: string) {
      this.stockMovements =
        await StockMovementService.StockMovementService.GetBetweenDates(
          startTime,
          endTime
        );
    },
  },
});
