import BaseService from "../../../api/base.service";
import { Reference } from "../types";

export class ReferenceService extends BaseService<Reference> {
  async getByModule(modul: string): Promise<Array<Reference> | undefined> {
    const response = await this.apiClient.get(`${this.resource}/${modul}`);
    if (response.status === 200) {
      return response.data as Array<Reference>;
    }
  }
}
