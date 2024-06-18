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
}

export interface WorkOrderPhase {
  workOrderCode: string;
  referenceCode: string;
  referenceDescription: string;
  phaseCode: string;
  phaseDescription: string;
  phaseStartTime: Date;
  phaseEndTime: Date;
  counterOk: number;
  counterKo: number;
}
