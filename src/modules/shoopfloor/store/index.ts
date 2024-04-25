import { defineStore } from "pinia";
import { Operator } from "../../production/types";

const localStorageOperatorKey = "temges.operator";

export const useShoopfloorStore = defineStore("shopfloorStore", {
  state: () => {
    return {
      operator: undefined as Operator | undefined,
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
  },
});
