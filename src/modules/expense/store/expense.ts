import { defineStore } from "pinia";
import { ExpenseTypeService } from "../services";
import { ExpenseType  } from "../types";

const expenseTypeService = new ExpenseTypeService("/expensetype");

export const useExpenseStore = defineStore({
    id: "expense",
    state: () => ({
        expenseType: undefined as ExpenseType | undefined,
        expenseTypes: undefined as Array<ExpenseType> | undefined,
    }),
    getters: {},
    actions: {
        setNewExpenseType(id: string){
            this.expenseType = {
                id: id,
                name: "",
                description: "",
                disabled: false,
            } as ExpenseType;
        },
        async fetchExpenseTypes(){
            this.expenseTypes = await expenseTypeService.getAll();
        },
        async fetchExpenseType(id: string) {
            this.expenseType = await expenseTypeService.getById(id);
        },
        async createExpenseType(expenseType: ExpenseType){
            const result = await expenseTypeService.create(expenseType);
            if (result) await this.fetchExpenseTypes();
            return result;
        },
        async updateExpenseType(id: string, expenseType: ExpenseType){
            const result = await expenseTypeService.update(id, expenseType);
            if (result) await this.fetchExpenseTypes();
            return result;
        },
        async deleteExpenseType(id: string){
            const result = await expenseTypeService.delete(id);
            if (result) await this.fetchExpenseTypes();
            return result;
        },
    }
});