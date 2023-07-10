import { ExpenseType, Expense } from "../types";
import BaseService from "../../../api/base.service";

export class ExpenseTypeService extends BaseService<ExpenseType> {}

export class ExpenseService extends BaseService<Expense> {}