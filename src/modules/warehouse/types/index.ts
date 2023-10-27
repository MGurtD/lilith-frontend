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

export interface Stock {
  id: string;
  locationId: string;
  referenceId: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  diameter: number;
  thickness: number;
}

export interface StockMovement {
  id: string;
  stockId: string;
  movementType: string;
  locationId: string;
  referenceId: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  diameter: number;
  thickness: number;
  movementDate: Date;
}

export interface InventoryMovement {
  id: string;
  stockId: string;
  movementType: string;
  locationId: string;
  referenceId: string;
  oldQuantity: number;
  newQuantity: number;
  width: number;
  length: number;
  height: number;
  diameter: number;
  thickness: number;
  movementDate: Date;  
}