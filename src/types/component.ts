export enum BaseInputType {
  NUMERIC,
  TEXT,
  PASSWORD,
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
}