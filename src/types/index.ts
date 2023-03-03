export interface Category {
  id: number;
  code: string;
  description: string;
  account: string;
  active: boolean;
}

export interface EmployeeCategory {
  id: number;
  code: string;
  description: string;
  costPrice: number;
  salePrice: number;
  account: string;
  active: boolean;
}

export interface Event {}

export interface EventStatus {
  id: number;
  code: string;
  description: string;
  active: boolean;
}

export interface Item {
  id: number;
  code: string;
  description: string;
  costPrice: number;
  salePrice: number;
  categoryId: number;
  categoryDescription: string;
  forPurchase: boolean;
  forManufacture: boolean;
  forSale: boolean;
  active: boolean;
}

export interface ImportsByAccount  {
  account: string;
  description: string;
  costprice: number;
  saleprice:number;
}