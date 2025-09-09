import { Reference } from "../../shared/types";

export interface Enterprise {
  id: string;
  name: string;
  description: string;
  defaultSiteId?: string | null;
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
  emailSales: string;
  emailPurchase: string;
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
  profitPercentage: number;
  disabled: boolean;
}

export interface Workcenter {
  id: string;
  name: string;
  description: string;
  workcenterTypeId: string;
  areaId: string;
  shiftId: string;
  profitPercentage: number;
  disabled: boolean;
}

export interface MachineStatus {
  id: string;
  name: string;
  description: string;
  color: string;
  stoped: boolean;
  operatorsAllowed: boolean;
  closed: boolean;
  preferred: boolean;
  icon: string;
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

export interface ProductionCosts {
  operatorCost: number;
  machineCost: number;
  materialCost: number;
  externalServiceCost: number;
  externalTransportCost: number;
}

export interface WorkMaster {
  id: string;
  referenceId: string;
  reference?: Reference;
  baseQuantity: number;
  operatorCost: number;
  machineCost: number;
  externalCost: number;
  materialCost: number;
  totalWeight: number;
  mode: number;
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
  profitPercentage: number;
  preferredWorkcenterId?: string | null;
  operatorTypeId?: string | null;
  isExternalWork: boolean;
  serviceReferenceId?: string | null;
  externalWorkCost: number;
  transportCost: number;
  details?: Array<WorkMasterPhaseDetail>;
  billOfMaterials?: Array<WorkMasterPhaseBillOfMaterials>;
}

export interface WorkMasterPhaseDetail {
  id: string;
  workMasterPhaseId: string;
  machineStatusId: string;
  estimatedTime: number;
  estimatedOperatorTime: number;
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
export interface WorkMasterToCopy {
  referenceId: string | null | undefined;
  workmaster: WorkMaster;
  workmasterId: string;
  referenceCode: string;
  mode: number;
}

export interface WorkOrder {
  id: string;
  referenceId: string;
  workMasterId: string;
  code: string;
  reference?: Reference;
  plannedQuantity: number;
  plannedDate: any;
  statusId: string;
  exerciceId: string;
  startTime: any;
  endTime: any;
  order: number;
  comment: string;
  disabled: boolean;
  operatorCost: number;
  machineCost: number;
  operatorTime: number;
  machineTime: number;
  materialCost: number;
  totalQuantity: number;
  phases: Array<WorkOrderPhase>;
}

export interface WorkOrderPhaseShoopfloor {
  workOrderPhase: WorkOrderPhase;
  referencePdfs: Array<File>;
}

export interface WorkOrderPhase {
  id: string;
  code: string;
  description: string;
  workOrderId: string;
  disabled: boolean;
  workcenterTypeId?: string | null;
  profitPercentage: number;
  preferredWorkcenterId?: string | null;
  operatorTypeId?: string | null;
  isExternalWork: boolean;
  serviceReferenceId?: string | null;
  externalWorkCost: number;
  transportCost: number;
  statusId: string;
  startTime: any;
  endTime: any;
  purchaseOrderId?: string | null;
  workOrder?: WorkOrder;
  details?: Array<WorkOrderPhaseDetail>;
  billOfMaterials?: Array<WorkOrderPhaseBillOfMaterials>;
}

export interface WorkOrderPhaseDetail {
  id: string;
  workOrderPhaseId: string;
  machineStatusId: string;
  estimatedTime: number;
  estimatedOperatorTime: number;
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

export interface CreateWorkOrderDto {
  workMasterId: string;
  plannedQuantity: number;
  plannedDate: any;
  comment: string;
}

export interface ProductionPart {
  id: string;
  workOrderId: string;
  workOrderPhaseId: string;
  workOrderPhaseDetailId: string;
  workcenterId: string;
  operatorId: string;
  operatorTime: number;
  operatorHourCost: number;
  workcenterTime: number;
  machineHourCost: number;
  date: any;
  quantity: number;
  workOrder?: WorkOrder;
  workOrderPhase?: WorkOrderPhase;
  workOrderPhaseDetail?: WorkOrderPhaseDetail;
}

export interface DetailedWorkOrder {
  workOrderId: string;
  workOrderCode: string;
  workOrderStatusCode: string;
  workOrderStatusDescription: string;
  plannedQuantity: number;
  workOrderStartTime: any;
  workOrderEndTime: any;
  workOrderOrder: number;
  workOrderComment: string;
  plannedDate: any;
  referenceCode: string;
  referenceDescription: string;
  referenceVersion: string;
  referenceCost: number;
  workOrderPhaseId: string;
  workOrderPhaseCode: string;
  workOrderPhaseDescription: string;
  workOrderPhaseComment: string;
  workOrderPhaseStatusCode: string;
  workOrderPhaseStatusDescription: string;
  workOrderPhaseStartTime: any;
  workOrderPhaseEndTime: any;
  workOrderPhaseDetailId: string;
  workOrderPhaseDetailOrder: number;
  workOrderPhaseDetailEstimatedTime: number;
  workOrderPhaseDetailComment: string;
  machineStatusName: string;
  machineStatusDescription: string;
  workcenterId: string;
  workcenterName: string;
  workcenterDescription: string;
  workcenterCost: number;
  preferredWorkcenter: boolean;
}

export interface Shift {
  id: string;
  name: string;
  disabled: boolean;
  details: Array<ShiftDetail>;
}

export interface ShiftDetail {
  id: string;
  startTime: any;
  endTime: any;
  isProductiveTime: boolean;
  shiftId: string;
}

export interface ProductionCostDashboardGrouped {
  workcenterName: string;
  operatorName: string;
  workcenterTypeName: string;
  year: number;
  month: number;
  totalWorkcenterTime: number;
  totalPartWorkcenterCost: number;
  totalCost: number;
}
