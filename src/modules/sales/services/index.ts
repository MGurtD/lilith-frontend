import { CustomerTypeService, CustomerService } from "./customer.service";
import { ReferenceService } from "./reference.service";
import { SalesInvoiceService } from "./salesInvoice.service";
import { SalesOrderHeaderService } from "./salesOrder.service";

export default {
  Reference: new ReferenceService("/Reference"),
  CustomerType: new CustomerTypeService("/CustomerType"),
  Customer: new CustomerService("/Customer"),
  SalesInvoice: new SalesInvoiceService("/SalesInvoice"),
  SalesOrder: new SalesOrderHeaderService("/SalesOrder"),
};
