export interface ExpenseType {
    id: string;
    name: string;
    description: string;
    disabled: boolean;
}

export interface Expense {
    id: string;
    description: string;
    creationDate: Date;
    paymentDate: Date;
    endDate: Date;
    amount: number;
    recurring: boolean;
    frecuency: number;
    paymentDay: number;
    relatedExpenseId: string;
    disabled: boolean;
    expenseTypeId: string;
}