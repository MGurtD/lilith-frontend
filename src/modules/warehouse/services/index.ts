import BaseService from "../../../api/base.service";
import { Warehouse, ReferenceType, Stock } from "../types";
import { StockMovementService } from "./stockMovement.service";
import { WarehouseService, ReferenceTypeService, StockService } from "./warehouse.service";




export default {
  Warehouse: new WarehouseService("/Warehouse"),
  ReferenceType: new ReferenceTypeService("/ReferenceType"),
  Stock: new StockService("/Stock"),
  StockMovementService: new StockMovementService("/StockMovement"),
};



