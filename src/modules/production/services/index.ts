import { Workcenter, Area, Enterprise, Site, WorkcenterType } from "../types";
import BaseService from "../../../api/base.service";


export class AreaService extends BaseService<Area> {}
export class EnterpriseService extends BaseService<Enterprise> {}
export class SiteService extends BaseService<Site> {}
export class WorkcenterService extends BaseService<Workcenter> {}
export class WorkcenterTypeService extends BaseService<WorkcenterType> {}