import {
  PurchaseInvoiceSerieService,
  PurchaseInvoiceService,
  PurchaseInvoiceStatusService,
} from "./purchase.service";
import { SupplierService } from "./suppliers.service";

export default {
  purchaseInvoiceSerie: new PurchaseInvoiceSerieService(
    "/PurchaseInvoiceSerie"
  ),
  purchaseInvoice: new PurchaseInvoiceService("/PurchaseInvoice"),
  purchaseInvoiceStatus: new PurchaseInvoiceStatusService(
    "/PurchaseInvoiceStatus"
  ),
  supplier: new SupplierService("/Supplier"),
  supplierType: new SupplierService("/SupplierType"),
};
