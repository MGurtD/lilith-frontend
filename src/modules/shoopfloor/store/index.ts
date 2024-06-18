import { defineStore } from "pinia";
import { Operator } from "../../production/types";
import { Workcenter } from "../types";
import { RealtimeService } from "../services/realtime.service";

const localStorageOperatorKey = "temges.operator";

export const useShoopfloorStore = defineStore("shopfloorStore", {
  state: () => {
    return {
      operator: undefined as Operator | undefined,
      workcenters: undefined as Workcenter[] | undefined,
      workcenter: undefined as Workcenter | undefined,
    };
  },
  actions: {
    async getOperator() {
      if (this.operator !== undefined) {
        return this.operator;
      }
      const lsValue = localStorage.getItem(localStorageOperatorKey);
      if (lsValue !== null) {
        await this.setOperator(JSON.parse(lsValue));
        return this.operator;
      }
    },
    async setOperator(operator: Operator) {
      this.operator = operator;
      localStorage.setItem(localStorageOperatorKey, JSON.stringify(operator));
    },
    removeOperator() {
      this.operator = undefined;
      localStorage.removeItem(localStorageOperatorKey);
    },

    async fetchWorkcenters() {
      const service = new RealtimeService();
      this.workcenters = await service.GetWorkcenters();
    },
    async fetchWorkcenter(id: string) {
      const service = new RealtimeService();
      this.workcenter = await service.GetWorkcenter(id);
    },
  },
});
