import BaseService from "./base.service";
import { Category } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class CategoryService extends BaseService<Category> {
  constructor(resource: string) {
    super(resource);
  }
}

export default new CategoryService(
  GetResource(Modules.Config, Resources.Category)
);
