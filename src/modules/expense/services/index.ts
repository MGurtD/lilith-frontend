import { ExpenseType, Expense, ConsolidatedExpense } from "../types";
import BaseService from "../../../api/base.service";

class ExpenseTypeService extends BaseService<ExpenseType> {}

class ExpenseService extends BaseService<Expense> {
  async getConsolidated(
    startTime: string,
    endTime: string
  ): Promise<Array<ConsolidatedExpense> | undefined> {
    const endpoint = `${this.resource}/Consolidated?startTime=${startTime}&endTime=${endTime}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<ConsolidatedExpense>;
    }
  }
}

export default {
  Expense: new ExpenseService("Expense"),
  ExpenseType: new ExpenseTypeService("ExpenseType"),
};
