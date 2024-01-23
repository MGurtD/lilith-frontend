import { integer } from "@vuelidate/validators";
import { Reference } from "../../shared/types";

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

export interface WorkMaster {
  id: string;
  referenceId: string;
  reference?: Reference;
  baseQuantity: number;
  disabled: boolean;
  phases: Array<WorkMasterPhase>;
}

export interface WorkMasterPhase {
  id: string;
  phaseCode: string;
  phaseDescription: string;
  workMasterId: string;
  disabled: boolean;
  workcenterTypeId: string;
  preferredWorkcenterId?: string | null;
  operatorTypeId: string;
  details?: Array<WorkMasterPhaseDetail>;
  billOfMaterials?: Array<WorkMasterPhaseBillOfMaterials>;
}

export interface WorkMasterPhaseDetail {
  id: string;
  workMasterPhaseId: string;
  machineStatusId: string;
  estimatedTime: number;
  isCycleTime: boolean;
  isExternalWork: boolean;
  externalWorkCost: number;
  order: number;
  comment: string;
}

export interface WorkMasterPhaseBillOfMaterials {
  id: string;
  workMasterPhaseId: string;
  referenceId: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  diameter: number;
  thickness: number;
}

export interface WorkMasterToCopy {
  referenceId: string | null;
  workmasterId: string;
  referenceCode: string;
}
