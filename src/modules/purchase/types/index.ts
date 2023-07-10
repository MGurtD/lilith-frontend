import { Exercise, PaymentMethod, Tax } from "../../../types";

export interface SupplierType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface Supplier {
  id: string;
  comercialName: string;
  taxName: string;
  vatNumber: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  address: string;
  phone: string;
  accountNumber: string;
  observations: string;
  disabled: boolean;
  supplierTypeId: string;
  paymentMethodId: string;
  contacts: Array<SupplierContact>;
}

export interface SupplierContact {
  firstName: string;
  lastName: string;
  charge: string;
  email: string;
  phone: string;
  phoneExtension: string;
  observations: string;
  disabled: boolean;
  default: boolean;
  supplierId: string;
  id: string;
}

export interface PurchaseInvoiceTransition {
  id: string;
  fromStatusId: string;
  toStatusId: string;
}

export interface PurchaseInvoiceStatus {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  transitions?: Array<PurchaseInvoiceStatus>;
}

export interface PurchaseInvoiceSerie {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface PurchaseInvoiceDueDate {
  id: string;
  dueDate: Date;
  amount: number;
  purchaseInvoiceId: string;
}

export interface PurchaseInvoice {
  id: string;
  number: number;
  supplierNumber: string;
  purchaseInvoiceDate: Date;
  baseAmount: number;
  transportAmount: number;
  subtotal: number;
  taxAmount: number;
  grossAmount: number;
  netAmount: number;
  discountPercentage: number;
  discountAmount: number;
  supplierId: string;
  taxId: string;
  exerciceId: string;
  purchaseInvoiceSerieId: string;
  paymentMethodId: string;
  purchaseInvoiceStatusId: string;
  extraTaxPercentatge: number;
  extraTaxAmount: number;
  purchaseInvoiceDueDates: Array<PurchaseInvoiceDueDate>;
}

export interface PurchaseMasterData {
  exercises: Array<Exercise> | undefined;
  suppliers: Array<Supplier> | undefined;
  taxes: Array<Tax> | undefined;
  paymentMethods: Array<PaymentMethod> | undefined;
  statuses: Array<PurchaseInvoiceStatus> | undefined;
  series: Array<PurchaseInvoiceSerie> | undefined;
}

export interface PurchaseInvoiceUpdateStatues {
  ids: Array<string>;
  statusToId: string;
}
