import { Workcenter } from "../types";
import BaseService from "../../../api/base.service";

export class WorkcenterService extends BaseService<Workcenter> {
  async getVisibleInPlant(): Promise<Array<Workcenter> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/plant`);
    if (response.status === 200) return response.data as Array<Workcenter>;
  }
}
