import {
  OperatorClockInOutRequest,
  OperatorResponse,
  WorkOrderPhaseRequest,
  WorkOrderPhaseResponse,
  Workcenter,
} from "../types";
import serverClient from "../../../api/server.client";
import { GenericResponse } from "../../../types";
import { WorkOrder } from "../../production/types";

export class RealtimeService {
  async GetWorkcenters(): Promise<
    GenericResponse<Workcenter[] | undefined> | undefined
  > {
    const endpoint = `/workcenter`;
    const response = await serverClient.get(endpoint);
    if (response.status === 200) {
      return response.data as
        | GenericResponse<Workcenter[] | undefined>
        | undefined;
    }
  }

  async GetWorkcenter(
    id: string
  ): Promise<GenericResponse<Workcenter | undefined> | undefined> {
    const endpoint = `/workcenter/${id}`;
    const response = await serverClient.get(endpoint);
    if (response.status === 200) {
      return response.data as GenericResponse<Workcenter | undefined>;
    }
  }

  async ClockInOperator(request: OperatorClockInOutRequest) {
    const endpoint = `/operator/clockin`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<boolean | undefined>;
  }
  async ClockOutOperator(request: OperatorClockInOutRequest) {
    const endpoint = `/operator/clockout`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<boolean | undefined>;
  }

  async OpenWorkOrderPhase(request: WorkOrderPhaseRequest) {
    const endpoint = `/WorkOrderPhase/Open`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<WorkOrderPhaseResponse | undefined>;
  }
  async CloseWorkOrderPhase(request: WorkOrderPhaseRequest) {
    const endpoint = `/workorderphase/close`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<WorkOrderPhaseResponse | undefined>;
  }
}
