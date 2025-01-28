import { BudgetService } from "./budget.service";
import { CustomerTypeService, CustomerService } from "./customer.service";
import { DeliveryNoteService } from "./deliveryNote.service";
import { SalesInvoiceService } from "./salesInvoice.service";
import { SalesOrderHeaderService } from "./salesOrder.service";
import { RevenueService } from "./revenue.service";

export default {
  CustomerType: new CustomerTypeService("/CustomerType"),
  Customer: new CustomerService("/Customer"),
  Budget: new BudgetService("/Budget"),
  SalesOrder: new SalesOrderHeaderService("/SalesOrder"),
  DeliveryNote: new DeliveryNoteService("/DeliveryNote"),
  SalesInvoice: new SalesInvoiceService("/SalesInvoice"),
  Revenue: new RevenueService("/Revenue"),
};
