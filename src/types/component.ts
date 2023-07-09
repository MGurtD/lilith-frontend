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
  title: string;
  href?: string;
  backButtonVisible?: boolean;
  child?: Array<MenuItem>;
}
