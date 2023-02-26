export enum Modules {
  Config = "config",
  Data = "data",
}

export enum Resources {
  Category = "category",
  Item = "item",
  EmployeeCategory = "employeecategory",
  EventStatus = "eventstatus",
  Event = "event",
}

export const GetResource = (Module: Modules, Resource: Resources): string => {
  return `/${Module}/${Resource}`;
};
