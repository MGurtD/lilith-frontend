import BaseService from "../../../api/base.service";
import { PurchaseInvoiceSerie, PurchaseInvoiceStatus } from "../types";

export class PurchaseInvoiceSerieService extends BaseService<PurchaseInvoiceSerie> {}

export class PurchaseInvoiceStatusService extends BaseService<PurchaseInvoiceStatus> {}