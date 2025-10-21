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
  WorkcenterShiftGroup,
} from "../types";
import BaseService from "../../../api/base.service";
import {
  WorkMasterPhaseBillOfMaterialsService,
  WorkMasterPhaseDetailService,
  WorkMasterPhaseService,
  WorkMasterService,
} from "./workmaster.service";
import {
  WorkOrderService,
  WorkOrderPhaseService,
  WorkOrderPhaseDetailService,
  WorkOrderPhaseBillOfMaterialsService,
  DetailedWorkOrderService,
} from "./workorder.service";
import { ProductionPartService } from "./productionpart.service";
import ShiftService from "./shift.service";
import PlanningService from "./planning.service";
import ProductionCostDashboardService from "./productioncostdashboard.service";
import { WorkcenterShiftService } from "./workcentershift.service";

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
  WorkOrder: new WorkOrderService("/WorkOrder"),
  WorkOrderPhase: new WorkOrderPhaseService("/WorkOrder/Phase"),
  WorkOrderPhaseDetail: new WorkOrderPhaseDetailService(
    "/WorkOrder/Phase/Detail"
  ),
  WorkOrderPhaseBillOfMaterials: new WorkOrderPhaseBillOfMaterialsService(
    "/WorkOrder/Phase/BillOfMaterials"
  ),
  ProductionPart: new ProductionPartService("/ProductionPart"),
  DetailedWorkOrder: new DetailedWorkOrderService("/WorkOrder/Detailed"),
  ShiftService: new ShiftService("/Shift"),
  PlanningService: new PlanningService("/Planning"),
  ProductionCostDashboardService: new ProductionCostDashboardService(
    "/productioncost"
  ),
  WorkcenterShift: new WorkcenterShiftService("/WorkcenterShift"),
};
