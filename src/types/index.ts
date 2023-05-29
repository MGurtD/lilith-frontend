export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  result: boolean;
  errors: Array<string>;
}

export interface CustomerType {
  id: string;
  name: string;
  disabled: boolean;
}

export interface CustomerContact {
  id: string;
  firstName: string;
  lastName: string;
  charge: string;
  email: string;
  phoneNumber: string;
  disabled: boolean;
  mainContact: boolean;
}

export interface Customer {
  id: string;
  code:string;
  comercialName: string;
  taxName: string;
  vatNumber: string;
  web: string;
  disabled: boolean;
  customerTypeId: string;
  contacts: Array<CustomerContact>;
  addresses: Array<CustomerAddress>;
}

export interface CustomerAddress {
  id: string;
  name: string;
  mainAddress: boolean;
  address: string;
  addressExtraInfo: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  disabled: boolean;
}

export interface SupplierType {
  id: string;
  name: string;
  description: string;
}

export interface Supplier {
  id: string;
  comercialName: string;
  taxName: string;
  cif: string;
  country: string;
  region: string;
  city: string;
  postalCode: string;
  address: string;
  phone: string;
  observations: string;
  disabled: boolean;
  supplierTypeId: string;
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

export interface Region {
  id: string;
  nm: string;
}
