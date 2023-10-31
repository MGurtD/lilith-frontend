import BaseService from "../../../api/base.service";
import { Warehouse, Stock } from "../types";

export class WarehouseService extends BaseService<Warehouse> {}
export class StockService extends BaseService<Stock> {}
