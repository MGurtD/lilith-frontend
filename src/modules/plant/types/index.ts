import { Workcenter } from "../../production/types";

export interface WorkcenterRt {
  workcenter: Workcenter;
  workcenterId: string;
  workcenterName: string;
  workcenterDescription: string;
  areaId: string;
  areaDescription: string;
  shiftId: string;
  shiftName: string;
  shiftDetailId: string;
  shiftDetailStartTime: string; // Time format: "HH:mm:ss"
  shiftDetailEndTime: string; // Time format: "HH:mm:ss"
  shiftDetailsIsProductiveTime: boolean;
  statusId: string;
  statusName: string;
  statusOperatorsAllowed: boolean;
  statusClosed: boolean;
  statusStopped: boolean;
  statusColor: string;
  statusStartTime: string; // ISO 8601 datetime string
  operators: Operator[];
}

export interface Operator {
  operatorId: string;
  operatorCode: string;
  operatorName: string;
  operatorSurname: string;
  operatorTypeId: string;
  operatorTypeName: string;
  operatorTypeDescription: string;
  operatorTypeCost: number;
}

export interface WorkOrderPhase {
  workOrderCode: string;
  referenceCode: string;
  referenceDescription: string;
  phaseId: string;
  phaseCode: string;
  phaseDescription: string;
  phaseStartTime: Date;
  phaseEndTime: Date;
  counterOk: number;
  counterKo: number;
}

export interface OperatorClockInOutRequest {
  workcenterId: string;
  operatorId: string;
}

export interface OperatorResponse {
  id: string;
  code: string;
  name: string;
  surname: string;
  operatorTypeId: string;
}

export interface WorkOrderPhaseRequest {
  workcenterId: string;
  workOrderPhaseId: string;
}

export interface WorkOrderPhaseResponse {
  code: string;
  description: string;
  workOrderId: string;
}
