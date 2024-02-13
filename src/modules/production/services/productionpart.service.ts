import { ProductionPart } from "../types";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class ProductionPartService extends BaseService<ProductionPart> {
  async GetBetweenDates(
    startTime: string,
    endTime: string
  ): Promise<Array<ProductionPart> | undefined> {
    let endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;

    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<ProductionPart>;
    }
  }
}
