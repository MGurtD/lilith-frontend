import { defineStore } from "pinia";
import {
  CreateSalesHeaderRequest,
  Budget,
  BudgetDetail,
  SalesOrderHeader,
} from "../types";
import SalesServices from "../services";
import { formatDate } from "../../../utils/functions";

export const useBudgetStore = defineStore({
  id: "budget",
  state: () => ({
    budget: undefined as Budget | undefined,
    budgets: undefined as Array<Budget> | undefined,
    order: undefined as SalesOrderHeader | undefined,
  }),
  getters: {},
  actions: {
    async GetById(id: string) {
      this.budget = await SalesServices.Budget.getById(id);

      if (this.budget) {
        this.budget.date = formatDate(this.budget.date);
        if (this.budget.acceptanceDate) {
          this.budget.acceptanceDate = formatDate(this.budget.acceptanceDate);
        }
      }
    },
    async GetFiltered(startTime: string, endTime: string, customerId?: string) {
      if (customerId) {
        this.budgets = await SalesServices.Budget.GetBetweenDatesAndCustomer(
          startTime,
          endTime,
          customerId
        );
      } else {
        this.budgets = await SalesServices.Budget.GetBetweenDates(
          startTime,
          endTime
        );
      }
    },
    async GetAssociatedSalesOrders(budgetId: string) {
      this.order = await SalesServices.SalesOrder.GetFromBudgetId(budgetId);
    },
    async Create(createRequest: CreateSalesHeaderRequest) {
      const created = await SalesServices.Budget.Create(createRequest);
      return created;
    },
    async Update(id: string, budget: Budget) {
      const updated = await SalesServices.Budget.update(id, budget);
      return updated;
    },
    async Delete(id: string): Promise<boolean> {
      const deleted = await SalesServices.Budget.delete(id);
      return deleted;
    },
    async CreateDetail(detail: BudgetDetail): Promise<boolean> {
      const created = await SalesServices.Budget.CreateDetail(detail);
      if (created) await this.GetById(detail.budgetId);
      return created;
    },
    async UpdateDetail(detail: BudgetDetail): Promise<boolean> {
      const updated = await SalesServices.Budget.UpdateDetail(detail);
      return updated;
    },
    async DeleteDetail(detail: BudgetDetail): Promise<boolean> {
      const deleted = await SalesServices.Budget.DeleteDetail(detail);
      return deleted;
    },
  },
});
