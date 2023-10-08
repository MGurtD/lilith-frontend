import BaseService from "../../../api/base.service";
import { Warehouse, ReferenceType } from "../types";

export class WarehouseService extends BaseService<Warehouse> {}
export class ReferenceTypeService extends BaseService<ReferenceType> {}

export default {
  Warehouse: new WarehouseService("/Warehouse"),
  ReferenceType: new ReferenceTypeService("/ReferenceType"),
};
