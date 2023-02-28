import BaseService from "./base.service";
import { ImportsByAccount } from "../types";
import { GetResource, Modules, Resources } from "./api.resources";

class StatisticsService extends BaseService<ImportsByAccount> {
  constructor(resource: string) {
    super(resource);
  }
  getImportByAccount() {
    return this.apiClient.get(`${this.resource}/getimportbyaccount`)
  }
}

export default new StatisticsService(GetResource(Modules.Data, Resources.Statistics));