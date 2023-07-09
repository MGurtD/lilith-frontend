export enum BaseInputType {
  NUMERIC = 1,
  TEXT = 2,
  PASSWORD = 3,
  CURRENCY = 4,
}

export enum FormActionMode {
  CREATE,
  EDIT,
}

export interface MenuItem {
  icon: string;
  text: string;
  route?: string;
  backButtonVisible?: boolean;
  children?: Array<MenuItem>;
}
