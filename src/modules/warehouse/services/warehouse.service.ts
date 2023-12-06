import BaseService from "../../../api/base.service";
import { Warehouse, Stock, Location } from "../types";

export class WarehouseService extends BaseService<Warehouse> {
  async CreateLocation(request: Location): Promise<boolean> {
    const endpoint = `${this.resource}/Location`;
    const response = await this.apiClient.post(endpoint, request);
    return response.status === 200;
  }

  async UpdateLocation(id: string, request: Location): Promise<boolean> {
    const endpoint = `${this.resource}/Location/${request.id}`;
    const response = await this.apiClient.put(endpoint, request);
    return response.status === 200;
  }

  async DeleteLocation(id: string): Promise<boolean> {
    const endpoint = `${this.resource}/Location/${id}`;
    const response = await this.apiClient.delete(endpoint);
    return response.status === 200;
  }
}
export class StockService extends BaseService<Stock> {}
