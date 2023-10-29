import { StockMovementService } from "./stockMovement.service";
import { WarehouseService, ReferenceTypeService, StockService } from "./warehouse.service";

export default {
  Warehouse: new WarehouseService("/Warehouse"),
  
  Stock: new StockService("/Stock"),
  StockMovementService: new StockMovementService("/StockMovement"),
};



