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