import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceService,
  PurchaseInvoiceStatusService,
} from "./purchase.service";
import { SupplierService } from "./suppliers.service";

export default {
  PurchaseInvoice: new PurchaseInvoiceService("/PurchaseInvoice"),
  PurchaseInvoiceSerie: new PurchaseInvoiceSerieService(
    "/PurchaseInvoiceSerie"
  ),
  PurchaseInvoiceStatus: new PurchaseInvoiceStatusService(
    "/PurchaseInvoiceStatus"
  ),
  Supplier: new SupplierService("/Supplier"),
  supplierType: new SupplierService("/SupplierType"),
};
