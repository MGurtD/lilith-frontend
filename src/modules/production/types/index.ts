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
  code: string;
  description: string;
  workMasterId: string;
  disabled: boolean;
  workcenterTypeId?: string | null;
  preferredWorkcenterId?: string | null;
  operatorTypeId?: string | null;
  isExternalWork: boolean;
  externalWorkCost: number;
  details?: Array<WorkMasterPhaseDetail>;
  billOfMaterials?: Array<WorkMasterPhaseBillOfMaterials>;
}

export interface WorkMasterPhaseDetail {
  id: string;
  workMasterPhaseId: string;
  machineStatusId: string;
  estimatedTime: number;
  isCycleTime: boolean;
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

export interface WorkOrder {
  id: string;
  referenceId: string;
  workMasterId: string;
  code: string;
  reference?: Reference;
  plannedQuantity: number;
  plannedDate: string;
  statusId: string;
  exerciceId: string;
  startTime: string | null;
  endTime: string | null;
  order: number;
  comment: string;
  disabled: boolean;
  phases: Array<WorkOrderPhase>;
}

export interface WorkOrderPhase {
  id: string;
  code: string;
  description: string;
  workOrderId: string;
  disabled: boolean;
  workcenterTypeId?: string | null;
  preferredWorkcenterId?: string | null;
  operatorTypeId?: string | null;
  isExternalWork: boolean;
  externalWorkCost: number;
  statusId: string;
  startTime: string | null;
  endTime: string | null;
  details?: Array<WorkOrderPhaseDetail>;
  billOfMaterials?: Array<WorkOrderPhaseBillOfMaterials>;
}

export interface WorkOrderPhaseDetail {
  id: string;
  workOrderPhaseId: string;
  machineStatusId: string;
  estimatedTime: number;
  isCycleTime: boolean;
  order: number;
  comment: string;
}

export interface WorkOrderPhaseBillOfMaterials {
  id: string;
  workOrderPhaseId: string;
  referenceId: string;
  quantity: number;
  width: number;
  length: number;
  height: number;
  diameter: number;
  thickness: number;
}
