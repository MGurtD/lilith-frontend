import { CustomerTypeService, CustomerService } from "./customer.service";
import { DeliveryNoteService } from "./deliveryNote.service";
import { SalesInvoiceService } from "./salesInvoice.service";
import { SalesOrderHeaderService } from "./salesOrder.service";

export default {
  CustomerType: new CustomerTypeService("/CustomerType"),
  Customer: new CustomerService("/Customer"),
  SalesInvoice: new SalesInvoiceService("/SalesInvoice"),
  SalesOrder: new SalesOrderHeaderService("/SalesOrder"),
  DeliveryNote: new DeliveryNoteService("/DeliveryNote"),
};
