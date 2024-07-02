import { WorkOrder, WorkOrderPhase, WorkOrderPhaseShoopfloor } from "../types";
import BaseService from "../../../api/base.service";

export default class PlanningService extends BaseService<WorkOrderPhase> {
  async GetByWorkcenterId(
    id: string
  ): Promise<Array<WorkOrderPhase> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/workcenter/${id}`
    );
    if (response.status === 200) return response.data as Array<WorkOrderPhase>;
  }
  async GetWorkOrderPhaseById(
    id: string
  ): Promise<WorkOrderPhaseShoopfloor | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/workorderphase/${id}`
    );
    if (response.status === 200)
      return response.data as WorkOrderPhaseShoopfloor;
  }
}
