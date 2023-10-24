import BaseService from "../../../api/base.service";
import { Warehouse, Stock, ReferenceType } from "../types";

export class WarehouseService extends BaseService<Warehouse> {}
export class ReferenceTypeService extends BaseService<ReferenceType> {}
export class StockService extends BaseService<Stock> {}