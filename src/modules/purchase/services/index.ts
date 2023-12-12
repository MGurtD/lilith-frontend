import { ExpenseService, ExpenseTypeService } from "./expense.service";
import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceService,
} from "./purchase.service";
import { ReceiptService } from "./receipt.service";
import { SupplierService } from "./suppliers.service";

export default {
  PurchaseInvoice: new PurchaseInvoiceService("/PurchaseInvoice"),
  PurchaseInvoiceSerie: new PurchaseInvoiceSerieService(
    "/PurchaseInvoiceSerie"
  ),
  Supplier: new SupplierService("/Supplier"),
  SupplierType: new SupplierService("/SupplierType"),
  Expense: new ExpenseService("Expense"),
  ExpenseType: new ExpenseTypeService("ExpenseType"),
  Receipt: new ReceiptService("/Receipt"),
};
