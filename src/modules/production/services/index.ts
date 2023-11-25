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
import {
  WorkMasterPhaseBillOfMaterialsService,
  WorkMasterPhaseDetailService,
  WorkMasterPhaseService,
  WorkMasterService,
} from "./workmaster.service";

export class AreaService extends BaseService<Area> {}
export class EnterpriseService extends BaseService<Enterprise> {}
export class SiteService extends BaseService<Site> {}
export class WorkcenterService extends BaseService<Workcenter> {}
export class WorkcenterTypeService extends BaseService<WorkcenterType> {}
export class WorkcenterCostService extends BaseService<WorkcenterCost> {}
export class MachineStatusService extends BaseService<MachineStatus> {}
export class OperatorService extends BaseService<Operator> {}
export class OperatorTypeService extends BaseService<OperatorType> {}

export default {
  Enterprise: new AreaService("/Enterprise"),
  Areas: new AreaService("/Area"),
  Site: new AreaService("/Site"),
  WorkcenterType: new WorkcenterTypeService("/WorkcenterType"),
  Workcenter: new WorkcenterTypeService("/Workcenter"),
  WorkcenterCost: new WorkcenterCostService("/WorkcenterCost"),
  MachineStatus: new MachineStatusService("/MachineStatus"),
  OperatorType: new OperatorTypeService("/OperatorType"),
  Operator: new OperatorService("/Operator"),
  WorkMaster: new WorkMasterService("/WorkMaster"),
  WorkMasterPhase: new WorkMasterPhaseService("/WorkMaster/Phase"),
  WorkMasterPhaseDetail: new WorkMasterPhaseDetailService(
    "/WorkMaster/Phase/Detail"
  ),
  WorkMasterPhaseBillOfMaterials: new WorkMasterPhaseBillOfMaterialsService(
    "/WorkMaster/Phase/BillOfMaterials"
  ),
};
