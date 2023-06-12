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

export interface PurchaseInvoiceStatus {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface PurchaseInvoiceSerie {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface PurchasInvoiceDueDate {
  id: string;
  dueDate: Date;
  amount: number;
  purchaseInvoiceId: string;
}

export interface PurchaseInvoice {
  number: number;
  supplierNumber: number;
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
  exerciseId: string;
  purchaseInvoiceSerieId: string;
  paymentMethodId: string;
  purchaseInvoiceStatusId: string;
  purchaseInvoiceDueDates: Array<PurchasInvoiceDueDate>;
}
