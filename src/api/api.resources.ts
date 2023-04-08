export enum Modules {
  Config = "config",
  Data = "data",
}

export enum Resources {
  
}

export const GetResource = (Module: Modules, Resource: Resources): string => {
  return `/${Module}/${Resource}`;
};
