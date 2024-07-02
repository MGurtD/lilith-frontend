export interface Workcenter {
  workcenterId: string;
  workcenterName: string;
  workcenterDescription: string;
  areaId: string;
  areaName: string;
  areaDescription: string;
  currentDay: Date;
  currentTime: string; // Note: TypeScript doesn't have a TimeSpan equivalent, using string
  shiftId?: string; // Optional property
  shiftName: string;
  shiftDetailId: string;
  shiftStartTime: Date;
  shiftEndTime: Date;
  workcenterDataId: number;
  statusName: string;
  statusDescription: string;
  statusColor: string;
  statusStartTime?: Date; // Optional property
  statusEndTime?: Date; // Optional property
  workOrderCode: string;
  referenceCode: string;
  referenceDescription: string;
  phaseCode: string;
  phaseDescription: string;
  phaseStartTime?: Date; // Optional property
  phaseEndTime?: Date; // Optional property
  counterOk: number;
  counterKo: number;
  workOrderPhases: WorkOrderPhase[];
  operators: Operator[];
}

export interface Operator {
  workcenterId: string;
  operatorId: string;
  operatorCode: string;
  operatorName: string;
  operatorTypeName: string;
  operatorTypeDescription: string;
  startTime: Date;
  endTime: Date;
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
