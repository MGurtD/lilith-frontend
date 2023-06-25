import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceService,
  PurchaseInvoiceStatusService,
} from "./purchase.service";
import { SupplierService } from "./suppliers.service";

export default {
  PurchaseInvoiceSerie: new PurchaseInvoiceSerieService(
    "/PurchaseInvoiceSerie"
  ),
  PurchaseInvoice: new PurchaseInvoiceService("/PurchaseInvoice"),
  PurchaseInvoiceStatus: new PurchaseInvoiceStatusService(
    "/PurchaseInvoiceStatus"
  ),
  Supplier: new SupplierService("/Supplier"),
  supplierType: new SupplierService("/SupplierType"),
};
