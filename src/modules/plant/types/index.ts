import { Workcenter as WorkcenterMaster } from "../../production/types";

// Re-export del modelo maestro para claridad
export type WorkcenterConfig = WorkcenterMaster;

// Snapshot de datos en tiempo real desde WebSocket
export interface WorkcenterRealtime {
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
  operators: OperatorSnapshot[];

  currentTime?: string; // ISO 8601 datetime string
  counterOk?: number;
  counterKo?: number;
  phaseCode?: string;
  phaseDescription?: string;
  phaseStartTime?: string; // ISO 8601 datetime string
  phaseEndTime?: string; // ISO 8601 datetime string
  workOrderCode?: string;
  referenceCode?: string;
  referenceDescription?: string;
}

// Estado combinado para la vista (maestro + realtime)
export interface WorkcenterViewState {
  config: WorkcenterConfig;
  realtime?: WorkcenterRealtime;
}

export interface OperatorSnapshot {
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
