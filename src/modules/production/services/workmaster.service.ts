import {
  WorkMaster,
  WorkMasterPhase,
  WorkMasterPhaseDetail,
  WorkMasterPhaseBillOfMaterials,
  WorkMasterToCopy,
} from "../types";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class WorkMasterService extends BaseService<WorkMaster> {
  async copyWorkMaster(workmasterToCopy: WorkMasterToCopy): Promise<boolean> {
    const response = await this.apiClient.post(
      `${this.resource}/copy`,
      workmasterToCopy
    );
    return response.status === 200;
  }
  async calculateCost(id: string): Promise<GenericResponse<number>> {
    const response = await this.apiClient.get(`${this.resource}/cost/${id}`);
    return response.data;
  }
}
export class WorkMasterPhaseService extends BaseService<WorkMasterPhase> {
  async getByWorkMasterId(
    workMasterId: string
  ): Promise<Array<WorkMasterPhase> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workMasterId=${workMasterId}`
    );
    if (response.status === 200) return response.data as Array<WorkMasterPhase>;
  }
}
export class WorkMasterPhaseDetailService extends BaseService<WorkMasterPhaseDetail> {
  async getByWorkMasterPhaseId(
    workMasterPhaseId: string
  ): Promise<Array<WorkMasterPhaseDetail> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workMasterPhaseId=${workMasterPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkMasterPhaseDetail>;
  }
}
export class WorkMasterPhaseBillOfMaterialsService extends BaseService<WorkMasterPhaseBillOfMaterials> {
  async getByWorkMasterPhaseId(
    workMasterPhaseId: string
  ): Promise<Array<WorkMasterPhaseBillOfMaterials> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workMasterPhaseId=${workMasterPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkMasterPhaseBillOfMaterials>;
  }
}
