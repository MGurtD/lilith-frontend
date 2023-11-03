import {
  Workcenter,
  Area,
  Enterprise,
  Site,
  WorkcenterType,
  MachineStatus,
  Operator,
  OperatorType,
  WorkcenterCost,
} from "../types";
import BaseService from "../../../api/base.service";

export class AreaService extends BaseService<Area> {}
export class EnterpriseService extends BaseService<Enterprise> {}
export class SiteService extends BaseService<Site> {}
export class WorkcenterService extends BaseService<Workcenter> {}
export class WorkcenterTypeService extends BaseService<WorkcenterType> {}
export class WorkcenterCostService extends BaseService<WorkcenterCost> {}
export class MachineStatusService extends BaseService<MachineStatus> {}
export class OperatorService extends BaseService<Operator> {}
export class OperatorTypeService extends BaseService<OperatorType> {}
