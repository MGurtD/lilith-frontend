import BaseService from "./base.service";
import { EmployeeCategory } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class EmployeeCategoryService extends BaseService<EmployeeCategory> {
  constructor(resource: string) {
    super(resource);
  }
}

export default new EmployeeCategoryService(
  GetResource(Modules.Config, Resources.EmployeeCategory)
);
