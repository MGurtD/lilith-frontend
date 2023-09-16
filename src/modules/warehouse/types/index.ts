export interface Warehouse {
  id: string;
  name: string;
  description: string;
  siteId: string;
  disabled: boolean;
}

export interface RawMaterialType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}
