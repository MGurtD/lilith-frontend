import { OperatorClockInOutRequest } from "../types";
import serverClient, {
  connectWebSocket,
  disconnectWebSocket,
  handleMessages,
  WS_ENDPOINTS,
} from "../../../api/actions.client";
import { GenericResponse } from "../../../types";

class ActionsService {
  async clockInOperator(request: OperatorClockInOutRequest) {
    const endpoint = `/operator/clockin`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<boolean | undefined>;
  }
  async clockOutOperator(request: OperatorClockInOutRequest) {
    const endpoint = `/operator/clockout`;
    const response = await serverClient.post(endpoint, request);
    return response.data as GenericResponse<boolean | undefined>;
  }

  connect() {
    connectWebSocket();
  }

  disconnect() {
    disconnectWebSocket();
  }

  onMessage(handler: (data: any) => void) {
    handleMessages(handler);
  }
}

// Create singleton instance and export
const client = new ActionsService();

export default { client, WS_ENDPOINTS };
