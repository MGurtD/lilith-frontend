import { Exercise, PaymentMethod, Tax } from "../../../modules/shared/types";

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

export interface SupplierReference {
  referenceId: string;
  supplierId: string;
  supplierCode: string;
  supplierDescription: string;
  supplierPrice: number;
  supplyDays: number;
  disabled: boolean;
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

export interface PurchaseInvoiceImport {
  id: string;
  taxId: string;
  baseAmount: number | null;
  taxAmount: number;
  netAmount: number;
  purchaseInvoiceId: string;
}

export interface PurchaseInvoice {
  id: string;
  number: string;
  supplierNumber: string;
  purchaseInvoiceDate: Date | string;
  baseAmount: number;
  transportAmount: number;
  subtotal: number;
  taxAmount: number;
  grossAmount: number;
  netAmount: number;
  discountPercentage: number;
  discountAmount: number;
  supplierId: string;
  exerciceId: string;
  purchaseInvoiceSerieId: string;
  paymentMethodId: string;
  statusId: string;
  extraTaxPercentatge: number;
  extraTaxAmount: number;
  purchaseInvoiceDueDates: Array<PurchaseInvoiceDueDate>;
  purchaseInvoiceImports: Array<PurchaseInvoiceImport>;
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

export interface ExpenseType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface Expense {
  id: string;
  description: string;
  creationDate: Date | string;
  paymentDate: Date | string;
  endDate: Date | string;
  amount: number;
  recurring: boolean;
  frecuency: number;
  paymentDay: number;
  relatedExpenseId: string;
  disabled: boolean;
  expenseTypeId: string;
}

export interface ConsolidatedExpense {
  yearPaymentDate: number;
  monthPaymentDate: number;
  monthPaymentKey: string;
  weekPaymentDate: number;
  weekPaymentKey: string;
  paymentDate: string;
  type: string;
  typeDetail: string;
  description: string;
  amount: number;
}

export interface Receipt {
  number: string;
  date: string;
  supplierId: string;
  exerciseId: string;
  statusId: string;
  purchaseInvoiceId: string | null;
  supplierNumber: string;
  details: Array<ReceiptDetail>;
  id: string;
  disabled: boolean;
}

export interface PurchaseOrderFromWO {
  workorderId: string;
  workorderDescription: string;
  phaseId: string;
  phaseDescription: string;
  serviceReferenceId: string;
  serviceReferenceName: string;
  supplierId: string;
  quantity: number;
}

export interface CreatePurchaseDocumentRequest {
  id: string;
  date: string | Date;
  supplierId: string;
  exerciseId: string;
}

export interface PurchaseOrder {
  id: string;
  number: string;
  date: string;
  supplierId: string;
  exerciseId: string;
  statusId: string;
  details: Array<PurchaseOrderDetail>;
}

export interface PurchaseOrderDetail {
  purchaseOrderId: string;
  statusId: string;
  workOrderPhaseId?: string | null;
  referenceId: string;
  description: string;
  expectedReceiptDate?: string | Date | null;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  amount: number;
  id: string;
  disabled: boolean;
}
export interface PurchaseOrderDetailWithPendingQuantity {
  purchaseOrderId: string;
  statusId: string;
  workOrderPhaseId?: string | null;
  referenceId: string;
  expectedReceiptDate?: string | null;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  amount: number;
  id: string;
  disabled: boolean;
  pendingQuantity: number;
}

export interface ReceiptDetail {
  receiptId: string;
  referenceId: string;
  description: string;
  quantity: number;
  width: number;
  lenght: number;
  height: number;
  diameter: number;
  thickness: number;
  totalWeight: number;
  unitWeight: number;
  kilogramPrice: number;
  unitPrice: number;
  amount: number;
  id: string;
  disabled: boolean;
}

export interface PurchaseOrderReceiptDetail {
  purchaseOrderDetailId: string;
  receiptDetailId: string;
  quantity: number;
  user: string;
  createdOn: string;
  id: string;
}

export interface AddReceptionsRequest {
  receiptId: string;
  receptions: Array<PurchaseOrderReceiptDetail>;
}
