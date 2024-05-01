export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  dueDays: number;
  paymentDay: number;
  numberOfPayments: number;
  frequency: number;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budgetCounter: string;
  salesOrderCounter: string;
  receiptCounter: string;
  salesInvoiceCounter: string;
  deliveryNoteCounter: string;
  purchaseInvoiceCounter: string;
  disabled: boolean;
}

export interface Tax {
  id: string;
  name: string;
  percentatge: number;
  disabled: boolean;
}

export interface Lifecycle {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
  initialStatusId?: string;
  statuses: Array<Status>;
}

export interface Status {
  id: string;
  name: string;
  disabled: boolean;
  lifecycleId: string;
  transitions: Array<StatusTransition>;
}

export interface StatusTransition {
  id: string;
  name: string;
  disabled: boolean;
  statusId: string;
  statusToId: string;
}

export interface Parameter {
  key: string;
  value: string;
}

export interface Reference {
  id: string;
  code: string;
  description: string;
  version: string;
  taxId?: string;
  cost: number;
  price: number;
  disabled: boolean;
  customerId: string;
  referenceTypeId: string | null;
  referenceFormatId: string | null;
  lastCost: number;
  workMasterCost: number;
  sales: boolean;
  purchase: boolean;
  production: boolean;
  isService: boolean;
}

export interface ReferenceType {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  density: number;
  disabled: boolean;
}

export interface ReferenceFormat {
  id: string;
  code: string;
  description: string;
}
