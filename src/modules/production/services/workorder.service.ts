import {
  WorkOrder,
  WorkOrderPhase,
  WorkOrderPhaseDetail,
  WorkOrderPhaseBillOfMaterials,
} from "../types";
import BaseService from "../../../api/base.service";

export class WorkOrderService extends BaseService<WorkOrder> {
  async GetBetweenDatesAndStatus(
    startTime: string,
    endTime: string,
    statusId?: string
  ): Promise<Array<WorkOrder> | undefined> {
    let endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    if (statusId) endpoint += `&statusId=${statusId}`;

    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<WorkOrder>;
    }
  }
}
export class WorkOrderPhaseService extends BaseService<WorkOrderPhase> {
  async getByWorkOrderId(
    workOrderId: string
  ): Promise<Array<WorkOrderPhase> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderId=${workOrderId}`
    );
    if (response.status === 200) return response.data as Array<WorkOrderPhase>;
  }
}
export class WorkOrderPhaseDetailService extends BaseService<WorkOrderPhaseDetail> {
  async getByWorkOrderPhaseId(
    workOrderPhaseId: string
  ): Promise<Array<WorkOrderPhaseDetail> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderPhaseId=${workOrderPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkOrderPhaseDetail>;
  }
}
export class WorkOrderPhaseBillOfMaterialsService extends BaseService<WorkOrderPhaseBillOfMaterials> {
  async getByWorkOrderPhaseId(
    workOrderPhaseId: string
  ): Promise<Array<WorkOrderPhaseBillOfMaterials> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderPhaseId=${workOrderPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkOrderPhaseBillOfMaterials>;
  }
}
