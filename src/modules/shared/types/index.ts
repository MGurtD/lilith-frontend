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
  purchaseInvoiceCounter: number;
  salesInvoiceCounter: number;
  salesOrderCounter: number;
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
