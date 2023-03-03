import BaseService from "./base.service";
import { EventStatus } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class EventStatusService extends BaseService<EventStatus> {
  constructor(resource: string) {
    super(resource);
  }
}

export default new EventStatusService(
  GetResource(Modules.Config, Resources.EventStatus)
);
