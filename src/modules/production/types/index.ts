export interface Enterprise {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface Site {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  phoneNumber: string;
  email: string;
  vatNumber: string;
  enterpriseId: string;
  disabled: boolean;
}

export interface Area {
  id: string;
  name: string;
  description: string;
  siteId: string;
  disabled: boolean;
}

export interface WorkcenterType {
  id: string;
  name: string;
  description: string;
  disabled: boolean;
}

export interface Workcenter {
  id: string;
  name: string;
  description: string;
  workcenterTypeId: string;
  areaId: string;
  disabled: boolean;
}

export interface MachineStatus {
  id: string;
  name: string;
  description: string;
  color: string;
  disabled: boolean;
}

export interface WorkcenterCost {
  id: string;
  workcenterId: string;
  machineStatusId: string;
  cost: number;
  disabled: boolean;
}

export interface Operator {
  id: string;
  code: string;
  name: string;
  surname: string;
  vatNumber: string;
  operatorTypeId: string;
  disabled: boolean;
}

export interface OperatorType {
  id: string;
  name: string;
  description: string;
  cost: number;
  disabled: boolean;
}
