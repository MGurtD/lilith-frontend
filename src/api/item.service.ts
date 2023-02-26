import BaseService from "./base.service";
import { Item } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class ItemService extends BaseService<Item> {
  constructor(resource: string) {
    super(resource);
  }
}

export default new ItemService(GetResource(Modules.Config, Resources.Item));
