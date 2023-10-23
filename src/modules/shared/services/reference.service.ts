import BaseService from "../../../api/base.service";
import { Reference, ReferenceFormat } from "../types";

export class ReferenceService extends BaseService<Reference> {
  async getByModule(module: string): Promise<Array<Reference> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/${module}`);
    if (response.status === 200) {
      return response.data as Array<Reference>;
    }
  }
  async getReferenceFormats(): Promise<Array<ReferenceFormat> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/Formats`);
    if (response.status === 200) {
      return response.data as Array<ReferenceFormat>;
    }
  }
}
