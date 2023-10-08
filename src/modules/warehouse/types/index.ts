export interface Warehouse {
  id: string;
  name: string;
  description: string;
  siteId: string;
  disabled: boolean;
}

export interface ReferenceType {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  disabled: boolean;
}
