import {
  WorkOrder,
  WorkOrderPhase,
  WorkOrderPhaseDetail,
  WorkOrderPhaseBillOfMaterials,
  CreateWorkOrderDto,
  DetailedWorkOrder,
  WorkOrderOrder,
} from "../types";
import BaseService from "../../../api/base.service";
import { GenericResponse } from "../../../types";

export class WorkOrderService extends BaseService<WorkOrder> {
  async GetReportDataById(id: string) {
    const endpoint = `${this.resource}/Report/${id}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data;
    }
  }

  async GetBetweenDatesAndStatus(
    startTime: string,
    endTime: string,
    statusId?: string,
    referenceId?: string,
    customerId?: string
  ): Promise<Array<WorkOrder> | undefined> {
    let endpoint = `${this.resource}?startTime=${startTime}&endTime=${endTime}`;
    if (statusId) endpoint += `&statusId=${statusId}`;
    if (referenceId) endpoint += `&referenceId=${statusId}`;
    if (customerId) endpoint += `&customerId=${customerId}`;

    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<WorkOrder>;
    }
  }
  async GetBySalesOrderId(
    salesOrderId: string
  ): Promise<Array<WorkOrder> | undefined> {
    let endpoint = `${this.resource}/SalesOrder/${salesOrderId}`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<WorkOrder>;
    }
  }
  async GetByWorkcenterIdInProduction(
    workcenterId: string
  ): Promise<Array<WorkOrder> | undefined> {
    const endpoint = `${this.resource}/Workcenter/${workcenterId}/Production`;
    const response = await this.apiClient.get(endpoint);
    if (response.status === 200) {
      return response.data as Array<WorkOrder>;
    }
  }
  async GetWorkOrderByWorkcenterType(
    workcenterTypeId: string
  ): Promise<Array<WorkOrder> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/WorkcenterType/${workcenterTypeId}`
    );
    if (response.status === 200) return response.data as Array<WorkOrder>;
  }
  async Create(dto: CreateWorkOrderDto): Promise<GenericResponse<WorkOrder>> {
    const response = await this.apiClient.post(
      `${this.resource}/CreateFromWorkMaster`,
      dto
    );
    return response.data as GenericResponse<WorkOrder>;
  }
  async CreateFromSalesOrderDetail(
    dto: CreateWorkOrderDto,
    salesOrderDetailId: string
  ): Promise<GenericResponse<WorkOrder>> {
    const response = await this.apiClient.post(
      `${this.resource}/CreateFromSalesOrderDetail/${salesOrderDetailId}`,
      dto
    );
    return response.data as GenericResponse<WorkOrder>;
  }
  async UpdateOrdersOrder(workOrderOrders: WorkOrderOrder[]): Promise<boolean> {
    const response = await this.apiClient.put(
      `${this.resource}/UpdateOrders`,
      workOrderOrders
    );
    if (response.status === 200) return true;
    return false;
  }
}
export class WorkOrderPhaseService extends BaseService<WorkOrderPhase> {
  async getByWorkOrderId(
    workOrderId: string
  ): Promise<Array<WorkOrderPhase> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderId=${workOrderId}`
    );
    if (response.status === 200) return response.data as Array<WorkOrderPhase>;
  }

  async getExternalWorkOrderPhases(
    startTime: string,
    endTime: string
  ): Promise<Array<WorkOrderPhase> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/External?startTime=${startTime}&endTime=${endTime}`
    );
    if (response.status === 200) {
      const data = response.data as Array<{ workOrder: any; phase: any }>;
      const workOrderPhases: Array<WorkOrderPhase> = data.map((item) => ({
        ...item.phase,
        workOrder: item.workOrder,
      }));
      return workOrderPhases;
    }
  }
}

export class WorkOrderPhaseDetailService extends BaseService<WorkOrderPhaseDetail> {
  async getByWorkOrderPhaseId(
    workOrderPhaseId: string
  ): Promise<Array<WorkOrderPhaseDetail> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderPhaseId=${workOrderPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkOrderPhaseDetail>;
  }
}
export class WorkOrderPhaseBillOfMaterialsService extends BaseService<WorkOrderPhaseBillOfMaterials> {
  async getByWorkOrderPhaseId(
    workOrderPhaseId: string
  ): Promise<Array<WorkOrderPhaseBillOfMaterials> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}?workOrderPhaseId=${workOrderPhaseId}`
    );
    if (response.status === 200)
      return response.data as Array<WorkOrderPhaseBillOfMaterials>;
  }
}
export class DetailedWorkOrderService extends BaseService<DetailedWorkOrder> {
  async getByWorkcenterId(
    workcenterId: string
  ): Promise<Array<DetailedWorkOrder> | undefined> {
    const response = await this.apiClient.get(
      `${this.resource}/ByWorkcenter/${workcenterId}`
    );
    if (response.status === 200)
      return response.data as Array<DetailedWorkOrder>;
  }
  async getByWorkOrderId(
    workOrderId: string
  ): Promise<Array<DetailedWorkOrder> | undefined> {
    const response = await this.apiClient.get(
      `/WorkOrder/${workOrderId}/Detailed`
    );
    if (response.status === 200)
      return response.data as Array<DetailedWorkOrder>;
  }
}
