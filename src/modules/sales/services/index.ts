import { CustomerTypeService, CustomerService } from "./customer.service";
import { ReferenceService } from "./reference.service";
import { SalesInvoiceService } from "./salesInvoice.service";

export default {
  Reference: new ReferenceService("/Reference"),
  CustomerType: new CustomerTypeService("/CustomerType"),
  Customer: new CustomerService("/Customer"),
  SalesInvoice: new SalesInvoiceService("/SalesInvoice"),
};
