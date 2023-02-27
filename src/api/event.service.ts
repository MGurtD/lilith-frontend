import BaseService from "./base.service";
import { Event } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class EventService extends BaseService<Event> {
  constructor(resource: string) {
    super(resource);
  }

  getDetailedById(id: number) {
    return this.apiClient.get(`${this.resource}/detail/${id}`);
  }
  addItemEvent(item: any){
    return this.apiClient.post(`${this.resource}/item`, item)
  }
  deleteItemEvent(id: number){
    return this.apiClient.delete(`${this.resource}/item/${id}`)
  }

}

export default new EventService(GetResource(Modules.Data, Resources.Event));
