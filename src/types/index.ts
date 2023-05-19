export interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  result: boolean;
  errors: Array<string>;
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
