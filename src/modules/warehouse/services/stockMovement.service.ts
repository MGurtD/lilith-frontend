import BaseService from "../../../api/base.service";
import { StockMovement } from "../types";

export class StockMovementService extends BaseService<StockMovement>{
    async Create(request: StockMovement): Promise<boolean> {
      const endpoint = `${this.resource}`;
      const response = await this.apiClient.post(endpoint, request);
  
      return response.status === 200;
    }
  
    async GetBetweenDates(
      startTime: string,
      endTime: string
    ): Promise<Array<StockMovement> | undefined> {
      const endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
      const response = await this.apiClient.get(endpoint);
      if (response.status === 200) {
        return response.data as Array<StockMovement>;
      }
    }
  }