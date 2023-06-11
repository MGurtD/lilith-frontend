export interface PurhcaseInvoiceStatus {
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
    purchaseInvoiceStatusId: string
    purchaseInvoiceDueDates: Array<PurchasInvoiceDueDate>;
}