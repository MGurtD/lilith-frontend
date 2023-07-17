import { defineStore } from "pinia";
import ExpenseServices from "../services";
import { ExpenseType, Expense } from "../types";

export const useExpenseStore = defineStore({
  id: "expense",
  state: () => ({
    expenseType: undefined as ExpenseType | undefined,
    expenseTypes: undefined as Array<ExpenseType> | undefined,
    expense: undefined as Expense | undefined,
    expenses: undefined as Array<Expense> | undefined,
  }),
  getters: {},
  actions: {
    //Expense Types
    setNewExpenseType(id: string) {
      this.expenseType = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as ExpenseType;
    },
    async fetchExpenseTypes() {
      this.expenseTypes = await ExpenseServices.ExpenseType.getAll();
    },
    async fetchExpenseType(id: string) {
      this.expenseType = await ExpenseServices.ExpenseType.getById(id);
    },
    async createExpenseType(expenseType: ExpenseType) {
      const result = await ExpenseServices.ExpenseType.create(expenseType);
      if (result) await this.fetchExpenseTypes();
      return result;
    },
    async updateExpenseType(id: string, expenseType: ExpenseType) {
      const result = await ExpenseServices.ExpenseType.update(id, expenseType);
      if (result) await this.fetchExpenseTypes();
      return result;
    },
    async deleteExpenseType(id: string) {
      const result = await ExpenseServices.ExpenseType.delete(id);
      if (result) await this.fetchExpenseTypes();
      return result;
    },
    //Expenses
    setNewExpense(id: string) {
      this.expense = {
        id: id,
        description: "",
        creationDate: new Date(),
        paymentDate: new Date(),
        endDate: new Date(),
        amount: 0,
        recurring: false,
        frecuency: 0,
        paymentDay: 0,
        relatedExpenseId: "",
        expenseTypeId: "",
        disabled: false,
      } as Expense;
    },
    async fetchExpenses() {
      this.expenses = await ExpenseServices.Expense.getAll();
    },
    async fetchExpense(id: string) {
      this.expense = await ExpenseServices.Expense.getById(id);
    },
    async createExpense(expense: Expense) {
      const result = await ExpenseServices.Expense.create(expense);
      if (result) await this.fetchExpenses();
      return result;
    },
    async updateExpense(id: string, expense: Expense) {
      const result = await ExpenseServices.Expense.update(id, expense);
      if (result) await this.fetchExpenses();
      return result;
    },
    async deleteExpense(id: string) {
      const result = await ExpenseServices.Expense.delete(id);
      if (result) await this.fetchExpenses();
      return result;
    },
  },
});
