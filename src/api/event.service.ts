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
  
}

export default new EventService(GetResource(Modules.Config, Resources.Event));
