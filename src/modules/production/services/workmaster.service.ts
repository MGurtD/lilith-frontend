import {
  WorkMaster,
  WorkMasterPhase,
  WorkMasterPhaseDetail,
  WorkMasterPhaseBillOfMaterials,
} from "../types";
import BaseService from "../../../api/base.service";

export class WorkMasterService extends BaseService<WorkMaster> {}
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
