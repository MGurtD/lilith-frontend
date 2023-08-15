export interface CustomerType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface Customer {
  id: string;
  code: string;
  comercialName: string;
  taxName: string;
  vatNumber: string;
  web: string;
  disabled: boolean;
  customerTypeId: string;
  paymentMethodId: string;
  accountNumber: string;
  observations: string;
  contacts: Array<CustomerContact>;
  address: Array<CustomerAddress>;
}

export interface CustomerContact {
  id: string;
  firstName: string;
  lastName: string;
  charge: string;
  email: string;
  phoneNumber: string;
  disabled: boolean;
  main: boolean;
  customerId: string;
}

export interface CustomerAddress {
  id: string;
  name: string;
  address: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  main: boolean;
  disabled: boolean;
  observations: string;
  customerId: string;
}

export interface Reference {
  id: string;
  code: string;
  description: string;
  cost: number;
  price: number;
  disabled: boolean;
}

export interface SalesInvoice {
  id: string;
  disabled: boolean;
  invoiceNumber: string;
  invoiceDate: string;
  baseAmount: number;
  transportAmount: number;
  grossAmount: number;
  netAmount: number;
  exerciseId: string;
  statusId: string;
  paymentMethodId: string;
  customerId: string;
  customerCode: string;
  customerComercialName: string;
  customerTaxName: string;
  customerVatNumber: string;
  customerAccountNumber: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  customerRegion: string;
  customerCountry: string;
  siteId: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  vatNumber: string;
  salesInvoiceDetails: Array<SalesInvoiceDetail>;
  salesInvoiceDueDates: Array<SalesInvoiceDueDate>;
  salesInvoiceImports: Array<SalesInvoiceImport>;
}

export interface SalesInvoiceDetail {
  id: string;
  salesInvoiceId: string;
  salesOrderDetailId: string;
  referenceId: string;
  reference: Reference;
  quantity: number;
  unitCost: number;
  unitPrice: number;
  totalCost: number;
  amount: number;
  estimatedDeliveryDate: string;
}

export interface SalesInvoiceDueDate {
  id: string;
  salesInvoiceId: string;
  dueDate: string;
  amount: number;
}

export interface SalesInvoiceImport {
  id: string;
  salesInvoiceId: string;
  taxId: string;
  baseAmount: number;
  taxAmount: number;
  netAmount: number;
}
