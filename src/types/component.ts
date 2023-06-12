export enum BaseInputType {
  NUMERIC,
  TEXT,
  PASSWORD,
  CALENDAR,
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
